export interface Service {
  id: number
  number: string
  title: string
  description: string
  tag: string
  isNew?: boolean
}

export const SERVICES: Service[] = [
  {
    id: 4,
    number: '04',
    title: 'AI Automation & Workflow Optimisation',
    description:
      'We audit your business, find the hours your team wastes, and wire in AI systems that handle it — so your people do what only humans should.',
    tag: 'Any tool, any stack, no limitation',
    isNew: true,
  },
  {
    id: 1,
    number: '01',
    title: 'UX & UI Design',
    description:
      "Research-led design that feels premium. We use AI to test, iterate, and personalise — so you don't get a pretty site, you get one that converts.",
    tag: 'AI-assisted prototyping & testing',
  },
  {
    id: 2,
    number: '02',
    title: 'Website Development',
    description:
      'Fast, responsive, SEO-ready sites built in Next.js. Every line of code is written with ranking, speed, and scale in mind.',
    tag: 'AI-powered SEO & performance optimisation',
  },
  {
    id: 3,
    number: '03',
    title: 'Web & Mobile Apps',
    description:
      "CRMs, portals, e-commerce, custom systems — built for how your business actually works, not a template of how others think it should.",
    tag: 'AI workflows embedded from day one',
  },
]
