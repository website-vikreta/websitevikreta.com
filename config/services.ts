export interface Service {
  id: number
  number: string
  title: string
  description: string
  tag: string
  href: string
  isNew?: boolean
  image?: string
}

export const SERVICES: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'AI Automation & Workflow Optimization',
    description:
      'We audit your business, find the hours your team wastes, and wire in AI systems that handle it — so your people do what only humans should.',
    tag: 'Any tool, any stack, no limitation',
    href: '/services/ai-automations',
    isNew: true,
    image: '/our-services/ai-automations.jpeg',
  },
  {
    id: 2,
    number: '02',
    title: 'Website Development',
    description:
      'Fast, responsive, SEO-ready sites built in Next.js. Every line of code is written with ranking, speed, and scale in mind.',
    tag: 'AI-powered SEO & performance optimisation',
    href: '/services/web-development',
    image: '/our-services/web-development.jpeg',
  },
  {
    id: 3,
    number: '03',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      "CRMs, portals, e-commerce, custom systems — built for how your business actually works, not a template of how others think it should.",
    tag: 'AI workflows embedded from day one',
    href: '/services/web-and-mobile-apps',
    image: '/our-services/web-app-crm.jpeg',
  },
  {
    id: 4,
    number: '04',
    title: 'UX & UI Design',
    description:
      "Research-led design that feels premium. We use AI to test, iterate, and personalise — so you don't get a pretty site, you get one that converts.",
    tag: 'AI-assisted prototyping & testing',
    href: '/services/uiux-design',
    image: '/our-services/ui-ux.jpeg',
  },
  {
    id: 5,
    number: '05',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'Campaigns that rank, reach, and convert — built on real data, not guesswork. We combine SEO, GEO, and paid channels into one growth engine.',
    tag: 'AI-driven targeting & content strategy',
    href: '/services/digital-marketing',
    image: '/our-services/digital-marketing-seo-geo.jpeg',
  },
]
