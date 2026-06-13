# Command: /write-blog-post
> SEO + GEO optimized blog post pipeline.

## Inputs Required
- Topic / working title
- Target keyword (primary)
- Secondary keywords (2-3)
- Content goal: (rank / GEO citation / lead gen / thought leadership)

---

## Step 1 — Keyword Intelligence
Before writing, define:
- Primary keyword + monthly search intent (informational / commercial / navigational)
- Target SERP position: featured snippet, people also ask, or standard ranking?
- GEO target: Is this a definition/question that AI tools would answer?

---

## Step 2 — Structure First
Load: `.claude/standards/seo-geo.md`

Define the outline:
```
H1: [Primary keyword in question or statement form]
Meta description: [150-160 chars]
Intro: Direct answer paragraph (2-3 sentences, no preamble)
H2: [Section 1 — core concept]
H2: [Section 2 — deeper detail]
H2: [Section 3 — practical application or examples]
H2: How Website Vikreta Helps With [Topic] (soft CTA section)
H2: FAQ (5 questions minimum, schema-ready)
CTA: [Link to relevant service or contact]
```

---

## Step 3 — Write
Voice rules from `.claude/context/brand.md`:
- Name the pain. Don't soften it.
- No jargon before outcome.
- Specific beats vague. "3 hours per week" beats "time-consuming".
- Every H2 should be answerable standalone.

GEO rules:
- First paragraph answers the question directly — no "In this article we will explore…"
- Use numbered lists and tables where data exists
- Include at least one external citation for credibility
- FAQ section formatted for schema

---

## Step 4 — SEO Checklist
Before finishing:
- [ ] Primary keyword in H1, first paragraph, one H2, meta description
- [ ] Secondary keywords distributed naturally (not stuffed)
- [ ] Internal links: 2 to related posts, 1 to a service page
- [ ] Images: descriptive filenames + alt text
- [ ] Article schema ready (author, date, publisher)
- [ ] FAQ schema ready
- [ ] Estimated read time in frontmatter
- [ ] Category tag assigned

---

## Frontmatter Format
```md
---
title: ''
description: ''
publishedAt: 'YYYY-MM-DD'
updatedAt: 'YYYY-MM-DD'
category: ''
tags: []
author: ''
readTime: 'X min read'
featured: false
---
```