import type { Metadata } from 'next'
import { SITE_URL } from '@/config/site'
import { DotGrid } from '@/components/ui/DotGrid'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { VisionSection } from '@/components/sections/VisionSection'
import { PhotoGallerySection } from '@/components/sections/PhotoGallerySection'
import { CoreValuesSection } from '@/components/sections/CoreValuesSection'
import { ValuesCTASection } from '@/components/sections/ValuesCTASection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { AboutCTASection } from '@/components/sections/AboutCTASection'

export const metadata: Metadata = {
  title: 'About Us | Website Vikreta',
  description: 'Learn about Website Vikreta, a Pune-based AI automation and web development agency. We build high-performance Next.js websites and custom AI workflow automation systems for businesses in India and worldwide.',
  keywords: [
    'about Website Vikreta',
    'AI automation agency Pune',
    'web development agency Pune',
    'Next.js development agency India',
    'AI workflow automation',
    'custom web development',
    'AI-first digital agency',
    'who we are',
    'Website Vikreta team',
  ],
  openGraph: {
    title: 'About Website Vikreta | AI Automation & Web Development Agency',
    description: 'Learn about Website Vikreta, a Pune-based AI automation and web development agency. We build high-performance Next.js websites and custom AI workflow automation systems for businesses in India and worldwide.',
    url: `${SITE_URL}/about`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Website Vikreta | AI Automation & Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Website Vikreta | AI Automation & Web Development Agency',
    description: 'Learn about Website Vikreta, a Pune-based AI automation and web development agency.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
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
  return (
    <main>
      <DotGrid global />
      <AboutHeroSection />
      <VisionSection />
      <PhotoGallerySection />
      <StatsCounters />
      <CoreValuesSection />
      <ValuesCTASection />
      <InsightsSection />
      <AboutCTASection />
      <TestimonialsSection />
    </main>
  )
}
