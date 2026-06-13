# Command: /add-animation
> Add or improve a specific animation on an existing component.

## Load
- `.claude/standards/motion-system.md` only
- `.claude/context/session.md` for locked decisions

## Input Required
- Component name / file path
- What element is being animated
- Trigger: scroll / hover / click / page load / user action

## Process
1. Identify the animation type from motion-system.md
2. Use exact duration, easing, and distance values from standards
3. Wrap in `gsap.context()` with cleanup
4. Add `prefers-reduced-motion` check
5. Confirm: does this run at 60fps? Would it on a mid-range Android?

## Output
- Modified component only
- Note any new GSAP plugins required
- Update session.md if this sets a pattern