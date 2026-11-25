import type { Metadata } from 'next'
import '@/app/wv.css'
import { AboutPageBody } from '@/components/wv/About'
import { CONTACT } from '@/components/wv/data'
import { wvFonts } from '@/components/wv/fonts'
import { ScrollProgress } from '@/components/wv/ui'
import { ABOUT } from '@/content/about'
import { ORGANIZATION_REF, SITE_URL } from '@/config/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About Website Vikreta',
      description: ABOUT.description,
      about: { '@id': ORGANIZATION_REF['@id'] },
      isPartOf: { '@type': 'WebSite', name: 'Website Vikreta', url: SITE_URL },
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
    },
    {
      ...ORGANIZATION_REF,
      description: 'UI/UX design and web development studio in Pune, India. Also builds apps, runs digital marketing and delivers AI automation.',
      foundingDate: ABOUT.foundingDate,
      address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
      areaServed: 'Worldwide',
      knowsAbout: ['UI/UX design', 'Web development', 'Mobile app development', 'SEO', 'CRM integration', 'AI automation'],
      sameAs: [CONTACT.linkedin],
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
  title: ABOUT.title,
  description: ABOUT.description,
  keywords: ['about Website Vikreta', 'creative studio Pune', 'digital agency India', 'AI-first studio', 'web development studio'],
  openGraph: {
    title: ABOUT.title,
    description: ABOUT.description,
    url: `${SITE_URL}/about`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: ABOUT.title }],
  },
  twitter: { card: 'summary_large_image', title: ABOUT.title, description: ABOUT.description, images: ['/og-image.png'] },
  alternates: { canonical: `${SITE_URL}/about` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default function AboutPage() {
  return (
    <div className={`wv wv-shell wv-ab ${wvFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ScrollProgress />
      <AboutPageBody />
    </div>
  )
}
