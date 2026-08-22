import type { Metadata } from 'next'
import AIAutomationsClient from './AIAutomationsClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/ai-automations`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'AI Automation Services',
      serviceType: 'AI Workflow Automation',
      description: 'AI workflow automation for the repetitive work eating your team\'s week. We audit your process, connect your tools, and hand the system over documented.',
      url: PAGE_URL,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: 'AI Automations', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'AI Automation Services | Workflow Automation for Businesses | Website Vikreta',
  description: 'AI workflow automation for the repetitive work eating your team\'s week. We audit your process, connect your tools, and hand the system over documented.',
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
    description: 'AI workflow automation for the repetitive work eating your team\'s week. We audit your process, connect your tools, and hand the system over documented.',
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
    description: 'AI workflow automation for the repetitive work eating your team\'s week. We audit your process, connect your tools, and hand the system over documented.',
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
