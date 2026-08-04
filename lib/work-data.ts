import { ALL_FAQS } from '@/lib/faq-data'

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
  imageAlt: string
  skills: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'simpli-home',
    company: 'Simpli Home',
    logo: '/client-logos/simpli-home.svg',
    tags: 'AI AUTOMATION / MEDIA OPS',
    title: 'Bulk media generation, automated.',
    subtitle:
      'A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster.',
    excerpt:
      'Simpli Home needed to produce large volumes of product visuals without adding headcount. We mapped the manual Figma workflow and rebuilt it as an automated pipeline.',
    featured: true,
    metric: { value: '11 hrs', label: 'Saved per week' },
    challenge:
      'The media team was spending hours on repetitive bulk content generation inside Figma: resizing, exporting, and organizing assets collection by collection.',
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
    tags: 'UI/UX DESIGN / DESIGN SYSTEM',
    title: 'From MVP to a product people actually use.',
    subtitle:
      'Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything.',
    excerpt:
      'An early-stage protocol product with fragmented UX and no design foundation. We rebuilt the experience layer and stayed on as the product evolved.',
    metric: { value: '3+ yrs', label: 'Ongoing partnership' },
    externalUrl: 'https://www.sustainablebtc.org/',
    challenge:
      'The product had rough user flows, no consistent design system, and an interface that did not match the credibility the protocol needed in market.',
    approach:
      'We started at the foundation: information architecture, core flows, and a scalable design system. Then we shipped iteratively as the product matured.',
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
    tags: 'WEBSITE / MARKETING',
    title: 'Zero to online. Properly.',
    subtitle:
      'Garage cleaning company, no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert.',
    excerpt:
      'A local service business with no digital presence. We built a fast marketing site with local SEO and copy written to convert enquiries.',
    metric: { value: '3 weeks', label: 'Concept to launch' },
    challenge:
      'AP Cleanco had no website, no search visibility, and no system for turning local enquiries into booked jobs.',
    approach:
      'We built a custom Next.js marketing site from scratch: fast loads, local SEO structure, and conversion-focused copy for a garage cleaning service.',
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
    imageAlt: 'Tocal website preview',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
  },
  {
    slug: 'sustainable-bitcoin-protocol-site',
    title: 'Sustainable Bitcoin Protocol',
    description:
      'The public site for a protocol that needed to read as credible to institutional users.',
    href: 'https://www.sustainablebtc.org/',
    image: '/our-services/ui-ux-design.webp',
    imageAlt: 'Sustainable Bitcoin Protocol website preview',
    skills: 'UI/UX DESIGN / DESIGN SYSTEM',
  },
  {
    slug: 'earth-by-blancora',
    title: 'Earth by Blancora',
    description:
      "A sustainable e-commerce storefront for a women's clothing brand.",
    href: 'https://blancoraclothing.com/shop',
    image: '/our-services/web-mobile-crm.webp',
    imageAlt: 'Earth by Blancora website preview',
    skills: 'UI/UX DESIGN / E-COMMERCE DEVELOPMENT',
  },
  {
    slug: 'ap-cleanco-site',
    title: 'AP Cleanco',
    description:
      'A local service business taken from no web presence at all to a site built to convert.',
    href: 'https://apcleanco.com/',
    image: '/our-services/digital-marketing-seo-geo.webp',
    imageAlt: 'AP Cleanco website preview',
    skills: 'WEB DEVELOPMENT / LOCAL SEO',
  },
  {
    slug: 'archmodal',
    title: 'Archmodal',
    description:
      'A polished home page for an architectural modeling and design studio.',
    href: 'https://www.archmodal.com/',
    image: '/our-services/ai-automation.webp',
    imageAlt: 'Archmodal website preview',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
  },
  {
    slug: 'katalyst-consulting',
    title: 'Katalyst Consulting',
    description:
      'A professional consulting firm site focused on credibility and growth.',
    href: 'https://www.katalystcs.co.in/',
    image: '/our-services/webdevelopment.webp',
    imageAlt: 'Katalyst Consulting website preview',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
  },
]

export interface WorkTestimonial {
  slug: string
  quote: string
  name: string
  designation: string
  company: string
  image: string
}

export const WORK_TESTIMONIALS: WorkTestimonial[] = [
  {
    slug: 'fiona-li',
    quote:
      'Great to work with. Very skillful. Not a lot of UXUI designers have aesthetic and visual design taste like Website Vikreta!',
    name: 'Fiona Li',
    designation: 'Senior Product Designer & Manager',
    company: '',
    image: '/our-work/testimonials/Fiona_Li.webp',
  },
  {
    slug: 'stacey-bae',
    quote: 'They were very professional. Team was timely, design was great and they did above and beyond my request.',
    name: 'Stacey Bae',
    designation: 'Developer',
    company: 'Archmodal Classrooms',
    image: '/our-work/testimonials/Stacey_Bae.webp',
  },
  {
    slug: 'benoit-marcell',
    quote:
      "They understood exactly what I wanted and gave it to me. Very stylish designs and also does a lot of research to make sure the work is perfect. I'll recommend them not only because their work is good but they are easy going. They listen to you, they co-operate & communicated.",
    name: 'Benoit Marcell',
    designation: 'Owner',
    company: 'Elevagechiotspug',
    image: '/our-work/testimonials/Benoit_Marcell.webp',
  },
  {
    slug: 'abhinav-singh',
    quote:
      'They have excellent design skills. They quickly prototyped the design I had in mind and then programmed it using modern CSS3/HTML5/SVG technologies. They adjusted well with changing requirements as we iterated through the design work. I look forward to working with Website Vikreta again and highly recommend them for your next frontend project.',
    name: 'Abhinav Singh',
    designation: 'Co-founder',
    company: 'JAXL, India',
    image: '/our-work/testimonials/Abhinav_Singh.webp',
  },
  {
    slug: 'john-kim',
    quote:
      'Website Vikreta did really nice work. They have really fast hands. They finished our new website design in the given time. They always responded quickly and has a really good sense of design. I will rehire them for future projects for sure.',
    name: 'John Kim',
    designation: 'CEO',
    company: 'Champion Lenders',
    image: '/our-work/testimonials/John_Kim.webp',
  },
  {
    slug: 'rudra-ghodke',
    quote:
      'They provide one of the best web development services out there. The team completes each project by giving personal attention to the smallest details. We really love working with Website Vikreta and will recommend everyone to contact them for any tech development need.',
    name: 'Rudra Ghodke',
    designation: 'Founder',
    company: 'MetaThumbz',
    image: '/our-work/testimonials/Rudra_Ghodke.webp',
  },
  {
    slug: 'sang-hyun-han',
    quote:
      "It was my second time working with Website Vikreta. They finished the project within the given time. Even if I don't explain to them the design I want, they know exactly what style of design I want. I will definitely work again with them on future projects.",
    name: 'Sang Hyun Han',
    designation: 'Full Stack Engineer',
    company: 'Cozmo Realty',
    image: '/our-work/testimonials/Sang_Hun_Yan.webp',
  },
]

// Subset of the master FAQ list relevant to a work/portfolio page — timeline, industries, stack, ongoing support.
export const WORK_FAQS = ALL_FAQS.filter(f => ['3', '8', '9', '11'].includes(f.id))
