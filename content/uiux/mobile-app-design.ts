import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/product-design/mobile-app-design. Real proof only: no mobile case study exists in the data, so the page uses an invite card. */

export const PATH = '/services/uiux-design/product-design/mobile-app-design'

export const FAQS = [
  { q: 'Do you design for both iOS and Android?', a: 'Yes. We follow each platform’s habits, and keep one consistent design so your team is not designing twice.' },
  { q: 'Native or cross-platform?', a: 'The design works for either. We note where platform differences matter, so your developers can choose with confidence.' },
  { q: 'Do you build the app?', a: 'This service is the design. If you want the app built too, see CRMs & Web Applications.' },
  { q: 'How long does it take?', a: 'It depends on the number of screens and flows. We agree the timeline in the discover step, before any design starts.' },
  { q: 'What do I get at the end?', a: 'Flows, screens with all states, a clickable prototype, and handoff notes. You keep all of it.' },
]

export const MOBILE_UI: LeafContent = {
  crumb: 'Mobile app design',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my app design',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Mobile apps', 'that fit the thumb.'],
  hero: {
    lead: 'iOS and Android app design, from first flow to final screens. Built for one hand, small screens and short attention, and handed over so developers can build it.',
    words: ['Flows', 'Screens', 'Gestures', 'Handoff'],
    proof: 'Top Rated on Upwork, with 100% Job Success.',
    tag: 'Phone first',
    rot: 'We design',
    art: 'mobile',
    url: 'app store',
  },
  band: [['One-handed', 'Platform-aware', 'Thumb friendly', 'Handoff ready'], ['iOS', 'Android', 'Figma', 'Prototypes']],
  friction: {
    statement: 'People use apps in a hurry, with one hand, on a small screen. If it takes thought, they close it.',
    items: [
      { t: 'Hard to reach.', d: 'Key buttons sit where thumbs cannot get to.', g: 1 },
      { t: 'Looks like a shrunk website.', d: 'It ignores how people use phones.', g: 3 },
      { t: 'iOS and Android feel wrong.', d: 'Each platform has its own habits.', g: 0 },
    ],
    photo: '/services/uiux-design/system/auto-layout/product-card.webp',
    alt: 'A product page shown on a laptop and on a phone, the same layout adapted to each screen',
  },
  build: {
    aside: 'Flows and screens built for the phone first.',
    rows: [
      { t: 'User flows', href: '/contact', d: 'We map the path from opening the app to the goal, and cut every step that is not needed.', pop: ['The main journeys', 'Onboarding', 'Fewest steps'] },
      { t: 'Screens and states', href: '/contact', d: 'Every screen designed with its empty, loading, error and success states.', pop: ['All the states', 'Real content, not lorem', 'Small and large phones'] },
      { t: 'iOS and Android patterns', href: '/contact', d: 'We follow each platform’s habits, so the app feels at home on both.', pop: ['Platform navigation', 'Native-feeling controls', 'One design, two platforms'] },
      { t: 'Touch and gestures', href: '/contact', d: 'Targets sized for thumbs, and gestures that are easy to discover.', pop: ['Reachable controls', 'Swipes that make sense', 'Clear feedback'] },
      { t: 'Prototype', href: '/services/uiux-design/product-design/interactive-prototypes', d: 'A clickable version you can try on a real phone before engineering starts.', pop: ['Tap through on a phone', 'Test with real users', 'Change it quickly'] },
      { t: 'Developer handoff', href: '/contact', d: 'Specs, assets and notes so developers can build it without guessing.', pop: ['Spacing and states', 'Exported assets', 'A walkthrough'] },
    ],
  },
  steps: {
    aside: 'You can try the app on your phone before it is built.',
    items: [
      { n: '01', t: 'Discover', d: 'We learn who will use the app, where and what they need to do.' },
      { n: '02', t: 'Flows', d: 'We map the journeys and the structure of the app.' },
      { n: '03', t: 'Screens', d: 'We design the screens and states and try them as a prototype.' },
      { n: '04', t: 'Hand off', d: 'Specs, assets and a walkthrough for your developers.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: [],
    metric: {},
    invite: {'t': 'Your app here', 'd': 'Tell us who the app is for and we will tell you how we would design it.', 'cta': 'Plan my app design', 'href': '/contact'},
  },
  fit: {
    good: [
      'You are planning a new mobile app and want the design right before building.',
      'Your current app is hard to use, and people drop off.',
      'You want iOS and Android handled by one team.',
    ],
    notFit: [
      { t: 'You need the app built too.', link: 'See CRMs & Web Applications', href: '/services/apps-crm' },
      { t: 'You only need a clickable prototype.', link: 'See Interactive prototypes', href: '/services/uiux-design/product-design/interactive-prototypes' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Interactive prototypes', d: 'Click through the idea before engineering builds it.', href: '/services/uiux-design/product-design/interactive-prototypes' },
    { t: 'SaaS & dashboard UI', d: 'Clear screens for data-heavy products.', href: '/services/uiux-design/product-design/saas-dashboard-ui' },
    { t: 'Product Design', d: 'Dashboards, mobile apps and prototypes.', href: '/services/uiux-design/product-design' },
  ],
}
