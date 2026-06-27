import type { Metadata } from 'next'
import { FaqPageContent } from './FaqPageContent'

export const metadata: Metadata = {
  title: 'FAQ | Website Vikreta',
  description:
    'Answers to common questions about Website Vikreta — what we do, how we work, project timelines, pricing, and more.',
  openGraph: {
    title: 'FAQ | Website Vikreta',
    description:
      'Answers to common questions about Website Vikreta — what we do, how we work, project timelines, pricing, and more.',
    url: `${process.env.NEXT_PUBLIC_HOSTNAME}/faq`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_HOSTNAME}/faq`,
  },
}

export default function FAQPage() {
  return <FaqPageContent />
}
