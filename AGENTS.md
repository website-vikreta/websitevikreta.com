# Website Vikreta — AI Instruction Router

> Entry point for every AI tool. Canonical instructions live in `.ai/`. Load selectively.

## Project

Website Vikreta: agency founded Aug 2020, AI-first since 2026. We build websites, CRMs, web apps and AI automations that take repetitive work off a business. This site is that announcement. It has to feel like a leap.

## Non-Negotiables

- **One design language: `wv`** (`app/wv.css`, `components/wv/*`). Never go beyond it. Spec: `.ai/standards/design-system.md`.
- Canvas `#f6f4ee`, ink `#121212`, yellow `#fac800` (fill only on light). Anton + Inter Tight. Nothing else.
- Type-led, motion-rich, Awwwards quality.
- Legacy UI (`components/sections`, `components/ui`, `components/home`, GSAP, Utile, `--color-*`) is never extended.
- Mobile-first. SEO + GEO on every page. Lead generation is the goal.
- Real proof only. Human copy only.

## Pipeline (any new page/section)

```
STORYTELLER (.ai/agents/storyteller.md) → BUILDER (.ai/agents/builder.md) → CRITIC (.ai/agents/critic.md)
```

## Load Rule

Always: `.ai/context/session.md` + `.ai/context/brand.md`.
Then ONE agent + ONE standard for the task. Writing copy? Also `.ai/context/ai-slop-stop-skill.md`.

## Index

| Need | File |
|---|---|
| Business / users / vision | `.ai/context/business.md` · `target-users.md` · `vision.md` |
| Brand summary | `.ai/context/brand.md` |
| Current state | `.ai/context/session.md` |
| Design language | `.ai/standards/design-system.md` |
| Motion | `.ai/standards/motion-system.md` |
| Code | `.ai/standards/code-standards.md` |
| SEO / GEO | `.ai/standards/seo-geo.md` |
| Images | `.ai/standards/image-asset-standards.md` |
| Anti-slop copy | `.ai/context/ai-slop-stop-skill.md` · `.ai/commands/macro/humanize.md` |
| Conventions log | `.ai/learning.md` |

## Recipes

`.ai/commands/` holds tool-agnostic workflows. Claude Code wrappers live in `.claude/commands/` (frontmatter + "follow `.ai/commands/…`"). New recipe → add its wrapper. Logic never goes in the wrapper.

| Recipe | File |
|---|---|
| `build-feature` | `.ai/commands/macro/build-feature.md` |
| `design-page` | `.ai/commands/macro/design-page.md` |
| `humanize` | `.ai/commands/macro/humanize.md` |
| `write-blog-post` | `.ai/commands/macro/write-blog-post.md` |
| `add-animation` | `.ai/commands/micro/add-animation.md` |
| `audit-component` | `.ai/commands/micro/audit-component.md` |
| `fix-performance` | `.ai/commands/micro/fix-performance.md` |
| `push` | `.ai/commands/micro/push.md` |
| `test` (`/test-e2e`, `/test-e2e-headed`, `/test-page <name>`) | `.ai/commands/micro/test.md` |

## Learning Log

`.ai/learning.md`: read before building, add one entry per new reusable rule or invented component, follow or explicitly update on conflict.

## Next.js

This Next.js has breaking changes vs your training data. Read `node_modules/next/dist/docs/` before writing code you are unsure of. Heed deprecations.
