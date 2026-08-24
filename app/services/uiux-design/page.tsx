import type { Metadata } from 'next'
import UiUxClient from './UiUxClient'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/services/uiux-design`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'UI/UX Design Agency',
      serviceType: 'UI/UX Design',
      description: 'User research, Figma design systems, and dev-ready prototypes for web and mobile products.',
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
        { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: PAGE_URL },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'UI/UX Design Agency | Website Vikreta',
  description: 'Custom UI/UX design for web and mobile products: user research, Figma design systems, and dev-ready prototypes. Free scoping call.',
  keywords: [
    // Primary
    'UI UX design agency',
    // Secondary
    'product design services',
    'Figma design system',
    'user research and UX design',
    'mobile app UI design',
    'web app UI design',
    'wireframing and prototyping services',
    'UX audit',
    // Long-tail
    'custom design system development',
    'UI UX design company for startups',
    'hire UX designer for SaaS product',
    'user flow and wireframe design services',
  ],
  openGraph: {
    title: 'UI/UX Design Agency | Website Vikreta',
    description: 'Custom UI/UX design for web and mobile products: user research, Figma design systems, and dev-ready prototypes. Free scoping call.',
    url: PAGE_URL,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'UI/UX Design Agency | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI/UX Design Agency | Website Vikreta',
    description: 'Custom UI/UX design for web and mobile products: user research, Figma design systems, and dev-ready prototypes. Free scoping call.',
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

export default function UiUxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UiUxClient />
    </>
  )
}
