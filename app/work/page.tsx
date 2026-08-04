import type { Metadata } from 'next'
import { SITE_URL } from '@/config/site'
import { CASE_STUDIES } from '@/lib/work-data'
import { WorkPageContent } from './WorkPageContent'

// 58 chars — Google truncates the SERP title around 60.
const TITLE = 'Web Development & AI Automation Work | Website Vikreta'
// 155 chars — target is 150-160.
const DESCRIPTION =
  'Websites, AI automation systems and digital products built by Website Vikreta. Real case studies with measurable outcomes for businesses across industries.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/work`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Our Work | Website Vikreta Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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

// The case studies are this page's actual asset — without an itemListElement
// they're invisible to structured data no matter how well they read.
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
  publisher: { '@id': `${SITE_URL}/#organization` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Case studies',
    numberOfItems: CASE_STUDIES.length,
    itemListElement: CASE_STUDIES.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: study.title,
        headline: study.title,
        description: study.excerpt,
        url: `${SITE_URL}/work/${study.slug}`,
        about: study.company,
        creator: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Our Work', item: `${SITE_URL}/work` },
  ],
}

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <WorkPageContent />
    </>
  )
}
