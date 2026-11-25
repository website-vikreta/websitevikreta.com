# AI Automations — Productized Pages Plan

> Branch: `feat/ai-automation-2026` · Drafted 2026-11-06 · Status: awaiting sign-off
> Inputs: productization doc (owner), SEO/AI-visibility crawl, competitor scan (11 sites), benchmark research.

---

## 0. Decisions locked (from owner)

- Route root: `/services/ai-automations` (hub) → `/[branch]` → `/[branch]/[product]`.
- All branches are live and sellable. No "coming soon".
- Market: US / UK / Western first, then global. USD wording. Short words; US founders skim.
- Buyer: founder / key decision maker.
- **No prices on site.** Pricing happens on call.
- Conversions: WhatsApp (best today) + contact form (want more of these).
- Demos: simulated in-page + recorded videos + "request a demo" (we send link).
- Personas **Meher, Ira, Arjun**: our own AI teammates (face + voice), **not licensed out**. We run the company with them: a group chat of 4 employees + the AI agents, talked to like people ("Meher, generate offer letter for Neel", "Ira, schedule LinkedIn post for tomorrow 10am", "Arjun, status on the sales call?"). They also act as AI influencers / UGC presenters for our marketing.
- Named clients OK: SimpliHome, SBP, Blancora (+ others owner lists).
- WhatsApp: +91 99704 45198. US-hours coverage and "reply within 1 business day" OK to claim.
- Old `origin/feat/whatsapp-automation-page` retires when the new page ships.
- Placeholders allowed. Owner fills real numbers later (see §9 register).

---

## 1. Fixes to the productization doc

| # | Gap | Fix |
|---|---|---|
| 1 | Branches mix channel (Voice, WhatsApp), function (HR, Proposals, Content) and output (UGC). Same product appears in 2–3 branches. | Organise by **business job**. Channels become attributes ("runs on: phone, WhatsApp, SMS, web chat"). One owner page per keyword. |
| 2 | "AI Automation" is both umbrella and branch. | Umbrella = hub page. Branch renamed **Workflow Automation** (CRM, data, docs, reporting, custom agents). |
| 3 | No Finance branch though invoice generation is built. | Add **Finance Automation**. |
| 4 | Missing high-demand products. | Add: AI web chat agent, speed-to-lead (reply < 60s), internal knowledge assistant, AI spokesperson licensing. |
| 5 | No ICP / verticals. | ICP = founders of agencies, D2C, B2B, edtech, finance firms, HR/recruiting agencies, local footfall businesses (clinics, gyms, restaurants). Industry pages in phase 2. |
| 6 | Compliance generic + India-only framing. | Western list: **TCPA** (FCC 2024: AI voices count as "artificial", outbound needs prior express consent), **A2P 10DLC** (US business SMS), WhatsApp opt-in + approved templates, **GDPR / UK GDPR / CCPA**, **NYC Local Law 144** (bias audit for automated hiring screens), **FTC Endorsement Guides** (AI personas must be disclosed as AI; never presented as real customers). |
| 7 | Ownership / lock-in silent. | Policy line on every page: "Runs in your accounts. You own every workflow. Leave anytime, keep everything." (confirm) |
| 8 | No success metric per product. | Each product gets: outcome KPI, time-to-live, what's included, what's **not** included. |
| 9 | Personas not in the doc. | Persona layer: every product is "done by" one persona. Persona licensing is its own product. |
| 10 | US reach of WhatsApp is low (SMS dominates in US; WhatsApp strong in UK/EU/Gulf/LatAm). | WhatsApp branch = "WhatsApp, SMS & chat". Keep `/whatsapp-automation` slug (existing ranking). |

---

## 2. Persona roster (locked)

| Persona | Role | Branches |
|---|---|---|
| **Meher** | HR | HR, Workflow (default — ops sits closest to HR) |
| **Ira** | Content & UGC | AI UGC Ads, Content |
| **Arjun** | Sales & Finance | Voice Agents, WhatsApp & Chat, Proposals, Finance |

Assets: `public/wv/personas/{meher,ira,arjun}-{front,three-quarter}.webp` (cropped from owner sheets, ~280–500px wide, backgrounds intact). Placeholder quality only; see §10.

Rules: always labelled as AI ("Meher · AI HR agent"). Never shown giving a customer testimonial. Cutouts reused in hero, problem picker, branch heroes, demo UIs (avatar in chat/call), CTA.

