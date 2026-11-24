import type { LeafContent } from './types'

/** Copy for /services/web-development/business-websites/landing-pages. Real proof only: figures come from lib/work-data.ts and components/wv/data.ts. */

export const PATH = '/services/web-development/business-websites/landing-pages'

export const FAQS = [
  {
    q: 'How long does a landing page take?',
    a: 'Usually much less than a full website, because there is one page and one job. We agree the timeline in the brief step, before any design starts. Our fastest project, AP Cleanco, went from nothing to live in two weeks.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your offer, who it is for, the action you want, and any proof you already have, like logos or a quote. We write and shape the rest with you.',
  },
  { q: 'Will it work on mobile?', a: 'Yes. We design and check it on a phone first, because that is where most clicks land.' },
  { q: 'Can I see what is working?', a: 'Yes. We set up tracking for page views and form sends, so you can see the numbers.' },
  {
    q: 'Do you run the ads too?',
    a: 'We build the page and set up the tracking. If you want help with the ads as well, tell us on the call.',
  },
  { q: 'Can I edit the page myself?', a: 'Yes. We pick a setup that fits your team and show you how to change the words and images.' },
]

export const LANDING: LeafContent = {
  crumb: 'Landing pages',
  h1: ['One page.', 'One job.'],
  hero: {
    lead: 'A focused page built for one offer and one action. Fast on a phone, matched to your ad, simple to say yes to.',
    words: ['Convert', 'Load', 'Match', 'Track'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'One goal per page',
    rot: 'Built to',
    art: 'wire',
    url: 'yourbrand.com/offer',
  },
  band: [
    ['Next.js', 'Webflow', 'Figma', 'Sanity', 'WordPress', 'Shopify'],
    ['One offer', 'One action', 'Fast on mobile', 'Built to convert'],
  ],
  friction: {
    statement: 'You are paying for every click. Then you send them to a page that tries to do ten things and asks for nothing clearly.',
    items: [
      { t: 'It does too much.', d: 'Menus and links pull people away from the one thing you want.', g: 3 },
      { t: 'It does not match the ad.', d: 'The promise that got the click is nowhere on the page.', g: 1 },
      { t: 'You cannot see what works.', d: 'No tracking, so you guess where the leads came from.', g: 2 },
    ],
    photo: '/services/web-development/landing/friction.webp',
    alt: 'A founder\'s desk by a window: a laptop showing a one-offer landing page with a short form, a phone with an ad, and a notebook with a page wireframe',
  },
  build: {
    aside: 'A page built for one result, not a template with your logo on it.',
    rows: [
      {
        t: 'Offer & headline',
        href: '/',
        d: 'A first screen that says what you offer and who it is for in five seconds.',
        pop: ['A headline that says what you offer', 'One main button, repeated where it helps', 'No menu to wander off to'],
      },
      {
        t: 'Proof near the ask',
        href: '/work',
        d: 'Logos, a quote or a result placed right where people decide.',
        pop: ['Client logos you can show', 'A short quote next to the form', 'Real numbers only'],
      },
      {
        t: 'The form',
        href: '/contact',
        d: 'Short, clear and tested on a phone, so it is easy to fill in.',
        pop: ['As few fields as you can get away with', 'Clear error messages', 'Lands in your inbox'],
      },
      {
        t: 'Fast on mobile',
        href: '/services/web-development',
        d: 'Built to load quickly on a normal phone connection, not just on a laptop.',
        pop: ['Light images, sensible fonts', 'Checked on a phone first', 'No heavy scripts you do not need'],
      },
      {
        t: 'Matched to your ad',
        href: '/services/digital-marketing',
        d: 'The page repeats the promise of the ad, email or post that sent people here.',
        pop: ['Same words as the ad', 'One page per campaign if you need it', 'Right offer, right audience'],
      },
      {
        t: 'Tracking set up',
        href: '/services/digital-marketing',
        d: 'Page views and form sends are measured, so you can see what is working.',
        pop: ['Page views counted', 'Form sends counted', 'Clear numbers you can read'],
      },
    ],
  },
  steps: {
    aside: 'You see the page before it goes live, and you know what we are measuring.',
    items: [
      { n: '01', t: 'Brief', d: 'We agree the one offer, the one action and who the page is for.' },
      { n: '02', t: 'Write', d: 'Headline, proof and form copy, written with you before any design starts.' },
      { n: '03', t: 'Build', d: 'Design and code together, checked on a real phone before you see it.' },
      { n: '04', t: 'Launch', d: 'Live, tracked, and handed over with a short walkthrough for your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'tocal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: {
      t: 'Your campaign here',
      d: 'Got a campaign to launch? Tell us the offer and we will tell you what the page needs.',
      cta: 'Start your campaign',
      href: '/contact',
    },
  },
  fit: {
    good: [
      'You are about to run a campaign, a launch or an event and need a page to send people to.',
      'You are paying for traffic and it is not turning into enquiries.',
      'You have one clear offer and one action you want people to take.',
    ],
    notFit: [
      { t: 'You need a full website with several pages.', link: 'See Company & service websites', href: '/services/web-development/business-websites/company-service-websites' },
      { t: 'You need an online shop with a big catalogue.', link: 'See our E-commerce work instead', href: '/services/web-development' },
    ],
  },
  faqs: FAQS,
  related: [
    {
      t: 'Company & service websites',
      d: 'A full marketing site, built to rank and easy to edit.',
      href: '/services/web-development/business-websites/company-service-websites',
    },
    { t: 'Website redesign & migration', d: 'Replace the old site without losing the rankings it earned.', href: '/services/web-development/business-websites/website-redesign-migration' },
    { t: 'Website maintenance', d: 'Updates, backups and fixes, so it keeps working.', href: '/services/web-development/cms-performance/website-maintenance' },
  ],
}
