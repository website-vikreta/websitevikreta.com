# Command Recipe: build-feature

> A feature, section or component bigger than a micro task. Discovery → Spec → Build → Critique, all in `wv`.

**Input:** feature + route/file scope, business goal.

## 1. Discovery

Read `session.md`, `business.md`, `target-users.md`, `learning.md`. Answer:

```
Feature:
Problem named:
Reuse (ui.tsx primitives, Home.tsx patterns, wv.css classes):
Locked / out of scope:
Proof available (real only):
Primary CTA:
```

Missing proof that the feature needs → stop and ask.

## 2. Spec

Load `agents/storyteller.md` + ONE standard. Output:

```
Structure (ordered blocks → wv components):
Invented components (grammar §, if any):
Motion per block:
Copy drafts (humanized):
SEO (page-level only):
Perf risks:
```

Any critic automatic fail visible → revise now.

## 3. Build

Load `agents/builder.md` + `standards/code-standards.md`. Follow them. `tsc --noEmit` + `eslint` on touched files.

## 4. Critique

Load `agents/critic.md`. Loop Build ↔ Critique until Ship or the user accepts the gap.

## Close

Humanize pass on visible strings · `session.md` updated · new conventions/components logged in `learning.md`.
