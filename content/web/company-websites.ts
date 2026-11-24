/** Copy for /services/web-development/business-websites/company-service-websites. Real proof only: figures come from lib/work-data.ts and components/wv/data.ts. */

export const PATH = '/services/web-development/business-websites/company-service-websites'

export const HERO = {
  lead: 'Fast, SEO-ready sites built around how you sell. Easy for you to edit, quick to load, simple for customers to find.',
  words: ['Sell', 'Rank', 'Load', 'Convert'],
  proof: 'AP Cleanco went from no website to live in 2 weeks.',
}

export const FRICTION = {
  statement: 'Most company websites look fine and sell nothing. They are slow, buried on Google, and every small edit means calling a developer.',
  items: [
    { t: 'It loads slowly.', d: 'Visitors leave before the page finishes.' },
    { t: 'Nobody finds it.', d: 'Great work, invisible on Google.' },
    { t: 'You cannot edit it.', d: 'Every change waits on someone else.' },
  ],
}

export const BUILD = {
  aside: 'A full marketing site, not a template. Built, written and set up to rank.',
  rows: [
    { t: 'Home page', href: '/', d: 'A first screen that says what you do and who it is for in five seconds.', pop: ['A headline that says what you do', 'Your best proof near the top', 'One clear next step for the visitor'] },
    { t: 'Service pages', href: '/services/web-development', d: 'One page per service, written for the words people actually search.', pop: ['One page for each service you sell', 'Copy written for what customers search', 'Questions answered on the page'] },
    { t: 'About & team', href: '/about', d: 'Real people and real work, so visitors trust you before they call.', pop: ['Your story in plain words', 'Real photos of the people behind it', 'Client logos and credentials'] },
    { t: 'Case studies', href: '/work', d: 'Proof that reads like a story, not a brochure.', pop: ['The problem, what you did, the result', 'Real numbers only', 'A link to the live work'] },
    { t: 'Contact & forms', href: '/contact', d: 'Enquiry forms that reach you, with the details you need to reply.', pop: ['A form that lands in your inbox', 'Fields that capture what you need to reply', 'Phone, email and location, easy to find'] },
    { t: 'Blog & CMS', href: '/blog', d: 'Edit pages, add posts and update copy yourself. No developer needed.', pop: ['Edit pages and posts yourself', 'Preview before you publish', 'A walkthrough for your team at handover'] },
  ],
}

export const STEPS = {
  aside: 'You see the plan before we build, and the site before it goes live.',
  items: [
    { n: '01', t: 'Listen', d: 'We learn how you sell, who buys, and what the old site gets wrong.' },
    { n: '02', t: 'Plan', d: 'Pages, structure and words agreed with you before any design starts.' },
    { n: '03', t: 'Build', d: 'Design and code together, so what you approve is what ships.' },
    { n: '04', t: 'Launch', d: 'Redirects, speed checks and search setup done. Then handover and training.' },
  ],
}

export const BAND_A = ['Next.js', 'Webflow', 'WordPress', 'Shopify', 'Figma', 'Sanity']
export const BAND_B = ['Fast', 'Found', 'Yours to edit', 'Built to sell']

/** slugs in WEB_PROJECTS (lib/work-data.ts). Only AP Cleanco has a backed metric. */
export const PROOF = {
  aside: 'Real clients, live sites.',
  slugs: ['ap-cleanco-site', 'archmodal', 'sustainable-bitcoin-protocol-site', 'tocal'],
  metric: { 'ap-cleanco-site': '2 weeks, concept to launch' } as Record<string, string>,
}

export const FIT = {
  good: [
    'You run a service business or a company and the site is your front door.',
    'Your current site is slow, dated, or hard for you to edit.',
    'You want to show up when people search for what you do.',
  ],
  notFit: [
    { t: 'You need an online shop with a big catalogue.', link: 'See our E-commerce work instead', href: '/services/web-development' },
    { t: 'You need custom software behind a login.', link: 'See CRMs & Web Applications', href: '/services/apps-crm' },
  ],
}

export const FAQS = [
  {
    q: 'How long does a company website take?',
    a: 'It depends on the number of pages and how fast content is ready. We agree the timeline in the plan step, before any design starts. Our fastest project, AP Cleanco, went from nothing to live in two weeks.',
  },
  {
    q: 'Will it show up on Google?',
    a: 'We set it up to rank: clean structure, fast loading, proper page titles, and copy written for the words your customers search. We do not promise a position, because nobody honest can.',
  },
  { q: 'Can I edit it myself?', a: 'Yes. We pick a content system that fits your team and show you how to use it at handover.' },
  {
    q: 'Do you move my old site over?',
    a: 'If you already have a site, we keep the pages that work, redirect the old addresses and check nothing that ranks gets lost.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'A short call, your current site if you have one, and anything you already know about your customers. We write the rest with you.',
  },
  { q: 'What happens after launch?', a: 'We hand it over and train your team. If you want help later, we offer maintenance.' },
]
