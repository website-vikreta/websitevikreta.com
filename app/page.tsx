import type { Metadata } from 'next'
import { HomePreloader } from '@/components/ui/HomePreloader'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { ServicesBentoGrid } from '@/components/sections/ServicesBentoGrid'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { DotGrid } from '@/components/ui/DotGrid'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${process.env.NEXT_PUBLIC_HOSTNAME}/#organization`,
  name: 'Website Vikreta',
  url: process.env.NEXT_PUBLIC_HOSTNAME,
  logo: `${process.env.NEXT_PUBLIC_HOSTNAME}/logo/websitevikreta-logo-horizontal.svg`,
  description: 'Website Vikreta is an AI-first web agency based in Pune, India. We design and build fast, modern websites and intelligent AI automation systems for businesses ready to grow.',
  foundingLocation: {
    '@type': 'Place',
    name: 'Pune, Maharashtra, India',
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'India',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${process.env.NEXT_PUBLIC_HOSTNAME}/contact`,
    email: 'contact@websitevikreta.com',
    telephone: '+919970445198',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
  sameAs: [
    'https://www.linkedin.com/company/websitevikreta/',
    'https://instagram.com/websitevikreta',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website Vikreta Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automations',
          description: 'Custom AI automation systems that eliminate repetitive work and connect business tools into intelligent workflows.',
          url: `${process.env.NEXT_PUBLIC_HOSTNAME}/services/ai-automations`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Design and Development',
          description: 'Modern, performant websites built with Next.js, TypeScript, and Tailwind CSS — optimised for speed, SEO, and mobile.',
          url: process.env.NEXT_PUBLIC_HOSTNAME,
        },
      },
    ],
  },
  knowsAbout: [
    'Web Design',
    'Web Development',
    'AI Automation',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Sanity CMS',
    'Search Engine Optimisation',
    'Business Process Automation',
  ],
}

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
    url: process.env.NEXT_PUBLIC_HOSTNAME,
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
    canonical: process.env.NEXT_PUBLIC_HOSTNAME,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePreloader />
      <DotGrid global />
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ClientLogosSection />
      <ServicesBentoGrid />
      <FeaturedWorkSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
    </main>
  )
}
