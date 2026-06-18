import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Website Vikreta',
  description: "Get in touch with Website Vikreta. Tell us about your project and we'll get back to you within 24 hours.",
}

export default function ContactPage() {
  return <ContactPageContent />
}
