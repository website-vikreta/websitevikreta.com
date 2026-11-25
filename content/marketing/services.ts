import type { Pillar, Service } from './types'

/**
 * Content for the rebuilt /services/digital-marketing pillar.
 *
 * Scope rule (confirmed with the owner): Website Vikreta does NOT run paid ad
 * campaigns or manage ad spend. This page covers SEO, AEO/GEO and content
 * systems only. Ad creatives live under AI Content & Ads → AI UGC Ads.
 * No invented metrics or client results — the only proof used is AP Cleanco,
 * which already has a published case study on this site.
 */

const SEO_READING = [
  '/blog/educational/google-ai-search-optimization-guide',
  '/blog/ai-and-automation/ai-strategy-real-world-outcomes',
  '/blog/business-growth/ai-automation-roi',
]

export const PILLAR: Pillar = {
  slug: 'digital-marketing',
  name: 'SEO & GEO',
  title: 'Digital Marketing, SEO & GEO Agency | Website Vikreta',
  description:
    'SEO, AEO and content systems built to bring in leads, not impressions. Get found in Google and cited by ChatGPT, Perplexity and Google AI. Free growth call.',
  keywords: [
    'digital marketing agency',
    'SEO agency Pune',
    'GEO AI search optimization',
    'answer engine optimization',
    'content marketing agency',
    'local SEO services',
    'search engine optimization services',
    'schema and entity SEO',
    'AI search visibility agency',
    'SEO and AI answer engine optimization agency',
    'local SEO for small business',
    'content marketing that compounds organic traffic',
  ],
  h1: ['Found in Google.', 'Cited by AI.'],
  lead:
    'SEO, AEO and content systems that bring in leads, not impressions. One team from the first audit to the work that keeps compounding.',
  answerQ: 'What does our SEO & GEO work cover?',
  answer:
    'Three connected services. [SEO foundations](/services/digital-marketing/seo-foundations) make the site fast, crawlable and clear so it can rank. [AEO & GEO](/services/digital-marketing/aeo-geo) turn that same site into a source answer engines like ChatGPT, Perplexity and Google AI can quote. [Content systems](/services/digital-marketing/content-systems) keep publishing useful pages that earn both. We report on leads and revenue where we can trace them, not keyword positions with no context, and we do not run paid ad campaigns or manage ad spend.',
  services: ['seo-foundations', 'aeo-geo', 'content-systems'],
  reading: SEO_READING,
  updated: '2026-11-24',
  faqs: [
    {
      q: 'How long until we see SEO results?',
      a: 'Most sites see movement in 3 to 6 months, with the first few months spent on technical fixes and content that has not had time to rank yet. Competitive niches can take longer. Anyone promising page-one rankings in 30 days is selling something that will not hold up.',
    },
    {
      q: 'What is GEO, and do I need it?',
      a: 'GEO, or generative engine optimization, is making your business easy for AI tools like ChatGPT, Perplexity and Gemini to cite when someone asks for a recommendation. More people ask AI instead of searching Google. If competitors appear in those answers and you do not, you lose leads that never show up in Analytics.',
    },
    {
      q: 'How long does AI search visibility take?',
      a: 'There is no reliable published timeline, and estimates range from weeks to several months. Crawlable pages, clear structure, factual answers and named entities help both Google and AI tools, so we treat GEO as a parallel track to SEO, not a quick fix.',
    },
    {
      q: 'Do you track citations in AI answers?',
      a: 'Yes. Alongside leads and revenue, we check whether ChatGPT, Perplexity and Gemini cite your business for the prompts that matter, and share those reports over time so you can see how visibility changes. No one can guarantee a citation — we improve the signals and measure what happens.',
    },
    {
      q: 'Do you guarantee rankings or traffic?',
      a: 'No. Nobody can honestly promise a position on Google or a mention in an AI answer, because those depend on platforms we do not control. We commit to the inputs we do control: technical fixes, useful content and clear reporting tied to the leads you receive.',
    },
    {
      q: 'Do you run paid ads on Meta or Google?',
      a: 'No. We do not run paid ad campaigns or manage ad spend. We do create ad creatives, including AI UGC video ads, hooks and scripts, through [AI Content & Ads](/services/ai/ai-content-ads). Our marketing work is SEO, GEO and content.',
    },
  ],
}

