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

### [Anti-pattern] — no uppercase letter-spaced eyebrow labels
- Rule: Never use `uppercase` + `tracking-wide/widest` (mono or not) as a small label above/on a heading or card. Reads as AI-generated SaaS template ("AI slop"), not human design. For meta info on cards (type, count, tags, skills), use plain sentence-case text: `text-sm text-(--color-text-muted)` (primary meta) or `text-sm text-(--color-text-faint)` (secondary), comma/`·` separated. No mono font, no caps, no wide tracking.
- Where: `app/careers/CareersClient.tsx` card meta rows (was `font-mono text-meta-label uppercase text-(--color-text-faint)`, now `text-sm text-(--color-text-muted/faint)`).
- Why: user flagged uppercase-tracked eyebrows as the single biggest tell of AI-slop design. Kills prior [Hierarchy] "eyebrow / meta label" rule below — superseded.
- Date: 2026-07-03

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

### [WYSIWYG] — shared PortableText renderer
- Rule: Any Sanity block-content field rendered as rich text (blog body, career "About the Internship") goes through the single `PortableTextContent` component + `ptComponents` map in `components/ui/PortableTextContent.tsx`. Don't re-declare `ptComponents` per page. Import and pass `value={blocks}`.
- Where: used by `app/blog/[slug]/page.tsx` and `app/careers/[slug]/CareerDetailClient.tsx`.
- Why: one heading/list/mark/image/table style everywhere rich text appears — matches [Reuse] rule above; extracted 2026-07-03 when careers needed the same renderer for a new block-content field.
- Date: 2026-07-03

### [Card] — bordered-grid listing card (openings / roster type lists)
- Rule: For grid listings of clickable items (e.g. job openings), don't use individually-boxed cards with `bg-(--color-bg-muted)` fill + per-tag chip borders + a `border-t` divider before the footer. Instead: one shared `border-t border-l border-(--color-border)` wrapper around the grid, each cell gets `border-r border-b border-(--color-border)` (put these on the `RevealFade` wrapper, not the inner `<Link>`), and the whole cell is a single `<Link>` with `bg-(--color-surface)` (not `--color-bg-muted`) and `hover:bg-(--color-bg-muted)` for feedback. Type/count meta row stays plain sentence-case `text-sm text-(--color-text-muted)` text, never uppercase/tracked (see [Anti-pattern] no eyebrow labels). Skills render as pills: `rounded-full border border-(--color-border) px-3 py-1 text-sm text-(--color-text)`, wrapped `flex flex-wrap gap-2` (user-requested 2026-07-03 — supersedes earlier "never bordered chips" for skills specifically; type/count row stays plain text). Tried `bg-(--color-accent)/10` fill first — on `--color-surface: #FFFFFF` the 10%-opacity yellow tint was too pale to read as a pill boundary; hairline border reads clean instead. Don't retry faint accent fills for pill/chip backgrounds on white surface. No internal `border-t` separator — `mt-auto` + gap spacing pushes the footer down. Title `text-2xl font-bold` per design-system.md card-title tier (earlier `text-lg` was too weak — user flagged card titles as not prominent). Stipend kept quiet: `text-sm font-normal text-(--color-text-muted)`, not emphasized.
- Where: `app/careers/CareersClient.tsx` openings grid.
- Why: individually-boxed muted cards + chip borders + internal divider read as dark/cluttered. The bordered-grid pattern already exists in `FeaturedWorkSection` — reusing it keeps listing UIs uniform and reads minimal (one hairline border language, not stacked boxes). NOTE (2026-07-03): tried replacing this with a numbered full-width editorial list — user rejected it as harder to understand; the simple boxed grid is the approved direction. Don't re-propose the list.
- Date: 2026-07-03

### [Card] — truncated skills pill row with stacked "+N" overflow badge
- Rule: Skill pill rows on cards cap at 2 visual lines. Use `components/ui/SkillsPills.tsx` (client component) instead of mapping the skills array directly — it measures the rendered `offsetTop` of each pill after layout, drops pills one at a time until only 2 rows remain, then appends an overflow badge: two stacked pill shapes (a decorative `absolute inset-0 translate-x-1 translate-y-1` pill behind, `z-10` real pill in front), front pill text is number-only (`+{N}`, no "skill(s)" word). Re-measures on window resize and when the `skills` prop changes (grid column count changes the wrap point per breakpoint). Don't hardcode a fixed pill count (e.g. "show first 3") — actual wrap point varies by pill text length and card width.
- Where: `app/careers/CareersClient.tsx` (replaced the inline `.map` over `opening.skills`).
- Why: user wanted overflow truncated at 2 lines with a "stack of pills" look, count-only label — no "skill"/"skills" word.
- Date: 2026-07-03

