import type { LeafContent } from './types'

/** Copy for /services/web-development/ecommerce/woocommerce-stores. Real proof only; no prices, speed or sales figures. */

export const PATH = '/services/web-development/ecommerce/woocommerce-stores'

export const FAQS = [
  {
    q: 'Why WooCommerce instead of Shopify?',
    a: 'WooCommerce gives you control and runs on WordPress. Shopify is hosted and simpler to run. We compare them above and recommend one for your case.',
  },
  {
    q: 'Do I need my own hosting?',
    a: 'Yes. We advise on hosting that suits the store, and we agree who sets it up before we start.',
  },
  {
    q: 'Can you speed up my existing WooCommerce store?',
    a: 'Often yes. See Core Web Vitals optimisation for how we measure and fix it.',
  },
  {
    q: 'Will it be secure?',
    a: 'We keep software current, limit plugins and set up backups. No store is risk-free, so we also offer ongoing maintenance.',
  },
  {
    q: 'Can you move me from Shopify?',
    a: 'Yes. We move products and content and plan redirects, so existing links keep working.',
  },
  {
    q: 'What happens after launch?',
    a: 'We hand it over and train your team. If you want ongoing help, we offer maintenance.',
  },
]

export const WOOCOMMERCE: LeafContent = {
  crumb: 'WooCommerce stores',
  h1: ['Your store.', 'Your rules.'],
  hero: {
    lead: 'A WooCommerce store on WordPress, built when you want full control: your own hosting, your own plugins and no platform deciding what you can change.',
    words: ['Products', 'Plugins', 'Checkout', 'Speed'],
    proof: "Earth by Blancora: a sustainable storefront for a women's clothing brand.",
    tag: 'WordPress, full control',
    rot: 'We build',
    art: 'store',
    url: 'yourstore.com',
  },
  band: [
    ['WooCommerce', 'WordPress', 'PHP', 'Figma', 'Payments', 'Shipping'],
    ['Full control', 'Own your stack', 'Built to last', 'Handed over clean'],
  ],
  friction: {
    statement: 'Add a plugin for everything and the store gets slow, fragile and scary to update. Build it carefully and it stays quick and under your control.',
    items: [
      { t: 'Slow store.', d: 'Too many plugins and heavy pages.', g: 0 },
      { t: 'Plugins clash.', d: 'One update breaks another feature.', g: 1 },
      { t: 'Updates feel risky.', d: 'Nobody wants to touch it before a sale.', g: 2 },
    ],
    photo: '/services/web-development/ecommerce/woocommerce.webp',
    alt: 'A desk with a laptop showing a WordPress store dashboard and a notebook with a plugin checklist',
  },
  compare: {
    aside: 'Three honest options. The right one depends on how you sell and who runs the store.',
    cols: [
      { t: 'Shopify', on: false },
      { t: 'WooCommerce', on: true },
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
    aside: 'WooCommerce is open, so almost anything can connect. The skill is choosing what should.',
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
    aside: 'A store you control, kept lean so it stays fast.',
    rows: [
      {
        t: 'Store setup',
        href: '/work',
        d: 'WooCommerce installed and configured around how you actually sell.',
        pop: ['Products, variants and stock', 'Pages and menus planned', 'Settings that match your business'],
      },
      {
        t: 'Custom features',
        href: '/services/web-development',
        d: 'Features built for you, not a stack of plugins for each one.',
        pop: ['Custom code where it helps', 'Fewer plugins, fewer clashes', 'Documented so others can follow'],
      },
      {
        t: 'Payments and shipping',
        href: '/contact',
        d: 'Payment gateways, shipping rules and taxes set up and tested.',
        pop: ['Gateways your customers use', 'Rates and zones', 'Tested before launch'],
      },
      {
        t: 'Speed and hosting',
        href: '/services/web-development/cms-performance/core-web-vitals-optimisation',
        d: 'Advice on hosting and a build that stays quick as the catalogue grows.',
        pop: ['Hosting that fits the store', 'Images and scripts kept light', 'Checked on a phone'],
      },
      {
        t: 'Security and backups',
        href: '/services/web-development/cms-performance/website-maintenance',
        d: 'Sensible protection and backups, so a bad day is not a disaster.',
        pop: ['Updates kept current', 'Backups you can restore', 'Admin access kept tidy'],
      },
      {
        t: 'Training and handover',
        href: '/contact',
        d: 'You get a walkthrough and notes, so your team can run it.',
        pop: ['A short how-to for your team', 'Notes on what was built', 'Support options after launch'],
      },
    ],
  },
  steps: {
    aside: 'You know what we are building and why before we write any code.',
    items: [
      { n: '01', t: 'Plan', d: 'We agree what the store must do and which plugins earn their place.' },
      { n: '02', t: 'Design', d: 'Pages and key flows designed around your brand and your customers.' },
      { n: '03', t: 'Build', d: 'Store built lean, products loaded and checkout tested end to end.' },
      { n: '04', t: 'Launch', d: 'Live, with hosting checked and a walkthrough for your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['earth-by-blancora'],
    metric: {},
    invite: {
      t: 'Your store here',
      d: 'Tell us how you sell and what you want to control, and we will say if WooCommerce fits.',
      cta: 'Plan my store',
      href: '/contact',
    },
  },
  fit: {
    good: ['You want full control of your store and your hosting.', 'You already use WordPress or want your content and store together.', 'You need custom features a hosted platform makes awkward.'],
    notFit: [
      { t: 'You want a hosted store with less to look after.', link: 'See Shopify development', href: '/services/web-development/ecommerce/shopify-development' },
      { t: 'You want a fully custom storefront.', link: 'See Headless commerce', href: '/services/web-development/ecommerce/headless-commerce' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Shopify development', d: 'A hosted store, set up around how you sell.', href: '/services/web-development/ecommerce/shopify-development' },
    { t: 'Headless commerce', d: 'A custom storefront on a commerce engine.', href: '/services/web-development/ecommerce/headless-commerce' },
    { t: 'Website maintenance', d: 'Updates, backups and fixes, so it keeps working.', href: '/services/web-development/cms-performance/website-maintenance' },
  ],
}
