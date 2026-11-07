import { branchParams, getBranch } from '@/content/ai-automations'
import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const dynamicParams = false
export const generateStaticParams = branchParams

export default async function Image({ params }: { params: Promise<{ branch: string }> }) {
  const b = getBranch((await params).branch)
  return ogImage('AI Automations', b?.name ?? 'AI Automations', b ? [b.persona] : [])
}
