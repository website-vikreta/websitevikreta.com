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

### [Motion] — RevealImage: editorial clip-wipe image reveal, motion/react port of AI-Automations' `revealClipImage`
- Rule: `RevealImage` (`components/ui/Reveal.tsx`) is the canonical primitive for image reveals sitewide — clip-path wipes `inset(0 0 100% 0)` → `inset(0 0 0% 0)` on the outer container (same `duration: 1.0, ease: REVEAL_EASE` as `RevealText`), inner wrapper scales `1.08 → 1` over `1.4s` (matches gsap `DUR.crawl`). Pass the image container's own `overflow-hidden`/border/radius classes as `className`; children is the `<Image fill />`. This was previously GSAP-only (`lib/gsap/reveals.ts` `revealClipImage`, used on AI-Automations page); ported to motion/react so non-GSAP pages (About, and any future page using the `Reveal.tsx` primitives) get the same image-reveal language as text reveal already had. Layer it with `RevealFade` on a wrapping grid/card element for entrance-stagger + independent image wipe — same two-trigger layering as `FixesSection.tsx` (`.fix-card` fades, `.fix-card-image` wipes separately).
- Where: `components/ui/Reveal.tsx` (`RevealImage`), used in `components/sections/AboutHeroSection.tsx` (hero image) and `components/sections/PhotoGallerySection.tsx` (all gallery images, including both id=4 side-by-side images).
- Why: user asked for the About page to carry the same text + image revealing animations as the AI-Automations page. Text reveal already matched (`RevealText`/`RevealFade` already mirror `revealLines`/`revealFadeUp`); the image clip-wipe was the missing piece — About page images previously only got a plain fade+rise via `RevealFade`, no clip-path/scale treatment.
- Date: 2026-07-31

### [Hero] — typographic "before → after" hero (About page)
- Rule: When a page's story is a pivot/change, the hero headline should *enact* the change with type, not describe it with an image beside it. Pattern: line 1 = the dead model at `text-h1 font-normal` in `text-(--color-text-faint)` with the key noun struck through by an animated bar (`absolute left-0 top-[0.56em] h-[0.045em] w-full origin-left bg-(--color-text)`, `motion.span` `scaleX 0→1`, `duration 0.55`, `REVEAL_EASE`, `delay 0.75` so it lands after the line reveal, `aria-hidden`); line 2 = the live model at full `text-display font-bold` in `text-(--color-text)` with the key phrase in `text-(--color-accent)`. Put the weight on the individual lines, NOT `font-bold` on the `<h1>` — the size jump (h1 → display) AND the weight jump (normal → bold) both carry the pivot; don't set both lines at the same step or the same weight. Strike bar stays near-black so yellow remains the single accent moment on the page. Guard with `useReducedMotion()` from motion/react → `initial={{ scaleX: reduced ? 1 : 0 }}` and `delay: reduced ? 0 : 0.75` so the mark is present without animating.
- Strike bar vertical position: use `top-[0.56em]`, never `top-1/2`. `top-1/2` centres on the line box, which lands the bar visibly above the lowercase letters and reads like an underscore floating in the wrong place; `0.56em` sits on the lowercase x-height centre. Bar thickness `0.045em` — matches a `font-normal` stroke; `0.06em` reads too heavy against light-weight type. Both are `em` units so they scale with the fluid `--text-h1` clamp.
- Where: `components/sections/AboutHeroSection.tsx`.
- Why: first pass was headline-left/photo-right at a 5/7 split — user rejected it as "very generic, very hand made, nothing creative". A column-ratio change isn't a design idea; the story (agency killed its old model) had to become the visual. Accent-word-in-display-type matches the existing homepage hero precedent (`HeroSection.tsx` `ACCENT_INDEX` colors one word `--color-accent` at `text-display` on the same `#FAFAF7` bg), so yellow display text is an established pattern here, not a new one.
- Date: 2026-07-31

