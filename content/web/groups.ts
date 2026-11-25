import type { LeafContent } from './types'

/** Group pages under /services/web-development. Each one is a LeafContent: the "build" rows link to the pages in the group, and the compare table helps pick one. Real proof only. */

const P = '/services/web-development'
const WAIT = 'We agree the timeline in the plan step, before any design starts.'

export type Group = { slug: string; path: string; name: string; title: string; description: string; c: LeafContent }

const BUSINESS: LeafContent = {
  crumb: 'Business websites',
  h1: ['Websites that', 'bring business.'],
  hero: {
    lead: 'A full site, a single campaign page or a rebuild of the one you have. Whichever you need, we build it to load fast, rank and be easy to edit.',
    words: ['Rank', 'Load', 'Convert', 'Last'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Three ways in',
    rot: 'Built to',
    art: 'shot',
    url: 'apcleanco.com',
  },
  band: [
    ['Next.js', 'Webflow', 'Figma', 'Sanity', 'WordPress', 'Shopify'],
    ['Fast on mobile', 'SEO-ready', 'Easy to edit', 'Built to convert'],
  ],
  friction: {
    statement: 'Your website is where people decide whether to trust you. If it is slow, dated or hard to use, they leave before they ever call.',
    items: [
      { t: 'It looks out of date.', d: 'First impressions are made in seconds, and yours is working against you.', g: 0 },
      { t: 'It does not bring leads.', d: 'People visit, nothing happens, and you cannot say why.', g: 3 },
      { t: 'It is hard to change.', d: 'Every small edit needs a developer and a week.', g: 2 },
    ],
    photo: '/services/web-development/company/friction.webp',
    alt: 'A founder\'s desk by a window with a laptop showing a company website and a notebook with a sitemap sketch',
  },
  compare: {
    aside: 'Three starting points. Pick the one that matches where you are.',
    cols: [{ t: 'Company website' }, { t: 'Landing page' }, { t: 'Redesign & migration' }],
    rows: [
      { k: 'Best for', v: ['A full site that explains what you do', 'One campaign, one offer, one action', 'An old site that needs replacing'] },
      { k: 'Size', v: ['Several pages', 'One page', 'Same pages, rebuilt'] },
      { k: 'Main goal', v: ['Be found and build trust', 'Turn clicks into enquiries', 'Keep your rankings while you upgrade'] },
      { k: 'Starts with', v: ['How you sell', 'The offer and the ad', 'A map of every page you have'] },
    ],
  },
  build: {
    title: ['Pick your', 'starting point'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'Company & service websites', href: `${P}/business-websites/company-service-websites`, d: 'A full marketing site, built around how you sell, easy to edit and quick to load.', pop: ['Pages that rank', 'A CMS your team can use', 'Built around your services'] },
      { t: 'Landing pages', href: `${P}/business-websites/landing-pages`, d: 'One focused page for one offer and one action, matched to your ad.', pop: ['One offer, one action', 'Fast on a phone', 'Tracking set up'] },
      { t: 'Website redesign & migration', href: `${P}/business-websites/website-redesign-migration`, d: 'A better site without losing the search rankings the old one earned.', pop: ['Every page mapped', 'Every old address redirected', 'Checked before and after'] },
    ],
  },
  steps: {
    aside: 'The same four steps for every site, so you always know what comes next.',
    items: [
      { n: '01', t: 'Brief', d: 'We agree what the site is for, who it is for and what counts as success.' },
      { n: '02', t: 'Design', d: 'You see the pages before we build them, and we change what is not right.' },
      { n: '03', t: 'Build', d: 'Design and code together, checked on a real phone before you see it.' },
      { n: '04', t: 'Launch', d: 'Live, tracked, and handed over with a short walkthrough for your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'archmodal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: { t: 'Your site here', d: 'Tell us what you need and we will tell you which of the three fits.', cta: 'Get a free website audit', href: '/contact' },
  },
  fit: {
    good: [
      'You want a website that brings in enquiries, not just a brochure.',
      'You want to edit your own pages without calling a developer.',
      'You want one team to plan, design, build and look after it.',
    ],
    notFit: [
      { t: 'You sell products online.', link: 'See E-commerce', href: `${P}/ecommerce` },
      { t: 'You need a faster or better-run site you already have.', link: 'See CMS & Performance', href: `${P}/cms-performance` },
    ],
  },
  faqs: [
    { q: 'Which one do I need?', a: 'If you need a full site that explains your business, start with a company website. If you are running one campaign, a landing page. If you already have a site that is old or slow, a redesign. Not sure? Tell us on the call and we will say.' },
    { q: 'How long does it take?', a: `It depends on the size of the site. ${WAIT} Our fastest project, AP Cleanco, went from nothing to live in two weeks.` },
    { q: 'Can I edit it myself?', a: 'Yes. We pick a setup that fits your team and show you how to change words and images.' },
    { q: 'Will it rank on Google?', a: 'We build it SEO-ready: clean structure, fast pages and the right titles. We do not promise a ranking, because nobody can.' },
    { q: 'Do you look after it afterwards?', a: 'If you want us to. We offer website maintenance, and we always hand over cleanly if you would rather run it yourself.' },
  ],
  related: [
    { t: 'CMS & Performance', d: 'Next.js and Webflow builds, speed fixes and upkeep.', href: `${P}/cms-performance` },
    { t: 'E-commerce', d: 'Shopify, WooCommerce and headless stores.', href: `${P}/ecommerce` },
    { t: 'All web design & development', d: 'Everything we build, in one place.', href: P },
  ],
}

const CMS: LeafContent = {
  crumb: 'CMS & Performance',
  h1: ['Built fast.', 'Kept fast.'],
  hero: {
    lead: 'The platform your team edits in, the speed your visitors feel, and the upkeep that keeps both working. Pick the part you need.',
    words: ['Build', 'Measure', 'Speed up', 'Maintain'],
    proof: 'AP Cleanco went from no website to live in 2 weeks.',
    tag: 'Built, then looked after',
    rot: 'We',
    art: 'vitals',
    url: 'yoursite.com',
  },
  band: [
    ['Next.js', 'Webflow', 'Sanity', 'Core Web Vitals', 'Vercel', 'WordPress'],
    ['Editable', 'Fast on mobile', 'Measured', 'Looked after'],
  ],
  friction: {
    statement: 'A site is never finished. The platform gets awkward, the pages get slower, and nobody owns the upkeep until something breaks.',
    items: [
      { t: 'It is hard to edit.', d: 'Small changes turn into developer tickets.', g: 2 },
      { t: 'It is slow.', d: 'Pages take too long to show up, especially on a phone.', g: 1 },
      { t: 'Nobody looks after it.', d: 'Updates pile up until something stops working.', g: 0 },
    ],
    photo: '/services/web-development/cms/nextjs-webflow.webp',
    alt: 'A laptop on a desk showing a content editor beside a small stack of abstract panels',
  },
  compare: {
    aside: 'Three jobs, one team. Start with the one that hurts most.',
    cols: [{ t: 'Next.js & Webflow' }, { t: 'Core Web Vitals' }, { t: 'Maintenance' }],
    rows: [
      { k: 'Best for', v: ['A new site, or a move to a better platform', 'A site that feels slow', 'A site that matters and has no owner'] },
      { k: 'What you get', v: ['A site your team can edit', 'Speed fixed and measured', 'A routine of updates and fixes'] },
      { k: 'How it runs', v: ['A project with a launch', 'A project with before and after numbers', 'An ongoing monthly service'] },
    ],
  },
  build: {
    title: ['Pick the', 'job'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'Next.js & Webflow builds', href: `${P}/cms-performance/nextjs-webflow-builds`, d: 'A fast site on the platform that fits how your team works.', pop: ['Code or visual editor', 'Editable by your team', 'Built to stay fast'] },
      { t: 'Core Web Vitals optimisation', href: `${P}/cms-performance/core-web-vitals-optimisation`, d: 'Find what is slowing the pages down, fix it, and show the numbers.', pop: ['Measured before and after', 'Fixes in order of impact', 'No full redesign needed'] },
      { t: 'Website maintenance', href: `${P}/cms-performance/website-maintenance`, d: 'Updates, backups and small fixes, so the site keeps working.', pop: ['Updates applied', 'Backups checked', 'One team to call'] },
    ],
  },
  steps: {
    aside: 'Whichever job you pick, the work follows the same path.',
    items: [
      { n: '01', t: 'Look', d: 'We check how the site works today and where it hurts.' },
      { n: '02', t: 'Plan', d: 'We agree what to do, in what order, and how we will measure it.' },
      { n: '03', t: 'Do', d: 'We build or fix it, and test it on a real phone.' },
      { n: '04', t: 'Keep', d: 'We hand it over, or keep looking after it if you want us to.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['ap-cleanco-site', 'tocal'],
    metric: { 'ap-cleanco-site': '2 weeks, concept to launch' },
    invite: { t: 'Your site here', d: 'Send us the address and we will tell you which of the three would help most.', cta: 'Check my site', href: '/contact' },
  },
  fit: {
    good: [
      'You want a site your team can edit and that stays quick.',
      'You would rather have a routine than fire-fighting.',
      'You want numbers before and after, not a promise.',
    ],
    notFit: [
      { t: 'You need a brand new company site or landing page.', link: 'See Business websites', href: `${P}/business-websites` },
      { t: 'You sell products online.', link: 'See E-commerce', href: `${P}/ecommerce` },
    ],
  },
  faqs: [
    { q: 'Where do I start?', a: 'If the site is slow, start with Core Web Vitals. If it is hard to edit or old, a rebuild on the right platform. If it works but nobody looks after it, maintenance.' },
    { q: 'Next.js or Webflow?', a: 'Next.js gives the most control and speed. Webflow gives a visual editor and is quicker to launch. We recommend the one that fits how your team works.' },
    { q: 'Will you show me the speed numbers?', a: 'Yes. We measure before and after, and show you the same tests we ran.' },
    { q: 'Can you take over a site someone else built?', a: 'Yes. We start with a look at how it is built and tell you what it needs.' },
    { q: 'Is maintenance a contract?', a: 'We agree the scope and the routine up front, so you know what is covered.' },
  ],
  related: [
    { t: 'Business websites', d: 'Company sites, landing pages and redesigns.', href: `${P}/business-websites` },
    { t: 'E-commerce', d: 'Shopify, WooCommerce and headless stores.', href: `${P}/ecommerce` },
    { t: 'All web design & development', d: 'Everything we build, in one place.', href: P },
  ],
}

const SHOP: LeafContent = {
  crumb: 'E-commerce',
  h1: ['Online stores', 'that sell.'],
  hero: {
    lead: 'Shopify, WooCommerce or a fully custom storefront. We help you pick the one that fits how you sell, then build and connect it.',
    words: ['Products', 'Checkout', 'Shipping', 'Payments'],
    proof: "Earth by Blancora: a sustainable storefront for a women's clothing brand.",
    tag: 'Three platforms, one team',
    rot: 'We set up',
    art: 'store',
    url: 'yourstore.com',
  },
  band: [
    ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'Sanity', 'Figma'],
    ['Checkout that works', 'Easy to run', 'Built to sell', 'Handed over clean'],
  ],
  friction: {
    statement: 'Selling online should not mean wrestling the store. The wrong platform, a clumsy checkout or a slow page quietly costs you sales.',
    items: [
      { t: 'The platform does not fit.', d: 'It is either too limited or too heavy for how you sell.', g: 1 },
      { t: 'Checkout loses people.', d: 'Extra steps and surprises send buyers away.', g: 3 },
      { t: 'It is hard to run.', d: 'Adding a product or fixing an order takes too long.', g: 2 },
    ],
    photo: '/services/web-development/ecommerce/shopify.webp',
    alt: 'A desk with a laptop showing an online store and a few packaged products beside it',
  },
  compare: {
    aside: 'Three honest options. The right one depends on how you sell and who runs the store.',
    cols: [{ t: 'Shopify' }, { t: 'WooCommerce' }, { t: 'Headless' }],
    rows: [
      { k: 'Best for', v: ['Launching fast with a hosted store', 'Full control on WordPress', 'A fully custom storefront'] },
      { k: 'Running it', v: ['Hosted for you, updates handled', 'You host it and keep it updated', 'A custom front end plus a commerce backend'] },
      { k: 'Custom features', v: ['Apps and theme changes', 'Plugins and custom code', 'Built to your spec'] },
      { k: 'Editing', v: ['Shopify admin, simple for most teams', 'WordPress admin, familiar to many', 'Depends on the CMS we set up'] },
    ],
  },
  build: {
    title: ['Pick your', 'platform'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'Shopify development', href: `${P}/ecommerce/shopify-development`, d: 'A hosted store set up around how you sell, quick to launch and simple to run.', pop: ['Theme that fits your brand', 'Products and checkout ready', 'Your tools connected'] },
      { t: 'WooCommerce stores', href: `${P}/ecommerce/woocommerce-stores`, d: 'A store on WordPress, with full control over hosting and features.', pop: ['Content and store together', 'Custom features', 'You own the stack'] },
      { t: 'Headless commerce', href: `${P}/ecommerce/headless-commerce`, d: 'A custom storefront on top of a commerce engine you trust.', pop: ['Own the front end', 'Keep the back end', 'Built to stand out'] },
    ],
  },
  steps: {
    aside: 'The same four steps for every store, so you know what comes next.',
    items: [
      { n: '01', t: 'Plan', d: 'We agree what you sell, how you ship and which platform fits.' },
      { n: '02', t: 'Design', d: 'You see the store before we build it, from home page to checkout.' },
      { n: '03', t: 'Build', d: 'Products, payments and shipping set up and tested before launch.' },
      { n: '04', t: 'Launch', d: 'Live, and handed over with training for your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live sites.',
    slugs: ['earth-by-blancora'],
    metric: {},
    invite: { t: 'Your store here', d: 'Tell us what you sell and how you ship, and we will tell you which platform fits.', cta: 'Plan my store', href: '/contact' },
  },
  fit: {
    good: [
      'You sell products and want a checkout customers trust.',
      'You want to manage products and orders without a developer.',
      'You want help choosing the platform, not just building on one.',
    ],
    notFit: [
      { t: 'You need a company website or a single campaign page.', link: 'See Business websites', href: `${P}/business-websites` },
      { t: 'Your store exists and just needs to be faster.', link: 'See CMS & Performance', href: `${P}/cms-performance` },
    ],
  },
  faqs: [
    { q: 'Which platform should I pick?', a: 'Shopify for launching fast with little to maintain. WooCommerce for full control on WordPress. Headless when you have outgrown a theme and have a team to keep building. We say so honestly if another fits better.' },
    { q: 'How long does it take?', a: `It depends on the number of products and the features you need. ${WAIT}` },
    { q: 'Can you move my store from another platform?', a: 'Yes. We move products, customers and content, and plan redirects so existing links keep working.' },
    { q: 'Who owns the store?', a: 'We agree account ownership before we start, with the aim that the store sits under your own account.' },
    { q: 'What happens after launch?', a: 'We hand it over and train your team. If you want ongoing help, we offer maintenance.' },
  ],
  related: [
    { t: 'Business websites', d: 'Company sites, landing pages and redesigns.', href: `${P}/business-websites` },
    { t: 'CMS & Performance', d: 'Next.js and Webflow builds, speed fixes and upkeep.', href: `${P}/cms-performance` },
    { t: 'All web design & development', d: 'Everything we build, in one place.', href: P },
  ],
}

export const GROUPS: Record<'business-websites' | 'cms-performance' | 'ecommerce', Group> = {
  'business-websites': {
    slug: 'business-websites',
    path: `${P}/business-websites`,
    name: 'Business websites',
    title: 'Business Website Design and Development | Website Vikreta',
    description: 'Company websites, landing pages and website redesigns, built to load fast, rank and be easy to edit. Get a free website audit.',
    c: BUSINESS,
  },
  'cms-performance': {
    slug: 'cms-performance',
    path: `${P}/cms-performance`,
    name: 'CMS & Performance',
    title: 'CMS Builds, Site Speed and Maintenance | Website Vikreta',
    description: 'Next.js and Webflow builds, Core Web Vitals fixes and website maintenance, so your site stays fast and easy to edit.',
    c: CMS,
  },
  ecommerce: {
    slug: 'ecommerce',
    path: `${P}/ecommerce`,
    name: 'E-commerce',
    title: 'E-commerce Development: Shopify, WooCommerce, Headless | Website Vikreta',
    description: 'Shopify, WooCommerce and headless commerce stores, set up around how you sell. We help you pick the platform, then build it.',
    c: SHOP,
  },
}
