import type { LeafContent } from './types'

/** Copy for /services/web-development/business-websites/website-redesign-migration. Real proof only; no ranking, traffic or speed figures. */

export const PATH = '/services/web-development/business-websites/website-redesign-migration'

export const FAQS = [
  {
    q: 'Will I lose my Google rankings?',
    a: 'We work to protect them: we list what ranks today, redirect every old address to its new page and check the numbers after launch. We cannot promise every position stays exactly the same, because nobody honest can, but we do not leave it to chance.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the number of pages and how much content moves across. We agree the timeline after the audit, before any design starts.',
  },
  {
    q: 'Will my site go offline during the move?',
    a: 'No. We build the new site separately and switch over when it is ready and checked.',
  },
  {
    q: 'Can I keep my domain and email?',
    a: 'Yes. Your address stays yours. We plan the switch so your email keeps working.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Access to your current site, your analytics and search tools if you have them, and a short call about what matters most to you. We handle the rest.',
  },
  {
    q: 'What happens after launch?',
    a: 'We compare the numbers, fix anything that broke and hand it over with a short walkthrough. If you want ongoing help, we offer maintenance.',
  },
]

export const REDESIGN: LeafContent = {
  crumb: 'Website redesign & migration',
  h1: ['Redesign it.', 'Keep what ranks.'],
  hero: {
    lead: 'A faster, better-looking site without starting your search rankings from zero. We map every page, redirect every old address and check the numbers before and after.',
    words: ['Audit', 'Map', 'Redirect', 'Check'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Every page mapped',
    rot: 'We',
    art: 'ba',
    url: '',
  },
  band: [
    ['Next.js', 'Webflow', 'WordPress', 'Shopify', 'Sanity', 'Figma'],
    ['Audit first', 'Redirect everything', 'Check after', 'Keep what ranks'],
  ],
  friction: {
    statement: 'Your site looks dated and is hard to edit. But a redesign can wipe out the search rankings you spent years earning, so you leave it alone.',
    items: [
      { t: 'Old links break.', d: 'People and search engines land on pages that no longer exist.', g: 1 },
      { t: 'Rankings slip.', d: 'Titles, headings and structure change, and the search signals go with them.', g: 0 },
      { t: 'Nobody checks after.', d: 'Nothing is compared before and after, so problems stay hidden.', g: 2 },
    ],
    photo: '/services/web-development/redesign/friction.webp',
    alt: 'A desk by a window with an older laptop showing a crowded website, a newer laptop showing a clean page, and a notebook with a hand-drawn page map',
  },
  build: {
    aside: 'A careful move, not just a new coat of paint.',
    rows: [
      {
        t: 'Site audit',
        href: '/services/digital-marketing',
        d: 'A list of what ranks and brings traffic today, so we know what to protect.',
        pop: ['Pages that bring traffic today', 'Pages other sites link to', 'What is slow or broken'],
      },
      {
        t: 'Page map',
        href: '/services/web-development',
        d: 'Every old page matched to a new one, with nothing left without a home.',
        pop: ['Old address on the left, new on the right', 'Pages merged or dropped on purpose', 'Agreed with you before building'],
      },
      {
        t: 'Redirects',
        href: '/services/web-development',
        d: 'Old addresses sent to the right new pages, so links and search results keep working.',
        pop: ['One-to-one redirects where pages match', 'No chains, no dead ends', 'Tested before launch'],
      },
      {
        t: 'New design',
        href: '/work',
        d: 'A cleaner, faster look built around how you sell now.',
        pop: ['Clear first screen and one main action', 'Fast on a phone', 'Easy for you to edit'],
      },
      {
        t: 'Content moved',
        href: '/blog',
        d: 'Your words, images and forms carried across, with the weak ones improved.',
        pop: ['Text and images moved over', 'Forms and tracking reconnected', 'Titles and descriptions kept or improved'],
      },
      {
        t: 'Launch checks',
        href: '/contact',
        d: 'Before and after numbers compared, and search tools checked once it is live.',
        pop: ['Before and after compared', 'Search tools checked', 'Broken links fixed fast'],
      },
    ],
  },
  steps: {
    aside: 'You see the page map before we build, and the numbers after we launch.',
    items: [
      { n: '01', t: 'Audit', d: 'We list what ranks and brings traffic today, and what is slow or broken.' },
      { n: '02', t: 'Map', d: 'Every old page matched to a new one, with a redirect plan you approve.' },
      { n: '03', t: 'Build', d: 'New design and code, with your content moved across and checked.' },
      { n: '04', t: 'Launch', d: 'We switch over, check the search tools and compare the numbers.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['archmodal', 'ap-cleanco-site'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: {
      t: 'Your site here',
      d: 'Got an old site to move? Send us the address and we will tell you what to protect.',
      cta: 'Start your move',
      href: '/contact',
    },
  },
  fit: {
    good: [
      'Your site is dated, slow or hard to edit, but it still brings in traffic or enquiries.',
      'You want to move to a newer setup without losing the pages that rank.',
      'You would rather have a plan and a page map than a surprise on launch day.',
    ],
    notFit: [
      { t: 'You do not have a website yet.', link: 'See Company & service websites', href: '/services/web-development/business-websites/company-service-websites' },
      { t: 'You need one page for a single campaign.', link: 'See Landing pages', href: '/services/web-development/business-websites/landing-pages' },
    ],
  },
  faqs: FAQS,
  related: [
    {
      t: 'Company & service websites',
      d: 'A full marketing site, built to rank and easy to edit.',
      href: '/services/web-development/business-websites/company-service-websites',
    },
    {
      t: 'Landing pages',
      d: 'One page, one job. Built to turn a campaign into enquiries.',
      href: '/services/web-development/business-websites/landing-pages',
    },
    { t: 'Website maintenance', d: 'Updates, backups and fixes, so it keeps working.', href: '/services/web-development/cms-performance/website-maintenance' },
  ],
}
