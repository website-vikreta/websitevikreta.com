import type { LeafContent } from '../web/types'

/** Copy for the /services/uiux-design/product-design group page. Real proof only. */

export const PATH = '/services/uiux-design/product-design'
const P = PATH

export const FAQS = [
  { q: 'Which one do I need?', a: 'If your product is full of data, start with SaaS & dashboard UI. If it lives on a phone, Mobile app design. If you want to test an idea before building, Interactive prototypes. Not sure? Tell us and we will point you to it.' },
  { q: 'Can I combine them?', a: 'Yes. Many projects start with a prototype, then move to the full screens. We plan that order with you in the first step.' },
  { q: 'Do you build the product too?', a: 'These services are the design. If you want it built as well, see CRMs & Web Applications.' },
  { q: 'Can you work with our existing brand?', a: 'Yes. We extend what you have, colours, type and components, rather than starting over.' },
  { q: 'What do I get at the end?', a: 'Flows, screens with every state, a Figma file that is organised for developers, and a walkthrough. You keep all of it.' },
]

export const PRODUCT_DESIGN: LeafContent = {
  crumb: 'Product Design',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Get a free UX audit',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Interfaces that', 'feel obvious.'],
  hero: {
    lead: 'Screens for dashboards, mobile apps and web products, designed around how people actually use them. Pick the part you need, or all three.',
    words: ['Dashboards', 'Apps', 'Flows', 'Prototypes'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Three ways in',
    rot: 'We design',
    art: 'dashboard',
    url: 'yourproduct.com',
  },
  band: [
    ['Clear flows', 'Every state', 'One system', 'Developer ready'],
    ['Figma', 'Framer', 'Maze', 'Prototypes', 'Design systems'],
  ],
  friction: {
    statement: 'Most products are not hard to build. They are hard to use. People get lost, give up and never tell you why.',
    items: [
      { t: 'Users get lost.', d: 'Nobody can find the next step, so they leave.', g: 1 },
      { t: 'Screens are inconsistent.', d: 'Each page was designed on its own.', g: 0 },
      { t: 'Handoff is messy.', d: 'Developers guess at spacing, states and edge cases.', g: 3 },
    ],
    photo: '/services/uiux-design/system/spacing/space-01.webp',
    alt: 'A design system sheet showing spacing, grids, form fields and button states laid out as a clean reference board',
  },
  compare: {
    aside: 'Three starting points. Pick the one that matches what you are building.',
    cols: [{ t: 'SaaS & dashboard UI' }, { t: 'Mobile app design' }, { t: 'Interactive prototypes' }],
    rows: [
      { k: 'Best for', v: ['A product full of data', 'An app people use on the go', 'An idea you want to test first'] },
      { k: 'You get', v: ['Screens with every state', 'iOS and Android flows', 'A clickable version'] },
      { k: 'Starts with', v: ['What people come to do', 'The main journeys', 'The questions to answer'] },
    ],
  },
  build: {
    title: ['Pick your', 'starting point'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'SaaS & dashboard UI', href: `${P}/saas-dashboard-ui`, d: 'Clear screens for data-heavy products.', pop: ['Tables, charts and filters', 'Every state covered', 'Built on one system'] },
      { t: 'Mobile app design', href: `${P}/mobile-app-design`, d: 'iOS and Android flows that fit the thumb.', pop: ['Phone first', 'Platform-aware', 'Handoff ready'] },
      { t: 'Interactive prototypes', href: `${P}/interactive-prototypes`, d: 'Click through the idea before engineering builds it.', pop: ['Clickable and realistic', 'Test with real users', 'Quick to change'] },
    ],
  },
  steps: {
    aside: 'The same four steps for every product, so you always know what comes next.',
    items: [
      { n: '01', t: 'Discover', d: 'We learn who uses the product, what they do and where they get stuck.' },
      { n: '02', t: 'Structure', d: 'We map the flows and the layout before drawing any detail.' },
      { n: '03', t: 'Design', d: 'We design the screens and every state, and test them.' },
      { n: '04', t: 'Hand off', d: 'Specs, states and files your developers can build from, and a walkthrough.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us what you are building and we will tell you which of the three fits.', cta: 'Get a free UX audit', href: '/contact' },
  },
  fit: {
    good: [
      'You are building a product and want the interface to be clear from day one.',
      'Your current product is hard to use, and people drop off.',
      'You want one team for flows, screens and handoff.',
    ],
    notFit: [
      { t: 'You want to find out what is wrong first.', link: 'See UX audit', href: '/services/uiux-design/research-strategy/ux-audit' },
      { t: 'You need a design system behind the screens.', link: 'See Figma design systems', href: '/services/uiux-design/design-systems/figma-design-systems' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'UX audit', d: 'A ranked list of where visitors get stuck and what to fix first.', href: '/services/uiux-design/research-strategy/ux-audit' },
    { t: 'Figma design systems', d: 'Tokens and components your whole team designs from.', href: '/services/uiux-design/design-systems/figma-design-systems' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
