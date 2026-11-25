import Link from 'next/link'
import '@/app/wv.css'
import { wvFonts } from '@/components/wv/fonts'

interface Section {
  heading: string
  content: string | string[]
}

export interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

export function LegalPageLayout({ title, lastUpdated, sections }: LegalPageLayoutProps) {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <section className="wv-page wv-legal-hero">
        <div className="wv-grid-bg" aria-hidden />
        <div className="wv-wrap">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Legal</span>
          </nav>
          <h1 className="wv-h1 wv-page-h1">{title}</h1>
          <p className="wv-page-lead">
            Last updated: <time>{lastUpdated}</time>
          </p>
        </div>
      </section>

      <div className="wv-wrap wv-legal">
        {sections.map((s, i) => (
          <section key={i} className="wv-legal-sec">
            <h2>{s.heading}</h2>
            {Array.isArray(s.content) ? (
              <ul>
                {s.content.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{s.content}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
