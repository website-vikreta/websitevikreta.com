# Website Vikreta — Master Instruction Router

## What This Project Is
Website Vikreta is a 5-year-old agency that has pivoted from traditional PHP/CSS web development into an **AI-first digital marketing agency**. We automate business processes — repetitive work, manual overhead, digital marketing pipelines — using AI and automation tools. No technology limitation.

This website is the pivot announcement to the world. It must feel like a leap forward.

## Non-Negotiables
- Awwwards Site of the Day quality. No exceptions.
- Black & white palette. Single accent: `#FFD600`
- Typography-heavy. Words are design elements.
- Revealing animations. Text earns its place on screen.
- SEO + GEO first. Every page is a ranking opportunity.
- Mobile-first. Always.
- Lead generation is the business goal. Design serves conversion.

## Before Any Implementation — Run This Pipeline

```
1. STORYTELLER    → .claude/agents/storyteller.md
2. BUILDER        → .claude/agents/builder.md
3. CRITIC         → .claude/agents/critic.md
```

Never skip to code. Story → Experience → Motion → Architecture → Code.

## Always Load With Task
- `.claude/context/session.md` — current decisions, what's locked
- `.claude/context/brand.md` — palette, type, voice
- The ONE relevant standards file for the task

## Reference Index
| Need | File |
|------|------|
| Who we are | `.claude/context/business.md` |
| Who we serve | `.claude/context/target-users.md` |
| Brand rules | `.claude/context/brand.md` |
| Vision | `.claude/context/vision.md` |
| Current session | `.claude/context/session.md` |
| Concept + emotion | `.claude/agents/storyteller.md` |
| Build + perf | `.claude/agents/builder.md` |
| Score + critique | `.claude/agents/critic.md` |
| Visual design | `.claude/standards/design-system.md` |
| Animation | `.claude/standards/motion-system.md` |
| SEO/GEO | `.claude/standards/seo-geo.md` |
| Code rules | `.claude/standards/code-standards.md` |

## Token Rule
Load `session.md` + one agent + one standard per task. Do not bulk-load everything.