import type { LeafContent } from '../web/types'

/** Copy for the /services/uiux-design/research-strategy group page. Real proof only. */

export const PATH = '/services/uiux-design/research-strategy'
const P = PATH

export const FAQS = [
  { q: 'Where should I start?', a: 'If you have a live site or app that is not working, start with a UX audit. If you want to understand your users or test an idea, user interviews and testing. If people cannot find things, information architecture. Not sure? Tell us and we will point you to it.' },
  { q: 'Can I combine them?', a: 'Yes. A common order is an audit first, then testing on the problem areas, then the structure. We plan that with you in the brief.' },
  { q: 'Do you fix what you find?', a: 'We can. The research gives you a ranked list. If you want the fixes designed, we quote them separately, and you can also hand the list to your own team.' },
  { q: 'Is there a free first step?', a: 'We give you a free first look at your site or app and tell you what we see. Full research is scoped on a call, so you know what is covered.' },
  { q: 'What do I get at the end?', a: 'A short ranked list of what to change, written in plain words, and a walkthrough. You keep all of it.' },
]

export const RESEARCH_GROUP: LeafContent = {
  crumb: 'Research & Strategy',
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
  h1: ['Find out first,', 'then design.'],
  hero: {
    lead: 'Audits, user testing and site structure, so you know what is wrong before you spend on fixing it. Pick the part you need, or start with an audit.',
    words: ['Audit', 'Interview', 'Test', 'Map'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Three ways in',
    rot: 'We',
    art: 'sessions',
    url: 'yourproduct.com',
  },
  band: [
    ['Clear findings', 'Real users', 'Plain words', 'Ranked fixes'],
    ['Figma', 'Maze', 'Analytics', 'Session replays', 'Card sorting'],
  ],
  friction: {
    statement: 'Visitors do not tell you why they left. They just go. Guessing what to fix is slow and expensive, and the problems usually stay.',
    items: [
      { t: 'Nobody knows why they leave.', d: 'Visitors drop off and the numbers cannot say where or why.', g: 1 },
      { t: 'Opinions win over evidence.', d: 'The loudest voice in the room decides what to change.', g: 0 },
      { t: 'Nobody can find things.', d: 'The structure grew sideways, and so did the menu.', g: 3 },
    ],
    photo: '/services/uiux-design/pain/landing-friction.webp',
    alt: 'A visitor frowning at a phone, a heatmap on a phone screen and small charts, drawn in soft watercolour',
  },
  compare: {
    aside: 'Three starting points. Pick the one that matches your question.',
    cols: [{ t: 'UX audit' }, { t: 'User interviews & testing' }, { t: 'Information architecture' }],
    rows: [
      { k: 'Best for', v: ['A live site or app that is not working', 'Understanding real users, or testing an idea', 'A site where people cannot find things'] },
      { k: 'You get', v: ['A ranked list of fixes', 'Findings from real people', 'A sitemap, labels and content model'] },
      { k: 'Starts with', v: ['Your analytics and key flows', 'The questions to answer and who to ask', 'A list of what you have today'] },
    ],
  },
  build: {
    title: ['Pick your', 'starting point'],
    aside: 'Each page below goes into detail, with what you get and how it works.',
    rows: [
      { t: 'UX audit', href: `${P}/ux-audit`, d: 'A ranked list of where visitors get stuck and what to fix first.', pop: ['Friction review', 'Journey map', 'Ranked fix list'] },
      { t: 'User interviews & testing', href: `${P}/user-interviews-testing`, d: 'Hear from real users and watch them use it.', pop: ['Interviews', 'Usability tests', 'Plain findings'] },
      { t: 'Information architecture', href: `${P}/information-architecture`, d: 'Structure and navigation that make sense before any pixels.', pop: ['Sitemap', 'Navigation and labels', 'Content model'] },
    ],
  },
  steps: {
    aside: 'The same four steps for every project, so you always know what comes next.',
    items: [
      { n: '01', t: 'Brief', d: 'We agree what you want to learn and which flows or pages matter.' },
      { n: '02', t: 'Research', d: 'We review, interview, test or map, depending on the question.' },
      { n: '03', t: 'Rank', d: 'We turn what we found into a short list, ordered by impact and effort.' },
      { n: '04', t: 'Walkthrough', d: 'We go through it with you. You keep it, and decide what to do next.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us what you want to find out and we will tell you which of the three fits.', cta: 'Get a free UX audit', href: '/contact' },
  },
  fit: {
    good: [
      'You have a live site or app, and you do not know why people drop off.',
      'You are about to redesign and want to fix the right things first.',
      'You want evidence, in plain words, before spending on changes.',
    ],
    notFit: [
      { t: 'You already know what to build and need it designed.', link: 'See Product Design', href: '/services/uiux-design/product-design' },
      { t: 'You need a design system behind your screens.', link: 'See Design Systems', href: '/services/uiux-design/design-systems' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Product Design', d: 'Dashboards, mobile apps and prototypes.', href: '/services/uiux-design/product-design' },
    { t: 'Design Systems', d: 'Figma libraries, coded components and agent patterns.', href: '/services/uiux-design/design-systems' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
