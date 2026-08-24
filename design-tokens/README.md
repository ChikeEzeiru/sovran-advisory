# Design tokens

The JSON files in `source/` are the source-of-truth exports from Figma.

- `primitives.tokens.json` contains primitive colors and spacing.
- `light.tokens.json` contains light semantic and component colors.
- `dark.tokens.json` contains dark semantic and component colors.

Run `npm run tokens:build` after replacing any source export. The generator preserves explicit Figma primitive aliases and `{Token.Path}` aliases between semantic tokens. It emits `generated.css`, which is imported by `app/globals.css` and exposed to Tailwind as semantic utilities.

Examples:

```tsx
<p className="text-text-primary" />
<div className="bg-bg-primary border-border-primary" />
```

Apply `data-theme="dark"` or `data-theme="light"` to an ancestor to set an explicit color mode. Explicit light scopes are useful for light surfaces nested inside dark sections.
