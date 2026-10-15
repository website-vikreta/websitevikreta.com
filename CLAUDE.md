# Claude Code

Read **`AGENTS.md`** — the single source of truth for all AI instructions on this project.

- Instruction files: **`.ai/`**
- Command recipes: **`.ai/commands/`** (macro + micro)
- Slash commands (`/push`, `/humanize`, …): **`.claude/commands/`**, thin wrappers that point at the `.ai/commands/` recipes. Edit the recipe in `.ai/`, never the wrapper.
- Local tool permissions only: **`.claude/settings.local.json`**
