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

### [Exception] — AI hub may use the AI nav pair as a quiet accent (owner-approved 2026-11-07)
- Rule: On `/services/ai-automations` only, violet `#7c3aed` → pink `#ff2d95` (the nav snake gradient) at ~20% ambient page glow plus strike lines, index numbers, FAQ open marker and the closing CTA ground. Never on buttons or body text. Tokens `--ai-a/--ai-b/--ai` live on `.axh` in `hub.css`.
- Where: `app/services/ai-automations/hub.css`.
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
- Rule: Every `/services/ai-automations/**` page ends with `ProofBar`, `Reading`, `Faq`, `CtaBlock`, which now alias `components/wv/automation/closing.tsx`. Put `wv-ax-glow` on `<main>` for the 20% violet/pink page glow. The global map CTA is hidden on these routes (`HideOnHome`).
- Where: `components/wv/automation/closing.tsx`, `closing.css`, `components/ui/ConditionalShell.tsx`.
- Date: 2026-11-07
