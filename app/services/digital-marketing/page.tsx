import type { Metadata } from 'next'
import DigitalMarketingClient from './DigitalMarketingClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/digital-marketing`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Digital Marketing, SEO & GEO Agency',
      serviceType: 'Digital Marketing',
      description: 'SEO, GEO, content, and paid campaigns built on real lead and revenue numbers, not rankings and impressions.',
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
        { '@type': 'ListItem', position: 3, name: 'Digital Marketing', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Digital Marketing, SEO & GEO Agency | Website Vikreta',
  description: 'SEO, GEO, content, and paid campaigns built to bring in real leads, not just rankings. Data-driven digital marketing that keeps working. Free growth call.',
  keywords: [
    // Primary
    'digital marketing agency',
    'SEO agency Pune',
    // Secondary
    'GEO AI search optimization',
    'content marketing agency',
    'local SEO services',
    'paid ads management agency',
    'search engine optimization services',
    'growth marketing agency',
    // Long-tail
    'digital marketing agency that reports on leads not rankings',
    'SEO and AI answer engine optimization agency',
    'local SEO for small business',
    'content marketing that compounds organic traffic',
    'paid and local ad campaigns for lead generation',
  ],
  openGraph: {
    title: 'Digital Marketing, SEO & GEO Agency | Website Vikreta',
    description: 'SEO, GEO, content, and paid campaigns built to bring in real leads, not just rankings. Data-driven digital marketing that keeps working. Free growth call.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Digital Marketing, SEO & GEO Agency | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing, SEO & GEO Agency | Website Vikreta',
    description: 'SEO, GEO, content, and paid campaigns built to bring in real leads, not just rankings. Data-driven digital marketing that keeps working. Free growth call.',
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

export default function DigitalMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalMarketingClient />
    </>
  )
}
