# Learning Log — `wv`

Reusable decisions made while building in `wv`. Read before building. One entry = one rule, exact values.
On conflict: follow the rule or update it with a reason. Never diverge silently.

The pre-`wv` log (legacy pages, GSAP, Epilogue/Utile) is in git: `git show 3d6f391:.ai/learning.md`. Use it only when fixing a legacy page.

## Format

```
### [Topic] — title
- Rule: <exact values>
- Where: <files>
- Date: YYYY-MM-DD
```

---

### [System] — `wv` is the only design language
- Rule: New work uses `app/wv.css` + `components/wv/*` only. Spec in `.ai/standards/design-system.md`.
- Where: homepage (`WvPage`), header/footer (`SiteChrome`).
- Date: 2026-10-30

### [Color] — yellow text uses gold
- Rule: `--y #fac800` is fill-only on light grounds. Yellow-family text/hover text = `--gold #8a6d00`. On the dark footer, `--y` text is fine.
- Where: `.wv-eyebrow.is-y`, `.wv-mega-gt:hover`, `.wv-svc-row:hover .wv-hl-ch`.
- Date: 2026-10-30

### [Shell] — global chrome reuses `.wv` tokens without page styles
- Rule: Header/footer render inside `.wv.wv-shell` so tokens apply but canvas background/min-height don't leak into legacy pages.
- Where: `components/wv/SiteChrome.tsx`.
- Date: 2026-10-30

### [Motion] — split text is screen-reader safe
- Rule: Any per-letter/per-word animation renders a `.wv-sr` copy of the full string and marks animated spans `aria-hidden`.
- Where: `KineticTitle`, `RotatingWord`, `HoverLetters`, `ScrollWords`, `CountUp`, `VelocityMarquee`.
- Date: 2026-10-30

### [Exception] — AI Solutions nav item is the only off-palette element
- Rule: Magenta `#c026d3` bolt + animated snake border on `.wv-nav-ai` only. Do not reuse magenta anywhere.
- Where: `components/wv/Header.tsx`.
- Date: 2026-10-30

### [Palette] — AI pages use wv tokens only (2026-11-09, supersedes the 2026-11-07 violet/pink exception)
- Rule: No violet/pink glow or gradient on `/services/ai-automations/**`. `--ai-a/--ai-b/--ai` on `.wv-ax-glow` now resolve to `var(--y)` (fills only: strike lines, FAQ open marker). Closing CTA sits on `--surface`. Anton only for H1/H2 and the Week counter; list item titles are Inter Tight 600.
- Where: `components/wv/automation/closing.css`, `app/services/ai-automations/hub.css`.
- Date: 2026-11-07

### [Component] — `.axh-week` scroll-struck chores
- Rule: Real number counts down with scroll (`useScroll` + `useMotionValueEvent`, state only on integer change); list items get `is-done` by threshold and a CSS strike draws in. Mobile: left column `display:contents` so the counter can stick under the header.
- Where: `app/services/ai-automations/Week.tsx`.
- Date: 2026-11-07

### [Motion] — never branch `initial` on `useReducedMotion`
- Rule: It is `null` on the server, so `initial={reduce ? … : …}` causes a hydration mismatch. Keep `initial` constant; zero the `transition` when reduced.
- Where: `Reveal`, `KineticTitle` in `components/wv/ui.tsx`.
- Date: 2026-11-07

### [Motion] — also applies to `render` branches, not just `initial`
- Rule: Never `{cond && !reduce && <X/>}` or `initial={reduce ? …}` in a component that SSRs. `useReducedMotion()` is `null` on the server, so the server and the first client render disagree. Hide with CSS `@media (prefers-reduced-motion: reduce)` or zero the `transition`.
- Where: sims replay button (`sims.css`), `WhatsAppHero`, `FinanceHero`, `VoiceHero`.
- Date: 2026-11-07

### [Layout] — AI pages share closing blocks
- Rule: Every `/services/ai-automations/**` page ends with `ProofBar`, `Reading`, `Faq`, `CtaBlock`, which now alias `components/wv/automation/closing.tsx`. Put `wv-ax-glow` on `<main>` for the shared `--ai*` accent tokens (yellow). The global map CTA is hidden on these routes (`HideOnHome`).
- Where: `components/wv/automation/closing.tsx`, `closing.css`, `components/ui/ConditionalShell.tsx`.
- Date: 2026-11-07

### [Override] — AI hub design is owner-led, not wv defaults (owner decision 2026-11-09, revised 2026-11-10)
- Rule: On `/services/ai-automations` the owner's direction beats `.ai/standards/*` and design skills. Typography matches the homepage: Anton uppercase H1/H2 (H2 same size as hero H1), Inter Tight body. Section heads are heading only: no one-liner beside or under it, no heading-left/line-right split. Hero is a bento (title+CTA, live chat, WebGL AI bubble, 4 STATS tiles) on the homepage `wv-grid-bg`. "Where your week goes" is a bento of photo + minimal demo tiles. Section rhythm is one `--axs` token, tuned by visible gap, not padding. Reveals are CSS scroll-driven (`animation-timeline: view()`), opacity/translate/scale/clip-path only. No eyebrows, no decorative numbering, no stats/case studies that are not in `lib/work-data.ts` or `components/wv/data.ts`. Proof is real only.
- Where: `app/services/ai-automations/{page.tsx,hub.css,Explorer.tsx,WeekSlider.tsx}`, `components/wv/automation/heroes/{HubHero.tsx,AiBubble.tsx,heroes-a.css}`.
- Date: 2026-11-10

### [Component] — `.wv-mcta` global map CTA
- Rule: The closing "Ready when you are" CTA on inner pages is `components/wv/MapCta.tsx` (mounted in `app/layout.tsx` inside `HideOnHome`). Pune = home; arcs to each market draw in (`pathLength`), then loop forever: dash flow + SMIL comet dot. Market volume = translucent yellow circles sized by owner-ranked `v` (US > UK > AU > CA > IN > NZ > rest), breathing + ripple. No client pills, no counts. Pages that render under it must not add a second closing CTA.
- Where: `components/wv/MapCta.tsx`, `app/wv.css` (`/* wv: map cta */`).
- Date: 2026-11-10

### [Component] — `/about` roadmap + hero photo trail
- Rule: Every block animates with an existing primitive: hero H1 `KineticTitle as="span"` + lead/CTA `Reveal` + scroll fade (Home pattern); era headlines `KineticTitle`, chips stagger in, rows `Reveal` + `HoverLetters`; cards lift −6px on hover. `.wv-rm` = sticky year rail (≥960) + scroll-lit era list; `.wv-hv` = mouse-only photo trail in the hero, hidden over text/CTAs (`HV_BLOCK`) with a 0.7s eased fade, off on touch/<960/reduced motion.
- Where: `components/wv/About.tsx`, `content/about.ts`, `app/wv.css` (`/* wv: about */`).
- Date: 2026-11-10
