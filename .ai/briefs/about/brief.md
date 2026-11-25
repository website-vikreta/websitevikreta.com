# /about — Brief (draft 2026-11-10)

## Positioning (owner-confirmed)
Website Vikreta is a **creative studio** that takes care of a business's digital needs. It began AI services in 2025 and became **AI-first** in 2026. It is NOT an "AI automation agency". Majority of revenue = UI/UX design + web design/development; AI automations/services are an additional line of business (owner, 2026-11-10). Lead every definition with design + development, AI last. Fix every "AI automation agency" string on this page (title, description, OG, JSON-LD, keywords, hero).

## Facts (owner-confirmed — use only these)
- Founded **August 2020**, Pune, India. Years = computed from `FOUNDED = 2020-08` at render time (6 years as of Nov 2026). Never hard-code "5".
- Clients across the globe. Started as PHP/SCSS/CSS web development.

- Delivery: biweekly sprints, consistent updates to clients/stakeholders, proper meetings set up.
- People you talk to are the people doing the work (no account managers).
- 6,360 hrs saved = real (owner confirmed 2026-11-10). May be used as-is.
- AI timeline: AI services began 2025; AI-first + new LOB (AI automations, AI services) from 2026 when agentic AI arrived.

## Page job
The story of Website Vikreta: who we are, what we do, how we grew, where we stand. Not a portfolio, not a workshop company, no team/founder names, no workshop photos, no past-work showcase (link out to /work instead).

## Structure
1. **Hero** — H1 = creative studio + since 2020. One CTA → /contact.
2. **Who we are** — 2–3 sentence factual definition (GEO quote block) + facts strip: Founded Aug 2020 · Pune, India · clients worldwide · AI-first since 2026.
3. **What we do** — the digital needs we take care of, each linking to its page: /services/web-development, /services/web-mobile-app-development (apps-crm), /services/uiux-design, /services/digital-marketing, /services/ai-automations. Services ≤20% of page.
4. **The roadmap 2020 → 2030** — hero section of the page. Horizontal/vertical scroll-driven timeline, "you are here" marker at now. Past (2020–2026) = real milestones; future (2027–2030) = owner's stated direction. Needs owner input (below).
5. **How we work** — biweekly sprints, shared updates, scheduled meetings, direct access to the people building. Visual sprint loop, not bullets. Links: /contact, /faq.
6. **How we think** — 4–5 working principles (rewrite of CoreValues, "when X, we do Y").
7. **Where we stand today** — one short statement on the AI-first studio now; links to /services/ai-automations, /blog.
8. **Closing** — CTA /contact; secondary /careers, /work ("see what we've built").

## Internal links (must exist)
/services/* (all five), /work, /contact, /faq, /careers, /blog, /sitemap.

## SEO / GEO
- Title ≈ "About Website Vikreta | Creative Studio, AI-First Since 2025" (≤60 chars, adjust to real month).
- Description: studio, founded 2020, Pune, digital + AI-first. 150–160 chars.
- JSON-LD: AboutPage + Organization (`foundingDate: 2020-08`, address Pune, `knowsAbout`, `areaServed`, `sameAs`) + BreadcrumbList. No Person. No FAQPage.
- Drop keywords "Website Vikreta team", "who we are". No Next.js in description.
- Page-specific OG image. One H1, H2 per section, quotable definition in first 100 words.
- Delete from page: AboutHeroSection, StatsCounters, PhotoGallery, ClientLogos, Insights (legacy). Rebuild on `wv`.

## Stale elsewhere (not in scope, flag)
"Five years in" / "68 projects" / 6360 in service heroes, home, `content/home.ts`, `business.md`, `seo-geo.md` (foundingDate 2019).

## Roadmap content (owner raw notes, structured)
Era = what the studio *was*, not a list of services. Each year: one headline, one line of why, chips linking to the service page.

| Year | Headline | Beats | Links |
|---|---|---|---|
| 2020 Aug | Founded. Web development. | Vanilla HTML/CSS/JS and PHP. First clients, worldwide. | /services/web-development |
| 2021 | Design joins. | UI/UX line starts: SaaS design and redesigns. | /services/uiux-design |
| 2022 | Product builds. Mobile. | SaaS built in React. Mobile app development introduced. | /services/web-mobile-app-development |
| 2022–24 (TBD exact years) | The full digital desk. | SEO, organic marketing, CRM integrations; stack opens up: Laravel, Django, Flask, Next.js, Angular, Vue, React, vanilla — "name it, we'll work on it"; branding work starts. | /services/digital-marketing, /services/apps-crm |
| 2025 | First AI services. | Chatbots, RAG, document data extraction, website data scraping. | /services/ai-automations |
| 2026 | AI-first. | Agentic AI lands; studio goes AI-first; new lines of business: AI automations + AI services. | /services/ai-automations |
| Now | Where we stand. | Creative studio, AI-first, 6 years in, 68 projects, 6,360+ hrs saved. | /contact |
| 2027–2030 | Direction | Owner to write. Until then render only 2027–2030 as a labelled "ahead" segment with no claims. | — |

Roadmap UI: one sticky year rail, scroll-driven; past solid ink, "now" yellow marker, future dashed/outlined Anton years. Mobile: vertical stack. No decorative numbering beyond the years themselves.

## Open — owner to supply
- Exact years for SEO/organic, CRM, branding and the tech-stack opening (you said "within the year" — which year?). Was UI/UX 2021 and React SaaS + mobile 2022?
- Roadmap direction 2027–2030 (what we say we're building toward).
- Any stat you CAN prove (clients served, countries, project count) for the facts strip.
