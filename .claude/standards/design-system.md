# Design System — Website Vikreta

## Color Tokens
```css
:root {
  /* Light theme — warm off-white palette */
  --color-bg:            #FAFAF7;   /* page background */
  --color-surface:       #FFFFFF;   /* cards, elevated containers */
  --color-bg-subtle:     #FFFFFF;   /* same as surface */
  --color-bg-muted:      #F0F0ED;   /* muted warm neutral */
  --color-text:          #121212;   /* primary text */
  --color-text-muted:    #525252;   /* secondary text */
  --color-text-faint:    #A0A0A0;   /* metadata, placeholders */
  --color-accent:        #FFD600;   /* yellow — use sparingly */
  --color-accent-dark:   #F3CB00;   /* yellow on hover */
  --color-border:        #E8E8E8;   /* default borders */
  --color-border-strong: #D4D4D4;   /* focused/elevated borders */
}
```

## Typography Scale
> Font: **Epilogue** only. All type — display headlines, body, UI, labels, metadata. Loaded via `next/font/google`. Single typeface, all weights 100–900.
```css
:root {
  /* Display — Hero headlines only */
  --text-display:    clamp(3.5rem, 10vw, 9rem);
  --leading-display: 0.9;
  --tracking-display: -0.03em;

  /* H1 — Page titles */
  --text-h1:         clamp(2.5rem, 6vw, 5rem);
  --leading-h1:      1.0;

  /* H2 — Section headlines */
  --text-h2:         clamp(1.75rem, 4vw, 3rem);
  --leading-h2:      1.1;

  /* H3 — Card/component titles */
  --text-h3:         clamp(1.25rem, 2.5vw, 1.75rem);

  /* Body */
  --text-body:       1rem;       /* 16px */
  --text-body-lg:    1.125rem;   /* 18px */
  --leading-body:    1.6;

  /* Meta / Label */
  --text-meta:       0.75rem;
  --tracking-meta:   0.12em;
}
```

## Spacing System
```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  /* Section padding */
  --section-y: clamp(4rem, 10vw, 8rem);
  --section-x: clamp(1.5rem, 5vw, 6rem);
}
```

## Grid
```css
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: var(--section-x);
}

/* 12-column grid for complex layouts */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}
```

## Component Rules

### Buttons
- Primary: White bg, black text. On hover: `#FFD600` bg, black text.
- Ghost: White border, white text. On hover: White bg, black text.
- No rounded corners more than 2px. We are not playful.
- All buttons have 0.3s transition.

### Cards
- Background: `--color-bg-subtle` (`#111111`)
- Border: `--color-border` (8% white)
- On hover: border strengthens to `--color-border-strong`
- No drop shadows. Depth via color, not shadow.

### Tags / Badges
- All caps. Letter spacing 0.1em.
- Outlined style. Accent color text optional for featured.
- Font size: `--text-meta`

### Links (inline)
- No underline by default
- On hover: underline draws left to right (CSS clip-path animation)
- Duration: 0.3s

### Dividers
- 1px `--color-border`
- No decorative dividers — whitespace creates separation

---

## Accent Color Usage — `#FFD600`
**Budget: max 10% of total visual surface across the entire website.**
Everything else is black, white, or greys. No exceptions.

**Where yellow belongs (pick sparingly):**
- One CTA button per page (primary action only)
- A single highlighted word or stat in a hero headline
- Active nav indicator or underline
- A border-left on a blockquote or key callout
- Hover state on a primary interactive element

**Where yellow never goes:**
- Backgrounds of full sections or large areas
- Body text or paragraph copy
- Cards, borders, dividers at scale
- Decorative elements or patterns
- More than one instance per page on mobile

**The test:** Screenshot the page in greyscale. Convert back. If yellow appears more than ~3 times on a single page, it's too much.
- No box shadows
- No color gradients
- No border-radius > 4px on containers
- No animation on text color (only opacity/position)
- No centered body copy beyond hero
- No more than 3 typefaces in the entire project