import type { Metadata } from 'next'
import AIAutomationsClient from './AIAutomationsClient'

export const metadata: Metadata = {
  title: 'AI Automation Services | Workflow Automation for Businesses | WebsiteVikreta',
  description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
  keywords: [
    'AI automation agency',
    'AI workflow automation',
    'business process automation',
    'n8n automation',
    'Make.com automation',
    'CRM automation',
    'lead automation',
    'AI chatbot development',
  ],
  openGraph: {
    title: 'AI Automation Services | Workflow Automation for Businesses | WebsiteVikreta',
    description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
    url: `${process.env.NEXT_PUBLIC_HOSTNAME}/services/ai-automations`,
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Automation Services — WebsiteVikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Services | Workflow Automation for Businesses | WebsiteVikreta',
    description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_HOSTNAME}/services/ai-automations`,
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

export default function AIAutomationsPage() {
  return <AIAutomationsClient />
}
