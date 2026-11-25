import { getPillar } from '@/content/ai'
import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'ai-content-ads | Website Vikreta'

export default function Image() {
  return ogImage('Applied AI', getPillar('ai-content-ads')!.name)
}
