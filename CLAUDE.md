# CLAUDE.md

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # ESLint
npm run validate   # TypeScript type-check (no emit)
npm test           # Jest (UTC timezone)
npm run test:ci    # Jest CI mode
```

## Architecture

- **Next.js 16 App Router** — `app/` directory. Server Components by default; add `'use client'` only when needed.
- **TypeScript strict mode** — `strict`, `strictNullChecks`, `noImplicitAny` all enabled.
- **Path alias** — `@/` maps to `src/`. Use it for cross-feature imports; use relative imports within the same component folder.
- **Tailwind CSS** for all styling — no CSS-in-JS, no CSS Modules.
- **next-intl** for i18n — configured via `next-intl/plugin` in `next.config.ts` and `src/i18n/request.ts`.
- **@base-ui/react** — headless, unstyled UI primitives (Button, Badge, Separator). **shadcn** provides the base token/style layer via `@import "shadcn/tailwind.css"`. `tw-animate-css` for animation utilities. `lucide-react` for icons.
- **Global state** — prefer React hooks for local state and Server Components + `fetch` for server state. Add a global store (Zustand, Jotai) only when both prove insufficient.

## Folder structure

```
src/
├── app/              # Next.js App Router — layouts, pages, route handlers
├── components/       # Feature-based; every component is a folder (see below)
├── i18n/             # next-intl config — routing.ts (locale list) and request.ts (message loader)
├── styles/           # Global CSS, Tailwind base, CSS custom properties
├── translations/     # Locale JSON files — en-us.json, pt-br.json
├── utils/            # Helpers (cn.ts wraps clsx + tailwind-merge)
├── api.ts            # API client class — single entry point for external data
├── content.ts        # Normalized application types
├── constants.ts      # All env vars re-exported as named constants
└── proxy.ts          # Next.js edge middleware
```

## App Router conventions

- `app/` uses file-based routing: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Add `loading.tsx` at the route segment level for pages that fetch data — it becomes the Suspense boundary for the whole segment. Use `<Suspense>` directly inside a component for finer-grained granularity.
- `page.tsx` files are thin — import and render the matching component from `components/`.
- Default export is required for `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts`. Named exports everywhere else.
- Static pre-rendering: use `generateStaticParams()` for dynamic routes; use `export const dynamic = 'force-static'` when appropriate.
- ISR: set `export const revalidate = 60` at segment level, or pass `{ next: { revalidate: N } }` to `fetch`.
- API endpoints live in `app/api/**/route.ts` as Route Handlers.
- `error.tsx` must be a Client Component (`'use client'`).
- Always use `next/image` instead of `<img>` and `next/font` instead of `<link>` font tags — they handle lazy loading, layout shift prevention, and font subsetting automatically.
- Export `generateMetadata` from `page.tsx` for SEO — never set meta tags manually:

```ts
export async function generateMetadata({params}: Props): Promise<Metadata> {
    const post = await api.fetchPost(params.slug);
    return {title: post.title, description: post.excerpt};
}
```

## Server Actions

- Define Server Actions with `'use server'` at the top of a dedicated file — never inline inside a component file. Co-locate the actions file in the same component folder when the action is not shared (e.g., `Button/actions.ts`).
- Extract to `app/actions/` (or a feature-scoped `actions.ts`) when an action is used by more than one component.
- Keep actions thin: validate input, call the API class, revalidate, return a typed result. No business logic inside the action itself.
- Validate input before calling the API — never pass raw `FormData` unvalidated. When a validation library (Zod, Yup, etc.) is added, prefer `safeParse`-style returns so errors are typed, not thrown.
- Always type the return value explicitly so the client gets a typed result:

```ts
// app/actions/subscribe.ts
'use server';

import {revalidatePath} from 'next/cache';
import {api} from '@/api';

type ActionResult = {success: true} | {success: false; error: string};

export async function subscribe(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
    const email = formData.get('email');
    if (typeof email !== 'string' || !email.includes('@')) {
        return {success: false, error: 'Invalid email'};
    }
    await api.subscribe(email);
    revalidatePath('/');
    return {success: true};
}
```

- On the client, pair actions with `useActionState` (React 19) — it handles pending state, errors, and the result in one hook:

```tsx
'use client';
import {useActionState} from 'react';
import {subscribe} from '@/app/actions/subscribe';

