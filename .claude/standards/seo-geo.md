# SEO + GEO Standards — Website Vikreta

## The Thesis
Our website is proof of our product. If we can rank and look premium — we've sold ourselves.

SEO = rank on Google search
GEO = rank in AI answers (ChatGPT, Perplexity, Gemini, Claude)
Both are non-negotiable.

---

## Technical SEO Checklist (Every Page)

### Meta
```tsx
export const metadata: Metadata = {
  title: '[Primary Keyword] | Website Vikreta',   // 50-60 chars
  description: '[150-160 chars. Includes keyword. Written for humans.]',
  keywords: [],   // Not primary signal, but include
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://websitevikreta.com/[path]' },
  openGraph: {
    title: '',
    description: '',
    url: '',
    siteName: 'Website Vikreta',
    images: [{ url: '/og/[page].jpg', width: 1200, height: 630 }],
    type: 'website',   // or 'article' for blog
  },
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    images: ['/og/[page].jpg'],
  }
}
```

### Schema Markup (Required)

**Every page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Website Vikreta",
  "url": "https://websitevikreta.com",
  "description": "AI-first digital marketing agency...",
  "foundingDate": "2019",
  "serviceType": ["AI Automation", "Digital Marketing", "Process Automation"]
}
```

**Blog posts — add:**
```json
{
  "@type": "Article",
  "headline": "",
  "author": { "@type": "Person", "name": "" },
  "datePublished": "",
  "dateModified": "",
  "publisher": { "@type": "Organization", "name": "Website Vikreta" }
}
```

**Service pages — add:**
```json
{
  "@type": "Service",
  "name": "",
  "provider": { "@type": "Organization", "name": "Website Vikreta" },
  "description": "",
  "areaServed": "Worldwide"
}
```

**FAQ sections — add:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "", "acceptedAnswer": { "@type": "Answer", "text": "" } }
  ]
}
```

---

## Content SEO Rules

### URL Structure
```
/blog/[keyword-slug]                    Good
/blog/post-123-title                    Bad
/services/ai-process-automation         Good
/services/service1                      Bad
```

### Heading Hierarchy (Every Page)
- One `<h1>` only — contains primary keyword
- `<h2>` for major sections — contain secondary keywords
- `<h3>` for subsections — long-tail, question-format preferred
- Never skip levels (h1 → h3 is wrong)

### Internal Linking
- Every blog post links to at least 2 other posts
- Every service page links to relevant blog posts
- Every blog post links to one service page (contextually)
- Homepage links to top 3 blog posts and all service pages

### Image SEO
```tsx
<Image
  src="/images/[descriptive-filename].webp"
  alt="[Descriptive alt text with keyword where natural]"
  width={800}
  height={450}
  // Always explicit dimensions — no layout shift
/>
```

---

## GEO — AI Answer Optimization

GEO is about being cited by AI tools (ChatGPT, Perplexity, Claude, Gemini).

### What AI tools cite
- Direct answers to questions (definition + explanation)
- Structured content (lists, tables, steps)
- Authoritative, specific information with examples
- Pages with clear author + organization attribution
- Pages with FAQ schema

### GEO Page Types (Build These)
```
/glossary/[term]          → Define AI/automation terms clearly
/blog/what-is-[topic]     → Answer questions directly in H1
/blog/how-to-[topic]      → Step-by-step with numbered lists
/blog/[tool]-alternatives → Comparison tables
/blog/[topic]-statistics  → Data-heavy, cite sources
```

### GEO Writing Pattern
```
H1: What Is [Term]? (question format)
First paragraph: Direct answer in 2-3 sentences. No preamble.
H2: [More detail]
H2: [Examples]
H2: [Related concepts]
FAQ section with schema: 5-8 common questions answered directly
```

### GEO Signal Builders
- Author bio on every blog post (with schema)
- "Last updated" date visible on page + in schema
- Cite external sources (with links) — builds trust signal
- Link to studies, data, reports when making claims

---

## Sitemap + Robots
```
/sitemap.xml              Auto-generated with Next.js sitemap
/robots.txt               Allow all, point to sitemap
```

```js
// next-sitemap config
module.exports = {
  siteUrl: 'https://websitevikreta.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
}
```

---

## Core Web Vitals (SEO Ranking Signal)
| Metric | Target | Hard Limit |
|--------|--------|-----------|
| LCP | < 2.0s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| INP | < 150ms | < 200ms |
| TTFB | < 600ms | < 800ms |

These are SEO metrics. Failing them costs rankings.