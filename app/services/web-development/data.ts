import type { FaqItem } from '@/lib/faq-data'

export const WEB_DEV_HERO = {
  line1: 'Five years in.',
  line2: 'The engine room',
  line3Before: 'still ',
  line3Accent: 'holds.',
  subhead:
    'We build the systems clients stop worrying about. Some of that we can count. The rest, they said out loud.',
  primaryCta: { label: 'Read the proof', href: '#proof' },
  secondaryCta: { label: 'Book a call' },
}

export const WEB_DEV_STATS = {
  heading: 'The numbers so far',
  subhead: 'Only what we can stand behind',
  items: [
    { value: 5, suffix: '+', label: 'Years with founders and teams' },
    {
      value: 68,
      suffix: '+',
      label: 'Projects shipped: sites, apps, automation, design',
    },
    {
      value: 6360,
      suffix: '+hrs',
      label: 'Saved for clients since we went AI-first',
    },
  ],
}

export interface WebDevPainItem {
  id: string
  title: string
  hook: string
  detail: string
  image: string
  imageAlt: string
}

export const WEB_DEV_PAIN = {
  eyebrow: 'The friction',
  heading: 'Before we showed up, the machine was jammed.',
  items: [
    {
      id: 'paper-jam',
      title: 'The paper jam.',
      hook: 'Invoices moving like paper in a flood.',
      detail:
        'Invoices and inputs arrive from everywhere, then stack up, duplicate, and disappear into review loops.',
      image: '/services/web-development/friction/paper-jam.webp',
      imageAlt: 'Invoices flooding in from every channel, then stacking up in review.',
    },
    {
      id: 'stampede',
      title: 'The stampede.',
      hook: 'Launch day, and the site falls off the hinges.',
      detail: 'Peak moments hit, checks multiply, and the process buckles when volume spikes.',
      image: '/services/web-development/friction/stampede.webp',
      imageAlt: 'A traffic stampede hitting a site that returns a server error.',
    },
    {
      id: 'five-cupboards',
      title: 'The five cupboards.',
      hook: 'Reports in five cupboards. Nobody has the key.',
      detail:
        'Reports live in separate places, buried under access issues and version chaos. Finding the truth takes a scavenger hunt.',
      image: '/services/web-development/friction/five-cupboards.webp',
      imageAlt: 'Five locked cupboards of reports, with no single key.',
    },
  ] satisfies WebDevPainItem[],
}

export interface WebDevProofCard {
  id: string
  label: string
  title: string
  /** Real, published metric only — omit when none exists. */
  stat?: string
  /** Shown in place of stat when no metric is published. */
  skills?: string
  catchphrase: string
  href: string
  thumbnail: {
    kind: 'screenshot' | 'logo'
    src: string
    alt: string
    width?: number
    height?: number
  }
}

export const WEB_DEV_PROOF_CARDS: WebDevProofCard[] = [
  {
    id: 'ap-cleanco',
    label: 'A',
    title: 'AP Cleanco',
    stat: '3 weeks',
    catchphrase: 'Zero to online. Properly.',
    href: 'https://apcleanco.com/',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/ap-cleanco.webp',
      width: 1440,
      height: 810,
      alt: 'AP Cleanco website homepage',
    },
  },
  {
    id: 'simpli-home',
    label: 'B',
    title: 'Simpli Home',
    stat: '11 hrs a week',
    catchphrase: 'They do the work we hired them for.',
    href: 'https://www.simpli-home.com/',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/simpli-home.webp',
      width: 1440,
      height: 810,
      alt: 'Simpli Home website homepage',
    },
  },
  {
    id: 'sustainable-bitcoin-protocol',
    label: 'C',
    title: 'Sustainable Bitcoin Protocol',
    stat: '3+ years',
    catchphrase: 'Still the first call.',
    href: 'https://www.sustainablebtc.org/',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/sustainable-bitcoin-protocol.webp',
      width: 1440,
      height: 810,
      alt: 'Sustainable Bitcoin Protocol website homepage',
    },
  },
  {
    id: 'tocal',
    label: 'D',
    title: 'Tocal',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
    catchphrase: 'A sleek product site with a clean, modern presentation.',
    href: 'https://tocal.in/',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/tocal.webp',
      width: 1440,
      height: 810,
      alt: 'Tocal website homepage',
    },
  },
  {
    id: 'earth-by-blancora',
    label: 'E',
    title: 'Earth by Blancora',
    skills: 'UI/UX DESIGN / E-COMMERCE DEVELOPMENT',
    catchphrase: 'A sustainable storefront built to sell.',
    href: 'https://blancoraclothing.com/shop',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/earth-by-blancora.webp',
      width: 1440,
      height: 810,
      alt: 'Earth by Blancora website homepage',
    },
  },
  {
    id: 'archmodal',
    label: 'F',
    title: 'Archmodal',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
    catchphrase: 'A polished home page for an architectural studio.',
    href: 'https://www.archmodal.com/',
    thumbnail: {
      kind: 'screenshot',
      src: '/services/web-development/proof/archmodal.webp',
      width: 1440,
      height: 810,
      alt: 'Archmodal website homepage',
    },
  },
]

export interface WebDevSolutionSystem {
  id: string
  title: string
  indexLabel: string
  description: string
  image: {
    src: string
    width: number
    height: number
    alt: string
  }
}

