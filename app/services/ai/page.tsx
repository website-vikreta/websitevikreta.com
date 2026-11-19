import Image from 'next/image'
import Link from 'next/link'
import { AutomationShell, CtaBlock, Faq, HubHero, JsonLd, Reading, stripLinks } from '@/components/wv/automation'
import { HubDesk } from '@/components/wv/automation/signatures'
import { CLIENT_LOGOS } from '@/components/wv/data'
import { Arrow, VelocityMarquee } from '@/components/wv/ui'
import { BASE, BLOG, BRANCHES, HUB, toolLogos } from '@/content/ai-automations'
import { hubMetadata, hubSchema } from '@/lib/ai-automations-seo'
import { CASE_STUDIES, WORK_TESTIMONIALS } from '@/lib/work-data'
import { Explorer, type ExplorerRow } from './Explorer'
import { Steps } from './Steps'
import { CostCalc } from './CostCalc'
import { WeekSlider } from './WeekSlider'
import './hub.css'

export const metadata = hubMetadata()

const CASE = CASE_STUDIES.find((c) => c.slug === 'simpli-home')!
const SBP = CASE_STUDIES.find((c) => c.slug === 'sustainable-bitcoin-protocol')!

// Real, named client words (from /work). Western clients first.
const QUOTES = [
  { quote: SBP.testimonial!.quote, name: 'Brad van Voorhees', role: 'Co-founder, Sustainable Bitcoin Protocol', image: undefined },
  ...['john-kim', 'sang-hyun-han'].map((slug) => {
    const w = WORK_TESTIMONIALS.find((x) => x.slug === slug)!
    return { quote: w.quote, name: w.name, role: [w.designation, w.company].filter(Boolean).join(', '), image: w.image }
  }),
]

const ROWS: ExplorerRow[] = HUB.problems.map((p) => {
  const b = BRANCHES.find((x) => x.slug === p.branch)!
  const s = b.scenarios[0]
  return {
    id: p.id,
    label: p.label,
    fix: p.fix,
    href: `${BASE}/${b.slug}`,
    name: b.name,
    products: b.products.filter((x) => x.page).map((x) => ({ name: x.name, href: `${BASE}/${b.slug}/${x.slug}` })),
    photo: s.photo,
    alt: s.alt,
    line: stripLinks(s.line),
    logos: toolLogos(b.tools.slice(0, 5)).map(({ src, alt }) => ({ src, alt })),
  }
})

function Head({ id, title }: { id: string; title: string | string[] }) {
  return (
    <div className="axh-head">
      <h2 id={id} className="axh-h2">{Array.isArray(title) ? title.map((t, i) => <span key={t}>{i > 0 && <br />}{t}</span>) : title}</h2>
    </div>
  )
}

export default function Page() {
  return (
    <AutomationShell>
      <JsonLd data={hubSchema(QUOTES)} />
      <main className="axh wv-ax-glow">
        <HubHero hub={HUB} />

        <div className="wv-wrap axh-logos" aria-label="Clients">
          <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
        </div>


        <section className="axh-sec" aria-labelledby="week-h">
          <div className="wv-wrap">
            <Head id="week-h" title="Your week, before and after" />
            <WeekSlider />
          </div>
        </section>

        <section className="axh-sec" id="services" aria-labelledby="services-h">
          <div className="wv-wrap">
            <Head id="services-h" title="Where your week goes" />
            <Explorer rows={ROWS} />
          </div>
        </section>

        <section className="axh-sec axh-cost" aria-labelledby="cost-h">
          <div className="wv-wrap">
            <Head id="cost-h" title="What busywork costs you" />
            <CostCalc />
          </div>
        </section>
        {/* real case study */}
        <section className="axh-sec axh-case" aria-labelledby="case-h">
          <div className="wv-wrap axh-case-in">
            <figure className="axh-case-shot">
              <Image src="/services/web-development/proof/simpli-home.webp" alt="Simpli Home's online furniture store" fill sizes="(min-width:960px) 55vw, 100vw" />
            </figure>
            <div className="axh-case-tx">
              {/* eslint-disable-next-line @next/next/no-img-element -- svg client mark */}
              <img src={CASE.logo} alt="Simpli Home" className="axh-case-logo" width={140} height={28} />
              <h2 id="case-h" className="axh-h2">{CASE.metric!.value} a week back for the media team</h2>
              <p className="axh-lead">{CASE.excerpt}</p>
              <blockquote className="axh-case-q">
                <p>&ldquo;{CASE.testimonial!.quote}&rdquo;</p>
                <footer>{CASE.testimonial!.role}</footer>
              </blockquote>
              <Link href={`/work/${CASE.slug}`} className="wv-link">Read the case study <Arrow size={14} /></Link>
            </div>
          </div>
        </section>

        <HubDesk />

        {/* named client words */}
        <section className="axh-sec" aria-labelledby="quotes-h">
          <div className="wv-wrap">
            <Head id="quotes-h" title={["What clients say", "about working with us"]} />
            <ul className="axh-quotes">
              {QUOTES.map((q) => (
                <li key={q.name}>
                  <blockquote>
                    <p>&ldquo;{q.quote}&rdquo;</p>
                    <footer>
                      {q.image ? (
                        <Image src={q.image} alt="" width={44} height={44} className="axh-q-av" />
                      ) : (
                        <span className="axh-q-av is-ini" aria-hidden>{q.name[0]}</span>
                      )}
                      <span><b>{q.name}</b>{q.role}</span>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="axh-sec" aria-labelledby="how-h">
          <div className="wv-wrap">
            <Head id="how-h" title="How it works" />
            <Steps steps={HUB.steps} />
          </div>
        </section>

        <Faq faqs={HUB.faqs} updated={HUB.updated} />
        <Reading seed={0} hrefs={BLOG.slice(0, 3).map((x) => x.href)} title={['Read before', 'you call']} />
        <CtaBlock title={['Get my', 'automation plan']} interest="AI automation plan" source="ai-automations-hub" waText="Hi, I'd like an AI automation plan" />
      </main>
    </AutomationShell>
  )
}
