import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AutomationShell, Crumbs, Faq, HeroCopy, JsonLd, Reading, RichText } from '@/components/wv/automation'
import { Arrow, VelocityMarquee } from '@/components/wv/ui'
import { CLIENT_LOGOS } from '@/components/wv/data'
import { ServiceHeroArt } from '@/components/wv/marketing/HeroArt'
import { MarketingCta } from '@/components/wv/marketing/Cta'
import { BASE, serviceParams, getService } from '@/content/marketing'
import { serviceMetadata, serviceSchema } from '@/lib/marketing-seo'
import '../marketing.css'

export const dynamicParams = true
export const generateStaticParams = serviceParams

type P = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: P) {
  const s = getService((await params).service)
  return s ? serviceMetadata(s) : {}
}

export default async function Page({ params }: P) {
  const s = getService((await params).service)
  if (!s) notFound()
  const waText = `Hi, I'm interested in ${s.name}`
  return (
    <AutomationShell>
      <JsonLd data={serviceSchema(s)} />
      <main className="mk-main wv-ax-glow">
        <section className="mk-hero">
          <div className="wv-wrap mk-hero-in">
            <div className="mk-hero-copy">
              <HeroCopy h1={s.h1} sub={s.lead} interest={s.name} waText={waText} />
            </div>
            <ServiceHeroArt slug={s.slug} />
          </div>
        </section>

        <section className="mk-ans" aria-label={s.answerQ}>
          <div className="wv-wrap">
            <h2 className="wv-h3">{s.answerQ}</h2>
            <p className="wv-ax-answer"><RichText text={s.answer} /></p>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="How it runs">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">How it runs</h2></div>
            <div className="mk-steps">
              {s.steps.map((step, i) => (
                <div className="mk-step" key={step.title}>
                  <b>0{i + 1}</b><h3>{step.title}</h3><p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-cards wv-sec" aria-label="Sub-services">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">What we do</h2></div>
            <div className="mk-card-grid is-sub">
              {s.subServices.map((p) => (
                <article className="mk-card" key={p.slug}>
                  <h3><Link href={`${BASE}/${s.slug}/${p.slug}`}>{p.name}</Link></h3>
                  <p>{p.oneLiner}</p>
                  <p>{p.kpi}</p>
                  <ul className="mk-card-links">
                    <li><Link href={`${BASE}/${s.slug}/${p.slug}`}>See what is included <Arrow size={14} /></Link></li>
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wv-sec wv-ax-sec" aria-label="Who this is for">
          <div className="wv-wrap">
            <div className="wv-sec-head"><h2 className="wv-h2">Who this is for</h2></div>
            <div className="mk-scope-list">
              {s.industries.map((i) => <div className="mk-scope-item" key={i}>{i}</div>)}
            </div>
          </div>
        </section>

        <div className="wv-wrap mk-logos" aria-label="Tools">
          <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
        </div>

        <Reading hrefs={s.reading} seed={s.slug.length} />
        <Faq faqs={s.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: BASE, href: BASE }, { label: s.name, href: `${BASE}/${s.slug}` }]} />
        <MarketingCta title={['Get my', `${s.navLabel} plan`]} interest={s.name} source={`marketing/${s.slug}`} waText={waText} />
      </main>
    </AutomationShell>
  )
}
