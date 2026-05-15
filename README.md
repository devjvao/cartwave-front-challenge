> **Language:** **EN** | [PT-BR](./README.pt-BR.md) &nbsp;·&nbsp; **Document:** **README** | [React Native Plan](./REACT_NATIVE_PLAN.md)

---

# Cartwave — Landing Page

Marketing landing page for **Cartwave**, a Brazilian payment institution offering APIs for Pix, boletos, split payments,
and custom checkout. Built as a front-end challenge implementing a pixel-perfect, fully accessible, internationalised
landing page.

---

## Stack

| Layer         | Technology                                                                                        |
|---------------|---------------------------------------------------------------------------------------------------|
| Framework     | [Next.js 16](https://nextjs.org/) — App Router, Server Components by default                      |
| Language      | TypeScript 5 — strict mode (`strict`, `strictNullChecks`, `noImplicitAny`)                        |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config, no CSS Modules                    |
| UI Primitives | [@base-ui/react](https://base-ui.com/) — headless, unstyled                                       |
| Animations    | [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) + custom keyframes           |
| i18n          | [next-intl 4](https://next-intl-docs.vercel.app/) — locale routing, server & client hooks         |
| Icons         | [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/) (brand icons) |
| Utility       | `clsx` + `tailwind-merge` via `cn()` helper; `class-variance-authority` for variants              |
| Testing       | Jest 29 + React Testing Library + jest-dom                                                        |
| Linting       | ESLint 9 flat config — `next/core-web-vitals` + `next/typescript` (native flat exports)           |

---

## Purpose

A single-page marketing site for Cartwave with the following sections:

1. **Header** — Fixed navigation with desktop links, CTA buttons, and a responsive mobile menu
2. **Hero** — Full-screen section with heading, feature list, CTA buttons, and animated dashboard card mockup
3. **Products** — Grid of product cards (Pix API, boletos, referral, split, checkout)
4. **WhyCartwave** — Value-proposition cards with metrics and animated highlights
5. **FinalCta** — Conversion section with dual CTAs and benefit list
6. **Footer** — Company info, contact details, link columns, newsletter subscription form with client-side validation,
   and social links

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### All commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npm run validate   # TypeScript type-check (no emit)
npm test           # Jest (UTC timezone)
npm run test:ci    # Jest CI mode
```

---

## Project structure

```
src/
├── __mocks__/
│   └── next-intl-server.tsx    # Global getTranslations mock (via moduleNameMapper)
├── app/
│   ├── layout.tsx              # Root layout — global metadata, icon, CSS import
│   └── [locale]/               # Locale-scoped routes (pt-br)
│       ├── layout.tsx          # NextIntlClientProvider wrapper
│       ├── page.tsx            # Landing page entry (thin — delegates to components)
│       ├── loading.tsx
│       ├── error.tsx
│       └── not-found.tsx
├── components/
│   ├── Header/
│   ├── Hero/
│   │   └── TransactionRow/     # Sub-component extracted from repeated JSX
│   ├── Products/
│   ├── ProductCard/
│   ├── WhyCartwave/
│   ├── FinalCta/
│   └── Footer/
│       ├── ContactRow/         # Sub-component: icon + text row
│       ├── FooterNavColumn/    # Sub-component: labelled link list
│       └── NewsletterForm/     # Client component with email validation
├── i18n/
│   ├── routing.ts              # Supported locales
│   └── request.ts              # Message loader per request
├── styles/
│   └── globals.css             # Tailwind v4 config, design tokens, custom keyframes
├── translations/
│   └── pt-br.json              # All UI strings (currently pt-BR only)
├── utils/
│   └── cn.ts                   # clsx + tailwind-merge helper
├── api.ts                      # API client class
├── constants.ts                # Named env-var exports
├── content.ts                  # Normalised domain types (products, valueProps)
└── proxy.ts                    # Next.js edge middleware
```

### Component folder pattern

Every component lives in a dedicated folder:

```
ComponentName/
├── index.tsx         # Named export only
├── index.test.tsx    # Co-located Jest test
└── styles.ts         # CVA variants — only when the component has stylistic variants
```

Sub-components of a parent (e.g. `TransactionRow` inside `Hero/`) follow the same pattern nested under their parent
folder.

---

## Conventions

Full details are in the docs below. This is a quick reference.

### React (`/docs/react.md`)

- Plain `function` declarations — never `FC` or `FunctionComponent`
- Props type named `ComponentNameProps`
- 1–2 props → inline destructuring in the function signature; 3+ props → body destructuring, one prop per line
- JSX attributes: simple/short first, `className` always last; multiline when >2 attributes or a value spans multiple
  lines

### Styling (`/docs/styling.md`)

- All styling via Tailwind CSS utility classes
- `cn()` helper when the class string exceeds 80 characters; plain string otherwise
- Semantic token classes preferred (`bg-background`, `text-foreground`) over raw palette values
- `styles.ts` with `cva` for components that have size/appearance variants
- Repeated static class patterns extracted to `styles.ts` as a plain object

### i18n

- All user-facing strings — including `aria-label` values — go through `useTranslations()` / `getTranslations()`; never
  hardcoded
- Pass the namespace string literal directly: `useTranslations('header')` — no separate constants file
- Server Components: `getTranslations('namespace')` from `next-intl/server`
- Client Components: `useTranslations('namespace')` from `next-intl`

### TypeScript

- `import type` for type-only imports
- `unknown` over `any`
- `type` for unions/intersections/utilities; `interface` for extensible object shapes
- No `enum` — use `const` object + `as const` with derived type

### Testing

- Semantic queries: `getByRole`, `getByText` — avoid `getByTestId`
- Server components: `render(await Component())` — no `NextIntlClientProvider` wrapper needed
- Client components: wrap with `NextIntlClientProvider` and real `messages`
- `getTranslations` mock applied globally via `moduleNameMapper` in `jest.config.js` — no per-file `jest.mock()` needed

### ESLint rules (enforced)

- `for...in` banned — use `Object.keys()`, `Object.entries()`, or `for...of`
- Default exports only in App Router special files (`page.tsx`, `layout.tsx`, etc.)
- `@typescript-eslint/no-explicit-any` — use `unknown`
- `@typescript-eslint/consistent-type-imports` — enforce `import type`

### Commit & PR conventions

- Conventional Commits: `type(scope): description`
- Subject line ≤ 72 characters; body explains the *why*
- One concern per PR

---

## Docs

| Document                                | Contents                                                                                                                               |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [`/docs/styling.md`](./docs/styling.md) | Tailwind class organisation, `cn()` rules, semantic grouping, CVA patterns, responsive design, design tokens, dark mode, accessibility |
| [`/docs/react.md`](./docs/react.md)     | Hook formatting (`useEffect`, `useMemo`, `useCallback`), props type naming, destructuring rules, JSX attribute ordering                |
| [`CLAUDE.md`](./CLAUDE.md)              | Full project rules for AI-assisted development — architecture, conventions, collaboration guidelines                                   |
