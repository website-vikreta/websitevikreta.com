import type { Metadata } from 'next'
import '@/app/wv.css'
import { LeafPage } from '@/components/wv/web/LeafPage'
import { wvFonts } from '@/components/wv/fonts'
import { ScrollProgress, Smooth } from '@/components/wv/ui'
import { ORGANIZATION_REF, SITE_URL } from '@/config/site'
import { UX_AUDIT, FAQS, PATH } from '@/content/uiux/ux-audit'

const URL = `${SITE_URL}${PATH}`
const TITLE = 'UX Audit: Find Where Visitors Get Stuck | Website Vikreta'
const DESCRIPTION =
  'A clear UX audit of your site or app: where visitors get stuck, why it costs you, and a ranked list of what to fix first. Get a free UX audit.'

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
      name: 'UX audit',
      serviceType: 'UX design',
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
        { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${SITE_URL}/services/uiux-design` },
        { '@type': 'ListItem', position: 4, name: 'UX audit', item: URL },
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
      <LeafPage c={UX_AUDIT} />
    </div>
  )
}
