import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'
import { ComingSoonPage } from '@/components/ComingSoonPage'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/web-development`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Web Development Services',
      serviceType: 'Web Development',
      description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
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
        { '@type': 'ListItem', position: 3, name: 'Web Development', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Web Development Services | Website Vikreta',
  description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
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
    title: 'Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
    url: `${SITE_URL}/services/web-development`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Web Development Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS.',
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
  // return <ComingSoonPage pageName="Web Development" />
}
