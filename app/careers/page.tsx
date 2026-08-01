import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_OPENINGS_QUERY } from '@/sanity/lib/careers-queries'
import CareersClient from './CareersClient'
import { SITE_URL } from '@/config/site'

export const metadata: Metadata = {
  title: 'Website Vikreta Careers and Job Opportunities',
  description: 'Join Website Vikreta as an intern. We are an AI-first web agency in Pune building websites, ai automations, and digital experiences. Open roles in web development, design, and social media.',
  keywords: ['internship Pune', 'web development internship', 'graphic design internship', 'social media internship', 'Website Vikreta careers'],
  openGraph: {
    title: 'Website Vikreta Careers and Job Opportunities',
    description: 'Join Website Vikreta as an intern. We are an AI-first web agency in Pune building websites, ai automations, and digital experiences. Open roles in web development, design, and social media.',
    url: `${SITE_URL}/careers`,
    siteName: 'WebsiteVikreta',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.png', width: 1200, height: 675, alt: 'Careers at Website Vikreta' }],
  },
  twitter: { card: 'summary_large_image', title: 'Careers | Website Vikreta', description: 'Open internship roles in Pune.', images: ['/og-image.png'] },
  alternates: { canonical: `${SITE_URL}/careers` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function CareersPage() {
  const openings = await client.fetch(ALL_OPENINGS_QUERY)
  return <CareersClient openings={openings} />
}
