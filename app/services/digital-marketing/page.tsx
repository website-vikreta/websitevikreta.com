import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Digital Marketing & SEO Services | WebsiteVikreta',
  description: 'Grow your business with SEO, content marketing, and digital marketing services that help you attract qualified traffic and generate more leads.',
  keywords: [
    'SEO agency Pune',
    'digital marketing agency',
    'content marketing',
    'search engine optimization',
    'growth marketing',
  ],
  openGraph: {
    title: 'Digital Marketing & SEO Services | WebsiteVikreta',
    description: 'Grow your business with SEO, content marketing, and digital marketing services that help you attract qualified traffic and generate more leads.',
    url: 'https://stage.websitevikreta.com/services/digital-marketing',
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing & SEO Services — WebsiteVikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing & SEO Services | WebsiteVikreta',
    description: 'Grow your business with SEO, content marketing, and digital marketing services.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services/digital-marketing',
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
