import { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Contact Us | Website Vikreta',
  description: 'Get in touch with Website Vikreta. Send us a message and we\'ll be in touch soon.',
}

export default function ContactPage() {
  return <ComingSoonPage />
}
