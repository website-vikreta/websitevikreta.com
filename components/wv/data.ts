import { CLIENT_LOGO_MARQUEE_ITEMS } from '@/content/client-logos'
import { CASE_STUDIES } from '@/lib/work-data'

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

// Per-logo heights (px) tuned by eye so every mark reads the same visual size:
// wide wordmarks sit shorter, square or boxed marks sit taller.
const LOGO_H: Record<string, number> = {
  'ambrosia.svg': 34, 'ap-cleanco.svg': 34, 'archmodal.svg': 44, 'blancora.svg': 38,
  'boompanda.png': 30, 'budget-renovations.svg': 40, 'champion-lenders.svg': 30, 'cozmo-realty.svg': 34,
  'katalyst.png': 28, 'limra-events.png': 36, 'raicoon.svg': 30, 'simpli-home.svg': 36,
  'sr-design-hub.svg': 40, 'strandzboost.svg': 32, 'sustainable-bitcoin-protocol.svg': 36, 'tocal.svg': 28,
  'workik.svg': 40, 'smart-physio-plus.png': 34, 'carelift.svg': 34, 'yeto-holidays.png': 32,
}
export const CLIENT_LOGOS = CLIENT_LOGO_MARQUEE_ITEMS.map((l) => ({ ...l, h: LOGO_H[l.src.split('/').pop()!] }))

export const asset = (p: string) => `/wv/${p}`

export const IMG = {
  studio: u('photo-1522071820081-009f0129c71c', 2000),
  huddle: u('photo-1568992687947-868a62a9f521', 1400),
  table: u('photo-1521737604893-d14cc237f11d', 1400),
  review: u('photo-1622675363311-3e1904dc1885', 1400),
  code: u('photo-1484417894907-623942c8ee29', 1400),
  codeDesk: u('photo-1587620962725-abab7fe55159', 1400),
  web: u('photo-1585076641399-5c06d1b3365f', 1400),
  ai: u('photo-1662974770404-468fd9660389', 1400),
  analytics: u('photo-1551288049-bebda4e38f71', 1400),
  laptop: u('photo-1608222351212-18fe0ec7b13b', 1400),
  dashboard: u('photo-1526628953301-3e589a6a8b74', 1400),
  swatch: u('photo-1664638413302-d1ca29ac885b', 1400),
  p1: u('photo-1581065178047-8ee15951ede6', 800),
  p2: u('photo-1560250097-0b93528c311a', 800),
  p3: u('photo-1758783505014-eb44b02a711a', 800),
  p4: u('photo-1770510067230-1059f0776b3a', 800),
}

export const CONTACT = {
  email: 'contact@websitevikreta.com',
  phone: '+91 99704 45198',
  city: 'Pune, India',
  whatsapp: 'https://wa.me/919970445198',
  linkedin: 'https://linkedin.com/company/websitevikreta',
}

type Leaf = { t: string; href: string; tag?: string }
type Group = { title: string; blurb: string; href: string; leaves: Leaf[] }
export type Service = {
  id: string
  title: string
  kicker: string
  blurb: string
  image: string
  href: string
  cta: string
  proof: { label: string; metric: string; href: string }
  extras: { t: string; href: string }[]
  groups: Group[]
}

// Label → real route, for any sub-page that exists. Everything else renders as '#'.
const PAGES: Record<string, string> = {}

type RawGroup = { title: string; blurb: string; leaves: { t: string; tag?: string }[] }
function svc(
  href: string,
  s: Omit<Service, 'href' | 'groups' | 'extras' | 'proof'> & {
    proof: { label: string; metric: string }
    extras: string[]
    groups: RawGroup[]
  },
): Service {
  return {
    ...s,
    href,
    proof: { ...s.proof, href: '/work' },
    // Sub-pages aren't built yet: leaves stay '#' until they have a route (add it to PAGES below).
    extras: s.extras.map((t) => ({ t, href: PAGES[t] ?? '#' })),
    groups: s.groups.map((g) => ({
      title: g.title,
      blurb: g.blurb,
      href: PAGES[g.title] ?? '#',
      leaves: g.leaves.map((l) => ({ t: l.t, tag: l.tag, href: PAGES[l.t] ?? '#' })),
    })),
  }
}

