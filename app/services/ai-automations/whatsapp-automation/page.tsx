import type { Metadata } from 'next'
import WhatsAppAutomationClient from './WhatsAppAutomationClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/ai-automations/whatsapp-automation`

/* The five onboarding stages, as HowTo steps (same text as the Onboarding section) */
const HOW_TO_STEPS = [
  { name: 'Connect & Verify', text: 'Your WhatsApp Business API account is connected and verified. We guide you through registration, required documents and verification (2 to 4 days).' },
  { name: 'Configure Your Store', text: 'Shopify or WooCommerce is connected to WhatsApp and set up with your brand (1 to 2 days).' },
  { name: 'Build & Approve', text: 'We build your cart recovery, COD confirmation and order update automations and prepare the message templates for review (2 to 4 days).' },
  { name: 'Test & Launch', text: 'Every flow is tested, you sign off, and we launch (1 to 2 days).' },
  { name: 'Handover & Support', text: 'We walk you through the system and support you after launch (1 to 2 days).' },
]

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
      mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      offers: [
        { '@type': 'Offer', name: 'WA Starter', url: `${PAGE_URL}#packages`, price: '11250', priceCurrency: 'INR', availability: 'https://schema.org/InStock', description: 'Per quarter, excluding GST' },
        { '@type': 'Offer', name: 'WA eCommerce', url: `${PAGE_URL}#packages`, price: '15750', priceCurrency: 'INR', availability: 'https://schema.org/InStock', description: 'Per quarter, excluding GST' },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'How we set up WhatsApp automation for your store',
      description: 'From WhatsApp Business API verification to launch: the five stages of onboarding, live in 7 to 14 days.',
      totalTime: 'P14D',
      step: HOW_TO_STEPS.map((st, i) => ({ '@type': 'HowToStep', position: i + 1, name: st.name, text: st.text, url: `${PAGE_URL}#onboarding` })),
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
  keywords: [
    'WhatsApp automation',
    'WhatsApp abandoned cart recovery',
    'COD order confirmation WhatsApp',
    'WhatsApp Business API for Shopify',
    'reduce RTO',
    'WhatsApp order updates',
    'AI WhatsApp chatbot',
  ],
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
