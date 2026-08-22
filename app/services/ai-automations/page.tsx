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
  title: 'AI Automation Agency | Website Vikreta',
  description: 'Automate CRM, reporting, support and repetitive operations with custom AI agents and workflows. Get a free process audit from Website Vikreta.',
  keywords: [
    'AI automation agency',
    'AI automation services',
    'workflow automation company',
    'AI agent development company',
    'business process automation services',
    'n8n automation agency',
    'custom AI automation solutions',
    'AI workflow automation for small businesses',
    'custom AI agents for CRM and operations',
    'automate repetitive business processes with AI',
  ],
  openGraph: {
    title: 'AI Automation Agency | Website Vikreta',
    description: 'Automate CRM, reporting, support and repetitive operations with custom AI agents and workflows. Get a free process audit from Website Vikreta.',
    url: `${SITE_URL}/services/ai-automations`,
   siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'AI Automation Agency | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Agency | Website Vikreta',
    description: 'Automate CRM, reporting, support and repetitive operations with custom AI agents and workflows. Get a free process audit from Website Vikreta.',
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
