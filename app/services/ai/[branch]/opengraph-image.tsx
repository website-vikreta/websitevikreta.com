import { branchParams, getBranch } from '@/content/ai'
import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const dynamicParams = false
export const generateStaticParams = branchParams

export default async function Image({ params }: { params: Promise<{ branch: string }> }) {
  const b = getBranch((await params).branch)
  return ogImage('Applied AI', b?.name ?? 'Applied AI', b ? [b.persona] : [])
}
