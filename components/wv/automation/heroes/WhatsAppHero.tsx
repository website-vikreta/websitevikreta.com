'use client'
import { motion } from 'motion/react'
import type { ChatMessage } from '@/content/ai-automations/types'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import { Lg, heroCopy, useStage, type HeroProps } from './VoiceHero'
import './heroes-b.css'

const FALLBACK: ChatMessage[] = [
  { from: 'user', text: 'Hi, I filled in the form about a quote.' },
  { from: 'arjun', text: 'Hi Sara, I am Arjun, an AI assistant. What are you looking to get done?' },
  { from: 'user', text: 'A kitchen remodel, spring start.' },
  { from: 'arjun', text: 'Free consult Thu 10 AM or Fri 2 PM?' },
  { from: 'user', text: 'Thursday.' },
  { from: 'arjun', text: 'Booked for Thu 10 AM.', attachment: { kind: 'card', label: 'Consult · Thu 10:00 AM', meta: 'Added to Google Calendar' } },
]

export default function WhatsAppHero({ branch, product }: HeroProps) {
  const d = product?.page?.demo ?? branch.demo
  const msgs = d.kind === 'chat' ? d.messages : FALLBACK
  const sms = d.kind === 'chat' && d.channel === 'sms'
  const remind = product?.slug === 'appointment-reminders'
  const at = (i: number) => (remind ? 700 + i * 1700 : i === 0 ? 1800 : 3200 + (i - 1) * 1400)
  const endT = at(msgs.length - 1) + 900
  const { ref, t, reduce } = useStage(endT, at(Math.min(2, msgs.length - 1)))
  const shown = msgs.filter((_, i) => t >= at(i)).length
  const secs = Math.min(6, Math.max(0, ((t - 1100) / 2100) * 6))
  const replied = t >= 3200
  const formSent = t >= 1000
  const asking = remind && shown === 1
  const last = msgs[msgs.length - 1]
  const cp = heroCopy(branch, product)
  const ch = sms ? 'twilio' : 'whatsapp'
  return (
    <section ref={ref} className="hb-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="wv-wrap hb-in">
        <div className="hb-copy"><HeroCopy {...cp} /></div>
        <div className="hb-stage hb-wa" aria-hidden>
          {!remind && (
            <motion.div className="hb-card hb-form" initial={false} animate={{ opacity: t >= 200 || reduce ? 1 : 0, x: t >= 200 || reduce ? 0 : -30 }} transition={{ duration: 0.6, ease }}>
              <b>Quote request</b>
              <span className="hb-field">Sara</span>
              <span className="hb-field">+1 415 ••• 0142</span>
              <span className="hb-field is-ta">Wants a quote</span>
              <span className={`hb-send ${formSent ? 'is-sent' : ''}`}>{formSent ? 'Sent ✓' : 'Send'}</span>
            </motion.div>
          )}
          {remind && (
            <div className="hb-card hb-form">
              <b>Thu 4:00 PM</b>
              <span className="hb-field">Peak Physio</span>
              <span className="hb-field">Jordan · reminder due</span>
            </div>
          )}
          {!remind && <span className="hb-beam"><i style={{ transform: `scaleX(${t > 1100 || reduce ? 1 : 0})` }} /></span>}
          <div className="hb-phone is-sms" style={{ opacity: t >= 2600 || reduce ? 1 : 0 }}>
            <div className="hb-phone-bar"><Lg k="twilio" s={14} /> SMS</div>
            <p className="hb-b is-in">Hi Sara, got your quote request. Reply YES for a call.</p>
            <p className="hb-b is-out">YES</p>
          </div>
          <div className="hb-phone">
            <div className="hb-phone-bar"><Lg k={ch} s={18} /> AI assistant</div>
            <div className="hb-chat">
              {msgs.slice(Math.max(0, shown - 4), shown).map((m, k) => {
                const i = Math.max(0, shown - 4) + k
                return (
                  <motion.p key={i} className={`hb-b ${m.from === 'user' ? 'is-out' : 'is-in'}`} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}>
                    {m.text}
                    {m.attachment && <span className="hb-att"><Lg k="googlecalendar" s={16} /> {m.attachment.label}</span>}
                  </motion.p>
                )
              })}
            </div>
            {remind && (
              <div className="hb-quick" style={{ opacity: asking || shown >= 2 ? 1 : 0 }}>
                <span className={shown === 1 ? 'is-hot' : ''}>Confirm</span>
                <span className={shown >= 2 ? 'is-tap' : ''}>Reschedule</span>
              </div>
            )}
          </div>
          <div className={`hb-chip hb-watch ${replied || remind ? 'is-done' : ''}`}>
            {remind ? (t >= endT - 400 || reduce ? last?.attachment?.meta?.split('.')[0] ?? 'Slot refilled' : 'Reminder sent') : replied ? 'Replied in 6s' : `${secs.toFixed(1)}s`}
          </div>
        </div>
      </div>
    </section>
  )
}
