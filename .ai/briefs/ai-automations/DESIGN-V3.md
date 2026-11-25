# AI Automations — Design V3 (owner feedback, 2026-11-07, round 3)

Extends DESIGN-V2. Where they conflict, V3 wins.

## 1. Viewport targets (hard)
Owner works on a **MacBook 13"**. With browser chrome + dock the usable viewport is about **1280×680** CSS px; also check **1440×760** and **390×664** (iPhone Safari with bars).
- At each target, **headline + sub + both CTAs + the key demo frame** are fully visible with **no scroll**. Nothing tucked under the fixed header.
- Height-aware type: hero H1 `font-size: clamp(36px, min(5.6vw, 9vh), 96px)`; stage height `min(…, calc(100svh - header - 48px))`.
- Hero section: `padding-top: var(--header-h)`; `min-height: 100svh` only if content fits; never taller than needed.

## 2. Readability (hard)
- Body ≥ 17px desktop / 16px mobile, line-height ≥ 1.5, measure ≤ 64ch. Muted text only for meta, never for content people need.
- No text on photos without a solid scrim. No text smaller than 13px except legal.
- **Nothing clipped horizontally** at 1280, 1440, 390. No fixed-width stages that overflow; every stage scales (container queries / `min()`).

## 3. Craft, not template
Every page has its own format and purpose. Awwwards bar: crafted elements, no generic card grids.

| Page | Purpose | Signature section (besides hero) |
|---|---|---|
| Hub | "Meet the team that runs our company" | Team: three large portraits as an org row; click a persona → their desk opens (live work feed). Problem picker. Branch index. |
| Voice | Hear it | **Call log**: 3 recorded call cards (audio player + transcript highlights + outcome chip). Missed-calls → missed-bookings slider (no prices). |
| WhatsApp & Chat | Feel the speed | **Race**: "Your team" vs "Arjun" timelines from the same lead, reply times side by side. |
| HR | See the paperwork vanish | **Document shelf**: offer letter, NDA, onboarding pack, completion letter as real paper previews that fan/flip on hover. |
| AI UGC Ads | See the output | **Reel gallery + case study** (Simpli Home): 9:16 players, hooks, before/after. |
| Content | See the feed | **Post feed**: realistic LinkedIn/Instagram/blog cards Ira produced, scrolling; calendar strip. |
| Proposals | See the anatomy | **Interactive proposal**: document with hotspots (scope, timeline, approval gate). |
| Finance | Watch cash come in | **AR board**: invoices moving Overdue 30 → Reminded → Paid columns. |
| Workflow | Build it yourself | **App picker**: click 2–3 app logos → the automation sentence + flow it creates. |
| Product pages | Prove this one thing | **Case study block** (client logo, problem, what we built, result; placeholder until owner fills) + "How it runs" mini-visual. **No demo video on product pages.** |

Videos: **hub + branch pages only.**

## 4. Internal linking (hard)
- Copy supports inline links: `[text](/path)` inside answers, FAQ answers, scenario lines, case studies → rendered by a tiny `RichText` (internal links only).
- Hub → every branch + every flagship product + 3 blog posts.
- Branch → hub, all its products, 2 sibling branches ("Pairs well with"), 2 blog posts, contact.
- Product → parent branch, 2 sibling products, 1 cross-branch product, 1–2 blog posts, contact.
- Map in `content/ai-automations/links.ts` (`BLOG` posts that exist: `/blog/business-growth/ai-automation-roi`, `/blog/ai-and-automation/make-vs-n8n-vs-custom-code`, `/blog/educational/ai-agent-api-security`, `/blog/ai-and-automation/mcp-explained-direct-ai-tool-integration`, `/blog/ai-and-automation/ai-automation-connecting-tools`, `/blog/ai-and-automation/establishing-human-oversight-automation`, `/blog/ai-and-automation/ai-strategy-real-world-outcomes`, `/blog/educational/google-ai-search-optimization-guide`).
- Anchor text = descriptive keyword phrases, never "click here".

