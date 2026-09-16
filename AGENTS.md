# Website Vikreta — Universal AI Instruction Router

> **Entry point for every AI tool** (Cursor, Claude Code, Codex, Windsurf, ChatGPT, etc.).
> Canonical instructions live in `.ai/`. Load selectively — never bulk-read the entire folder.

## What This Project Is

Website Vikreta is a 5-year-old agency that pivoted from traditional PHP/CSS web development into an **AI-first digital marketing agency**. We automate business processes — repetitive work, manual overhead, digital marketing pipelines — using AI and automation tools. No technology limitation.

This website is the pivot announcement to the world. It must feel like a leap forward.

## Non-Negotiables

- Awwwards Site of the Day quality. No exceptions.
- Black & white palette. Single accent: `#FFD600`
- Typography-heavy. Words are design elements.
- Revealing animations. Text earns its place on screen.
- SEO + GEO first. Every page is a ranking opportunity.
- Mobile-first. Always.
- Lead generation is the business goal. Design serves conversion.
- Uniformity & consistency. Reuse logged conventions. Never reinvent spacing/type/color/patterns per page.

## Before Any Implementation — Run This Pipeline

```
1. STORYTELLER  →  .ai/agents/storyteller.md
2. BUILDER      →  .ai/agents/builder.md
3. CRITIC       →  .ai/agents/critic.md
```

Never skip to code. Story → Experience → Motion → Architecture → Code.

## Context Window Rule (Mandatory)

**Load `session.md` + exactly ONE relevant standard + ONE agent persona per task.**

Do not bulk-load the entire `.ai/` folder. Preserve context for implementation work.

**Always load with every task:**

- `.ai/context/session.md` — current decisions, what's locked
- `.ai/context/brand.md` — palette, type, voice

**Load additionally when the task requires it:**

- The ONE relevant file from `standards/` for the task type
- Writing or editing user-facing copy? Also load `.ai/context/ai-slop-stop-skill.md` and pass every draft through it before it ships

## Reference Index

| Need | File |
|------|------|
| Who we are | `.ai/context/business.md` |
| Who we serve | `.ai/context/target-users.md` |
| Brand rules | `.ai/context/brand.md` |
| Vision | `.ai/context/vision.md` |
| Current session | `.ai/context/session.md` |
| Concept + emotion | `.ai/agents/storyteller.md` |
| Anti-slop writing | `.ai/context/ai-slop-stop-skill.md` |
| Build + perf | `.ai/agents/builder.md` |
| Score + critique | `.ai/agents/critic.md` |
| Visual design | `.ai/standards/design-system.md` |
| Animation | `.ai/standards/motion-system.md` |
| SEO/GEO | `.ai/standards/seo-geo.md` |
| Code rules | `.ai/standards/code-standards.md` |
| Copy that sounds human | `.ai/commands/macro/humanize.md` |
| Design/code conventions log | `.ai/learning.md` |

## Task Recipes (Commands)

Recipes in `.ai/commands/` are **tool-agnostic execution workflows**. Invoke by name or by slash command if your tool supports it (`/humanize`, `/design-page`, etc.).

### Macro (full workflows)

| Recipe | File | When to use |
|--------|------|-------------|
| `build-feature` | `.ai/commands/macro/build-feature.md` | New feature or page from discovery through critique |
| `design-page` | `.ai/commands/macro/design-page.md` | New page: Storyteller → Builder → Critic → implement |
| `humanize` | `.ai/commands/macro/humanize.md` | Strip AI-writing tells from any copy |
| `write-blog-post` | `.ai/commands/macro/write-blog-post.md` | SEO + GEO blog post pipeline |

### Micro (focused tasks)

| Recipe | File | When to use |
|--------|------|-------------|
| `add-animation` | `.ai/commands/micro/add-animation.md` | Add or fix animation on one component |
| `audit-component` | `.ai/commands/micro/audit-component.md` | Design + perf audit on one component |
| `fix-performance` | `.ai/commands/micro/fix-performance.md` | Diagnose LCP / CLS / INP / bundle issues |
| `push` | `.ai/commands/micro/push.md` | Commit, push, and open/update PR |

## Learning Log — Consistency Memory

`.ai/learning.md` is the persistent record of every reusable design + code convention.

- **Read it** before building any page/component. Reuse what exists.
- **Update it** whenever a reusable decision is made (spacing, type scale, color use, component pattern, motion timing, naming, anti-pattern). One entry = one rule, exact values.
- **Honor it** — if new work conflicts with a logged rule, follow the rule or update it with reason. No silent divergence.

## Next.js Note

This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
