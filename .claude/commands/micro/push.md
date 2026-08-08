# Command: /push
> Turn the current working-tree changes into logically-split commits and push. Opens a new PR against the active `releases/**` branch if none exists yet for this branch; otherwise just updates the existing one.

## Load
- Nothing from the design pipeline — this is a git/GitHub workflow command, not a design task.

## Input Required
- Nothing required. Optional: a short hint about what the change is for for a better branch slug / PR title.

## Process

### 1. Determine the target release branch
```
current_branch=$(git branch --show-current)
```
- If `current_branch` already matches `releases/YYYY-MM` → that IS the target base branch.
- Else → target = `releases/$(date +%Y-%m)`. Verify it exists: `git ls-remote --heads origin releases/$(date +%Y-%m)`.
  - If it doesn't exist, list available ones (`git branch -r | grep releases/`) and ask the user which one to target. Do not guess.

### 2. Sanity checks
- `git status --porcelain` — if empty, stop and say there's nothing to open a PR for.
- `git status` — confirm no unrelated stray files (build artifacts, `.env`, etc.) are about to get swept into `git add`. Flag anything suspicious before staging.

### 3. Decide mode: new branch+PR, or update an existing one
**Never branch off a branch that isn't the release branch.** Determine mode from where you currently are:

- **`current_branch` IS the target release branch** (fresh work, straight off `releases/**`) → **New PR mode**.
  - Pick a type prefix from the change's dominant nature: `feat` / `fix` / `refactor` / `perf` / `chore` / `docs` / `style` — same convention as this repo's recent branches (`feat/mobile-performance`, `fix/ga-hostname-gate`).
  - `git checkout -b <type>/<kebab-slug>` off current HEAD (carries uncommitted changes over — no stash needed).
- **`current_branch` is anything else** (you're already on a feature branch — either from an earlier `/push` run or created manually) → **stay on it, do not create another branch.** Then check `gh pr list --head <current_branch> --state open --json number,url`:
  - **Open PR exists** → **Update mode**: this run only commits + pushes to the existing branch. Skip branch creation and skip `gh pr create` entirely — the push updates the existing PR automatically. Report its URL, don't open a new one.
  - **No open PR yet** → **New PR mode, existing branch**: commit + push on this same branch, then run `gh pr create` for the first time (§6-7).

### 4. Split into logical commits
- Group the changed files/hunks by concern, not by file count. One commit per logical change, not one giant commit and not one commit per file if several files belong to the same change.
- For each group: `git add <specific files>` then commit with a conventional message matching this repo's style, e.g. `fix(perf): ...`, `refactor(hero): ...` — subject line + short body if the "why" isn't obvious from the diff alone.
- Use as many commits as the diff genuinely supports — don't force a split that doesn't reflect real separate concerns.

### 5. STOP — show a preview and ask for confirmation
Before pushing (and before creating a PR, if this run is opening one), show the user:
- Mode (new branch+PR / new PR on existing branch / update existing PR), and branch name
- `git log <target-base>..HEAD --oneline` (the commits just made)
- **Update mode**: nothing else needed — no PR draft to show, it's just a push.
- **New PR mode**: the full PR title + description draft (see §6)

Wait for explicit go-ahead. Do not push or run `gh pr create` before the user confirms.

### 6. PR title & description
Title: conventional-commit-style, concise, under 70 chars.

Body must include:
```markdown
## Summary
- 1-3 bullets on what changed and why

## Changes
- Bulleted list mapped to the commits made (file/area → what changed)

## Why
- Context / motivation, if not obvious from the diff

## Testing
### Checklist
- [ ] Step-by-step manual verification steps specific to what changed
- [ ] Cross-browser / mobile check if UI touched (per CLAUDE.md: mobile-first)
- [ ] `npm run build` / `npx tsc` clean if applicable
- [ ] No console errors / warnings introduced

## Risk & Rollback
- Blast radius of this change, and how to revert if something breaks
```

### 7. Push, and open the PR only if this is its first push
- First push on a new branch: `git push -u origin <branch>`. Subsequent push on an already-tracked branch: `git push`.
- **Update mode**: stop here. The push alone updates the existing open PR — do not call `gh pr create`.
- **New PR mode only**: `gh pr create --base <target-release-branch> --head <branch> --title "..." --body "$(cat <<'EOF' ... EOF)"`. Re-check `gh pr list --head <branch> --state open` immediately before this call — if one now exists, skip creating and report that URL instead.
- Never force-push, never skip hooks, never target `main` — only the active `releases/**` branch from step 1.

## Output
- PR URL
- Short list of commits made
