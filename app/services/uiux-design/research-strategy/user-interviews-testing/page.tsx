import type { Metadata } from 'next'
import '@/app/wv.css'
import { LeafPage } from '@/components/wv/web/LeafPage'
import { wvFonts } from '@/components/wv/fonts'
import { ScrollProgress, Smooth } from '@/components/wv/ui'
import { ORGANIZATION_REF, SITE_URL } from '@/config/site'
import { USER_TESTING, FAQS, PATH } from '@/content/uiux/user-interviews-testing'

const URL = `${SITE_URL}${PATH}`
const TITLE = 'User Interviews and Usability Testing | Website Vikreta'
const DESCRIPTION =
  'Short interviews and usability tests with the people who use your product. See where they struggle, in their own words, and get a ranked list of what to change.'

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
      name: 'User interviews and usability testing',
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
        { '@type': 'ListItem', position: 4, name: 'User interviews and usability testing', item: URL },
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
      <LeafPage c={USER_TESTING} />
    </div>
  )
}
