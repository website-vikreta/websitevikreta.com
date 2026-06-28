import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'UI/UX Design Services | Website Vikreta',
  description: 'Design user-friendly websites and applications with modern UI/UX that improves usability, engagement, and conversions.',
  keywords: [
    'UI UX design agency',
    'Figma design',
    'product design',
    'web app UI design',
    'UX design services',
  ],
  openGraph: {
    title: 'UI/UX Design Services | Website Vikreta',
    description: 'Design user-friendly websites and applications with modern UI/UX that improves usability, engagement, and conversions.',
    url: 'https://stage.websitevikreta.com/services/uiux-design',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UI/UX Design Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI/UX Design Services | Website Vikreta',
    description: 'Design user-friendly websites and applications with modern UI/UX that improves usability, engagement, and conversions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services/uiux-design',
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
  return <ComingSoonPage pageName="UI/UX Design" />
}
