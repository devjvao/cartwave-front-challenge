> **Idioma / Language:** [EN](./README.md) | **PT-BR** &nbsp;·&nbsp; **Documento / Document:** **README** | [Plano React Native](./REACT_NATIVE_PLAN.pt-BR.md)

---

# Cartwave — Landing Page

Landing page de marketing da **Cartwave**, uma instituição de pagamento brasileira que oferece APIs de Pix, boletos, split de pagamentos e checkout customizável. Desenvolvida como desafio front-end com foco em implementação pixel-perfect, totalmente acessível e internacionalizada.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) — App Router, Server Components por padrão |
| Linguagem | TypeScript 5 — modo estrito (`strict`, `strictNullChecks`, `noImplicitAny`) |
| Estilização | [Tailwind CSS v4](https://tailwindcss.com/) — configuração CSS-first, sem CSS Modules |
| Primitivos de UI | [@base-ui/react](https://base-ui.com/) — headless, sem estilo embutido |
| Animações | [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) + keyframes customizados |
| i18n | [next-intl 4](https://next-intl-docs.vercel.app/) — roteamento por locale, hooks server e client |
| Ícones | [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/) (ícones de marca) |
| Utilitários | `clsx` + `tailwind-merge` via helper `cn()`; `class-variance-authority` para variantes |
| Testes | Jest 29 + React Testing Library + jest-dom |
| Linting | ESLint 9 flat config — `next/core-web-vitals` + `next/typescript` (exports flat nativos) |

---

## Propósito

Site de marketing de página única da Cartwave com as seguintes seções:

1. **Header** — Navegação fixa com links desktop, botões de CTA e menu mobile responsivo
2. **Hero** — Seção em tela cheia com heading, lista de funcionalidades, botões de CTA e mockup animado do dashboard
3. **Products** — Grid de cards de produto (API de Pix, boletos, indicação, split, checkout)
4. **WhyCartwave** — Cards de proposta de valor com métricas e destaques animados
5. **FinalCta** — Seção de conversão com dois CTAs e lista de benefícios
6. **Footer** — Informações da empresa, contato, colunas de links, formulário de newsletter com validação client-side e redes sociais

---

## Como usar

```bash
npm install
npm run dev        # http://localhost:3000
```

### Todos os comandos

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Build de produção
npm run start      # Serve o build de produção
npm run lint       # ESLint
npm run validate   # Verificação de tipos TypeScript (sem emissão)
npm test           # Jest (fuso horário UTC)
npm run test:ci    # Jest em modo CI
```

---

## Estrutura do projeto

```
src/
├── __mocks__/
│   └── next-intl-server.tsx    # Mock global de getTranslations (via moduleNameMapper)
├── app/
│   ├── layout.tsx              # Layout raiz — metadados globais, ícone, import do CSS
│   └── [locale]/               # Rotas com escopo de locale (pt-br)
│       ├── layout.tsx          # Wrapper do NextIntlClientProvider
│       ├── page.tsx            # Entrada da landing page (thin — delega para componentes)
│       ├── loading.tsx
│       ├── error.tsx
│       └── not-found.tsx
├── components/
│   ├── Header/
│   ├── Hero/
│   │   └── TransactionRow/     # Sub-componente extraído de JSX repetido
│   ├── Products/
│   ├── ProductCard/
│   ├── WhyCartwave/
│   ├── FinalCta/
│   └── Footer/
│       ├── ContactRow/         # Sub-componente: linha de ícone + texto
│       ├── FooterNavColumn/    # Sub-componente: lista de links com label
│       └── NewsletterForm/     # Componente client com validação de e-mail
├── i18n/
│   ├── routing.ts              # Locales suportados
│   └── request.ts              # Carregamento de mensagens por requisição
├── styles/
│   └── globals.css             # Configuração Tailwind v4, tokens de design, keyframes customizados
├── translations/
│   └── pt-br.json              # Todas as strings de UI (atualmente apenas pt-BR)
├── utils/
│   └── cn.ts                   # Helper clsx + tailwind-merge
├── api.ts                      # Classe do cliente de API
├── constants.ts                # Exportações nomeadas de variáveis de ambiente
├── content.ts                  # Tipos de domínio normalizados (products, valueProps)
└── proxy.ts                    # Middleware de edge do Next.js
```

### Padrão de pasta de componente

Cada componente vive em uma pasta dedicada:

```
ComponentName/
├── index.tsx         # Apenas export nomeado
├── index.test.tsx    # Teste Jest co-localizado
└── styles.ts         # Variantes CVA — somente quando o componente tem variantes estilísticas
```

Sub-componentes de um pai (ex: `TransactionRow` dentro de `Hero/`) seguem o mesmo padrão aninhado sob a pasta do pai.

---

## Convenções

Detalhes completos estão nos documentos abaixo. Este é um guia de referência rápida.

### React (`/docs/react.md`)

- Declarações `function` simples — nunca `FC` ou `FunctionComponent`
- Tipo de props nomeado `ComponentNameProps`
- 1–2 props → desestruturação inline na assinatura da função; 3+ props → desestruturação no corpo, uma prop por linha
- Atributos JSX: simples/curtos primeiro, `className` sempre por último; multilinha quando >2 atributos ou um valor ocupa múltiplas linhas

### Estilização (`/docs/styling.md`)

- Toda estilização via classes utilitárias do Tailwind CSS
- Helper `cn()` quando a string de classes excede 80 caracteres; string simples caso contrário
- Classes de tokens semânticos preferidas (`bg-background`, `text-foreground`) em vez de valores brutos de paleta
- `styles.ts` com `cva` para componentes com variantes de tamanho/aparência
- Padrões de classes estáticas repetidas extraídos para `styles.ts` como objeto simples

### i18n

- Todas as strings voltadas ao usuário — incluindo valores de `aria-label` — passam por `useTranslations()` / `getTranslations()`; nunca hardcoded
- Passe o namespace diretamente como string literal: `useTranslations('header')` — sem arquivo de constantes separado
- Server Components: `getTranslations('namespace')` de `next-intl/server`
- Client Components: `useTranslations('namespace')` de `next-intl`

### TypeScript

- `import type` para importações somente de tipos
- `unknown` em vez de `any`
- `type` para uniões/interseções/utilitários; `interface` para formas de objeto extensíveis
- Sem `enum` — use objeto `const` + `as const` com tipo derivado

### Testes

- Queries semânticas: `getByRole`, `getByText` — evite `getByTestId`
- Server components: `render(await Component())` — sem wrapper `NextIntlClientProvider`
- Client components: envolva com `NextIntlClientProvider` e `messages` reais
- Mock de `getTranslations` aplicado globalmente via `moduleNameMapper` em `jest.config.js` — sem `jest.mock()` por arquivo

### Regras do ESLint (aplicadas)

- `for...in` proibido — use `Object.keys()`, `Object.entries()` ou `for...of`
- Exports padrão apenas em arquivos especiais do App Router (`page.tsx`, `layout.tsx`, etc.)
- `@typescript-eslint/no-explicit-any` — use `unknown`
- `@typescript-eslint/consistent-type-imports` — impõe `import type`

### Convenções de commit e PR

- Conventional Commits: `type(scope): description`
- Linha de assunto ≤ 72 caracteres; corpo explica o *porquê*
- Um assunto por PR

---

## Documentação

| Documento | Conteúdo |
|-----------|---------|
| [`/docs/styling.md`](./docs/styling.md) | Organização de classes Tailwind, regras do `cn()`, agrupamento semântico, padrões CVA, design responsivo, tokens de design, dark mode, acessibilidade |
| [`/docs/react.md`](./docs/react.md) | Formatação de hooks (`useEffect`, `useMemo`, `useCallback`), nomenclatura de tipos de props, regras de desestruturação, ordenação de atributos JSX |
| [`CLAUDE.md`](./CLAUDE.md) | Regras completas do projeto para desenvolvimento assistido por IA — arquitetura, convenções, diretrizes de colaboração |
