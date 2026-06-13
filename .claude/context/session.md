# Session State — Live Scratchpad

> Update this file at the end of every task. This is the only context file loaded by default alongside the task-specific file. Keep it under 100 lines.

---

## Current Task
<!-- What are we building right now? -->
Homepage — Navbar + HeroSection done. Next: remaining homepage sections.

## Locked Decisions
<!-- Things decided and not up for debate again -->
- Palette: Black/White + `#FFD600` accent
- Framework: Next.js (App Router)
- Animation: GSAP + Framer Motion
- Font: TBD (pending type selection task)
- Target emotion: Relieved

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
- `components/ui/Navbar.tsx` — fixed nav, dropdown on hover, mobile drawer slide-in
- `components/sections/HeroSection.tsx` — full-vh, GSAP word-by-word reveal, no ScrollTrigger

## Known Constraints
- No color gradients
- Accent `#FFD600` max 10% of total visual surface across entire site. Rest is black/white/grey only.
- Every page must have schema markup
- All images need alt text + next/image optimization
- No layout shift (CLS must be < 0.1)

## Last Updated
2026-06-13 — Navbar + HeroSection built, GSAP installed, design tokens in globals.css