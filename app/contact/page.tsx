import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/wv.css'
import { wvFonts } from '@/components/wv/fonts'
import { ContactForm, ContactChannels } from '@/components/contact/ContactForm'
import { SITE_URL, ORGANIZATION_REF } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Us | Website Vikreta',
  description: 'Talk to Website Vikreta, a Pune-based AI-first web agency working with clients worldwide. Tell us about your website, app or AI automation project and we reply within 24 hours.',
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
    description: 'Talk to a Pune-based AI-first agency building websites and AI automation for clients worldwide. We reply within 24 hours.',
    url: `${SITE_URL}/contact`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    // Brand: cream/off-white background, black text, #FFBF00 yellow accent
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Website Vikreta | AI-First Web Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Website Vikreta',
    description: 'Talk to a Pune-based AI-first agency building websites and AI automation for clients worldwide.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Website Vikreta',
  mainEntity: {
    ...ORGANIZATION_REF,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'contact@websitevikreta.com',
      telephone: '+919970445198',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Hindi', 'Marathi'],
    },
  },
}

export default function ContactPage() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wv-page wv-ct-hero">
        <div className="wv-grid-bg" aria-hidden />
        <div className="wv-wrap">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Contact</span>
          </nav>
          <h1 className="wv-h1 wv-page-h1">Let&apos;s get started</h1>
          <p className="wv-page-lead">
            Tell us what you are building. A Pune-based team replies within 24 hours, wherever you are.
          </p>
        </div>
      </section>

      <div className="wv-wrap wv-ct">
        <div className="wv-ct-card">
          <ContactForm />
        </div>
        <aside className="wv-ct-side" aria-label="Direct channels">
          <h2>Prefer to talk directly?</h2>
          <ContactChannels />
        </aside>
      </div>
    </div>
  )
}
