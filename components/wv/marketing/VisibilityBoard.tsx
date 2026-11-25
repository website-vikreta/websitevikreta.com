'use client'

import { TOOL_LOGOS } from '@/content/ai/logos'
import { useClock } from '../automation/heroes/HubHero'

/** The pillar hero visual: one buyer question, three visible flows, three outcomes.
 * Every node has a visible resting state, so the board never looks empty while the
 * clock loops — unlike a row of elements that all start at opacity zero.
 * SSR and reduced-motion render the finished board. */

const END = 5600
const START = 200
const GAP = 420

const LANES = [
  { n: '01', label: 'SEO FOUNDATIONS', out: 'FOUND', at: 400, steps: ['crawl', 'fix templates', 'Google result'], logo: 'google' },
  { n: '02', label: 'AEO & GEO', out: 'CITED', at: 1600, steps: ['buyer prompt', '3 answer engines', 'citation'], logo: 'openai' },
  { n: '03', label: 'CONTENT SYSTEMS', out: 'COMPOUND', at: 2800, steps: ['research', 'publish', 'internal links'], logo: 'wordpress' },
] as const

function Mark({ k, s = 14 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- tiny third-party brand logo
  return l ? <img src={l.src} alt={l.name} width={s} height={s} style={{ width: s, height: s }} /> : <i className="vdb-letter">{k.slice(0, 1).toUpperCase()}</i>
}

export function VisibilityBoard() {
  const { ref, t } = useClock(END, 4800, START)
  return (
    <section className="vdb" ref={ref} aria-hidden>
      <div className="vdb-top">
        <span className="vdb-brand"><b>VISIBILITY DESK</b><i>/</i>one question, three systems</span>
        <span className="vdb-live"><i />live</span>
      </div>

      <div className="vdb-q">
        <span className="vdb-q-label">Buyer asks</span>
        <p>“Who should I hire for SEO and AI search?”</p>
        <span className="vdb-q-mark">?</span>
      </div>

      <div className="vdb-lanes">
        {LANES.map((lane) => {
          const progress = Math.min(1, Math.max(0, (t - lane.at + 300) / (lane.steps.length * GAP)))
          return (
            <div className="vdb-lane" key={lane.n}>
              <div className="vdb-lane-h">
                <span className="vdb-n">{lane.n}</span>
                <b><Mark k={lane.logo} s={13} />{lane.label}</b>
                <span className={`vdb-out${t >= lane.at + lane.steps.length * GAP ? ' is-on' : ''}`}>{lane.out}</span>
              </div>
              <div className="vdb-chain">
                {lane.steps.map((step, i) => (
                  <span key={step} className={`vdb-node${t >= lane.at + i * GAP ? ' is-on' : ''}`}>
                    <i>{i + 1}</i>{step}
                  </span>
                ))}
              </div>
              <span className="vdb-beam"><i style={{ transform: `scaleX(${progress})` }} /></span>
            </div>
          )
        })}
      </div>

      <div className="vdb-foot">
        <span>Leads and citations, not impressions</span>
        <span className="vdb-logos">{['google', 'openai', 'gemini', 'wordpress'].map((k) => <Mark key={k} k={k} s={13} />)}</span>
      </div>
      <p className="wv-sr">Three connected services. SEO foundations make the site crawlable and findable in Google. AEO and GEO turn that site into a source AI answers cite. Content systems keep publishing pages that earn both.</p>
    </section>
  )
}
