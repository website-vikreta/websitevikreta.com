import type { LeafContent } from './types'

/** Copy for /services/web-development/cms-performance/website-maintenance. Real proof only; no speed, ranking or traffic figures. */

export const PATH = '/services/web-development/cms-performance/website-maintenance'

export const FAQS = [
  {
    q: 'What is included?',
    a: 'It depends on your site. We agree the list in writing before we start: usually updates, backups, checks, fixes and a short report.',
  },
  {
    q: 'Do you maintain sites you did not build?',
    a: 'Often yes. We look at it first and tell you what we would need.',
  },
  {
    q: 'How fast do you fix things?',
    a: 'We agree response times in writing, so you know what to expect.',
  },
  {
    q: 'Do you handle hosting?',
    a: 'We can work with your current host or advise on one. We agree this up front.',
  },
  {
    q: 'Can I pay only when something breaks?',
    a: 'Some fixes can be one-off. Ask on the call, and we will say what suits your site.',
  },
  {
    q: 'How do I stop?',
    a: 'We agree the terms before we start, including how to stop.',
  },
]

export const MAINTENANCE: LeafContent = {
  crumb: 'Website maintenance',
  h1: ['Keep it running.', 'Keep it right.'],
  hero: {
    lead: 'Updates, backups and fixes, handled by the people who built it. So the site keeps working and your team keeps its time.',
    words: ['Update', 'Back up', 'Test', 'Fix'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Upkeep handled',
    rot: 'We',
    art: 'checklist',
    url: 'yoursite.com',
  },
  band: [
    ['Updates', 'Backups', 'Fixes', 'Checks', 'Small edits', 'Reports'],
    ['Handled for you', 'Nothing forgotten', 'Fixed fast', 'Told in plain words'],
  ],
  friction: {
    statement: 'The site launched and everyone moved on. Now the software is out of date, nobody has checked a backup, and a small fix has been waiting for weeks.',
    items: [
      { t: 'Updates pile up.', d: 'Out-of-date software is how sites break or get hacked.', g: 1 },
      { t: 'Nobody checks backups.', d: 'You find out they do not work on the worst day.', g: 2 },
      { t: 'Small fixes wait.', d: 'A typo or a broken link sits there because nobody owns it.', g: 0 },
    ],
    photo: '/services/web-development/cms/maintenance.webp',
    alt: 'A tidy desk with a laptop, a checklist notebook and a coffee mug',
  },
  build: {
    aside: 'A steady routine, so the site does not become a problem.',
    rows: [
      {
        t: 'Updates',
        href: '/services/web-development',
        d: 'Software, plugins and packages kept current, tested before they go live.',
        pop: ['Updates applied on a routine', 'Tested before going live', 'Rolled back if something breaks'],
      },
      {
        t: 'Backups',
        href: '/services/web-development',
        d: 'Copies of your site kept safely, and checked to confirm they can be restored.',
        pop: ['Regular copies', 'Restore tested', 'Kept separate from the site'],
      },
      {
        t: 'Fixes',
        href: '/contact',
        d: 'Broken things repaired quickly, without a new quote every time.',
        pop: ['Bugs and broken links', 'Form and email problems', 'Page errors tracked down'],
      },
      {
        t: 'Small edits',
        href: '/blog',
        d: 'Text, image and page changes made for you when your team has no time.',
        pop: ['Copy and image swaps', 'New sections on request', 'Done and checked'],
      },
      {
        t: 'Checks',
        href: '/services/digital-marketing',
        d: 'Regular checks that pages load, forms send and nothing important has gone missing.',
        pop: ['Pages and forms tested', 'Search tools checked', 'Problems caught early'],
      },
      {
        t: 'Plain reports',
        href: '/contact',
        d: 'A short note on what was done and what needs your attention.',
        pop: ['What we did', 'What to watch', 'Next steps'],
      },
    ],
  },
  steps: {
    aside: 'You agree what is covered before we start, and you hear from us in plain words.',
    items: [
      { n: '01', t: 'Review', d: 'We look at your site, hosting and what could go wrong.' },
      { n: '02', t: 'Plan', d: 'We agree what is covered, how often and how to reach us.' },
      { n: '03', t: 'Maintain', d: 'We do the updates, backups, checks and fixes.' },
      { n: '04', t: 'Report', d: 'You get a short note on what was done.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'archmodal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: {
      t: 'Your site here',
      d: 'Tell us what you run and we will tell you what upkeep it needs.',
      cta: 'Ask about upkeep',
      href: '/contact',
    },
  },
  fit: {
    good: ['You have a site that matters to the business and nobody owns its upkeep.', 'You would rather have a routine than fire-fighting.', 'You want one team to call when something breaks.'],
    notFit: [
      { t: 'You need the site rebuilt, not looked after.', link: 'See Website redesign & migration', href: '/services/web-development/business-websites/website-redesign-migration' },
      { t: 'You only want it faster.', link: 'See Core Web Vitals optimisation', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Next.js & Webflow builds', d: 'A site your team can edit, built on the right platform.', href: '/services/web-development/cms-performance/nextjs-webflow-builds' },
    { t: 'Core Web Vitals optimisation', d: 'Make the pages you have load faster and stay steady.', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
    { t: 'Company & service websites', d: 'A full marketing site, built to rank and easy to edit.', href: '/services/web-development/business-websites/company-service-websites' },
  ],
}
