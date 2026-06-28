# Command: /add-animation
> Add or improve a specific animation on an existing component.

## Load
- `.claude/standards/motion-system.md`
- `.claude/learning.md` — logged motion conventions + anti-patterns
- `.claude/context/session.md` for locked decisions

## Input Required
- Component name / file path
- What element is being animated
- Trigger: scroll / hover / click / page load / user action

## Process
1. **Scroll reveal?** Reuse `components/ui/Reveal.tsx` (`RevealText` for headings/titles, `RevealFade` for cards/supporting, `Counter` for numbers). Do NOT hand-roll per-component GSAP/motion. Match the existing pattern — section heading = mask, card = fade, stagger via `delay`.
2. If the primitives genuinely don't fit (bespoke / hero-class, load-triggered): use raw GSAP. Identify the type + exact duration/easing/distance from motion-system.md, wrap in `gsap.context()` with `ctx.revert()` cleanup, add `prefers-reduced-motion` check.
3. Masked slide-up: observe the static clip wrapper, never the translated element (see motion-system gotcha).
4. Triggers: `once: true` + `REVEAL_MARGIN` (~200px inside viewport) for the unified beat.
5. Confirm: 60fps? Would it on a mid-range Android?

## Output
- Modified component only
- Note any new GSAP plugins required
- Log any new reusable convention to `.claude/learning.md`; update session.md if this sets a pattern