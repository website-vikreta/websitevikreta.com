import { getProduct, productParams } from '@/content/ai'
import { ogImage, ogSize } from '../../og'

export const size = ogSize
export const contentType = 'image/png'
export const dynamicParams = false
export const generateStaticParams = productParams

export default async function Image({ params }: { params: Promise<{ branch: string; product: string }> }) {
  const { branch, product } = await params
  const p = getProduct(branch, product)
  return ogImage('Applied AI', p?.name ?? 'Applied AI', p ? [p.persona] : [])
}
