# Command: /design-page
> Full pipeline for designing a new page from scratch.

## What This Does
Runs the complete Storyteller → Builder → Critic pipeline for a new page.
Do not skip steps. Do not jump to code.

---

## Step 1 — Load Context
Read:
- `.claude/context/session.md` (locked decisions)
- `.claude/context/brand.md` (palette, type, voice)
- `.claude/context/target-users.md` (who we're designing for)

---

## Step 2 — Storyteller Pass
Load: `.claude/agents/storyteller.md`

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

---

## Step 3 — Builder Pass
Load: `.claude/agents/builder.md`
Load: `.claude/standards/design-system.md`
Load: `.claude/standards/motion-system.md`

Using the Storyteller handoff:
1. Define the section structure (what sections exist, in order)
2. Define animation approach per section
3. Define the component list
4. Check routing against architecture
5. Add SEO metadata plan

Fill and output the Builder Handoff Block before proceeding.

---

## Step 4 — Critic Pass
Load: `.claude/agents/critic.md`

Score the design plan against all rubrics.
Check all Automatic Fails.
Output the Critic Final Verdict.

If REVISION ROUTE = Storyteller or Builder: go back. Do not proceed.
If REVISION ROUTE = Ship: proceed to implementation.

---

## Step 5 — Implement
Now write the code.
Follow `.claude/standards/code-standards.md` throughout.

Update `.claude/context/session.md` when done.