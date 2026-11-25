# AI Automations — Design V2 (owner feedback 2026-11-07)

Supersedes PLAN §4 (templates) and §5 (sims). Data model, routes, SEO plumbing stay.

## What was wrong
- Vague. No USP. Copy describes categories, not outcomes.
- Every page = same template → feels generated.
- Motion sits below the fold. Hero is just text.
- Eyebrows `( LABEL )`, "In short", step lists, chip clouds, compliance boxes = AI-slop furniture.
- Brands named as text instead of logos.

## Rules (hard)
1. **Hero = first viewport.** `min-height: 100svh`, nothing important below it. The demo is visible and moving on load at 390×844 and 1440×900. Headline ≤ 7 words. Sub ≤ 15 words. Two CTAs.
2. **The demo is the hero.** Not text next to a widget. Each branch has its own hero composition (table below). No two branch heroes share a layout.
3. **No eyebrows. Anywhere.** No `( LABEL )`, no kicker text, no "In short", no section labels. Section heads are statements that say something.
4. **Real logos** for every brand/tool/client named (`public/client-logos`, `public/tools-logos`, add missing SVGs). Never a brand name as a chip.
5. **Max 6 sections per page** after the hero. Cut anything that doesn't sell or answer.
6. **One USP line per page**: a concrete mechanism + outcome a founder can picture. Names, times, real tools.
7. AEO stays, but invisible as furniture: the 40–60 word answer is the first paragraph of the products section, written as normal prose. FAQs stay (compliance answers live there).

## The USP (site-wide)
**"We run Website Vikreta with AI teammates. We'll build yours."**
Proof of dogfooding: our real team chat where humans message Meher, Ira and Arjun and get finished work back. Done for you, runs in your accounts, you own it.

## Hero per page

| Page | Headline | Hero composition (motion in first viewport) |
|---|---|---|
| Hub | We run our company on AI teammates. | Full-bleed team chat as the stage. Persona faces large at the edges, each lighting up when it replies. Messages land with real deliverables: offer letter PDF, scheduled LinkedIn post (LinkedIn logo), invoice marked paid, call summary. |
| Voice — Arjun | Every call answered. Every lead booked. | Incoming call screen, Arjun as the answering agent for a sample clinic. Live waveform + transcript ticking. Calendar slot drops in: "Booked · Thu 3:30". Play button for real audio. |
| WhatsApp & Chat — Arjun | Reply to every lead in seconds. | Phone centre-stage. Web form submit → WhatsApp reply arrives; stopwatch "replied in 6s". Qualify → book. WhatsApp/SMS logos. |
| HR — Meher | Type one line. The offer goes out. | Command bar types "Meher, offer letter for Neel, frontend dev, starts Dec 1" → offer letter page writes itself → signature → "Sent for e-sign". |
| AI UGC Ads — Ira | Ad creatives by the dozen. Not by the week. | Vertical 9:16 reel wall, columns drifting at different speeds, Ira presenting, Simpli Home work. Counter of variants. |
| Content — Ira | One brief. A month of posts. | Month calendar grid filling day by day with post cards (LinkedIn, Instagram, X, blog, newsletter logos). |
| Proposals — Arjun | Proposal out the same day as the call. | Call notes on left stream into a proposal that builds page by page on the right (cover, scope, timeline). |
| Finance — Arjun | Get paid without chasing. | Invoice card cycles Sent → Reminder 1 → Reminder 2 → PAID stamp; "Outstanding" total counts down. QuickBooks/Stripe logos. |
| Workflow — Meher | Your apps, finally talking. | Node graph of real app logos (form → HubSpot → Slack → Gmail → Sheets) lighting in sequence, data packet travelling the edges. |
| Product pages | keyword-led H1 (SEO) | Same hero component as its branch, product-specific script. |

## Below the hero (max 6)

Branch / product:
1. **Proof bar**: real client logos (Simpli Home, Blancora, Sustainable Bitcoin Protocol, + others) + one real number.
2. **What [persona] handles**: AEO answer paragraph, then product rows (flagships link, others prefill the form).
3. **Works with**: logo rail (real SVGs).
4. Product pages only: **What you get / What's not included**, two tight columns.
5. **FAQ** (compliance answers here).
6. **CTA**: form + WhatsApp.

