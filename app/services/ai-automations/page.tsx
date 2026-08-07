import type { Metadata } from 'next'
import AIAutomationsClient from './AIAutomationsClient'
import { SITE_URL } from '@/config/site'
import { breadcrumbListNode, ORGANIZATION_REF } from '@/lib/schema'

const PAGE_URL = `${SITE_URL}/services/ai-automations`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'AI Automation Services',
      serviceType: 'AI Workflow Automation',
      description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
      url: PAGE_URL,
      provider: ORGANIZATION_REF,
      areaServed: { '@type': 'Country', name: 'India' },
    },
    breadcrumbListNode(`${PAGE_URL}#breadcrumb`, [
      { name: 'Home', url: SITE_URL },
      { name: 'Services', url: `${SITE_URL}/services` },
      { name: 'AI Automations', url: PAGE_URL },
    ]),
  ],
}

export const metadata: Metadata = {
  title: 'AI Automation Services | Workflow Automation for Businesses | Website Vikreta',
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
    title: 'AI Automation Services | Workflow Automation for Businesses | Website Vikreta',
    description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
    url: `${SITE_URL}/services/ai-automations`,
   siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'AI Automation Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Services | Workflow Automation for Businesses | Website Vikreta',
    description: 'We build custom AI workflow automation systems that eliminate repetitive work, automate business processes, connect your tools, and improve efficiency.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/services/ai-automations`,
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIAutomationsClient />
    </>
  )
}
