import type { LeafContent } from './types'

/** Copy for /services/web-development/ecommerce/shopify-development. Real proof only; no prices, speed or sales figures. */

export const PATH = '/services/web-development/ecommerce/shopify-development'

export const FAQS = [
  {
    q: 'Why Shopify?',
    a: 'It is hosted for you, quick to launch and simple for teams to run. If another platform fits better, we say so: see the comparison above.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the number of products and the features you need. We agree the timeline in the plan step, before any design starts.',
  },
  {
    q: 'Can you move my store from another platform?',
    a: 'Yes. We move products, customers and content, and plan redirects so existing links keep working.',
  },
  {
    q: 'Who owns the store?',
    a: 'We agree account ownership before we start, with the aim that the store sits under your own account.',
  },
  {
    q: 'Which payment methods can I use?',
    a: 'That depends on where you sell. We set up the ones your customers use and test them before launch.',
  },
  {
    q: 'What happens after launch?',
    a: 'We hand it over and train your team. If you want ongoing help, we offer maintenance.',
  },
]

export const SHOPIFY: LeafContent = {
  crumb: 'Shopify development',
  h1: ['Open the store.', 'Start selling.'],
  hero: {
    lead: 'A Shopify store set up around how you sell: a theme that fits your brand, products and checkout ready, and the tools you already use connected.',
    words: ['Products', 'Checkout', 'Shipping', 'Payments'],
    proof: "Earth by Blancora: a sustainable storefront for a women's clothing brand.",
    tag: 'Shopify, set up properly',
    rot: 'We set up',
    art: 'store',
    url: 'yourstore.com',
  },
  band: [
    ['Shopify', 'Liquid', 'Figma', 'Payments', 'Shipping', 'Analytics'],
    ['Store that sells', 'Easy to run', 'Ready to grow', 'Handed over clean'],
  ],
  friction: {
    statement: 'Opening a store is easy. Opening one that looks like your brand, turns visitors into buyers and runs without daily fixes is the hard part.',
    items: [
      { t: 'Looks like everyone else.', d: 'A stock theme with your logo on top.', g: 0 },
      { t: 'Checkout loses people.', d: 'Extra steps and surprises on the last screen.', g: 1 },
      { t: 'Too many loose ends.', d: 'Apps, shipping and payments that do not talk to each other.', g: 2 },
    ],
    photo: '/services/web-development/ecommerce/shopify.webp',
    alt: 'A desk with a laptop showing an online store, a parcel and a notebook with a product page sketch',
  },
  compare: {
    aside: 'Three honest options. The right one depends on how you sell and who runs the store.',
    cols: [
      { t: 'Shopify', on: true },
      { t: 'WooCommerce', on: false },
      { t: 'Headless', on: false },
    ],
    rows: [
      { k: 'Best for', v: ['Launching fast with a hosted store', 'Full control on WordPress', 'A fully custom storefront'] },
      { k: 'Running it', v: ['Hosted for you, platform updates handled', 'You host it and keep it updated', 'A custom front end plus a commerce backend'] },
      { k: 'Custom features', v: ['Apps and theme changes', 'Plugins and custom code', 'Built to your spec'] },
      { k: 'Editing', v: ['Shopify admin, simple for most teams', 'WordPress admin, familiar to many', 'Depends on the CMS we set up'] },
    ],
  },
  connects: {
    aside: 'The store only works if the pieces around it work too.',
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
    aside: 'A store built to sell, and simple enough for your team to run.',
    rows: [
      {
        t: 'Theme and design',
        href: '/work',
        d: 'A theme shaped to your brand, not a template with your logo on it.',
        pop: ['Your brand, not a stock look', 'Product and collection pages that sell', 'Checked on a phone first'],
      },
      {
        t: 'Products and collections',
        href: '/work',
        d: 'Your catalogue loaded and organised so customers can find things.',
        pop: ['Products, variants and images', 'Collections and filters', 'Clean titles and descriptions'],
      },
      {
        t: 'Checkout and payments',
        href: '/contact',
        d: 'A checkout with few steps and the payment methods your customers use.',
        pop: ['Fewer steps to pay', 'Local payment methods', 'Tested end to end'],
      },
      {
        t: 'Shipping and taxes',
        href: '/contact',
        d: 'Rates, rules and tax settings set up for where you actually ship.',
        pop: ['Shipping rates and zones', 'Tax settings that match', 'Order emails that make sense'],
      },
      {
        t: 'Apps and integrations',
        href: '/services/ai',
        d: 'Only the apps you need, connected to the tools you already run.',
        pop: ['Fewer, better apps', 'Accounting and stock connected', 'Automations where they save time'],
      },
      {
        t: 'Launch and training',
        href: '/contact',
        d: 'Go-live checks and a walkthrough, so your team can run it from day one.',
        pop: ['Final checks before launch', 'A short how-to for your team', 'Support options after launch'],
      },
    ],
  },
  steps: {
    aside: 'You approve the plan and the design before we build the store.',
    items: [
      { n: '01', t: 'Plan', d: 'We agree your products, shipping, payments and what the store must do.' },
      { n: '02', t: 'Design', d: 'Theme and key pages designed around your brand.' },
      { n: '03', t: 'Build', d: 'Store built, products loaded and checkout tested from first click to paid order.' },
      { n: '04', t: 'Launch', d: 'Live, with a walkthrough so your team can run it.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['earth-by-blancora'],
    metric: {},
    invite: {
      t: 'Your store here',
      d: 'Tell us what you sell and how you ship, and we will tell you what the store needs.',
      cta: 'Plan my store',
      href: '/contact',
    },
  },
  fit: {
    good: ['You want to launch a store quickly without running servers.', 'You sell products and want a checkout customers trust.', 'You want to manage products and orders without a developer.'],
    notFit: [
      { t: 'You want full control and own hosting on WordPress.', link: 'See WooCommerce stores', href: '/services/web-development/ecommerce/woocommerce-stores' },
      { t: 'You want a fully custom storefront.', link: 'See Headless commerce', href: '/services/web-development/ecommerce/headless-commerce' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'WooCommerce stores', d: 'Full control on WordPress, built to last.', href: '/services/web-development/ecommerce/woocommerce-stores' },
    { t: 'Headless commerce', d: 'A custom storefront on a commerce engine.', href: '/services/web-development/ecommerce/headless-commerce' },
    { t: 'Core Web Vitals optimisation', d: 'Make the pages you have load faster and stay steady.', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
  ],
}
