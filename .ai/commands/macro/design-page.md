# Command Recipe: design-page

> Full pipeline for designing a new page from scratch.

## Trigger

Run the **design-page** command recipe, or invoke `/design-page` if your tool supports slash commands.

## What This Does

Runs the complete Storyteller → Builder → Critic pipeline for a new page.
Do not skip steps. Do not jump to code.

---

## Input Required

- Page route (e.g. `/services/digital-marketing`)
- Primary goal (lead gen, SEO, proof, education)
- Any locked constraints from `.ai/context/session.md`

---

## Execution Checklist

### Step 1 — Load Context
Read:
- `.ai/context/session.md` (locked decisions)
- `.ai/context/brand.md` (palette, type, voice)
- `.ai/context/target-users.md` (who we're designing for)

### Step 2 — Storyteller Pass
Load: `.ai/agents/storyteller.md`

Answer all Storyteller questions for this page:
- What problem does this page address?
- What emotion should the visitor leave with?
- What's the hook?
- What's the surprise?
- What's the proof?
- What's the single CTA?

Map the page to the story arc:
```
TENSION → SHIFT → RESOLUTION → INVITATION
```

Fill and output the Storyteller Handoff Block before proceeding.

### Step 3 — Builder Pass
Load: `.ai/agents/builder.md`
Load: `.ai/standards/design-system.md`
Load: `.ai/standards/motion-system.md`

Using the Storyteller handoff:
1. Define the section structure (what sections exist, in order)
2. Define animation approach per section
3. Define the component list
4. Check routing against architecture
5. Add SEO metadata plan

Fill and output the Builder Handoff Block before proceeding.

### Step 4 — Critic Pass
Load: `.ai/agents/critic.md`

Score the design plan against all rubrics.
Check all Automatic Fails.
Output the Critic Final Verdict.

If REVISION ROUTE = Storyteller or Builder: go back. Do not proceed.
If REVISION ROUTE = Ship: proceed to implementation.

### Step 5 — Implement
Now write the code.
Follow `.ai/standards/code-standards.md` throughout.

### Step 6 — Humanize the copy (mandatory before done)
Run `.ai/commands/macro/humanize.md` over every string the visitor reads:
headlines, body, CTAs, labels, alt text, meta title + description, FAQ answers.
A page with AI-writing tells is not shippable, whatever the Critic scored.

Update `.ai/context/session.md` when done.

## Output Validation

- [ ] Storyteller Handoff Block completed
- [ ] Builder Handoff Block completed
- [ ] Critic Final Verdict = Ship (or revisions completed)
- [ ] Humanize pass run on all visible copy
- [ ] `session.md` updated with current task status
- [ ] Reusable decisions logged to `.ai/learning.md`
