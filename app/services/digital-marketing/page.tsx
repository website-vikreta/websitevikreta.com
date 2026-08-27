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
      name: 'Digital Marketing & SEO/GEO Services',
      serviceType: 'Digital Marketing',
      description: 'SEO, GEO, content, and paid campaigns built on real data. Rank on Google and get cited by AI answer engines.',
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
  title: 'Digital Marketing & SEO/GEO Agency | Website Vikreta',
  description: 'Rank on Google and get cited by AI answer engines. SEO, GEO, content, and paid marketing built on real data. Free scoping call.',
  keywords: [
    'SEO agency Pune',
    'digital marketing agency',
    'GEO generative engine optimization',
    'AI search optimization',
    'content marketing services',
    'search engine optimization',
    'growth marketing agency',
  ],
  openGraph: {
    title: 'Digital Marketing & SEO/GEO Agency | Website Vikreta',
    description: 'Rank on Google and get cited by AI answer engines. SEO, GEO, content, and paid marketing built on real data. Free scoping call.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Digital Marketing & SEO/GEO Agency | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing & SEO/GEO Agency | Website Vikreta',
    description: 'Rank on Google and get cited by AI answer engines. SEO, GEO, content, and paid marketing built on real data.',
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
