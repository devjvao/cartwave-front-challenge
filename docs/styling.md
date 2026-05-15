# Styling conventions

## Core principles

- All styling must use Tailwind CSS utility classes.
- Avoid inline `style` props except for runtime-dynamic values.
- Prefer semantic design tokens over raw palette utilities.
- Components must remain theme-aware.
- Prioritize readability over compact class strings.
- Prefer explicitness and consistency over clever abstractions.

---

# Rule priority

When conventions overlap, follow this priority order:

1. Accessibility
2. Semantic design tokens
3. Readability
4. Consistency
5. Conciseness

---

# Class name organization

## Plain string vs `cn()`

Use a plain `className` string when the full value does not exceed
80 characters (including spaces and tabs).

Preferred:

```tsx
className="flex items-center gap-2 rounded-md border px-3 py-2"
```

Use `cn()` when:
- classes become conditional
- classes are merged dynamically
- semantic grouping improves readability
- variants/states exist
- the line exceeds 80 characters

The 80-character plain-string rule takes precedence over multiline grouping.

---

## `cn()` convention

Use the `cn()` helper (`clsx` + `tailwind-merge`) for conditional
or merged class names.

All multiline Tailwind class definitions must use semantic grouping comments.

### Required pattern

```tsx
className={cn(
    // layout
    'flex w-full items-center justify-between',

    // spacing
    'px-4 py-3',

    // appearance
    'rounded-xl border border-border bg-background shadow-sm',

    // typography
    'text-sm font-medium text-foreground',

    // interactions
    'transition hover:bg-muted'
)}
```

Avoid unreadable one-line blobs:

```tsx
className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
```

Avoid unnecessary `cn()` usage for short static strings:

```tsx
className={cn(
    'flex items-center gap-2 rounded-md border px-3 py-2'
)}
```

## Semantic grouping comments

The semantic grouping comments shown in examples are illustrative and exist to demonstrate how classes should be logically segmented.

The comments themselves are not required in production code.

Example:

```tsx
className={cn(
    // layout
    'flex items-center justify-between',

    // spacing
    'px-4 py-2',

    // appearance
    'rounded-lg border border-border bg-background'
)}
```

Comments should always be omitted:

```tsx
className={cn(
    'flex items-center justify-between',
    'px-4 py-2',
    'rounded-lg border border-border bg-background'
)}
```

For small class groups, prefer a plain string when under the 80-character limit:

```tsx
className="flex items-center gap-2 rounded-md border px-3 py-2"
```

---

# Semantic group ordering

Use this order when organizing multiline class definitions:

1. layout
2. positioning
3. spacing
4. sizing
5. appearance
6. typography
7. effects
8. animations
9. interactions
10. state modifiers

Not every group is required.

---

# Group definitions

## Layout

Structure and flex/grid behavior.

Examples:

```tsx
'flex grid items-center justify-between'
```

---

## Positioning

Examples:

```tsx
'relative absolute inset-0 z-10'
```

---

## Spacing

Examples:

```tsx
'gap-2 px-4 py-2'
```

---

## Sizing

Examples:

```tsx
'w-full h-10 min-h-screen'
```

---

## Appearance

Prefer semantic tokens whenever available.

Preferred:

```tsx
'rounded-xl border border-border bg-background shadow-sm'
```

Raw palette utilities are acceptable for:
- temporary states
- data visualization
- marketing pages
- isolated decorative elements
- prototypes

Examples:

```tsx
'bg-blue-500 border-zinc-200'
```

---

## Typography

Prefer semantic typography tokens whenever available.

Examples:

```tsx
'text-sm font-medium text-foreground'
```

---

## Effects

Examples:

```tsx
'opacity-70 blur-sm scale-95'
```

---

## Animations

Examples:

```tsx
'transition animate-in duration-200'
```

---

## Interactions

Examples:

```tsx
'hover:bg-muted focus-visible:ring-2'
```

---

## State modifiers

Conditional visual states should remain close to the relevant semantic group.

Preferred:

```tsx
className={cn(
    // appearance
    'border border-border bg-background',

    error && 'border-destructive',

    // interactions
    'hover:bg-muted'
)}
```

Examples:

```tsx
active && 'border-primary'
disabled && 'pointer-events-none opacity-50'
```

---

# Formatting rules

## Keep one concern per line

Preferred:

```tsx
className={cn(
    // layout
    'flex items-center',

    // spacing
    'gap-2 px-4 py-2'
)}
```

Avoid:

```tsx
className={cn('flex items-center gap-2 px-4 py-2')}
```

for medium/large components.

---

## Use comments consistently

Always use lowercase semantic comments.

Preferred:

```tsx
// layout
// spacing
// appearance
```

Avoid:

```tsx
// Layout Styles
// SPACING
```

---

## Keep related utilities together

Preferred:

```tsx
'px-4 py-2'
```

Avoid unnecessary fragmentation:

```tsx
'px-4'
'py-2'
```

---

# Repeated styles

If styles are repeated more than two times in a row, suggest creating a new React component.

---

# Component variants

Use `cva` (`class-variance-authority`) when a component has:
- size variants
- appearance variants
- stylistic states
- reusable variant combinations

Variant exports must use the `*Variants` suffix.

Preferred:

