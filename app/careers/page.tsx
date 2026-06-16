import { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Careers | Website Vikreta',
  description: 'Explore career opportunities at Website Vikreta. Join our growing team. Coming soon.',
}

export default function CareersPage() {
  return <ComingSoonPage />
}