### [Page] — page-level heading hierarchy + a11y (every page)
- Rule: Every page has exactly ONE `<h1>` (the hero/page title, `text-h1`), section headings are `<h2>` (`text-h2`), card/item titles are `<h3>`. Never skip levels, never two `<h1>`, never use `<h2>` for the hero while a section also uses `<h2>`. Match the visual size to the semantic level (h1 > h2 > h3). Interactive cards/links get a keyboard focus state — `focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)` on the card `<Link>`, and drive any hover-only affordance (e.g. underline-draw) with `group-focus-visible:` too so keyboard users see the same feedback as hover.
- Where: `app/careers/CareersClient.tsx` (Careers=h1, Open Roles=h2, card titles=h3).
- Why: careers page originally had two `<h2>` and no `<h1>` (broken hierarchy + a11y fail) and hover-only affordances with no keyboard focus. Screen-reader/keyboard users need one h1, ordered levels, and visible focus.
- Date: 2026-07-03

### [Reveal] — no hand-rolled motion variants on pages
- Rule: Don't define local `container`/`lineReveal`/`fadeUp` motion variants inside a page/section and wire them to `motion.h2`/`motion.p`. Use `RevealText` (headings) + `RevealFade` (supporting text, cards) from `components/ui/Reveal.tsx`. Also: no arbitrary inline `style={{ fontSize }}` — use type tokens (`text-h1/h2/h3`, `text-body-lg`, `text-base`, `text-meta-label`). And keep token syntax consistent: use the `text-(--color-x)` shorthand everywhere, not a mix of `text-[var(--color-x)]` and `text-(--color-x)`.
- Where: `app/careers/CareersClient.tsx` (removed local variants → RevealText/RevealFade; removed inline fontSize; unified two card meta lines to `text-meta-label`).
- Why: hand-rolled variants + arbitrary inline sizes + mixed token syntax are the "AI slop" tells — they diverge from the site's one motion/type system. Reuse the primitives; the page then reads as part of the whole.
- Date: 2026-07-03

### [Anti-pattern] — no linework geometry / registration marks on hero backgrounds
- Rule: Don't add decorative background shapes (outline circles, rotated squares, crosshair "registration marks") to hero sections to fill negative space. Tried on homepage hero and careers hero — user rejected as poor design both times. Don't re-propose this direction; if a hero reads empty, revisit brainstorm (grain/texture, ghost type, vignette) rather than defaulting back to linework shapes.
- Where: tried in `components/sections/HeroSection.tsx` and `app/careers/CareersClient.tsx` hero, reverted both.
- Date: 2026-07-03

### [Badge] — corner flag indicator (opening cards)
- Rule: Sanity `opening.flag` (dropdown: `New` / `Hiring Urgently`) renders as `absolute top-0 right-0 px-3 py-1 text-xs font-medium uppercase tracking-wide` on the card `Link` (needs `relative` added to that Link). Color per value via a `FLAG_STYLES` map: `New` → `bg-(--color-accent) text-(--color-text)` (brand yellow), `Hiring Urgently` → `bg-[#FF4444] text-white` (reuses the existing form-validation red token, not a new hex). Field is optional — no flag renders no badge.
- Where: `app/careers/CareersClient.tsx`.
- Why: user wanted per-category color-coded corner indicators; brand.md caps yellow to one accent, so urgency red reuses the color already established for error states elsewhere in the codebase rather than introducing a second new hue.
- Date: 2026-07-03

### [Content] — opening short vs. full description
- Rule: `opening.shortDescription` (renamed from `description`) is plain text — used on the careers card and directly below the title on the detail page. `opening.description` is now a block-content array rendered via `PortableTextContent` under an "About the Internship" heading, positioned above Prerequisites on the detail page. Don't conflate the two — short stays plain text for card/meta use, long is rich text for the body.
- Where: `sanity/schemaTypes/openingType.ts`, `app/careers/[slug]/CareerDetailClient.tsx`.
- Date: 2026-07-03

## Naming
_None logged yet._

## Anti-Patterns (Do NOT Do)
### [Motion] — never observe the moving element for a masked reveal
- Rule: For a masked slide-up (`overflow-hidden` clip + inner `translateY(110%)`), put `whileInView`/IntersectionObserver on the STATIC clip wrapper, not on the translated inner element.
- Why: IntersectionObserver measures the *transformed* bounding box. The inner line starts shifted 110% down, so its observed rect is wrong and the reveal never fires (symptom: headings stay invisible). The wrapper doesn't move → reliable trigger; it drives the inner via variants.
- Where: `RevealText` in `components/ui/Reveal.tsx`.
- Date: 2026-06-28
