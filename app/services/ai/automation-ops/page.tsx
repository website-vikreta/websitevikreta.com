import { getPillar } from '@/content/ai'
import { pillarMetadata } from '@/lib/ai-automations-seo'
import { PillarPage } from '../PillarPage'

const pillar = getPillar('automation-ops')!

export const metadata = pillarMetadata(pillar)

export default function Page() {
  return <PillarPage pillar={pillar} />
}
