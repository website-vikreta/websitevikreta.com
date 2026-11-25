import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/wv.css'
import { wvFonts } from '@/components/wv/fonts'
import { FaqToggleTracker } from './FaqToggleTracker'
import { ALL_FAQS, FAQ_GROUPS, faqPageJsonLd } from '@/lib/faq-data'
import { SITE_URL } from '@/config/site'

export const metadata: Metadata = {
  title: 'FAQ | AI, Websites, Apps, SEO | Website Vikreta',
  description: 'Answers on AI automation, websites, apps, UI/UX and SEO: pricing, timelines, who owns the work and what happens after launch. Plain answers, no jargon.',
  keywords: [
    'AI automation FAQ',
    'web development FAQ',
    'Next.js development questions',
    'website pricing India',
    'AI workflow automation FAQ',
    'CRM automation FAQ',
    'Website Vikreta FAQ',
  ],
  openGraph: {
    title: 'FAQ | AI Automation, Websites, Apps and SEO | Website Vikreta',
    description: 'Answers on AI automation, websites, apps, UI/UX and SEO: pricing, timelines, who owns the work and what happens after launch. Plain answers, no jargon.',
    url: `${SITE_URL}/faq`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Website Vikreta FAQ | AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | AI Automation, Websites, Apps and SEO | Website Vikreta',
    description: 'Answers on AI automation, websites, apps, UI/UX and SEO: pricing, timelines, who owns the work and what happens after launch. Plain answers, no jargon.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/faq`,
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
  ],
}

const json = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c')

export default function FAQPage() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(faqPageJsonLd(ALL_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(breadcrumbJsonLd) }} />

      <section className="wv-page wv-faq-hero">
        <div className="wv-grid-bg" aria-hidden />
        <div className="wv-wrap">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>FAQ</span>
          </nav>
          <h1 className="wv-h1 wv-page-h1">Questions, answered</h1>
          <p className="wv-page-lead">
            What things cost, how long they take, who owns the work and what happens after launch.
          </p>
        </div>
      </section>

      <nav className="wv-faq-nav" aria-label="FAQ categories">
        <ul className="wv-wrap">
          {FAQ_GROUPS.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`}>{g.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wv-wrap wv-faq" id="faq-list">
        {FAQ_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="wv-faq-sec" aria-labelledby={`${g.id}-h`}>
            <h2 id={`${g.id}-h`}>{g.title}</h2>
            {g.items.map((f) => (
              <details key={f.id} className="wv-faq-item">
                <summary>
                  <h3>{f.question}</h3>
                  <span className="wv-plus" aria-hidden />
                </summary>
                <div className="wv-faq-a">
                  <p>{f.answer}</p>
                  {f.href && (
                    <Link href={f.href} className="wv-link">
                      Read more
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </section>
        ))}
      </div>

      <section className="wv-faq-cta">
        <div className="wv-wrap">
          <h2>Still have a question?</h2>
          <p>Tell us what is slowing the business down. A 20-minute call is enough to know if we fit.</p>
          <Link href="/contact" className="wv-btn wv-btn-y">
            Book a call
          </Link>
        </div>
      </section>

      <FaqToggleTracker rootId="faq-list" />
    </div>
  )
}
