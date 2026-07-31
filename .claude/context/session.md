# Session State — Live Scratchpad

> Update this file at the end of every task. This is the only context file loaded by default alongside the task-specific file. Keep it under 100 lines.

---

## Current Task
<!-- What are we building right now? -->
Homepage — Navbar + HeroSection + Button component done. Next: remaining homepage sections.

## Locked Decisions
<!-- Things decided and not up for debate again -->
- Palette: **Light theme** — Warm off-white bg (`#FAFAF7`) + near-black text (`#121212`) + `#FFD600` accent. Surface white is `#FFFFFF` (elevated only). Border: `#E8E8E8`. (overrides original dark-bg spec)
- Framework: Next.js (App Router)
- Animation: GSAP (ScrollTrigger registered in lib/gsap/index.ts)
- Font: Epilogue only — all type (display, body, UI, labels)
- Target emotion: Relieved
- Button: arrow-dots interaction with variants (primary/ghost/accent, sizes sm/md/lg)

## In Progress
<!-- Decisions being worked through -->
_None_

## Open Questions
<!-- Things that need answers before proceeding -->
- Font: Epilogue (locked — single typeface, all weights)
- CMS choice for blog (Contentful / Sanity / MDX)?

## Pages Completed
<!-- Route + status -->
_None yet_

## Components Locked
<!-- Reusable components finalized and not to be changed -->
- `components/ui/Navbar.tsx` — fixed nav, real logo, hover dropdowns, mobile drawer
- `components/ui/Button.tsx` — arrow-dots button, variants: primary/ghost/accent, sizes: sm/md/lg
- `components/ui/DotGrid.tsx` — canvas dot grid, mouse repel interaction
- `components/sections/HeroSection.tsx` — full-vh, dot grid bg, geometry, GSAP word reveal

## Known Constraints
- No color gradients
- Accent `#FFD600` max 10% of total visual surface across entire site. Rest is black/white/grey only.
- Every page must have schema markup
- All images need alt text + next/image optimization
- No layout shift (CLS must be < 0.1)

## Last Updated
2026-07-31 — About page density/rhythm pass: copy cut ~45%, surface rhythm added (CoreValues + StatsCounters on white `--color-surface` slabs; a dark inverted slab was tried and rejected — don't re-propose), Insights duplicate desktop/mobile DOM collapsed, gallery grid span math fixed for mobile. Then a minimal pass on user review ("tons of AI slop"): every per-item hairline removed, 01–06 indices removed, photo radius/hover-morph removed, all motion now scroll-only. Story arc + section order unchanged. See learning.md [Minimal] entries, [Section] surface rhythm, [Copy] density budget, [Responsive] no hidden-toggled copies.