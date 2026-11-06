# Command Recipe: fix-performance

> Diagnose and fix one LCP / CLS / INP / bundle problem.

**Load:** `agents/builder.md` (performance floor), `session.md`.
**Input:** route or component, failing metric, Lighthouse numbers if known.

## Diagnose

- **LCP > 2.5s** — LCP element hidden until JS/motion runs? Hero `Photo` missing `priority` or `sizes`? Fonts via `next/font`? Render-blocking script?
- **CLS > 0.1** — media without fixed box (`aspect-ratio` / sized parent)? Content injected above existing content? Font swap shifting Anton lines?
- **INP > 200ms** — unthrottled pointer/scroll handlers? Too many per-letter motion spans on one screen? Work on interaction that could be CSS?
- **Bundle** — `next build`. Legacy GSAP or heavy libs pulled into a `wv` page? `'use client'` higher in the tree than needed?

## Output

Root cause · fix applied · expected delta · rule logged in `learning.md` if reusable.
