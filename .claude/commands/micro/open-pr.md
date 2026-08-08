# Command: /open-pr
> Turn the current working-tree changes into a new branch, logically-split commits, and a detailed PR against the active `releases/**` branch.

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

### 3. Create the branch
- Read the diff (`git diff`, `git status`) to understand what changed.
- Pick a type prefix from the change's dominant nature: `feat` / `fix` / `refactor` / `perf` / `chore` / `docs` / `style` — same convention as this repo's recent branches (`feat/mobile-performance`, `fix/ga-hostname-gate`).
- `git checkout -b <type>/<kebab-slug>` off the current HEAD (this carries the uncommitted changes over automatically — no stash needed).

### 4. Split into logical commits
- Group the changed files/hunks by concern, not by file count. One commit per logical change, not one giant commit and not one commit per file if several files belong to the same change.
- For each group: `git add <specific files>` then commit with a conventional message matching this repo's style, e.g. `fix(perf): ...`, `refactor(hero): ...` — subject line + short body if the "why" isn't obvious from the diff alone.
- Use as many commits as the diff genuinely supports — don't force a split that doesn't reflect real separate concerns.

### 5. STOP — show a preview and ask for confirmation
Before pushing or creating the PR, show the user:
- New branch name
- `git log <target-base>..HEAD --oneline` (the commits just made)
- The full PR title + description draft (see §6)

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

### 7. Push and open the PR
- `git push -u origin <branch>`
- `gh pr create --base <target-release-branch> --head <branch> --title "..." --body "$(cat <<'EOF' ... EOF)"`
- Never force-push, never skip hooks, never target `main` — only the active `releases/**` branch from step 1.

## Output
- PR URL
- Short list of commits made
