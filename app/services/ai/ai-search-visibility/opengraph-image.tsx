import { getPillar } from '@/content/ai'
import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'ai-search-visibility | Website Vikreta'

export default function Image() {
  return ogImage('Applied AI', getPillar('ai-search-visibility')!.name)
}
