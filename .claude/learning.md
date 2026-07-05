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

### [Hierarchy] — intentional H2 step-down for content-heavy sections
- Rule: Not every section H2 has to sit at the full `text-h2` step. For a two-col text/image section where the heading is immediately followed by dense multi-paragraph body copy (not a short punchy line), drop the heading one step to `text-h3 font-bold tracking-tight text-(--color-text)` — and drop any hand-set `leading-[1.05]` override with it, since `.text-h3` already carries the correct `--leading-h3` (1.3) for that size. Punchier sections (short heading, grid/canvas/interactive content below, not paragraph-dense) keep the full `text-h2`.
- Where: `app/services/ai-automations/sections/PainSection.tsx` and `WhySection.tsx` (both the "heading + 4/2 paragraphs + image" pattern) stepped to `text-h3`; `FixesSection.tsx` and `HowWeWork.tsx` (short heading + grid/canvas) stayed `text-h2`; Hero `h1` already sits at `text-h1` (one step below `text-display`), left alone.
- Why: user flagged that uniform full-size H2 on every section made every heading compete equally for attention regardless of role, overwhelming the page. Varying the step by section role (content-heavy vs. punchy) gives the page a real hierarchy while staying entirely on the existing type scale — no new tokens.
- Date: 2026-07-04

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

### [Page] — career detail page: h1/h2 hierarchy + stipend/positions line + form card
- Rule: On `app/careers/[slug]/CareerDetailClient.tsx`: page title (`opening.title`) is `<h1>` styled `text-h2` (matches sibling detail page sizing — blog post title, careers listing hero). Every sub-block heading ("About the Internship", "Prerequisites", "Skills You Will Work With", "Apply now!") is `<h2>` styled `text-h3 font-bold tracking-tight text-(--color-text) mb-6` (shared `SUBHEAD` const in the file) — never `text-lg`/ad-hoc sizes for these. Stipend + position count render as ONE quiet line (`₹{stipend} / month · {positions} {position(s)} available`, `text-sm text-(--color-text-muted)`, `mt-4`) directly under the short description — not two separate `<p>` blocks with their own margins. Skills pills reuse the rounded-pill spec from the [Card] bordered-grid entry (`rounded-full border border-(--color-border) px-3 py-1 text-sm text-(--color-text)`), not the old mono/hover-invert chip style. Form field labels are plain sentence-case (`text-sm font-medium text-(--color-text-muted)`) — no uppercase/tracking (see [Anti-pattern] no eyebrow labels; form labels count too, they hurt readability same as card eyebrows). The application form column gets a white card treatment: `bg-(--color-surface) border border-(--color-border) p-6 md:p-10` wrapping the whole right column div.
- Where: `app/careers/[slug]/CareerDetailClient.tsx`.
- Why: page previously had two `<h2>` (title + "Apply now!") and no `<h1>`, sub-headings used arbitrary `text-lg`, stipend/positions were two loosely-spaced paragraphs, skills used mono hover-invert chips inconsistent with the listing page, form labels were uppercase-tracked (flagged anti-pattern), and the form had no surface treatment distinguishing it from the page background.
- Date: 2026-07-03

### [Card] — equal 3-up image/title/description/cta grid
- Rule: For a simple 3-item feature grid, use the flat bordered-grid wrapper (`border-t border-l` on `grid grid-cols-1 md:grid-cols-3`, each cell `border-r border-b border-(--color-border)`) — same pattern as the careers openings grid, equal-size cells, nothing asymmetric. Cell: `aspect-video` image on top (`object-cover`, `group-hover:scale-105` on the image only for a quiet hover-zoom), then `h3` title (`text-2xl font-bold`), description, `Button variant="ghost" size="sm" showArrow` CTA. A one-off numeric proof point (e.g. "20h → 1h") renders as a small dark pill (`bg-(--color-text) text-(--color-bg)`, strikethrough-from / accent-arrow / bold-to) absolutely positioned over the image corner — not a large separate display-type block — so it doesn't break the equal-height row rhythm.
- Where: `app/services/ai-automations/AIAutomationsClient.tsx` "Three Things We Fix Most Often" section.
- Why: first pass used an asymmetric bento (one cell `md:row-span-2` as a "hero" cell). User rejected it as "too hard to interpret" — a flat equal grid reads faster; save asymmetric/bento treatments for when content genuinely differs in weight, not as a default "creative" move. That first pass also had 01/02/03 index labels — cut, see [Anti-pattern] no numbered card index below.
- Date: 2026-07-04

### [Consistency pass] — AI Automations page spacing/dead-code normalization
- Rule: On a "full-width heading block, then unrelated content (grid/canvas)" pattern (§3 FixesSection, §4 HowWeWork), the heading wrapper bottom margin is `mb-10 md:mb-14` — matches the design-system.md heading→content token exactly. Post-refactor these had drifted to `mb-10 md:mb-12` (Fixes) and `mb-12 md:mb-14` (HowWeWork); normalized both to `mb-10 md:mb-14`. The other shared pattern (two-col text/image: PainSection, WhySection) already used `mb-6` on the h2 directly followed by paragraphs — that's a different structural pattern (heading inline with body copy, not a standalone heading block) and was already consistent between the two, left as-is.
- Where: `app/services/ai-automations/sections/FixesSection.tsx`, `app/services/ai-automations/sections/HowWeWork.tsx`.
- Why: 6 independent agents built each section in isolation; this pass reconciled the drift back to the logged design-system.md token.
- Date: 2026-07-04

