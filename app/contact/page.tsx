import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Website Vikreta',
  description: 'Get in touch with Website Vikreta — a Pune-based AI-first web agency. Whether you need a new website, AI automation, or want to discuss a project, we would love to hear from you.',
  keywords: [
    'contact web agency Pune',
    'hire web designer Pune',
    'web development inquiry Pune',
    'AI automation agency contact',
    'Website Vikreta contact',
    'get a website quote India',
    'web agency India contact',
  ],
  openGraph: {
    title: 'Contact Us | Website Vikreta',
    description: 'Reach out to Website Vikreta. We build modern websites and AI automation systems for businesses across India. Let us talk about your project.',
    url: 'https://stage.websitevikreta.com/contact',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    // TODO: add public/og-image.png (1200x630px)
    // Brand: cream/off-white background, black text, #FFBF00 yellow accent
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Website Vikreta — AI-First Web Agency in Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Website Vikreta',
    description: 'Reach out to Website Vikreta. We build modern websites and AI automation systems for businesses across India.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/contact',
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

export default function ContactPage() {
  return <ContactPageContent />
}
