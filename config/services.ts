export interface Service {
  id: number
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Custom Web Development',
    description:
      'We build intelligent, scalable web experiences from the ground up — powered by AI-first architecture that adapts, learns, and performs. Every line of code is written with automation and growth in mind.',
  },
  {
    id: 2,
    title: 'SEO & Growth',
    description:
      'Our AI agents continuously audit, optimise, and iterate your search presence — surfacing opportunities humans miss and executing at a speed no traditional agency can match.',
  },
  {
    id: 3,
    title: 'E-Commerce Platforms',
    description:
      'From storefront to checkout, we deploy intelligent commerce systems that personalise in real time, reduce drop-off, and scale effortlessly with your catalogue and traffic.',
  },
  {
    id: 4,
    title: 'UI / UX Design',
    description:
      'We design interfaces that feel inevitable — human-centred and AI-informed. Every interaction is prototyped, tested, and refined through rapid agentic iteration cycles.',
  },
]