---

## 3. Information architecture

```
/services/ai-automations                                  HUB
  /ai-ugc-ads                     Ira     ai-ugc-video-ads* · ai-spokesperson-videos* · ad-hooks-and-scripts · bulk-ad-variations · product-image-to-video
  /ai-voice-agents                Arjun   ai-receptionist* · outbound-lead-qualification* · appointment-booking-calls · after-hours-answering · call-summaries-to-crm
  /whatsapp-automation            Arjun   whatsapp-lead-follow-up* · appointment-reminders* · whatsapp-customer-support · ai-website-chat-agent · order-updates · review-collection · broadcast-campaigns
  /hr-automation                  Meher   offer-letter-automation* · employee-onboarding-automation* · resume-screening · interview-scheduling · contractor-nda-and-contracts · completion-letters · hr-assistant
  /proposal-automation            Arjun   proposal-generation* · rfp-response-automation* · scope-of-work-generation · upwork-proposal-automation · proposal-follow-up
  /content-automation             Ira     seo-blog-content* · social-media-content* · content-repurposing · newsletter-automation · content-calendar
  /finance-automation             Arjun   invoice-automation* · payment-reminder-automation* · receipt-and-expense-extraction · automated-financial-reports
  /workflow-automation            Meher   crm-automation* · document-data-extraction* · speed-to-lead · email-triage-and-drafting · reporting-dashboards · custom-ai-agents · knowledge-base-assistant
  /workflow-automation/ai-teammates*      "Your own Meher": AI teammates in your Slack / WhatsApp / Teams group, briefed in plain English
Phase 2:
  /for/[industry]                 agencies · ecommerce-d2c · b2b · edtech · finance-firms · recruiting-agencies · clinics · gyms · restaurants
```

`*` = flagship leaf, ships in phase 1 (16 pages). Others ship in phase 2 **only with unique content** (own demo, own FAQ, ≥ 500 unique words). Thin clones hurt the whole section.

---

## 4. Page templates

### 4.1 Hub — "AI teammates you just message"
Read less, click more. The hook is how we run our own company: a team chat where people brief AI agents like colleagues. 9 blocks:

1. **Hero.** Left: H1 angle *"Your new teammates. Just message them."* Sub: we build AI teammates for sales, HR, content and finance, done for you, live in ~14 days. CTAs: `Get my automation plan` (form) + `Chat on WhatsApp`. Right: three persona cutouts, overlapping, with a **live team-chat simulation** playing in front: a human asks, the persona replies with the finished work (offer letter PDF, scheduled post card, call summary + invoice). Hover/tap a persona → role tag + ▶ 5s voice hello.
2. **Problem picker** — *"What's eating your week?"* 8 chips: missed calls · slow lead replies · chasing invoices · hiring paperwork · content backlog · ad creatives · proposals · copy-paste data. Pick one → persona pops in with the fix in one sentence + link to branch + prefilled CTA. Core of the page.
3. **Meet the team.** 3 persona cards: job title, what they do (3 bullets), voice sample, "Ask Arjun →" (branch). Line: *"We run Website Vikreta with them. We build the same for you."*
4. **Hours-back calculator.** Inputs: team size, hours/week on manual work (slider). Output: hours/year back. No money. Button: `Send me this plan` → form prefilled.
5. **How it works.** 4 steps: call → map → build → run. "Runs in your accounts. You own it."
6. **Proof.** SimpliHome UGC case (real) + 3 sourced industry stats + placeholder client stats.
7. **Trust strip.** GDPR · CCPA · TCPA-consent flows · AI disclosed · human approval on sensitive actions.
8. **FAQ** (8 Qs, question H2 style, FAQPage schema).
9. **Closing CTA.** Short form + WhatsApp.

### 4.2 Branch
1. Hero: persona cutout + outcome H1 + sub + CTAs.
2. **Live simulation** (see §5) in first or second viewport.
3. *"What [persona] handles"* — product rows (`HoverLetters`) → leaf pages.
4. Answer-first block: *"What is [branch]?"* 40–60 words, quotable.
5. 3 sourced stats strip.
6. How it works (time-to-live).
7. Works with: integration logos.
8. Built for: industry chips (→ phase-2 industry pages).
9. Compliance note (branch-specific).
10. FAQ (6–8).
11. CTA.

