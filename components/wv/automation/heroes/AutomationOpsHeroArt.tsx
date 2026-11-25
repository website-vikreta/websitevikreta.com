'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ease } from '../../ui'
import { PERSONAS } from '@/content/ai/personas'
import { toolLogo, useClock } from './HubHero'

/** Automation & Ops pillar hero art — a live "back office board".
 *
 * Four real scenes, one per child page, wired by a single shared clock:
 *  - Workflows: a new lead moves through four connected apps, no hand-offs.
 *  - HR: Meher types one line, an offer letter fills, gets signed, sent for e-sign.
 *  - Proposals: discovery notes become proposal pages, sent and opened twice.
 *  - Finance: an invoice goes Sent → Reminder → PAID with a stamped outcome.
 * Real people, real tool marks, wv tokens only. SSR / reduced motion show the
 * final frame; the loop pauses offscreen and in hidden tabs.
 */

const END = 9200
const START = 4200

const on = (t: number, at: number) => t >= at

function Tool({ k, s = 16 }: { k: string; s?: number }) {
  const l = toolLogo(k)
  return l ? <img src={l.src} alt="" width={s} height={s} style={{ width: s, height: s }} /> : null
}

function PanelHead({ label, tool, live }: { label: string; tool: string; live?: boolean }) {
  return (
    <div className="ao-ph">
      <span className="ao-ph-t"><Tool k={tool} s={15} />{label}</span>
      {live && <i><span className="ao-dot" />Live</i>}
    </div>
  )
}

/* ---------- 1. Workflows — connected apps ---------- */
const WF = [
  { k: 'typeform', n: 'Form' },
  { k: 'hubspot', n: 'CRM' },
  { k: 'slack', n: 'Slack' },
  { k: 'gmail', n: 'Gmail' },
]

function WorkflowsPanel({ t }: { t: number }) {
  const litAt = [500, 1700, 2900, 4100]
  const steps = litAt.filter((a) => t >= a).length
  return (
    <div className="ao-p ao-wf">
      <PanelHead label="Workflows" tool="make" live />
      <div className="ao-wf-chain">
        {WF.map((a, i) => (
          <div key={a.n} className="ao-wf-step">
            <span className={`ao-wf-node${on(t, litAt[i]) ? ' is-on' : ''}`}><Tool k={a.k} s={20} /></span>
            <small>{a.n}</small>
            {i < WF.length - 1 && <span className={`ao-wf-line${on(t, litAt[i] + 700) ? ' is-on' : ''}`} />}
          </div>
        ))}
      </div>
      <div className="ao-wf-note">New lead in CRM, team pinged, reply drafted.</div>
      <div className="ao-wf-stat"><span>Steps run, no hand-offs</span><b>{steps}<i>/4</i></b></div>
    </div>
  )
}

/* ---------- 2. HR — offer letter from one line ---------- */
const CMD = 'Meher, offer letter for Neel, starts Dec 1'
const HR_FIELDS: [string, string][] = [['Candidate', 'Neel Shah'], ['Role', 'Frontend Dev'], ['Start date', 'Dec 1']]

function HrPanel({ t, reduce }: { t: number; reduce: boolean }) {
  const chars = reduce ? CMD.length : Math.max(0, Math.floor((t - 900) / 34))
  const typed = CMD.slice(0, chars)
  const sent = on(t, 6200)
  return (
    <div className="ao-p ao-hr">
      <PanelHead label="HR automation" tool="slack" />
      <div className="ao-chatline">
        <span className="ao-face"><Image src={PERSONAS.meher.img.front} alt="" fill sizes="26px" /></span>
        <span className="ao-cmd">{typed}{!reduce && t < 900 + CMD.length * 34 && <i className="ao-caret" />}</span>
      </div>
      <div className={`ao-offer${on(t, 2600) ? ' is-on' : ''}`}>
        <div className="ao-offer-h"><b>Offer of employment</b><Tool k="google" s={14} /></div>
        {HR_FIELDS.map(([k, v], i) => (
          <div key={k} className={`ao-offer-f${on(t, 3200 + i * 420) ? ' is-on' : ''}`}><span>{k}</span><b>{v}</b></div>
        ))}
        <svg className={`ao-sign${on(t, 5000) ? ' is-on' : ''}`} viewBox="0 0 120 26" aria-hidden>
          <path pathLength={1} d="M3 20c7-17 12-22 15-19 4 4-6 22-3 23 5 1 9-16 15-16 4 0 0 15 4 15 6 0 8-9 14-9 3 0 2 6 6 6 5 0 9-6 16-11" />
        </svg>
      </div>
      <span className={`ao-chip ao-chip-y${sent ? ' is-on' : ''}`}>Sent for e-sign ✓</span>
    </div>
  )
}

