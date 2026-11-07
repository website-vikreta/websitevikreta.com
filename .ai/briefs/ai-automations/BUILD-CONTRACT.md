# AI Automations — Build Contract

> Every build agent reads this + `PLAN.md` first. Do not deviate. If something here is impossible, stop and report; don't improvise a new contract.

## Rules for every agent

- Design language **`wv` only** (`app/wv.css` tokens, `components/wv/ui.tsx` primitives). Read `.ai/standards/design-system.md` + `.ai/standards/motion-system.md` before UI work. No legacy (`components/sections`, `components/ui`, GSAP, Tailwind utility styling, `--color-*`). No new hex values — use `var(--ink|canvas|surface|surface-2|y|y-2|gold|muted|line)`.
- Next.js **16.2** (App Router, React 19). `params` is a Promise. Read `node_modules/next/dist/docs/` when unsure.
- Copy: US founders, short words, short sentences, no fluff. Read `.ai/context/brand.md` + `.ai/context/ai-slop-stop-skill.md`. No em-dash chains, no "unlock/leverage/seamless/elevate/game-changer/in today's fast-paced".
- **No prices anywhere.** Currency wording USD if ever needed.
- Personas are always labelled AI (e.g. "Meher · AI HR teammate"). Never as a customer, never a testimonial.
- Numbers: only the sourced stats in `PLAN.md` §9 (with `source`), real proof (Simpli Home: 20 hours a week cut to 1), or `placeholder: true` items. Never invent a sourced stat.
- Only touch files you own (table below). Don't commit. Don't run `npm install`.
- Finish with `npx tsc --noEmit -p .` on your files (ignore errors from files owned by agents still running) and report: files written, open TODOs.

## File ownership

| Agent | Owns |
|---|---|
| F — foundation | `content/ai-automations/types.ts`, `content/ai-automations/index.ts`, `lib/ai-automations-seo.ts`, `components/wv/automation/*.tsx`, `components/wv/automation/automation.css` |
| S — simulations | `components/wv/automation/sims/*` |
| H — hub + personas copy | `content/ai-automations/hub.ts`, `content/ai-automations/personas.ts` |
| C1 | `content/ai-automations/branches/hr-automation.ts`, `.../workflow-automation.ts` |
| C2 | `.../ai-ugc-ads.ts`, `.../content-automation.ts` |
| C3 | `.../ai-voice-agents.ts`, `.../whatsapp-automation.ts` |
| C4 | `.../proposal-automation.ts`, `.../finance-automation.ts` |
| P (wave 2) | `app/services/ai-automations/**` |
| W (wave 2) | `app/sitemap.ts`, `public/llms.txt`, `components/wv/data.ts`, `components/ContactPageContent.tsx` |

## Data contract — `content/ai-automations/types.ts`

