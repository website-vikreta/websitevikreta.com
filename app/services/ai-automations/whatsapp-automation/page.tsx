import type { Metadata } from 'next'
import WhatsAppAutomationClient from './WhatsAppAutomationClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/ai-automations/whatsapp-automation`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'WhatsApp Commerce Platform',
      serviceType: 'WhatsApp E-commerce Automation',
      description:
        'CRM, cart recovery, COD confirmation, order updates, and AI support on WhatsApp. One platform deployed for your store.',
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
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AI Automations',
          item: `${SITE_URL}/services/ai-automations`,
        },
        { '@type': 'ListItem', position: 4, name: 'WhatsApp Automation', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'WhatsApp Commerce Platform for E-commerce | Website Vikreta',
  description:
    'Recover abandoned carts, confirm COD orders, and automate customer updates on WhatsApp. CRM, automation, and AI support in one platform. Book a demo.',
  keywords: [
    'whatsapp automation for ecommerce',
    'abandoned cart recovery whatsapp',
    'whatsapp business api india',
    'cod confirmation whatsapp',
    'shopify whatsapp automation',
    'whatsapp commerce platform',
  ],
  openGraph: {
    title: 'WhatsApp Commerce Platform for E-commerce | Website Vikreta',
    description:
      'Recover abandoned carts, confirm COD orders, and automate customer updates on WhatsApp. Book a platform demo.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'WhatsApp Commerce Platform | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Commerce Platform for E-commerce | Website Vikreta',
    description:
      'Recover abandoned carts, confirm COD orders, and automate customer updates on WhatsApp.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: PAGE_URL,
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

export default function WhatsAppAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhatsAppAutomationClient />
    </>
  )
}
