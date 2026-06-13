# Motion System — Website Vikreta

## Philosophy
Motion is editorial. It paces reading like a magazine layout.
Nothing moves without purpose. Purpose = guiding attention or revealing meaning.

**The rule:** If removing the animation makes the page feel broken — it belongs.
If removing it and nothing is lost — cut it.

---

## Core Animation Values
```js
// Base easing
const ease = {
  out:    "power2.out",
  inOut:  "power2.inOut",
  smooth: "expo.out",       // for large reveals
  snappy: "back.out(1.2)",  // for micro-interactions only
}

// Durations
const duration = {
  micro:   0.2,   // hover, focus states
  fast:    0.4,   // small elements
  base:    0.7,   // standard reveals
  slow:    1.0,   // hero, large text
  crawl:   1.4,   // cinematic moments (use sparingly)
}

// Stagger
const stagger = {
  tight:  0.05,
  base:   0.1,
  loose:  0.15,
}
```

---

## Text Reveal (Standard)
All body text, headings, labels — unless specified otherwise.

```js
// GSAP ScrollTrigger reveal
gsap.fromTo(element, 
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    }
  }
)
```

## Headline Reveal (Split Text — Word by Word)
For H1 and display text only. Not for body copy.

```js
// Uses GSAP SplitText
const split = new SplitText(headline, { type: "words" })
gsap.fromTo(split.words,
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.07,
    scrollTrigger: {
      trigger: headline,
      start: "top 80%",
      once: true,
    }
  }
)
```

## Line Reveal (Masked — Premium feel)
For section titles that need impact. Text slides up from behind a clip.

```css
.line-mask {
  overflow: hidden;
  display: block;
}
```
```js
gsap.fromTo(line,
  { y: "100%" },
  { y: "0%", duration: 1.0, ease: "expo.out" }
)
```

---

## Scroll Behaviors

### Parallax (Subtle only)
```js
gsap.to(element, {
  yPercent: -15,   // Max. Never more than -20.
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
})
```

### Horizontal Scroll Section (if used)
- Max one per page
- Must have a clear visual indicator it's scrollable
- Pinned section, GSAP ScrollTrigger horizontal

### Counter / Number Animation
```js
gsap.to(counter, {
  innerText: targetNumber,
  duration: 1.5,
  ease: "power2.out",
  snap: { innerText: 1 },
  scrollTrigger: { trigger: counter, start: "top 80%", once: true }
})
```

---

## Page Transitions (Framer Motion)
```tsx
// Wrap layout with AnimatePresence
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.3 } }
}
```

---

## Hover States

### Card hover
```css
.card {
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.card:hover {
  border-color: rgba(255,255,255,0.24);
  transform: translateY(-2px);   /* Max. Never more. */
}
```

### Link underline draw
```css
.link::after {
  content: '';
  display: block;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}
.link:hover::after { width: 100%; }
```

### Button accent
```css
.btn-primary {
  transition: background-color 0.25s ease, color 0.25s ease;
}
.btn-primary:hover {
  background-color: #FFD600;
  color: #000;
}
```

---

## Rules

- **No animation on initial paint** above the fold — content must be instantly readable
- **Respect `prefers-reduced-motion`** — wrap all GSAP in a motion check
- **No looping animations** unless they are ambient background elements (and even then: subtle)
- **60fps is mandatory** — test on a mid-range Android device, not just desktop
- **ScrollTrigger `once: true`** on all reveals — elements don't re-animate on scroll up

```js
// Motion check wrapper
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReducedMotion) {
  // all GSAP animations here
}
```