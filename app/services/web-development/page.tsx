import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'

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
    url: `${process.env.NEXT_PUBLIC_HOSTNAME}/services/web-development`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
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
    canonical: `${process.env.NEXT_PUBLIC_HOSTNAME}/services/web-development`,
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
}