Hub:
1. Proof bar (logos).
2. **Meet Meher, Ira, Arjun**: three big portraits, role in 3 words, ▶ voice, "Ask Meher →".
3. **Problem picker** ("What's eating your week?" as the H2 is fine — it's a statement of the task, not an eyebrow).
4. Branch index: 8 rows, each with its one-line USP.
5. FAQ.
6. CTA.

Cut everywhere: eyebrows, "In short" blocks, step lists, chip clouds, compliance boxes, hours calculator, trust strip, stat strips with weak or placeholder numbers (keep the one real number in the proof bar).

## Owner feedback round 2 (2026-11-07)
These pages exist for SEO **and** conversion. A visitor must recognise their own problem, see it solved, and trust us. Without reading much.

- **Density over air.** Section padding on these pages: 56px mobile / 88px desktop (not 96/150). Section head to content gap ≤ 32px. Use the full 1320 wrap. No lonely headline floating in a blank band. Every viewport should hold something worth looking at.
- **Visual-first, every section.** Each section carries a demo, video, photo, real logo or real artifact. Text blocks ≤ 25 words (only exceptions: the AEO answer paragraph and FAQ answers).
- **Relatable.** "This is my business" scenes: industry photo cards with a one-line story ("7:40 pm call to a dental clinic. Arjun booked it.").
- **Proof.** Real client logos, the Simpli Home number, real artifacts (sample offer letter, Ira's real posts, Simpli Home UGC), a 60s "watch it work" video per branch (poster + YouTube facade; `youtubeId` TODO(owner) until recorded).
- **Before → after** shifts: three per branch, ≤ 8 words a side ("45 min per offer letter" → "One line in chat").

## Contract additions (`content/ai-automations/types.ts`)

```ts
export type Scenario = { industry: string; photo: string; alt: string; line: string } // line ≤ 14 words, a concrete moment
export type Shift = { before: string; after: string }                               // ≤ 8 words each
export type Video = { title: string; poster: string; youtubeId?: string }            // youtubeId: TODO(owner)

// Branch gains:
usp: string            // ≤ 12 words, mechanism + outcome
heroSub: string        // ≤ 15 words
scenarios: Scenario[]  // exactly 3, different industries
shifts: Shift[]        // exactly 3
video: Video
tools: string[]        // keys into TOOL_LOGOS (content/ai-automations/logos.ts), 6–10
clients: string[]      // client logo keys from CLIENT_LOGOS in components/wv/data.ts

// ProductPage gains:
heroSub: string
shifts?: Shift[]

// Hub gains:
usp: string; heroSub: string; scenarios: Scenario[] /* 6 */
```
`h1` on Branch/ProductPage/Hub = the hero headline from the table above (product h1 stays keyword-led). `lead`, `answerQ`, `steps`, `compliance`, `industries`, `integrations`, `stats`, `trust`, hub `steps` become unused by pages (keep in data for now; compliance text moves into FAQs).
Photos: Unsplash URLs (`images.unsplash.com/...?w=1200&q=70&auto=format`), allowed in next.config? check `images.remotePatterns`; add if missing. `// TODO(owner): real photo` on each.

## Hero contract (`components/wv/automation/heroes/`)

- `HeroCopy` (core): `{ h1: string[]; sub: string; persona?: Persona; interest: string; waText: string }`: H1 (Anton, KineticTitle `as="span"` inside h1), sub, primary `Get my plan` → `#lead` via PrefillLink, ghost WhatsApp. No eyebrow, no crumbs inside the hero (breadcrumbs move to a slim bar above the footer + JSON-LD).
- One file per hero, default export, props `{ branch: Branch; product?: Product }` (Hub: `{ hub: Hub }`): `HubHero`, `HrHero`, `WorkflowHero`, `VoiceHero`, `WhatsAppHero`, `FinanceHero`, `UgcHero`, `ContentHero`, `ProposalHero`. Script from `product?.page?.demo ?? branch.demo` where it fits; hero may hold sensible defaults.
- `heroes/index.tsx` (core): `BranchHero` switch on `branch.slug`.
- Each hero: `<section>` with `min-height: calc(100svh - var(--header-h, 72px))`, composition fills the viewport at 390×844 and 1440×900, animation starts on load (not in-view), loops gently or ends on a strong final frame with Replay. Reduced motion → final frame. SSR final frame (text in DOM). No CLS. Persona photo via `next/image` with `preload`.
