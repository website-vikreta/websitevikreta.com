# Session State

> Live scratchpad. Update at the end of every task. Keep under 60 lines. History lives in git.

## Current Task
<!-- What are we building right now? -->
Automation & Ops pillar (`/services/ai/automation-ops`) hero art redesign — real behaving image matching sub-page content. The abstract hub-and-spoke graph was rejected by the user; replaced with a 4-panel live "back office board":
1. `components/wv/automation/heroes/AutomationOpsHeroArt.tsx` — four realistic animated scenes, one per child page, on one shared `useClock` loop: Workflows (Form→CRM→Slack→Gmail nodes light up, `Steps run, no hand-offs 4/4` — factual, no invented hours-saved figure); HR (Meher's face + one-line command types out, offer letter fields fill, signature draws, "Sent for e-sign ✓"); Proposals (Arjun's discovery note → 4 pages Cover/Scope/Timeline/Investment → "Sent · Opened 2×"); Finance (INV-1042 with real line items from FinanceHero, status Sent → Reminder → Reminder → PAID stamp in a reserved band). Real personas + tool marks, wv tokens only, final frame on SSR/reduced motion.
2. `app/services/ai/pillar.css` — ao-* board styles: 2×2 grid (1 col < 620px), compact realistic cards, staggered reveal transitions, PAID stamp given its own bottom band so it never overlaps amounts (verified 0 overlaps at 1440px + 390px with reduced motion).
3. `app/services/ai/PillarPage.tsx` — automation-ops uses AutomationOpsHeroArt + dynamic trust items from branch USPs (Workflow/HR/Proposals/Finance).
4. `content/ai/pillars.ts` — added `reading` array (3 blog posts) to automation-ops.
Done: tsc --noEmit clean, eslint 0 errors (1 expected `<img>` warning for small SVG tool marks), all 18 vitest pass, `npm run build` passes (241 static pages). Layout verified in Chrome via Playwright at 1440/900/390px: no broken images, no console errors, no text overlaps, no horizontal overflow. Uncommitted on `feat/automation-ops-pillar` per user request.

Also done on the same branch: `ai-content-ads` pillar (`/services/ai/ai-content-ads`) hero art + Keep reading:
1. New `components/wv/automation/heroes/AiContentAdsHeroArt.tsx` — "content studio" board: one typed brief (Ira) with Approved chip → two real child scenes on one clock. Content Automation: 5 posts appear across WordPress/LinkedIn/X/Instagram/Mailchimp with a real `8→13 /13` scheduler count. AI UGC Ads: 3 vertical ad cards (real hooks/views from `UgcHero`), platform chips, AI-disclosed label, `TOP` badge and a curiosity chip that flips "Which hook will win?" → "Hook 1 won → making 3 more". CSS `ais-*` in `pillar.css`.
2. `PillarPage.tsx` — renders the new art for ai-content-ads; trust items now use branch USPs for every pillar with branches except conversational-ai (which keeps its hand-written channel copy). ai-content-ads trust now shows Content Automation + AI UGC Ads instead of voice/WhatsApp/commerce.
3. `pillars.ts` — added 3 `reading` posts to ai-content-ads (Google AI search guide, human oversight, AI automation ROI); previously fell back to 2.
Verified in Chrome at 1440/900/390px: all final-frame states present, 0 broken images, 0 console errors, 0 overflow, 3 blog links, no text overlaps. tsc clean, eslint 0 errors (1 expected img warning), 18/18 tests. Skipped `npm run build` to avoid clearing `.next` under the user's running dev server on port 3000; no routes or next.config changed.

Also done on the same branch: `ai-search-visibility` pillar (`/services/ai/ai-search-visibility`). This pillar has NO AI child branches — it links to `/services/digital-marketing` (SEO & GEO), so source content there, not in `/services/ai/branches`.
1. New `components/wv/automation/heroes/AiSearchVisibilityHeroArt.tsx` — "answer engine desk": buyer question “Who does GEO for small businesses?” goes to ChatGPT / Perplexity / Google AI (Perplexity has no logo in TOOL_LOGOS → letter fallback), an AI answer forms with a citation card to Website Vikreta, and the 5 real change areas from the pillar FAQ (answer-first content, schema markup, entity signals, crawler access, internal links) check in. Honest caveat shown: no guaranteed citations, we check where you appear. Footer mirrors the three SEO & GEO focus areas. CSS `aus-*` in `pillar.css`. `START = 700` (not 4000) so the whole story actually animates on first play.
2. `PillarPage.tsx` — renders new art for ai-search-visibility; added `SEARCH_VISIBILITY_TRUST` using the real SEO & GEO focus areas (SEO & GEO foundations, Content & growth systems, Paid & local campaigns). Trust selection is now explicit per pillar: conversational-ai → hand-written channels, ai-search-visibility → SEO & GEO focus areas, all others → branch USPs.
3. `pillars.ts` — added 3 `reading` posts to ai-search-visibility (Google AI search guide, AI strategy outcomes, AI automation ROI); previously fell back to 2.
Verified in Chrome at 1440/900/390px and with live motion sampled across the loop: full sequence plays, final frame complete, no overlaps/overflow/broken images/console errors. tsc clean, eslint 0 errors (1 expected img warning), 18/18 tests. Still no build (user's dev server on 3000 left running). Nothing committed.

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
