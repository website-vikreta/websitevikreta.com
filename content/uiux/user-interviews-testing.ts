import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/research-strategy/user-interviews-testing. Real proof only; no participant counts, prices or results are invented. */

export const PATH = '/services/uiux-design/research-strategy/user-interviews-testing'

export const FAQS = [
  { q: 'How many people do we need to talk to?', a: 'A small group is often enough to show the main problems. We agree the number in the plan step, based on your product and who it serves.' },
  { q: 'Can you find the participants?', a: 'Yes. We can recruit from your own customers, or from people who match them. If you already have a list, we use it.' },
  { q: 'Moderated or unmoderated?', a: 'Moderated sessions, where we talk to people as they try a task, are best for understanding why. Unmoderated tests are quicker and good for checking a specific flow. We recommend the one that fits your question.' },
  { q: 'Can you test a prototype, not a live product?', a: 'Yes. We can test a clickable prototype before engineering builds it, which is the cheapest time to find problems.' },
  { q: 'What do I get at the end?', a: 'A short findings report in plain words, each finding backed by what people said or did, and a ranked list of changes. You keep all of it.' },
]

export const USER_TESTING: LeafContent = {
  crumb: 'User interviews & testing',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my research',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Hear it from', 'real users.'],
  hero: {
    lead: 'Short interviews and usability tests with the people who actually use your product. You see where they struggle, in their own words, and get a clear list of what to change.',
    words: ['Plan', 'Recruit', 'Watch', 'Report'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Real people, real tasks',
    rot: 'We',
    art: 'sessions',
    url: 'yourproduct.com',
  },
  band: [
    ['Real users', 'Real tasks', 'Plain findings', 'Clear next steps'],
    ['Maze', 'Figma', 'Session replays', 'Interview guides', 'Surveys'],
  ],
  friction: {
    statement: 'Your team knows the product too well to see it clearly. Real users do not read the manual, and they do not tell you where they got lost.',
    items: [
      { t: 'You are guessing what users want.', d: 'Opinions in the room win over evidence.', g: 1 },
      { t: 'Feedback is scattered.', d: 'Support tickets, emails and chats never turn into a plan.', g: 0 },
      { t: 'Testing feels slow.', d: 'So it gets skipped, and the problems ship.', g: 3 },
    ],
    photo: '/services/uiux-design/pain/checkout-friction.webp',
    alt: 'A checkout flow on a laptop, with recorded user sessions and a chart showing where people drop off, drawn in soft watercolour',
  },
  build: {
    aside: 'Plain findings you can act on, not a recording archive.',
    rows: [
      { t: 'Research plan', href: '/contact', d: 'We agree the questions you need answered, who to talk to and which tasks to test.', pop: ['The questions to answer', 'Who we need to hear from', 'Tasks to test'] },
      { t: 'Recruiting', href: '/contact', d: 'We find participants from your own customers, or from people who match them.', pop: ['Your customer list, or ours', 'Screening questions', 'Scheduling handled'] },
      { t: 'Interviews', href: '/services/uiux-design', d: 'Short, relaxed conversations about how people do the job today, so you learn what matters to them.', pop: ['An interview guide', 'Open questions, no leading', 'Notes in plain words'] },
      { t: 'Usability tests', href: '/services/uiux-design', d: 'People try real tasks on your site, app or prototype while we watch where they hesitate.', pop: ['Moderated or unmoderated', 'Live product or prototype', 'Tasks tied to your goals'] },
      { t: 'Findings', href: '/services/uiux-design/research-strategy/ux-audit', d: 'Patterns across sessions, each backed by what people said or did.', pop: ['Themes, not anecdotes', 'Quotes and key moments', 'Written for non-designers'] },
      { t: 'Next steps', href: '/contact', d: 'A ranked list of changes and a walkthrough, so the team knows what to do first.', pop: ['Impact and effort noted', 'Quick wins first', 'A walkthrough call'] },
    ],
  },
  steps: {
    aside: 'You know who we are talking to and what we are testing before we start.',
    items: [
      { n: '01', t: 'Plan', d: 'We agree the questions, the participants and the tasks to test.' },
      { n: '02', t: 'Recruit', d: 'We find the right people and book the sessions.' },
      { n: '03', t: 'Run', d: 'We run the interviews and tests, and take notes as we go.' },
      { n: '04', t: 'Report', d: 'We turn what we saw into a short, ranked list and walk you through it.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us what you want to learn and we will tell you how we would find out.', cta: 'Plan my research', href: '/contact' },
  },
  fit: {
    good: [
      'You have a product or prototype and want to know how real people use it.',
      'Your team disagrees about what to change, and you want evidence.',
      'You are about to build something big and want to check it first.',
    ],
    notFit: [
      { t: 'You want a quick expert review without talking to users.', link: 'See UX audit', href: '/services/uiux-design/research-strategy/ux-audit' },
      { t: 'You need the screens designed.', link: 'See UI/UX Design', href: '/services/uiux-design' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'UX audit', d: 'A ranked list of where visitors get stuck and what to fix first.', href: '/services/uiux-design/research-strategy/ux-audit' },
    { t: 'Information architecture', d: 'Structure and navigation that make sense before any pixels.', href: '/services/uiux-design/research-strategy/information-architecture' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
