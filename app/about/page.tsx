import { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'About Us | Website Vikreta',
  description: 'Learn more about Website Vikreta. Coming soon.',
}

export default function AboutPage() {
  return <ComingSoonPage />
}
