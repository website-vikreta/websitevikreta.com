# Protected branches: pull requests only

Nothing goes into `main`, `stage` or `releases/**` without a pull request.

- No direct `git push` to these branches. No local merge followed by a push, no fast-forward push, no force push.
- This also covers downmerges and hotfixes.
- Before any `git push`, check the destination. If it is `main`, `stage` or `releases/*`, stop and open a PR instead.

## How changes reach them

- Work on a feature or fix branch, push that branch, then open a PR with `gh pr create`.
- A normal PR targets the active `releases/YYYY-MM` branch. Target `main` only when the user explicitly says so.
- **Downmerge** after a PR is merged into `main`: open one PR `main` into `stage`, then a second PR `main` into `releases/YYYY-MM`. Do the `stage` one first. Share the PR links with the user.
- Do not merge these PRs yourself (`gh pr merge`) unless the user asks for it in that same turn. The user or the team merges.
- If a conflict or an out-of-date branch blocks a PR, fix it on the PR's own branch, never on the protected branch.

## Note

GitHub does not enforce this: these branches have no protection rules or rulesets, so a direct push is technically allowed. This rule is the guard. An admin can enable "Require a pull request before merging" in Settings, Branches to enforce it for everyone.
