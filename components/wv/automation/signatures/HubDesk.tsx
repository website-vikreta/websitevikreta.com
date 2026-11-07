'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PERSONAS } from '@/content/ai-automations/personas'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import type { PersonaId } from '@/content/ai-automations/types'
import { Arrow, KineticTitle } from '../../ui'
import './sig-a.css'

type Item = { logo: string; what: string; state: string; at: string; by: PersonaId }
type Svc = { id: string; label: string; branch: string; apps: string[]; items: Item[] }
const SERVICES: Svc[] = [
  { id: 'hr', label: 'HR documents', branch: 'hr-automation', apps: ['gmail', 'googledrive', 'slack'], items: [
    { logo: 'gmail', what: 'Offer letter · Neel', state: 'Sent for e-sign', at: '09:12', by: 'meher' },
    { logo: 'googledrive', what: 'Contractor NDA · Aarav', state: 'Signed and filed to Drive', at: '10:40', by: 'meher' },
    { logo: 'slack', what: 'Onboarding pack · Riya', state: 'Welcome posted in #team', at: '11:05', by: 'meher' },
    { logo: 'googlecalendar', what: 'Interviews · 3 candidates', state: 'Slots booked', at: '12:30', by: 'meher' },
    { logo: 'gmail', what: 'Completion letter · intern', state: 'Emailed on the end date', at: 'Yesterday', by: 'meher' },
  ] },
  { id: 'content', label: 'Posts and ads', branch: 'content-automation', apps: ['linkedin', 'meta', 'wordpress'], items: [
    { logo: 'linkedin', what: 'LinkedIn post · product launch', state: 'Scheduled Tue 10:00', at: '08:50', by: 'ira' },
    { logo: 'meta', what: '24 ad variants', state: 'Ready for your review', at: '09:30', by: 'ira' },
    { logo: 'wordpress', what: 'Blog draft · skincare routine', state: 'In your review queue', at: '10:15', by: 'ira' },
    { logo: 'instagram', what: 'Reel caption', state: 'Queued Wed 18:00', at: '11:20', by: 'ira' },
    { logo: 'tiktok', what: 'Hook test · 3 cuts', state: 'Posted', at: 'Yesterday', by: 'ira' },
  ] },
  { id: 'money', label: 'Invoices and cash', branch: 'finance-automation', apps: ['stripe', 'quickbooks', 'xero'], items: [
    { logo: 'stripe', what: 'Invoice INV-1042', state: 'Paid', at: '09:02', by: 'arjun' },
    { logo: 'quickbooks', what: 'Reminder · INV-1038', state: 'Second nudge sent', at: '09:55', by: 'arjun' },
    { logo: 'xero', what: 'Bill · Hosting', state: 'Coded, waiting for your OK', at: '11:10', by: 'arjun' },
    { logo: 'hubspot', what: 'Proposal · Northwind Studio', state: 'Sent', at: '11:48', by: 'arjun' },
    { logo: 'stripe', what: 'Invoice INV-1039', state: 'Overdue 30 days, chased', at: 'Yesterday', by: 'arjun' },
  ] },
  { id: 'leads', label: 'Calls and chat', branch: 'ai-voice-agents', apps: ['whatsapp', 'googlecalendar', 'hubspot'], items: [
    { logo: 'googlecalendar', what: 'Call · Bright Smile Dental', state: 'Booked Thu 3:30', at: '09:41', by: 'arjun' },
    { logo: 'whatsapp', what: 'Quote request · Sara', state: 'Replied in 6 seconds', at: '10:07', by: 'arjun' },
    { logo: 'hubspot', what: 'Lead · kitchen remodel', state: 'Qualified, added to CRM', at: '10:32', by: 'arjun' },
    { logo: 'gmail', what: 'Missed call · 7:40 pm', state: 'Called back, booked', at: '19:41', by: 'arjun' },
    { logo: 'whatsapp', what: 'Order question', state: 'Answered at 11 pm', at: 'Yesterday', by: 'arjun' },
  ] },
]

export default function HubDesk() {
  const [id, setId] = useState(SERVICES[0].id)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const svc = SERVICES.find((s) => s.id === id)!
  const key = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? i - 1 : -1
    if (n < 0) return
    e.preventDefault()
    const j = (n + SERVICES.length) % SERVICES.length
    setId(SERVICES[j].id)
    tabs.current[j]?.focus()
  }
  return (
    <section className="wv-sec sg-hub" id="desk">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['Work that', 'ran today.']} className="wv-h2" accent={1} />
          <p className="wv-sec-aside">A sample day from the three AI teammates. Pick a service to see what moved without anyone touching it.</p>
        </div>
        <div className="sg-dk">
          <div className="sg-dk-tabs" role="tablist" aria-label="Automated work by service">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { tabs.current[i] = el }}
                role="tab"
                id={`sg-tab-${s.id}`}
                aria-selected={s.id === id}
                aria-controls="sg-desk"
                tabIndex={s.id === id ? 0 : -1}
                className={`sg-tab${s.id === id ? ' is-on' : ''}`}
                onClick={() => setId(s.id)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setId(s.id)}
                onKeyDown={(e) => key(e, i)}
              >
                <span className="sg-tab-n">{s.label}</span>
                <span className="sg-tab-l">{s.apps.map((a) => <img key={a} src={TOOL_LOGOS[a].src} alt="" />)}</span>
              </button>
            ))}
          </div>
          <div className="sg-deskp" id="sg-desk" role="tabpanel" aria-labelledby={`sg-tab-${id}`}>
            <div className="sg-deskp-h">
              <h3>{svc.label}</h3>
              <p><span className="sg-live" /> Live work feed · sample day</p>
            </div>
            <ul key={id} className="sg-feed">
              {svc.items.map((f, i) => {
                const lg = TOOL_LOGOS[f.logo]
                return (
                  <li key={f.what} style={{ ['--i' as string]: i }}>
                    <span className="sg-lg">{lg && <img src={lg.src} alt="" />}</span>
                    <span className="sg-feed-t"><b>{f.what}</b><i>{f.state}</i></span>
                    <span className="sg-by"><Image src={PERSONAS[f.by].img.front} alt="" fill sizes="22px" /></span>
                    <time>{f.at}</time>
                  </li>
                )
              })}
            </ul>
            <Link href={`/services/ai-automations/${svc.branch}`} className="sg-more">
              See how it works <Arrow size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