```ts
// styles.ts
import {cva} from 'class-variance-authority';

export const buttonVariants = cva(
    'rounded-lg font-medium focus-visible:ring-2',
    {
        variants: {
            size: {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-4 py-2 text-base',
            },

            appearance: {
                primary:
                    'bg-primary text-primary-foreground hover:bg-primary/90',

                ghost:
                    'bg-transparent text-foreground hover:bg-muted',
            },
        },

        defaultVariants: {
            size: 'md',
            appearance: 'primary',
        },
    }
);
```

Avoid giant conditional styling blocks inside JSX.

---

## Responsive behavior in CVA

CVA variants must not replace Tailwind responsive prefixes.

Preferred:

```tsx
'flex flex-col lg:flex-row'
```

Avoid:

```ts
size: {
    mobile: '...',
    desktop: '...',
}
```

Responsive intent should remain explicit in component markup.

---

# Runtime-dynamic values

Prefer Tailwind utility classes for static styling.

Use CSS custom properties for values determined at runtime.

Examples:
- JS-calculated dimensions
- drag offsets
- animation coordinates
- API-provided measurements

Preferred:

```tsx
<div
    style={{
        '--sidebar-width': `${sidebarWidth}px`,
    } as React.CSSProperties}
    className="w-[var(--sidebar-width)]"
/>
```

Avoid runtime-generated Tailwind class strings:

```tsx
className={`w-[${sidebarWidth}px]`}
```

---

# Responsive design

Use Tailwind responsive prefixes directly.

Allowed:
- `sm:`
- `md:`
- `lg:`
- `xl:`

Preferred:

```tsx
'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
```

Avoid:
- custom breakpoint abstractions
- semantic breakpoint aliases
- wrapper responsive utilities

Responsive behavior should remain explicit in component markup.

---

# Accessibility

## Focus states

Interactive elements must include visible focus states.

Preferred:

```tsx
'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
```

Apply focus-visible styles consistently to:
- buttons
- links
- inputs
- selects
- textareas
- interactive cards
- custom controls

Avoid removing outlines without replacement styles.

---

# Design system / theming

## Theme architecture

Design tokens are implemented with CSS custom properties.

Tailwind utilities map to semantic token variables.

Themes are switched by toggling a class on `<html>`.

No runtime JS color computation should exist.

---

## Token definition

Tokens are defined in `src/styles/globals.css`.

Raw variables exist on:
- `:root`
- `.dark`

Tokens use the OKLch color format.

Preferred:

```css
:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
}

.dark {
    --background: oklch(0.09 0.025 275);
    --foreground: oklch(0.97 0.005 280);
    --primary: oklch(0.82 0.17 167);
}
```

---

## Tailwind token mapping

Tailwind v4 uses CSS-first token mapping.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
}
```

---

## Semantic token usage

Always prefer semantic token utilities.

Correct:

```tsx
<div className="bg-background text-foreground border border-border">
    <p className="text-muted-foreground">...</p>

    <button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Save
    </button>
</div>
```

Avoid raw palette combinations for application UI:

```tsx
<div className="bg-white text-gray-900">
```

Raw palette utilities are acceptable only for:
- data visualization
- isolated decorative elements
- marketing pages
- temporary prototypes

---

## Dark mode

Prefer semantic tokens over direct `dark:` overrides.

Preferred:

```tsx
'bg-background text-foreground'
```

Use `dark:` only for:
- one-off exceptions
- legacy compatibility
- cases not covered by tokens

Avoid:

```tsx
'bg-white text-black dark:bg-zinc-900 dark:text-white'
```

---

## Theme switching

`next-themes` is not currently installed.

The dark theme is statically applied on `<html>` in the locale layout.

When dynamic theme switching is introduced:
- use `next-themes`
- configure `attribute="class"`
- add `suppressHydrationWarning` on `<html>`

This avoids hydration mismatch and theme flashing.

---

# Do not

## Do not alphabetically sort Tailwind classes

Semantic grouping is more important than alphabetical ordering.

---

## Do not extract individual utility constants

Avoid:

```ts
const rounded = 'rounded-xl';
const padding = 'px-4 py-2';
```

Extract reusable UI patterns instead.

---

## Do not mix semantic tokens with raw palette surfaces

Avoid:

```tsx
'bg-background text-white border-zinc-200'
```

Prefer consistent semantic theming:

```tsx
'bg-background text-foreground border-border'
```

---

## Do not generate runtime Tailwind strings

Avoid:

```tsx
className={`w-[${width}px]`}
```

Use CSS variables instead.

---

# Review checklist

Before submitting code:

- [ ] Uses plain string when under 80 characters
- [ ] Uses `cn()` when appropriate
- [ ] Uses semantic grouping comments
- [ ] Groups follow correct ordering
- [ ] Uses semantic design tokens when available
- [ ] Avoids giant inline class blobs
- [ ] Keeps conditional classes readable
- [ ] Extracts repeated UI patterns appropriately
- [ ] Uses CVA for variant-heavy components
- [ ] Uses responsive prefixes directly
- [ ] Includes accessible focus-visible states
- [ ] Avoids runtime-generated Tailwind classes
- [ ] Avoids raw palette colors for theme-aware UI
- [ ] Keeps responsive behavior explicit