```ts
export type PersonaId = 'meher' | 'ira' | 'arjun'

export type Persona = {
  id: PersonaId
  name: string                 // 'Meher'
  role: string                 // 'AI HR teammate'
  short: string                // one line, what they handle
  does: string[]               // 3 bullets
  hello: string                // what they say in a chat greeting
  img: { front: string; threeQuarter: string; alt: string }
  voice?: string               // audio src; TODO(owner) until supplied
  branches: string[]           // branch slugs
}

export type Source = { name: string; year: number; url: string }
export type Stat = { value: string; label: string; source?: Source; placeholder?: boolean }
export type Faq = { q: string; a: string }   // q phrased like a real search question; a = 40–80 words, answer first
export type Step = { title: string; body: string }

export type ChatMessage = {
  from: PersonaId | 'user' | string   // string = human name in team chat (e.g. 'Shubham')
  text: string
  attachment?: { kind: 'pdf' | 'image' | 'card'; label: string; meta?: string }
}

export type Demo =
  | { kind: 'chat'; channel: 'whatsapp' | 'sms' | 'web' | 'team'; title: string; messages: ChatMessage[] }
  | { kind: 'call'; title: string; caller: string; lines: { who: 'agent' | 'caller'; text: string }[]; outcome: string; audio?: string }
  | { kind: 'doc'; title: string; docTitle: string; fields: { label: string; value: string }[]; status: string[] }
  | { kind: 'timeline'; title: string; events: { at: string; label: string; state: 'done' | 'pending' | 'paid' }[] }
  | { kind: 'flow'; title: string; nodes: { id: string; label: string; app?: string }[]; edges: [string, string][] }
  | { kind: 'fanout'; title: string; source: string; outputs: { channel: string; text: string }[] }
  | { kind: 'beforeAfter'; title: string; before: { src: string; alt: string }; after: { src: string; alt: string; video?: string }; caption: string }

export type ProductPage = {
  title: string          // meta title, ≤ 60 chars, keyword first, ends '| Website Vikreta'
  description: string    // meta description, 140–160 chars
  h1: string[]           // 1–2 KineticTitle lines, keyword-led
  demo: Demo
  steps: Step[]          // 3–4
  faqs: Faq[]            // 4–6
  related: string[]      // 'branch-slug/product-slug', 2–3
}

export type Product = {
  slug: string
  name: string           // 'Offer letter automation'
  keyword: string        // primary search query
  oneLiner: string       // ≤ 12 words
  answer: string         // 'What is X?' answer, 40–60 words, quotable standalone
  persona: PersonaId
  channels?: string[]    // 'Email', 'WhatsApp', 'Phone', 'SMS', 'Slack', 'Web chat'
  kpi: Stat              // usually placeholder: true
  timeToLive: string     // 'Live in ~7 days' (placeholder ok)
  includes: string[]     // 4–6
  excludes: string[]     // 2–4, honest scope limits
  page?: ProductPage     // present ⇒ flagship, gets its own route in phase 1
}

export type Branch = {
  slug: string
  name: string           // 'HR Automation'
  navLabel: string       // short, for menus
  persona: PersonaId
  title: string          // meta title ≤ 60
  description: string    // meta 140–160
  h1: string[]           // KineticTitle lines, 2 max
  lead: string           // ≤ 30 words
  answerQ: string        // 'What is HR automation?'
  answer: string         // 40–60 words
  demo: Demo
  stats: Stat[]          // exactly 3
  steps: Step[]          // 4
  integrations: string[] // tool names, real ones we use
  industries: string[]   // from ICP list
  compliance: string     // 1–2 sentences, branch-specific (see PLAN §1 row 6)
  proof?: { client: string; result: string; placeholder?: boolean }
  faqs: Faq[]            // 6–8
  products: Product[]    // all products in PLAN §3, flagship ones with `page`
}

export type Problem = { id: string; label: string; persona: PersonaId; fix: string; branch: string }

export type Hub = {
  title: string; description: string
  h1: string[]; lead: string
  teamChat: Extract<Demo, { kind: 'chat' }>   // channel 'team'
  problems: Problem[]                          // 8
  stats: Stat[]                                // 3–4
  steps: Step[]                                // 4
  trust: string[]                              // 4–5 short lines
  proof: { client: string; result: string; placeholder?: boolean }[]
  faqs: Faq[]                                  // 8
}
```

`index.ts` exports: `BRANCHES: Branch[]` (order: workflow, voice, whatsapp, hr, ugc, content, proposal, finance), `PERSONAS`, `HUB`, `getBranch(slug)`, `getProduct(branch, slug)`, `branchParams()`, `productParams()` (flagship only), `waLink(text)`, `BASE = '/services/ai-automations'`.

## Component contract — `components/wv/automation/` (agent F)

All client components that animate are `'use client'`; pages stay server components.

