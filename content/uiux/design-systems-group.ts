import type { LeafContent } from '../web/types'

/** Copy for the /services/uiux-design/design-systems group page. Real proof only: 120+ screens comes from components/wv/data.ts (WORK). */

export const PATH = '/services/uiux-design/design-systems'
const P = PATH

export const FAQS = [
  { q: 'Which one do I need?', a: 'If your designers are drifting out of sync, a Figma design system. If your developers keep rebuilding the same parts, a component library. If your product has an AI doing part of the work, design for AI agents. Many teams start with the Figma system, then the coded version.' },
  { q: 'Can I combine them?', a: 'Yes. A common order is the Figma library first, then the coded components, so the code matches the design from day one.' },
  { q: 'Do we need a design system?', a: 'If you have more than a handful of screens, or more than one person designing, usually yes. It saves time on every screen after the first.' },
  { q: 'Can you work with our existing brand?', a: 'Yes. We start with your colours, fonts and logo, and organise them into a system rather than replacing them.' },
  { q: 'What do I get at the end?', a: 'The library or components, short usage notes and a walkthrough for your team. You own all of it.' },
]

export const SYSTEMS_GROUP: LeafContent = {
  crumb: 'Design Systems',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my design system',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Build once,', 'use everywhere.'],
  hero: {
    lead: 'Figma libraries, coded components and patterns for AI agents, so every screen is built from the same parts and your team moves faster.',
    words: ['Tokens', 'Components', 'Patterns', 'Docs'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Three ways in',
    rot: 'We set up',
    art: 'tokens',
    url: 'figma.com/your-system',
  },
  band: [
    ['Tokens', 'Components', 'Variants', 'Documentation'],
    ['Figma', 'React', 'Tailwind', 'Auto layout', 'Variables'],
  ],
  friction: {
    statement: 'Without a system, every new screen is a fresh decision. Buttons drift, spacing changes, and your product slowly stops looking like one product.',
    items: [
      { t: 'Buttons all look slightly different.', d: 'Each designer made their own.', g: 1 },
      { t: 'Code drifts from design.', d: 'What shipped is not what was drawn.', g: 0 },
      { t: 'Every screen is a fresh decision.', d: 'Design takes longer every month.', g: 3 },
    ],
    photo: '/services/uiux-design/system/spacing/space-01.webp',
    alt: 'A design system sheet showing spacing, grids, form fields and button states laid out as a clean reference board',
  },
  compare: {
    aside: 'Three parts of the same system. Pick the one that matches your gap.',
    cols: [{ t: 'Figma design systems' }, { t: 'Component libraries' }, { t: 'Design for AI agents' }],
    rows: [
      { k: 'Best for', v: ['Designers drifting out of sync', 'Developers rebuilding the same parts', 'A product where an AI does part of the work'] },
      { k: 'You get', v: ['A Figma library with tokens and components', 'Coded, tested components that match the design', 'Patterns and screens for the agent experience'] },
      { k: 'Works with', v: ['Your designers', 'Your developers', 'Your product team'] },
    ],
  },
  build: {
    title: ['Pick your', 'starting point'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'Figma design systems', href: `${P}/figma-design-systems`, d: 'Tokens and components your whole team designs from.', pop: ['Colours, type, spacing', 'Components and variants', 'Usage notes'] },
      { t: 'Component libraries', href: `${P}/component-libraries`, d: 'Coded components that match the design exactly.', pop: ['Matches the design', 'Accessible by default', 'Documented'] },
      { t: 'Design for AI agents', href: `${P}/design-for-ai-agents`, d: 'Interfaces for products where an agent does part of the work.', pop: ['Clear labels', 'Human handoff', 'Review and undo'] },
    ],
  },
  steps: {
    aside: 'We build on what you already have, not over it.',
    items: [
      { n: '01', t: 'Audit', d: 'We collect what is in use today and find where it disagrees.' },
      { n: '02', t: 'Foundations', d: 'We define colours, type and spacing as tokens.' },
      { n: '03', t: 'Components', d: 'We build and test the components, in Figma or in code.' },
      { n: '04', t: 'Hand over', d: 'You get the system, short notes and a walkthrough with your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us where your screens disagree and we will tell you where to start.', cta: 'Plan my design system', href: '/contact' },
  },
  fit: {
    good: [
      'You have many screens, or more than one person designing, and things have drifted.',
      'You are about to scale the product and want a base to build on.',
      'You want designers and developers working from the same parts.',
    ],
    notFit: [
      { t: 'You are not sure what is wrong yet.', link: 'See Research & Strategy', href: '/services/uiux-design/research-strategy' },
      { t: 'You need new screens designed.', link: 'See Product Design', href: '/services/uiux-design/product-design' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Research & Strategy', d: 'UX audits, user testing and site structure.', href: '/services/uiux-design/research-strategy' },
    { t: 'Product Design', d: 'Dashboards, mobile apps and prototypes.', href: '/services/uiux-design/product-design' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
