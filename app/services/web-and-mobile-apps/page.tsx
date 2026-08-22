import type { Metadata } from 'next'
import AppsCrmClient from './AppsCrmClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/web-and-mobile-apps`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Web & Mobile App / CRM Development',
      serviceType: 'Custom Software Development',
      description: 'We build custom CRMs, customer and partner portals, e-commerce systems, and mobile apps built around how your business actually runs.',
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
        { '@type': 'ListItem', position: 3, name: 'Apps & CRM', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Web & Mobile App / CRM Development | Website Vikreta',
  description: 'We build custom CRMs, customer and partner portals, e-commerce systems, and mobile apps — built around how your business actually runs, not a generic SaaS.',
  keywords: [
    'custom CRM development',
    'web app development agency',
    'mobile app development',
    'customer portal development',
    'e-commerce development',
    'internal tools development',
  ],
  openGraph: {
    title: 'Web & Mobile App / CRM Development | Website Vikreta',
    description: 'We build custom CRMs, customer and partner portals, e-commerce systems, and mobile apps — built around how your business actually runs, not a generic SaaS.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Web & Mobile App / CRM Development | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & Mobile App / CRM Development | Website Vikreta',
    description: 'Custom CRMs, portals, e-commerce systems, and mobile apps built around how your business runs.',
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

export default function WebAndMobileAppsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppsCrmClient />
    </>
  )
}
