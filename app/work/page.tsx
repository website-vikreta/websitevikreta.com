import { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Our Work | Website Vikreta',
  description: 'Discover the projects and case studies we\'re working on. Coming soon.',
}

export default function WorkPage() {
  return <ComingSoonPage pageName="Our Work" showFooter={false} />
}