### [Hero] — no photo in a hero when the page already has a photo gallery
- Rule: Don't put a team/office photo in a page hero when a `PhotoGallerySection` (or equivalent) further down already carries that content. The hero goes pure-type at `min-h-svh` with aggressive whitespace instead. Also check `.claude/context/brand.md` photography direction before adding any hero photo — "no stock photo smiles, no handshakes, no laptops on desks" rules out most meeting/workspace shots as a hero anchor.
- Where: `components/sections/AboutHeroSection.tsx` (dropped `/about/team-strategy-meeting.webp`; the About page's 8 other team photos still run in `PhotoGallerySection`).
- Why: the hero photo was the 9th team photo on the page and the first one the user saw, so it set a generic "agency stock" tone before the gallery got its moment. Removing it also gives the headline the full viewport width the brand's typography direction asks for ("Large. Bold. Words fill the screen.").
- Date: 2026-07-31

### [Carousel] — infinite auto-scroll marquee with arrow controls
- Rule: For a card carousel that needs continuous auto-scroll + manual prev/next (not the switching single-quote pattern in `TestimonialsSection.tsx`), reuse `ClientLogosSection.tsx`'s motion primitives: `useMotionValue` + `useAnimationFrame` moving `x` left at a constant px/s, list duplicated 2x, wrap at `-trackWidth/2`. Add prev/next by animating the same motion value with `animate(x, target, { duration: 0.6, ease: REVEAL_EASE })` stepping by one card width + gap, and pause the auto-scroll frame loop (`isPaused` ref) on hover and for 4s after a manual arrow click so the click doesn't get immediately overridden. Same edge-fade masks (`bg-gradient-to-r/l from-(--color-bg) to-transparent`) as the client-logo marquee. Card: `bg-(--color-surface) border border-(--color-border) hover:border-(--color-border-strong)`, no shadow (Card rule). Label reading "Testimonial"/category tag on a card is plain `text-sm text-(--color-text-faint)`, never uppercase/tracked (see [Anti-pattern] no eyebrow labels — applies to any small card label, not just careers meta).
- Where: `components/sections/work/WorkTestimonialsSection.tsx` (Work page only — home page keeps the original switching `TestimonialsSection.tsx`).
- Why: user wanted a 6-card testimonial carousel (name/designation/company/photo) with infinite auto-scroll + explicit left/right controls, which the existing single-quote switcher doesn't provide. Reusing the marquee math instead of a new scroll-snap/library carousel keeps the site to one continuous-scroll motion primitive.
- Update (2026-08-01) — touch + mobile corrections to the above:
  - **Card width is never a fixed px constant.** `CARD_W = 380` overflowed the viewport on any phone under 380px. Use `w-[80vw] max-w-[380px] sm:w-[380px]` and *measure* the arrow step (`cardRef.current.offsetWidth + GAP`) into state on mount and on resize — a viewport-relative card makes the step unknowable at author time.
  - **Add `drag="x"` (`dragMomentum={false} dragElastic={0}`) to the track.** Hover-pause is the only pacing control a mouse user needs, but touch never fires hover — swipe is the equivalent. `onDragStart` pauses, `onDragEnd` re-wraps `x` and resumes after `RESUME_DELAY`. Give the avatar `<Image draggable={false} className="select-none">` so native image-drag doesn't hijack the gesture.
  - **Wrap continuously, except during an arrow tween.** An `isTweening` ref makes the frame loop skip wrapping while `animate()` owns `x` (wrapping mid-tween yanks the value back toward a stale target); the tween's `onComplete` re-wraps instead. Everything else — drag included — wraps every frame, so no gesture can drag the track past the duplicated copy into empty space.
  - **Guard with `useReducedMotion()`** — auto-scroll velocity goes to 0 and the arrow tween duration to 0; the arrows keep working.
  - Import `REVEAL_EASE` from `Reveal.tsx`; don't re-declare `[0.16, 1, 0.3, 1]` inline. Same correction applied to `FaqSection.tsx`, which had drifted to its own `EASE = [0.22, 1, 0.36, 1]` at `duration: 0.35` — now `REVEAL_EASE` at `0.7` / `y: 24`, matching `RevealFade` exactly.
- Date: 2026-08-01

### [Component] — shared FaqSection for page-specific FAQ subsets
- Rule: Page-level FAQ blocks (a curated subset of questions relevant to that page, not the full list) use `components/sections/FaqSection.tsx` — `<FaqSection items={someFaqs} viewAllHref="/faq" />`. Don't hand-roll the accordion per page (was duplicated between `app/faq/FaqPageContent.tsx` and `app/services/web-development/WebDevClient.tsx` before this). Heading row is `flex items-end justify-between`: `RevealText` H2 on the left, a "Read all FAQs" arrow-link (`ArrowUpRight`, same hover-lift as the bottom "Get in touch" link) on the right pointing at `viewAllHref` — this is the piece that makes it a page-specific excerpt rather than the full page. All FAQ content (question/answer/id) lives in one place: `lib/faq-data.ts` (`ALL_FAQS`, `FaqItem` type) — the standalone `/faq` page imports `ALL_FAQS` directly (keeps its own bespoke GSAP header + numbered `<h2>`-per-item layout, that page is intentionally NOT `FaqSection` since it's the "view all" destination, not an excerpt), other pages import `ALL_FAQS` and `.filter()` to a relevant subset (or define their own local array typed `FaqItem[]` if the copy is page-specific, e.g. `webDevFaqs` in `WebDevClient.tsx`) and pass it to `FaqSection`.
- Where: `components/sections/FaqSection.tsx`, `lib/faq-data.ts`; consumed by `lib/work-data.ts` (`WORK_FAQS`, filtered subset of `ALL_FAQS` by id) → `app/work/WorkPageContent.tsx`, and `app/services/web-development/WebDevClient.tsx` (local `webDevFaqs`, replaced its inline duplicate accordion).
- Why: user asked to reuse the FAQ pattern for the Work page with a "read all" link back to `/faq` — at that point there were two independent hand-rolled copies of the same accordion (full FAQ page + WebDev page), so extracting a shared component now instead of writing a third copy keeps the pattern from drifting further (same reasoning as the earlier PortableText/Reveal-primitive extractions logged above).
- Date: 2026-08-01

