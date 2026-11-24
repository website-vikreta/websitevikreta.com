import type { Metadata } from 'next'
import '@/app/wv.css'
import { CompanyWebsites } from '@/components/wv/web/CompanyWebsites'
import { wvFonts } from '@/components/wv/fonts'
import { ScrollProgress, Smooth } from '@/components/wv/ui'
import { ORGANIZATION_REF, SITE_URL } from '@/config/site'
import { FAQS, PATH } from '@/content/web/company-websites'

const URL = `${SITE_URL}${PATH}`
const TITLE = 'Company & Service Website Design and Development | Website Vikreta'
const DESCRIPTION =
  'Fast, SEO-ready company and service websites, built around how you sell. Easy to edit, quick to load, simple for customers to find. Get a free website audit.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website', siteName: 'Website Vikreta', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: 'Company & service website design and development',
      serviceType: 'Web design and development',
      description: DESCRIPTION,
      url: URL,
      provider: ORGANIZATION_REF,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: 'Web Design & Development', item: `${SITE_URL}/services/web-development` },
        { '@type': 'ListItem', position: 4, name: 'Company & service websites', item: URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${URL}#faq`,
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export default function Page() {
  return (
    <div className={`wv ${wvFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Smooth />
      <CompanyWebsites />
    </div>
  )
}
