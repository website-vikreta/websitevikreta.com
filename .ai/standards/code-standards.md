# Code Standards

## Non-Negotiable

- TypeScript strict. No `any`. No `@ts-ignore` without a reason comment.
- Next.js here has breaking changes. Read `node_modules/next/dist/docs/` before using an API you are unsure of.
- Shortest working diff. Reuse `components/wv/ui.tsx` and `data.ts` before writing anything.
- Comment only the non-obvious *why*. Match surrounding density.

## `wv` Structure

```
app/wv.css              all wv styles (tokens + classes). Append new blocks at the end: /* wv: <name> */
components/wv/ui.tsx    shared primitives (motion, icons, media)
components/wv/data.ts   copy, links, image URLs, lists as typed constants
components/wv/<Page>.tsx page sections as local functions, one exported page component
components/wv/fonts.ts  Anton + Inter Tight (next/font/google)
```

- New page: `<div className={\`wv ${wvFonts}\`}>` wrapper (see `WvPage.tsx`), sections as functions, copy in `data.ts` (or a sibling `data-<page>.ts` once it grows).
- Styling: plain classes from `wv.css`. No Tailwind utilities, no CSS modules, no inline styles except motion values and per-item numbers (e.g. logo height, sticky offset).
- Colors via `var(--token)` only. No hex in TSX.
- `'use client'` only on files that use hooks/motion. Server components by default.
- Images: `Photo`/`ParallaxPhoto` (wrap `next/image`). Raw `<img>` only for SVG/PNG logos, with the eslint-disable reason comment already used in `ui.tsx`.
- Links: `next/link` internally, `<a target="_blank" rel="noopener noreferrer">` externally.

## Accessibility

- Semantic landmarks: one `<main>`, `<section>` with heading or `aria-label`.
- One `h1` per page. Kinetic text keeps `.wv-sr` real text.
- Focus ring inherited from `.wv :focus-visible`. Never remove it.
- Decorative SVG/photos: `aria-hidden` / `alt=""`. Content photos: real alt.
- Contrast: `--muted` on canvas passes AA. Yellow never carries text on light.
- Custom widgets get roles (`tablist`/`tab`/`aria-selected`, `aria-expanded`).

## Performance

- LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Above fold: no dynamic imports, hero text server-rendered visible.
- `sizes` on every `Photo`. `priority` only above the fold.
- Clean up listeners, intervals, rAF, Lenis in effect returns.

## Verify

`npx tsc --noEmit` and `npx eslint <touched files>` before handoff.

## Commits

Conventional: `feat(scope): …`, `fix`, `perf`, `seo`, `style`, `docs(ai)`. Only when the user asks.
