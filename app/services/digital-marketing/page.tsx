import Link from 'next/link'
import { AutomationShell, Crumbs, Faq, HeroCopy, JsonLd, Reading, RichText } from '@/components/wv/automation'
import { Arrow, VelocityMarquee } from '@/components/wv/ui'
import { CLIENT_LOGOS } from '@/components/wv/data'
import { CardFlow, MarketingHeroArt } from '@/components/wv/marketing/HeroArt'
import { MarketingCta } from '@/components/wv/marketing/Cta'
import { ProcessTrack } from '@/components/wv/marketing/ProcessTrack'
import { BASE, PILLAR, getService } from '@/content/marketing'
import { pillarMetadata, pillarSchema } from '@/lib/marketing-seo'
import './marketing.css'

export const metadata = pillarMetadata()

const waText = "Hi, I'm interested in SEO and AI search visibility"

export default function Page() {
  const services = PILLAR.services.flatMap((slug) => getService(slug) ?? [])
  return (
    <AutomationShell>
      <JsonLd data={pillarSchema()} />
      <main className="mk-main wv-ax-glow">
        <section className="mk-hero">
          <div className="wv-wrap mk-hero-in">
            <div className="mk-hero-copy">
              <HeroCopy h1={PILLAR.h1} sub={PILLAR.lead} interest={PILLAR.name} waText={waText} />
            </div>
            <MarketingHeroArt />
          </div>
        </section>

        <section className="mk-ans" aria-label={PILLAR.answerQ}>
          <div className="wv-wrap">
            <h2 className="wv-h3">{PILLAR.answerQ}</h2>
            <p className="wv-ax-answer"><RichText text={PILLAR.answer} /></p>
          </div>
        </section>

        <section className="mk-trust" aria-label="What we cover">
          <div className="wv-wrap mk-trust-in">
            {services.map((s) => (
              <div key={s.slug} className="mk-trust-item">
                <span className="mk-trust-check">✓</span>
                <div><strong>{s.name}</strong><p>{s.usp}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mk-cards wv-sec" aria-label="Services">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">Three systems, one team</h2></div>
            <div className="mk-card-grid">
              {services.map((s) => (
                <article key={s.slug} className="mk-card">
                  <CardFlow slug={s.slug} />
                  <h3><Link href={`${BASE}/${s.slug}`}>{s.name}</Link></h3>
                  <p>{s.lead}</p>
                  <ul className="mk-card-links">
                    {s.subServices.map((p) => (
                      <li key={p.slug}>
                        <Link href={`${BASE}/${s.slug}/${p.slug}`}>{p.name} <Arrow size={14} /></Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessTrack />

        <section className="wv-sec wv-ax-sec" aria-label="Proof">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">Where this has worked</h2></div>
            <div className="mk-proof">
              <div className="mk-proof-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- third-party svg logo */}
                <img src="/client-logos/ap-cleanco.svg" alt="AP Cleanco logo" />
              </div>
              <div>
                <blockquote>“Fastest turnaround we had. Quality was better than agencies charging 5x.”</blockquote>
                <b>AP Cleanco</b>
                <small>Co-founder · 2 weeks concept to launch</small>
                <Link href="/work/ap-cleanco" className="wv-btn wv-btn-ghost">Read case study <Arrow size={15} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mk-logos" aria-label="Clients">
          <div className="wv-wrap">
            <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
          </div>
        </section>

        <Reading hrefs={PILLAR.reading} seed={PILLAR.slug.length} />
        <Faq faqs={PILLAR.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: PILLAR.name, href: BASE }]} />
        <MarketingCta title={['Get my', 'growth plan']} interest={PILLAR.name} source={`marketing/${PILLAR.slug}`} waText={waText} />
      </main>
    </AutomationShell>
  )
}
