# Command Recipe: add-animation

> Add or improve a specific animation on an existing component.

## Trigger

Run the **add-animation** command recipe, or invoke `/add-animation` if your tool supports slash commands.

## Load

- `.ai/standards/motion-system.md`
- `.ai/learning.md` — logged motion conventions + anti-patterns
- `.ai/context/session.md` for locked decisions

## Input Required

- Component name / file path
- What element is being animated
- Trigger: scroll / hover / click / page load / user action

## Execution Checklist

1. **Scroll reveal?** Reuse `components/ui/Reveal.tsx` (`RevealText` for headings/titles, `RevealFade` for cards/supporting, `Counter` for numbers). Do NOT hand-roll per-component GSAP/motion. Match the existing pattern — section heading = mask, card = fade, stagger via `delay`.
2. If the primitives genuinely don't fit (bespoke / hero-class, load-triggered): use raw GSAP. Identify the type + exact duration/easing/distance from motion-system.md, wrap in `gsap.context()` with `ctx.revert()` cleanup, add `prefers-reduced-motion` check.
3. Masked slide-up: observe the static clip wrapper, never the translated element (see motion-system gotcha).
4. Triggers: `once: true` + `REVEAL_MARGIN` (~200px inside viewport) for the unified beat.
5. Confirm: 60fps? Would it on a mid-range Android?

## Output Validation

- [ ] Modified component only (minimal scope)
- [ ] New GSAP plugins noted if required
- [ ] Reusable convention logged to `.ai/learning.md` if this sets a pattern
- [ ] `session.md` updated if this locks a sitewide motion pattern
