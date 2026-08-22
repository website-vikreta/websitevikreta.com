# Session State — Live Scratchpad

> Update this file at the end of every task. This is the only context file loaded by default alongside the task-specific file. Keep it under 100 lines.

---

## Current Task
<!-- What are we building right now? -->
Apps & CRM page (`/services/web-and-mobile-apps`) HowWeWork section — reverted to round 3's end state. Rounds 4 and 5 (heading rewrite "How We Work" → "You See Every Step Before It Ships" + bordered intro panel; then a fix for white-on-white cards + absolute-position zigzag drift) were both explicitly reverted by user request ("get these back to before i asked you to change that How we work title"). Current state: `HowWeWork.tsx` heading is "How We Work" again, plain wrapper, no panel; `how-it-works.tsx` is back to the bold-accent absolute-position zigzag canvas (`CARD_WIDTH=260`, `bg-(--color-surface)` cards, internal GSAP self-draw bezier connector). See learning.md 2026-08-22 [Reverted] entry — don't re-propose the panel/heading-rewrite/flow-layout without being asked again; if the white-on-white or position-drift bugs resurface as their own complaint, they're real and the fix is logged, just don't bundle it with a heading change again.

Previous: Apps & CRM page (`/services/web-and-mobile-apps`) visual redesign, round 3 — DONE. User supplied a community "how-it-works" React snippet (pastel rotated pinned cards, Comic Sans numerals, drop shadows, dark mode) and asked to integrate it in our colors/type. Built `components/ui/how-it-works.tsx`: kept the numbered-step-connected-by-a-path concept + `Pin` icon marker (lucide-react, not the hand-rolled inline SVG), rebuilt everything else on brand tokens — no dark mode, Epilogue only, single accent (numeral ghost→accent on hover, same treatment as the just-built HowWeWork grid it replaces), no shadows, 0 radius, no gradients, no second bg pattern (page's `DotGrid` already covers that), dropped the card rotation (reads playful, brand is "editorial not playful" — flag if this comes up again). Connector path rebuilt generically (`layout(n)`, works for any step count) using the same percentage-viewBox + non-scaling-stroke technique as `SystemDiagram.tsx`'s `ToolSprawl`/`ConvergeDiagram`, and the self-draw animation reuses `automation-workflow-canvas.tsx`'s proven getTotalLength/strokeDashoffset technique (once, not looping). No shadcn setup needed/added — project has no `components.json`, `components/ui/` is already the shared-component convention, `motion` + `lucide-react` were already installed. See learning.md 2026-08-22 [Component] `HowItWorks` entry.

Previous: Apps & CRM page (`/services/web-and-mobile-apps`) visual redesign, round 2 — DONE. First pass (below) got rejected on review: reused `AutomationWorkflowCanvas` (the AI Automations page's draggable, hardcoded-green "Active"-badge dashboard mockup) for `HowWeWork` — wrong call, off-brand color, foreign visual language breaking story continuity, and pointless drag interaction ("not necessary... not clearly defining what customer should do... i have tried to use it"). Fixed: reverted the canvas component to its original AI-Automations-only state (no `steps`/`title` props — that generalization is gone, not just unused), and rebuilt `HowWeWork` as a plain static bordered-grid matching `FixesSection`'s pattern exactly — ghost `01–04` index (justified: these steps are ordered, unlike a feature grid — see learning.md [Exception] entry), title, "what we do" copy, and an explicit "**Your part:** …" line per step so the customer's action at each stage is stated, not implied. See learning.md 2026-08-22 [Rejected] entry — don't reuse that canvas component outside AI Automations again.

First pass (still standing): Apps & CRM page (`/services/web-and-mobile-apps`) visual redesign. User flagged the page as below the site's bar: "graphical components are very low", copy "trying to tell the story explicitly", wanted it to visually represent the journey and generate leads. Shipped: (1) new `sections/SystemDiagram.tsx` gives the page one visual idea at two scales — `ToolSprawl` (Pain: six tool chips hand-routed through a dark "Someone on your team" hub) and `ConvergeDiagram` (Solution cards: three faint inputs → one dark output). HTML chips over a `preserveAspectRatio="none"` SVG connector layer, so labels stay legible on a phone; monochrome only, no accent (page's one static yellow is the hero word). (2) `AutomationWorkflowCanvas` parameterised with `steps`/`title` — the flat 4-cell HowWeWork grid is now the same interactive canvas the AI Automations page uses, fed Discover/Design/Build/Launch. Positions/connections derive from the step array, AI Automations call site unchanged. (3) Hero: headline → "Your Business **Outgrew** Its Spreadsheets", lede cut to 19 words, real proof band added (Pune / 68 projects / five years, sourced from `StatsCounters`). (4) Copy pass on every section against the density budget + anti-slop skill — Pain went 3 paragraphs → 2, card descriptions ≤14 words. (5) Killed three per-card CTAs that promised three destinations and all scrolled to the same form; one shared CTA under the grid. (6) Contact form card heading `<h2>` → `<h3>` (page had two h2s at the same level). See learning.md 2026-08-22 entries. **Not touched:** ProofSection, FaqSection, the contact form itself. Three pre-existing eslint errors remain (ContactSection:78, canvas:320/485) — all in untouched code.

Previous: Homepage mobile PSI/a11y fix pass — DONE, user explicitly said stop here. (1) Hero's subhead/label/CTA were hidden behind a global `[data-hero-anim]{opacity:0}` rule, only shown after JS hydration + `document.fonts.ready` + a chained GSAP timeline — PSI flagged the subhead `<p>` as LCP element, 3.58s render delay. Replaced with pure-CSS `.hero-fade-in`, timed to the ORIGINAL GSAP timeline's exact durations/delays (label 0s, subhead 1.05s, CTA 1.25s — not flattened) so the perf fix doesn't change the visual pacing. Then verified via real `next build`+Lighthouse that PSI's LCP candidate just moved to the `<h1>` next (same architecture problem) — fixed that too: real headline text (`.word-inner`) now static/always-painted, an opaque `.word-mask` overlay (new) does the GSAP reveal instead, so the "rise up" look survives but nothing above the fold is JS/font-gated anymore. See learning.md [Perf] entries dated 2026-08-07 for exact mechanism/timing values — don't flatten the delays or re-hide the real text again. (2) `var(--color-accent)` as literal text color on `--color-bg` measures ~1.35:1 contrast (WCAG fail, confirmed real) on `HeroSection.tsx` "think" and `ServicesBentoGrid.tsx` "We build systems." — a highlight-box fix (passes WCAG) was tried and **explicitly rejected by user as a UI compromise**; reverted to original plain yellow text, contrast failure knowingly accepted. Don't re-propose the highlight-box without being asked. **Two of the original four PSI-report issues never matched live code** (image `sizes` — already correct on the real homepage component; GTM/TBT — already `lazyOnload`, deliberately not `@next/third-parties`), neither touched.
**Confirmed-real, explicitly out-of-scope finding, NOT fixed**: local prod-build Lighthouse still shows LCP ~6s / poor even after both hero fixes, because ~1MB JS / ~6s main-thread work across the *whole* homepage's client components (GSAP, motion/react, DotGrid canvas loop, GTM, hydration) is the actual remaining ceiling — not the hero. User chose "stop here, ship what's fixed" over scoping a bundle-weight reduction pass. If asked to keep improving homepage LCP, this is where the next task starts — see learning.md [Perf] "known ceiling" entry, needs its own Storyteller/Builder/Critic pass, not a quick patch.

Previous: `/blog` featured hero image made strict `aspect-video` (16:9) at every breakpoint — DONE. Was `lg:aspect-auto` (stretched to match text column height); now `lg:items-center` instead of `lg:items-stretch`, image sits at its own fixed 16:9 height. Skeleton mirrors it. See learning.md [Hero] entry dated 2026-08-04.

Previous: Full `/blog/*` audit + fixes — DONE for the contained items. Found via a full routing/UI/perf pass: (1) post detail page had no `<h1>` (title was `<h2>`) — fixed. (2) `BlogCard.tsx` titles were `<h2>` sitewide (should be `<h3>`) — fixed, plus its inline `style={{fontSize}}` moved to a Tailwind arbitrary-value class. (3) `/blog` index fetched every post in the blog unconditionally — capped at 24 via a new `limit` param on `fetchFilteredBlogPosts`/`FILTERED_POSTS_QUERY`. See learning.md 2026-08-04 entries for each.
**Open, explicitly scoped out:** `/blog/categories|tags|authors/[slug]` still fetch their full matching post list unbounded (only labels caps at 100) — `InfiniteBlogGrid` needs converting to fetch-on-scroll via a server action. Not started.

Before that: `/blog/search` type-to-search restored — `BlogSearchFilters.tsx` debounces the text input (400ms, `router.replace`) instead of requiring Enter/submit; explicit submit still bypasses the debounce. Reused the existing `navigate()`/GROQ-match/CDN-cache pipeline built 2026-08-03.

Before that: Blog taxonomy routing fix — DONE. All 4 taxonomy routes are now plural (`/blog/categories`, `/blog/tags`, `/blog/labels`, `/blog/authors`), breadcrumbs match, index pages exist, and the 4 `[slug]` post-listing pages use a uniform lazy-loaded card grid (no featured hero). See learning.md [Nav]/[Page] entries dated 2026-08-03.

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
2026-08-01 — /work pass. Kept the page's existing look (a restyle in the About page's language was built and rejected outright — see learning.md [Rejected]). Shipped: home + /work now share ONE `FeaturedWorkSection` fed by `lib/work-data.ts` (page-local `WorkCaseStudiesSection` deleted); `ClientLogosSection` (8 invented client names) dropped from /work and `StatsCounters` given `bgClassName=""` — no section backgrounds on this page; testimonial carousel made touch-usable (measured card width replacing the fixed 380px that overflowed small phones, drag-to-swipe, `useReducedMotion` guard, shared `REVEAL_EASE`); `FaqSection` easing unified to `REVEAL_EASE`; `DotGrid`'s rAF loop now idles when nothing is fading. Selected websites is 6 cards (Psilent Ganges netlify test removed, sustainablebtc.org + apcleanco.com added). **Open: real screenshots needed — 6 website cards share 5 stock `/our-services/*.webp` illustrations; `ClientLogosSection`'s fake names still live on /about.**

## Previously
2026-07-31 — About page density/rhythm pass: copy cut ~45%, surface rhythm added (CoreValues + StatsCounters on white `--color-surface` slabs; a dark inverted slab was tried and rejected — don't re-propose), Insights duplicate desktop/mobile DOM collapsed, gallery grid span math fixed for mobile. Then a minimal pass on user review ("tons of AI slop"): every per-item hairline removed, 01–06 indices removed, photo radius/hover-morph removed, all motion now scroll-only. Story arc + section order unchanged. See learning.md [Minimal] entries, [Section] surface rhythm, [Copy] density budget, [Responsive] no hidden-toggled copies.