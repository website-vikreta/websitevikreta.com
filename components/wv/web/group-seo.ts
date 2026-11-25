import type { Metadata } from 'next'
import { ORGANIZATION_REF, SITE_URL } from '@/config/site'
import type { Group } from '@/content/web/groups'

export function groupMetadata(g: Group): Metadata {
  const url = `${SITE_URL}${g.path}`
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: g.title, description: g.description, url, type: 'website', siteName: 'Website Vikreta', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description },
  }
}

export function groupJsonLd(g: Group) {
  const url = `${SITE_URL}${g.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': `${url}#service`, name: g.name, serviceType: 'Web design and development', description: g.description, url, provider: ORGANIZATION_REF },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: 'Web Design & Development', item: `${SITE_URL}/services/web-development` },
          { '@type': 'ListItem', position: 4, name: g.name, item: url },
        ],
      },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: g.c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }
}