export const WEB_DEV_SOLUTION = {
  heading: 'What we build',
  systems: [
    {
      id: 'site-structure',
      title: 'Site structure search engines and humans can follow.',
      indexLabel: 'Site structure',
      description:
        'Pages, URLs, and content hierarchy mapped before anyone writes code. No orphan pages, no duplicate paths, no updating the same copy in three places.',
      image: {
        src: '/services/web-development/systems/site-structure.webp',
        width: 1672,
        height: 941,
        alt: 'Sitemap flowchart showing page hierarchy, search paths, and blocked duplicate content.',
      },
    },
    {
      id: 'auth-admin',
      title: 'Auth and admin with named access.',
      indexLabel: 'Auth & admin',
      description:
        'Logins, client areas, and CMS roles set to who should see what. Your team publishes from one dashboard — not from email threads and side spreadsheets.',
      image: {
        src: '/services/web-development/systems/auth-admin.webp',
        width: 1672,
        height: 941,
        alt: 'CMS dashboard with named Admin, Editor, Client, and CMS Team roles — email and spreadsheet updates blocked.',
      },
    },
    {
      id: 'performance',
      title: 'Performance under real traffic.',
      indexLabel: 'Performance',
      description:
        'Caching, image delivery, and server response tuned and load-tested before launch. A busy day adds visitors — not downtime.',
      image: {
        src: '/services/web-development/systems/performance.webp',
        width: 1672,
        height: 941,
        alt: 'Users, cloud servers, database, and a fast-loading website with a performance gauge.',
      },
    },
    {
      id: 'mobile-first',
      title: 'Mobile-first, not mobile-later.',
      indexLabel: 'Mobile-first',
      description:
        'Layout, forms, and CTAs built for phone first. Same pages, same flow, same speed on every screen size.',
      image: {
        src: '/services/web-development/systems/mobile-first.webp',
        width: 1672,
        height: 941,
        alt: 'The same website on laptop, phone, and tablet with matching layout and performance icons.',
      },
    },
  ] satisfies WebDevSolutionSystem[],
}

export const WEB_DEV_HOW_WE_WORK = {
  heading: 'How we work',
  steps: [
    {
      step: '01',
      title: 'We plan',
      description:
        'Goals, audience, and content, sorted before a single pixel gets designed, so nothing gets rebuilt halfway through.',
    },
    {
      step: '02',
      title: 'We design',
      description:
        'Wireframes and UI built around your brand, mobile-first from the first screen, not scaled up from desktop after.',
    },
    {
      step: '03',
      title: 'We build',
      description:
        'Custom-coded in Next.js and Tailwind. SEO, semantic HTML, and fast load times built in, not bolted on later.',
    },
    {
      step: '04',
      title: 'We launch and support',
      description:
        'Live in 3 to 6 weeks, then bug fixes, content updates, and maintenance so it keeps running as you grow.',
    },
  ],
}

export const WEB_DEV_PROOF_COPY = {
  heading: 'Proof engine',
}

export const WEB_DEV_SUPPORT = {
  headingBefore: 'Friday night.',
  headingMid: 'Something breaks.',
  headingAccent: 'We pick up.',
  autoPlayInterval: 2200,
  items: [
    {
      id: 'night-watch',
      step: '01',
      title: 'The night watch.',
      body: 'We’re awake when things go sideways. You don’t page us. We’re already there.',
      image: '/services/web-development/support/night-watch.webp',
      imageAlt:
        'A customer sleeping while an engineer monitors systems overnight — you sleep, we monitor.',
    },
    {
      id: 'extra-floor',
      step: '02',
      title: 'The extra floor.',
      body: 'We operate below your main stack so issues don’t climb to you.',
      image: '/services/web-development/support/extra-floor.webp',
      imageAlt:
        'A building cutaway: the client team works upstairs while operations catch issues on the floor below.',
    },
    {
      id: 'open-tab',
      step: '03',
      title: 'The open tab.',
      body: 'We stay in the work with you. No disappearing between updates.',
      image: '/services/web-development/support/open-tab.webp',
      imageAlt:
        'Team at a shared project dashboard — same tab, real-time updates, no disappearing between check-ins.',
    },
  ],
}

export const WEB_DEV_CONTACT = {
  heading: 'Tell us what’s jammed.',
  subhead:
    'We’ll come back with an honest timeline — most business sites, 3 to 6 weeks — and a quote. No pressure.',
  formHeading: 'Get a project call',
}

export const WEB_DEV_FAQS: FaqItem[] = [
  {
    id: 'webdev-source',
    question: 'Who owns the source?',
    answer:
      'You do. Once delivered, the code and content are yours — no licensing fees, no lock-in, and no dependency on us to keep the site running.',
  },
  {
    id: 'webdev-crm',
    question: 'Can it talk to the old CRM?',
    answer:
      'Usually, yes. Forms, booking tools, and CRMs you already run can sit behind the new site. We look at what you have before we promise a specific integration.',
  },
  {
    id: 'webdev-grow',
    question: 'What if we grow overnight?',
    answer:
      'We do not publish a peak-user figure we cannot name. The build is meant to hold, and we stay after launch — Sustainable Bitcoin Protocol has been with us for three-plus years.',
  },
  {
    id: 'webdev-1',
    question: 'How long until my site is live?',
    answer:
      'Most business websites take 3 to 6 weeks from kickoff to launch, depending on page count, content readiness, and how quickly feedback comes back. AP Cleanco went from zero web presence to live in three weeks. We’ll give you a realistic timeline upfront.',
  },
  {
    id: 'webdev-4',
    question: 'We already have a site. Do we need to start over?',
    answer:
      'Not always. Sometimes a rebuild is the right call — slow loads, broken mobile, no SEO structure. Sometimes a focused refresh on speed, structure, and conversion paths is enough. We’ll tell you honestly which camp you’re in after a quick look.',
  },
]
