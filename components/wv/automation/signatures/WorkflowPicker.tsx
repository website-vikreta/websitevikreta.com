'use client'
import { useState } from 'react'
import type { Branch } from '@/content/ai-automations/types'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import { Arrow, KineticTitle } from '../../ui'
import { PrefillLink } from '../LeadForm'
import './sig-a.css'

/** t = trigger phrase [before, after] around the app name, a = action phrase. */
const APPS: Record<string, { t: [string, string]; a: [string, string] }> = {
  typeform: { t: ['a ', ' comes in'], a: ['sends the ', ' follow-up'] },
  hubspot: { t: ['a ', ' deal is won'], a: ['creates a ', ' deal'] },
  slack: { t: ['a message lands in ', ''], a: ['pings #sales on ', ''] },
  gmail: { t: ['an email arrives in ', ''], a: ['drafts the reply in ', ''] },
  googlesheets: { t: ['a row is added to ', ''], a: ['logs it in ', ''] },
  calendly: { t: ['someone books on ', ''], a: ['sends the ', ' link'] },
  stripe: { t: ['a ', ' payment succeeds'], a: ['raises the invoice in ', ''] },
  airtable: { t: ['an ', ' record changes'], a: ['updates the ', ' record'] },
  notion: { t: ['a ', ' page is added'], a: ['creates a task in ', ''] },
  whatsapp: { t: ['a ', ' message comes in'], a: ['replies on ', ''] },
}
const KEYS = Object.keys(APPS)
const name = (k: string) => TOOL_LOGOS[k]?.name ?? k

export default function WorkflowPicker({ branch }: { branch: Branch }) {
  void branch
  const [sel, setSel] = useState<string[]>(['typeform', 'hubspot', 'slack'])
  const toggle = (k: string) =>
    setSel((s) => (s.includes(k) ? (s.length > 2 ? s.filter((x) => x !== k) : s) : s.length >= 3 ? [...s.slice(1), k] : [...s, k]))
  const [a, b, c] = sel
  const parts = (kind: 't' | 'a', k: string) => [APPS[k][kind][0], name(k), APPS[k][kind][1]] as const
  const plain = `When ${parts('t', a).join('')}, Meher ${parts('a', b).join('')}${c ? ` and ${parts('a', c).join('')}` : ''}.`
  const mark = (kind: 't' | 'a', k: string) => {
    const [x, n, y] = parts(kind, k)
    return <>{x}<mark>{n}</mark>{y}</>
  }
  return (
    <section className="wv-sec" id="picker">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['Pick your apps.', 'See what gets built.']} className="wv-h2" accent={1} />
          <div className="wv-sec-aside"><p>Choose two or three of the tools you already use and see the workflow we would build between them.</p></div>
        </div>

        <div className="sg-wf">
          <div className="sg-apps" role="group" aria-label="Choose two or three apps">
            {KEYS.map((k) => {
              const i = sel.indexOf(k)
              return (
                <button key={k} type="button" className={`sg-app${i >= 0 ? ' is-on' : ''}`} aria-pressed={i >= 0} onClick={() => toggle(k)}>
                  <img src={TOOL_LOGOS[k].src} alt="" />
                  <span>{name(k)}</span>
                  {i >= 0 && <em>{i + 1}</em>}
                </button>
              )
            })}
          </div>
          <div className="sg-out">
            <p className="sg-out-k">Meher builds</p>
            <p className="sg-sentence" aria-live="polite">
              When {mark('t', a)}, Meher {mark('a', b)}{c && <> and {mark('a', c)}</>}.
            </p>
            <div className="sg-flow" aria-hidden key={sel.join()}>
              {sel.map((k, i) => (
                <span key={k} className="sg-flow-s">
                  {i > 0 && <span className="sg-wire" style={{ ['--d' as string]: `${i * 0.5}s` }}><i /></span>}
                  <span className="sg-tile"><img src={TOOL_LOGOS[k].src} alt="" /></span>
                </span>
              ))}
            </div>
            <PrefillLink interest={`Automation: ${plain}`} className="wv-btn wv-btn-y">
              Build this for me <Arrow size={15} />
            </PrefillLink>
          </div>
        </div>
      </div>
    </section>
  )
}
