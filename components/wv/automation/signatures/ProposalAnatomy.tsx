'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Branch } from '@/content/ai-automations/types'
import { PERSONAS } from '@/content/ai-automations/personas'
import './sig-c.css'

const REG = [
  { id: 'cover', n: 1, label: 'Cover', note: 'Pulled from your call notes: client name, goal and date, in your template.' },
  { id: 'scope', n: 2, label: 'Scope', note: 'Built from what Priya said on the call, matched to your past wins.' },
  { id: 'time', n: 3, label: 'Timeline', note: 'Milestones come from your delivery times on similar jobs.' },
  { id: 'inv', n: 4, label: 'Investment', note: 'Left for you. Price and terms are set by a person, never guessed.' },
  { id: 'ok', n: 5, label: 'Approval gate', note: 'You approve before it sends. Nothing goes out without your yes.' },
] as const

export default function ProposalAnatomy({ branch }: { branch: Branch }) {
  const [a, setA] = useState<string>('scope')
  const cur = REG.find((r) => r.id === a)!
  const arjun = PERSONAS.arjun
  const Hot = ({ id }: { id: string }) => {
    const r = REG.find((x) => x.id === id)!
    return <button type="button" className="wv-sg-hot" aria-pressed={a === id} aria-label={`${r.n}. ${r.label}`} onClick={() => setA(id)}>{r.n}</button>
  }
  const cls = (id: string) => `wv-sg-sec${a === id ? ' is-on' : ''}`
  return (
    <section className="wv-sg wv-sg-prop" aria-label={`${branch.name} anatomy`}>
      <div className="wv-wrap wv-sg-prop-in">
        <div className="wv-sg-doc">
          <div className={cls('cover')}><Hot id="cover" />
            <small>Proposal · 12 Nov</small>
            <h3>Online booking for Priya&apos;s Studio</h3>
            <span>Prepared by Website Vikreta</span>
          </div>
          <div className={cls('scope')}><Hot id="scope" />
            <h4>Scope</h4>
            <ul><li>Booking page that works after 6 pm</li><li>Reminders by SMS and email</li><li>Calendar sync, live by January</li></ul>
          </div>
          <div className="wv-sg-two">
            <div className={cls('time')}><Hot id="time" />
              <h4>Timeline</h4>
              <ol><li><b>Wk 1</b> Design</li><li><b>Wk 3</b> Build</li><li><b>Wk 5</b> Launch</li></ol>
            </div>
            <div className={cls('inv')}><Hot id="inv" />
              <h4>Investment</h4>
              <span className="wv-sg-pill is-y">Discussed on call</span>
            </div>
          </div>
          <div className={cls('ok')}><Hot id="ok" />
            <h4>Approval</h4>
            <span className="wv-sg-gate"><i aria-hidden />Waiting for your approval</span>
          </div>
        </div>
        <aside className="wv-sg-note-card" aria-live="polite">
          <Image className="wv-sg-ira" src={arjun.img.front} alt="" width={32} height={32} sizes="32px" />
          <small>{cur.n} of 5 · {cur.label}</small>
          <p>{cur.note}</p>
          <div className="wv-sg-steps" role="group" aria-label="Sections">
            {REG.map((r) => <button type="button" key={r.id} aria-pressed={a === r.id} onClick={() => setA(r.id)}>{r.n}. {r.label}</button>)}
          </div>
        </aside>
      </div>
    </section>
  )
}
