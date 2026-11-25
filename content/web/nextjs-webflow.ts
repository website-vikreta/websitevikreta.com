import type { LeafContent } from './types'

/** Copy for /services/web-development/cms-performance/nextjs-webflow-builds. Real proof only; no speed, ranking or traffic figures. */

export const PATH = '/services/web-development/cms-performance/nextjs-webflow-builds'

export const FAQS = [
  {
    q: 'Next.js or Webflow?',
    a: 'It depends on your team. Next.js suits custom features and full control. Webflow suits visual editing and quick launches. We recommend one after a short call.',
  },
  {
    q: 'Can I edit the site myself?',
    a: 'Yes. We set up an editor your team can use, and show you how at handover.',
  },
  {
    q: 'Will it be fast?',
    a: 'We build with speed in mind and check it on a phone before launch. We cannot promise a score, because it also depends on your content and tools.',
  },
  {
    q: 'Who owns the site?',
    a: 'We agree ownership and access in writing before we start, so there are no surprises at handover.',
  },
  {
    q: 'Can you move my existing site?',
    a: 'Yes. See Website redesign & migration for how we protect what already ranks.',
  },
  {
    q: 'What happens after launch?',
    a: 'We hand it over and train your team. If you want ongoing help, we offer maintenance.',
  },
]

export const NEXTJS_WEBFLOW: LeafContent = {
  crumb: 'Next.js & Webflow builds',
  h1: ['Fast code.', 'Easy edits.'],
  hero: {
    lead: 'Next.js when you need speed and control. Webflow when your team wants to edit visually. We help you choose, then build it properly.',
    words: ['Next.js', 'Webflow', 'Sanity', 'Figma'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Next.js or Webflow',
    rot: 'Built on',
    art: 'shot',
    url: 'apcleanco.com',
  },
  band: [
    ['Next.js', 'Webflow', 'Sanity', 'Figma', 'React', 'TypeScript'],
    ['Right tool first', 'Fast pages', 'Edit it yourself', 'Handed over clean'],
  ],
  friction: {
    statement: 'Pick the wrong platform and you pay for it for years. Too rigid for your team to edit, or too loose to stay fast and tidy.',
    items: [
      { t: 'Hard to edit.', d: 'Every small change needs a developer.', g: 2 },
      { t: 'Slow to load.', d: 'Heavy themes and plugins drag the page down.', g: 0 },
      { t: 'Hard to grow.', d: 'The setup fights you when you add pages or features.', g: 1 },
    ],
    photo: '/services/web-development/cms/nextjs-webflow.webp',
    alt: 'A desk by a window with a laptop showing a website and a notebook with a hand-drawn page layout',
  },
  build: {
    aside: 'The right platform for your team, built cleanly and handed over.',
    rows: [
      {
        t: 'Platform choice',
        href: '/services/web-development',
        d: 'We compare Next.js and Webflow against how your team works, then recommend one.',
        pop: ['Next.js for control and custom features', 'Webflow for visual editing', 'Reasons in plain words'],
      },
      {
        t: 'Design to code',
        href: '/services/uiux-design',
        d: 'Your design built as designed, with reusable parts so pages stay consistent.',
        pop: ['Figma to working pages', 'Reusable sections', 'Checked on a phone'],
      },
      {
        t: 'Content setup',
        href: '/blog',
        d: 'An editing setup your team can use without a developer.',
        pop: ['Sanity or the Webflow editor', 'Pages and posts you can change', 'A walkthrough at handover'],
      },
      {
        t: 'Speed built in',
        href: '/services/web-development/cms-performance/core-web-vitals-optimisation',
        d: 'Light pages and sensible images, so it loads well from day one.',
        pop: ['Optimised images and fonts', 'No heavy scripts you do not need', 'Checked before launch'],
      },
      {
        t: 'SEO basics',
        href: '/services/digital-marketing',
        d: 'Clean structure, page titles and a sitemap, set up as part of the build.',
        pop: ['Headings and page titles', 'Sitemap and redirects', 'Ready for search tools'],
      },
      {
        t: 'Clean handover',
        href: '/services/web-development/cms-performance/website-maintenance',
        d: 'You get the project, access and a short guide, so you are not locked in.',
        pop: ['Project and access handed over', 'A short how-to guide', 'Support options after launch'],
      },
    ],
  },
  steps: {
    aside: 'You know which platform and why before any code is written.',
    items: [
      { n: '01', t: 'Choose', d: 'We compare Next.js and Webflow against how your team works, and pick one with you.' },
      { n: '02', t: 'Design', d: 'Pages and parts designed in Figma and agreed before any code.' },
      { n: '03', t: 'Build', d: 'Built, tested on a phone and checked for speed.' },
      { n: '04', t: 'Hand over', d: 'Editor set up, a walkthrough for your team and the project handed over.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'tocal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: {
      t: 'Your build here',
      d: 'Not sure which platform fits? Tell us how your team works and we will recommend one.',
      cta: 'Ask which fits',
      href: '/contact',
    },
  },
  fit: {
    good: ['You want a site your team can edit without calling a developer.', 'You want speed and clean code, or a visual editor, and need help choosing.', 'You will keep adding pages and features over time.'],
    notFit: [
      { t: 'You need an online shop with a big catalogue.', link: 'See our E-commerce work instead', href: '/services/web-development' },
      { t: 'You are happy on your platform and only want it faster.', link: 'See Core Web Vitals optimisation', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Core Web Vitals optimisation', d: 'Make the pages you have load faster and stay steady.', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
    { t: 'Website maintenance', d: 'Updates, backups and fixes, so it keeps working.', href: '/services/web-development/cms-performance/website-maintenance' },
    { t: 'Company & service websites', d: 'A full marketing site, built to rank and easy to edit.', href: '/services/web-development/business-websites/company-service-websites' },
  ],
}
