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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About Website Vikreta',
      description:
        'Website Vikreta is an AI automation agency building high-performance Next.js websites and AI workflow automation systems for businesses worldwide.',
      about: { '@id': `${SITE_URL}/#organization` },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Website Vikreta',
        url: SITE_URL,
      },
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/about#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'About Website Vikreta | AI Automation Agency',
  description: 'Website Vikreta is an AI automation agency building high-performance Next.js websites and AI workflow automation systems for businesses worldwide.',
  keywords: [
    'AI automation agency',
    'about Website Vikreta',
    'web development agency',
    'Next.js development agency India',
    'AI workflow automation',
    'custom web development',
    'AI-first digital agency',
    'who we are',
    'Website Vikreta team',
  ],
  openGraph: {
    title: 'About Website Vikreta | AI Automation Agency',
    description: 'Website Vikreta is an AI automation agency building high-performance Next.js websites and AI workflow automation systems for businesses worldwide.',
    url: `${SITE_URL}/about`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Website Vikreta | AI Automation Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Website Vikreta | AI Automation Agency',
    description: 'Website Vikreta is an AI automation agency building high-performance websites and AI workflow systems.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DotGrid global />
      {/* Surface rhythm — white `--color-surface` slabs punctuate the warm
          `--color-bg` sections so the page never runs the same ground twice in
          a row: bg → bg → WHITE (values) → bg → WHITE (stats) → bg → bg → bg */}
      <AboutHeroSection />
      <VisionSection />
      <CoreValuesSection />
      <PhotoGallerySection />
      <StatsCounters />
      {/* <ClientLogosSection /> */}
      <InsightsSection />
      <ContactCTASection
        id="book-a-call"
        heading="Tell Us What's Broken"
        subheading="No pitch deck, no commitment. Tell us what isn't working, and we'll tell you what we'd actually do about it."
        formHeading="Book a Free Call"
        className="pt-16 pb-24 md:pt-20 md:pb-32"
      />
    </main>
  )
}
