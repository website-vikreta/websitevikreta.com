import type { Faq } from './types'

export type Pillar = {
  slug: string
  name: string
  title: string
  description: string
  h1: string[]
  lead: string
  answerQ: string
  answer: string
  /** Branch slugs, in display order. Empty for pillars that route outside the section. */
  branches: string[]
  /** Pages outside /services/ai that this pillar routes to. */
  links?: { label: string; href: string; blurb: string }[]
  /** Blog posts to show in Keep reading. */
  reading?: string[]
  faqs: Faq[]
}

export const PILLARS: Pillar[] = [
  {
    slug: 'conversational-ai',
    name: 'Conversational AI',
    title: 'Conversational AI for Business | Website Vikreta',
    description: 'AI voice agents, WhatsApp automation and conversational commerce. They answer, qualify and sell on calls and chat. Done for you, labeled as AI.',
    h1: ['AI that talks', 'to your customers.'],
    lead: 'Voice agents, WhatsApp and chat that answer fast, qualify leads and sell. Every AI voice is labeled AI, and a person takes over when it matters.',
    answerQ: 'What is conversational AI for business?',
    answer:
      'Conversational AI is software that talks with your customers by voice or text. It answers calls, replies on WhatsApp and web chat, qualifies leads, books appointments and helps people buy. It runs on your own scripts, tools and rules. A person can step in at any point. We build and run it for you.',
    branches: ['ai-voice-agents', 'whatsapp-automation', 'conversational-commerce'],
    reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/business-growth/ai-automation-roi', '/blog/educational/ai-chatbot-cost-india'],
    faqs: [
      { q: 'What is the difference between a voice agent and a chatbot?', a: 'A voice agent talks on the phone. A chatbot types on WhatsApp, web chat or SMS. Both follow your rules and hand off to a person. Many businesses start with one and add the other.' },
      { q: 'Will customers know they are talking to AI?', a: 'Yes. We label every AI voice and chat as AI. We never pose an AI as a real person.' },
      { q: 'Can it book into my calendar and CRM?', a: 'Yes. It connects to the calendar, CRM and inbox you already use, so bookings and notes land where your team works.' },
      { q: 'What happens when it cannot answer?', a: 'It hands the conversation to a person with the full history, so nobody repeats themselves. You set when that happens.' },
      { q: 'Where do I start?', a: 'Start with the channel your customers use most. If they call, start with a voice agent. If they message, start with WhatsApp. Pick a branch above or tell us and we will point you to it.' },
    ],
  },
  {
    slug: 'automation-ops',
    name: 'Automation & Ops',
    title: 'Business Process Automation, HR and Finance | Website Vikreta',
    description: 'AI workflow, HR, proposal and finance automation. Connect your tools so routine work runs on its own. Done for you, with a person in the loop.',
    h1: ['Back-office work', 'that runs itself.'],
    lead: 'Workflows, HR, proposals and finance, connected to the tools you already use. The repeat work runs. Your team keeps the calls that need judgment.',
    answerQ: 'What is business operations automation?',
    answer:
      'Operations automation connects your apps so routine work moves without hand-offs. A new lead reaches your CRM, an offer letter is drafted, a proposal is assembled, an invoice goes out and a late one gets a reminder. A person approves what matters. We design, build and maintain it.',
    branches: ['workflow-automation', 'hr-automation', 'proposal-automation', 'finance-automation'],
    reading: [
      '/blog/ai-and-automation/ai-automation-connecting-tools',
      '/blog/ai-and-automation/make-vs-n8n-vs-custom-code',
      '/blog/business-growth/ai-automation-roi',
    ],
    faqs: [
      { q: 'Which tasks should I automate first?', a: 'Start with work you repeat every week that follows clear rules, like invoicing, follow-ups or data entry. Pick one, prove it, then add the next.' },
      { q: 'Do I need to change my tools?', a: 'No. We connect the CRM, email, accounting and chat tools you already use.' },
      { q: 'Is it safe for HR and finance data?', a: 'We limit access to what each automation needs and keep a person approving steps that move money or documents. Ask us about your data and region.' },
      { q: 'What if an automation breaks?', a: 'We monitor the runs and fix failures. You get an alert, not a surprise.' },
      { q: 'Who owns the automations?', a: 'You do. We document them so your team can see what runs and why.' },
    ],
  },
  {
    slug: 'ai-content-ads',
    name: 'AI Content & Ads',
    title: 'AI Content and UGC Ads Automation | Website Vikreta',
    description: 'AI blog, social and UGC-style video ad production. Publish more and test more hooks without booking creators. Done for you, labeled as AI.',
    h1: ['More content.', 'More ads to test.'],
    lead: 'Blogs, social posts and UGC-style video ads, made in batches. A person sets the idea and checks the facts. Every AI presenter is labeled AI.',
    answerQ: 'What is AI content and ad production?',
    answer:
      'AI content production uses AI for the slow parts of content: research, first drafts, resizing for each channel, scheduling and video ad variants. A person sets the idea, checks the facts and approves the voice. You publish and test more with less time per piece. AI presenters are always disclosed.',
    branches: ['content-automation', 'ai-ugc-ads'],
    reading: [
      '/blog/educational/google-ai-search-optimization-guide',
      '/blog/ai-and-automation/establishing-human-oversight-automation',
      '/blog/business-growth/ai-automation-roi',
    ],
    faqs: [
      { q: 'Will it sound like my brand?', a: 'We train it on your tone and examples, and a person approves the voice before anything goes live.' },
      { q: 'Are AI presenters disclosed?', a: 'Yes. Every AI presenter is labeled AI. Nobody is posed as a real customer.' },
      { q: 'Does AI content rank?', a: 'Search engines reward helpful content, not how it was made. We add research, facts and an edit pass so posts are worth reading.' },
      { q: 'Which ad platforms do you make for?', a: 'We cut variants for Meta and TikTok, and other formats on request.' },
      { q: 'Can I start with just blogs or just ads?', a: 'Yes. Pick one branch above and add the other later.' },
    ],
  },
  {
    slug: 'ai-search-visibility',
    name: 'AI Search Visibility',
    title: 'AI Search Visibility: AEO and GEO | Website Vikreta',
    description: 'Get cited when buyers ask ChatGPT, Perplexity and Google AI Overviews. Answer engine and generative engine optimization from our SEO & GEO team.',
    h1: ['Be the answer', 'AI gives buyers.'],
    lead: 'Buyers now ask ChatGPT, Perplexity and Google AI before they search. We make your site the source those answers quote.',
    answerQ: 'What is AI search visibility?',
    answer:
      'AI search visibility is how often answer engines like ChatGPT, Perplexity and Google AI Overviews cite your business when someone asks about your category. It is also called answer engine optimization (AEO) and generative engine optimization (GEO). It depends on clear answers, structured data, entity signals and a site crawlers can read.',
    branches: [],
    links: [
      {
        label: 'SEO & GEO',
        href: '/services/digital-marketing',
        blurb: 'Technical SEO, local SEO, on-page content, ChatGPT and Perplexity visibility, Google AI Overviews, and schema and entity SEO.',
      },
    ],
    reading: [
      '/blog/educational/google-ai-search-optimization-guide',
      '/blog/ai-and-automation/ai-strategy-real-world-outcomes',
      '/blog/business-growth/ai-automation-roi',
    ],
    faqs: [
      { q: 'What is the difference between SEO, AEO and GEO?', a: 'SEO earns rankings in search results. AEO and GEO earn citations inside AI answers. They share a base: clear content, good structure and a fast, crawlable site.' },
      { q: 'Can you guarantee a ChatGPT citation?', a: 'No one can. Answer engines choose their own sources. We improve the signals they use and check where you appear.' },
      { q: 'What do you change on my site?', a: 'Answer-first content, schema markup, entity details, crawler access and internal links. The SEO & GEO page lists the full scope.' },
      { q: 'Is this part of the AI automation work?', a: 'It sits beside it. AI content automation can feed it, and our SEO & GEO team runs the audit and fixes.' },
      { q: 'How do I start?', a: 'Ask for the free AI visibility check on the SEO & GEO page.' },
    ],
  },
]

export const getPillar = (slug: string) => PILLARS.find((p) => p.slug === slug)
export const pillarOf = (branchSlug: string) => PILLARS.find((p) => p.branches.includes(branchSlug))
