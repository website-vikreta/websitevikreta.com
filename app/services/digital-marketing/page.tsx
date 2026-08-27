import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'
import { SITE_URL } from '@/config/site'

export const metadata: Metadata = {
  title: 'Digital Marketing & SEO Services | Website Vikreta',
  description: 'Grow your business with SEO, content marketing, and digital marketing services that help you attract qualified traffic and generate more leads.',
  keywords: [
    'SEO agency Pune',
    'digital marketing agency',
    'content marketing',
    'search engine optimization',
    'growth marketing',
  ],
  openGraph: {
    title: 'Digital Marketing & SEO Services | Website Vikreta',
    description: 'Grow your business with SEO, content marketing, and digital marketing services that help you attract qualified traffic and generate more leads.',
    url: `${SITE_URL}/services/digital-marketing`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing & SEO Services | Website Vikreta',
    description: 'Grow your business with SEO, content marketing, and digital marketing services.',
  },
  alternates: {
    canonical: `${SITE_URL}/services/digital-marketing`,
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

export default function Page() {
  return <ComingSoonPage pageName="Digital Marketing" />
}
