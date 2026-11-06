# Motion System — `wv`

Motion makes type feel alive. Letters rise, words light up on scroll, photos open like shutters. Every effect already exists in `components/wv/ui.tsx`. Reuse it. Do not hand-roll.

## Constants

- Ease: `ease = [0.16, 1, 0.3, 1]` from `ui.tsx`. CSS: `cubic-bezier(.16,1,.3,1)`. The only curve, except `linear` for loops/scrub and `easeIn` on exits.
- Durations: 0.2–0.3s color/hover · 0.35–0.4s button wipe, arrow, tabs · 0.6s reveals and letters · 0.9s image clip, photo zoom · 1.4s count-up.
- In-view: `once: true`, margin `-8%` (photos/counters `-10%`).
- Library: `motion/react` only. Smooth scroll: Lenis via `<Smooth />` (already in `WvPage`). No GSAP in new work.

## Primitives (`ui.tsx`)

| Effect | Primitive | Use for |
|---|---|---|
| Letter rise (y 105% → 0, rotate 8 → 0, 18ms/char, 80ms/line) | `KineticTitle` | Every h2, CTA headline, hero lines |
| Rotating phrase | `RotatingWord` | Hero only, one per page |
| Fade-up 24px | `Reveal` (`delay` 0.05 × i to stagger) | Asides, lists, rows, CTA rows |
| Word-by-word opacity on scroll (0.16 → 1) | `ScrollWords` | One statement paragraph per page |
| Clip-open + parallax ±8% | `ParallaxPhoto` | Section photos beside text |
| Count 0 → n | `CountUp` | Stats only |
| Magnetic pull 0.35 (0.5 orb) | `Magnetic` | Primary CTA only |
| Letter hover lift | `HoverLetters` | List-row titles |
| Scroll-velocity marquee | `VelocityMarquee` | Logos, band, CTA outline |
| Page progress bar | `ScrollProgress` | Once per page (in `WvPage`) |

Page-level patterns in `Home.tsx` (copy, don't import across pages): hero pointer parallax, hero fade-out on scroll, cursor-follow photo, sticky card stack with scale/dim, pinned horizontal process, quote blur-in rotator.

## Rules

- One effect per element. Headings animate letters, not also fade.
- Hover is CSS (`wv.css`), not JS. Pointer effects check `e.pointerType === 'mouse'`.
- Animate `transform`, `opacity`, `clip-path`, `filter` only. Never layout properties.
- Loops allowed: marquees, hero spin badge, `.wv-dot` ping, AI nav bolt/snake. Nothing else loops.
- Reduced motion: every primitive checks `useReducedMotion()` and renders final state. New motion must do the same. `wv.css` kills CSS transitions under `prefers-reduced-motion`.
- Split text keeps a `.wv-sr` full-text copy; split spans are `aria-hidden`.
- Pinned/scroll-jacked sections: desktop (≥960) and motion-allowed only, max one per page.
- Hero copy must paint without JS. Above-the-fold `Photo` gets `priority`.

## New Effect

Only if the user asks for something no primitive covers. Add it to `ui.tsx` as a named export using `ease`, `useReducedMotion`, `.wv-sr`. Log it in `.ai/learning.md`.
