export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyTestimonial {
  quote: string
  role: string
}

export interface CaseStudy {
  slug: string
  company: string
  logo: string
  tags: string
  title: string
  subtitle: string
  excerpt: string
  featured?: boolean
  metric?: CaseStudyMetric
  image?: string
  externalUrl?: string
  challenge: string
  approach: string
  result: string
  testimonial?: CaseStudyTestimonial
}

export interface WebProject {
  slug: string
  title: string
  description: string
  href: string
  image: string
  skills: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'simpli-home',
    company: 'Simpli Home',
    logo: '/client-logos/simpli-home.svg',
    tags: 'AI automation · Media ops',
    title: 'Bulk media generation, automated.',
    subtitle:
      'A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster.',
    excerpt:
      'Simpli Home needed to produce large volumes of product visuals without adding headcount. We mapped the manual Figma workflow and rebuilt it as an automated pipeline.',
    featured: true,
    metric: { value: '11 hrs', label: 'Saved per week' },
    image: '/our-services/ai-automation.webp',
    challenge:
      'The media team was spending hours on repetitive bulk content generation inside Figma — resizing, exporting, and organizing assets collection by collection.',
    approach:
      'We audited the full production workflow, identified the repeat steps, and wired automation inside Figma Buzz so bulk generation could run without manual intervention at each stage.',
    result:
      'The team reclaimed roughly 11 hours per week and redirected that time toward creative work instead of production overhead.',
    testimonial: {
      quote: 'Our team finally does the work we hired them for. Game changer.',
      role: 'Darcy McGilvery, Simpli Home',
    },
  },
  {
    slug: 'sustainable-bitcoin-protocol',
    company: 'Sustainable Bitcoin Protocol',
    logo: '/client-logos/sustainable-bitcoin-protocol.svg',
    tags: 'UI/UX design · Design system',
    title: 'From MVP to a product people actually use.',
    subtitle:
      'Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything.',
    excerpt:
      'An early-stage protocol product with fragmented UX and no design foundation. We rebuilt the experience layer and stayed on as the product evolved.',
    metric: { value: '3+ yrs', label: 'Ongoing partnership' },
    image: '/our-services/ui-ux-design.webp',
    externalUrl: 'https://www.sustainablebtc.org/',
    challenge:
      'The product had rough user flows, no consistent design system, and an interface that did not match the credibility the protocol needed in market.',
    approach:
      'We started at the foundation — information architecture, core flows, and a scalable design system — then shipped iteratively as the product matured.',
    result:
      'A product experience that institutional users could trust, with a design system the team could extend without starting from scratch each release.',
    testimonial: {
      quote:
        'They shaped our entire product from the ground up and are still the first people we call.',
      role: 'Co-founder, Sustainable Bitcoin Protocol',
    },
  },
  {
    slug: 'ap-cleanco',
    company: 'AP Cleanco',
    logo: '/client-logos/ap-cleanco.svg',
    tags: 'Website · Marketing',
    title: 'Zero to online. Properly.',
    subtitle:
      'Garage cleaning company, no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert.',
    excerpt:
      'A local service business with no digital presence. We built a fast marketing site with local SEO and copy written to convert enquiries.',
    metric: { value: '3 weeks', label: 'Concept to launch' },
    image: '/our-services/webdevelopment.webp',
    challenge:
      'AP Cleanco had no website, no search visibility, and no system for turning local enquiries into booked jobs.',
    approach:
      'We built a custom Next.js marketing site from scratch — fast loads, local SEO structure, and conversion-focused copy for a garage cleaning service.',
    result:
      'A credible online presence live in three weeks, with a site built to rank locally and convert visitors into leads.',
    testimonial: {
      quote: 'Fastest turnaround we had. Quality was better than agencies charging 5x.',
      role: 'Co-founder, AP Cleanco',
    },
  },
]

export const FEATURED_CASE_STUDY =
  CASE_STUDIES.find((study) => study.featured) ?? CASE_STUDIES[0]

export const CASE_STUDY_GRID = CASE_STUDIES.filter(
  (study) => study.slug !== FEATURED_CASE_STUDY.slug,
)

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug)
}

export const WEB_PROJECTS: WebProject[] = [
  {
    slug: 'tocal',
    title: 'Tocal',
    description:
      'A sleek product site for DbyT Dynamics with a clean, modern presentation.',
    href: 'https://tocal.in/',
    image: '/our-services/webdevelopment.webp',
    skills: 'UI/UX Design · Web Development',
  },
  {
    slug: 'earth-by-blancora',
    title: 'Earth by Blancora',
    description:
      "A sustainable e-commerce storefront for a women's clothing brand.",
    href: 'https://blancoraclothing.com/shop',
    image: '/our-services/ui-ux-design.webp',
    skills: 'UI/UX Design · E-commerce Development',
  },
  {
    slug: 'archmodal',
    title: 'Archmodal',
    description:
      'A polished home page for an architectural modeling and design studio.',
    href: 'https://www.archmodal.com/',
    image: '/our-services/web-mobile-crm.webp',
    skills: 'UI/UX Design · Web Development',
  },
  {
    slug: 'psilent-ganges',
    title: 'Psilent Ganges',
    description:
      'An engineering solutions site built for clarity, performance, and trust.',
    href: 'https://psilentganges.netlify.app/',
    image: '/our-services/digital-marketing-seo-geo.webp',
    skills: 'Web Development · Performance Optimization',
  },
  {
    slug: 'katalyst-consulting',
    title: 'Katalyst Consulting',
    description:
      'A professional consulting firm site focused on credibility and growth.',
    href: 'https://www.katalystcs.co.in/',
    image: '/our-services/webdevelopment.webp',
    skills: 'UI/UX Design · Web Development',
  },
]

export const WORK_OUTCOMES = [
  {
    id: 'years',
    display: '5+',
    useCounter: false,
    label: 'Years shipping for clients across industries',
  },
  {
    id: 'projects',
    display: '68+',
    useCounter: false,
    label: 'Projects delivered — web, apps, automation, design',
  },
  {
    id: 'hours',
    display: '6360',
    suffix: 'hrs',
    useCounter: true,
    counterValue: 6360,
    label: 'Manual work removed since we went AI-first',
  },
] as const
