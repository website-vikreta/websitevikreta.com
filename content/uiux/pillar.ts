import type { PillarProps } from '@/components/wv/web/WebPillar'
import { STATS } from '@/components/wv/data'

/** Copy for the /services/uiux-design hub. Real proof only: the 120+ screens figure comes from components/wv/data.ts (WORK). */

const P = '/services/uiux-design'
const UX_AUDIT = `${P}/research-strategy/ux-audit`

export const UIUX_PILLAR: PillarProps = {
  name: 'UI/UX design',
  crumb: 'UI/UX Design',
  cta: 'Get a free UX audit',
  rot: 'We',
  art: 'ux',
  h1: ['Design that', 'people get', 'instantly.'],
  lead: 'Research, interface design and design systems for web and mobile products. We find where people get stuck, design the fix, and hand over files your developers can ship.',
  words: ['research', 'design', 'prototype', 'hand off'],
  groupsAside: 'Three groups, nine services. Start with the one that fits, we will tell you if another one fits better.',

  groups: [
    {
      id: 'research-strategy',
      t: 'Research & Strategy',
      strip: 'UX audits, user testing and site structure.',
      d: 'Find out where users get stuck before redesigning anything.',
      href: `${P}/research-strategy`,
      rows: [
        { t: 'UX audit', d: 'A ranked list of where visitors get stuck and what to fix first.', href: UX_AUDIT },
        { t: 'User interviews & testing', d: 'Hear from real users and watch them use it.', href: `${P}/research-strategy/user-interviews-testing` },
        { t: 'Information architecture', d: 'Structure and navigation that make sense before any pixels.', href: `${P}/research-strategy/information-architecture` },
      ],
    },
    {
      id: 'product-design',
      t: 'Product Design',
      strip: 'Dashboards, mobile apps and prototypes.',
      d: 'Interfaces for web apps, dashboards and mobile that feel obvious.',
      href: `${P}/product-design`,
      rows: [
        { t: 'SaaS & dashboard UI', d: 'Clear screens for data-heavy products.', href: `${P}/product-design/saas-dashboard-ui` },
        { t: 'Mobile app design', d: 'iOS and Android flows that fit the thumb.', href: `${P}/product-design/mobile-app-design` },
        { t: 'Interactive prototypes', d: 'Click through the idea before engineering builds it.', href: `${P}/product-design/interactive-prototypes` },
      ],
    },
    {
      id: 'design-systems',
      t: 'Design Systems',
      strip: 'Figma systems, component libraries, AI agents.',
      d: 'Components and rules that keep every new screen consistent.',
      href: `${P}/design-systems`,
      rows: [
        { t: 'Figma design systems', d: 'Tokens and components your whole team designs from.', href: `${P}/design-systems/figma-design-systems` },
        { t: 'Component libraries', d: 'Coded components that match the design exactly.', href: `${P}/design-systems/component-libraries` },
        { t: 'Design for AI agents', d: 'Interfaces for products where an agent does part of the work.', tag: 'New', href: `${P}/design-systems/design-for-ai-agents` },
      ],
    },
  ],

  friction: {
    statement: 'Most products are not hard to build. They are hard to use. People get lost, give up and never tell you why.',
    items: [
      { t: 'Users get lost.', d: 'Nobody can find the next step, so they leave.' },
      { t: 'Handoff is messy.', d: 'Developers guess at spacing, states and edge cases.' },
      { t: 'Every screen is different.', d: 'Without a system, each new screen is a fresh decision.' },
    ],
  },

  band: [
    ['Figma', 'Framer', 'Maze', 'Prototypes', 'Design systems', 'Handoff specs'],
    ['Clear flows', 'Real users', 'Shippable files', 'Plain words'],
  ],

  includes: [
    { t: 'User flows', d: 'The path from first screen to goal, mapped before we design a single screen.', link: 'Talk through your flow', img: '/services/uiux-design/workflow/flow-map.webp', alt: 'A flow map showing steps and branches between screens' },
    { t: 'Screens and states', d: 'Every screen designed with its empty, loading, error and success states.', link: 'See how we design states', img: '/services/uiux-design/workflow/design-canvas.webp', alt: 'A design canvas with screens laid out side by side' },
    { t: 'Handoff your developers can use', d: 'Spacing, states and breakpoints written down, so nobody has to guess.', link: 'Ask about handoff', img: '/services/uiux-design/pain/handoff-friction.webp', alt: 'A designer handing a spec to a developer' },
  ],
  includesTitle: ['What every', 'project includes'],
  includesAside: 'Whichever group you pick, these three come standard.',

  steps: {
    aside: 'Four steps. Research and handoff sit on the same line as the design.',
    items: [
      { n: '01', t: 'Discover', d: 'Analytics, support tickets and session patterns show where people stall, before we sketch.' },
      { n: '02', t: 'Architect', d: 'Hierarchy, key flows and a component inventory. Structure before pixels.' },
      { n: '03', t: 'Prototype', d: 'Clickable paths on real breakpoints, tested with stakeholders before engineering commits.' },
      { n: '04', t: 'Hand off', d: 'Specs, states and files your developers can ship from, and a walkthrough with your team.' },
    ],
  },

  stats: [STATS[0], STATS[1], STATS[3]],

  proof: {
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal', 'archmodal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
  },
  proofTitle: ['Work we have', 'designed'],
  proofAside: 'Real clients, live products. Click through and check.',

  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],

  faqs: [
    { q: 'What do we actually get at the end?', a: 'Flows, high-fidelity UI, a component library in your stack (Figma or code), and handoff notes covering spacing, states and breakpoints. Not just mockups.' },
    { q: 'Do you run user tests?', a: 'When the budget and timeline allow, yes: moderated or unmoderated, plus an analytics review either way. If testing is not in scope, we still design from what your data shows.' },
    { q: 'We already have developers. Do you only design?', a: 'We design for buildability. Your team implements, or we partner on the front end. Either way, the specs are meant to survive contact with production.' },
    { q: 'How long does a UI/UX engagement take?', a: 'It depends on the surface area and the review cycle. We agree the timeline in the discover step, before any design starts.' },
    { q: 'Can you work inside our existing brand?', a: 'Yes. We extend what you have, tokens, type and components, rather than throwing away recognisable brand equity unless you ask for a reset.' },
  ],
}