export const SERVICES: Service[] = [
  svc('/services/ai-automations', {
    id: 'ai',
    title: 'AI Apps & Automations',
    kicker: 'Take the busywork off your team',
    blurb: 'Fixed-scope projects that take repetitive work off your team, built on the tools you already use.',
    image: IMG.ai,
    proof: { label: 'Simpli Home, 20 hours cut to 1', metric: '20h → 1h' },
    cta: 'Book a free process audit',
    extras: ['Pricing', 'Platforms: Make, n8n, WhatsApp API'],
    groups: [
      { title: 'E-commerce Content Automation', blurb: 'Turn product photos into ready-to-post creatives in bulk.', leaves: [{ t: 'Bulk product image automation' }, { t: 'AI UGC video ads' }, { t: 'AI product visuals' }] },
      { title: 'Lead Response & Booking', blurb: 'Answer every enquiry in minutes, on WhatsApp and by phone.', leaves: [{ t: 'WhatsApp AI agent' }, { t: 'AI receptionist (voice)', tag: 'New' }, { t: 'Missed call recovery' }] },
      { title: 'Hiring & Onboarding Automation', blurb: 'Offer letters, NDAs and onboarding without the paperwork chase.', leaves: [{ t: 'Offer letter automation' }, { t: 'Candidate screening' }] },
      { title: 'Document & Proposal Automation', blurb: 'Generate proposals and contracts from a form or CRM record.', leaves: [{ t: 'Proposal generation' }] },
    ],
  }),
  svc('/services/web-development', {
    id: 'web',
    title: 'Web Design & Development',
    kicker: 'Fast sites that rank and sell',
    blurb: 'Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, built around how you sell.',
    image: IMG.web,
    proof: { label: 'AP Cleanco, zero to online', metric: 'Top 3 locally' },
    cta: 'Get a free website audit',
    extras: ['Pricing', 'Stacks: Next.js, Shopify, Webflow'],
    groups: [
      { title: 'Business Websites', blurb: 'Marketing sites that load in under a second and turn visits into enquiries.', leaves: [{ t: 'Company & service websites' }, { t: 'Landing pages' }, { t: 'Website redesign & migration' }] },
      { title: 'E-commerce', blurb: 'Stores built to sell, with the integrations your operations need.', leaves: [{ t: 'Shopify development' }, { t: 'WooCommerce stores' }, { t: 'Headless commerce', tag: 'New' }] },
      { title: 'CMS & Performance', blurb: 'Sites your team can edit, that stay fast as they grow.', leaves: [{ t: 'Next.js & Webflow builds' }, { t: 'Core Web Vitals optimisation' }, { t: 'Website maintenance' }] },
    ],
  }),
  svc('/services/apps-crm', {
    id: 'apps',
    title: 'CRMs & Web Applications',
    kicker: 'Software shaped to your process',
    blurb: 'Custom CRMs, customer portals, internal tools and SaaS products built around how your business actually runs.',
    image: IMG.dashboard,
    proof: { label: 'Cozmo Realty listings CRM', metric: '3× faster follow-ups' },
    cta: 'Scope your app in a free call',
    extras: ['Pricing', 'Integrations: Stripe, Razorpay, Zapier'],
    groups: [
      { title: 'Custom CRM', blurb: 'Leads, deals and follow-ups in one place, shaped to your sales process.', leaves: [{ t: 'Sales & lead CRM' }, { t: 'Real estate CRM' }, { t: 'HubSpot & Zoho customisation' }] },
      { title: 'Web Applications', blurb: 'Portals and SaaS products, from MVP to the version customers pay for.', leaves: [{ t: 'Customer & partner portals' }, { t: 'SaaS MVP development' }, { t: 'Booking & scheduling platforms' }] },
      { title: 'Internal Tools & Mobile', blurb: 'Replace the spreadsheet that runs your business.', leaves: [{ t: 'Admin dashboards' }, { t: 'Inventory & operations tools' }, { t: 'iOS & Android apps', tag: 'New' }] },
    ],
  }),
  svc('/services/uiux-design', {
    id: 'uiux',
    title: 'UI/UX Design',
    kicker: 'Products people get instantly',
    blurb: 'User research, wireframes and product design for web and mobile. Design systems your developers can actually ship.',
    image: IMG.swatch,
    proof: { label: 'Sustainable Bitcoin Protocol', metric: 'MVP → Product' },
    cta: 'Get a free UX audit',
    extras: ['Pricing', 'Tools: Figma, Framer, Maze'],
    groups: [
      { title: 'Research & Strategy', blurb: 'Find out where users get stuck before redesigning anything.', leaves: [{ t: 'UX audit' }, { t: 'User interviews & testing' }, { t: 'Information architecture' }] },
      { title: 'Product Design', blurb: 'Interfaces for web apps, dashboards and mobile that feel obvious.', leaves: [{ t: 'SaaS & dashboard UI' }, { t: 'Mobile app design' }, { t: 'Interactive prototypes' }] },
      { title: 'Design Systems', blurb: 'Components and rules that keep every new screen consistent.', leaves: [{ t: 'Figma design systems' }, { t: 'Component libraries' }, { t: 'Design for AI agents', tag: 'New' }] },
    ],
  }),
  svc('/services/digital-marketing', {
    id: 'seo',
    title: 'SEO & GEO',
    kicker: 'Get found on Google and in AI answers',
    blurb: 'Technical SEO and generative engine optimisation, so you rank on Google and get cited by ChatGPT and Perplexity.',
    image: IMG.analytics,
    proof: { label: 'Budget Renovations local search', metric: '+184% organic leads' },
    cta: 'Get a free SEO & GEO audit',
    extras: ['Pricing', 'Free AI visibility check'],
    groups: [
      { title: 'Search Engine Optimisation', blurb: 'Technical fixes and content that move rankings, then hold them.', leaves: [{ t: 'Technical SEO audit' }, { t: 'Local SEO & Google Business' }, { t: 'On-page & content SEO' }] },
      { title: 'Generative Engine Optimisation', blurb: 'Become the source AI answers quote when buyers ask about your category.', leaves: [{ t: 'ChatGPT & Perplexity visibility', tag: 'New' }, { t: 'Google AI Overviews' }, { t: 'Schema & entity SEO' }] },
    ],
  }),
]

