# Command: /audit-component
> Quick design + performance audit on a single component.

## Load
- `.claude/agents/critic.md` (scoring rubric only)
- `.claude/standards/design-system.md` (token compliance)

## Input Required
- Component file path or pasted code

## Audit Checks
- [ ] Uses CSS custom property tokens (no hardcoded hex)
- [ ] Accent color `#FFD600` used max once
- [ ] No border-radius > 4px on containers
- [ ] No box shadows
- [ ] Typography uses scale variables
- [ ] Hover state follows standards
- [ ] Keyboard accessible (interactive elements)
- [ ] `next/image` if images present
- [ ] Fonts reference `--font-geist-sans` or `--font-geist-mono` CSS variables
- [ ] GSAP has cleanup if animations present
- [ ] `prefers-reduced-motion` respected

## Output
- Pass / Fail per check
- Specific lines to fix
- Fixed version of component