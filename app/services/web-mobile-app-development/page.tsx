import type { Metadata } from 'next'
import AppsCrmClient from './AppsCrmClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/web-mobile-app-development`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Custom Web & Mobile App Development Company',
      serviceType: 'Custom Software Development',
      description: 'Custom web apps, mobile apps, CRMs and customer portals built around how your business actually runs, not how a template assumes it should.',
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
  title: 'Custom Web & Mobile App Development Company | Website Vikreta',
  description: 'Custom web apps, mobile apps, CRMs and customer portals built around how your business actually runs, not how a template assumes it should. Free scoping call.',
  keywords: [
    // Primary
    'custom web and mobile app development company',
    // Secondary
    'mobile app development services',
    'custom CRM development company',
    'customer portal development',
    'internal tools development company',
    'cross-platform app development agency',
    'Next.js web app development',
    'custom software development for small business',
    // Long-tail
    'custom CRM development for businesses',
    'build a customer portal for my business',
    'cross-platform mobile app development for startups',
    'replace spreadsheets with a custom internal tool',
    'web and mobile app development company for small business',
    'custom e-commerce app development company',
  ],
  openGraph: {
    title: 'Custom Web & Mobile App Development Company | Website Vikreta',
    description: 'Custom web apps, mobile apps, CRMs and customer portals built around how your business actually runs, not how a template assumes it should. Free scoping call.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Custom Web & Mobile App Development Company | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Web & Mobile App Development Company | Website Vikreta',
    description: 'Custom web apps, mobile apps, CRMs and customer portals built around how your business actually runs, not how a template assumes it should. Free scoping call.',
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
