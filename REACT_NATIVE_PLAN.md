> **Language:** **EN** | [PT-BR](./REACT_NATIVE_PLAN.pt-BR.md) &nbsp;·&nbsp; **Document:** [README](./README.md) | **React Native Plan**

---

# Cartwave — React Native App: Migration Plan

## Overview

This document describes the engineering plan for creating a React Native mobile application alongside the existing Next.js web app. The goal is maximum code reuse through a monorepo structure while keeping each platform's UI layer clean and idiomatic.

---

## Architecture: Monorepo with Turborepo

A **pnpm monorepo** managed by **Turborepo** is the recommended approach. It allows shared TypeScript packages consumed by both apps via workspace aliases (`@cartwave/*`), a single lint/test/build pipeline, and independent per-app dependency resolution.

### Target structure

```
cartwave/                          ← new monorepo root
├── apps/
│   ├── web/                       ← current Next.js app (migrated in)
│   └── mobile/                    ← new Expo app
├── packages/
│   ├── types/                     ← domain types (Product, ValueProp, etc.)
│   ├── constants/                 ← WHATSAPP_URL, APP_URL, env config
│   ├── i18n/                      ← pt-br.json + locale config
│   ├── theme/                     ← design tokens in TS (colors, spacing, shadows)
│   └── api/                       ← platform-agnostic API client
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Mobile App Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Expo SDK 52** (managed workflow) | OTA updates, handles native modules, fastest start |
| Routing | **Expo Router v3** | File-based routing — same mental model as Next.js App Router |
| Styling | **NativeWind v4** | Tailwind class syntax in React Native; minimal context-switch from web |
| Animations | **React Native Reanimated 3** | Performant, gesture-driven; replaces CSS keyframes |
| i18n | **i18next + react-i18next** | Works on both web and RN; shares translation JSON |
| Icons | **lucide-react-native** | Same icon set as web (`lucide-react`) |
| Gradients | **expo-linear-gradient** | Replaces CSS `bg-gradient-to-r` |
| HTTP | **native `fetch`** (included by Expo) | Same as web; shared API client works without changes |
| State | React hooks + context | Matches current web approach |
| Testing | **Jest + React Native Testing Library** | Mirrors existing web test setup |

---

## Codebase Audit — What Can Be Shared

A full audit of the current `src/` directory classified every file:

| File | Classification | Action |
|------|----------------|--------|
| `src/content.ts` | **Shareable as-is** | Extract to `@cartwave/types`; replace `iconGradientClass` string with `{from, to}` gradient config |
| `src/constants.ts` | **Shareable as-is** | Copy directly to `@cartwave/constants` |
| `src/api.ts` | **Shareable as-is** | Copy to `@cartwave/api`; uses native `fetch` on both platforms |
| `src/translations/pt-br.json` | **Shareable with adaptation** | Extract to `@cartwave/i18n`; strip `<highlight>` HTML markers — move highlight styling to component layer |
| `src/i18n/routing.ts` | **Partial** | Extract locale list/default to plain object in `@cartwave/i18n`; replace `next-intl/routing` import |
| `src/styles/globals.css` | **Shareable with adaptation** | Convert HSL design tokens to typed TS object in `@cartwave/theme` |
| `src/utils/cn.ts` | **Web-only** | NativeWind ships its own `cn` — do not port |
| All `app/` directory | **Web-only** | Next.js App Router; replaced by Expo Router screens |
| `src/proxy.ts` | **Web-only** | Next.js edge middleware; not applicable |
| `src/__mocks__/` | **Web-only** | Jest mock for next-intl/server; not applicable |

---

## Shared Packages Specification

### `@cartwave/types`
Extract from `src/content.ts`. One breaking change: replace `iconGradientClass: string` (Tailwind-specific) with a structured gradient config:

```ts
gradient: {from: string; to: string}
// e.g. {from: '#51d4a5', to: '#1a4a5c'}
```

Both apps map this: web generates Tailwind classes, mobile passes to `expo-linear-gradient`.

### `@cartwave/constants`
Copy `src/constants.ts` as-is. URLs are platform-agnostic.

### `@cartwave/i18n`
- Export the raw `pt-br.json` (consumed by both next-intl on web and i18next on mobile)
- Export a `localeConfig` plain object extracted from `src/i18n/routing.ts`
- Strip `<highlight>...</highlight>` markers from translation strings; implement highlight styling in each platform's component

### `@cartwave/theme`
Convert `globals.css` HSL custom properties to a typed TypeScript object:

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

Web continues to use `globals.css` (no change). Mobile imports `@cartwave/theme` directly.

### `@cartwave/api`
Copy `src/api.ts` shell. Both apps extend the same class using native `fetch`.

---

## Mobile App: Screen Structure (Expo Router)

```
apps/mobile/app/
├── _layout.tsx              ← Root layout (i18n provider, theme, navigation shell)
├── (tabs)/
│   ├── _layout.tsx          ← Bottom tab bar
│   ├── index.tsx            ← Home / Hero equivalent
│   ├── products.tsx         ← Products grid (ProductCard equivalents)
│   ├── why.tsx              ← WhyCartwave equivalen (value props + metrics)
│   └── contact.tsx          ← FinalCta equivalent + WhatsApp deep link
└── +not-found.tsx
```

---

## Key Platform Differences

| Concern | Web | Mobile |
|---------|-----|--------|
| Routing | Next.js App Router + next-intl | Expo Router v3 |
| i18n hook | `useTranslations()` (next-intl) | `useTranslation()` (react-i18next) |
| Styling | Tailwind CSS / `cn()` | NativeWind v4 / `cn()` |
| Gradient | `bg-linear-to-r from-X to-Y` | `<LinearGradient colors={[from, to]} />` |
| Images | `next/image` | `<Image>` from `expo-image` |
| Navigation | `<Link>` + `<a>` | `<Pressable>` + `router.push()` |
| External URL | `<a target="_blank">` | `Linking.openURL()` |
| Rich text | `t.rich()` with `<span>` | Custom `HighlightText` RN component |
| Box shadow | CSS `box-shadow` | `elevation` (Android) + `shadow*` (iOS) |
| Entrance animation | `tw-animate-css` + CSS keyframes | Reanimated 3 `useAnimatedStyle` |
| Overflow clip | `overflow: hidden` CSS | `overflow: 'hidden'` on `View` |

---

## Migration Phases

### Phase 1 — Monorepo setup (Week 1)
1. Initialise pnpm workspace + Turborepo at repo root
2. Move current Next.js app into `apps/web/`; update all internal paths
3. Create empty `packages/` stubs with `package.json` and placeholder exports
4. Verify `apps/web` still builds, lints, and all tests pass

### Phase 2 — Extract shared packages (Week 1–2)
1. Extract `@cartwave/types` from `src/content.ts`; update `apps/web` to import from it
2. Extract `@cartwave/constants`
3. Extract `@cartwave/i18n`; strip `<highlight>` markers; add i18next as a peer of web app
4. Create `@cartwave/theme`; verify web tokens still align with `globals.css`
5. Extract `@cartwave/api`

### Phase 3 — Expo app scaffold (Week 2)
1. `npx create-expo-app apps/mobile --template tabs`
2. Install: Expo Router, NativeWind v4, react-i18next, expo-linear-gradient, Reanimated 3
3. Configure i18next to load `@cartwave/i18n/pt-br.json`
4. Apply `@cartwave/theme` tokens through NativeWind theme config
5. Wire `@cartwave/api`, `@cartwave/constants`, `@cartwave/types`
6. Confirm TypeScript, lint, and unit tests run via `turbo test`

### Phase 4 — Screen development (Week 3–4)
Build in order of conversion priority:
1. **Home** — hero heading, features list, CTA buttons (WhatsApp deep link)
2. **Products** — ProductCard grid with expo-linear-gradient icons
3. **WhyCartwave** — value prop cards + metrics section
4. **Contact** — FinalCta equivalent, benefit list, WhatsApp button

### Phase 5 — Polish & parity (Week 5)
1. Entrance animations with Reanimated 3
2. Accessibility audit (screen reader, contrast ratios, tap targets ≥ 44px)
3. Platform-specific polish (iOS safe area insets, Android status bar, hardware back)
4. Configure Expo EAS Build + EAS Update for OTA deployments
5. E2E tests with Maestro or Detox

---

## Additional Tooling Required

| Tool | Purpose |
|------|---------|
| `pnpm` | Package manager with workspace support |
| `turborepo` | Monorepo task orchestration with caching |
| `expo-linear-gradient` | CSS gradient replacement |
| `expo-image` | Optimised image component (replaces `next/image`) |
| `react-i18next` + `i18next` | i18n on mobile (shares JSON from `@cartwave/i18n`) |
| `react-native-reanimated` | Performant animations (replaces CSS keyframes) |
| `expo-linking` | Deep links + external URL handling |
| `jest-expo` | Jest preset for Expo apps |

---

## Open Questions

1. **Monorepo location** — wrap current repo at root, or create a new org-level monorepo?
2. **Target platforms** — iOS only, Android only, or both from day one?
3. **Authentication** — dedicated mobile auth flow, or redirect to web `APP_URL`?
4. **App Store deployment** — Expo EAS Build (recommended) or manual Xcode/Android Studio?
5. **Design parity** — pixel-perfect match to web, or a native-first redesign with the same brand?
