import type { LeafContent } from './types'

/** Copy for /services/web-development/ecommerce/headless-commerce. Real proof only; no prices, speed or sales figures. */

export const PATH = '/services/web-development/ecommerce/headless-commerce'

export const FAQS = [
  {
    q: 'What is headless commerce?',
    a: 'The storefront your customers see is built separately from the commerce engine that holds products, carts and orders. The two talk through APIs.',
  },
  {
    q: 'Do I need it?',
    a: 'Often not. A good theme is enough for many stores. We tell you plainly if headless would not pay off for you.',
  },
  {
    q: 'Does it cost more?',
    a: 'It takes more to build than a theme, because more is custom. We agree the scope and cost after the plan step.',
  },
  {
    q: 'Which commerce engine can you use?',
    a: 'We start from what you already run, often Shopify, and recommend a change only if there is a real reason.',
  },
  {
    q: 'What about SEO?',
    a: 'We build structure, titles, redirects and speed into the front end, and we do not promise rankings.',
  },
  {
    q: 'What happens after launch?',
    a: 'We hand it over with docs and a walkthrough. If you want ongoing help, we offer maintenance.',
  },
]

export const HEADLESS: LeafContent = {
  crumb: 'Headless commerce',
  h1: ['Custom front.', 'Solid back end.'],
  hero: {
    lead: 'A fast, fully custom storefront built with Next.js on top of a commerce engine like Shopify. For brands that have outgrown a theme.',
    words: ['Storefront', 'API', 'Checkout', 'Speed'],
    proof: "Earth by Blancora: a sustainable storefront for a women's clothing brand.",
    tag: 'Next.js and a commerce engine',
    rot: 'We build the',
    art: 'headless',
    url: 'yourstore.com',
  },
  band: [
    ['Next.js', 'React', 'Shopify API', 'TypeScript', 'Sanity', 'Figma'],
    ['Own the front end', 'Keep the back end', 'Built to stand out', 'Handed over clean'],
  ],
  friction: {
    statement: 'You have outgrown the theme but not the platform. Every change fights the template, and the pages slow down as you add apps.',
    items: [
      { t: 'The theme limits you.', d: "Your design has to fit someone else's layout.", g: 0 },
      { t: 'Hard to stand out.', d: 'Your store looks like every other store on the platform.', g: 1 },
      { t: 'Apps slow it down.', d: 'Each new app adds weight to every page.', g: 2 },
    ],
    photo: '/services/web-development/ecommerce/headless.webp',
    alt: 'A desk with a laptop showing a storefront and a tablet with an architecture sketch of connected boxes',
  },
  compare: {
    aside: 'Three honest options. The right one depends on how you sell and who runs the store.',
    cols: [
      { t: 'Shopify', on: false },
      { t: 'WooCommerce', on: false },
      { t: 'Headless', on: true },
    ],
    rows: [
      { k: 'Best for', v: ['Launching fast with a hosted store', 'Full control on WordPress', 'A fully custom storefront'] },
      { k: 'Running it', v: ['Hosted for you, platform updates handled', 'You host it and keep it updated', 'A custom front end plus a commerce backend'] },
      { k: 'Custom features', v: ['Apps and theme changes', 'Plugins and custom code', 'Built to your spec'] },
      { k: 'Editing', v: ['Shopify admin, simple for most teams', 'WordPress admin, familiar to many', 'Depends on the CMS we set up'] },
    ],
  },
  connects: {
    aside: 'Headless means the front end and the commerce engine are separate, so the connections are the product.',
    items: [
      { t: 'Payments', d: 'The payment methods your customers actually use.' },
      { t: 'Shipping', d: 'Rates, labels and tracking, set up for where you ship.' },
      { t: 'Taxes and invoices', d: 'Tax rules and invoices that match how you sell.' },
      { t: 'Email and WhatsApp', d: 'Order updates and cart reminders your customers will see.' },
      { t: 'Analytics', d: 'What sells, and where the buyers came from.' },
      { t: 'Stock and orders', d: 'Inventory kept in step with your sales.' },
    ],
  },
  build: {
    aside: 'A storefront built to your design, on an engine you already trust.',
    rows: [
      {
        t: 'Storefront design',
        href: '/services/uiux-design',
        d: 'A storefront designed around your brand and your customers, not a template.',
        pop: ['Design that is truly yours', 'Flows built for your products', 'Checked on a phone first'],
      },
      {
        t: 'Custom front end',
        href: '/services/web-development/cms-performance/nextjs-webflow-builds',
        d: 'Built with Next.js, with reusable parts so it stays consistent.',
        pop: ['Next.js and React', 'Reusable components', 'Typed code that is easier to change'],
      },
      {
        t: 'Commerce engine connection',
        href: '/contact',
        d: "Products, cart and checkout connected through the engine's APIs.",
        pop: ['Products and stock in step', 'Cart and checkout connected', 'Orders land where you expect'],
      },
      {
        t: 'Content and CMS',
        href: '/blog',
        d: 'A content setup so your team can edit pages and campaigns.',
        pop: ['Editing without a developer', 'Campaign pages on demand', 'A walkthrough for your team'],
      },
      {
        t: 'Speed and caching',
        href: '/services/web-development/cms-performance/core-web-vitals-optimisation',
        d: 'Pages built to load quickly and stay steady while they load.',
        pop: ['Images and fonts handled', 'Smart caching where it helps', 'Checked before launch'],
      },
      {
        t: 'Handover and docs',
        href: '/services/web-development/cms-performance/website-maintenance',
        d: 'Clear notes and a handover, so the build is not a black box.',
        pop: ['Notes on how it works', 'Access and ownership agreed', 'Support options after launch'],
      },
    ],
  },
  steps: {
    aside: 'Headless is a bigger build. You see the plan, the design and the costs of it before we start.',
    items: [
      { n: '01', t: 'Plan', d: 'We check whether headless is worth it for you, and agree the engine and the scope.' },
      { n: '02', t: 'Design', d: 'Storefront and key flows designed before any code.' },
      { n: '03', t: 'Build', d: 'Front end built and connected to the engine, with checkout tested end to end.' },
      { n: '04', t: 'Launch', d: 'Live, with docs, a walkthrough and a plan for ongoing care.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: [],
    metric: {},
    invite: {
      t: 'Your storefront here',
      d: 'Tell us what you sell and what the theme cannot do, and we will tell you if headless is worth it.',
      cta: 'Is headless right?',
      href: '/contact',
    },
  },
  fit: {
    good: ['You have outgrown a theme and want a storefront that is yours.', 'You have a team that will keep building on it.', 'You want a fast, custom experience on top of an engine you trust.'],
    notFit: [
      { t: 'You want to launch quickly with fewer moving parts.', link: 'See Shopify development', href: '/services/web-development/ecommerce/shopify-development' },
      { t: 'You want full control on WordPress.', link: 'See WooCommerce stores', href: '/services/web-development/ecommerce/woocommerce-stores' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Shopify development', d: 'A hosted store, set up around how you sell.', href: '/services/web-development/ecommerce/shopify-development' },
    { t: 'WooCommerce stores', d: 'Full control on WordPress, built to last.', href: '/services/web-development/ecommerce/woocommerce-stores' },
    { t: 'Core Web Vitals optimisation', d: 'Make the pages you have load faster and stay steady.', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
  ],
}
