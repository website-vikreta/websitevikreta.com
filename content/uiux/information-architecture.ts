import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/research-strategy/information-architecture. Real proof only. */

export const PATH = '/services/uiux-design/research-strategy/information-architecture'

export const FAQS = [
  { q: 'What is information architecture?', a: 'It is how your content and features are organised and labelled: the pages, the menus, the names and the paths between them. Done well, people find things without thinking about it.' },
  { q: 'Is this only for websites?', a: 'No. Apps, dashboards and portals need it too. Anywhere people have to find things, the structure matters.' },
  { q: 'How do you check the structure works?', a: 'We ask real people to sort topics and to find things in a draft menu, so the structure is tested before any screens are designed.' },
  { q: 'Do you also design the pages?', a: 'We can. This service gives you the map and the labels. If you want the screens designed too, we quote that separately.' },
  { q: 'What do I get at the end?', a: 'A sitemap, a navigation plan, a label list and a content model your team and developers can build from. You keep all of it.' },
]

export const IA: LeafContent = {
  crumb: 'Information architecture',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Map my site',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Structure that', 'makes sense.'],
  hero: {
    lead: 'A clear map of your pages, menus and labels, built around how people look for things. Visitors find what they need, and your team knows where everything lives.',
    words: ['Map', 'Group', 'Label', 'Test'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Structure before pixels',
    rot: 'We',
    art: 'sitemap',
    url: 'yoursite.com',
  },
  band: [
    ['Findable', 'Logical', 'Scalable', 'Plain labels'],
    ['Sitemaps', 'Navigation', 'Labels', 'Card sorting', 'Content model'],
  ],
  friction: {
    statement: 'When nobody planned the structure, people get lost and teams argue about where things go. Every new page makes it worse.',
    items: [
      { t: 'Visitors cannot find things.', d: 'The menu follows your org chart, not their questions.', g: 1 },
      { t: 'The site grows sideways.', d: 'New pages get added wherever there is room.', g: 0 },
      { t: 'Labels mean different things.', d: 'Your team and your customers use different words.', g: 3 },
    ],
    photo: '/services/uiux-design/workflow/flow-map.webp',
    alt: 'A flow map of screens joined by arrows, with branches and a small chart, drawn in soft watercolour',
  },
  build: {
    aside: 'A map your team can build from, checked with real people.',
    rows: [
      { t: 'Content inventory', href: '/contact', d: 'We list what you have today, what is out of date and what is missing.', pop: ['Every page listed', 'Old and duplicate content flagged', 'Gaps noted'] },
      { t: 'Sitemap', href: '/services/uiux-design', d: 'One page showing how everything is grouped, and how deep people have to go.', pop: ['Sections and pages', 'Plain, flat where possible', 'Room to grow'] },
      { t: 'Navigation', href: '/services/uiux-design', d: 'Menus, footers and links planned around the questions people ask.', pop: ['Main menu and footer', 'Links between related pages', 'Mobile menu planned'] },
      { t: 'Labels and wording', href: '/contact', d: 'Names for pages and buttons in the words your customers actually use.', pop: ['Customer words, not jargon', 'One name per thing', 'A short label list'] },
      { t: 'Card sorting and tree tests', href: '/services/uiux-design/research-strategy/user-interviews-testing', d: 'Real people sort topics and find things in a draft menu, so the structure is checked, not assumed.', pop: ['People sort your topics', 'People find things in a draft', 'Changes before design starts'] },
      { t: 'Content model', href: '/contact', d: 'The fields and templates behind each page type, so your CMS and your developers know what to build.', pop: ['Page types and fields', 'Templates', 'Notes for developers'] },
    ],
  },
  steps: {
    aside: 'The structure is checked with real people before any screens are designed.',
    items: [
      { n: '01', t: 'Inventory', d: 'We list what you have, who uses it and what they come to do.' },
      { n: '02', t: 'Map', d: 'We group the content and draw the sitemap and navigation.' },
      { n: '03', t: 'Test', d: 'We check the structure with real people and fix what does not work.' },
      { n: '04', t: 'Hand over', d: 'You get the sitemap, labels and content model, and a walkthrough with your team.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your site here', d: 'Send us the address and we will tell you how we would organise it.', cta: 'Map my site', href: '/contact' },
  },
  fit: {
    good: [
      'Your site or app has grown and people can no longer find things.',
      'You are about to redesign, and want the structure right first.',
      'Your team cannot agree where new pages should go.',
    ],
    notFit: [
      { t: 'You want to know why visitors leave.', link: 'See UX audit', href: '/services/uiux-design/research-strategy/ux-audit' },
      { t: 'You need the screens designed.', link: 'See UI/UX Design', href: '/services/uiux-design' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'UX audit', d: 'A ranked list of where visitors get stuck and what to fix first.', href: '/services/uiux-design/research-strategy/ux-audit' },
    { t: 'User interviews & testing', d: 'Hear from real users and watch them use it.', href: '/services/uiux-design/research-strategy/user-interviews-testing' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
