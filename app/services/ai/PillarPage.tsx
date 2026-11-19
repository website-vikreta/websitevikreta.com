import Link from 'next/link'
import { AutomationShell, Crumbs, CtaBlock, Faq, HeroCopy, JsonLd, ProofBar, Reading, RichText } from '@/components/wv/automation'
import { Arrow } from '@/components/wv/ui'
import { BASE, getBranch, type Pillar } from '@/content/ai'
import { pillarSchema, showPlaceholders } from '@/lib/ai-automations-seo'
import './pillar.css'

export function PillarPage({ pillar: pl }: { pillar: Pillar }) {
  const branches = pl.branches.flatMap((s) => getBranch(s) ?? [])
  const clients = [...new Set((branches.length ? branches : [getBranch('content-automation')!]).flatMap((b) => b.clients))]
  const wa = `Hi, I'm interested in ${pl.name}`
  return (
    <AutomationShell>
      <JsonLd data={pillarSchema(pl)} />
      <main className="wv-axp-main wv-ax-glow">
        <section className="axpl-hero">
          <div className="wv-wrap">
            <HeroCopy h1={pl.h1} sub={pl.lead} interest={pl.name} waText={wa} />
          </div>
        </section>
        <section className="axpl-ans" aria-label={pl.answerQ}>
          <div className="wv-wrap">
            <h2 className="wv-h3">{pl.answerQ}</h2>
            <p className="wv-ax-answer"><RichText text={pl.answer} /></p>
          </div>
        </section>
        <section className="wv-sec wv-ax-sec">
          <div className="wv-wrap axpl-grid">
            {branches.map((b) => {
              const kpi = b.stats.find((s) => s.source || (s.placeholder && showPlaceholders()))
              return (
                <article key={b.slug} className="axpl-card">
                  <h3><Link href={`${BASE}/${b.slug}`}>{b.name}</Link></h3>
                  <p>{b.usp}</p>
                  {kpi && <p className="axpl-kpi"><b>{kpi.value}</b><span>{kpi.label}</span></p>}
                  <ul className="axpl-ul">
                    {b.products.filter((p) => p.page).map((p) => (
                      <li key={p.slug}><Link href={`${BASE}/${b.slug}/${p.slug}`}>{p.name} <Arrow size={14} /></Link></li>
                    ))}
                  </ul>
                </article>
              )
            })}
            {pl.links?.map((l) => (
              <article key={l.href} className="axpl-card">
                <h3><Link href={l.href}>{l.label}</Link></h3>
                <p>{l.blurb}</p>
                <Link href={l.href} className="wv-btn wv-btn-y">See SEO &amp; GEO <Arrow size={15} /></Link>
              </article>
            ))}
          </div>
        </section>
        <ProofBar clients={clients} />
        <Reading seed={pl.slug.length} />
        <Faq faqs={pl.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Applied AI', href: BASE }, { label: pl.name, href: `${BASE}/${pl.slug}` }]} />
        <CtaBlock title={['Get my', pl.name, 'plan']} interest={pl.name} source={`ai-automations/${pl.slug}`} waText={wa} />
      </main>
    </AutomationShell>
  )
}