export function SubscribeForm() {
    const [result, action, isPending] = useActionState(subscribe, null);
    return (
        <form action={action}>
            <input name="email" type="email" />
            <button disabled={isPending}>Subscribe</button>
            {result && !result.success && <p>{result.error}</p>}
        </form>
    );
}
```

- Revalidate after mutations with `revalidatePath()` or `revalidateTag()` — never trigger a full navigation to refresh data.

## Component conventions

Each component lives in its own folder:

```
ComponentName/
├── index.tsx         # Component — named export only
├── index.test.tsx    # Co-located Jest test
└── styles.ts         # Cva variants — only when the component has stylistic variants
```

- Use plain function declarations for all components — Server and Client alike. Do not use `FunctionComponent<Props>` (`FC`); async Server Components are incompatible with that type and consistency is cleaner than a split rule.
- Derive prop types from domain types using `Pick<SourceType, 'field1' | 'field2'>`.
- All user-facing strings go through `useTranslations()` (next-intl) — never hardcoded.
- Mark a component `'use client'` only when it uses browser APIs, event handlers, or hooks incompatible with Server Components (`useState`, `useEffect`, `useRef`, etc.).

## React guidelines

All React conventions are documented in:

- `/docs/react.md`

All generated React components must follow `/docs/react.md`.

If generated code conflicts with the React document, the React document takes precedence.

## Styling guidelines

All styling conventions, Tailwind rules, theming architecture, design token usage, and component styling patterns are documented in:

- `/docs/styling.md`

This includes:
- Tailwind class organization
- `cn()` usage conventions
- semantic grouping rules
- CVA (`class-variance-authority`) patterns
- responsive design conventions
- accessibility styling requirements
- design token usage
- dark mode conventions
- theming architecture
- runtime-dynamic styling rules

All generated React components and UI code must follow `/docs/styling.md`.

If generated code conflicts with the styling document, the styling document takes precedence.

## Data layer

- All external API calls go through the typed API class; import the singleton: `import {api} from '@/api'`.
- **Never mix** raw external entity types with normalized application types — keep them in separate files (`content.ts` for normalized, a separate file for raw types).
- Read all env vars through named constants in `src/constants.ts`, not `process.env` directly in components or hooks.
- Data normalization (external → app types) belongs in the API class, not in components.

## Custom hooks

- When custom hooks are needed, create `src/hooks/` and place each hook as `useCamelCase.ts` with a co-located `useCamelCase.test.ts`.
- Return plain objects with named keys — not arrays (except for hooks that intentionally mirror `useState`).
- Store async errors in state and return them — never re-throw from inside a hook.

## Testing conventions

Intended conventions:

- Use semantic queries (`getByRole`, `getByText`) — avoid `getByTestId`.
- Mock HTTP calls at the network level with MSW.
- Place `jest.mock(...)` calls at the top of the file.
- Use `it.each()` for parametrized scenarios.
- `describe` block names: `<ComponentName />` for components, bare function/hook name for utilities.
- `it` descriptions start with `"should"`.
- Treat `console.error` / `console.warn` in tests as failures — fix the root cause. 
- Always creates tests that validates the component is rendering correctly and validates the behavior given user actions.

Follow the examples below: 

```
describe('<Button />', () => {
    it('should render a button', () => {
        render(<Button appearance="neutral" label="labeYoul" />);

        expect(screen.getByRole('button', {name: 'label'})).toBeInTheDocument();
    });
    
     it('should invoke the click callback when the button is clicked', async () => {
        const callback = jest.fn();

        render(<Button appearance="neutral" onClick={callback} label="label" />);

        await userEvent.click(screen.getByRole('button', {name: 'label'}));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
```

## i18n conventions

This project uses **next-intl**. Translation files are JSON at `src/translations/en-us.json` and `src/translations/pt-br.json`. `src/i18n/request.ts` loads messages per request; `src/i18n/routing.ts` defines supported locales.

- In Server Components, use `getTranslations({ locale, namespace })` from `next-intl/server`.
- In Client Components, use `useTranslations(namespace)` from `next-intl`.
- Key structure is flat dot-notation within a namespace: `home.hero.name`, `home.contact.heading`. The namespace is passed to the hook — not embedded in the key with a colon.
- Pass the namespace string literal directly to `useTranslations()`/`getTranslations()` — no separate `translations.ts` file needed.
- Never hardcode UI strings — always use `t('key.path')`.
- Locale codes are lowercase with a hyphen: `en-us`, `pt-br`.
- The locale is a dynamic route segment: `app/[locale]/`. `NextIntlClientProvider` wraps the layout body and receives `messages` from `getMessages()`.

## TypeScript conventions

- Prefer `interface` for object shapes that may be extended; `type` for unions, intersections, and utility types.
- Use `Pick<T, K>` for prop subsets; `Omit<T, K>` to exclude fields.
- Avoid `!` non-null assertions — use proper narrowing instead.
- Use `unknown` over `any`. `any` silently disables type checking; `unknown` forces narrowing before use.
- Use `import type` for type-only imports — it is erased at compile time and prevents accidental runtime dependencies:

```ts
import type {Metadata} from 'next';
import type {Post} from '@/content';
```

- No `enum` — use a `const` object with `as const` and derive the type from it:

```ts
const Direction = {Up: 'up', Down: 'down'} as const;
type Direction = typeof Direction[keyof typeof Direction];
```

## ESLint rules (enforced)

- `for...in` is banned — use `Object.keys()`, `Object.entries()`, or `for...of`.
- Default exports are only allowed in App Router special files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`), `proxy.ts`, and i18n config. All other modules use named exports.
- `@typescript-eslint/no-explicit-any` — enforces `unknown` over `any`.
- `@typescript-eslint/consistent-type-imports` — enforces `import type` for type-only imports.

## Collaboration rules

- **Do exactly what is asked — nothing more.** If the instruction is "replace hardcoded strings with `t()` calls", only change those strings. Do not rename variables, reformat code, convert `div` to semantic elements, remove unused imports, or add `aria-*` attributes unless those were explicitly requested.
- **Changing untouched code introduces risk.** Every extra edit is a potential source of bugs, broken tests, or visual regressions that the user did not sign off on.
- **When you spot something worth improving, say so — don't do it.** One sentence is enough: "I also noticed X; want me to fix that too?" Wait for a yes before acting.

## Commit & PR conventions

- Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org) format: `type(scope): description`. Common types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.
- Keep the subject line under 72 characters. Use the body for the *why*, not the *what*.
- PRs should be small and focused — one concern per PR makes review faster and reverts cleaner.
