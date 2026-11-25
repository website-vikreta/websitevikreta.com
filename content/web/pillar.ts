import type { LeafContent } from './types'

/** Copy for the /services/web-development pillar page. Rendered by components/wv/web/WebPillar.tsx. */

const P = '/services/web-development'

export const PILLAR = {
  h1: ['Websites that', 'load, rank', 'and sell.'],
  lead: 'Custom websites and online stores for growing businesses. Fast to load, written to rank, easy for your team to edit. Our fastest site went live in 2 weeks.',
  words: ['load', 'rank', 'sell', 'convert'],
  groupsAside: 'Three groups, nine services. Start with the one that fits, we will tell you if another one fits better.',
  includesAside: 'Whichever group you pick, these four come standard.',

  groups: [
    {
      id: 'business-websites',
      t: 'Business websites',
      strip: 'Company sites, landing pages and redesigns.',
      d: 'Marketing sites that load fast and turn visits into enquiries.',
      href: `${P}/business-websites`,
      rows: [
        { t: 'Company & service websites', d: 'A full marketing site, built around how you sell.', href: `${P}/business-websites/company-service-websites` },
        { t: 'Landing pages', d: 'One focused page for one offer and one action.', href: `${P}/business-websites/landing-pages` },
        { t: 'Website redesign & migration', d: 'A better site without losing the rankings you earned.', href: `${P}/business-websites/website-redesign-migration` },
      ],
    },
    {
      id: 'ecommerce',
      t: 'E-commerce',
      strip: 'Shopify, WooCommerce and headless stores.',
      d: 'Stores built to sell, with the integrations your operations need.',
      href: `${P}/ecommerce`,
      rows: [
        { t: 'Shopify development', d: 'A hosted store, quick to launch and simple to run.', href: `${P}/ecommerce/shopify-development` },
        { t: 'WooCommerce stores', d: 'A store on WordPress, with full control.', href: `${P}/ecommerce/woocommerce-stores` },
        { t: 'Headless commerce', d: 'A custom storefront on an engine you trust.', href: `${P}/ecommerce/headless-commerce`, tag: 'New' },
      ],
    },
    {
      id: 'cms-performance',
      t: 'CMS & Performance',
      strip: 'Next.js and Webflow builds, speed fixes and upkeep.',
      d: 'Sites your team can edit, that stay fast as they grow.',
      href: `${P}/cms-performance`,
      rows: [
        { t: 'Next.js & Webflow builds', d: 'A fast site on the platform that fits your team.', href: `${P}/cms-performance/nextjs-webflow-builds` },
        { t: 'Core Web Vitals optimisation', d: 'Find what slows the pages, fix it, show the numbers.', href: `${P}/cms-performance/core-web-vitals-optimisation` },
        { t: 'Website maintenance', d: 'Updates, backups and small fixes, so it keeps working.', href: `${P}/cms-performance/website-maintenance` },
      ],
    },
  ] as { id: string; t: string; strip: string; d: string; href: string; rows: { t: string; d: string; href: string; tag?: string }[] }[],

  friction: {
    statement: 'Your website is where people decide whether to trust you. If it is slow, dated or hard to change, they leave before they ever call.',
    items: [
      { t: 'It looks out of date.', d: 'First impressions are made in seconds, and yours is working against you.' },
      { t: 'It does not bring leads.', d: 'People visit, nothing happens, and you cannot say why.' },
      { t: 'It is hard to change.', d: 'Every small edit needs a developer and a week.' },
    ],
  },

  band: [
    ['Fast to load', 'Written to rank', 'Easy to edit', 'Mobile first', 'Yours to own'],
    ['Next.js', 'Shopify', 'WooCommerce', 'Webflow', 'Tailwind', 'Headless'],
  ] as LeafContent['band'],

  includes: [
    { t: 'Site structure', d: 'Pages, URLs and content mapped before anyone writes code. No orphan pages, no duplicate paths.', link: 'Talk through your site map', img: '/services/web-development/systems/site-structure.webp', alt: 'Sitemap flowchart showing page hierarchy, search paths, and blocked duplicate content.' },
    { t: 'Auth & admin', d: 'Logins, client areas and CMS roles set to who should see what. Your team publishes from one dashboard.', link: 'See how access would work', img: '/services/web-development/systems/auth-admin.webp', alt: 'CMS dashboard with named Admin, Editor, Client, and CMS Team roles.' },
    { t: 'Performance', d: 'Caching, image delivery and server response tuned before launch. When traffic spikes, the site keeps up.', link: 'Get a performance review', img: '/services/web-development/systems/performance.webp', alt: 'Users, cloud servers, database, and a fast-loading website with a performance gauge.' },
    { t: 'Mobile first', d: 'Layout, forms and buttons built for the phone first. Same pages, same speed on every screen.', link: 'See a mobile-first build', img: '/services/web-development/systems/mobile-first.webp', alt: 'The same website on laptop, phone, and tablet with matching layout.' },
  ],

  steps: {
    aside: 'Four steps. Nothing gets rebuilt halfway through.',
    items: [
      { n: '01', t: 'We plan', d: 'Goals, audience and content, sorted before a single pixel gets designed.' },
      { n: '02', t: 'We design', d: 'Wireframes and UI built around your brand, mobile-first from the first screen.' },
      { n: '03', t: 'We build', d: 'Custom-coded in Next.js and Tailwind. SEO, clean HTML and fast load times built in.' },
      { n: '04', t: 'We launch', d: 'Live, tracked and handed over, then fixes, updates and upkeep as you grow.' },
    ],
  } as LeafContent['steps'],

  support: [
    { t: 'The night watch.', d: 'We are awake when things go sideways. You do not page us. We are already there.', img: '/services/web-development/support/night-watch.webp', alt: 'A customer sleeping while an engineer monitors systems overnight.' },
    { t: 'The extra floor.', d: 'We work below your main stack, so issues do not climb to you.', img: '/services/web-development/support/extra-floor.webp', alt: 'A building cutaway: the client team upstairs, operations catching issues on the floor below.' },
    { t: 'The open tab.', d: 'We stay in the work with you. No disappearing between updates.', img: '/services/web-development/support/open-tab.webp', alt: 'Team at a shared project dashboard with real-time updates.' },
  ],

  stats: [
    { n: 5, suffix: '+', label: 'Years with founders and teams' },
    { n: 68, suffix: '+', label: 'Projects shipped: sites, apps, automation, design' },
    { n: 2, suffix: '', text: '2 wks', label: 'Our fastest site, AP Cleanco, from nothing to live' },
  ],

  proof: {
    slugs: ['simpli-home-site', 'sustainable-bitcoin-protocol-site', 'ap-cleanco-site', 'archmodal', 'earth-by-blancora', 'tocal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' } as Record<string, string>,
  },

  faqs: [
    { q: 'How long until my site is live?', a: 'It depends on the size of the site. Our fastest, AP Cleanco, went from nothing to live in 2 weeks. We agree a realistic timeline in the plan step, before any design starts.' },
    { q: 'Who owns the source?', a: 'You do. Once delivered, the code and content are yours. No licensing fees, no lock-in, and no dependency on us to keep the site running.' },
    { q: 'We already have a site. Do we need to start over?', a: 'Not always. Sometimes a rebuild is right: slow loads, broken mobile, no SEO structure. Sometimes a focused refresh on speed, structure and conversion is enough. We will tell you which after a quick look.' },
    { q: 'Can it talk to our CRM?', a: 'Usually, yes. Forms, booking tools and CRMs you already run can sit behind the new site. We look at what you have before we promise a specific integration.' },
    { q: 'Which group do I need?', a: 'If you need a site that explains your business, start with Business websites. If you sell products, E-commerce. If you have a site that is slow or hard to run, CMS & Performance. Not sure? Tell us and we will point you to it.' },
  ],
}
