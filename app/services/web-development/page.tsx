import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'
import { ComingSoonPage } from '@/components/ComingSoonPage'
import { SITE_URL } from '@/config/site'

export const metadata: Metadata = {
  title: 'Web Development Services | Website Vikreta',
  description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
  keywords: [
    'Next.js development agency',
    'web development agency',
    'custom website development',
    'SEO-ready websites',
    'TypeScript development',
  ],
  openGraph: {
    title: 'Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS. Designed for performance, scalability, and business growth.',
    url: `${SITE_URL}/services/web-development`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Web Development Services | Website Vikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Services | Website Vikreta',
    description: 'Build fast, SEO-ready websites with Next.js, TypeScript, and Tailwind CSS.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/services/web-development`,
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

export default function WebDevelopmentPage() {
  return <WebDevClient />
  // return <ComingSoonPage pageName="Web Development" />
}
