export interface FaqItem {
  id: string
  question: string
  answer: string
  /** Optional internal route for a "Read more" link. */
  href?: string
}

/**
 * schema.org FAQPage for a set of questions. The primary way search engines and
 * AI answer engines consume an FAQ block — emit it anywhere questions render.
 * One FAQPage per page: don't call this twice on the same route.
 */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export const FAQ_GROUPS: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: 'working-with-us',
    title: 'Working with us',
    items: [
      {
        id: '1',
        question: 'What does Website Vikreta actually do?',
        answer:
          'Website Vikreta is an AI-first agency that builds AI automations, websites, web and mobile apps and UI/UX design, and runs digital marketing through SEO, GEO and content. We also stay on to maintain what we build. It is one team from first call to long-term support, so you do not hand work between agencies.',
        href: '/services',
      },
      {
        id: '4',
        question: 'Do you only build websites, or do you handle AI automation too?',
        answer:
          'We do both with the same team. We build the website, then the systems that run behind it: workflow automation, AI voice and WhatsApp agents, content and finance automations. Because it is one team, nothing gets lost in a handoff to a second agency halfway through a project.',
        href: '/services/ai-automations',
      },
      {
        id: '5',
        question: 'What\'s your process like?',
        answer:
          'We work in four stages: discovery, design, build, launch. You approve pieces along the way instead of waiting for one big reveal. For AI automation the steps are a 20-minute call, mapping the steps and tools, building and testing on your real cases, then running it in your accounts while we monitor.',
        href: '/services/ai-automations',
      },
      {
        id: '6',
        question: 'Do I need to know exactly what I want before reaching out?',
        answer:
          'No. Most people who contact Website Vikreta have a problem, not a spec sheet, such as slow lead replies or a site that does not convert. On the first call we ask what eats your week, then shape the solution with you and write down the steps for you to sign off.',
        href: '/contact',
      },
      {
        id: '10',
        question: 'How do we get started?',
        answer:
          'Book a call. It runs about 20 minutes: you tell us what is slowing the business down, and we tell you honestly whether we are a fit. If we are, you get a scope and a timeline.',
        href: '/contact',
      },
      {
        id: 'hire-agency-or-in-house',
        question: 'Should I hire an agency or build AI automation in-house?',
        answer:
          'Hire an agency when nobody on your team has the time or skill to design, test and monitor the workflows. Build in-house if you already have a technical person with spare capacity. Website Vikreta builds inside your accounts, so you can take it over later. Our own company runs on these automations.',
        href: '/services/ai-automations',
      },
      {
        id: 'choose-an-agency',
        question: 'How do I choose the right AI automation or web agency?',
        answer:
          'Ask four things: who owns the work after the project, what a dated delivery looks like, what support you get after launch, and who fixes it when it breaks. Then ask to see real results. Our proof is on the work page, including a client partnership that has run for more than three years and measured time saved.',
        href: '/work',
      },
      {
        id: 'clients-outside-india',
        question: 'Do you work with clients outside India?',
        answer:
          'Yes. Website Vikreta is based in India and has served clients across the globe since it started as a web development agency. We work in IST, but we manage overlap for every region across the globe. Tell us your time zone on the first call and we agree how to stay in touch.',
        href: '/about',
      },
      {
        id: 'communication-channels',
        question: 'How do we communicate during a project?',
        answer:
          'We talk on WhatsApp, Google Workspace (Meet) and email. If your team prefers Slack, or needs Microsoft Teams, we use that instead. You agree the channel on the first call, so updates reach you where your team already works.',
        href: '/contact',
      },
      {
        id: '8',
        question: 'What industries and business sizes do you work with?',
        answer:
          "We work with medical and healthcare, D2C, D2B2C, D2D2C, e-commerce, crypto, AI SaaS, fintech, last-mile delivery and quick commerce businesses, and more. Our work includes furniture e-commerce and garage services, plus a design partnership that has run more than three years.",
        href: '/work',
      },
    ],
  },
  {
    id: 'payments-and-contracts',
    title: 'Payments and contracts',
    items: [
      {
        id: '2',
        question: 'How much does a project cost?',
        answer:
          'We quote on a call, after we understand your scope. Every project is different, so we handle pricing in conversation instead of publishing a rate card. Book a call, tell us what you want built, and we come back with a clear quote based on your real needs.',
        href: '/contact',
      },
      {
        id: 'payment-terms',
        question: 'How does payment work?',
        answer:
          'We take an advance of 20 to 40 percent, depending on your requirements, and split the rest into milestones. You can pay by SWIFT international transfer, direct bank transfer or UPI. The schedule is agreed in writing before work starts.',
        href: '/contact',
      },
      {
        id: 'fixed-price-or-retainer',
        question: 'Do you work on fixed projects, retainers or consulting?',
        answer:
          'All three. Websites, apps and automation builds are usually fixed projects. Ongoing work runs as a retainer, billed yearly. We also offer consulting for teams that are not sure where to start, and we offer free audits depending on your business need.',
        href: '/contact',
      },
      {
        id: 'contract-nda',
        question: 'Do I sign a contract or NDA?',
        answer:
          'Yes. Website Vikreta signs contracts and NDAs, governed by the laws of India. Scope, deliverables, timeline and ownership are written down before work begins. If you need an NDA signed first, say so on the first call.',
        href: '/contact',
      },
      {
        id: 'tool-costs-included',
        question: 'Are tool and platform subscriptions part of the project?',
        answer:
          'No. Subscriptions you own, such as Make, n8n, HubSpot, QuickBooks or your e-signature tool, are billed by those vendors. Usage fees for phone, AI models and Meta WhatsApp messages are also separate where they apply. We tell you what you will need before you commit.',
        href: '/services/ai-automations/whatsapp-automation',
      },
      {
        id: 'refunds',
        question: 'Do you offer refunds?',
        answer:
          'No. We do not offer refunds on any of our services. That is why we agree scope, deliverables and milestones in writing before work starts, and why you review working pieces as we build instead of waiting for one final delivery.',
        href: '/contact',
      },
      {
        id: 'guarantee',
        question: 'Do you offer a guarantee on results?',
        answer:
          "We guarantee the work, not outside results. That means a defined scope, testing on your real cases, a person approving risky steps, and fixes after launch. Past results are on our work page, with numbers we can stand behind.",
        href: '/work',
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI automation',
    items: [
      {
        id: 'what-is-ai-automation',
        question: 'What is AI automation, in plain words?',
        answer:
          'AI automation is software that does your repeat work, like answering calls, writing offer letters, scheduling posts and chasing invoices, inside your own accounts. You message it in plain words, like a group chat. Website Vikreta builds, tests and monitors it so you do not write code.',
        href: '/services/ai-automations',
      },
      {
        id: 'what-can-you-automate',
        question: 'What can you automate in my business?',
        answer:
          "We automate sales, HR, content and finance work: missed calls and slow lead replies, invoice chasing, offer letters and contracts, blog and social content, proposals, and copy-paste data between apps. We also create ad creatives such as AI UGC video ads. Each has its own product page with its own timeline and limits.",
        href: '/services/ai-automations',
      },
      {
        id: 'ai-automation-timeline',
        question: 'How long does it take to build an AI automation?',
        answer:
          'Most projects go live in about 14 days. Single flows such as offer letters take about a week. Voice agents take 1 to 2 weeks, and custom agents about 3 weeks. You get a date after the mapping step, not before.',
        href: '/services/ai-automations/hr-automation/offer-letter-automation',
      },
      {
        id: 'ai-automation-tools',
        question: 'What tools does AI automation work with?',
        answer:
          'Most tools you already use: Gmail, Google Workspace, Slack, WhatsApp, HubSpot, Zoho, Salesforce, QuickBooks, Stripe, Airtable and Notion. If a tool has an API or a connector, we can plug it in. If it does not, we say so up front.',
        href: '/services/ai-automations/workflow-automation',
      },
      {
        id: 'zapier-make-n8n',
        question: 'Should I use Zapier, Make, n8n or custom code?',
        answer:
          'Make and n8n suit most small teams: more control and lower cost at volume. Zapier is simple but gets pricey as usage grows. Custom code is for odd cases. We choose by volume and the tools involved, and we build in accounts you own.',
        href: '/blog/ai-and-automation/make-vs-n8n-vs-custom-code',
      },
      {
        id: 'which-ai-models',
        question: 'Which AI models and tools do you use?',
        answer:
          'We use OpenAI, Claude, Gemini, Perplexity, Llama, Flux and ElevenLabs for models, and Make.com, n8n, Microsoft Power Apps and Power Automate for workflows, among others. We are tool-agnostic and pick what fits the job. AI only sees the fields it needs, and sensitive steps wait for a human.',
        href: '/services/ai-automations',
      },
      {
        id: 'data-safety',
        question: 'Is my business data safe with AI automation?',
        answer:
          'Workflows run in your own accounts, so your data is not copied into ours. We use least-access permissions, keep a run log of every step, and put sensitive actions behind human approval. Contracts and NDAs cover confidentiality, and you can revoke access at any time.',
        href: '/services/ai-automations/workflow-automation',
      },
      {
        id: 'human-approval',
        question: 'Will AI send emails, invoices or contracts without my approval?',
        answer:
          'Not for anything risky. Payments, contracts, offers and proposals wait for a person to approve before they leave your account. Routine, low-risk posts can run automatically once you set that rule. If a person would hesitate, the automation pauses.',
        href: '/blog/ai-and-automation/establishing-human-oversight-automation',
      },
      {
        id: 'ai-talks-to-customers',
        question: 'Can AI talk to my customers on calls and WhatsApp?',
        answer:
          'Yes. We build AI voice agents that answer and book calls, and WhatsApp and chat agents that reply to leads in seconds. They always say they are AI. Calls and messages need consent first, and anything the agent cannot answer is handed to a person with a transcript.',
        href: '/services/ai-automations/ai-voice-agents',
      },
      {
        id: 'whatsapp-allowed',
        question: "Is WhatsApp automation allowed?",
        answer:
          "Yes, through the official WhatsApp Business API. Tools that automate the regular consumer app break WhatsApp rules and risk a ban. Customers must opt in before you message them. Meta's message fees are billed by Meta separately.",
        href: '/services/ai-automations/whatsapp-automation',
      },
      {
        id: 'automation-breaks',
        question: 'What happens if the automation breaks?',
        answer:
          'We get alerted on failures, and the run pauses instead of sending bad data. We fix issues within a day or two of you reporting them. If an app changes its API, we update the workflow. This monitoring is what a plain Zapier subscription does not give you.',
        href: '/services/ai-automations/workflow-automation',
      },
      {
        id: 'automation-results',
        question: 'What results have your AI automations delivered?',
        answer:
          'At Simpli Home, automating bulk media generation in Figma Buzz saved the team about 11 hours a week, which went back into creative work. We also run Website Vikreta itself on these automations: offer letters, LinkedIn scheduling and invoicing.',
        href: '/work/case-studies',
      },
      {
        id: 'not-included',
        question: 'What is not included in your AI automation work?',
        answer:
          'Legal advice, payroll decisions, hiring decisions, fake reviews, medical advice, and calls or messages to people who have not opted in. We do not auto-reject candidates and we do not message purchased lists. Anything involving payments or contracts waits for your approval.',
        href: '/services/ai-automations',
      },
    ],
  },
  {
    id: 'websites',
    title: 'Websites',
    items: [
      {
        id: '3',
        question: 'How long does a typical project take?',
        answer:
          "Websites take 1 to 2 weeks because we build new sites with an agentic, AI-assisted development framework. SmartPhysio, Yeto, CareLift and APCleanCo were built this way. CRM and mobile app MVPs also take 1 to 2 weeks, and most AI automations go live in about 14 days. Larger systems take longer. You get a firm date once we have scoped the work.",
        href: '/services/web-development',
      },
      {
        id: 'website-stack',
        question: 'What do you build websites with: WordPress, Shopify or custom code?',
        answer:
          'We work on any stack you need, including WordPress, Webflow and Shopify. Our preferred approach is custom code with Next.js, and we are comfortable with everything. We pick the platform that fits your goal instead of forcing one stack.',
        href: '/services/web-development',
      },
      {
        id: 'redesign-or-refresh',
        question: 'We already have a website. Do we need to start over?',
        answer:
          'Not always. A rebuild makes sense for slow loads, broken mobile or no SEO structure. A focused refresh of speed, structure and conversion paths is enough in other cases. After a quick look, we tell you honestly which one you are.',
        href: '/services/web-development',
      },
      {
        id: 'domain-hosting',
        question: 'Who holds the domain and hosting?',
        answer:
          'The domain can be registered in your name. Hosting depends on what you buy: if you buy hosting, it is in your name. If you choose shared hosting, it runs on Website Vikreta servers.',
        href: '/services/web-development',
      },
    ],
  },
  {
    id: 'apps-and-crm',
    title: 'Apps and CRM',
    items: [
      {
        id: 'custom-crm-or-hubspot',
        question: 'Should I build a custom CRM or use HubSpot or Zoho?',
        answer:
          'Use an off-the-shelf CRM when your sales process looks like most others. Build custom when your workflow is specific, leads, orders and ops need to live in one place, or per-seat fees keep growing. We build both, and we also automate HubSpot and Zoho through Make or n8n.',
        href: '/services/web-mobile-app-development',
      },
      {
        id: 'app-types',
        question: 'What kinds of web and mobile apps do you build?',
        answer:
          'We build custom CRMs and internal tools, customer and partner portals, and e-commerce and mobile apps. For mobile we build cross-platform or native as needed, using React Native, Flutter or native code, and we handle App Store and Google Play publishing.',
        href: '/services/web-mobile-app-development',
      },
      {
        id: 'app-timeline',
        question: 'How long does it take to build a custom app or CRM?',
        answer:
          'A CRM MVP or mobile app MVP takes 1 to 2 weeks, depending on scope. We map the data model, flows and screens first, then ship in stages. You review working screens as we go instead of waiting for a single launch day.',
        href: '/services/web-mobile-app-development',
      },
      {
        id: 'migrate-spreadsheets',
        question: 'Can you move our spreadsheets and old systems into a new app?',
        answer:
          'Yes. We start by mapping how the work happens today: the sheets, tools and handoffs. At launch we migrate your data and hand the system to your team. We look at your current systems before promising a specific integration.',
        href: '/services/web-mobile-app-development',
      },
      {
        id: '9',
        question: 'Can you work with our existing tools and tech stack?',
        answer:
          'Yes. We work on any stack you need, and we have built on Shopify, the WhatsApp Business API and delivery-partner integrations. We connect to HubSpot, Zoho, Google Workspace, Slack and more. We work with what you have instead of asking you to start over.',
        href: '/services/ai-automations/workflow-automation',
      },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX design',
    items: [
      {
        id: 'uiux-deliverables',
        question: 'What do I get from a UI/UX design engagement?',
        answer:
          'You get user flows, high-fidelity UI, a component library in your stack (Figma or code), and handoff docs covering spacing, states and breakpoints. It is a working design system your developers can build from, not just mockups.',
        href: '/services/uiux-design',
      },
      {
        id: 'uiux-timeline',
        question: 'How long does UI/UX design take?',
        answer:
          "A focused flow, such as checkout or onboarding, takes 1 to 2 weeks. A full product UI with a design system takes longer, depending on surface area and review cycles. You get a firm date once we have scoped the work.",
        href: '/services/uiux-design',
      },
      {
        id: 'uiux-testing-brand',
        question: 'Do you run user testing, and can you design for our existing developers and brand?',
        answer:
          'Yes to both. We run moderated or unmoderated tests when the timeline allows, plus analytics review. We design for buildability so your team can implement, or we partner on front-end, and we extend your existing tokens, type and components unless you ask for a reset.',
        href: '/services/uiux-design',
      },
      {
        id: 'design-system-proof',
        question: 'Have you built a design system for a live product?',
        answer:
          'Yes. For Sustainable Bitcoin Protocol we started at the foundation: information architecture, core flows and a scalable design system, then shipped iteratively. The partnership has run for more than three years.',
        href: '/work/case-studies',
      },
    ],
  },
  {
    id: 'seo-geo-marketing',
    title: 'SEO, GEO and marketing',
    items: [
      {
        id: 'seo-timeline',
        question: 'How long does SEO take to show results?',
        answer:
          'Most sites see movement in 3 to 6 months, with the first months spent on technical fixes and content that has not had time to rank. Competitive niches can take longer. Anyone promising page-one rankings in 30 days is selling something that will not hold up.',
        href: '/services/digital-marketing',
      },
      {
        id: 'what-is-geo',
        question: 'What is GEO, and do I need it?',
        answer:
          'GEO, or generative engine optimization, is making your business easy for AI tools like ChatGPT, Perplexity and Gemini to cite when someone asks for a recommendation. More people ask AI instead of searching Google. If competitors appear in those answers and you do not, you lose leads that never show in Analytics.',
        href: '/services/digital-marketing',
      },
      {
        id: 'geo-timeline',
        question: 'How long does GEO or AI search visibility take?',
        answer:
          'There is no reliable published timeline, and industry estimates range from weeks to several months. Crawlable pages, clear structure, factual answers and named entities help both Google and AI tools, so we treat GEO as a parallel track to SEO, not a quick fix.',
        href: '/services/digital-marketing',
      },
      {
        id: 'geo-tracking',
        question: "How do you report results, and do you track AI search citations?",
        answer:
          "We report on leads and revenue where we can trace them, not vanity metrics like impressions. For GEO we also track whether ChatGPT, Perplexity and Gemini cite your business, and share those AI-search citation reports over time so you can see how visibility changes.",
        href: '/services/digital-marketing',
      },
      {
        id: 'seo-guarantee',
        question: 'Do you guarantee rankings or traffic?',
        answer:
          "No. Nobody can honestly promise a position on Google or a mention in an AI answer, because those depend on platforms we do not control. We commit to the inputs we do control: technical fixes, useful content and clear reporting tied to the leads you receive.",
        href: '/services/digital-marketing',
      },
      {
        id: 'ai-blog-posts',
        question: 'Can AI write blog posts that rank on Google?',
        answer:
          'Yes, if the post is useful, accurate and written for a real search need. Google does not ban AI content; it ranks quality. Our content automation adds research, linked sources and a human edit on every post, and nothing goes live without your approval.',
        href: '/services/ai-automations/content-automation',
      },
      {
        id: 'paid-ads',
        question: 'Do you run paid ads on Meta or Google?',
        answer:
          'No, Website Vikreta does not run paid ad campaigns or manage ad spend on Meta, Google or other platforms. We do create ad creatives, including AI UGC video ads, spokesperson videos, hooks and scripts, and bulk ad variations, which your team or media buyer runs. Our marketing work is SEO, GEO and content.',
        href: '/services/ai-automations/ai-ugc-ads',
      },
    ],
  },
  {
    id: 'support-and-ownership',
    title: 'Support and ownership',
    items: [
      {
        id: '7',
        question: 'What happens after the site or system launches?',
        answer:
          'Every project includes support, and the terms are written into your contract. Launch is when monitoring and fixing starts, and AI systems especially need tuning once real usage begins. For automations we watch runs and fix what breaks, including updates when an app changes its API.',
        href: '/services/ai-automations',
      },
      {
        id: 'fix-response',
        question: 'How fast do you fix problems after launch?',
        answer:
          'We fix issues within a day or two of you reporting them. Support is part of every project, and the terms are written into your contract.',
        href: '/contact',
      },
      {
        id: '11',
        question: 'Do you offer ongoing maintenance, or just one-time builds?',
        answer:
          'Both. Some clients want a one-time build and then run it themselves. Others keep Website Vikreta on for updates, monitoring and support. It is your call, and what we build stays in your accounts either way.',
        href: '/contact',
      },
      {
        id: 'who-owns-automations',
        question: "Who owns the website, code, automations and data we pay for?",
        answer:
          "You do. After full payment you own everything: the code, designs and content. Automations run in your own accounts under your logins. The site does not depend on us to keep running, there are no licensing fees, and there is no lock-in if you stop working with us.",
        href: '/services/ai-automations/workflow-automation',
      },
      {
        id: 'handover',
        question: 'What do we get at handover?',
        answer:
          'Everything in scope: source code, technical documentation, server handover, design files, Figma files and research files. We also run a knowledge-transfer session so your team knows how it all fits together.',
        href: '/contact',
      },
    ],
  },
]

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items)
