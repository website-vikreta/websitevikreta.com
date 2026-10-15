import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'
import { SITE_URL, ORGANIZATION_REF } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/web-development`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Web Development Services',
      serviceType: 'Web Development',
      description: 'Custom websites built for speed, local SEO, and conversion. Fast to load, written to rank, and designed to turn visitors into enquiries. Get a free quote.',
      url: PAGE_URL,
      provider: ORGANIZATION_REF,
      areaServed: { '@type': 'Country', name: 'India' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Web Development', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Custom Web Development Company | Website Vikreta',
  description: 'Custom websites built for speed, local SEO, and conversion. Fast to load, written to rank, and designed to turn visitors into enquiries. Get a free quote.',
  keywords: [
    // Primary
    'web development company',
    // Secondary
    'custom website development services',
    'Next.js development agency',
    'business website development company',
    'SEO-ready website design and development',
    'custom website design company',
    'website redesign services',
    // Long-tail
    'custom website development for small business',
    'Next.js website development company for US businesses',
    'how much does a custom business website cost',
    'website redesign company for growing businesses',
    'fast SEO-optimized website development services',
  ],
  openGraph: {
    title: 'Custom Web Development Company | Website Vikreta',
    description: 'Custom websites built for speed, local SEO, and conversion. Fast to load, written to rank, and designed to turn visitors into enquiries. Get a free quote.',
    url: `${SITE_URL}/services/web-development`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Custom Web Development Company | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Web Development Company | Website Vikreta',
    description: 'Custom websites built for speed, local SEO, and conversion. Fast to load, written to rank, and designed to turn visitors into enquiries. Get a free quote.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/services/web-development`,
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

export default function WebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebDevClient />
    </>
  )
}
