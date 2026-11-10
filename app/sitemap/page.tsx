import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/wv.css'
import { wvFonts } from '@/components/wv/fonts'
import { BLOG_SEARCH_PATH } from '@/lib/blog-search-params'
import { SITE_URL } from '@/config/site'
import { CASE_STUDIES } from '@/lib/work-data'
import { BRANCHES, BASE as AI } from '@/content/ai-automations'

const title = 'Sitemap | Website Vikreta'
const description = 'Every page on Website Vikreta in one place: services, AI automations, work, company, blog and legal.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/sitemap` },
  openGraph: { title, description, url: `${SITE_URL}/sitemap`, siteName: 'Website Vikreta', type: 'website' },
}

type Node = { t: string; href: string; link?: boolean; children?: Node[] }
// Code-defined routes only. CMS entries (posts, tags, labels, authors, openings) are
// reached through their hub pages and listed in /sitemap.xml, not here.
const TREE: Node = {
  t: 'Home',
  href: '/',
  children: [
    {
      t: 'Services',
      href: '/services',
      link: false,
      children: [
        {
          t: 'AI Automations',
          href: AI,
          children: BRANCHES.map((b) => ({
            t: b.navLabel,
            href: `${AI}/${b.slug}`,
            children: b.products.filter((p) => p.page).map((p) => ({ t: p.name, href: `${AI}/${b.slug}/${p.slug}` })),
          })),
        },
        { t: 'Web Development', href: '/services/web-development' },
        { t: 'Web & Mobile Apps', href: '/services/web-mobile-app-development' },
        { t: 'UI/UX Design', href: '/services/uiux-design' },
        { t: 'Digital Marketing', href: '/services/digital-marketing' },
      ],
    },
    {
      t: 'Work',
      href: '/work',
      children: [
        { t: 'Case studies', href: '/work/case-studies' },
        ...CASE_STUDIES.map((c) => ({ t: c.company, href: `/work/${c.slug}` })),
      ],
    },
    { t: 'About', href: '/about' },
    { t: 'Careers', href: '/careers' },
    { t: 'Contact', href: '/contact' },
    { t: 'FAQ', href: '/faq' },
    {
      t: 'Blog',
      href: '/blog',
      children: [
        { t: 'Search', href: BLOG_SEARCH_PATH },
        { t: 'Categories', href: '/blog/categories' },
        { t: 'Tags', href: '/blog/tags' },
        { t: 'Labels', href: '/blog/labels' },
        { t: 'Authors', href: '/blog/authors' },
      ],
    },
    { t: 'Search', href: '/search' },
    {
      t: 'Legal',
      href: '/legal',
      link: false,
      children: [
        { t: 'Privacy Policy', href: '/legal/privacy-policy' },
        { t: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
        { t: 'Disclaimer', href: '/legal/disclaimer' },
      ],
    },
    { t: 'Sitemap', href: '/sitemap' },
  ],
}

/** Native <details>: collapsible with no JS, every branch open by default. */
function Branch({ n }: { n: Node }) {
  const row =
    n.link === false ? (
      <span className="wv-tree-row">
        {n.t} <small>{n.href}</small>
      </span>
    ) : (
      <Link href={n.href} className="wv-tree-row" title={n.href}>
        {n.t} <small>{n.href}</small>
      </Link>
    )
  if (!n.children?.length) return <li className="wv-tree-leaf">{row}</li>
  return (
    <li>
      <details open>
        <summary>{row}</summary>
        <ul>
          {n.children.map((c) => (
            <Branch key={c.href} n={c} />
          ))}
        </ul>
      </details>
    </li>
  )
}

export default function SitemapPage() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <section className="wv-page wv-smap-hero">
        <div className="wv-grid-bg" aria-hidden />
        <div className="wv-wrap">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Sitemap</span>
          </nav>
          <h1 className="wv-h1 wv-page-h1">Sitemap</h1>
          <p className="wv-page-lead">Every page on the site, laid out like the folders behind it.</p>
        </div>
      </section>

      <div className="wv-wrap wv-smap">
        <ul className="wv-tree">
          <Branch n={TREE} />
        </ul>
      </div>
    </div>
  )
}
