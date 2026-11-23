import Link from 'next/link'
import { AutomationShell, Crumbs, CtaBlock, Faq, HeroCopy, JsonLd, Reading, RichText } from '@/components/wv/automation'
import ConversationalAiHeroArt from '@/components/wv/automation/ConversationalAiHeroArt'
import { Arrow, VelocityMarquee } from '@/components/wv/ui'
import { CLIENT_LOGOS } from '@/components/wv/data'
import { BASE, getBranch, type Pillar } from '@/content/ai'
import { pillarSchema, showPlaceholders } from '@/lib/ai-automations-seo'
import './pillar.css'

const TRUST_ITEMS = [
  { label: 'Voice agents', text: 'Calls answered, leads booked, CRM updated — 24/7.' },
  { label: 'WhatsApp & chat', text: 'Leads get a reply in seconds, qualify and book.' },
  { label: 'Conversational commerce', text: 'Shoppers ask, pick and pay — all in the chat.' },
]

export function PillarPage({ 
  pillar: pl, 
  rated = false 
}: { pillar: Pillar; rated?: boolean }) {
  const branches = pl.branches.flatMap((s) => getBranch(s) ?? [])
  const wa = `Hi, I'm interested in ${pl.name}`
  return (
    <AutomationShell>
      <JsonLd data={pillarSchema(pl)} />
      <main className="wv-axp-main wv-ax-glow">
        <section className="axpl-hero">
          <div className="wv-wrap axpl-hero-in">
            <div className="axpl-hero-copy">
              <HeroCopy h1={pl.h1} sub={pl.lead} interest={pl.name} waText={wa} rated={rated} />
            </div>
            <ConversationalAiHeroArt />
          </div>
        </section>
        <section className="axpl-ans" aria-label={pl.answerQ}>
          <div className="wv-wrap">
            <h2 className="wv-h3">{pl.answerQ}</h2>
            <p className="wv-ax-answer"><RichText text={pl.answer} /></p>
          </div>
        </section>
        <section className="axpl-trust" aria-label="Channels">
          <div className="wv-wrap axpl-trust-in">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="axpl-trust-item">
                <span className="axpl-trust-check">✓</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="wv-sec wv-ax-sec">
          <div className="wv-wrap axpl-grid">
            {branches.map((b) => {
              const kpi = b.stats.find((s) => s.source || (s.placeholder && showPlaceholders()))
              return (
                <article key={b.slug} className="axpl-card">
                  <h3><Link href={`${BASE}/${b.slug}`}><span className="axpl-roll" data-text={b.name}>{b.name}</span></Link></h3>
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
                <h3><Link href={l.href}><span className="axpl-roll" data-text={l.label}>{l.label}</span></Link></h3>
                <p>{l.blurb}</p>
                <Link href={l.href} className="wv-btn wv-btn-y">See SEO &amp; GEO <Arrow size={15} /></Link>
              </article>
            ))}
          </div>
        </section>
        <div className="wv-wrap axpl-logos" aria-label="Clients">
          <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
        </div>
        <Reading hrefs={pl.reading} seed={pl.slug.length} />
        <Faq faqs={pl.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Applied AI', href: BASE }, { label: pl.name, href: `${BASE}/${pl.slug}` }]} />
        <CtaBlock title={['Get my', pl.name, 'plan']} interest={pl.name} source={`ai-automations/${pl.slug}`} waText={wa} />
      </main>
    </AutomationShell>
  )
}