### 4.3 Product (leaf)
1. Hero: H1 = keyword-led ("Offer letter automation"), one-line outcome, persona badge.
2. Answer-first: *"What is …?"* 40–60 words.
3. Simulation or video (branch demo, product-specific script).
4. What you get / What's not included (scope from productization doc).
5. Steps (how it runs).
6. KPI + time-to-live.
7. FAQ (4–6).
8. Related products (same branch + 1 cross-branch bundle).
9. CTA.

---

## 5. Simulations & video (all client-side, scripted, no backend, no API cost)

| Branch | In-page simulation | Recorded video (45–60s, persona VO) |
|---|---|---|
| UGC | Product still → slider → persona UGC video (SimpliHome) | 3 real ad cuts |
| Voice | Phone call UI, waveform, real persona audio + synced transcript, "booked ✓" | Full call + CRM entry appearing |
| WhatsApp & chat | Chat thread types itself: lead → qualify → book | Lead form → WhatsApp reply in 10s |
| HR | Type name + role → offer letter fills, signs, "Sent ✓" | Offer → NDA → onboarding packet |
| Proposal | Pick industry → proposal page types out with sections | Discovery notes → proposal in minutes |
| Content | One idea → fans into blog / LinkedIn / X / IG cards | Calendar filling for a month |
| Finance | Invoice timeline: due → nudge 1 → nudge 2 → paid | Job done → invoice → reminder → paid |
| Workflow | Node graph lights up: form → CRM → Slack → email | Before/after of a manual process |

Videos on YouTube (own channel = extra AI-answer surface), lazy facade embed, `VideoObject` schema.
Secondary CTA everywhere: **"Get a demo built on your business"** → short form → team sends a personalised Loom (24h). Highest-intent lead type.

---

## 6. Conversion system

- **One `LeadForm`** (wv): name, work email, WhatsApp/phone (optional), "What should we automate?" (prefilled from page). Hidden: `service`, `product`, `source`. Reuses existing EmailJS send.
- **WhatsApp deep link** per page: `wa.me/<num>?text=Hi, I'm interested in Offer Letter Automation`.
- **CTA hierarchy:** desktop primary = form, secondary = WhatsApp. Mobile sticky bar = WhatsApp | Get plan.
- Calendly button where `CALENDLY_URL` set.
- `/contact?service=` prefill (small change to `ContactPageContent.tsx`).
- Analytics: `whatsapp_click` already tracked; add `lead_form_submit` with service/product.
- Microcopy under CTAs: "Reply within 1 business day · No commitment" (confirm SLA).

---

## 7. SEO / AEO

**Crawl findings (2026-11-06)**
- `robots.txt` OK — all AI crawlers allowed.
- `llms.txt` says "India" 4×, no WhatsApp/branch pages → rewrite for Western market + full catalogue.
- Hub: FAQ rendered but **no FAQPage schema**; `areaServed: India`; H1 "20 hours a week back" unsourced.
- Live `/whatsapp-automation` is India-D2C (₹, COD, RTO). Lives on `origin/feat/whatsapp-automation-page`, not `main`. New page supersedes it; keep URL.

**Per page**
- Metadata + canonical from the catalogue data file.
- Schema: `Service` (provider, `areaServed`: US, GB, CA, AU + Worldwide, `hasOfferCatalog` of leaves, no price) · `FAQPage` · `BreadcrumbList` · `VideoObject` when video exists. Personas **not** marked as `Person`.
- Question-style H2s; first paragraph answers in 40–60 words.
- Sitemap + llms.txt generated from the same data file.
- Dynamic OG image per template (`opengraph-image.tsx`) with persona cutout.

**Target queries (seed)**
AI automation agency for small business · done-for-you AI automation · what can a small business automate with AI · AI voice agent for small business · AI receptionist for clinics · AI receptionist vs answering service · WhatsApp automation agency · WhatsApp chatbot for lead follow-up · automate appointment reminders · AI UGC ads agency · AI UGC video ads for ecommerce · AI spokesperson for business · HR automation for small business · automate offer letters and onboarding · automated candidate screening · proposal automation service · RFP response automation · automate invoice reminders · accounts receivable automation for small business · AI content for business blogs.

**Off-site (owner)**: Clutch, G2 (services), GoodFirms, Google Business Profile, LinkedIn page, YouTube channel, Upwork agency profile. AI assistants cite these heavily.

