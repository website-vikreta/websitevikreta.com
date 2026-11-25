'use client'

import { TOOL_LOGOS } from '@/content/ai/logos'
import { getService, getSubService } from '@/content/marketing'
import { useClock } from '../automation/heroes/HubHero'
import { FLOWS, type FlowSlug } from './FlowScenes'
import { VisibilityBoard } from './VisibilityBoard'

/** Hero art for the rebuilt SEO & GEO section. One clock, final frame on SSR and
 * reduced motion, pauses offscreen and in hidden tabs — same behaviour as the
 * Applied AI pillar arts. Every label comes from the real service content. */

const END = 9000
const START = 700
const on = (t: number, at: number) => t >= at

function Mark({ k, s = 13 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- tiny third-party brand logo, images are unoptimized
  return l ? <img src={l.src} alt={l.name} width={s} height={s} style={{ width: s, height: s }} /> : null
}

function Brand({ left, right }: { left: string; right: string }) {
  return (
    <div className="mk-top">
      <span className="mk-brand"><b>{left}</b> <i>·</i> {right}</span>
      <span className="mk-live"><i />live board</span>
    </div>
  )
}

/** Self-contained clock for the flow visual inside a service card. */
export function CardFlow({ slug }: { slug: string }) {
  const { ref, t } = useClock(7000, 2600, 500)
  const Flow = FLOWS[slug as FlowSlug]
  if (!Flow) return null
  return (
    <section className="mk-panel mk-card-art" ref={ref} aria-hidden>
      <Flow t={t} />
    </section>
  )
}

export function MarketingHeroArt() {
  return <VisibilityBoard />
}

export function ServiceHeroArt({ slug }: { slug: string }) {
  const { ref, t } = useClock(END, 3600, START)
  const s = getService(slug)
  const Flow = FLOWS[slug as FlowSlug]
  if (!s || !Flow) return null
  return (
    <section className="mk-stage" ref={ref} aria-hidden>
      <div className="mk-board is-service">
        <Brand left={s.name} right="one of three connected services" />
        <div className="mk-grid is-single">
          <div className="mk-panel is-wide"><Flow t={t} /></div>
        </div>
        <div className="mk-scope">
          {s.industries.map((industry, i) => (
            <span key={industry} className={`mk-scope-chip${on(t, 2200 + i * 450) ? ' is-on' : ''}`}>{industry}</span>
          ))}
        </div>
        <div className="mk-foot">
          <span>{s.usp}</span>
          <span className="mk-foot-tools">{s.tools.slice(0, 4).map((k) => <Mark key={k} k={k} s={13} />)}</span>
        </div>
      </div>
      <p className="wv-sr">{s.lead} {s.answer}</p>
    </section>
  )
}

export function SubHeroArt({ service, sub }: { service: string; sub: string }) {
  const { ref, t } = useClock(END, 3600, START)
  const s = getService(service)
  const p = getSubService(service, sub)
  const Flow = FLOWS[service as FlowSlug]
  if (!s || !p || !Flow) return null
  return (
    <section className="mk-stage" ref={ref} aria-hidden>
      <div className="mk-board is-service">
        <Brand left={p.name} right={s.name} />
        <div className="mk-subline">{p.oneLiner}</div>
        <div className="mk-grid is-single">
          <div className="mk-panel is-wide"><Flow t={t} /></div>
        </div>
        <div className="mk-scope">
          {p.steps.slice(0, 3).map((step, i) => (
            <span key={step.title} className={`mk-scope-chip${on(t, 2000 + i * 500) ? ' is-on' : ''}`}>{step.title}</span>
          ))}
        </div>
        <div className="mk-foot"><span>{p.timeToLive}</span><span className="mk-foot-tools"><Mark k="google" s={13} /><Mark k="googlesheets" s={13} /></span></div>
      </div>
      <p className="wv-sr">{p.answer}</p>
    </section>
  )
}
