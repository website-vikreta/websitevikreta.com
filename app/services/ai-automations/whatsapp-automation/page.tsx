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
      name: 'WhatsApp Automation for E-commerce',
      serviceType: 'WhatsApp E-commerce Automation',
      description:
        'WhatsApp cart recovery, COD confirmation, order updates, CRM and AI support for Shopify and WooCommerce stores, set up on the WhatsApp Business API in 7 to 14 days.',
      url: PAGE_URL,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      offers: [
        { '@type': 'Offer', name: 'WA Starter', price: '11250', priceCurrency: 'INR', description: 'Per quarter, excluding GST' },
        { '@type': 'Offer', name: 'WA eCommerce', price: '15750', priceCurrency: 'INR', description: 'Per quarter, excluding GST' },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'WhatsApp Automation for Shopify & D2C Stores',
      inLanguage: 'en-IN',
      about: { '@id': `${PAGE_URL}#service` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
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
  title: 'WhatsApp Automation for Shopify & D2C Stores | Website Vikreta',
  description:
    'Recover abandoned carts, confirm COD orders and cut RTO on WhatsApp. We set up the Business API, templates and your Shopify or WooCommerce store in 7 to 14 days.',
  openGraph: {
    title: 'WhatsApp Automation for Shopify & D2C Stores | Website Vikreta',
    description:
      'Recover abandoned carts, confirm COD orders and cut RTO on WhatsApp. We set up the Business API, templates and your Shopify or WooCommerce store in 7 to 14 days.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Automation for Shopify & D2C Stores | Website Vikreta',
    description:
      'Recover abandoned carts, confirm COD orders and cut RTO on WhatsApp. We set up the Business API, templates and your Shopify or WooCommerce store in 7 to 14 days.',
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
