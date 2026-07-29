import type { Metadata } from 'next'
import { SITE_URL } from '@/config/site'
import { WorkPageContent } from './WorkPageContent'

export const metadata: Metadata = {
  title: 'Our Work | Web Development & AI Automation Projects | Website Vikreta',
  description:
    'Explore websites, AI automation systems, and digital products built by Website Vikreta. Real case studies with measurable outcomes for businesses across industries.',
  keywords: [
    'web development portfolio',
    'AI automation projects',
    'Website Vikreta portfolio',
    'client work',
    'case studies',
    'Next.js agency work',
    'AI workflow automation examples',
  ],
  openGraph: {
    title: 'Our Work | Web Development & AI Automation Projects | Website Vikreta',
    description:
      'Explore websites, AI automation systems, and digital products built by Website Vikreta for businesses across industries.',
    url: `${SITE_URL}/work`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Our Work | Website Vikreta Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Web Development & AI Automation Projects | Website Vikreta',
    description:
      'Explore websites, AI automation systems, and digital products built by Website Vikreta.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/work`,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Our Work',
  description:
    'Portfolio of web development, AI automation, and digital design projects by Website Vikreta.',
  url: `${SITE_URL}/work`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Website Vikreta',
    url: SITE_URL,
  },
}

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkPageContent />
    </>
  )
}
