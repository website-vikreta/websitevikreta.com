# AI Instructions — Website Vikreta

> **Canonical location for all AI agent instructions.** Tool-agnostic. Any AI tool should load from here.

## Entry Points by Tool

| Tool | Start here |
|------|------------|
| Any tool | `AGENTS.md` (repo root) |
| Claude Code | `CLAUDE.md` → `AGENTS.md` |
| Cursor | `.cursor/rules/ai-router.mdc` → `AGENTS.md` |

## Folder Structure

```
.ai/
├── agents/          Role personas (Storyteller, Builder, Critic)
├── context/         Stable facts + session scratchpad
├── standards/       Design, motion, SEO, code rules
├── commands/
│   ├── macro/       Full workflows (build-feature, design-page, humanize, write-blog-post)
│   └── micro/       Focused tasks (add-animation, audit-component, fix-performance, push)
└── learning.md      Append-only project memory
```

## Loading Rule

Load `context/session.md` + exactly **one** agent + **one** standard per task. Do not bulk-load the folder.
