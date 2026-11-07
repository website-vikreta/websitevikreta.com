# Design System — `wv`

The only design language on this site. Source of truth is code, this file is the map:

- Tokens + every class: `app/wv.css`
- Primitives (motion, icons, media): `components/wv/ui.tsx`
- Reference build: `components/wv/Home.tsx` (homepage), `Header.tsx`, `Footer.tsx`
- Content constants: `components/wv/data.ts`

If something is not in this file or `wv.css`, it does not exist. Compose from what is here. Never import a value, font, color or pattern from outside it.

## Legacy (do not extend)

`components/sections/*`, `components/ui/*` visuals, `components/home/*`, `.home-*` and `--color-*` tokens in `globals.css`, Utile/Epilogue, GSAP, `components/ui/Reveal.tsx`, Tailwind utility styling. Old pages still render with them. Never use them in new work. Touching a legacy page beyond a small fix = rebuild that section in `wv`.

## Tokens (scoped on `.wv`)

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#f6f4ee` | Page background |
| `--surface` | `#fff` | Cards, header (solid), drawer, process section |
| `--surface-2` | `#efece4` | Hover fill on quiet controls, image placeholder |
| `--ink` / `--text` | `#121212` | Text, dark fills, button wipe |
| `--muted` | `#5d5b55` | Secondary text, eyebrows, numbers |
| `--y` | `#fac800` | Yellow. **Fill only** on light grounds |
| `--y-2` | `#ffde4d` | Hover of a yellow fill |
| `--gold` | `#8a6d00` | Yellow-family **text** on light grounds (hover text, `is-y` eyebrow) |
| `--line` | `#1212121a` | Every hairline / border on light |
| `--line-d` | `#0b0b0c24` | Hairline on yellow |
| `--pad` | 16px → 32px ≥720 | Side gutter |

Dark ground (footer only): `#161616`, re-scoped `--text #f5f4ef`, `--muted #9b9a96`, `--line #ffffff1a`. On dark, `--y` may be text.

Sole off-palette exception: the AI Solutions nav item (`.wv-nav-ai`, magenta `#c026d3` bolt + snake border). Nowhere else.

Rules:
- Yellow is never text on canvas/surface. Use `--gold`.
- Yellow full-bleed grounds allowed only as: the tilted band, the stats section, the CTA orb. One yellow ground per viewport.
- Color photography is allowed. Tints: dark gradient scrims only (`#0b0b0c` → transparent).
- New hex value in a component = violation. Add a token in `wv.css` only if the user approves.

## Type

Two families, loaded in `components/wv/fonts.ts` (`--display`, `--sans`). Wrap any new tree in `wvFonts`.

| Role | Spec |
|---|---|
| Display (h1/h2/h3, numbers, big labels) | Anton, `uppercase`, weight 400, line-height 0.9–1 |
| Everything else | Inter Tight, 16px / 1.55 |
| H1 | `.wv-h1` `clamp(50px, 7.8vw, 112px)` / 0.9 |
| H2 (section) | `.wv-kt.wv-h2` `clamp(48px, 9vw, 128px)` / 0.92 |
| H3 large (row/card) | `clamp(30px, 3.6–4.6vw, 52–64px)` / 1 |
| H3 fixed | 40–44px / 1 |
| Stat number | `clamp(54px, 8vw, 110px)` |
| Statement paragraph | `.wv-big-p` `clamp(28px, 4.2vw, 56px)` / 1.12, −0.02em, 500 |
| Quote | `clamp(26px, 3.4vw, 46px)` / 1.15, 500 |
| Lead | 17–19px, `--muted`, max 520–560px |
| Body | 15–16.5px |
| Small / meta | 13–14.5px |
| Eyebrow | `.wv-eyebrow` 12px, 600, 0.14em, uppercase, written `( Label )` |

Rules: Anton never for body. Inter Tight never uppercase except eyebrow/chip/card-top. No other weights than 400 (Anton) and 500/600/700 (Inter Tight).

## Layout

- Container: `.wv-wrap` (max 1320px, `--pad` gutters). Every section content sits in it.
- Section: `.wv-sec` padding 96px, 150px ≥960. Yellow/surface sections: 96px, 130px ≥960.
- Section head: `.wv-sec-head` = `KineticTitle` (h2) + `.wv-sec-aside` (muted, max 380px, optional `.wv-link`). Grid `1fr auto`, aligned end at ≥960. Gap below 48 → 72px.
- Split: two columns at ≥960 only — `1.4fr .8fr` or `1.3fr .8fr`, gap 80px (48px stacked).
- Breakpoints: 720 (gutter), 960 (layout splits, hover-only extras), 1024 (desktop nav). Mobile-first, no others.
- Lists: hairline rows (`border-top/bottom: 1px var(--line)`) before boxed cards.

## Shape

| Element | Radius |
|---|---|
| Buttons, chips, pills, tags, nav links | `999px` |
| Large card, parallax photo | `28px` |
| Hero image, step card, panel | `24px` |
| Media tile, member photo | `20–22px` |
| Small media, tab | `14–18px` |
| Logo mark, icon tile | `10px` |
| Icon buttons, avatars, orb | `50%` |

