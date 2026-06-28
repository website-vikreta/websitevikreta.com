import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Our Work | Web Development & AI Automation Projects | Website Vikreta',
  description: 'Explore websites, AI automation systems, and digital products built by Website Vikreta for businesses across industries.',
  keywords: [
    'web development portfolio',
    'AI automation projects',
    'Website Vikreta portfolio',
    'client work',
    'case studies',
  ],
  openGraph: {
    title: 'Our Work | Web Development & AI Automation Projects | Website Vikreta',
    description: 'Explore websites, AI automation systems, and digital products built by Website Vikreta for businesses across industries.',
    url: 'https://stage.websitevikreta.com/work',
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
    description: 'Explore websites, AI automation systems, and digital products built by Website Vikreta.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/work',
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

export default function WorkPage() {
  return <ComingSoonPage pageName="Our Work" showFooter={false} />
}
