import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Careers at WebsiteVikreta | Join Our AI Automation & Web Development Agency',
  description: 'Join WebsiteVikreta, a Pune-based AI automation and web development agency. Explore opportunities for developers, designers, marketers, and AI automation specialists.',
  keywords: [
    'careers WebsiteVikreta',
    'web development jobs Pune',
    'AI automation jobs India',
    'Next.js developer jobs',
    'UI UX designer Pune',
    'AI agency careers',
    'software developer jobs Pune',
  ],
  openGraph: {
    title: 'Careers at WebsiteVikreta | Join Our AI Automation & Web Development Agency',
    description: 'Join WebsiteVikreta, a Pune-based AI automation and web development agency. Explore opportunities for developers, designers, marketers, and AI automation specialists.',
    url: 'https://stage.websitevikreta.com/careers',
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Careers at WebsiteVikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at WebsiteVikreta | Join Our AI Automation & Web Development Agency',
    description: 'Join WebsiteVikreta, a Pune-based AI automation and web development agency.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/careers',
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

export default function CareersPage() {
  return <ComingSoonPage pageName="Careers" showFooter={false} />
}
