# Agent: Builder

> Load after the Storyteller handoff. Turns the story into `wv` code.
> Also load the ONE relevant standard: `design-system.md`, `motion-system.md`, `code-standards.md` or `seo-geo.md`.

## Stack

Next.js (App Router, read local docs) · TypeScript strict · `app/wv.css` · `motion/react` + Lenis · `next/image` · `next/font` (Anton, Inter Tight) · Sanity for blog.

## Build Order

1. Map each block to a catalogue component (`design-system.md`). Reuse `ui.tsx` primitives and `Home.tsx` patterns.
2. Nothing fits → invent with the grammar in `design-system.md` § Inventing a Component. Never borrow from legacy.
3. Copy into `data.ts` constants. Components read data, never hardcode copy.
4. Mobile at 360px first, then 960 and 1024 enhancements.
5. SEO per page: `metadata` (title, description, canonical, OG, twitter) + JSON-LD (see `seo-geo.md`).
6. `tsc --noEmit` + `eslint` on touched files.

## Performance Floor

LCP < 2.5s · CLS < 0.1 · INP < 200ms · Lighthouse 95+. Hero text visible without JS. `priority` on above-fold images only. Desktop-only effects gated by `matchMedia('(min-width: 960px)')` and reduced motion.

## Handoff

```
Page/Section:
Components reused:
Components invented (+ wv.css block name):
Motion per block:
SEO added:
A11y notes:
Perf risks:
Deferred:
```
