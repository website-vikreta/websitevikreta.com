import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'AI Automation & Web Development Services | Website Vikreta',
  description: 'Explore Website Vikreta\'s AI automation, web development, UI/UX design, digital marketing, and mobile app development services for businesses in India and worldwide.',
  keywords: [
    'AI automation services',
    'web development agency',
    'Next.js development',
    'UI UX design',
    'digital marketing',
    'mobile app development',
    'business automation',
  ],
  openGraph: {
    title: 'AI Automation & Web Development Services | Website Vikreta',
    description: 'Explore Website Vikreta\'s AI automation, web development, UI/UX design, digital marketing, and mobile app development services for businesses in India and worldwide.',
    url: 'https://stage.websitevikreta.com/services',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Website Vikreta Services | AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & Web Development Services | Website Vikreta',
    description: 'Explore Website Vikreta\'s AI automation, web development, UI/UX design, digital marketing, and mobile app development services.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services',
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
  return <ComingSoonPage pageName="Services" />
}
