import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/research-strategy/ux-audit. Real proof only: the 120+ screens figure comes from components/wv/data.ts (WORK). */

export const PATH = '/services/uiux-design/research-strategy/ux-audit'

export const FAQS = [
  { q: 'How long does an audit take?', a: 'It depends on the size of the site or app. We agree the timeline and the flows we will cover in the brief step, before we start.' },
  { q: 'What do you need from me?', a: 'The address of your site or app, access to your analytics if you have it, and a few words on what you want to improve.' },
  { q: 'Do you fix the problems too?', a: 'We can. The audit gives you the list. If you want help with the fixes, we quote them separately, and you can also hand the list to your own team.' },
  { q: 'Is the first look really free?', a: 'We give you a free first look and tell you what we see. A full audit is scoped on a call, so you know what is covered.' },
  { q: 'What do I get at the end?', a: 'A short ranked list of fixes, a journey map, and a walkthrough call. You keep all of it.' },
]

export const UX_AUDIT: LeafContent = {
  crumb: 'UX audit',
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
  h1: ['Find where', 'people get stuck.'],
  hero: {
    lead: 'A clear review of your site or app: where visitors get stuck, why it costs you, and what to fix first. You get a ranked list of fixes, not a thick report.',
    words: ['Review', 'Find', 'Rank', 'Fix'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Ranked by impact',
    rot: 'We',
    art: 'audit',
    url: 'yoursite.com',
  },
  band: [
    ['Clear findings', 'Ranked fixes', 'Plain words', 'No jargon'],
    ['Figma', 'Framer', 'Maze', 'Analytics', 'Session replays', 'Accessibility checks'],
  ],
  friction: {
    statement: 'Visitors do not tell you why they left. They just go. A UX audit finds the reason, so you fix the right thing first.',
    items: [
      { t: 'Nobody knows why they leave.', d: 'Visitors drop off and the numbers cannot say where or why.', g: 1 },
      { t: 'Fixes are guesses.', d: 'You change a button and hope.', g: 0 },
      { t: 'Redesigns miss the real problem.', d: 'A new look on the same confusing flow.', g: 3 },
    ],
    photo: '/services/uiux-design/pain/landing-friction.webp',
    alt: 'A visitor frowning at a phone, a heatmap on a phone screen and small charts, drawn in soft watercolour',
  },
  build: {
    aside: 'A short, ranked list you can act on this week.',
    rows: [
      { t: 'Friction review', href: '/services/uiux-design', d: 'We walk your key flows like a first-time visitor and note every place they hesitate.', pop: ['Sign-up and checkout flows', 'Forms and error messages', 'Navigation and search'] },
      { t: 'Journey map', href: '/services/uiux-design', d: 'One page showing the steps people take, and where they drop off.', pop: ['Steps from first click to goal', 'Drop-off points marked', 'Plain labels, no jargon'] },
      { t: 'Analytics and heatmap read', href: '/services/uiux-design', d: 'We read your analytics and session replays for patterns, so findings are backed by what people actually did.', pop: ['Where people click', 'Where they stop scrolling', 'What they skip'] },
      { t: 'Accessibility check', href: '/services/uiux-design', d: 'A check for phones, keyboards and screen readers, so more people can use it.', pop: ['Colour contrast', 'Keyboard use', 'Clear labels'] },
      { t: 'Ranked fix list', href: '/contact', d: 'Every problem scored by impact and effort, so you know what to do first.', pop: ['High, medium, low impact', 'Quick wins first', 'Notes your developers can use'] },
      { t: 'Walkthrough call', href: '/contact', d: 'We go through the list with you and answer questions. You keep the list.', pop: ['One focused call', 'Your questions answered', 'Next steps if you want help'] },
    ],
  },
  steps: {
    aside: 'You know what we are doing and what you will get at every step.',
    items: [
      { n: '01', t: 'Brief', d: 'We agree what you want to improve, which pages or flows matter, and who your visitors are.' },
      { n: '02', t: 'Review', d: 'We go through your flows, analytics and accessibility, and note every problem we find.' },
      { n: '03', t: 'Rank', d: 'We score each problem by impact and effort and put them in order.' },
      { n: '04', t: 'Walkthrough', d: 'We go through the list with you. You keep it, and decide what to do next.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Send us the address and we will tell you what we would look at first.', cta: 'Get a free UX audit', href: '/contact' },
  },
  fit: {
    good: [
      'You have a site or app that is live, and you do not know why visitors drop off.',
      'You are about to redesign and want to fix the right things first.',
      'You want a ranked list, not a long report.',
    ],
    notFit: [
      { t: 'You need something built from scratch.', link: 'See UI/UX Design', href: '/services/uiux-design' },
      { t: 'You want us to fix a slow site.', link: 'See Core Web Vitals optimisation', href: '/services/web-development/cms-performance/core-web-vitals-optimisation' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
    { t: 'Website redesign & migration', d: 'Replace an old site without losing the rankings it earned.', href: '/services/web-development/business-websites/website-redesign-migration' },
    { t: 'SEO & GEO', d: 'Be found on Google and in AI answers.', href: '/services/digital-marketing' },
  ],
}
