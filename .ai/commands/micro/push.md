# Command Recipe: push

> Turn the current working-tree changes into logically-split commits and push. Opens a new PR against the active `releases/**` branch if none exists yet for this branch; otherwise updates the existing one (commits, push, and a refreshed PR description).

## Trigger

Run the **push** command recipe, or invoke `/push` if your tool supports slash commands.

## Load

- Nothing from the design pipeline — this is a git/GitHub workflow recipe, not a design task.

## Input Required

- Nothing required. Optional: a short hint about what the change is for for a better branch slug / PR title.
- Optional flag: `--confirm` (or the user says "ask first" / "confirm before opening") → enables the confirmation gate in §6. Default (flag absent): run straight through, no gate.

## Execution Checklist

### 1. Determine the target release branch
```
current_branch=$(git branch --show-current)
```
- If `current_branch` already matches `releases/YYYY-MM` → that IS the target base branch.
- Else → target = `releases/$(date +%Y-%m)`. Verify it exists: `git ls-remote --heads origin releases/$(date +%Y-%m)`.
  - If it doesn't exist, list available ones (`git branch -r | grep releases/`) and ask the user which one to target. Do not guess.
- `stage` and `main` are never a target. CI only guards `releases/**` (see `.github/workflows/test.yml`); code reaches `stage` and `main` from a release without being re-run.

### 2. Sanity checks
- `git status --porcelain` — if empty, stop and say there's nothing to open a PR for.
- `git status` — confirm no unrelated stray files (build artifacts, `.env`, scratch scripts, logs, reports) are about to get swept into `git add`. Flag anything suspicious before staging.

### 3. Local gate — mirrors CI, mandatory, no flag to skip
A PR into `releases/**` runs four CI checks: `lint`, `unit`, `build`, `e2e` (the `@critical` subset). Run the first three locally so the PR doesn't open red:

```
npm run lint        # errors fail the CI `lint` check; warnings are fine
npm run typecheck   # the other half of the CI `lint` check
npm test            # vitest, the CI `unit` check
npm run build       # the CI `build` check
```

