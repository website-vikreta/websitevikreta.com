import { HUB } from '@/content/ai'
import { ogImage, ogSize } from './og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'AI teammates you just message | Website Vikreta'

export default function Image() {
  return ogImage('Applied AI', HUB.h1.join(' '), ['meher', 'ira', 'arjun'])
}
