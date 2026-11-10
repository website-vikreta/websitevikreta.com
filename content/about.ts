import { FOUNDING_DATE, yearsIn } from '@/config/site'

export const ABOUT = {
  title: 'About Website Vikreta | UI/UX & Web Development Studio, Pune',
  description:
    'Website Vikreta is a UI/UX design and web development studio in Pune, India. Since 2020: 68+ websites, apps and digital products, now with AI automation.',
  foundingDate: FOUNDING_DATE,
}

/** Identity paragraph: the quotable definition (GEO). */
export const identity = () =>
  `Website Vikreta is a creative studio in Pune, India, founded in August 2020. Most of our work is UI/UX design and web development, alongside apps, marketing and, since 2026, AI automation. ${yearsIn()} years in, the studio works with clients across the globe.`

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=75`

export type Era = {
  id: string
  /** Big label in the sticky rail. `inf` renders the infinity mark. */
  year: string
  headline: string[]
  /** TODO(owner): the "why" lines are placeholders. Replace with the real reasons. */
  why: string
  beats: string[]
  links: { t: string; href: string }[]
  img: { src: string; alt: string }
  now?: boolean
  inf?: boolean
}

export const ERAS: Era[] = [
  {
    id: 'y2020',
    img: { src: u('photo-1515879218367-8466d910aaa4'), alt: 'Code on a monitor, the kind of HTML and PHP the studio started with' },
    year: '2020',
    headline: ['Web development,', 'written by hand'],
    why: 'August 2020: websites for clients around the world, written in HTML, CSS, JavaScript and PHP. Everything that came after grew out of this.',
    beats: ['HTML, CSS, JavaScript', 'PHP'],
    links: [{ t: 'Web development', href: '/services/web-development' }],
  },
  {
    id: 'y2021',
    img: { src: u('photo-1522542550221-31fd19575a2d'), alt: 'Hand-drawn wireframe sketches of website layouts' },
    year: '2021',
    headline: ['Design joins', 'the studio'],
    why: 'Clients kept asking who would design what we built, so we started doing that too: product design for SaaS companies, and redesigns for the ones that had outgrown their first version.',
    beats: ['SaaS design', 'Redesigns'],
    links: [{ t: 'UI/UX design', href: '/services/uiux-design' }],
  },
  {
    id: 'y2022',
    img: { src: u('photo-1551650975-87deedd944c3'), alt: 'A smartphone showing a product dashboard' },
    year: '2022',
    headline: ['Everything digital,', 'one desk'],
    why: 'We started building SaaS products in React and added mobile apps. The rest followed the same year: SEO, organic marketing, CRM integrations and branding. The stack opened up too. Laravel, Django, Flask, Next.js, Angular, Vue, React or plain vanilla: name it and we work in it.',
    beats: ['React SaaS', 'Mobile apps', 'SEO', 'Organic marketing', 'CRM integrations', 'Branding', 'Any stack'],
    links: [
      { t: 'Web & mobile apps', href: '/services/web-mobile-app-development' },
      { t: 'Digital marketing', href: '/services/digital-marketing' },
      { t: 'CRMs & apps', href: '/services/apps-crm' },
    ],
  },
  {
    id: 'y2025',
    img: { src: u('photo-1677442135703-1787eea5ce01'), alt: 'A circuit board with a brain on it, standing in for AI services' },
    year: '2025',
    headline: ['The first', 'AI services'],
    why: 'Clients started asking what AI could take off their plate. We built the first answers.',
    beats: ['Chatbots', 'RAG', 'Document data extraction', 'Website data scraping'],
    links: [{ t: 'AI services', href: '/services/ai-automations' }],
  },
  {
    id: 'y2026',
    img: { src: u('photo-1674027444485-cec3da58eef4'), alt: 'An abstract sphere of dots and lines, standing in for agentic AI' },
    year: '2026',
    headline: ['AI-first,', 'on purpose'],
    why: 'Agentic AI arrived and changed what is possible to automate. We became AI-first and opened two new lines of business: AI automations and AI services. Same studio, same sprints, a different starting question.',
    beats: ['AI automations', 'AI services', 'Agentic AI'],
    links: [
      { t: 'AI automations', href: '/services/ai-automations' },
      { t: 'Read the blog', href: '/blog' },
    ],
    now: true,
  },
  {
    id: 'inf',
    img: { src: u('photo-1494783367193-149034c05e8f'), alt: 'An open road running toward distant mountains' },
    year: '∞',
    headline: ['And', 'onwards'],
    why: 'Tools will keep changing. The way we work will not: sprints, steady updates and the people building your project in the room.',
    beats: [],
    links: [{ t: 'Start a project', href: '/contact' }],
    inf: true,
  },
]

export const SERVICES_ROWS = [
  { t: 'Web development', d: 'Marketing sites and web platforms, built to load fast and rank.', href: '/services/web-development' },
  { t: 'Web & mobile apps', d: 'Products for browsers and phones, from first version to scale.', href: '/services/web-mobile-app-development' },
  { t: 'UI/UX design', d: 'Product design and redesigns that people can use without a manual.', href: '/services/uiux-design' },
  { t: 'Digital marketing', d: 'SEO and organic growth that compounds.', href: '/services/digital-marketing' },
  { t: 'CRMs & custom apps', d: 'The system your team lives in, wired to the rest of your tools.', href: '/services/apps-crm' },
  { t: 'AI automations', d: 'Agents and workflows that take repetitive work off your team.', href: '/services/ai-automations' },
]

export const WORKING = [
  { t: 'Biweekly sprints', d: 'Work is planned and shipped in two-week sprints, so you always know what is being built and what is next.' },
  { t: 'Steady updates', d: 'Clients and stakeholders get consistent updates. You are never left guessing where the project stands.' },
  { t: 'Proper meetings', d: 'Meetings are set up properly: scheduled ahead, with the right people in the room.' },
  { t: 'The people doing the work', d: 'You talk to the people building your project. No account managers in between.' },
]

export const THINKING = [
  { t: 'Think before we open a tool', d: 'No platform gets picked before we understand the problem.' },
  { t: 'Measure what we ship', d: "Launch day isn't the finish line. Something real has to move." },
  { t: 'Keep the work visible', d: "You'll know what's being built, why, and what's next." },
  { t: 'Automate on purpose', d: 'AI goes where it kills repeat work, not where it demos well.' },
  { t: 'Update the toolkit, not our judgment', d: "Tools change every few months. What we test them against doesn't." },
]
