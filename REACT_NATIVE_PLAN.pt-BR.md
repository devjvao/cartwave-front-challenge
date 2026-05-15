> **Idioma / Language:** [EN](./REACT_NATIVE_PLAN.md) | **PT-BR** &nbsp;·&nbsp; **Documento / Document:** [README](./README.pt-BR.md) | **Plano React Native**

---

# Cartwave — App React Native: Plano de Criação

## Visão Geral

Este documento descreve o plano de engenharia para a criação de um aplicativo mobile em React Native ao lado do app web existente em Next.js. O objetivo é o máximo de reuso de código por meio de uma estrutura monorepo, mantendo a camada de UI de cada plataforma limpa e idiomática.

---

## Arquitetura: Monorepo com Turborepo

Um **monorepo pnpm** gerenciado pelo **Turborepo** é a abordagem recomendada. Ele permite pacotes TypeScript compartilhados consumidos por ambos os apps via aliases de workspace (`@cartwave/*`), um pipeline único de lint/test/build e resolução de dependências independente por app.

### Estrutura-alvo

```
cartwave/                          ← nova raiz do monorepo
├── apps/
│   ├── web/                       ← app Next.js atual (migrado para cá)
│   └── mobile/                    ← novo app Expo
├── packages/
│   ├── types/                     ← tipos de domínio (Product, ValueProp, etc.)
│   ├── constants/                 ← WHATSAPP_URL, APP_URL, config de env
│   ├── i18n/                      ← pt-br.json + config de locale
│   ├── theme/                     ← tokens de design em TS (cores, espaçamentos, sombras)
│   └── api/                       ← cliente de API agnóstico de plataforma
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Stack do App Mobile

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | **Expo SDK 52** (managed workflow) | Atualizações OTA, gerencia módulos nativos, início rápido |
| Roteamento | **Expo Router v3** | Roteamento baseado em arquivos — mesmo modelo mental do Next.js App Router |
| Estilização | **NativeWind v4** | Sintaxe de classes Tailwind no React Native; mínima troca de contexto com o web |
| Animações | **React Native Reanimated 3** | Performático, orientado a gestos; substitui keyframes CSS |
| i18n | **i18next + react-i18next** | Funciona tanto no web quanto no RN; compartilha o JSON de traduções |
| Ícones | **lucide-react-native** | Mesmo conjunto de ícones do web (`lucide-react`) |
| Gradientes | **expo-linear-gradient** | Substitui `bg-gradient-to-r` do CSS |
| HTTP | **`fetch` nativo** (incluso no Expo) | Igual ao web; cliente de API compartilhado funciona sem alterações |
| Estado | React hooks + context | Alinha-se com a abordagem atual do web |
| Testes | **Jest + React Native Testing Library** | Espelha a configuração de testes existente no web |

---

## Auditoria do Código — O Que Pode Ser Compartilhado

Uma auditoria completa do diretório `src/` atual classificou cada arquivo:

| Arquivo | Classificação | Ação |
|---------|---------------|------|
| `src/content.ts` | **Compartilhável como está** | Extrair para `@cartwave/types`; substituir string `iconGradientClass` por config de gradiente `{from, to}` |
| `src/constants.ts` | **Compartilhável como está** | Copiar diretamente para `@cartwave/constants` |
| `src/api.ts` | **Compartilhável como está** | Copiar para `@cartwave/api`; usa `fetch` nativo em ambas as plataformas |
| `src/translations/pt-br.json` | **Compartilhável com adaptação** | Extrair para `@cartwave/i18n`; remover marcadores HTML `<highlight>` — mover estilização para a camada de componente |
| `src/i18n/routing.ts` | **Parcial** | Extrair lista de locales/padrão para objeto simples em `@cartwave/i18n`; substituir import de `next-intl/routing` |
| `src/styles/globals.css` | **Compartilhável com adaptação** | Converter tokens de design HSL para objeto TypeScript tipado em `@cartwave/theme` |
| `src/utils/cn.ts` | **Somente web** | NativeWind já inclui seu próprio `cn` — não migrar |
| Todo o diretório `app/` | **Somente web** | Next.js App Router; substituído por telas do Expo Router |
| `src/proxy.ts` | **Somente web** | Middleware de edge do Next.js; não aplicável |
| `src/__mocks__/` | **Somente web** | Mock Jest para next-intl/server; não aplicável |

---

## Especificação dos Pacotes Compartilhados

### `@cartwave/types`
Extraído de `src/content.ts`. Uma alteração breaking: substituir `iconGradientClass: string` (específico do Tailwind) por uma config de gradiente estruturada:

```ts
gradient: {from: string; to: string}
// ex: {from: '#51d4a5', to: '#1a4a5c'}
```

Ambos os apps mapeiam isso: o web gera classes Tailwind, o mobile passa para `expo-linear-gradient`.

### `@cartwave/constants`
Copiar `src/constants.ts` como está. URLs são agnósticas de plataforma.

### `@cartwave/i18n`
- Exportar o `pt-br.json` bruto (consumido por next-intl no web e por i18next no mobile)
- Exportar um objeto `localeConfig` simples extraído de `src/i18n/routing.ts`
- Remover marcadores `<highlight>...</highlight>` das strings de tradução; implementar a estilização de destaque no componente de cada plataforma

### `@cartwave/theme`
Converter as propriedades CSS HSL de `globals.css` para um objeto TypeScript tipado:

```ts
export const theme = {
    colors: {
        primary:     '#51d4a5',   // hsl(158, 67%, 53%)
        secondary:   '#1a4a5c',   // hsl(194, 65%, 24%)
        background:  '#ffffff',
        foreground:  '#1a4a5c',
        muted:       '#d4f8f1',   // hsl(158, 100%, 96%)
        border:      '#b8dfd5',
        destructive: '#ef4444',
    },
    radius: {base: 12, sm: 8, md: 10, lg: 12, xl: 16},
    shadows: {
        soft: {shadowColor: '#51d4a5', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, elevation: 3},
        card: {shadowColor: '#51d4a5', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.1, elevation: 6},
    },
} as const;
```

O web continua usando `globals.css` (sem alteração). O mobile importa `@cartwave/theme` diretamente.

### `@cartwave/api`
Copiar o shell de `src/api.ts`. Ambos os apps estendem a mesma classe usando `fetch` nativo.

---

## App Mobile: Estrutura de Telas (Expo Router)

```
apps/mobile/app/
├── _layout.tsx              ← Layout raiz (provider de i18n, tema, shell de navegação)
├── (tabs)/
│   ├── _layout.tsx          ← Barra de abas inferior
│   ├── index.tsx            ← Home / equivalente ao Hero
│   ├── products.tsx         ← Grid de produtos (equivalente ao ProductCard)
│   ├── why.tsx              ← Equivalente ao WhyCartwave (props de valor + métricas)
│   └── contact.tsx          ← Equivalente ao FinalCta + deep link WhatsApp
└── +not-found.tsx
```

---

## Principais Diferenças entre Plataformas

| Aspecto | Web | Mobile |
|---------|-----|--------|
| Roteamento | Next.js App Router + next-intl | Expo Router v3 |
| Hook de i18n | `useTranslations()` (next-intl) | `useTranslation()` (react-i18next) |
| Estilização | Tailwind CSS / `cn()` | NativeWind v4 / `cn()` |
| Gradiente | `bg-linear-to-r from-X to-Y` | `<LinearGradient colors={[from, to]} />` |
| Imagens | `next/image` | `<Image>` do `expo-image` |
| Navegação | `<Link>` + `<a>` | `<Pressable>` + `router.push()` |
| URL externa | `<a target="_blank">` | `Linking.openURL()` |
| Texto rico | `t.rich()` com `<span>` | Componente RN `HighlightText` customizado |
| Sombra | CSS `box-shadow` | `elevation` (Android) + `shadow*` (iOS) |
| Animação de entrada | `tw-animate-css` + keyframes CSS | Reanimated 3 `useAnimatedStyle` |
| Recorte de overflow | `overflow: hidden` CSS | `overflow: 'hidden'` em `View` |

---

## Fases da Criação

### Fase 1 — Configuração do Monorepo (Semana 1)
1. Inicializar workspace pnpm + Turborepo na raiz do repositório
2. Mover o app Next.js atual para `apps/web/`; atualizar todos os caminhos internos
3. Criar stubs vazios em `packages/` com `package.json` e exports placeholder
4. Verificar que `apps/web` ainda compila, passa no lint e todos os testes são aprovados

### Fase 2 — Extração dos Pacotes Compartilhados (Semana 1–2)
1. Extrair `@cartwave/types` de `src/content.ts`; atualizar `apps/web` para importar dele
2. Extrair `@cartwave/constants`
3. Extrair `@cartwave/i18n`; remover marcadores `<highlight>`; adicionar i18next como peer do web app
4. Criar `@cartwave/theme`; verificar que os tokens do web ainda batem com `globals.css`
5. Extrair `@cartwave/api`

### Fase 3 — Scaffold do App Expo (Semana 2)
1. `npx create-expo-app apps/mobile --template tabs`
2. Instalar: Expo Router, NativeWind v4, react-i18next, expo-linear-gradient, Reanimated 3
3. Configurar i18next para carregar `@cartwave/i18n/pt-br.json`
4. Aplicar tokens de `@cartwave/theme` via config de tema do NativeWind
5. Conectar `@cartwave/api`, `@cartwave/constants`, `@cartwave/types`
6. Confirmar que TypeScript, lint e testes unitários rodam via `turbo test`

### Fase 4 — Desenvolvimento das Telas (Semana 3–4)
Construir em ordem de prioridade de conversão:
1. **Home** — heading hero, lista de funcionalidades, botões de CTA (deep link WhatsApp)
2. **Produtos** — grid de ProductCard com ícones expo-linear-gradient
3. **WhyCartwave** — cards de proposta de valor + seção de métricas
4. **Contato** — equivalente ao FinalCta, lista de benefícios, botão WhatsApp

### Fase 5 — Polimento e Paridade (Semana 5)
1. Animações de entrada com Reanimated 3
2. Auditoria de acessibilidade (leitor de tela, contraste, áreas de toque ≥ 44px)
3. Ajustes específicos de plataforma (safe area iOS, status bar Android, botão voltar físico)
4. Configurar Expo EAS Build + EAS Update para deploys OTA
5. Testes E2E com Maestro ou Detox

---

## Ferramentas Adicionais Necessárias

| Ferramenta | Finalidade |
|------------|-----------|
| `pnpm` | Gerenciador de pacotes com suporte a workspaces |
| `turborepo` | Orquestração de tarefas do monorepo com cache |
| `expo-linear-gradient` | Substituto dos gradientes CSS |
| `expo-image` | Componente de imagem otimizado (substitui `next/image`) |
| `react-i18next` + `i18next` | i18n no mobile (compartilha JSON de `@cartwave/i18n`) |
| `react-native-reanimated` | Animações performáticas (substitui keyframes CSS) |
| `expo-linking` | Deep links e abertura de URLs externas |
| `jest-expo` | Preset Jest para apps Expo |

---

## Questões em Aberto

1. **Localização do monorepo** — criar na raiz do repositório atual ou em um novo repositório de organização?
2. **Plataformas-alvo** — somente iOS, somente Android ou ambos desde o início?
3. **Autenticação** — fluxo de auth dedicado no mobile ou redirecionamento para `APP_URL` web?
4. **Deploy na loja** — Expo EAS Build (recomendado) ou processo manual via Xcode/Android Studio?
5. **Paridade visual** — correspondência pixel-perfect com o web ou redesign nativo com a mesma identidade de marca?
