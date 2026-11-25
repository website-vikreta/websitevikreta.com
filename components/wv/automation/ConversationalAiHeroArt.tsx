'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { getBranch } from '@/content/ai'
import { PERSONAS } from '@/content/ai/personas'
import { TOOL_LOGOS } from '@/content/ai/logos'
import { ease } from '../ui'
import { useStage } from './heroes/VoiceHero'
import './heroes/heroes-b.css'

/** Conversational-ai pillar hero art — live, like the child pages.
 *
 * Reuses the branch stage styles (hb-*) and the real demo data from the three
 * branches, driven by the same useStage loop clock as the branch heroes:
 * the call transcript plays with a live waveform and ends in a booking, the
 * WhatsApp thread replies message by message with a reply timer, and the left
 * cart gets recovered ("Open" → "Paid ✓"). One shared timeline, staggered so
 * the three channels feel like parallel conversations. SSR / reduced motion
 * render the final frame; the loop pauses offscreen and in hidden tabs.
 * Cards stay fully inside the right grid column — no negative offsets.
 */

const WAVE = Array.from({ length: 26 }, (_, i) => 0.25 + ((i * 37) % 10) / 13)
const mmss = (ms: number) => `0:${String(Math.min(59, Math.floor(ms / 1000))).padStart(2, '0')}`

function Lg({ k, s = 16 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- small svg tool marks, same as the branch heroes
  return l ? <img src={l.src} alt="" width={s} height={s} className="hb-lg" style={{ width: s, height: s }} /> : null
}

export default function ConversationalAiHeroArt() {
  const voice = getBranch('ai-voice-agents')!
  const wa = getBranch('whatsapp-automation')!
  const call = voice.demo.kind === 'call' ? voice.demo : undefined
  const lines = call?.lines ?? []
  const msgs = wa.demo.kind === 'chat' ? wa.demo.messages : []
  const biz = /(?:calling|for) ([A-Z][\w&' ]+?)[.,]/.exec(lines[0]?.text ?? '')?.[1] ?? 'Bright Smile Dental'
  const slot = call?.outcome.split('·').slice(0, 2).join('·').trim() ?? 'Booked · Thu 3:30 PM'

  // One shared clock: all three cards are present from the start; voice books
  // first, WhatsApp replies mid-loop, the cart flips to paid last.
  const vAt = (i: number) => 600 + i * 1200
  const book = vAt(lines.length - 1) + 900
  const wAt = (i: number) => 2400 + i * 1300
  const repliedAt = wAt(1)
  const cartIn = 1400
  const paid = 9600
  const end = paid + 600
  const { ref, t, reduce } = useStage(end, 3200, 4000)

  const shown = lines.filter((_, i) => t >= vAt(i)).length
  const cur = lines[Math.max(0, shown - 1)]
  const live = t < book && !reduce
  const booked = t >= book

  const wShown = msgs.filter((_, i) => t >= wAt(i)).length
  const replied = t >= repliedAt
  const secs = Math.min(9, Math.max(0, (t - 1000) / 1000))
  const replySecs = Math.max(1, Math.round((repliedAt - 1000) / 1000))
  const isPaid = t >= paid

  const persona = PERSONAS.arjun
  return (
    <section className="cv-stage" ref={ref}>
      <div className="cv-wrap" aria-hidden>
        {/* Voice — the live call card from /services/ai/ai-voice-agents */}
        <div className="hb-call cv-voice">
          <div className="hb-call-top">
            <span className="hb-live"><i /> Incoming call</span>
            <span>{biz}</span>
            <span className="hb-mono">{mmss(Math.min(t, book))}</span>
          </div>
          <div className="hb-av">
            <div className="hb-av-img">
              <Image src={persona.img.front} alt="" fill sizes="36px" />
            </div>
            <div className="cv-av-tx"><strong>AI assistant</strong><em>{biz}</em></div>
          </div>
          <div className={`hb-wave ${live ? 'is-live' : ''} is-${cur?.who ?? 'agent'}`}>
            {WAVE.map((h, i) => <span key={i} style={{ ['--i' as string]: i, ['--h' as string]: h }} />)}
          </div>
          <div className="hb-lines cv-lines" role="log" aria-label="Call transcript">
            <AnimatePresence initial={false}>
              {lines.slice(Math.max(0, shown - 3), shown).map((l, k) => {
                const idx = Math.max(0, shown - 3) + k
                return (
                  <motion.p
                    key={idx}
                    className={`hb-line is-${l.who}${k === 0 ? ' cv-line-3' : ''}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 0.45 + 0.275 * k, y: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.5, ease }}
                  >
                    <b>{l.who === 'agent' ? 'AI' : 'Caller'}</b> {l.text}
                  </motion.p>
                )
              })}
            </AnimatePresence>
          </div>
          <motion.div className="cv-status" initial={false} animate={{ opacity: booked ? 1 : 0, y: booked ? 0 : 8 }} transition={{ duration: 0.5, ease }}>
            <span className="hb-tick">✓</span> {slot}
          </motion.div>
        </div>
        <span className="hb-chip cv-chip-voice">Voice · 24/7</span>

        {/* WhatsApp — the live thread from /services/ai/whatsapp-automation */}
        <div className="hb-phone cv-phone">
          <div className="hb-phone-bar"><Lg k="whatsapp" s={18} /> AI assistant</div>
          <div className="hb-chat">
            {msgs.slice(Math.max(0, wShown - 3), wShown).map((m, k) => {
              const i = Math.max(0, wShown - 3) + k
              return (
                <motion.p
                  key={i}
                  className={`hb-b ${m.from === 'user' ? 'is-out' : 'is-in'}${k === 0 ? ' cv-b-first' : ''}`}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}
                >
                  {m.text}
                  {m.attachment && <span className="hb-att"><Lg k="googlecalendar" s={16} /> {m.attachment.label}</span>}
                </motion.p>
              )
            })}
          </div>
        </div>
        <span className={`hb-chip cv-chip-phone${replied ? ' is-done' : ''}`}>{replied ? `Replied in ${replySecs}s` : `${secs.toFixed(1)}s`}</span>

        {/* Commerce — the cart card from /services/ai/conversational-commerce */}
        <motion.div
          className="hb-card hb-form cv-cart"
          initial={false}
          animate={{ opacity: t >= cartIn || reduce ? 1 : 0, x: t >= cartIn || reduce ? 0 : -24 }}
          transition={{ duration: 0.6, ease }}
        >
          <b><Lg k="shopify" s={16} /> Cart</b>
          <span className="hb-field">Barrier Cream 50 ml</span>
          <span className="hb-field">Left at checkout</span>
          <span className="hb-field">1 item</span>
          <span className={`hb-send${isPaid ? ' is-sent' : ''}`}>{isPaid ? 'Paid ✓' : 'Open'}</span>
        </motion.div>
        <motion.span
          className={`hb-chip cv-chip-cart${isPaid ? ' is-done' : ''}`}
          initial={false}
          animate={{ opacity: t >= cartIn || reduce ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >{isPaid ? 'Order paid' : 'Cart left'}</motion.span>
      </div>
      <p className="wv-sr">Three customer conversations: an AI voice call books a dental appointment, WhatsApp qualifies a remodel lead and books a consult, and a left cart gets recovered in chat.</p>
    </section>
  )
}
