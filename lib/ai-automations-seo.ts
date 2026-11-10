import type { Metadata } from 'next'
import { SITE_URL, ORGANIZATION_REF } from '@/config/site'
import { BASE, BRANCHES, HUB } from '@/content/ai-automations'
import type { Branch, Faq, Product } from '@/content/ai-automations/types'
import { stripLinks } from '@/components/wv/automation/RichText'

// Western markets first (primary ICP), then the rest of the world we already serve.
const AREAS = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India'].map((name) => ({ '@type': 'Country', name }))
const areaServed = AREAS

/** Placeholder content shows everywhere except production, so the owner can spot what to fill. */
export const showPlaceholders = () => process.env.VERCEL_ENV !== 'production'

function meta(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: 'website', siteName: 'Website Vikreta', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export const hubMetadata = () => meta(HUB.title, HUB.description, BASE)
export const branchMetadata = (b: Branch) => meta(b.title, b.description, `${BASE}/${b.slug}`)
export const productMetadata = (b: Branch, p: Product) =>
  meta(p.page?.title ?? p.name, p.page?.description ?? p.oneLiner, `${BASE}/${b.slug}/${p.slug}`)

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

const catalog = (name: string, products: Product[], branch?: string) => ({
  '@type': 'OfferCatalog',
  name,
  itemListElement: products.map((p) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: p.name,
      description: p.oneLiner,
      ...(branch && p.page ? { url: `${SITE_URL}${BASE}/${branch}/${p.slug}` } : {}),
    },
  })),
})

const serviceNode = (url: string, name: string, description: string, products: Product[], branch?: string) => ({
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  serviceType: 'AI automation',
  inLanguage: 'en-US',
  audience: { '@type': 'BusinessAudience', audienceType: 'Small and mid-sized businesses' },
  description,
  url,
  provider: ORGANIZATION_REF,
  areaServed,
  hasOfferCatalog: catalog(name, products, branch),
})

const wrap = (...graph: object[]) => ({ '@context': 'https://schema.org', '@graph': graph })

export type Quote = { quote: string; name: string; role: string }

export function hubSchema(quotes: Quote[] = []) {
  const url = `${SITE_URL}${BASE}`
  return wrap(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: HUB.title,
      description: HUB.description,
      inLanguage: 'en-US',
      dateModified: HUB.updated,
      about: { '@id': `${url}#service` },
      publisher: ORGANIZATION_REF,
    },
    serviceNode(url, 'AI Automation Services', HUB.description, BRANCHES.flatMap((b) => b.products)),
    // Real, named client quotes shown on the page. Self-serving reviews earn no stars in Google; this is context for other engines.
    ...quotes.map((q, i) => ({
      '@type': 'Review',
      '@id': `${url}#review-${i + 1}`,
      itemReviewed: ORGANIZATION_REF,
      reviewBody: q.quote,
      author: { '@type': 'Person', name: q.name, jobTitle: q.role },
    })),
    {
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: 'AI automation services',
      itemListElement: BRANCHES.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, description: b.usp, url: `${url}/${b.slug}` })),
    },
    ...faqNode(url, HUB.faqs),
    crumbNode(url, [['Home', SITE_URL], ['AI Automations', url]]),
  )
}

export function branchSchema(b: Branch) {
  const hub = `${SITE_URL}${BASE}`
  const url = `${hub}/${b.slug}`
  return wrap(
    serviceNode(url, b.name, b.description, b.products, b.slug),
    {
      '@type': 'ItemList',
      '@id': `${url}#products`,
      name: `${b.name} services`,
      itemListElement: b.products.filter((p) => p.page).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${url}/${p.slug}` })),
    },
    ...faqNode(url, b.faqs),
    crumbNode(url, [['Home', SITE_URL], ['AI Automations', hub], [b.name, url]]),
  )
}

export function productSchema(b: Branch, p: Product) {
  const hub = `${SITE_URL}${BASE}`
  const bUrl = `${hub}/${b.slug}`
  const url = `${bUrl}/${p.slug}`
  return wrap(
    serviceNode(url, p.name, p.page?.description ?? p.oneLiner, [p]),
    ...faqNode(url, p.page?.faqs ?? []),
    crumbNode(url, [['Home', SITE_URL], ['AI Automations', hub], [b.name, bUrl], [p.name, url]]),
  )
}
