import type { Metadata } from 'next'
import { SITE_URL, ORGANIZATION_REF } from '@/config/site'
import { BASE, PILLAR, getService, getSubService } from '@/content/marketing'
import type { Faq, Service, SubService } from '@/content/marketing'
import { stripLinks } from '@/components/wv/automation/RichText'

const areServed = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Australia' },
]

function meta(title: string, description: string, path: string, keywords?: string[]): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: { title, description, url, type: 'website', siteName: 'Website Vikreta', locale: 'en_IN', images: ['/og-image.png'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

export const pillarMetadata = () => meta(PILLAR.title, PILLAR.description, BASE, PILLAR.keywords)
export const serviceMetadata = (s: Service) => meta(s.title, s.description, `${BASE}/${s.slug}`)
export const subMetadata = (s: Service, p: SubService) => meta(`${p.name} | ${s.name} | Website Vikreta`, p.answer, `${BASE}/${s.slug}/${p.slug}`)

const faqNode = (url: string, faqs: Faq[]) =>
  faqs.length === 0 ? [] : [{
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: stripLinks(f.a) } })),
  }]

const crumbNode = (url: string, crumbs: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
})

const serviceNode = (url: string, name: string, description: string, items: { name: string; oneLiner: string; url?: string }[]) => ({
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  serviceType: 'SEO, AEO and content systems',
  inLanguage: 'en-IN',
  description: stripLinks(description),
  url,
  provider: ORGANIZATION_REF,
  areaServed: areServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name,
    itemListElement: items.map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: item.name, description: item.oneLiner, ...(item.url ? { url: item.url } : {}) },
    })),
  },
})

const wrap = (...graph: object[]) => ({ '@context': 'https://schema.org', '@graph': graph })

export function pillarSchema() {
  const url = `${SITE_URL}${BASE}`
  return wrap(
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: PILLAR.title, isPartOf: { '@id': `${SITE_URL}#website` } },
    serviceNode(url, PILLAR.name, PILLAR.answer, getServiceItems()),
    crumbNode(url, [['Home', SITE_URL], ['SEO & GEO', url]]),
    ...faqNode(url, PILLAR.faqs),
  )
}

function getServiceItems() {
  return PILLAR.services.flatMap((slug) => {
    const s = getService(slug)
    if (!s) return []
    return [{ name: s.name, oneLiner: s.usp, url: `${SITE_URL}${BASE}/${s.slug}` }]
  })
}

export function serviceSchema(s: Service) {
  const url = `${SITE_URL}${BASE}/${s.slug}`
  return wrap(
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: s.title },
    serviceNode(url, s.name, s.answer, s.subServices.map((p) => ({ name: p.name, oneLiner: p.oneLiner, url: `${url}/${p.slug}` }))),
    crumbNode(url, [['Home', SITE_URL], ['SEO & GEO', `${SITE_URL}${BASE}`], [s.name, url]]),
    ...faqNode(url, s.faqs),
  )
}

export function subSchema(s: Service, p: SubService) {
  const url = `${SITE_URL}${BASE}/${s.slug}/${p.slug}`
  return wrap(
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${p.name} | ${s.name}` },
    serviceNode(url, p.name, p.answer, []),
    crumbNode(url, [['Home', SITE_URL], ['SEO & GEO', `${SITE_URL}${BASE}`], [s.name, `${SITE_URL}${BASE}/${s.slug}`], [p.name, url]]),
    ...faqNode(url, p.faqs),
  )
}

/** Resolves for a service/sub route; returns undefined for unknown slugs so the route can 404. */
export const resolveService = (slug: string) => getService(slug)
export const resolveSub = (service: string, slug: string) => getSubService(service, slug)
