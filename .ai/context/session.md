# Session State

> Live scratchpad. Update at the end of every task. Keep under 60 lines. History lives in git.

## Current Task

New design language `wv` shipped on the homepage and global header/footer (commit `3d6f391`, branch `feat/navbar-update-2026-11`). Agent instructions rewritten around it on 2026-10-30. Next: migrate inner pages to `wv`.

## Locked Decisions

- Design language: `wv` only (`app/wv.css`, `components/wv/*`). Spec: `.ai/standards/design-system.md`.
- Palette: canvas `#f6f4ee`, ink `#121212`, yellow `#fac800` (fill only on light), gold `#8a6d00` (yellow text), dark footer `#161616`.
- Type: Anton (display, uppercase) + Inter Tight (text). No other faces.
- Motion: `motion/react` + Lenis, primitives in `components/wv/ui.tsx`, ease `[0.16, 1, 0.3, 1]`. No new GSAP.
- Header/footer: `components/wv/SiteChrome.tsx`, mounted in `app/layout.tsx`.
- Homepage: `WvPage` → `components/wv/Home.tsx`, copy in `components/wv/data.ts`.
- Target emotion: relieved. Proof is real only, never invented.

## Legacy (still live, do not extend)

Inner pages (`/services/*`, `/work`, `/about`, `/blog`, `/contact`, …) use the old system: `components/sections/*`, `components/ui/*`, GSAP, `Reveal.tsx`, Utile font, `--color-*` tokens, global `CTASection`. `components/home/*` + `.home-*` CSS are an abandoned homepage draft, unused.

## Open

- Inner-page migration order.
- Real photography to replace Unsplash `IMG` placeholders.

## Last Updated

2026-10-30
