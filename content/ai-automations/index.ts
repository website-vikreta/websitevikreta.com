import type { Branch, Product } from './types'
import { branch as workflow } from './branches/workflow-automation'
import { branch as voice } from './branches/ai-voice-agents'
import { branch as whatsapp } from './branches/whatsapp-automation'
import { branch as hr } from './branches/hr-automation'
import { branch as ugc } from './branches/ai-ugc-ads'
import { branch as content } from './branches/content-automation'
import { branch as proposal } from './branches/proposal-automation'
import { branch as finance } from './branches/finance-automation'

export * from './types'
export { TOOL_LOGOS, CLIENTS, toolLogos, clientLogos } from './logos'
export type { LogoItem } from './logos'
export { PERSONAS } from './personas'
export { HUB } from './hub'
export { BLOG, blog, blogList, readingFor, pairsWithOf } from './links'

export const BASE = '/services/ai-automations'
export const WA_NUMBER = '919970445198'

export const BRANCHES: Branch[] = [workflow, voice, whatsapp, hr, ugc, content, proposal, finance]

export const getBranch = (slug: string) => BRANCHES.find((b) => b.slug === slug)
export const getProduct = (branch: string, slug: string): Product | undefined =>
  getBranch(branch)?.products.find((p) => p.slug === slug)

export const branchParams = () => BRANCHES.map((b) => ({ branch: b.slug }))
export const productParams = () =>
  BRANCHES.flatMap((b) => b.products.filter((p) => p.page).map((p) => ({ branch: b.slug, product: p.slug })))

export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