export const SERVICES: Service[] = [
  {
    slug: 'seo-foundations',
    name: 'SEO Foundations',
    navLabel: 'SEO',
    title: 'Technical and Local SEO Services | Website Vikreta',
    description:
      'Technical SEO, on-page structure and local search, done so Google can crawl, understand and rank your site. Reported on leads, not impressions.',
    h1: ['A site Google', 'can actually read.'],
    lead: 'Technical fixes, clear page structure and local search signals. The boring work that decides whether anything else you publish gets found.',
    answerQ: 'What are SEO foundations?',
    answer:
      'SEO foundations are the things that have to be right before content or links can do much: crawlable pages, clean indexation, sensible URLs and headings, fast loads, and a Google Business Profile that matches the rest of your site. We audit what is broken, fix it in stages, and tie the work to enquiries rather than keyword positions.',
    usp: 'Fix the site first. Rankings and enquiries follow.',
    heroSub: 'A crawl audit, a fix list and a local presence that matches your site.',
    steps: [
      { title: 'Audit', body: 'Pull Search Console, GA4 and the current site. Find what is blocking crawl, speed and conversions.' },
      { title: 'Fix', body: 'Work through indexation, page structure, internal links and Core Web Vitals in stages.' },
      { title: 'Local signals', body: 'Align the Google Business Profile, service pages, citations and reviews with what you actually do.' },
      { title: 'Report', body: 'Show enquiries, cost per lead and revenue where we can trace it. Cut what does nothing.' },
    ],
    faqs: [
      { q: 'Do you work on an existing site?', a: 'Yes. Most of this work is auditing and fixing what is already live, not rebuilding from scratch.' },
      { q: 'Will you change my site without asking?', a: 'No. You approve the fix list and the changes before anything ships.' },
      { q: 'How fast is a fast site?', a: 'We work to Core Web Vitals thresholds and real device tests, not a vanity score. The target is pages that load before a visitor gives up.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No. We commit to the fixes and the reporting, not to a position Google decides.' },
    ],
    tools: ['google', 'googlesheets', 'googledrive', 'wordpress', 'hubspot'],
    industries: ['Local services', 'Professional practices', 'B2B services', 'Ecommerce'],
    reading: SEO_READING,
    subServices: [
      {
        slug: 'technical-seo',
        name: 'Technical SEO',
        oneLiner: 'Make every page crawlable, fast and easy to understand.',
        answer:
          'We check how search engines actually reach your pages, then fix what stops them: indexation, robots and sitemap rules, duplicate URLs, broken internal links, slow templates and thin or confusing page structure. Each change is logged and re-checked after release.',
        deliverables: [
          'Crawl and indexation audit with a prioritised fix list',
          'Sitemap, robots and canonical rules cleaned up',
          'Page structure, headings and internal linking improvements',
          'Core Web Vitals fixes on the templates that matter',
          'Before-and-after re-crawl after release',
        ],
        excludes: ['Website rebuilds', 'Paid ad spend or ad account management', 'Guaranteed rankings'],
        steps: [
          { title: 'Crawl', body: 'Pull the site as a search engine sees it and list blockers by impact.' },
          { title: 'Fix in stages', body: 'Ship the highest-impact changes first so you can see what moved.' },
          { title: 'Verify', body: 'Re-crawl, check Search Console coverage and confirm the fixes held.' },
        ],
        faqs: [
          { q: 'What access do you need?', a: 'Search Console and GA4 at minimum. Server or CMS access is needed for template-level fixes.' },
          { q: 'Do I need a new website?', a: 'Usually not. We fix the site you have unless the platform itself is the blocker.' },
        ],
        kpi: 'Clean crawl, faster pages and a measurable fix list',
        timeToLive: 'First fixes inside the first month',
        reading: SEO_READING,
        page: true,
      },
      {
        slug: 'local-seo',
        name: 'Local SEO',
        oneLiner: 'Show up when someone nearby searches for what you do.',
        answer:
          'Local search runs on consistency. We align your Google Business Profile, service-area pages, citations and reviews so Google sees the same business everywhere, and the person searching sees one clear reason to call you.',
        deliverables: [
          'Google Business Profile audit and completion',
          'Service-area and location pages written to convert',
          'Citation cleanup across the directories that matter',
          'Review request flow your team can keep running',
          'Local enquiry reporting instead of impression counts',
        ],
        excludes: ['Buying reviews', 'Fake listings', 'Paid local ad management'],
        steps: [
          { title: 'Check', body: 'Find where your business details disagree across the web.' },
          { title: 'Align', body: 'Fix the profile, pages and citations so they tell one story.' },
          { title: 'Ask', body: 'Put a simple review request into the jobs you already complete.' },
        ],
        faqs: [
          { q: 'Do I need a physical office?', a: 'No. Service-area businesses can rank locally as long as the profile and pages match the areas you actually serve.' },
          { q: 'Can you get us into the map pack?', a: 'We improve the signals that feed it. Nobody controls the final position.' },
        ],
        kpi: 'One consistent local presence across search and maps',
        timeToLive: 'Profile and page fixes in the first month',
        reading: SEO_READING,
        page: true,
      },
    ],
  },
  {
    slug: 'aeo-geo',
    name: 'AEO & GEO',
    navLabel: 'AEO & GEO',
    title: 'AEO and GEO Services | Get Cited by AI | Website Vikreta',
    description:
      'Answer engine and generative engine optimization. Make your business the source ChatGPT, Perplexity and Google AI quote when buyers ask for a recommendation.',
    h1: ['Get cited in', 'the AI answer.'],
    lead: 'Buyers ask ChatGPT, Perplexity and Google AI before they search. We make your site the source those answers quote.',
    answerQ: 'What is AEO and GEO?',
    answer:
      'AEO, or answer engine optimization, and GEO, or generative engine optimization, are the work of making your business easy for AI tools to understand and cite. It rests on clear answers, structured data, consistent entity details and a site crawlers can read. We check where you appear now, fix the signals, then check again. No one can guarantee a citation.',
    usp: 'Clear answers, structured data and entity signals AI can quote.',
    heroSub: 'A visibility baseline, answer-first pages and a citation check you can see.',
    steps: [
      { title: 'Check', body: 'Run the prompts buyers actually ask across ChatGPT, Perplexity and Google AI. Record who gets cited.' },
      { title: 'Make it answerable', body: 'Put direct answers, facts and sources on the pages those tools read.' },
      { title: 'Add structure', body: 'Schema markup and consistent entity details so the business is unambiguous.' },
      { title: 'Check again', body: 'Re-run the same prompts and report what changed, honestly.' },
    ],
    faqs: [
      { q: 'Can you guarantee a ChatGPT citation?', a: 'No. Answer engines choose their own sources. We improve the signals they use and check where you appear.' },
      { q: 'Is this different from SEO?', a: 'They share a base: clear content, good structure and a fast, crawlable site. AEO and GEO add answer-first writing, schema and entity signals aimed at AI answers.' },
      { q: 'Which engines do you check?', a: 'ChatGPT, Perplexity and Google AI, using the prompts that matter in your category.' },
      { q: 'Do I need this if I already rank on Google?', a: 'Ranking and being cited are different outcomes. We check both before recommending work.' },
    ],
    tools: ['openai', 'gemini', 'google', 'googlesheets', 'notion'],
    industries: ['B2B services', 'Professional practices', 'Local services', 'Ecommerce'],
    reading: SEO_READING,
    subServices: [
      {
        slug: 'ai-visibility-check',
        name: 'AI Visibility Check',
        oneLiner: 'Find out what AI says about your category today.',
        answer:
          'We build a short list of prompts real buyers use in your category, run them across ChatGPT, Perplexity and Google AI, and record which businesses get cited and which pages those answers lean on. You get a baseline you can re-run after the fixes, not a one-off screenshot.',
        deliverables: [
          'A prompt set based on how buyers actually ask',
          'Results from ChatGPT, Perplexity and Google AI',
          'The sources each answer cites, including competitors',
          'A short list of gaps on your own site',
          'The same check re-run after changes ship',
        ],
        excludes: ['Guaranteed inclusion in AI answers', 'Paid placement inside AI tools', 'Ad spend management'],
        steps: [
          { title: 'Build the prompts', body: 'Agree the questions buyers ask before they know your brand.' },
          { title: 'Run the check', body: 'Record answers and cited sources across the three engines.' },
          { title: 'Close the gaps', body: 'Turn what is missing into answer-first pages and structure.' },
        ],
        faqs: [
          { q: 'Is the check really free?', a: 'The first baseline is free. The follow-up work is scoped from what the check finds.' },
          { q: 'How often should we re-run it?', a: 'Monthly during active work is enough to see movement without chasing noise.' },
        ],
        kpi: 'A baseline you can re-run and compare',
        timeToLive: 'First baseline in week one',
        reading: SEO_READING,
        page: true,
      },
      {
        slug: 'schema-entity-seo',
        name: 'Schema & Entity SEO',
        oneLiner: 'Make it unambiguous who you are and what you do.',
        answer:
          'AI tools and search engines need to know that the name, address, people and services on your site all refer to the same business. We add the right structured data, clean up inconsistent details and connect the pages that describe your organisation, people and offerings.',
        deliverables: [
          'Organization, Person, Service and FAQ schema where they fit',
          'Consistent name, address, phone and service details',
          'Author and about-page signals with real people',
          'Internal links that connect services to evidence',
          'Validation after release',
        ],
        excludes: ['Fake author profiles', 'Markup with no matching visible content', 'Guaranteed knowledge panels'],
        steps: [
          { title: 'Map', body: 'List the entities that describe your business and where they appear.' },
          { title: 'Mark up', body: 'Add schema that matches what is actually visible on the page.' },
          { title: 'Validate', body: 'Test the markup and re-check the entity details across the site.' },
        ],
        faqs: [
          { q: 'Does schema guarantee a rich result?', a: 'No. It makes your content easier to parse. The platform decides what to display.' },
          { q: 'Will you invent author bios?', a: 'No. We use the real people attached to the work.' },
        ],
        kpi: 'One consistent, machine-readable business identity',
        timeToLive: 'Core markup in the first month',
        reading: SEO_READING,
        page: true,
      },
    ],
  },
  {
    slug: 'content-systems',
    name: 'Content Systems',
    navLabel: 'Content',
    title: 'SEO Content Systems That Keep Working | Website Vikreta',
    description:
      'A blog and content pipeline built around real search demand. Researched, written for people, human-edited and refreshed so it keeps ranking and getting cited.',
    h1: ['Content that keeps', 'working after launch.'],
    lead: 'A pipeline, not a retainer that stops producing the day you cancel. We research demand, publish useful pages and keep them current.',
    answerQ: 'What is a content system?',
    answer:
      'A content system is a repeatable way to find what people ask, answer it properly, link it to the rest of your site and refresh it when facts change. We research demand first, write with linked sources and a human edit, publish on a cadence your team can maintain, and report on the enquiries the content actually brings in.',
    usp: 'A pipeline that keeps earning after launch.',
    heroSub: 'Research, a real publishing cadence and updates that protect what already ranks.',
    steps: [
      { title: 'Research', body: 'Find the questions buyers ask and the pages already winning them.' },
      { title: 'Plan', body: 'One calendar of topics mapped to services, search intent and internal links.' },
      { title: 'Publish', body: 'Draft with sources, edit for accuracy and voice, then get your approval.' },
      { title: 'Compound', body: 'Refresh what slips, expand what works and keep the internal links current.' },
    ],
    faqs: [
      { q: 'Will the content sound like us?', a: 'We set the voice with you first and nothing goes live without your approval.' },
      { q: 'Do you use AI to write?', a: 'Where it helps with drafts and repurposing, yes. Every post gets research, linked sources and a human edit. For volume production, see Content Automation under AI Content & Ads.' },
      { q: 'What do you report on?', a: 'Enquiries and revenue where we can trace them, plus rankings and citations as leading indicators.' },
    ],
    tools: ['wordpress', 'googlesheets', 'googledrive', 'notion', 'hubspot'],
    industries: ['B2B services', 'Professional practices', 'Ecommerce', 'Local services'],
    reading: SEO_READING,
    subServices: [
      {
        slug: 'seo-blog-content',
        name: 'SEO Blog Content',
        oneLiner: 'Posts written for the question, not the keyword count.',
        answer:
          'Each post starts with a real search need and the sources needed to answer it. We draft, check facts, link to your services and get your approval before publishing. The goal is a page that earns a ranking, a citation and an enquiry.',
        deliverables: [
          'Topic and intent research before writing',
          'A draft with linked sources and a clear answer up front',
          'Human edit for accuracy, voice and usefulness',
          'Internal links to the relevant service pages',
          'Your approval before anything goes live',
        ],
        excludes: ['Keyword-stuffed filler', 'Publishing without approval', 'Paid distribution'],
        steps: [
          { title: 'Research', body: 'Confirm the question, the intent and what is already ranking.' },
          { title: 'Draft', body: 'Write the answer with sources, then edit for facts and voice.' },
          { title: 'Publish', body: 'Add internal links and publish once you approve.' },
        ],
        faqs: [
          { q: 'Who approves the draft?', a: 'You do. Nothing publishes before that sign-off.' },
          { q: 'Can AI write the first draft?', a: 'Where it helps. The research, sources and final edit are human, and you approve the result.' },
        ],
        kpi: 'Pages that answer a real question and link to your services',
        timeToLive: 'First drafts in the first month',
        reading: SEO_READING,
        page: true,
      },
      {
        slug: 'content-refresh',
        name: 'Content Refresh',
        oneLiner: 'Bring old posts back to current, useful and findable.',
        answer:
          'Pages that used to rank lose ground when facts age and competitors publish newer answers. We update the content, add what has changed, fix the internal links and re-publish with a real update date, then watch whether the page recovers.',
        deliverables: [
          'Audit of pages losing traffic or showing stale facts',
          'Rewritten sections with current sources',
          'Updated internal links and calls to action',
          'A visible, honest update date',
          'Post-release tracking against the previous baseline',
        ],
        excludes: ['Changing posts with no evidence they need it', 'Fake update dates', 'Guaranteed recovery'],
        steps: [
          { title: 'Find', body: 'Pick pages with declining traffic or outdated information.' },
          { title: 'Update', body: 'Correct the facts, improve the answer and reconnect the links.' },
          { title: 'Track', body: 'Compare against the baseline and decide what needs more work.' },
        ],
        faqs: [
          { q: 'Which posts do you refresh first?', a: 'The ones that already have traffic or links and have slipped, because they are cheapest to bring back.' },
          { q: 'Do you change the publish date?', a: 'We show a real update date. We do not pretend an old page is new.' },
        ],
        kpi: 'Current pages that still deserve their rankings',
        timeToLive: 'First batch reviewed in week two',
        reading: SEO_READING,
        page: true,
      },
    ],
  },
]

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)
export const getSubService = (service: string, slug: string) =>
  getService(service)?.subServices.find((s) => s.slug === slug && s.page)

export const serviceParams = () => SERVICES.map((s) => ({ service: s.slug }))
export const subParams = () =>
  SERVICES.flatMap((s) => s.subServices.filter((p) => p.page).map((p) => ({ service: s.slug, sub: p.slug })))
