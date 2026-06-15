import { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Blog | Website Vikreta',
  description: 'Insights and updates from Website Vikreta. Coming soon.',
}

export default function BlogPage() {
  return <ComingSoonPage />
}
