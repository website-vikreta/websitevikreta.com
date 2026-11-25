import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/design-systems/figma-design-systems. Real proof only: 120+ screens comes from components/wv/data.ts (WORK). */

export const PATH = '/services/uiux-design/design-systems/figma-design-systems'

export const FAQS = [
  { q: 'What is a design system?', a: 'A shared set of colours, type, spacing and components, with rules for using them. Designers and developers build every screen from the same parts.' },
  { q: 'Do we need one?', a: 'If you have more than a handful of screens, or more than one person designing, usually yes. It saves time on every screen after the first.' },
  { q: 'Is this the Figma side or the code side?', a: 'This is the Figma library your designers work from. If you also want the matching coded components, see Component libraries.' },
  { q: 'Can you work with our existing brand?', a: 'Yes. We start from what you have, your colours, fonts and logo, and organise it into a system rather than replacing it.' },
  { q: 'What do I get at the end?', a: 'A Figma library with tokens and components, short usage notes, and a walkthrough for your team. You own all of it.' },
]

export const FIGMA_SYSTEMS: LeafContent = {
  crumb: 'Figma design systems',
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
  h1: ['One system.', 'Every screen.'],
  hero: {
    lead: 'A Figma library of colours, type, spacing and components, so every new screen is built from the same parts. Your team designs faster and your product stays consistent.',
    words: ['Colours', 'Type', 'Spacing', 'Components'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Built once, used everywhere',
    rot: 'We set up',
    art: 'tokens',
    url: 'figma.com/your-system',
  },
  band: [
    ['Tokens', 'Components', 'Variants', 'Documentation'],
    ['Figma', 'Framer', 'Auto layout', 'Variables'],
  ],
  friction: {
    statement: 'Without a system, every new screen is a fresh decision. Buttons drift, spacing changes, and your product slowly stops looking like one product.',
    items: [
      { t: 'Buttons all look slightly different.', d: 'Each designer made their own.', g: 1 },
      { t: 'Design takes longer every month.', d: 'Every screen starts from a blank page.', g: 0 },
      { t: 'Handoff is guesswork.', d: 'Developers rebuild what designers drew.', g: 3 },
    ],
    photo: '/services/uiux-design/pain/handoff-friction.webp',
    alt: 'A design spec on one side, a built product on the other, with mismatches marked between them, drawn in soft watercolour',
  },
  build: {
    aside: 'A library your whole team can design from, with notes on how to use it.',
    rows: [
      { t: 'Audit of what you have', href: '/services/uiux-design/research-strategy/ux-audit', d: 'We collect every colour, font and component in use today and see where they disagree.', pop: ['Every screen reviewed', 'Duplicates found', 'A clear starting point'] },
      { t: 'Tokens', href: '/contact', d: 'Colours, type and spacing defined once, with names your whole team uses.', pop: ['Colour and type styles', 'A spacing scale', 'Named, not hard-coded'] },
      { t: 'Components and variants', href: '/contact', d: 'Buttons, forms, cards and navigation, each with the states and sizes you need.', pop: ['Default, hover, error, disabled', 'Sizes and variants', 'Built to be reused'] },
      { t: 'Auto layout and responsive rules', href: '/contact', d: 'Components that resize properly, so layouts hold up on every screen width.', pop: ['Auto layout throughout', 'Breakpoints defined', 'Spacing that scales'] },
      { t: 'Documentation', href: '/contact', d: 'Short notes on when to use each part, and when not to.', pop: ['Usage notes', 'Do and do not examples', 'Written for new hires'] },
      { t: 'Handoff and training', href: '/services/uiux-design/design-systems/component-libraries', d: 'A walkthrough for your team, and a clear path to the coded version.', pop: ['A team walkthrough', 'Notes for developers', 'Next step: the coded library'] },
    ],
  },
  steps: {
    aside: 'We build on what you already have, not over it.',
    items: [
      { n: '01', t: 'Audit', d: 'We collect what is in use today and find where it disagrees.' },
      { n: '02', t: 'Foundations', d: 'We define colours, type and spacing as tokens.' },
      { n: '03', t: 'Components', d: 'We build the components and their states, and test them on real screens.' },
      { n: '04', t: 'Hand over', d: 'You get the library, short notes and a walkthrough with your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us how many screens you have and where they disagree, and we will tell you where to start.', cta: 'Plan my design system', href: '/contact' },
  },
  fit: {
    good: [
      'You have many screens, or more than one person designing, and things have drifted.',
      'You are about to scale the product and want a base to build on.',
      'You want developers and designers working from the same parts.',
    ],
    notFit: [
      { t: 'You need the coded components, not the Figma library.', link: 'See Component libraries', href: '/services/uiux-design/design-systems/component-libraries' },
      { t: 'You are not sure what is wrong yet.', link: 'See UX audit', href: '/services/uiux-design/research-strategy/ux-audit' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Component libraries', d: 'Coded components that match the design exactly.', href: '/services/uiux-design/design-systems/component-libraries' },
    { t: 'Design for AI agents', d: 'Interfaces for products where an agent does part of the work.', href: '/services/uiux-design/design-systems/design-for-ai-agents' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
