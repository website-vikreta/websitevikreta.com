import type { Metadata } from 'next'
import { SITE_URL, ORGANIZATION_REF } from '@/config/site'
import { BASE, BRANCHES, HUB, getBranch, pillarOf } from '@/content/ai'
import type { Pillar } from '@/content/ai'
import type { Branch, Faq, Product } from '@/content/ai/types'
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
export const pillarMetadata = (p: Pillar) => meta(p.title, p.description, `${BASE}/${p.slug}`)
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

const pillarCrumb = (branch: string): [string, string][] => {
  const pl = pillarOf(branch)
  return pl ? [[pl.name, `${SITE_URL}${BASE}/${pl.slug}`]] : []
}

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
    crumbNode(url, [['Home', SITE_URL], ['Applied AI', url]]),
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
    crumbNode(url, [['Home', SITE_URL], ['Applied AI', hub], ...pillarCrumb(b.slug), [b.name, url]]),
  )
}

export function productSchema(b: Branch, p: Product) {
  const hub = `${SITE_URL}${BASE}`
  const bUrl = `${hub}/${b.slug}`
  const url = `${bUrl}/${p.slug}`
  return wrap(
    serviceNode(url, p.name, p.page?.description ?? p.oneLiner, [p]),
    ...faqNode(url, p.page?.faqs ?? []),
    crumbNode(url, [['Home', SITE_URL], ['Applied AI', hub], ...pillarCrumb(b.slug), [b.name, bUrl], [p.name, url]]),
  )
}

export function pillarSchema(pl: Pillar) {
  const hub = `${SITE_URL}${BASE}`
  const url = `${hub}/${pl.slug}`
  const items = [
    ...pl.branches.flatMap((s) => { const b = getBranch(s); return b ? [{ name: b.name, description: b.usp, url: `${hub}/${b.slug}` }] : [] }),
    ...(pl.links ?? []).map((l) => ({ name: l.label, description: l.blurb, url: `${SITE_URL}${l.href}` })),
  ]
  return wrap(
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: pl.title,
      description: pl.description,
      inLanguage: 'en-US',
      publisher: ORGANIZATION_REF,
      mainEntity: { '@id': `${url}#services` },
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: pl.name,
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
    },
    ...faqNode(url, pl.faqs),
    crumbNode(url, [['Home', SITE_URL], ['Applied AI', hub], [pl.name, url]]),
  )
}
