import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'About WebsiteVikreta | AI Automation & Web Development Agency in Pune',
  description: 'Learn about WebsiteVikreta, a Pune-based AI automation and web development agency. We build high-performance Next.js websites and custom AI workflow automation systems for businesses in India and worldwide.',
  keywords: [
    'about WebsiteVikreta',
    'AI automation agency Pune',
    'web development agency Pune',
    'Next.js development agency India',
    'AI workflow automation',
    'custom web development',
    'AI-first digital agency',
    'who we are',
    'WebsiteVikreta team',
  ],
  openGraph: {
    title: 'About WebsiteVikreta | AI Automation & Web Development Agency in Pune',
    description: 'Learn about WebsiteVikreta, a Pune-based AI automation and web development agency. We build high-performance Next.js websites and custom AI workflow automation systems for businesses in India and worldwide.',
    url: 'https://stage.websitevikreta.com/about',
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About WebsiteVikreta — AI Automation & Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About WebsiteVikreta | AI Automation & Web Development Agency in Pune',
    description: 'Learn about WebsiteVikreta, a Pune-based AI automation and web development agency.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/about',
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

export default function AboutPage() {
  return <ComingSoonPage pageName="About Us" showFooter={false} />
}
