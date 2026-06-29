# Learning Log — Uniformity & Consistency

Persistent memory of design + code conventions for this site. Every reusable decision lands here so the site stays uniform across pages and sessions.

## How To Use This File
- **Before building** any page/component: read this file. Reuse what exists. Do not reinvent.
- **After learning** anything reusable: log it here immediately. One entry = one rule.
- **On conflict**: if new work contradicts a logged rule, stop. Either follow the rule or update the rule with reason. Never silently diverge.
- Keep entries short, specific, copy-pasteable. Prefer exact values (px, ms, hex, token names) over prose.

## Entry Format
```
### [Topic] — short title
- Rule: <the convention, exact values>
- Where: <files/components using it>
- Why: <reason, if not obvious>
- Date: YYYY-MM-DD
```

---

## Spacing & Layout
### [Section] — vertical rhythm
- Rule: Every top-level page section uses `py-16 md:py-20`. No other section padding values.
- Where: all `components/sections/*` on home page.
- Why: equal gaps between components = uniform page rhythm.
- Date: 2026-06-28

### [Section] — heading-to-content gap
- Rule: Section heading block bottom margin = `mb-10 md:mb-14`.
- Where: home page section headers.
- Date: 2026-06-28

## Typography
### [Hierarchy] — section H2
- Rule: Section headings use the `text-h2` token (`clamp(1.75rem,4vw,3rem)`, `leading-h2`) + `font-bold` + `text-(--color-text)`. Never raw `text-3xl/4xl` or custom clamps for a section heading.
- Where: all home sections (Stats, Services, Clients, Featured, Tech, Testimonials, Blog).
- Why: one section-heading size across page = consistent hierarchy.
- Date: 2026-06-28

### [Hierarchy] — card / item title (h3 tier)
- Rule: Card/list item titles use `text-2xl sm:text-3xl font-bold`. One tier below section H2.
- Where: FeaturedWork case cards, Services stack cards.
- Date: 2026-06-28

### [Hierarchy] — section subhead (H3 token)
- Rule: Section subheading under an H2 uses the `.text-h3` utility (`--text-h3` = `clamp(1.5rem,3vw,2.125rem)`, `--leading-h3` = 1.3) + `font-semibold` + `text-(--color-text-muted)`, spaced `mt-3 md:mt-4` below the H2. Wrap in `RevealText as="h3"` with `delay={0.12}` so it staggers after the H2 line reveal. Reuse `.text-h3` — never raw clamps/text-xl for a section subhead.
- Where: TechnologiesSection ("Powered by AI. Future Tech." → subhead).
- Why: gives section heads a two-line H2→H3 hierarchy that stays on the design-system scale.
- Date: 2026-06-29

### [Hierarchy] — eyebrow / meta label
- Rule: `text-xs font-bold uppercase tracking-widest text-(--color-text-faint)` OR `text-meta-label` token. Sits above a heading.
- Date: 2026-06-28

## Color & Accent
### [Tokens] — no raw hex for text/surface
- Rule: Always `var(--color-*)` tokens. Never raw hex (`#121212`, `#525252`, …) for text/bg/border. Accent = `var(--color-accent)` (#FFD600).
- Where: converted Testimonials hardcoded hex → tokens.
- Date: 2026-06-28

## Components & Patterns
### [Reveal] — shared motion primitives
- Rule: Use `components/ui/Reveal.tsx` for ALL scroll reveals. Never hand-roll GSAP/motion per section.
  - `RevealText` — masked line reveal (overflow-hidden clip + inner translateY 110%→0). For headings + titles. Props: `as`, `delay`, `duration`.
  - `RevealFade` — fade-up (opacity 0 + y24 → 0). For cards + supporting text. Stagger a group with `delay={i * 0.1}`.
  - `Counter` — count 0→value once scrolled into view (power2.out).
- Easing: single curve `REVEAL_EASE = [0.16, 1, 0.3, 1]` (~expo.out, matches hero).
- Trigger: all primitives use `viewport`/`useInView` with `once: true` + `margin: '0px 0px -200px 0px'` (one shared `REVEAL_MARGIN`). Element must be ~200px inside the viewport before it fires — gives a beat instead of firing at the edge.
- `RevealText` observes the STATIC clip wrapper (not the moving inner line) — see anti-pattern below.
- Where: every home section.
- Date: 2026-06-28

## Animation & Motion
### [Home] — unified reveal language
- Rule: One motion language across the whole page (mirrors the hero overflow-hidden reveal).
  - Section headings + titles → `RevealText` masked slide-up.
  - Cards (Stats, Services stack, Featured cases, Blog) → `RevealFade` fade-up, staggered by index.
  - Stat numbers → `Counter` count-up 0→value.
- Multi-line heading: one `RevealText` per line, stagger via `delay` (e.g. Services lines 0 / 0.12).
- Card titles animate WITH their card (fade), not as separate masks. Section headings get the mask.
- Untouched (own motion): continuous marquees (Clients, Tech), Services sticky-stack scale (now also fades in), testimonial carousel switching.
- Hero stays bespoke (GSAP, load-triggered word stagger) — the reusable primitives copy its look for scroll-triggered sections.
- Why: unified style + structure across the page; consistency is the goal.
- Date: 2026-06-28 (supersedes earlier "reveals reserved for hero" rule)

## Code Conventions
### [Reuse] — shared primitives over per-component motion
- Rule: Scroll reveals come from `components/ui/Reveal.tsx`. Don't hand-roll GSAP/motion `whileInView` per section. New section = import `RevealText`/`RevealFade`/`Counter`.
- Why: one easing/timing/trigger everywhere; fix once, fixes all.
- Date: 2026-06-28

### [Hex] — tokens only in components
- Rule: No raw hex in component files (matches code-standards.md). Use `var(--color-*)`.
- Date: 2026-06-28

## Naming
_None logged yet._

## Anti-Patterns (Do NOT Do)
### [Motion] — never observe the moving element for a masked reveal
- Rule: For a masked slide-up (`overflow-hidden` clip + inner `translateY(110%)`), put `whileInView`/IntersectionObserver on the STATIC clip wrapper, not on the translated inner element.
- Why: IntersectionObserver measures the *transformed* bounding box. The inner line starts shifted 110% down, so its observed rect is wrong and the reveal never fires (symptom: headings stay invisible). The wrapper doesn't move → reliable trigger; it drives the inner via variants.
- Where: `RevealText` in `components/ui/Reveal.tsx`.
- Date: 2026-06-28
