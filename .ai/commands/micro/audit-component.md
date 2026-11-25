# Command Recipe: audit-component

> Design + a11y + perf audit of one component against `wv`.

**Load:** `standards/design-system.md`, `agents/critic.md` (automatic fails only).
**Input:** file path.

## Checks

- [ ] Only `wv.css` classes and `var(--token)` colors. No hex, Tailwind, legacy tokens/components
- [ ] Anton display / Inter Tight text, sizes from the type table
- [ ] Radius, border, shadow per the shape rules
- [ ] Yellow: fill only on light, gold for yellow text, one yellow ground per viewport
- [ ] Hover from the allowed set, `Arrow` rotates, `(hover: hover)` safe
- [ ] Motion from `ui.tsx`, one effect per element, reduced motion respected
- [ ] `.wv-sr` copy on split text, keyboard + focus ring, roles on custom widgets
- [ ] `Photo` with `sizes`, `priority` only above fold
- [ ] Copy lives in data constants, passes `humanize.md`
- [ ] Works at 360px

## Output

Pass/fail per check · `file:line` for each fail · the fix applied (minimal diff).
