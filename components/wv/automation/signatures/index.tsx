import type { Branch } from '@/content/ai-automations/types'
import HrShelf from './HrShelf'
import WorkflowPicker from './WorkflowPicker'
import VoiceCallLog from './VoiceCallLog'
import WhatsAppRace from './WhatsAppRace'
import FinanceBoard from './FinanceBoard'
import UgcGallery from './UgcGallery'
import ContentFeed from './ContentFeed'
import ProposalAnatomy from './ProposalAnatomy'

export { default as HubDesk } from './HubDesk'

type P = { branch: Branch }
const MAP: Record<string, (p: P) => React.ReactNode> = {
  'hr-automation': HrShelf,
  'workflow-automation': WorkflowPicker,
  'ai-voice-agents': VoiceCallLog,
  'whatsapp-automation': WhatsAppRace,
  'finance-automation': FinanceBoard,
  'ai-ugc-ads': UgcGallery,
  'content-automation': ContentFeed,
  'proposal-automation': ProposalAnatomy,
}

/** Branch-specific signature section. Renders nothing for an unknown slug. */
export function BranchSignature({ branch }: P) {
  const S = MAP[branch.slug]
  return S ? <S branch={branch} /> : null
}
