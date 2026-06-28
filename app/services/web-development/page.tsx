import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Next.js Web Development Services | Website Vikreta',
  description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
  keywords: [
    'Next.js development agency',
    'web development agency',
    'custom website development',
    'SEO-ready websites',
    'TypeScript development',
  ],
  openGraph: {
    title: 'Next.js Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
    url: 'https://stage.websitevikreta.com/services/web-development',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next.js Web Development Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services/web-development',
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
  return <ComingSoonPage pageName="Web Development" />
}
