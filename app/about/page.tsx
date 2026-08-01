import type { Metadata } from 'next'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import { CoreValuesSection } from '@/components/sections/CoreValuesSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { PhotoGallerySection } from '@/components/sections/PhotoGallerySection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { VisionSection } from '@/components/sections/VisionSection'
import { DotGrid } from '@/components/ui/DotGrid'
import { SITE_URL } from '@/config/site'

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
        height: 675,
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
      {/* Surface rhythm — white `--color-surface` slabs punctuate the warm
          `--color-bg` sections so the page never runs the same ground twice in
          a row: bg → bg → WHITE (values) → bg → WHITE (stats) → bg → bg → bg */}
      <AboutHeroSection />
      <VisionSection />
      <CoreValuesSection />
      <PhotoGallerySection />
      <StatsCounters />
      <ClientLogosSection />
      <InsightsSection />
      <ContactCTASection
        id="book-a-call"
        heading="Tell Us What's Broken"
        subheading="No pitch deck, no commitment. Tell us what isn't working — and we'll tell you what we'd actually do about it."
        formHeading="Book a Free Call"
        className="pt-16 pb-24 md:pt-20 md:pb-32"
      />
    </main>
  )
}
