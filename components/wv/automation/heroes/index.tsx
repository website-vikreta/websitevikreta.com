import type { Branch, Product } from '@/content/ai-automations/types'
import HrHero from './HrHero'
import WorkflowHero from './WorkflowHero'
import VoiceHero from './VoiceHero'
import WhatsAppHero from './WhatsAppHero'
import FinanceHero from './FinanceHero'
import UgcHero from './UgcHero'
import ContentHero from './ContentHero'
import ProposalHero from './ProposalHero'

export { default as HubHero } from './HubHero'

type P = { branch: Branch; product?: Product }
const MAP: Record<string, (p: P) => React.ReactNode> = {
  'hr-automation': HrHero,
  'workflow-automation': WorkflowHero,
  'ai-voice-agents': VoiceHero,
  'whatsapp-automation': WhatsAppHero,
  'finance-automation': FinanceHero,
  'ai-ugc-ads': UgcHero,
  'content-automation': ContentHero,
  'proposal-automation': ProposalHero,
}

export function BranchHero({ branch, product }: P) {
  const H = MAP[branch.slug]
  return H ? <H branch={branch} product={product} /> : null
}
