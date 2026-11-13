# Session State

> Live scratchpad. Update at the end of every task. Keep under 60 lines. History lives in git.

## Current Task
<!-- What are we building right now? -->
WhatsApp Packages section: equal-height 2-up pricing cards with CSS subgrid so title/price/CTA align. Eyebrow slot reserved on both cards. Full-width CTAs.

Previous: Digital Marketing page (`/services/digital-marketing`) — built out from `ComingSoonPage` to a full page, same conversion spine as Apps & CRM: Hero → Pain → Solution → HowWeWork → Proof → FAQ → Contact. New `sections/` folder + `DigitalMarketingClient.tsx`. New `#marketing-audit` popup config added to `AuditModalProvider.tsx`. Proof section is a single AP Cleanco project card + its testimonial (only real project tagged local SEO). FAQ is a new page-local array (`dm-1`–`dm-4`), not a filtered `ALL_FAQS` subset. `tsc --noEmit` and `eslint` clean. See learning.md's 2026-08-24 `[Page] Digital Marketing` entry (and its 2026-08-28 update) for exact details.

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
2026-09-19 (latest) — Cart recovery's static phone replaced with `AbandonedCartDemo`: a looping storefront-to-WhatsApp mock (browse → add to cart → leave → the three recovery messages arrive), driven by the section's own `MESSAGES` array so copy and bubbles can't drift. `WhatsAppPhoneShell` split into `PhoneFrame` / `PhoneStatusBar` / `WhatsAppScreen` with fixed chrome heights so two different screens can share one bezel without it resizing; shared bubble keyframes moved into the shell (they were injected by `PhoneDemo` alone, which `HeroJourneyPhone` had been quietly depending on). See learning.md's `[Component]` entry.

Previous: 2026-09-19 — WhatsApp page density pass from a user screenshot review: logo rail unboxed and IndiaMART given a real (user-supplied, heavy 386 KB) logo; Hero's 3-stat row and "Works with your existing stack" label cut so logos stand alone; Packages savings now a green `Save ₹1,500 · 7%` pill that re-fades on cycle switch; Onboarding lost its "7 to 14" callout box (the number is accent-coloured in the heading instead), its `Phase 01` eyebrows and its 01–12 step numbers, and got `min-h-12` on phase detail copy so the four cards stop misaligning; "No answer in 24 hours" section deleted; ProductReveal's 8-tag journey row cut and FEATURES trimmed 7 → 4; cart-recovery 3-message block flipped to phone-left. Details in learning.md's `[Pass]` entry — note it deliberately reverses the earlier `[Content]` 8-tag-row entry. The IndiaMART asset was then cut from 386 KB to 15 KB by keeping only the wordmark paths and dropping the gradient-traced emblem.

Previous: 2026-09-19 — WhatsApp automation consistency audit + fix pass: accent color cut from 17+ uses to 2 (Hero word + Packages featured strip) to match sitewide budget; dead `SnakePath.tsx` deleted; `IntegrationLogoRail` no longer hotlinks an external GitHub repo (Shopify/Meta now local, rest are initial marks); three duplicated phone-mockup components collapsed into shared `WhatsAppPhoneShell.tsx`; one stray `rounded-md` card squared off; COD-steps and Proof-cases grids pushed from `sm` to `md` breakpoint (were cramped on small tablets). Full findings + rationale in learning.md's 2026-09-19 `[Audit]` entry — also flags that the 2026-09-09 S-snake/subgrid entries above no longer describe current code. **Open, not done:** `CustomerJourneySection`'s 8-step copy still reads generic/buzzwordy next to the rest of the page's specific voice — flagged as a candidate cut or rewrite, not yet touched pending a content call.

Previous: 2026-09-12 — WhatsApp automation visual pass: integration chips replaced with a sharp logo rail reused in Hero + Packages; page-level cards/grids squared off, with rounded corners kept only inside phone/chat/product mockups.

Previous: 2026-09-09 — WhatsApp Journey + Onboarding: shared S-snake (3+3+2 / 5+5+2).

Previous: 2026-09-09 — WhatsApp Packages cards: subgrid alignment, reserved eyebrow slot, full-width CTAs.

2026-10-30

2026-10-09 — /work Selected websites updated with real screenshots. Connected `image` and `imageAlt` props in `WorkWebsitesSection.tsx` through to `ExternalProjectLink`, and updated `WEB_PROJECTS` in `lib/work-data.ts` to reference the 6 real web-development screenshots (`/services/web-development/proof/*.webp`: Tocal, Sustainable Bitcoin Protocol, AP Cleanco, Archmodal, Earth by Blancora, Simpli Home). The previously open item ("real screenshots needed") is now resolved for /work.

2026-08-01 — /work pass. Kept the page's existing look (a restyle in the About page's language was built and rejected outright — see learning.md [Rejected]). Shipped: home + /work now share ONE `FeaturedWorkSection` fed by `lib/work-data.ts` (page-local `WorkCaseStudiesSection` deleted); `ClientLogosSection` (8 invented client names) dropped from /work and `StatsCounters` given `bgClassName=""` — no section backgrounds on this page; testimonial carousel made touch-usable (measured card width replacing the fixed 380px that overflowed small phones, drag-to-swipe, `useReducedMotion` guard, shared `REVEAL_EASE`); `FaqSection` easing unified to `REVEAL_EASE`; `DotGrid`'s rAF loop now idles when nothing is fading. Selected websites is 6 cards (Psilent Ganges netlify test removed, sustainablebtc.org + apcleanco.com added).

## Previously
2026-07-31 — About page density/rhythm pass: copy cut ~45%, surface rhythm added (CoreValues + StatsCounters on white `--color-surface` slabs; a dark inverted slab was tried and rejected — don't re-propose), Insights duplicate desktop/mobile DOM collapsed, gallery grid span math fixed for mobile. Then a minimal pass on user review ("tons of AI slop"): every per-item hairline removed, 01–06 indices removed, photo radius/hover-morph removed, all motion now scroll-only. Story arc + section order unchanged. See learning.md [Minimal] entries, [Section] surface rhythm, [Copy] density budget, [Responsive] no hidden-toggled copies.
