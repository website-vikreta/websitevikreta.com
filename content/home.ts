import { ALL_FAQS, type FaqItem } from '@/lib/faq-data'
import { CASE_STUDIES, WORK_TESTIMONIALS, type CaseStudy, type WorkTestimonial } from '@/lib/work-data'
import { CALENDLY_URL } from '@/config/site'
import { CLIENT_LOGO_MARQUEE_ITEMS } from './client-logos'

export { CLIENT_LOGO_MARQUEE_ITEMS }

/**
 * Homepage content: every string, link and list the page renders lives here.
 * Components in components/home/ take these as props, so any section can be
 * reused on another page with different data.
 */

/** A heading is plain text plus yellow-highlighted runs. */
export type HeadingPart = string | { hl: string }

export interface HomeLink {
  label: string
  href: string
  external?: boolean
}

export interface HeroContent {
  heading: HeadingPart[]
  sub: string
  chips: HomeLink[]
  primaryCta: HomeLink
  secondaryCta: HomeLink
  trust: HomeLink[]
}

export interface IconCard {
  title: string
  description: string
  href?: string
}

export interface ServiceItem extends IconCard {
  href: string
  icon: 'bot' | 'globe' | 'layers' | 'pen' | 'chart'
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface TestimonialItem {
  name: string
  role: string
  quote: string
  image?: string
}

export const STATS: StatItem[] = [
  { value: 5, suffix: '+', label: 'Years working with founders and teams across the globe' },
  { value: 68, suffix: '+', label: 'Projects shipped: websites, apps, automation, design' },
  { value: 6360, suffix: '+', label: 'Hours saved for clients since we went AI-first' },
]

const stat = (i: number) => `${STATS[i].value}${STATS[i].suffix}`

export const HERO: HeroContent = {
  heading: ['We ', { hl: 'automate' }, ' the busywork and build websites that ', { hl: 'grow' }, ' your business.'],
  sub: 'Website Vikreta builds AI automations, websites, apps and marketing for businesses that want to go digital properly. We listen before we touch anything.',
  chips: [
    { label: 'AI Automations', href: '/services/ai-automations' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Apps & CRM', href: '/services/web-mobile-app-development' },
    { label: 'UI/UX Design', href: '/services/uiux-design' },
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
  ],
  primaryCta: { label: 'Book a free audit', href: '#book-audit' },
  secondaryCta: { label: 'See our work', href: '/work' },
  trust: [
    { label: 'Top Rated on Upwork', href: 'https://www.upwork.com/agencies/websitevikreta/', external: true },
    { label: '100% Job Success', href: 'https://www.upwork.com/agencies/websitevikreta/', external: true },
    { label: `${stat(1)} projects`, href: '/work' },
    { label: `${stat(0)} years`, href: '/about' },
  ],
}

export const LOGOS_HEADING: HeadingPart[] = ["WHO WE'VE ", { hl: 'BUILT FOR' }]

export const WORK_HEADING: HeadingPart[] = ['RESULTS, ', { hl: 'NOT PROMISES' }]
export const WORK_CTA: HomeLink = { label: 'See all work', href: '/work' }

const bySlug = (slug: string): CaseStudy => {
  const s = CASE_STUDIES.find((c) => c.slug === slug)
  if (!s) throw new Error(`Missing case study: ${slug}`)
  return s
}

export const FEATURED_RESULT = {
  study: bySlug('simpli-home'),
  /** Source: lib/faq-data.ts FAQ 3. */
  big: '20 HRS \u2192 1 HR',
  label: 'per collection, image production pipeline',
  secondary: { value: '11 hrs', label: 'saved per week' },
}

export const OTHER_STUDIES: CaseStudy[] = [bySlug('sustainable-bitcoin-protocol'), bySlug('ap-cleanco')]

export const SERVICES_HEADING: HeadingPart[] = ['WHAT WE ', { hl: 'DO' }]

export const SERVICES: ServiceItem[] = [
  {
    title: 'AI Automations',
    icon: 'bot',
    href: '/services/ai-automations',
    description:
      'We audit the hours your team spends on CRM, reporting, and support, then build custom AI agents and workflow automation that take that work off their plate.',
  },
  {
    title: 'Web Development',
    icon: 'globe',
    href: '/services/web-development',
    description:
      'Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, and built around how you sell.',
  },
  {
    title: 'Apps & CRM',
    icon: 'layers',
    href: '/services/web-mobile-app-development',
    description:
      'Custom CRMs, customer portals, internal tools, and e-commerce. Web and mobile apps built around how your business runs.',
  },
  {
    title: 'UI/UX Design',
    icon: 'pen',
    href: '/services/uiux-design',
    description:
      'User research, wireframes, and product design for web and mobile. Design systems and prototypes your developers can actually ship.',
  },
  {
    title: 'Digital Marketing',
    icon: 'chart',
    href: '/services/digital-marketing',
    description:
      'SEO, GEO, content, and paid campaigns built to bring in leads. Local SEO and growth marketing you can measure in enquiries.',
  },
]

export const SERVICES_CTA = { title: 'Not sure where to start?', cta: { label: 'Book a free audit', href: '#book-audit' } }

export const PROCESS_HEADING: HeadingPart[] = ['HOW WE ', { hl: 'WORK' }]

export const PROCESS_STEPS: IconCard[] = [
  { title: 'We watch', description: "How the work actually gets done today, not how it's supposed to work on paper." },
  { title: 'We find the time sink', description: 'The exact step eating the hours, and whether automation is even the right fix.' },
  { title: 'We build, quietly', description: 'No disruption to the work still running while we build.' },
  { title: 'We hand it over', description: 'Documentation, a walkthrough, and a system your team owns. No dependency on us to keep it alive.' },
]

export const WHY_HEADING: HeadingPart[] = ['WHY ', { hl: 'WEBSITE VIKRETA' }]

export const WHY_ITEMS: IconCard[] = [
  { title: 'We audit before we build', description: "If a $50 tool solves it, that's what we'll tell you, instead of inventing a reason to charge you more." },
  { title: "We've done the messy version of this", description: 'Spreadsheet chaos, tools that won\'t talk to each other, exports that need renaming by hand. That\'s most of the real work.' },
  { title: 'You own what we build', description: 'Documentation and a proper handover, not a dependency on us to keep it alive.' },
  { title: 'One team, start to finish', description: 'Automation, website, and the marketing that runs on it come from one team. No handoff to a second agency halfway through.' },
]

export const STATS_HEADING: HeadingPart[] = ['THE NUMBERS ', { hl: 'SO FAR' }]

export const TESTIMONIALS_HEADING: HeadingPart[] = ['WHAT ', { hl: 'CLIENTS SAY' }]

const TESTIMONIAL_SLUGS = ['john-kim', 'stacey-bae', 'rudra-ghodke', 'sang-hyun-han', 'benoit-marcell']

const fromWork = (t: WorkTestimonial): TestimonialItem => ({
  name: t.name,
  role: [t.designation, t.company].filter(Boolean).join(', '),
  quote: t.quote,
  image: t.image,
})

/** Case-study testimonial roles are "Name, Company". */
const fromCaseStudy = (slug: string): TestimonialItem[] => {
  const t = bySlug(slug).testimonial
  if (!t) return []
  const [name, ...company] = t.role.split(', ')
  return [{ name, role: company.join(', '), quote: t.quote }]
}

/** Six items so the 3-column desktop grid has no orphan. */
export const TESTIMONIALS: TestimonialItem[] = [
  ...fromCaseStudy('simpli-home'),
  ...TESTIMONIAL_SLUGS.flatMap((slug) => {
    const t = WORK_TESTIMONIALS.find((w) => w.slug === slug)
    return t ? [fromWork(t)] : []
  }),
]

export const BOOK_HEADING: HeadingPart[] = ['BOOK A ', { hl: 'FREE CALL' }]
export const BOOK_COPY =
  "30 minutes. No pitch, no commitment. Tell us what you're doing by hand and we'll tell you what we'd automate first."
function calendlyEmbed(): string {
  if (!CALENDLY_URL) return ''
  const u = new URL(CALENDLY_URL)
  u.searchParams.set('hide_gdpr_banner', '1')
  u.searchParams.set('background_color', 'ffffff')
  u.searchParams.set('text_color', '121212')
  u.searchParams.set('primary_color', 'fac800')
  return u.toString()
}
export const CALENDLY_EMBED_URL = calendlyEmbed()
export const CALENDLY_PAGE_URL = CALENDLY_URL
export const BOOK_FALLBACK: HomeLink = { label: 'Contact us', href: '/contact' }

export const FAQ_HEADING: HeadingPart[] = ['QUESTIONS, ', { hl: 'ANSWERED' }]
export const HOME_FAQS: FaqItem[] = ['1', '2', '3', '4', '6', '10'].flatMap((id) => {
  const f = ALL_FAQS.find((x) => x.id === id)
  return f ? [f] : []
})
export const FAQ_CTA: HomeLink = { label: 'All FAQs', href: '/faq' }

export const BLOG_HEADING: HeadingPart[] = ['FROM THE ', { hl: 'BLOG' }]
export const BLOG_CTA: HomeLink = { label: 'All posts', href: '/blog' }

export const CONTACT_HEADING: HeadingPart[] = ["TELL US WHAT'S ", { hl: 'SLOWING YOU DOWN' }]
export const CONTACT_DETAILS: HomeLink[] = [
  { label: 'contact@websitevikreta.com', href: 'mailto:contact@websitevikreta.com' },
  { label: '+91 99704 45198', href: 'tel:+919970445198' },
  { label: 'WhatsApp us', href: 'https://wa.me/919970445198', external: true },
]
export const CONTACT_LOCATION = 'Pune, India'

