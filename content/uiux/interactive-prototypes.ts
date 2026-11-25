import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/product-design/interactive-prototypes. Real proof only: 120+ screens comes from components/wv/data.ts (WORK). */

export const PATH = '/services/uiux-design/product-design/interactive-prototypes'

export const FAQS = [
  { q: 'What is an interactive prototype?', a: 'A clickable version of your product that looks and behaves like the real thing, but is not built yet. It lets you test an idea cheaply.' },
  { q: 'How realistic is it?', a: 'Real screens, real content and realistic transitions, so people react as they would to the finished product.' },
  { q: 'Can we test it with users?', a: 'Yes. We can run moderated or unmoderated tests on the prototype and report what we find.' },
  { q: 'Is the prototype reusable?', a: 'Yes. It becomes the reference for developers, along with specs and the design system.' },
  { q: 'What do I get at the end?', a: 'A clickable prototype link, the Figma files behind it, and notes on what we learned. You keep all of it.' },
]

export const PROTOTYPES: LeafContent = {
  crumb: 'Interactive prototypes',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my prototype',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Click through', 'it first.'],
  hero: {
    lead: 'A clickable version of your product, before engineering builds it. Show it to stakeholders and users, learn what to change, and build the right thing once.',
    words: ['Link', 'Click', 'Test', 'Change'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Click before you build',
    rot: 'We',
    art: 'proto',
    url: 'prototype.yourproduct.com',
  },
  band: [['Clickable', 'Realistic', 'Testable', 'Quick to change'], ['Figma', 'Framer', 'Maze', 'Prototypes']],
  friction: {
    statement: 'Static mockups hide problems. You only find out something does not work after engineering has built it, which is the most expensive time.',
    items: [
      { t: 'Mockups look finished but are not.', d: 'Nobody can tell how it feels to use.', g: 3 },
      { t: 'Stakeholders imagine different things.', d: 'Everyone approves a different product.', g: 1 },
      { t: 'Changes cost a lot later.', d: 'Fixing it in code takes far longer than in a prototype.', g: 2 },
    ],
    photo: '/services/uiux-design/workflow/design-canvas.webp',
    alt: 'A design canvas with five linked screens of a checkout flow, with comments from teammates',
  },
  build: {
    aside: 'Something you can click, show and test this week.',
    rows: [
      { t: 'Flow selection', href: '/contact', d: 'We pick the journeys that matter most, so the prototype answers your biggest questions.', pop: ['The key journeys', 'What to leave out', 'What you need to learn'] },
      { t: 'Clickable screens', href: '/contact', d: 'Real screens, linked together, so it feels like the product.', pop: ['Real content', 'Linked screens', 'Works on a phone'] },
      { t: 'Transitions and states', href: '/contact', d: 'Motion, feedback and states, so people can feel how it behaves.', pop: ['Transitions', 'Hover and tap feedback', 'Error and success'] },
      { t: 'Test with real users', href: '/services/uiux-design/research-strategy/user-interviews-testing', d: 'We put the prototype in front of people and watch where they hesitate.', pop: ['Moderated or unmoderated', 'Real tasks', 'Plain findings'] },
      { t: 'Stakeholder review', href: '/contact', d: 'A version your team and your investors can click through, so everyone sees the same thing.', pop: ['A shareable link', 'Comments in one place', 'One version of the truth'] },
      { t: 'Handoff', href: '/services/uiux-design/design-systems/figma-design-systems', d: 'The final flow, ready for developers, with the specs they need.', pop: ['Specs and states', 'Linked to the design system', 'A walkthrough'] },
    ],
  },
  steps: {
    aside: 'You can change it in an afternoon, not a sprint.',
    items: [
      { n: '01', t: 'Scope', d: 'We pick the flows to prototype and what you want to learn.' },
      { n: '02', t: 'Link', d: 'We link the screens into a clickable prototype.' },
      { n: '03', t: 'Test', d: 'We test it with your team and with real users.' },
      { n: '04', t: 'Refine', d: 'We change what did not work, and hand it over.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: {'t': 'Your idea here', 'd': 'Tell us what you want to try and we will tell you what the prototype needs.', 'cta': 'Plan my prototype', 'href': '/contact'},
  },
  fit: {
    good: [
      'You have an idea and want to see how it feels before building.',
      'You need stakeholders or investors to agree on one version.',
      'You want to test with users before engineering starts.',
    ],
    notFit: [
      { t: 'You need the final screens designed.', link: 'See SaaS & dashboard UI', href: '/services/uiux-design/product-design/saas-dashboard-ui' },
      { t: 'You need the app itself built.', link: 'See CRMs & Web Applications', href: '/services/apps-crm' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'User interviews & testing', d: 'Hear from real users and watch them use it.', href: '/services/uiux-design/research-strategy/user-interviews-testing' },
    { t: 'Mobile app design', d: 'iOS and Android flows that fit the thumb.', href: '/services/uiux-design/product-design/mobile-app-design' },
    { t: 'Product Design', d: 'Dashboards, mobile apps and prototypes.', href: '/services/uiux-design/product-design' },
  ],
}
