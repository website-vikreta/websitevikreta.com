'use client'
import Image from 'next/image'
import type { Branch, Product } from '@/content/ai-automations/types'
import { PERSONAS } from '@/content/ai-automations/personas'
import { HeroCopy } from '../HeroCopy'
import { ToolIcon, heroCopyProps, useClock } from './UgcHero'
import './heroes-c.css'

const LINES: { who: string; pre: string; need: string; post: string; chip: string; at: number }[] = [
  { who: 'Priya', pre: 'We ', need: 'lose bookings after 6 pm', post: '.', chip: 'After-hours booking', at: 0 },
  { who: 'You', pre: 'So a booking page that works at night.', need: '', post: '', chip: '', at: 0 },
  { who: 'Priya', pre: 'And ', need: 'reminders', post: ', no-shows are 20%.', chip: 'Reminders', at: 600 },
  { who: 'Priya', pre: 'Ideally ', need: 'live by January', post: '.', chip: 'Live by January', at: 1400 },
]
const PAGES: { t: string; w: string[] }[] = [
  { t: 'Cover', w: ["Priya's Studio", 'Online booking, live by January'] },
  { t: 'Scope', w: ['Booking page, open after 6 pm', 'Reminders by SMS and email', 'Calendar sync'] },
  { t: 'Timeline', w: ['Wk 1 Design', 'Wk 3 Build', 'Wk 5 Launch'] },
  { t: 'Investment', w: [] },
]
const PAGE_AT = [0, 0, 900, 1800]
const SENT_AT = 3000
const TOTAL = 4000

const RFP = [
  { q: 'Describe your approach to data security.', a: 'Encrypted at rest and in transit, quarterly access reviews.' },
  { q: 'List three similar projects delivered.', a: 'Booking page for a dental group, dispatch tool, client portal.' },
  { q: "State your team's availability.", a: 'Team of six, kickoff within two weeks of award.' },
  { q: 'Provide client references.', a: 'Three references on file, contacts confirmed.' },
]

export default function ProposalHero({ branch, product }: { branch: Branch; product?: Product }) {
  const arjun = PERSONAS.arjun
  const { ref, t, done, played, replay } = useClock(TOTAL, 50)
  const rfp = product?.slug === 'rfp-response-automation'
  return (
    <section ref={ref} className="wv-hc wv-hc-prop" aria-label={product?.name ?? branch.name}>
      <div className="wv-wrap wv-hc-in">
        <HeroCopy {...heroCopyProps(branch, product, 'Arjun turns your call notes into a finished proposal before you hang up.')} />
        <div className="wv-hc-stage is-split">
          {rfp ? (
            <div className="wv-hc-call">
              <div className="wv-hc-call-h"><strong>RFP-2026-114</strong><span>4 questions</span></div>
              <ol className="wv-hc-q">
                {RFP.map((r, i) => <li key={i} className={t >= i * 400 ? 'is-on' : ''}><b>{i + 1}</b>{r.q}</li>)}
              </ol>
            </div>
          ) : (
            <div className="wv-hc-call">
              <div className="wv-hc-call-h"><strong><span className="wv-hc-rec" />Discovery call</strong><span>24:10</span></div>
              <ul className="wv-hc-lines">
                {LINES.map((l, i) => (
                  <li key={i} className={t >= l.at ? 'is-on' : ''}>
                    <b>{l.who}</b>
                    <span>{l.pre}{l.need && <mark className={t >= l.at + 500 ? 'is-on' : ''}>{l.need}</mark>}{l.post}</span>
                  </li>
                ))}
              </ul>
              <div className="wv-hc-needs">
                {LINES.filter((l) => l.chip).map((l) => <span key={l.chip} className={`wv-hc-need${t >= l.at + 800 ? ' is-on' : ''}`}>{l.chip}</span>)}
              </div>
            </div>
          )}
          {rfp ? (
            <div className="wv-hc-doc">
              <ul className="wv-hc-ans">
                {RFP.map((r, i) => {
                  const on = t >= 200 + i * 700
                  return (
                    <li key={i} className={on ? 'is-on' : ''}>
                      <b>{i + 1}</b>
                      <span className="wv-hc-ans-t">{r.a}</span>
                      <span className="wv-hc-chip"><ToolIcon k="googledrive" size={14} />Pulled from your library</span>
                    </li>
                  )
                })}
              </ul>
              <span className={`wv-hc-sent${t >= 3200 ? ' is-on' : ''}`}>Draft ready · 4 of 4 answered</span>
              <Image className="wv-hc-av is-dock" src={arjun.img.front} alt={arjun.img.alt} width={36} height={36} sizes="36px" preload />
            </div>
          ) : (
            <div className="wv-hc-doc">
              <div className="wv-hc-sheets">
                {PAGES.map((p, i) => (
                  <div key={p.t} className={`wv-hc-sheet${t >= PAGE_AT[i] ? ' is-on' : ''}`} style={{ ['--i' as string]: i }}>
                    <h3><small>{i + 1}</small>{p.t}</h3>
                    {p.w.map((w, j) => <span key={j} className="wv-hc-sl">{w}</span>)}
                    {!p.w.length && <span className="wv-hc-chip">Discussed on call</span>}
                  </div>
                ))}
              </div>
              <span className={`wv-hc-sent${t >= SENT_AT ? ' is-on' : ''}`}>Sent · Opened 2×</span>
              <Image className="wv-hc-av is-dock" src={arjun.img.front} alt={arjun.img.alt} width={36} height={36} sizes="36px" preload />
            </div>
          )}
          {done && played && <button type="button" className="wv-hc-replay" onClick={replay}>Replay</button>}
        </div>
      </div>
    </section>
  )
}
