import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Case Studies | AI Automation & Web Development Results | WebsiteVikreta',
  description: 'See how WebsiteVikreta helps businesses improve efficiency, automate workflows, and build high-performance websites through real client projects.',
  keywords: [
    'AI automation case studies',
    'web development case studies',
    'client success stories',
    'workflow automation examples',
  ],
  openGraph: {
    title: 'Case Studies | AI Automation & Web Development Results | WebsiteVikreta',
    description: 'See how WebsiteVikreta helps businesses improve efficiency, automate workflows, and build high-performance websites through real client projects.',
    url: 'https://stage.websitevikreta.com/work/case-studies',
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Case Studies — WebsiteVikreta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | AI Automation & Web Development Results | WebsiteVikreta',
    description: 'See how WebsiteVikreta helps businesses improve efficiency, automate workflows, and build high-performance websites.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/work/case-studies',
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
  return <ComingSoonPage pageName="Case Studies" />
}
