# Protected branches: Claude Code notes

The rule itself is in `AGENTS.md`, section "Protected branches (all agents and tools)": every operation on `main`, `stage` and `releases/**` goes through a PR, and direct push and direct commit are off. It applies to Claude Code in full. Read it first; this file only adds what is specific to Claude Code.

## Claude Code specifics

- **Use `/push`** (recipe `.ai/commands/micro/push.md`). It creates a new branch off `releases/YYYY-MM` and opens a PR, so it never commits on a protected branch.
- **Never commit on them.** Run `git branch --show-current` before every commit. If it is `main`, `stage` or `releases/*`, create a branch first (`git checkout -b <type>/<slug>` carries uncommitted changes with it), then commit there.
- **A refspec push is still a direct push.** `git push origin <sha>:refs/heads/stage` or `HEAD:releases/YYYY-MM` counts, even when it is a fast-forward.
- **Do not run `gh pr merge`** or the merge API for these PRs unless the user asks in that same turn.
- **Downmerge:** `gh pr create --base stage --head main`, then `gh pr create --base releases/YYYY-MM --head main`. Give the user the PR links; they merge.
- **Permission prompts and auto mode:** never approve or add an allow rule for a push or merge that would update one of these branches. If an action would update one, stop and tell the user.

## Possible hardening (not enabled)

Claude Code can block the common cases for everyone on the team with `permissions.deny` rules in a shared `.claude/settings.json` (for example `Bash(gh pr merge:*)` and pushes to `main`, `stage`, `releases/*`). Pattern rules cannot catch every spelling of a push, so GitHub branch protection is still the real enforcement. Propose this to the user before adding it; it changes how every Claude session on this repo behaves.