/* ---------- 3. Proposals — notes to pages ---------- */
const PAGES = ['Cover', 'Scope', 'Timeline', 'Investment']

function ProposalPanel({ t }: { t: number }) {
  return (
    <div className="ao-p ao-prop">
      <PanelHead label="Proposal automation" tool="notion" />
      <div className="ao-callnote">
        <span className="ao-face"><Image src={PERSONAS.arjun.img.front} alt="" fill sizes="26px" /></span>
        <span><b>Discovery call</b><small>“bookings after 6 pm”, “reminders”</small></span>
      </div>
      <div className="ao-pages">
        {PAGES.map((p, i) => (
          <div key={p} className={`ao-page${on(t, 2400 + i * 650) ? ' is-on' : ''}`} style={{ ['--i' as string]: i }}>
            <small>{i + 1}</small>{p}
          </div>
        ))}
      </div>
      <span className={`ao-chip${on(t, 5400) ? ' is-on' : ''}`}>Sent · Opened 2×</span>
    </div>
  )
}

/* ---------- 4. Finance — invoice to paid ---------- */
const BILLS: [string, string][] = [['Dispatch dashboard', '$3,200'], ['Hosting & setup', '$450'], ['Support retainer', '$950']]
const FIN_STEPS = ['Sent · Day 0', 'Reminder · +3d', 'Reminder · +7d', 'PAID']

function FinancePanel({ t, reduce }: { t: number; reduce: boolean }) {
  const step = reduce ? 3 : [2000, 4200, 6200, 7800].filter((a) => t >= a).length - 1
  const paid = step >= 3
  return (
    <div className="ao-p ao-fin">
      <PanelHead label="Finance automation" tool="quickbooks" />
      <div className="ao-inv">
        <div className="ao-inv-h"><b>INV-1042</b><small>Northwind Studio</small><Tool k="stripe" s={15} /></div>
        {BILLS.map(([n, v]) => <div key={n} className="ao-inv-l"><span>{n}</span><b>{v}</b></div>)}
        <div className="ao-inv-f"><span>Total <b>$4,600</b></span></div>
        <motion.span className={`ao-stamp${paid ? ' is-on' : ''}`} initial={false} animate={{ opacity: paid ? 1 : 0, scale: reduce ? 1 : paid ? 1 : 2, rotate: paid ? -11 : 4 }} transition={{ duration: 0.45, ease }}>
          PAID
        </motion.span>
      </div>
      <div className="ao-fin-pill">{FIN_STEPS[Math.max(step, 0)]}</div>
    </div>
  )
}

export default function AutomationOpsHeroArt() {
  const { ref, t } = useClock(END, 3600, START)
  const reduce = !!useReducedMotion()
  return (
    <section className="ao-stage" ref={ref} aria-hidden>
      <div className="ao-board">
        <div className="ao-board-top">
          <span className="ao-board-brand"><b>Back office</b> running itself</span>
          <span className="ao-board-live"><span className="ao-dot" />4 flows live</span>
        </div>
        <div className="ao-grid">
          <WorkflowsPanel t={t} />
          <HrPanel t={t} reduce={reduce} />
          <ProposalPanel t={t} />
          <FinancePanel t={t} reduce={reduce} />
        </div>
        <div className="ao-board-foot">
          <Tool k="make" s={14} /><Tool k="hubspot" s={14} /><Tool k="slack" s={14} /><Tool k="gmail" s={14} />
          <Tool k="notion" s={14} /><Tool k="google" s={14} /><Tool k="quickbooks" s={14} /><Tool k="stripe" s={14} />
          <span>Connected in your accounts</span>
        </div>
      </div>
      <p className="wv-sr">Four back-office automations running: a new lead moves through connected apps, an offer letter is drafted and sent for e-sign, discovery notes become a finished proposal, and an invoice is sent and paid.</p>
    </section>
  )
}
