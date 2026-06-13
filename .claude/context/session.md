# Session State — Live Scratchpad

> Update this file at the end of every task. This is the only context file loaded by default alongside the task-specific file. Keep it under 100 lines.

---

## Current Task
<!-- What are we building right now? -->
Homepage — Navbar + HeroSection + Button component done. Next: remaining homepage sections.

## Locked Decisions
<!-- Things decided and not up for debate again -->
- Palette: **Light theme** — White bg + Black text + `#FFD600` accent (overrides original dark-bg spec)
- Framework: Next.js (App Router)
- Animation: GSAP (ScrollTrigger registered in lib/gsap/index.ts)
- Font: Geist Sans + Geist Mono (locked)
- Target emotion: Relieved
- Button: arrow-dots interaction with variants (primary/ghost/accent, sizes sm/md/lg)

## In Progress
<!-- Decisions being worked through -->
_None_

## Open Questions
<!-- Things that need answers before proceeding -->
- Font pairing: Geist Sans + Geist Mono locked (from code standards)
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
2026-06-13 — Light theme switch, actual logo, Button (arrow-dots), DotGrid canvas, geometry in hero