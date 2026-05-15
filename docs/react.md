# React conventions

## Hook usage

- Use the following useEffect format, respecting line breaks:

```
useEffect(
    () => {
        // code here
    }, 
    [/* dependencies here */],
);
```

- Use the following useMemo/useCallback format, respecting line breaks:

```
const value = useMemo(
    () => {
        // code here
    }, 
    [/* dependencies here */],
);

const callback = useCallback(
    () => {
        // code here
    }, 
    [/* dependencies here */],
);
```

## Props type naming

Component prop types must use the `ComponentNameProps` convention.

Preferred:

```tsx
type ProductCardProps = {
    product: Product;
    onSelect?: () => void;
};
```

Avoid generic or ambiguous names:

```tsx
type Props = {};
type CardData = {};
type ProductCardType = {};
```

---

## Props destructuring

### Inline destructuring

When a component has 1 or 2 props, destructure inline in the function signature.

Preferred:

```tsx
export function ProductCard({product, onSelect}: ProductCardProps) {
    return <div />;
}
```

---

### Body destructuring

When a component has more than 2 props, receive a `props` object and destructure inside the component body.

Each destructured prop must be placed on its own line.

Preferred:

```tsx
export function ProductCard(props: ProductCardProps) {
    const {
        product,
        onSelect,
        isSelected,
        className,
    } = props;

    return <div />;
}
```

Avoid large inline destructuring blocks:

```tsx
export function ProductCard({
    product,
    onSelect,
    isSelected,
    className,
}: ProductCardProps) {
    return <div />;
}
```

for components with many props.

---

## Destructuring formatting

When destructuring across multiple lines:
- keep one prop per line
- include trailing commas
- align closing braces consistently

Preferred:

```tsx
const {
    product,
    onSelect,
    className,
} = props;
```

Avoid:

```tsx
const {product, onSelect, className} = props;
```

for multiline destructuring.

## JSX attribute formatting

### Inline attributes

When a JSX element has 1 or 2 short attributes, keep them inline.

Preferred:

```tsx
<Button variant="primary" size="sm" />
```

---

### Multiline attributes

Use multiline formatting when:
- the element has more than 2 attributes
- an attribute value spans multiple lines
- readability improves significantly

Each attribute must be placed on its own line.

Preferred:

```tsx
<a
    href={learnMoreHref}
    aria-label={learnMoreAriaLabel}
>
    Learn more
</a>
```

Avoid compressed multiline attributes:

```tsx
<a href={learnMoreHref} aria-label={learnMoreAriaLabel} className="something">
```

for larger elements.

---

### Attribute ordering

Short and simple attributes should appear first.

Multiline or visually noisy attributes should be placed last.

This usually includes:
- `className`
- long `aria-*` values
- render props
- callbacks
- object literals
- multiline expressions

Preferred:

```tsx
<a
    href={learnMoreHref}
    aria-label={learnMoreAriaLabel}
    className={cn(
        'inline-flex items-center justify-between gap-2 w-full',
        'px-4 py-2',
        'h-10',
    )}
>
    Learn more
</a>
```

Avoid placing large multiline attributes before simple attributes:

```tsx
<a
    className={cn(
        'inline-flex items-center justify-between gap-2 w-full',
        'px-4 py-2',
        'h-10',
    )}
    href={learnMoreHref}
    aria-label={learnMoreAriaLabel}
>
```