| Component | Props | Notes |
|---|---|---|
| `AutomationShell` | `children` | `<div className="wv {wvFonts}">` + `ScrollProgress` + `Smooth` + imports `wv.css` + `automation.css` + `StickyCta` (mobile) |
| `PageHero` | `crumbs: {label,href}[]`, `eyebrow`, `h1: string[]`, `lead`, `persona?: Persona`, `cta: { form: string; wa: string }`, `aside?: ReactNode` | `.wv-page` pattern; persona cutout via `PersonaCutout`; `aside` slot holds a sim |
| `PersonaCutout` | `persona`, `view?: 'front'|'threeQuarter'`, `size?: 'sm'|'md'|'lg'`, `label?: boolean` | arch mask (radius 999px top), soft grain-free; label "Name · role" pill. Images are small (≈280–500px wide): never render wider than source |
| `PersonaStack` | `personas: Persona[]` | 3 overlapping cutouts for hub hero; tap/hover → role pill |
| `AnswerBlock` | `q`, `a` | question H2 + quotable paragraph |
| `StatStrip` | `stats: Stat[]` | `CountUp` only when value is numeric; sources as small links; placeholder stats get `data-placeholder` + dev-only dashed outline |
| `ProductRows` | `branch: Branch` | rows with `HoverLetters`; flagship → link to product page, others → `#lead` with `?interest=` prefill |
| `Steps` | `steps`, `timeToLive?` | numbered |
| `TagList` | `title`, `items` | integrations / industries chips |
| `ComplianceNote` | `text` | small boxed note |
| `Faq` | `faqs` | `.wv-acc` accordion, renders all answers in HTML (no JS-only content) |
| `LeadForm` | `interest: string`, `source: string`, `id?='lead'` | fields: name, work email, phone/WhatsApp (optional), "What should we automate?" (prefilled `interest`). EmailJS: mirror the env vars + `emailjs.send` params in `components/ContactPageContent.tsx:~230`, put service/product/source into the message. Success + error states. Fires `lead_form_submit` via `lib/analytics.ts` if it exposes a helper |
| `CtaBlock` | `title: string[]`, `interest`, `source`, `waText` | closing `.wv-cta` with `LeadForm` + WhatsApp button |
| `WaButton` | `text`, `variant?` | `wa.me/919970445198?text=…` (number from `CONTACT.whatsapp` in `components/wv/data.ts`) |
| `StickyCta` | — | mobile only (<720px): WhatsApp (primary yellow) + "Get plan" (#lead) |
| `DemoSlot` | `demo: Demo` | switch on `demo.kind` → sims from `./sims` |
| `JsonLd` | `data: object` | `<script type="application/ld+json">` |

`lib/ai-automations-seo.ts`: `hubMetadata()`, `branchMetadata(b)`, `productMetadata(b,p)` (title, description, canonical `SITE_URL+path`, OG/Twitter with `/og-image.png` fallback, robots index), and JSON-LD builders `hubSchema()`, `branchSchema(b)`, `productSchema(b,p)` → `@graph` of `Service` (provider `ORGANIZATION_REF`, `areaServed` US/GB/CA/AU + `Worldwide` as `Place`, `hasOfferCatalog` listing products, no price), `FAQPage`, `BreadcrumbList`. Import `SITE_URL`, `ORGANIZATION_REF` from `config/site`.

## Simulation contract — `components/wv/automation/sims/` (agent S)

One component per `Demo.kind`: `ChatSim` (also renders `channel: 'team'` as a group chat with persona avatars from `PERSONAS`), `CallSim`, `DocSim`, `TimelineSim`, `FlowSim`, `FanoutSim`, `BeforeAfter`. Each takes `{ demo }` of its kind. Behaviour:
- Plays once when ≥ 40% in view, then shows a small "Replay" button. Typing dots between messages, ~0.9–1.4s per step.
- Reduced motion / no JS: render the **final state** fully (all messages visible). SSR the final markup; animate from it.
- Only transform/opacity/clip-path. No layout shift: reserve final height.
- Accessible: `role="log"` for chat, text is real DOM, decorative bits `aria-hidden`.
- `CallSim` plays `demo.audio` only on user click.
- Styles in `sims/sims.css` using wv tokens only. Export all from `sims/index.ts`.