**Blog (phase 2)**: AI receptionist vs answering service · Arcads alternatives for agencies · TCPA rules for AI voice agents · WhatsApp vs SMS for US businesses.

---

## 8. Build plan (bulk)

| Step | Work | Who |
|---|---|---|
| 1 | Catalogue data file `content/ai-automations.ts`: branches, products, personas, FAQs, stats, scope. Single source for pages, schema, sitemap, llms.txt. | Opus (schema) + Sonnet ×8 (copy per branch, parallel) |
| 2 | Shared wv components in `components/wv/automation/`: `PersonaCutout`, `LeadForm`, `StickyCta`, `Faq`, `StatStrip`, `ProductRows`, demo shells (`ChatSim`, `CallSim`, `DocSim`, `TimelineSim`, `FlowSim`, `FanoutSim`, `BeforeAfter`). | Opus |
| 3 | Hub rewrite on wv (replace legacy sections). | Opus |
| 4 | `[branch]/page.tsx` + `[branch]/[product]/page.tsx`, `generateStaticParams`, `dynamicParams = false`. | Opus |
| 5 | SEO plumbing: sitemap, llms.txt, JSON-LD, OG images, `/contact?service=`. | Sonnet |
| 6 | Humanize pass on all copy (`/humanize`). | Sonnet |
| 7 | E2E smoke per route + a11y + reduced-motion check (`/test-page ai-automations`). | Sonnet |
| 8 | Delete legacy `app/services/ai-automations/sections/*`. Log new patterns in `.ai/learning.md`. | Sonnet |

Phase 1 = hub + 8 branches + 17 flagship leaves (incl. `ai-teammates`) = **26 pages**.
Phase 2 = remaining leaves, industry pages, comparison blogs.

---

## 9. Placeholder register (owner fills)

| Where | Placeholder | Basis |
|---|---|---|
| Hub hero sub | "Live in ~14 days" | competitor norm; confirm real average |
| Hub proof | `[N]` businesses automated · `[N]` docs generated · `[N]` hours saved | owner data |
| UGC | "10 ad variants in 48 hours" | delivery SLA |
| UGC | SimpliHome result (views / CTR / cost per creative) | owner data + permission |
| Voice | "Answers 100% of calls, 24/7" | capability |
| Voice | "Call summary in your CRM within 1 min" | capability |
| WhatsApp | "First reply in under 10 seconds" | capability |
| HR | "Offer letter out in under 2 min (was ~45)" | Meher scenario timing |
| Proposal | "First draft in under 15 min" | Upwork proposal scenario timing |
| Content | "Researched draft in ~20 min vs ~4 hrs" | Orbit Media ~4 hrs/post |
| Finance | "Invoice sent within 5 min of job done" | capability |
| Workflow | "5–10 hours a week back per founder" | Zapier 2024 (secondary) |
| CTA microcopy | "Reply within 1 business day" | confirm SLA |
| Trust | "You own every workflow" | confirm policy |

**Sourced stats usable now** (re-open each source before publish):
- HBR 2011: replying within 1 hr → ~7× more likely to qualify the lead.
- Atradius 2025 (US): 43% of B2B invoice value paid late.
- Intuit QuickBooks 2025: 56% of US small businesses owed money, ~$17.5k avg.
- Loopio 2024: avg RFP win rate ~43%.
- SHRM 2022: ~44 days time-to-fill, ~$4.7k cost per hire.
- McKinsey 2023: gen AI could automate work taking up 60–70% of employee time.

**Do not use:** "78% buy from first responder", "98% WhatsApp open rate", "62% of calls unanswered", "85% never call back".

---

## 10. Assets needed from owner

1. Persona cutouts: transparent PNG/WebP, **≥ 1200px tall, waist-up** (current sheets are 411–872px head shots with mixed backgrounds: dark / outdoor / grey). Same light, same crop. Per persona: front, 3/4, one gesture (pointing / holding phone). (9 files)
2. Voice clips: per persona a 5s hello + one 20–30s sample call/message. (6 files)
3. SimpliHome UGC videos + permission to name them.
4. Demo recordings per branch (scripts can be drafted).
5. Client logos cleared for use.
6. WhatsApp number decision (see open questions).

---

## 11. Open questions

All owner questions answered 2026-11-06. Defaults taken: Workflow → Meher; `ai-teammates` ships as a Workflow leaf instead of a licensing page.
