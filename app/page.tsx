import type { Metadata } from 'next'
import { HomePreloader } from '@/components/ui/HomePreloader'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { DotGrid } from '@/components/ui/DotGrid'

export const metadata: Metadata = {
  title: 'Website Vikreta — AI-First Web Agency in Pune',
  description: 'Website Vikreta is a Pune-based AI-first web agency. We design and build fast, modern websites and intelligent AI automation systems for businesses ready to grow.',
  keywords: [
    'web design agency Pune',
    'AI automation agency Pune',
    'website development Pune',
    'AI-first web agency',
    'web agency India',
    'Next.js web development',
    'business automation Pune',
    'custom website design',
  ],
  openGraph: {
    title: 'Website Vikreta — AI-First Web Agency in Pune',
    description: 'We design and build fast, modern websites and intelligent AI automation systems for businesses ready to grow.',
    url: 'https://stage.websitevikreta.com',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    // TODO: add public/og-image.png (1200x630) to enable OG image previews
    // Brand: cream/off-white background, black text, #FFBF00 yellow accent
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Website Vikreta — AI-First Web Agency in Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Vikreta — AI-First Web Agency in Pune',
    description: 'We design and build fast, modern websites and intelligent AI automation systems for businesses ready to grow.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com',
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

export default function Home() {
  return (
    <main>
      <HomePreloader />
      <DotGrid global />
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ClientLogosSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
    </main>
  )
}