- **Any of them fails** → STOP immediately. Do not commit, do not push, do not open/update a PR. Report the errors to the user and fix them (or ask, if the fix isn't obvious) before retrying **push**.
- **Typecheck errors whose paths are all under `.next/types/`** are stale output from another branch's build, not a real failure: delete `.next/types` and re-run before treating it as one.
- `e2e` is not part of this gate (it takes minutes). Run it only if the change touches behaviour a test covers (`/test-page <name>`), and say so in §7.
- **Keep a record of exactly what ran and its result** (command, pass/fail, counts). The Testing checklist in §7 is ticked from this record and nothing else.

### 4. Decide mode: new branch+PR, or update an existing one
**Never branch off a branch that isn't the release branch.** Determine mode from where you currently are:

- **`current_branch` IS the target release branch** (fresh work, straight off `releases/**`) → **New PR mode**.
  - Pick a type prefix from the change's dominant nature: `feat` / `fix` / `refactor` / `perf` / `chore` / `docs` / `style` / `ci` — same convention as this repo's recent branches (`feat/mobile-performance`, `fix/ga-hostname-gate`).
  - `git checkout -b <type>/<kebab-slug>` off current HEAD (carries uncommitted changes over — no stash needed).
- **`current_branch` is anything else** (already on a feature branch) → **stay on it, do not create another branch.** Then check `gh pr list --head <current_branch> --state open --json number,url`:
  - **Open PR exists** → **Update mode**: commit + push to the existing branch, skip branch creation and `gh pr create`, then **refresh the PR description** (§7). Report its URL, don't open a new one.
  - **No open PR yet** → **New PR mode, existing branch**: commit + push on this same branch, then run `gh pr create` for the first time (§7-8).

### 5. Split into logical commits
- Group the changed files/hunks by concern, not by file count. One commit per logical change, not one giant commit and not one commit per file if several files belong to the same change.
- For each group: `git add <specific files>` then commit with a conventional message matching this repo's style, e.g. `fix(perf): ...`, `refactor(hero): ...`, `ci: ...` — subject line + short body if the "why" isn't obvious from the diff alone.
- Use as many commits as the diff genuinely supports — don't force a split that doesn't reflect real separate concerns.
- Add the attribution trailer your tool requires to every commit message (e.g. `Co-Authored-By: ...`).

### 6. Confirmation gate — opt-in only
Default (no `--confirm` flag): run straight through, no stop.
- **Update mode**: commit, push immediately (§8), refresh the description (§7), report the commit list + PR URL. No stop, `--confirm` has nothing to gate here.
- **New PR mode**: commit, push, then `gh pr create` (§7-8) — no stop. After creation, report:
  - Mode (new branch+PR / new PR on existing branch), and branch name
  - `git log <target-base>..HEAD --oneline` (the commits just made)
  - The PR title + URL

If `--confirm` was passed (New PR mode only): commit + push (§8), then STOP right before `gh pr create` and show the same info (mode, branch, commit log, full PR title + description draft from §7). Wait for explicit go-ahead before opening the PR.

### 7. PR title & description
Title: conventional-commit-style, concise, under 70 chars.

Write the body to a temp file and pass it with `--body-file` (no shell-quoting accidents). Template:

```markdown
## Summary
- 1-3 bullets: what changed and the outcome

## Changes
- **`type(scope):`** what changed, naming the files/areas — one bullet per commit, in commit order

## Why
- Motivation / context that isn't obvious from the diff

## Testing
### Checklist
- [x] `npm run lint`: 0 errors
- [x] `npm run typecheck`: clean
- [x] `npm test`: 51/51
- [x] `npm run build` clean
- [ ] <one change-specific step a human should confirm, e.g. "hover the cards at lg+: ...">
- [ ] CI green on this PR (`lint`, `unit`, `build`, `e2e`)

## Risk & Rollback
- Blast radius of this change, and how to revert if something breaks

<attribution line your tool requires, e.g. "🤖 Generated with [Claude Code](https://claude.com/claude-code)">
```

**Checkbox rules — these matter more than the template:**
- **Tick `[x]` only what you actually ran in this session**, and put the result in the line (`0 errors`, `51/51`, `clean`). Source: the gate record from §3 plus anything else you ran (e.g. `/test-page`).
- **Leave `[ ]` for anything not run or that needs a person**: a real iOS/Android device, a visual or hover check, copy accuracy, a staging/preview check, and "CI green on this PR" (CI hasn't run yet when you write the body). Never pre-tick a box to make the PR look finished.
- **Make the manual items specific to the diff**, not a generic list. Drop a generic item that doesn't apply (no UI touched → no mobile/browser line) instead of leaving it unticked.
- **Say plainly what failed, was skipped, or couldn't be verified** (a failing test, a flaky retry, something you chose not to run). No hedging, no hiding.
- Mobile-first applies if UI was touched (per AGENTS.md): list the widths actually checked, e.g. "no horizontal overflow at 320 / 390 / 768 / 1024", only if you checked them.
- `Changes` lists what is in the PR *now*; don't describe work that was reverted or never shipped.

**Update mode — refresh, don't restart:** after pushing new commits, read the current body (`gh pr view <n> --json body --jq .body`), keep what is still true, add the new commits under `Changes`, update `Summary`/`Why` if the scope moved, re-evaluate every checkbox (tick what you have now verified, leave the rest unticked, remove lines that no longer apply), then `gh pr edit <n> --body-file <file>`. Keep any footer the previous author added.

### 8. Push, and open the PR only if this is its first push
- First push on a new branch: `git push -u origin <branch>`. Subsequent push on an already-tracked branch: `git push`.
- **Update mode**: push immediately after committing — no gate, no `gh pr create`. The push updates the open PR; then refresh its description (§7).
- **New PR mode only**: push right after committing, then call `gh pr create --base <target-release-branch> --head <branch> --title "..." --body-file <file>` — no gate. Re-check `gh pr list --head <branch> --state open` immediately before this call — if one now exists, skip creating and report that URL instead.
- Never force-push, never skip hooks, never target `main` or `stage` — only the active `releases/**` branch from step 1.
- **CI cancels superseded runs** (`cancel-in-progress`): a push while checks are running restarts them, and the earlier commit shows a red ✕ that is a cancellation, not a failure. Don't push again mid-run unless that is intended.

### 9. Report CI state
After the push, run `gh pr checks <n>` once and report it (pending / pass / fail per check). Don't poll or wait unless the user asks. If a check already failed, say which one and why (`gh run view <id> --log-failed`).

## Output Validation

- PR URL reported
- Short list of commits made
- Local gate (lint, typecheck, unit tests, build) passed before push
- PR body matches the template, and every ticked box corresponds to something actually run
- CI check states reported (not "should be green")
