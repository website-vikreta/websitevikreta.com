'use client'
import Image from 'next/image'
import { PERSONAS } from '@/content/ai-automations/personas'
import type { Branch, Product } from '@/content/ai-automations/types'
import { Logo } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import { HeroShell, toolLogo, useClock } from './HubHero'
import './heroes-a.css'

const CMD = 'Meher, offer letter for Neel, frontend dev, starts Dec 1'
const CMD_ON = 'Meher, start onboarding for Neel, joins Dec 1'
const TYPE_AT = 400
const SEND_AT = 2400
const MS_PER_CH = 34

const FIELDS: [string, string][] = [['Candidate', 'Neel Shah'], ['Role', 'Frontend Developer'], ['Start date', 'Dec 1'], ['Type', 'Full-time']]
const LINES = [
  'We are pleased to offer you the role of Frontend Developer at Website Vikreta, starting on 1 December.',
  'Your compensation, working hours and notice period are set out in the schedule attached to this letter.',
  'Please sign below to accept. We look forward to having you on the team.',
]
const LOG = ['Pulled the offer template', 'Filled 5 fields from your line', 'Checked the start date', 'Signed by Shubham', 'Sent for e-sign']
const LOG_AT = [2800, 3400, 4600, 7800, 9400]
const END = 10800

const Send = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden><path d="M3 8.5l3.2 3L13 4.5" pathLength={1} /></svg>
)

export default function HrHero({ branch, product }: { branch: Branch; product?: Product }) {
  const onboarding = product?.slug === 'employee-onboarding-automation'
  const events = product?.page?.demo.kind === 'timeline' ? product.page.demo.events : []
  const { ref, t, live } = useClock(onboarding ? 11000 : END, 4500, onboarding ? 5000 : 5600)
  const meher = PERSONAS.meher
  const cmd = onboarding ? CMD_ON : CMD
  const chars = Math.max(0, Math.floor((t - TYPE_AT) / MS_PER_CH))
  const typed = cmd.slice(0, chars)
  const typing = t < SEND_AT
  const on = (at: number) => (t >= at ? ' is-on' : '')
  const sl = toolLogo('slack')
  const h1 = product?.page?.h1 ?? branch.h1
  const sub = product?.page?.heroSub ?? branch.heroSub ?? branch.lead
  const log = onboarding ? ['Read the signed offer', 'Built the 30-day plan', 'Welcome email sent', 'IT and manager notified', 'Check-ins scheduled'] : LOG

  return (
    <HeroShell
      secRef={ref}
      className="hx-hr"
      label={onboarding ? 'Meher builds a new hire checklist from one line and ticks it off.' : 'Meher turns one line into a finished offer letter, signs it and sends it for e-sign.'}
      copy={<HeroCopy h1={h1} sub={sub} interest={product?.name ?? branch.name} waText={`Hi, I'd like help with ${(product?.name ?? branch.name).toLowerCase()}.`} />}
    >
      <div className="hx-cmd">
        <div className="hx-port"><Image src={meher.img.front} alt="" fill sizes="84px" preload /></div>
        <div className="hx-bar">
          <span className="hx-bar-slash">/</span>
          <span className="hx-bar-txt">
            {live ? typed : cmd}
            {live && typing && <span className="hx-caret" />}
          </span>
          <span className={`hx-send${on(SEND_AT)}`}><Send /></span>
        </div>
      </div>

      <div className="hx-work">
        <div className="hx-sheet-w">
          {onboarding ? (
            <div className="hx-check">
              <h3>Neel&apos;s first 30 days</h3>
              <ul>
              {events.map((e, i) => {
                const tickAt = 3000 + i * 1200
                const done = e.state !== 'pending'
                return (
                  <li key={e.at} className={done && t >= tickAt ? 'is-on' : ''}>
                    <span className="hx-tick"><Tick /></span>
                    <span className="hx-lbl">{e.label}</span>
                    <i>{done ? e.at : `Scheduled · ${e.at}`}</i>
                  </li>
                )
              })}
              </ul>
            </div>
          ) : (
            <div className={`hx-sheet${on(2900)}`}>
              <div className="hx-letterhead">
                <Logo height={26} />
                <b>Offer of employment</b>
              </div>
              <h3 className={`hx-pop${on(3300)}`}>Dear Neel,</h3>
              <dl className="hx-fields">
                {FIELDS.map(([k, v], i) => (
                  <div key={k} className={`hx-pop${on(3700 + i * 350)}`}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {LINES.map((l, i) => (
                <p key={l} className={`hx-ln hx-wipe${on(5200 + i * 700)}`}>{l}</p>
              ))}
              <div className={`hx-sign${on(7800)}`}>
                <svg viewBox="0 0 150 50" aria-hidden>
                  <path pathLength={1} d="M4 34c8-22 14-30 18-26 5 5-8 30-4 32 6 2 12-22 20-22 5 0 0 20 6 20 8 0 10-12 18-12 4 0 2 8 8 8 7 0 12-8 22-14 8-5 14-6 18-2" />
                </svg>
                <span>Shubham Gujarathi<br />Website Vikreta</span>
              </div>
              <div className={`hx-sent${on(9400)}`}>
                <span className="hx-chip is-y">
                  Sent for e-sign <svg className="hx-pen" viewBox="0 0 16 16" aria-hidden><path d="M2 14l1-4 8-8 3 3-8 8-4 1zM9.5 3.5l3 3" /></svg>
                </span>
              </div>
            </div>
          )}
          {onboarding && (
            <div className={`hx-sent${on(9000)}`} style={{ bottom: 12 }}>
              <span className="hx-chip is-y">Welcome kit sent · {sl ? <img src={sl.src} alt="Slack" /> : 'Slack'}</span>
            </div>
          )}
        </div>
        <ul className="hx-log">
          <p>Meher&apos;s run</p>
          {log.map((l, i) => (
            <li key={l} className={t >= LOG_AT[i] ? 'is-on' : ''}>{l}</li>
          ))}
        </ul>
      </div>
    </HeroShell>
  )
}
