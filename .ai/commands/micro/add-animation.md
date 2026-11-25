# Command Recipe: add-animation

> Add or fix one animation on one component.

**Load:** `standards/motion-system.md`, `learning.md`.
**Input:** file, element, trigger (scroll / hover / load / click).

1. Pick the primitive from the motion table (`KineticTitle`, `Reveal`, `ScrollWords`, `ParallaxPhoto`, `CountUp`, `Magnetic`, `HoverLetters`, `VelocityMarquee`). Hover = CSS in `wv.css`.
2. Element already has an effect → replace, don't stack.
3. No primitive fits → new export in `ui.tsx` with `ease`, `useReducedMotion`, `.wv-sr`.
4. Check: reduced motion shows final state, transform/opacity only, 360px and touch OK.
5. Touch only that component. Log a new pattern in `learning.md`.
