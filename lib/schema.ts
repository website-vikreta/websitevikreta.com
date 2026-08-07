import { SITE_URL } from '@/config/site'

interface BreadcrumbItem {
  name: string
  url?: string
}

/** BreadcrumbList node (no @context) — embed inside a page's @graph, or spread with '@context': 'https://schema.org' for a standalone script. `url` omitted on an item (e.g. the current page) per Google's breadcrumb spec. */
export function breadcrumbListNode(id: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

/** Reference to the one Organization entity defined on the homepage (app/page.tsx). */
export const ORGANIZATION_REF = { '@id': `${SITE_URL}/#organization` }
