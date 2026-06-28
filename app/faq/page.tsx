import type { Metadata } from 'next'
import { FaqPageContent } from './FaqPageContent'

export const metadata: Metadata = {
  title: 'FAQs | AI Automation, Web Development & Pricing | Website Vikreta',
  description: 'Find answers about our AI automation services, web development process, pricing, timelines, technologies, support, and project delivery.',
  keywords: [
    'AI automation FAQ',
    'web development FAQ',
    'Next.js development questions',
    'website pricing India',
    'AI workflow automation FAQ',
    'CRM automation FAQ',
    'Website Vikreta FAQ',
  ],
  openGraph: {
    title: 'FAQs | AI Automation, Web Development & Pricing | Website Vikreta',
    description: 'Find answers about our AI automation services, web development process, pricing, timelines, technologies, support, and project delivery.',
    url: `${process.env.NEXT_PUBLIC_HOSTNAME}/faq`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Website Vikreta FAQ | AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | AI Automation, Web Development & Pricing | Website Vikreta',
    description: 'Find answers about our AI automation services, web development process, pricing, timelines, technologies, support, and project delivery.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_HOSTNAME}/faq`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function FAQPage() {
  return <FaqPageContent />
}