### [Hero] — proof band instead of decorative filler
- Rule: If a full-viewport type hero reads empty at the bottom, close it with a hairline-anchored proof band (`border-t border-(--color-border) pt-6`, flex-wrapped `<ul>`, items `text-sm text-(--color-text-muted)`, `gap-x-10 gap-y-2`) carrying real, already-published numbers — never invented figures, and never decorative shapes (see [Anti-pattern] no linework geometry). Source the numbers from an existing section on the same page so they can't drift.
- Where: `components/sections/AboutHeroSection.tsx` — "Pune, India / Five years in / 68 projects shipped / 6,360 hours given back", all sourced from `StatsCounters.tsx`'s `STATS` array.
- Date: 2026-07-31

### [Numerals] — big-number treatment (one style sitewide)
- Rule: Any large numeral used as a design element — stat values, numbered principle/step lists — uses one treatment: `font-mono font-bold leading-none` + `text-5xl md:text-6xl` + `tracking-[-0.05em]`. Colour is `text-(--color-text)` for factual stats and `text-(--color-accent)` for numbered list indices. Never `uppercase` on digits, and never `tracking-(--tracking-meta)` (0.12em) — wide meta tracking is for label text and visibly pulls digits apart. Note `font-mono` is remapped to Utile sans in this project (not a true monospace) — it's kept because `StatsCounters` established it as the numeral face.
- Where: `components/sections/StatsCounters.tsx` (values, `text-(--color-text)`), `components/sections/CoreValuesSection.tsx` (01–06 indices, `text-(--color-border-strong)` ghost → `--color-accent` on `group-hover`).
- Why: user asked for the CoreValues 01–06 indices to read like "The Numbers So Far" but in yellow, with the digits tightened. They were `text-xl sm:text-2xl uppercase tracking-(--tracking-meta)` — a different size step, a different weight feel, and letter-spacing pulling the two digits apart.
- Open item: `StatsCounters` itself still has no explicit tracking (browser default 0). If the tightened digits read better there too, add `tracking-[-0.05em]` to its value span so both fully match — not done yet, wasn't requested.
- Date: 2026-07-31

