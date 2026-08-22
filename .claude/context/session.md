# Session State — Live Scratchpad

> Update this file at the end of every task. This is the only context file loaded by default alongside the task-specific file. Keep it under 100 lines.

---

## Current Task
<!-- What are we building right now? -->
**2026-08-22 — /services/ai-automations full content restructure — DONE (not committed).** Branch `features/ai-automation-redesign` off `releases/2026-08`. New order: Hero → Pain → **Pillars(new)** → Fixes/Services(3→5 cards) → **StatsCounters + ClientLogosSection (proof, new)** → HowWeWork → Why(3 bullets) → **FaqSection(new)** → Contact(+WhatsApp secondary CTA). Hero rewritten to the outcome-led headline ("Get 20 Hours a Week Back…") + proof band. Build + tsc clean; every section visually verified in a real browser.
**Open items needing the client, deliberately NOT invented:** (1) "AI DLC" service card — omitted, nobody could say what it stands for; (2) five `[CLIENT TO CONFIRM]` metric slots — only already-published figures shipped (6,360+ hrs, 68+ projects, 20h→1h), pillars without a real number show no metric line; (3) no testimonial exists for this page — proof is stats + real client logos only; (4) FAQ has no data-safety answer (would have required inventing a data-handling stance) and no per-step timeline under HowWeWork.
**Pre-existing bug found, NOT caused by this pass and not fixed:** `PainSection`'s first `<p>` throws a hydration mismatch (server text has ~5 trailing spaces, client doesn't). Paragraph is untouched by this diff — verified via `git diff`. Dev-overlay only.
Rejected during this pass, don't re-propose: an image in the AI-Automations hero (both split and stacked variants), and grayscaling that diagram to blend into the page — `DotGrid`'s static dot grid means no opaque raster ever blends seamlessly. See learning.md 2026-08-22 entries.

Homepage mobile PSI/a11y fix pass — DONE, user explicitly said stop here. (1) Hero's subhead/label/CTA were hidden behind a global `[data-hero-anim]{opacity:0}` rule, only shown after JS hydration + `document.fonts.ready` + a chained GSAP timeline — PSI flagged the subhead `<p>` as LCP element, 3.58s render delay. Replaced with pure-CSS `.hero-fade-in`, timed to the ORIGINAL GSAP timeline's exact durations/delays (label 0s, subhead 1.05s, CTA 1.25s — not flattened) so the perf fix doesn't change the visual pacing. Then verified via real `next build`+Lighthouse that PSI's LCP candidate just moved to the `<h1>` next (same architecture problem) — fixed that too: real headline text (`.word-inner`) now static/always-painted, an opaque `.word-mask` overlay (new) does the GSAP reveal instead, so the "rise up" look survives but nothing above the fold is JS/font-gated anymore. See learning.md [Perf] entries dated 2026-08-07 for exact mechanism/timing values — don't flatten the delays or re-hide the real text again. (2) `var(--color-accent)` as literal text color on `--color-bg` measures ~1.35:1 contrast (WCAG fail, confirmed real) on `HeroSection.tsx` "think" and `ServicesBentoGrid.tsx` "We build systems." — a highlight-box fix (passes WCAG) was tried and **explicitly rejected by user as a UI compromise**; reverted to original plain yellow text, contrast failure knowingly accepted. Don't re-propose the highlight-box without being asked. **Two of the original four PSI-report issues never matched live code** (image `sizes` — already correct on the real homepage component; GTM/TBT — already `lazyOnload`, deliberately not `@next/third-parties`), neither touched.
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