# Command Recipe: build-feature

> End-to-end workflow for a new feature, page section, or component — from discovery through critique. Use when scope is larger than a single micro-task but needs tighter framing than a full marketing page design.

## Trigger

Run the **build-feature** command recipe, or invoke `/build-feature` if your tool supports slash commands.

## What This Does

Runs **Discovery → Spec → Build → Critique** with the Storyteller / Builder / Critic personas at each gate.
Do not skip to code. Do not ship without the Critic pass.

---

## Input Required

- Feature name and route or file scope (e.g. "Audit modal on service pages", `/services/ai-automations`)
- User goal or business outcome (lead gen, conversion, perf, SEO)
- Known constraints from `.ai/context/session.md` and `.ai/learning.md`

---

## Phase 1 — Discovery

**Load:** `.ai/context/session.md`, `.ai/context/business.md`, `.ai/context/target-users.md`, `.ai/learning.md` (scan for related entries)

**The Agent must answer:**
1. What problem does this feature solve for the visitor?
2. What emotion should they leave with? (Default target: **Relieved**)
3. What already exists in the codebase that can be reused? (components, patterns, data)
4. What is explicitly out of scope or locked?
5. What proof elements are available? (Never invent metrics, clients, or testimonials.)

**Output — Discovery Brief:**
```
Feature: _______________
Problem named: _______________
Reuse candidates: _______________
Locked / out of scope: _______________
Proof available: _______________
Single primary CTA: _______________
```

If proof is missing and the feature requires it → stop and flag the user before proceeding.

---

## Phase 2 — Spec

**Load:** `.ai/agents/storyteller.md` (concept + copy direction)
**Load one standard** matched to the feature type:
- Visual / layout → `.ai/standards/design-system.md`
- Motion → `.ai/standards/motion-system.md`
- SEO / content → `.ai/standards/seo-geo.md`
- Code structure → `.ai/standards/code-standards.md`

**The Agent must produce:**
1. Section or component structure (ordered list)
2. Story arc per section: TENSION → SHIFT → RESOLUTION → INVITATION (where applicable)
3. Headline / CTA drafts (humanized — run `.ai/commands/macro/humanize.md` on drafts now, not later)
4. Animation approach per interactive element (reuse `Reveal.tsx` primitives unless hero-class)
5. SEO plan if the feature is page-level (title, description, schema type)
6. Performance risks and mitigation (LCP, CLS, bundle, hydration)

**Output — Spec Handoff:**
```
Feature: _______________
Structure: _______________
Components to create / modify: _______________
Animation approach: _______________
Copy drafts (humanized): _______________
SEO elements: _______________
Performance risks: _______________
```

If any Automatic Fail from `.ai/agents/critic.md` is visible in the spec → revise before Build.

---

## Phase 3 — Build

**Load:** `.ai/agents/builder.md`, `.ai/standards/code-standards.md`

**Execution rules:**
- Match existing naming, imports, and patterns in surrounding code
- Use CSS custom property tokens — no hardcoded hex in components
- Scroll reveals from `components/ui/Reveal.tsx` unless bespoke hero motion
- GSAP: `gsap.context()` + `ctx.revert()` cleanup always
- `prefers-reduced-motion` on all non-essential animation
- `next/image` for every image; Epilogue only for type
- Run `tsc --noEmit` and `eslint` on touched files before handoff

**Output — Build Handoff:**
```
Feature: _______________
Files created / modified: _______________
Deferred items: _______________
Manual test steps: _______________
```

---

## Phase 4 — Critique

**Load:** `.ai/agents/critic.md`

Score the implemented feature against the full rubric.
Run Automatic Fails checklist.
If copy is visible, score against `.ai/commands/macro/humanize.md` and `.ai/context/ai-slop-stop-skill.md`.

**Routing:**
| Verdict | Action |
|---------|--------|
| REVISION ROUTE = Storyteller | Revisit concept, headline, proof, narrative |
| REVISION ROUTE = Builder | Fix layout, motion, perf, code |
| REVISION ROUTE = Ship | Proceed to close-out |

Repeat Build → Critique until Ship or user accepts known gaps.

---

## Close-out (mandatory)

1. Run `.ai/commands/macro/humanize.md` on every visitor-visible string
2. Update `.ai/context/session.md` — current task, locked decisions, open questions
3. Append any reusable convention to `.ai/learning.md` (one entry = one rule, exact values)

## Output Validation

- [ ] Discovery Brief completed
- [ ] Spec Handoff completed
- [ ] Build Handoff completed
- [ ] Critic Final Verdict = Ship
- [ ] Humanize pass clean
- [ ] `session.md` updated
- [ ] New conventions logged to `learning.md` (if any)
- [ ] `tsc --noEmit` and `eslint` clean on touched files
