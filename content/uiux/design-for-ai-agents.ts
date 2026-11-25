import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/design-systems/design-for-ai-agents. Real proof only: no case study exists yet, so the page uses an invite card. */

export const PATH = '/services/uiux-design/design-systems/design-for-ai-agents'

export const FAQS = [
  { q: 'What does designing for AI agents mean?', a: 'It means designing the interface around a product where an AI does part of the work: how it shows what it is doing, how people review it, and how they take over.' },
  { q: 'Do you build the AI too?', a: 'This service is the interface and the patterns. If you want the AI built as well, see our Applied AI work.' },
  { q: 'Why does the AI need to be labelled?', a: 'People trust a product more when they know what is automated. We never design an AI to pass as a person.' },
  { q: 'What happens when the agent gets it wrong?', a: 'We design for it: clear limits, a way to review before it acts, and an easy way to undo or hand over to a person.' },
  { q: 'What do I get at the end?', a: 'Flows and screens for the agent experience, a set of reusable patterns, and notes your developers can build from. You keep all of it.' },
]

export const AGENT_DESIGN: LeafContent = {
  crumb: 'Design for AI agents',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my agent interface',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Interfaces for', 'AI agents.'],
  hero: {
    lead: 'We design products where an AI does part of the work: clear labels, an easy handoff to a person, and controls that keep people in charge.',
    words: ['Label', 'Explain', 'Hand off', 'Review'],
    proof: 'Top Rated on Upwork, with 100% Job Success.',
    tag: 'People stay in charge',
    rot: 'We',
    art: 'agent',
    url: 'yourproduct.com/assistant',
  },
  band: [
    ['Clear labels', 'Human handoff', 'Visible limits', 'Easy undo'],
    ['Chat', 'Voice', 'Forms', 'Dashboards', 'Review queues'],
  ],
  friction: {
    statement: 'AI features often feel like a black box. People do not know what it did, why, or how to take over. Trust drops fast.',
    items: [
      { t: 'People cannot tell it is AI.', d: 'No label, so it feels like a trick.', g: 1 },
      { t: 'There is no way to take over.', d: 'When it gets stuck, the user is stuck.', g: 0 },
      { t: 'Mistakes are hard to undo.', d: 'No way to see or reverse what the agent did.', g: 2 },
    ],
    photo: '/services/uiux-design/workflow/flow-map.webp',
    alt: 'A flow map of screens joined by arrows, with branches and a small chart, drawn in soft watercolour',
  },
  build: {
    aside: 'Patterns that make an agent clear, safe and easy to take over.',
    rows: [
      { t: 'Agent states', href: '/contact', d: 'Screens that show what the agent is doing, waiting for or unsure about.', pop: ['Working, waiting, done', 'What it is unsure about', 'Plain wording'] },
      { t: 'Labels and disclosure', href: '/contact', d: 'The AI is always labelled, so nobody is misled about who they are talking to.', pop: ['AI is always labelled', 'What it can and cannot do', 'Where data goes'] },
      { t: 'Human handoff', href: '/contact', d: 'A clear way for a person to step in at any point, with the full history.', pop: ['One tap to a person', 'History carried over', 'You decide when'] },
      { t: 'Review and approval', href: '/contact', d: 'Screens where people check what the agent plans to do before it does it.', pop: ['Approve before it acts', 'Edit the draft', 'Queue for busy teams'] },
      { t: 'Undo and history', href: '/contact', d: 'A record of what the agent did, and a way to reverse it.', pop: ['An activity log', 'Undo where possible', 'Clear audit trail'] },
      { t: 'Limits and guardrails', href: '/services/ai', d: 'Rules the agent follows, shown to the people who use it.', pop: ['What it will not do', 'When it asks first', 'Your rules, visible'] },
    ],
  },
  steps: {
    aside: 'We design the experience first, so the AI is built into a flow people trust.',
    items: [
      { n: '01', t: 'Map', d: 'We map what the agent does, what people need to see and when they step in.' },
      { n: '02', t: 'Design', d: 'We design the screens and states, including the unhappy paths.' },
      { n: '03', t: 'Prototype', d: 'We build a clickable version so you can feel how it works.' },
      { n: '04', t: 'Test', d: 'We try it with real people and fix what confuses them.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: [],
    metric: {},
    invite: { t: 'Your agent here', d: 'Tell us what your agent does and we will tell you what the interface needs.', cta: 'Plan my agent interface', href: '/contact' },
  },
  fit: {
    good: [
      'You are building a product where an AI does part of the work.',
      'You want people to trust it, and to be able to take over.',
      'You want the experience designed before the AI is built.',
    ],
    notFit: [
      { t: 'You need the AI itself built.', link: 'See Applied AI', href: '/services/ai' },
      { t: 'You need a general design system.', link: 'See Figma design systems', href: '/services/uiux-design/design-systems/figma-design-systems' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Figma design systems', d: 'Tokens and components your whole team designs from.', href: '/services/uiux-design/design-systems/figma-design-systems' },
    { t: 'Component libraries', d: 'Coded components that match the design exactly.', href: '/services/uiux-design/design-systems/component-libraries' },
    { t: 'Applied AI', d: 'Voice agents, WhatsApp and chat that answer fast.', href: '/services/ai' },
  ],
}
