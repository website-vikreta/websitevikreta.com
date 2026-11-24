import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/product-design/saas-dashboard-ui. Real proof only: 120+ screens comes from components/wv/data.ts (WORK). */

export const PATH = '/services/uiux-design/product-design/saas-dashboard-ui'

export const FAQS = [
  { q: 'What is SaaS and dashboard UI design?', a: 'Designing the screens of a software product, especially ones with lots of data: tables, charts, filters and settings. The goal is that people find what they need quickly.' },
  { q: 'Do you design admin dashboards and internal tools too?', a: 'Yes. The same principles apply: clear structure, readable data and every state covered.' },
  { q: 'Can you work with our existing product?', a: 'Yes. We start with an audit of what you have, then redesign the parts that matter most, using your existing brand.' },
  { q: 'Will developers be able to build it?', a: 'Yes. We hand over specs, states and breakpoints, and we design for buildability.' },
  { q: 'What do I get at the end?', a: 'Flows, high-fidelity screens with all states, a component set in Figma and handoff notes. You keep all of it.' },
]

export const SAAS_UI: LeafContent = {
  crumb: 'SaaS & dashboard UI',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my dashboard',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Dashboards people', 'can read.'],
  hero: {
    lead: 'Clear screens for products full of data: tables, charts, filters and settings. People find what they need fast, and your team can keep building on it.',
    words: ['Tables', 'Charts', 'Filters', 'States'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Built on one system',
    rot: 'We design',
    art: 'dashboard',
    url: 'app.yourproduct.com',
  },
  band: [['Data-heavy', 'Clear hierarchy', 'Every state', 'One system'], ['Figma', 'Framer', 'Prototypes', 'Design systems']],
  friction: {
    statement: 'Data-heavy products get crowded fast. Every team wants their number on the screen, and soon nobody can find the one that matters.',
    items: [
      { t: 'Too much on one screen.', d: 'Everything is shouting, so nothing stands out.', g: 3 },
      { t: 'Empty and error states are missing.', d: 'Screens only work when everything goes right.', g: 1 },
      { t: 'Every page looks different.', d: 'Tables, filters and charts all behave differently.', g: 0 },
    ],
    photo: '/services/uiux-design/pain/checkout-friction.webp',
    alt: 'A checkout flow on a laptop, with recorded user sessions and a chart showing where people drop off, drawn in soft watercolour',
  },
  build: {
    aside: 'Screens that stay clear as the product grows.',
    rows: [
      { t: 'Key flows and jobs', href: '/contact', d: 'We start with what people come to do, and design the shortest path to it.', pop: ['The top tasks', 'Shortest path to each', 'What can wait'] },
      { t: 'Layout and navigation', href: '/contact', d: 'A structure that holds up when you add features, with the important things always in the same place.', pop: ['A steady layout', 'Navigation that scales', 'Clear hierarchy'] },
      { t: 'Tables, charts and filters', href: '/contact', d: 'Data views that are easy to scan, sort and act on.', pop: ['Readable tables', 'Charts that say one thing', 'Filters people find'] },
      { t: 'States', href: '/contact', d: 'Empty, loading, error and success screens, designed so nothing is a dead end.', pop: ['Empty and first-use', 'Loading and errors', 'Success and next step'] },
      { t: 'Roles and permissions', href: '/contact', d: 'Different people see different things, and the screens make that obvious.', pop: ['Role-based views', 'Clear access messages', 'Admin screens'] },
      { t: 'Design system and handoff', href: '/services/uiux-design/design-systems/figma-design-systems', d: 'Everything built from one set of parts, with notes your developers can use.', pop: ['One component set', 'Spacing and states written down', 'Developer notes'] },
    ],
  },
  steps: {
    aside: 'You see real screens early, and every state is covered.',
    items: [
      { n: '01', t: 'Discover', d: 'We learn who uses the product, what they do and what the data means to them.' },
      { n: '02', t: 'Structure', d: 'We map the flows and the layout before drawing any detail.' },
      { n: '03', t: 'Design', d: 'We design the screens and every state, and test them on real tasks.' },
      { n: '04', t: 'Hand off', d: 'Specs, states and files your developers can build from, and a walkthrough.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: {'t': 'Your product here', 'd': 'Tell us what your users do and we will tell you where we would start.', 'cta': 'Plan my dashboard', 'href': '/contact'},
  },
  fit: {
    good: [
      'You have a product full of data, and users who struggle to find things.',
      'You are building a SaaS product or an internal tool and want it clear from day one.',
      'You want screens developers can build without guessing.',
    ],
    notFit: [
      { t: 'You need the whole product built, not just designed.', link: 'See CRMs & Web Applications', href: '/services/apps-crm' },
      { t: 'You need the Figma system behind it.', link: 'See Figma design systems', href: '/services/uiux-design/design-systems/figma-design-systems' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'UX audit', d: 'A ranked list of where visitors get stuck and what to fix first.', href: '/services/uiux-design/research-strategy/ux-audit' },
    { t: 'Figma design systems', d: 'Tokens and components your whole team designs from.', href: '/services/uiux-design/design-systems/figma-design-systems' },
    { t: 'Product Design', d: 'Dashboards, mobile apps and prototypes.', href: '/services/uiux-design/product-design' },
  ],
}
