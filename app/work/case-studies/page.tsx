import type { Metadata } from 'next'
import { SITE_URL } from '@/config/site'
import { CaseStudiesPageContent } from './CaseStudiesPageContent'
import { breadcrumbListNode } from '@/lib/schema'

const jsonLd = {
  '@context': 'https://schema.org',
  ...breadcrumbListNode(`${SITE_URL}/work/case-studies#breadcrumb`, [
    { name: 'Home', url: SITE_URL },
    { name: 'Work', url: `${SITE_URL}/work` },
    { name: 'Case Studies', url: `${SITE_URL}/work/case-studies` },
  ]),
}

export const metadata: Metadata = {
  title: 'Case Studies | AI Automation & Web Development Results | Website Vikreta',
  description:
    'See how Website Vikreta helps businesses improve efficiency, automate workflows, and build high-performance websites through real client projects.',
  keywords: [
    'AI automation case studies',
    'web development case studies',
    'client success stories',
    'workflow automation examples',
    'Website Vikreta results',
  ],
  openGraph: {
    title: 'Case Studies | AI Automation & Web Development Results | Website Vikreta',
    description:
      'See how Website Vikreta helps businesses improve efficiency, automate workflows, and build high-performance websites through real client projects.',
    url: `${SITE_URL}/work/case-studies`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Case Studies | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | AI Automation & Web Development Results | Website Vikreta',
    description:
      'See how Website Vikreta helps businesses improve efficiency, automate workflows, and build high-performance websites.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/work/case-studies`,
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

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudiesPageContent />
    </>
  )
}
