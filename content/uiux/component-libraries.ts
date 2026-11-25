import type { LeafContent } from '../web/types'

/** Copy for /services/uiux-design/design-systems/component-libraries. Real proof only. */

export const PATH = '/services/uiux-design/design-systems/component-libraries'

export const FAQS = [
  { q: 'What is a component library?', a: 'A set of coded, tested interface parts, like buttons, forms and layouts, that your developers reuse. It matches the design exactly, so nobody rebuilds the same thing twice.' },
  { q: 'Which technologies do you use?', a: 'We build in React and Next.js with Tailwind, and fit what your team already uses where we can. We agree the stack in the inventory step.' },
  { q: 'Do we need a Figma design system first?', a: 'It helps. If you do not have one, we can set it up first. See Figma design systems.' },
  { q: 'Is accessibility included?', a: 'Yes. Keyboard use, focus states and clear labels are built into each component, not added later.' },
  { q: 'What do I get at the end?', a: 'The coded library, short usage notes with examples, and a walkthrough for your developers. The code is yours.' },
]

export const COMPONENT_LIBS: LeafContent = {
  crumb: 'Component libraries',
  parent: { label: 'UI/UX Design', href: '/services/uiux-design' },
  cta: 'Plan my component library',
  proofTitle: ['Work we have', 'designed'],
  stats: [0, 1, 3],
  quotes: [
    { tab: 'Sustainable Bitcoin Protocol', name: 'Brad van Voorhees' },
    { tab: 'Cozmo Realty', name: 'Sang Hyun Han' },
    { tab: 'JAXL', name: 'Abhinav Singh' },
    { tab: 'Champion Lenders', name: 'John Kim' },
  ],
  h1: ['Design and code,', 'matched.'],
  hero: {
    lead: 'A coded library of buttons, forms and layouts that match your design exactly. Developers build screens from tested parts instead of rebuilding them every time.',
    words: ['Build', 'Test', 'Document', 'Reuse'],
    proof: 'Sustainable Bitcoin Protocol: 120+ screens on one design system.',
    tag: 'Tested and documented',
    rot: 'We',
    art: 'library',
    url: 'yourapp.com/components',
  },
  band: [
    ['Matches the design', 'Tested parts', 'Documented', 'Reusable'],
    ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Figma'],
  ],
  friction: {
    statement: 'Designers draw a button. Developers rebuild it. A month later there are five versions of it in the code, and none of them match.',
    items: [
      { t: 'Code drifts from design.', d: 'What shipped is not what was drawn.', g: 1 },
      { t: 'Parts get rebuilt.', d: 'The same button is coded again for every page.', g: 0 },
      { t: 'Nobody knows what exists.', d: 'There is no list of what is already built.', g: 3 },
    ],
    photo: '/services/uiux-design/system/auto-layout/layout-01.webp',
    alt: 'A sheet of layout and auto-layout rules for interface components, drawn as a clean reference board',
  },
  build: {
    aside: 'Tested parts your developers can pick up and use today.',
    rows: [
      { t: 'Component inventory', href: '/services/uiux-design/design-systems/figma-design-systems', d: 'We list every part your product uses, so we build the right ones and no more.', pop: ['Every part listed', 'Duplicates merged', 'A build order'] },
      { t: 'Coded components', href: '/contact', d: 'Buttons, forms, navigation and layouts, built to match the design pixel for pixel.', pop: ['Matches the design', 'Responsive by default', 'Typed and tested'] },
      { t: 'States and variants', href: '/contact', d: 'Hover, focus, error, loading and disabled, handled once and reused everywhere.', pop: ['Every state built', 'Sizes and variants', 'No one-off styles'] },
      { t: 'Accessibility built in', href: '/contact', d: 'Keyboard use, focus and labels are part of each component, not added at the end.', pop: ['Keyboard friendly', 'Visible focus', 'Clear labels'] },
      { t: 'Documentation', href: '/contact', d: 'Short usage notes and examples for each component.', pop: ['When to use it', 'Examples', 'Written for new developers'] },
      { t: 'Handoff to your team', href: '/contact', d: 'A walkthrough for your developers, and the code is yours to keep.', pop: ['A team walkthrough', 'Clean repository', 'You own the code'] },
    ],
  },
  steps: {
    aside: 'We build on your stack and your design, so there is nothing to translate.',
    items: [
      { n: '01', t: 'Inventory', d: 'We list the parts your product uses and agree the stack.' },
      { n: '02', t: 'Build', d: 'We code the components and check each one against the design.' },
      { n: '03', t: 'Document', d: 'We write short usage notes with examples.' },
      { n: '04', t: 'Hand over', d: 'You get the library and a walkthrough with your developers.' },
    ],
  },
  proof: {
    aside: 'Real clients, live products.',
    slugs: ['sustainable-bitcoin-protocol-site', 'tocal'],
    metric: { 'sustainable-bitcoin-protocol-site': '120+ screens on one design system' },
    invite: { t: 'Your product here', d: 'Tell us your stack and we will tell you what the library would need.', cta: 'Plan my component library', href: '/contact' },
  },
  fit: {
    good: [
      'You have developers rebuilding the same interface parts again and again.',
      'You want the code to match the design without constant checking.',
      'You are scaling the product and want a base to build on.',
    ],
    notFit: [
      { t: 'You need the Figma library first.', link: 'See Figma design systems', href: '/services/uiux-design/design-systems/figma-design-systems' },
      { t: 'You need a whole website or app built.', link: 'See Web Design & Development', href: '/services/web-development' },
    ],
  },
  faqs: FAQS,
  related: [
    { t: 'Figma design systems', d: 'Tokens and components your whole team designs from.', href: '/services/uiux-design/design-systems/figma-design-systems' },
    { t: 'Design for AI agents', d: 'Interfaces for products where an agent does part of the work.', href: '/services/uiux-design/design-systems/design-for-ai-agents' },
    { t: 'UI/UX Design', d: 'Everything we design, in one place.', href: '/services/uiux-design' },
  ],
}
