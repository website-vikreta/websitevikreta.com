import { getPillar } from '@/content/ai'
import { pillarMetadata } from '@/lib/ai-automations-seo'
import { PillarPage } from '../PillarPage'

const pillar = getPillar('conversational-ai')!

export const metadata = pillarMetadata(pillar)

export default function Page() {
  return <PillarPage pillar={pillar} rated />
}
