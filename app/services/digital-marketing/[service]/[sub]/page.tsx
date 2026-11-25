import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AutomationShell, Crumbs, Faq, HeroCopy, JsonLd, Reading, RichText } from '@/components/wv/automation'
import { Arrow } from '@/components/wv/ui'
import { SubHeroArt } from '@/components/wv/marketing/HeroArt'
import { MarketingCta } from '@/components/wv/marketing/Cta'
import { BASE, subParams, getService, getSubService } from '@/content/marketing'
import { subMetadata, subSchema } from '@/lib/marketing-seo'
import '../../marketing.css'

export const dynamicParams = true
export const generateStaticParams = subParams

type P = { params: Promise<{ service: string; sub: string }> }

export async function generateMetadata({ params }: P) {
  const { service, sub } = await params
  const s = getService(service)
  const p = getSubService(service, sub)
  return s && p ? subMetadata(s, p) : {}
}

export default async function Page({ params }: P) {
  const { service, sub } = await params
  const s = getService(service)
  const p = getSubService(service, sub)
  if (!s || !p) notFound()
  const waText = `Hi, I'm interested in ${p.name}`
  const path = `${BASE}/${s.slug}/${p.slug}`
  const siblings = s.subServices.filter((x) => x.slug !== p.slug)
  return (
    <AutomationShell>
      <JsonLd data={subSchema(s, p)} />
      <main className="mk-main wv-ax-glow">
        <section className="mk-hero">
          <div className="wv-wrap mk-hero-in">
            <div className="mk-hero-copy">
              <HeroCopy h1={[p.name]} sub={p.oneLiner} interest={p.name} waText={waText} />
            </div>
            <SubHeroArt service={s.slug} sub={p.slug} />
          </div>
        </section>

        <section className="mk-ans" aria-label={`What is ${p.name}?`}>
          <div className="wv-wrap">
            <h2 className="wv-h3">What is {p.name}?</h2>
            <p className="wv-ax-answer"><RichText text={p.answer} /></p>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="What you get">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">What you get</h2></div>
            <ul className="mk-deliver">
              {p.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="What this is not">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">What this is not</h2></div>
            <ul className="mk-exclude">
              {p.excludes.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="How it works">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">How it works</h2></div>
            <div className="mk-steps">
              {p.steps.map((step, i) => (
                <div className="mk-step" key={step.title}>
                  <b>0{i + 1}</b><h3>{step.title}</h3><p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="Outcome">
          <div className="wv-wrap mk-proof">
            <div className="mk-proof-logo"><b>{p.timeToLive}</b></div>
            <div>
              <blockquote>{p.kpi}</blockquote>
              <p>{p.oneLiner}</p>
              <Link href={`${BASE}/${s.slug}`} className="wv-btn wv-btn-ghost">Back to {s.name} <Arrow size={15} /></Link>
            </div>
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="mk-cards wv-sec" aria-label="More services">
            <div className="wv-wrap">
              <div className="wv-sec-head"><h2 className="wv-h2">More under {s.name}</h2></div>
              <div className="mk-card-grid is-sub">
                {siblings.map((x) => (
                  <article className="mk-card" key={x.slug}>
                    <h3><Link href={`${BASE}/${s.slug}/${x.slug}`}>{x.name}</Link></h3>
                    <p>{x.oneLiner}</p>
                    <ul className="mk-card-links">
                      <li><Link href={`${BASE}/${s.slug}/${x.slug}`}>See what is included <Arrow size={14} /></Link></li>
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Reading hrefs={p.reading} seed={p.slug.length} />
        <Faq faqs={p.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: BASE, href: BASE }, { label: s.name, href: `${BASE}/${s.slug}` }, { label: p.name, href: path }]} />
        <MarketingCta title={['Get my', `${p.name} plan`]} interest={p.name} source={`marketing/${s.slug}/${p.slug}`} waText={waText} />
      </main>
    </AutomationShell>
  )
}
