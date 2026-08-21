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
      name: 'Web & Mobile App Development and CRM Systems',
      serviceType: 'Custom Software Development',
      description: 'We build custom CRMs, internal tools, and web and mobile applications shaped around how your business actually runs, including integrations with the tools you already use.',
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
  title: 'Custom CRM & App Development Services | Website Vikreta',
  description: 'We build custom CRMs, internal tools, and web and mobile apps shaped around how your business runs, not squeezed into a template. Book a free systems audit.',
  keywords: [
    'custom CRM development',
    'CRM development agency',
    'web app development',
    'mobile app development',
    'internal tools development',
    'business process software',
    'Next.js app development',
  ],
  openGraph: {
    title: 'Custom CRM & App Development Services | Website Vikreta',
    description: 'We build custom CRMs, internal tools, and web and mobile apps shaped around how your business runs, not squeezed into a template. Book a free systems audit.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Custom CRM & App Development Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom CRM & App Development Services | Website Vikreta',
    description: 'We build custom CRMs, internal tools, and web and mobile apps shaped around how your business runs.',
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

export default function AppsCrmPage() {
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