### [Cross-page pass] — AI Automations Hero/ContactSection padding matched to sitewide hero/CTA exception
- Rule: Confirmed `py-16 md:py-20` (PainSection, FixesSection, HowWeWork, WhySection) already matches the real sitewide body-section standard — verified against `components/sections/TechnologiesSection.tsx`, `ServicesBentoGrid.tsx`, `ClientLogosSection.tsx`, `FeaturedWorkSection.tsx`, `TestimonialsSection.tsx`, `StatsCounters.tsx` (all `py-16 md:py-20`), so no change needed there. For the two full-bleed exception sections: `Hero.tsx`'s container padding was `pt-28 pb-20 md:pt-32 md:pb-24` (missing the `lg:` step) — added `lg:pt-36 lg:pb-28` to match home's `HeroSection.tsx` (`pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28`) exactly, since both are `min-h-svh` GSAP-choreographed heroes. `ContactSection.tsx` (closing contact-form section) was `pt-28 md:pt-36 pb-20 md:pb-28` — changed to `pt-32 pb-24 md:pt-40 md:pb-32` to match the one real sitewide precedent for a large-padding contact/form-focused section: `components/ContactPageContent.tsx`'s single section (`pt-32 pb-24 md:pt-40 md:pb-32`).
- Where: `app/services/ai-automations/sections/Hero.tsx`, `app/services/ai-automations/sections/ContactSection.tsx`.
- Discrepancy vs learning.md/design-system.md: both say flatly "every top-level section uses py-16 md:py-20, no other section padding" with no carved-out hero/CTA exception — but real code consistently diverges for hero-type and contact/form-focused sections (home Hero, careers page-title header, standalone /contact page section all use larger, non-py-16/20 padding). Trusted the actual code pattern per instruction; the docs should arguably note this exception explicitly but weren't touched since editing standards files wasn't in scope for this task. One home-page outlier (`BlogPreviewSectionClient.tsx`, `py-20 md:py-28`) was treated as unintentional drift, not a pattern, since it's a single instance against 6+ consistent `py-16 md:py-20` sections — not adopted anywhere.
- Why: user wanted AI Automations' section rhythm to match the established cross-page convention, not just be internally consistent.
- Date: 2026-07-04

### [Consistency pass] — ContactSection typography tokenized, FixesSection card-title responsive step restored
- Rule: `ContactSection.tsx` had drifted into ad-hoc inline `fontSize`/clamp styles (form-card heading, success message, sub paragraph, 5 field-error/alert texts) instead of the design-system scale — same "AI slop" tell logged for careers. Fixed: sub paragraph → `text-body-lg leading-relaxed` (matches Pain/Why/Hero pattern); form-card heading "Book a Free Process Audit" → `text-2xl sm:text-3xl font-bold leading-[1.1]` (the logged H3-tier card-title convention, was missing the `sm:` step); success message → `text-h3 font-normal` (color/max-width kept as inline override, those aren't typography-scale concerns); 5 error/alert texts unified to `text-xs` (were 0.75rem/0.8125rem inline, `color`+`fontFamily: monospace` kept inline since `font-mono` utility is remapped to Utile sans in this project, not a real monospace). Also fixed a real bug found in the same file: `className="pt16 ..."` (missing dash) silently dropped the top-padding entirely. Separately, `FixesSection.tsx` card `<h3>` was `text-2xl` only — added the missing `sm:text-3xl` step to match the logged H3-tier convention.
- Where: `app/services/ai-automations/sections/ContactSection.tsx`, `app/services/ai-automations/sections/FixesSection.tsx`.
- Why: user asked for a full responsive-typography audit across all 6 ai-automations sections; the fluid `clamp()` tokens already cover cross-device scaling, so the actual defects were inline styles bypassing the token system (harder to keep consistent) and one missing responsive breakpoint, not the scale itself.
- Date: 2026-07-04

## Naming
_None logged yet._

## Anti-Patterns (Do NOT Do)
### [Motion] — never observe the moving element for a masked reveal
- Rule: For a masked slide-up (`overflow-hidden` clip + inner `translateY(110%)`), put `whileInView`/IntersectionObserver on the STATIC clip wrapper, not on the translated inner element.
- Why: IntersectionObserver measures the *transformed* bounding box. The inner line starts shifted 110% down, so its observed rect is wrong and the reveal never fires (symptom: headings stay invisible). The wrapper doesn't move → reliable trigger; it drives the inner via variants.
- Where: `RevealText` in `components/ui/Reveal.tsx`.
- Date: 2026-06-28

### [Card] — never number cards 01/02/03
- Rule: Don't add an index label (`01`, `02`, `03` …) to cards in a feature/service grid. No exceptions for "just a small counter in the corner."
- Why: user explicitly banned this after seeing it on the AI-automations "Three Things We Fix Most Often" grid — reads as generic template filler, not considered design. Let the image, title, and grid position carry the ordering instead.
- Where: `app/services/ai-automations/AIAutomationsClient.tsx` "Three Things We Fix Most Often" section (index field removed from `FixCard`).
- Date: 2026-07-04
