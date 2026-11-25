import type { LeafContent } from './types'

/** Copy for /services/web-development/cms-performance/core-web-vitals-optimisation. Real proof only; no speed, ranking or traffic figures. */

export const PATH = '/services/web-development/cms-performance/core-web-vitals-optimisation'

export const FAQS = [
  {
    q: 'What are Core Web Vitals?',
    a: 'Three measures of page experience: how fast the main content loads (LCP), how quickly the page responds to taps and clicks (INP), and how much the layout shifts while loading (CLS).',
  },
  {
    q: 'Will this improve my rankings?',
    a: 'Speed is one signal among many, so we cannot promise a position. Faster pages do keep more visitors and remove a known problem.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the size of the site and what the audit finds. We agree the plan after the audit, before any changes.',
  },
  {
    q: 'Do I need a new site?',
    a: 'Often not. Many fixes happen on the site you have. If the platform is the limit, we tell you plainly.',
  },
  {
    q: 'Will you change my design?',
    a: 'No. We keep the look and change what is under it, unless you ask for more.',
  },
  {
    q: 'What happens after?',
    a: 'You get a before and after summary. If you want it kept fast, we offer maintenance.',
  },
]

export const CORE_WEB_VITALS: LeafContent = {
  crumb: 'Core Web Vitals optimisation',
  h1: ['Make it fast.', 'Keep it fast.'],
  hero: {
    lead: 'We measure how your pages load, respond and settle, fix what slows them down, and check again. Speed that visitors feel and search tools measure.',
    words: ['Measure', 'Fix', 'Check', 'Repeat'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Measured before and after',
    rot: 'We',
    art: 'vitals',
    url: 'yoursite.com',
  },
  band: [
    ['LCP', 'INP', 'CLS', 'Lighthouse', 'PageSpeed', 'Search Console'],
    ['Measure first', 'Fix what matters', 'Check again', 'Keep it fast'],
  ],
  friction: {
    statement: 'Your pages look fine to you. But on a normal phone they load slowly, shift around as they load, and visitors leave before they see the offer.',
    items: [
      { t: 'Slow to appear.', d: 'The main content takes too long to show up.', g: 0 },
      { t: 'Slow to respond.', d: 'Taps and clicks feel stuck.', g: 1 },
      { t: 'Jumpy layout.', d: 'Buttons and text move while the page loads.', g: 2 },
    ],
    photo: '/services/web-development/cms/core-web-vitals.webp',
    alt: 'A phone on a desk showing a page that is still loading, next to a laptop and a notebook',
  },
  build: {
    aside: 'Find what is slow, fix it in order of impact, and prove it.',
    rows: [
      {
        t: 'Speed audit',
        href: '/services/web-development/cms-performance/core-web-vitals-optimisation',
        d: 'A plain-words list of what is slow and why, page by page.',
        pop: ['Real-device style checks', 'Slowest pages first', 'No jargon report'],
      },
      {
        t: 'Images and fonts',
        href: '/services/web-development',
        d: 'Right sizes, modern formats and fonts that do not hold the page up.',
        pop: ['Smaller image files', 'Fonts loaded sensibly', 'Nothing blocks the first screen'],
      },
      {
        t: 'Code and scripts',
        href: '/services/web-development',
        d: 'Remove or delay the scripts and plugins that cost more than they give.',
        pop: ['Unused code removed', 'Third-party scripts tamed', 'Heavy parts loaded later'],
      },
      {
        t: 'Layout stability',
        href: '/services/web-development',
        d: 'Space reserved so buttons and text stop jumping while the page loads.',
        pop: ['Sizes set for images and embeds', 'Banners that do not push content', 'Checked on small screens'],
      },
      {
        t: 'Mobile checks',
        href: '/services/uiux-design',
        d: 'Tested on a phone first, because that is where most visits happen.',
        pop: ['Normal phone connection', 'Tap targets that work', 'Forms that respond'],
      },
      {
        t: 'Before and after',
        href: '/contact',
        d: 'The same measures taken before and after, so you can see what changed.',
        pop: ['Same pages, same tests', 'Changes explained', 'Next fixes listed'],
      },
    ],
  },
  steps: {
    aside: 'You see the measurements first, then the changes, then the proof.',
    items: [
      { n: '01', t: 'Measure', d: 'We test your key pages on phone and desktop and record where they stand.' },
      { n: '02', t: 'Plan', d: 'We list the fixes in order of impact and agree them with you.' },
      { n: '03', t: 'Fix', d: 'We make the changes, page by page, without changing your design.' },
      { n: '04', t: 'Check', d: 'We measure again and send you a before and after summary.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'tocal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: {
      t: 'Your pages here',
      d: 'Send us a page address and we will tell you what is slowing it down.',
      cta: 'Check my pages',
      href: '/contact',
    },
  },
  fit: {
    good: ['Your pages feel slow on a phone, or visitors leave before they see anything.', 'You want to fix speed without a full redesign.', 'You want numbers before and after, not a promise.'],
    notFit: [
      { t: 'You need a brand new site on a better platform.', link: 'See Next.js & Webflow builds', href: '/services/web-development/cms-performance/nextjs-webflow-builds' },
      { t: 'You want the site moved and redesigned.', link: 'See Website redesign & migration', href: '/services/web-development/business-websites/website-redesign-migration' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Next.js & Webflow builds', d: 'A site your team can edit, built on the right platform.', href: '/services/web-development/cms-performance/nextjs-webflow-builds' },
    { t: 'Website maintenance', d: 'Updates, backups and fixes, so it keeps working.', href: '/services/web-development/cms-performance/website-maintenance' },
    { t: 'Website redesign & migration', d: 'Replace the old site without losing the rankings it earned.', href: '/services/web-development/business-websites/website-redesign-migration' },
  ],
}