## 5. Navigation (hard)
Header links get cut at 1280 and the AI mega menu runs off the bottom. New approach, scalable:
- Top level max 5 items + CTA: **Services ▾ · AI Automations ▾ · Work · Company ▾ (Studio, Process, Careers) · Blog**, CTA "Book a free call". AI Automations keeps the bolt/snake highlight.
- **AI Automations mega menu**: 4×2 grid of branch tiles (persona avatar, branch name, one-line USP, 2 product links) + a featured side card ("Meet Meher, Ira & Arjun" → hub). Data-driven so new branches drop in.
- Services mega menu shows AI as one row linking into the AI menu/hub (no duplicate 8-group list).
- Every mega panel: `max-height: calc(100svh - var(--header-h) - 16px)` with internal scroll; fits 1280×680.
- Mobile drawer: nested accordions, same data.
- Must not truncate or overlap at 1280, 1366, 1440 widths.

## 6. Realism
Copy, scenarios, FAQs and facts follow `SEO-AEO-RESEARCH.md` (niche research). Realistic sample businesses, numbers framed as samples, real tool names and logos.

## 7. QA findings feeding V3 (from V2 screenshots)
- Hero headlines too tall for 680px height (UGC = 5 lines). Cap at 3 lines on desktop; shorten copy if needed.
- Stages look **empty at rest** (blank offer letter, blank proposal sheets, empty WhatsApp phone, empty chat top). Rule: **the stage is never blank.** First paint shows a rich, mid-story frame; the loop animates through content, never through emptiness. SSR/reduced motion = the richest frame.
- Before/after row clips at the right edge; "Works with" logos small and grey → logos at real colour, ≥ 32px tall.
- Proposal mobile stage overflows by 13px. DocuSign has no logo → drop the DocuSign mention or use a neutral "e-sign" chip.

## 8. Contract additions (V3)
`types.ts`:
```ts
export type CaseStudy = { client: string /* CLIENTS key */; title: string; problem: string; built: string; result: string; placeholder?: boolean }
// Product gains: caseStudy?: CaseStudy
// Branch gains: pairsWith: string[] /* 2 sibling branch slugs */; reading: string[] /* blog hrefs from links.ts */
// Product gains: reading?: string[]
```
`content/ai-automations/links.ts`: `BLOG: { href: string; title: string }[]` (the 8 posts in §4), `blog(href)`, helpers to resolve `pairsWith`.
`components/wv/automation/RichText.tsx`: renders `[text](/internal/path)` as `next/link`; anything else as text.

Signatures: `components/wv/automation/signatures/` one file per page + `index.tsx` exporting `BranchSignature({ branch })` (switch on slug) and `HubDesk({ hub })`. Pages render the signature right after the hero/proof bar.

Product page order (V3): hero → proof bar → case study → how it runs (mini-visual from `page.demo`) → shifts → include/exclude → related (2 siblings + 1 cross-branch + reading) → FAQ → crumbs → CTA. **No VideoSlot.**
Branch page order (V3): hero → proof bar → signature → products (AEO paragraph + rows) → shifts → scenarios → video → works-with logos → pairs-with + reading → FAQ → crumbs → CTA.

## 9. Owner correction (2026-11-07): sell services, not personas
- **Core services are the product.** Meher, Ira and Arjun are supporting characters: **≤ 20% of any page's content**.
- Never in an H1 or meta title. No section built around them except **one compact persona band on the hub** (≤ 1 viewport, below the fold).
- Allowed: persona avatar as the AI agent's identity inside demos (chat bubble avatar, caller ID, small by-line), at most **one copy mention per section**.
- Copy voice: "we" / "your automation" / the service, not "Meher does X". Headlines and USPs state the service outcome.
- Hub hero leads with what we automate and the outcome, not "we run our company on AI teammates". The dogfooding line ("we run our own company on these automations") can appear once as proof, not as the headline.

## 10. Nav correction
- **Services ▾** dropdown keeps the full AI Automations group list (all 8 branches + their products) exactly as rich as before — nothing removed. Make it fit with layout (multi-column, panel scroll), not by deleting.
- **AI Automations** is a **plain link button** (not a dropdown), highlighted (bolt + snake), placed **last in the nav** before the CTA, linking to `/services/ai-automations`.
- Company ▾ (Studio, Process, Careers) stays.
