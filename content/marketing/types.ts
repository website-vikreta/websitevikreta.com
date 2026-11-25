import type { Faq } from '@/content/ai/types'

export type { Faq }

export type Step = { title: string; body: string }

/** A real sub-page under a service. Only SubServices with `page` get a route. */
export type SubService = {
  slug: string
  name: string
  oneLiner: string
  answer: string
  deliverables: string[]
  excludes: string[]
  steps: Step[]
  faqs: Faq[]
  /** Plain-language outcome. No invented numbers. */
  kpi: string
  timeToLive: string
  reading: string[]
  page: true
}

export type Service = {
  slug: string
  name: string
  navLabel: string
  title: string
  description: string
  h1: string[]
  lead: string
  answerQ: string
  answer: string
  usp: string
  heroSub: string
  steps: Step[]
  faqs: Faq[]
  tools: string[]
  industries: string[]
  reading: string[]
  subServices: SubService[]
}

export type Pillar = {
  slug: string
  name: string
  title: string
  description: string
  keywords: string[]
  h1: string[]
  lead: string
  answerQ: string
  answer: string
  services: string[]
  reading: string[]
  faqs: Faq[]
  updated: string
}