### [Exception] — numbered indices ARE allowed on a principles list (user-confirmed twice)
- Rule: The "never number cards 01/02/03" anti-pattern below applies to **feature/service card grids**, where the number is decorative filler on items with no inherent order. It does NOT apply to `CoreValuesSection`'s "How we decide what to build" 01–06. Indices render `text-(--color-border-strong)` (ghost) at the [Numerals] treatment, going `--color-accent` on `group-hover`, with NO rule above them — the cell is just `<article className="group">`.
- History — do not re-litigate: user asked for these indices on 2026-07-31, they were removed later the same day as part of a minimal pass, and the user immediately asked for the grid back ("no bring it back i dont want this layout please") and confirmed the numbered version by picking it from three options. **The numbers stay.** Don't propose removing them again.
- Where: allowed in `components/sections/CoreValuesSection.tsx`; still banned in `app/services/ai-automations/AIAutomationsClient.tsx`.
- Date: 2026-07-31

### [Section] — surface rhythm: alternate grounds, white slabs only
- Rule: A long page must not run every section on `--color-bg`. Alternate two grounds so no two adjacent sections read as the same slab: default `--color-bg` (transparent section, no bg class) ↔ `--color-surface` white slab. Give a white slab to the page's densest text block so it lifts off the warm ground either side.
- Padding exception: an anchor slab (the page's densest block) uses `py-24 md:py-32`, NOT the standard `py-16 md:py-20`. Alongside the already-documented hero/contact-form exceptions, this is the only body-section deviation — transparent sections and ordinary white-surface sections keep `py-16 md:py-20`.
- **Do NOT use a dark/inverted slab** (`bg-(--color-text) text-(--color-bg)`) as the mid-page anchor. Tried on About's `CoreValuesSection` 2026-07-31 — user rejected it: "not huge fan of dark background all of a sudden in between". A dark band mid-scroll reads as a lurch, not a beat. Don't re-propose it; use `--color-surface` and wider padding instead. (This also removes the need for `--color-bg`-as-ink overrides — light-theme tokens apply normally: `text-(--color-text)`, `text-(--color-text-muted)`, `border-(--color-border)`.)
- Where: About page — `CoreValuesSection` is the anchor slab (`bg-(--color-surface) py-24 md:py-32`); `StatsCounters` restored to its default `bg-(--color-surface)` (the `bgClassName=""` override in `app/about/page.tsx` was removed, so About now matches home). Sequence: bg → bg → WHITE → bg → WHITE → bg → bg → bg.
- Why: user flagged the About page as "lot of text to read" with "no room to breathe" — every section was the same padding on the same ground, so the page had one flat texture and nothing to rest against. Ground contrast does the breathing that more padding alone can't; white-on-warm-off-white is enough contrast to do it without a tonal jolt.
- Date: 2026-07-31

### [Accent] — page budget: one static yellow, hover states only after that
- Rule: A page gets ONE static `--color-accent` moment. Everything else that wants yellow gets it on hover or not at all. Never colour a *set* of repeated elements (6 principle indices, 3 step circles) in accent — that's 3–6 yellow instances in one section and blows both accent rules ("max once per section", "more than ~3 on a page is too much").
- Where: About page — the single static yellow is the hero's "we build systems". The Insights accent circles were removed; the `CoreValuesSection` 01–06 indices render ghost (`--color-border-strong`) and only reach accent on `group-hover`, one at a time, so they cost nothing against the static budget.
- Exception (user-requested 2026-07-31): `VisionSection`'s H2 word "bottleneck" is a second static accent word on the About page. Budget for a *long* page is therefore **one accent word per screenful, max ~2–3 static per page** — both instances are single words in display/H2 type, far apart in the scroll, and never a repeated set. Do not read this as a licence to accent a third heading.
- Date: 2026-07-31

### [Copy] — density budget: a section carries one idea, not one paragraph per idea
- Rule: On content pages, cap supporting copy hard — section sub-line ≤ 12 words, card/principle description ≤ 14 words, hero lede ≤ 32 words, CTA subheading ≤ 25 words. When a sentence lists outcomes ("response time, conversion, capacity, cost"), pull the list OUT of the prose and set it as type — a hairline-bordered `grid-cols-2 md:grid-cols-4` row, one term per cell at `text-h3 font-bold`. Words-as-design-elements is the brand rule; it also cuts reading time to a glance.
- Where: About page pass — hero lede 48w→30w, `VisionSection` two dense paragraphs → lede + 4-term measurables row + one `text-h3 font-normal` closing line, `CoreValuesSection` descriptions ~22w→≤14w, `PhotoGallerySection` 22w subhead → a 4-word meta line right-aligned beside the H2, `InsightsSection` descriptions ~30w→~13w and subhead 20w→6w, `StatsCounters` closing note 22w→11w, About CTA subheading 44w→21w. Page body copy dropped ~45% with the story arc (Tension → Shift → Resolution → Invitation) and section order untouched.
- Why: user asked to keep intent and flow but said there was "a lot of text to read". Cutting words, not sections, is what preserves the arc.
- Update (2026-07-31): `VisionSection`'s 4-term measurables row and its `text-h3` closing line were later cut entirely (user-requested) — the section is now heading + 2 short paragraphs left, one `aspect-video` photo right. The list-out-of-prose pattern itself still stands; it just isn't used here anymore.
- Date: 2026-07-31

### [Layout] — asymmetric heading/body split instead of an equal two-column text block
- Rule: For a heading + supporting prose section, don't run `grid lg:grid-cols-2 gap-12` with a paragraph in each half — two equal text columns read as twice the reading work. Use `grid lg:grid-cols-12`: heading in `lg:col-span-5`, body in `lg:col-span-6 lg:col-start-7`. The skipped column IS the whitespace — no extra padding needed.
- Where: `components/sections/VisionSection.tsx`.
- Date: 2026-07-31

### [Component] — ONE case-study section, shared by home and /work
- Rule: The case-study block (bordered wrapper → featured 2-col card → 2-up grid) exists exactly once, as `components/sections/FeaturedWorkSection.tsx`, and reads its content from `lib/work-data.ts` (`FEATURED_CASE_STUDY` + `CASE_STUDY_GRID`). It renders the card primitives from `components/sections/work/CaseStudyCard.tsx` (`CaseStudyFeaturedLink`, `CaseStudyGridLink`). Only the copy above it varies, via optional `heading` / `subheading` / `id` / `ariaLabel` props defaulting to the home page's wording; `/work` passes `heading="Case studies"`.
- **Do not build a page-local variant of a block that already exists on another page.** The deleted `WorkCaseStudiesSection.tsx` was a second implementation of this exact layout, and `FeaturedWorkSection` carried its own hardcoded `FEATURED` / `CASE_STUDIES` arrays — so the same three case studies existed as two copies of the copy, already drifting (home had `tags` uppercased into the banned eyebrow style, and all three cards linked to `/work` instead of the case study's own slug).
- Where: `components/sections/FeaturedWorkSection.tsx`; consumed by `app/page.tsx` and `app/work/WorkPageContent.tsx`.
- Why: user — "you should not add/create new component here, you should reuse the component used in home page only." Generalises the existing [Reuse] rule from motion primitives to whole sections: if a page needs a block another page already has, parameterise that block, don't fork it.
- Date: 2026-08-01

### [Perf] — canvas ambient loops must idle out, not spin forever
- Rule: A decorative canvas driven by pointer input has to stop its `requestAnimationFrame` chain once there's nothing left to animate, and restart on the next input. `DotGrid` draws the frame, then `if (painted.size === 0) { idle = true; return }`; `wake()` restarts the chain and is called from `handleMouseMove` and from the resize handler (resizing a canvas clears it, so it needs one repaint at the new size).
- Where: `components/ui/DotGrid.tsx` — sitewide, `<DotGrid global />` is on most pages.
- Why: the loop redrew every dot every frame forever. On a 390×844 phone that's ~1,600 `ctx.arc` calls at 60fps — permanently — while `mousemove` never fires on touch, so it could never paint anything. Pure battery and main-thread cost with zero visible output. Mouse users see no difference: the static grid is drawn, then the loop parks until the cursor moves.
- Date: 2026-08-01

### [Anti-pattern] — never render invented client names as proof
- Rule: Placeholder brand names in a "who we've built for" marquee (`ClientLogosSection`'s `CLIENTS` = Studio One, UrbanEdge, NovaMed, Brightline, Kinetica, Forsa, Pinnacle) are fabricated social proof. Removed from `/work`, where the page's whole premise is "Proof over promises" and three real client logos plus seven named testimonials sit within one scroll of it. **Still live on `/about` (`app/about/page.tsx:76`) and commented out on the home page — replace with the real logo set or delete there too.**
- Where: removed from `app/work/WorkPageContent.tsx`.
- Date: 2026-08-01

### [Rejected] — do NOT restyle /work in the About page's visual language
- Rule: `/work`'s existing blocks are approved as they are. A pass on 2026-08-01 rebuilt them using the About page's devices — hero proof band, `--color-surface` anchor slabs alternating with `--color-bg`, an editorial ruled-type index replacing the "Selected websites" card grid, big metric numerals on the case-study cards. **User rejected all of it wholesale**: "this is poor all AI slop nothing is good. you used the same elements like about page. i dont want it, whatever it was previously it's very nice." Reverted in full.
- Follow-ons the user then stated directly: don't touch the `/work` hero copy; **no section backgrounds on this page unless the section genuinely needs one** (`StatsCounters` is passed `bgClassName=""` on `/work` for this reason, unlike home where it keeps its white surface). Section-level reuse across pages is wanted; new page-local components are not.
- Why: worth keeping because the reasoning behind that pass wasn't wrong on the facts (the stock-image reuse and the invented client names were real problems) — the failure was applying another page's finished visual system to a page that already had its own working one. Fix the specific defect; don't restyle the page around it.
- Date: 2026-08-01

## Naming
_None logged yet._

## Anti-Patterns (Do NOT Do)
### [Motion] — never observe the moving element for a masked reveal
- Rule: For a masked slide-up (`overflow-hidden` clip + inner `translateY(110%)`), put `whileInView`/IntersectionObserver on the STATIC clip wrapper, not on the translated inner element.
- Why: IntersectionObserver measures the *transformed* bounding box. The inner line starts shifted 110% down, so its observed rect is wrong and the reveal never fires (symptom: headings stay invisible). The wrapper doesn't move → reliable trigger; it drives the inner via variants.
- Where: `RevealText` in `components/ui/Reveal.tsx`.
- Date: 2026-06-28

### [Minimal] — no decorative hairline above every item in a grid
- Rule: Default to NO rule/marker above each cell of a card or step grid — whitespace and type hierarchy do the separating (design-system.md: *"No decorative dividers — whitespace creates separation"*). Also drop small marker glyphs/circles used as bullets. If an item needs a marker to feel designed, the layout is the problem.
- Where: removed 2026-07-31 from `InsightsSection` (per-item `border-t`, and the accent-bordered numbered circles), `VisionSection` (the measurables row's `border-t`/`border-b`), `AboutHeroSection` (proof band `border-t`).
- Also removed from `CoreValuesSection` — its per-item `border-t` (and the `pt-6` that spaced content off it) is gone. The `01`–`06` indices there stay (user-chosen, see [Exception] below): the *digits* were wanted, the separator line above them was not. Worth remembering as the distinction — an index label can earn its place; a rule stamped above every cell does not.
- Why: user reviewed the rendered About page — "I still believe there is tons of AI slop… change it to minimal style, don't add unnecessary markers like separators on top of something."
- Date: 2026-07-31

### [Minimal] — images are square; radius cap is 4px, no exceptions
- Rule: Photos and image cards get NO border-radius and no border — `relative h-full w-full overflow-hidden bg-(--color-bg-muted)` is the whole treatment. design-system.md caps container radius at 4px; `rounded-2xl` (16px) violates it and reads soft/generic against the site's hard editorial type. Don't add a hover radius-morph (`transition-[border-radius] … hover:rounded-none`) either — it's an interaction the scroll reveal already covers.
- Where: `components/sections/PhotoGallerySection.tsx`.
- Date: 2026-07-31

### [Motion] — all magic happens on scroll; hover stays functional only
- Rule: Entrance/reveal choreography is scroll-triggered via the `Reveal.tsx` primitives, staggered by index. Hover is reserved for things that are actually interactive (links, buttons, cards you can click) and stays subtle — colour or underline, per motion-system.md. Don't invent hover flourishes on static content (colour-shifting numerals, radius morphs on non-clickable images) to make a section feel "interactive"; it isn't interactive, and the flourish reads as decoration.
- Where: About page — removed an image radius-morph on non-clickable photos; kept the staggered `RevealText`/`RevealFade`/`RevealImage` scroll reveals. `CoreValuesSection`'s numeral `group-hover` accent stays (user-chosen, see [Exception] above).
- Why: user — "keep it interactive but don't add unnecessary interactions. all magic should happen on scroll."
- Date: 2026-07-31

### [Responsive] — never ship two `hidden`-toggled copies of the same content
- Rule: Don't build a "desktop layout" in `hidden md:block` and a "mobile layout" in `md:hidden` rendering the same items. Every word ends up in the DOM twice — duplicate content for crawlers, double the Reveal components mounting and observing, and two layouts to keep in sync. Build one layout that responds (`grid gap-10 md:grid-cols-3 md:gap-8`). Only duplicate markup when the two versions are genuinely different *components*, never when they're the same data in a different flow direction.
- Where: `components/sections/InsightsSection.tsx` — had a horizontal desktop timeline and a vertical mobile stack, both mapping the same `INSIGHTS` array. Collapsed to one grid.
- Date: 2026-07-31

### [Grid] — spans must sum to the column count at every breakpoint; no nested flex to fill a gap
- Rule: In a `col-span`/`row-span` image grid, pick spans so each row sums exactly to the column count at BOTH breakpoints (4 on desktop, 2 on mobile). If a cell has to split itself with an inner `flex` to fill leftover width, the span math is wrong — fix the spans, don't nest. A nested `w-2/3` + `w-1/3` split inside a `col-span-2` cell collapses the 1/3 child to a ~55px sliver on a phone.
- Mobile row height should be viewport-relative (`auto-rows-[42vw]`) so a 1×1 cell stays roughly square at any phone width; switch to fixed rows once the grid goes 4-up (`md:auto-rows-[200px] lg:auto-rows-[230px]`). A fixed `auto-rows-[140px]` at 2 columns gives wide-letterbox cells on small phones and near-square on large ones — inconsistent crop across devices.
- Where: `components/sections/PhotoGallerySection.tsx` — 7 photos with an `id === 4` nested-flex special case became 8 flat entries; the `photo.id === 4` branch is gone. Layout: `[1:2×2][2][3] / [1][4][5] / [6:2×1][7][8]`.
- Date: 2026-07-31

### [Card] — never number cards 01/02/03
- Rule: Don't add an index label (`01`, `02`, `03` …) to cards in a feature/service grid. No exceptions for "just a small counter in the corner."
- Why: user explicitly banned this after seeing it on the AI-automations "Three Things We Fix Most Often" grid — reads as generic template filler, not considered design. Let the image, title, and grid position carry the ordering instead.
- Where: `app/services/ai-automations/AIAutomationsClient.tsx` "Three Things We Fix Most Often" section (index field removed from `FixCard`).
- Date: 2026-07-04