export const NAV = [
  { t: 'Work', href: '/work' },
  { t: 'Process', href: '/#process' },
  { t: 'Studio', href: '/about' },
  { t: 'Blog', href: '/blog' },
  { t: 'Careers', href: '/careers' },
]

export const ROTATING = ['saves 20 hours a week', 'ranks on Google', 'gets cited by AI', 'scales with you']

export const MANIFESTO =
  'Most businesses run on a website, a CRM and a pile of manual work in between. We design, build and automate all three, then hand you a system your team owns.'

export const BAND = ['AI Automations', 'Web Development', 'CRMs', 'Web Apps', 'UI/UX', 'SEO & GEO']


export const STEPS = [
  { n: '01', t: 'Watch', d: "We see how the work actually gets done today, not how it's supposed to work on paper." },
  { n: '02', t: 'Find', d: 'We pin down the step eating the hours, and whether software is even the right fix.' },
  { n: '03', t: 'Build', d: "Quietly, in weekly sprints, with no disruption to the work that's still running." },
  { n: '04', t: 'Hand over', d: 'Documentation, a walkthrough and a system your team owns. No dependency on us.' },
]

export const STATS = [
  { n: 5, suffix: '+', label: 'Years working with founders across the globe' },
  { n: 68, suffix: '+', label: 'Projects shipped: sites, apps, automations' },
  { n: 6360, suffix: '+', label: 'Hours saved for clients since going AI-first' },
  { n: 100, suffix: '%', label: 'Job Success on Upwork, Top Rated' },
]

// Case-study testimonials, reused verbatim (same source as the /work pages).
const quoteOf = (slug: string, name: string, role: string) => ({
  quote: CASE_STUDIES.find((c) => c.slug === slug)!.testimonial!.quote,
  name,
  role,
  avatar: undefined as string | undefined,
})

export const QUOTES = [
  { quote: "Even if I don't explain the design I want, they know exactly what style I want. My second project with them.", name: 'Sang Hyun Han', role: 'Full Stack Engineer, Cozmo Realty', avatar: asset('testimonials/Sang_Hun_Yan.webp') },
  quoteOf('simpli-home', 'Darcy McGilvery', 'Simpli Home'),
  quoteOf('sustainable-bitcoin-protocol', 'Brad van Voorhees', 'Co-founder, Sustainable Bitcoin Protocol'),
  { quote: 'They finished our new website design in the given time, always responded quickly and have a really good sense of design.', name: 'John Kim', role: 'CEO, Champion Lenders', avatar: asset('testimonials/John_Kim.webp') },
  { quote: 'One of the best web development teams out there. They give personal attention to the smallest details.', name: 'Rudra Ghodke', role: 'Founder, BoomPanda', avatar: asset('testimonials/Rudra_Ghodke.webp') },
  { quote: 'Excellent design skills. They quickly prototyped what I had in mind, then programmed it, and adjusted well as requirements changed.', name: 'Abhinav Singh', role: 'Co-founder, JAXL', avatar: asset('testimonials/Abhinav_Singh.webp') },
]

export const WORK = [
  { client: 'Simpli Home', slug: 'simpli-home', logo: '/client-logos/simpli-home.svg', logoH: 30, title: '20 hours of image work cut to one', tags: ['AI Automation', 'Figma', 'Media ops'], metric: '20h→1h', metricLabel: 'per collection', image: IMG.laptop, year: '2026' },
  { client: 'Sustainable Bitcoin Protocol', slug: 'sustainable-bitcoin-protocol', logo: '/client-logos/sustainable-bitcoin-protocol.svg', logoH: 36, title: 'From rough MVP to a real product', tags: ['UI/UX', 'Design system', 'Web app'], metric: '120+', metricLabel: 'screens on one system', image: IMG.swatch, year: '2025' },
  { client: 'AP Cleanco', slug: 'ap-cleanco', logo: '/client-logos/ap-cleanco.svg', logoH: 32, title: 'No web presence to top local result', tags: ['Website', 'Local SEO', 'Copy'], metric: 'Top 3', metricLabel: 'in local search', image: IMG.web, year: '2025' },
  { client: 'Smart Physio+', logo: '/client-logos/smart-physio-plus.png', logoH: 32, title: 'A new website that ranks on Google', tags: ['Website', 'Google Business', 'SEO + AEO'], metric: 'Local SEO', metricLabel: 'site built from scratch', image: IMG.analytics, year: '2026' },
]
