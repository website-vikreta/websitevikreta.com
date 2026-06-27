import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Web & Mobile App Development | WebsiteVikreta',
  description: 'Build custom web and mobile applications with modern technologies including React, Next.js, and TypeScript for startups and growing businesses.',
  keywords: [
    'web app development',
    'mobile app development',
    'React development',
    'Next.js development',
    'full stack development',
  ],
  openGraph: {
    title: 'Web & Mobile App Development | WebsiteVikreta',
    description: 'Build custom web and mobile applications with modern technologies including React, Next.js, and TypeScript for startups and growing businesses.',
    url: 'https://stage.websitevikreta.com/services/web-and-mobile-apps',
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web & Mobile App Development — WebsiteVikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & Mobile App Development | WebsiteVikreta',
    description: 'Build custom web and mobile applications with modern technologies for startups and growing businesses.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services/web-and-mobile-apps',
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
  return <ComingSoonPage pageName="Web & Mobile Apps" />
}