Borders: 1px `--line`. 2px only for avatar rings and the stats rule. Shadows only on floating media (`0 30px 60px -24px #12121259`) and the mega menu. Never on cards.

## Signature Elements

Use these to make something feel `wv`. Do not invent new decoration.

- `Star` — 4-point sparkle. Separator in marquees, bullet before proof. Yellow.
- `Arrow` — diagonal ↗. Rotates 45° on parent hover. Every forward link/CTA.
- `( Eyebrow )` — parenthesised label above statements and quotes.
- Tilted yellow band — `.wv-band` (−2deg) with two `VelocityMarquee` rows, one solid, one `is-outline`.
- Outlined giant type — `-webkit-text-stroke` on transparent text (CTA marquee, footer wordmark).
- Grid background — `.wv-grid-bg`, radial-masked, hero only.
- Yellow corner glow — radial `#fac8004d`, hero only.
- Numbering — `01`, `02` in `--muted` 13px, or Anton yellow 64px on step cards.

## Components (catalogue)

| Need | Use |
|---|---|
| Primary CTA | `.wv-btn.wv-btn-y` inside `Magnetic`, + `Arrow` |
| Secondary CTA | `.wv-btn.wv-btn-ghost` |
| Compact CTA | add `.wv-btn-sm` |
| Text link | `.wv-link` + `Arrow size={14}` |
| CTA group | `.wv-cta-row` (`is-center`) |
| Closing CTA | `.wv-cta` section: outline marquee + `KineticTitle` + `.wv-cta-orb` + `.wv-cta-meta` |
| Page hero (home) | `.wv-hero` pattern in `Home.tsx` |
| Page hero (inner) | `.wv-page` + `.wv-crumbs` + `.wv-h1.wv-page-h1` + `.wv-page-lead` + `.wv-cta-row` |
| Section title | `KineticTitle` `className="wv-h2"`, 2 lines, `accent` on the last |
| Statement | eyebrow + `ScrollWords` `.wv-big-p` + `.wv-link`, beside `ParallaxPhoto` |
| Service/index list | `.wv-svc-list` rows with `HoverLetters`, cursor-follow photo ≥960 |
| Stats | `.wv-stats` yellow section, `CountUp` in `.wv-stat` |
| Case study | `.wv-card` sticky stack (`WorkCard`) |
| Steps | `.wv-process` (pinned horizontal ≥960, stacked mobile) |
| Testimonial | `.wv-quote` rotator + `.wv-quote-nav` |
| Team | `.wv-team-grid` + `.wv-member` (grayscale → color, yellow bar on hover) |
| Logos | `VelocityMarquee` `is-logos` (grayscale, 60% opacity) |
| Tag | `.wv-card-tags span` (hairline pill) |
| Badge | `.wv-chip` (yellow pill, `is-lg`) |
| Status pill | `.wv-pill` + `.wv-dot` |
| Image | `Photo` (fill), `ParallaxPhoto` (clip reveal + parallax) |
| Accordion / FAQ | `.wv-acc` + `.wv-acc-btn` + `.wv-plus` (Anton question, hairline rows) |
| Tabs | `.wv-mega-tab` pattern (`aria-selected` → yellow fill) |

## Inventing a Component

Only when nothing above fits. Build it from this grammar, nothing else:

1. **Name**: `.wv-<name>`, children `.wv-<name>-<part>`, states `.is-<state>`. CSS goes at the end of `app/wv.css` under a `/* wv: <name> */` comment.
2. **Ground**: canvas, surface, yellow, or ink/dark. Pick one. Text colors follow the token rules above.
3. **Type**: one Anton display line max per block, Inter Tight for the rest, sizes from the type table.
4. **Shape**: radius from the shape table by size. 1px `--line` border or no border. No shadow unless it floats.
5. **Hover** (`(hover: hover)` devices only, choose one): ink fill wipes up from bottom (button), yellow 2px underline grows (link), yellow wash `#fac80038 → transparent` (row), circle fills yellow (icon button), image scales 1.05 over 0.8–0.9s, text turns `--gold`, card lifts −6px and inverts to ink. Always rotate a child `Arrow` 45°.
6. **Motion**: one effect per element, from `ui.tsx` (see motion-system.md).
7. **A11y**: split/animated text keeps a `.wv-sr` copy and `aria-hidden` visuals. 2px ink focus ring (inherited). Targets ≥42px.
8. **Mobile**: works at 360px first. Desktop-only extras (`float`, pin, magnetic) hidden or no-op below 960.

Log the new component in `.ai/learning.md`.

## Never

Gradients except dark scrims, the yellow glow and the row wash. Yellow text on light. Third typeface. New colors. Square corners on interactive elements. Card shadows. Tailwind utility classes in `wv` components. Icon libraries inside `wv` UI (use `Star`, `Arrow`, `Chevron`, `.wv-plus`, or a new inline SVG added to `ui.tsx`: 24px viewBox, `currentColor`, stroke 2, round caps). Centered body copy outside CTA blocks.
