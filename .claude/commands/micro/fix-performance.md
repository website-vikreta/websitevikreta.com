# Command: /fix-performance
> Diagnose and fix a performance issue on a page or component.

## Load
- `.claude/agents/builder.md` (performance section only)
- `.claude/context/session.md`

## Input Required
- Page route or component
- Lighthouse score (if known)
- Metric failing: LCP / CLS / INP / TTFB / bundle size

## Diagnosis Path

### If LCP > 2.5s
- Is the hero image using `priority` prop on `next/image`?
- Is the hero font preloaded?
- Is there a large render-blocking script above fold?
- Is LCP element above the fold at all?

### If CLS > 0.1
- Do all images have explicit `width` and `height`?
- Do fonts use `display: swap` and `next/font`?
- Is any dynamic content injected above existing content?
- Is there any late-loading banner or cookie notice pushing layout?

### If INP > 200ms
- Is there a heavy event handler on scroll or resize without debounce?
- Is any GSAP animation triggering layout recalculation?
- Is any synchronous work happening on user interaction?

### If bundle > 150kb
- Run `next build` and check bundle analyzer
- Is GSAP fully imported instead of specific modules?
- Are Three.js / R3F loaded on every page instead of dynamically?
- Are there unused imports?

## Output
- Root cause identified
- Code fix applied
- Expected Lighthouse delta