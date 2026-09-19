'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, Home, MessageCircle, Search, Shirt, ShoppingBag, User } from 'lucide-react'
import {
  PhoneFrame,
  PhoneStatusBar,
  WhatsAppScreen,
  PHONE_HEADER_H,
} from './WhatsAppPhoneShell'

export type RecoveryMessage = {
  timing: string
  clockTime: string
  preview: string
  hasOffer?: boolean
  offerText?: string
}

const BODY_H = 452
const HOLD_MS = 3000
const ink = 'rgba(18,18,18,'

const CATALOG = [
  { name: 'Block Print Kurta', price: '₹1,299' },
  { name: 'Cotton Palazzo', price: '₹899' },
  { name: 'Chikan Kurti', price: '₹1,499' },
  { name: 'Silk Dupatta', price: '₹749' },
]

type Scene = 'list' | 'detail' | 'tap' | 'added' | 'back' | 'exit' | 'home' | 'notify'

const FLOW: { view: Scene; ms: number }[] = [
  { view: 'list',   ms: 1500 },
  { view: 'detail', ms: 1500 },
  { view: 'tap',    ms: 500 },
  { view: 'added',  ms: 1300 },
  { view: 'back',   ms: 1100 },
  { view: 'exit',   ms: 700 },
  { view: 'home',   ms: 1300 },
  { view: 'notify', ms: 1900 },
]

type ChatNode =
  | { t: 'typing';  ms: number }
  | { t: 'divider'; ms: number; text: string }
  | { t: 'msg';     ms: number; m: RecoveryMessage }
  | { t: 'cta';     ms: number }

/* ── Store app ─────────────────────────────────────────────────────────── */

function ProductBlock({ height }: { height: number }) {
  return (
    <div style={{ display: 'grid', height, placeItems: 'center', borderRadius: 10, background: '#f1ece4' }}>
      <Shirt size={height > 110 ? 46 : 26} strokeWidth={1.1} style={{ color: `${ink}0.32)` }} aria-hidden />
    </div>
  )
}

function StoreScreen({ view }: { view: Scene }) {
  const inCart = view === 'added' || view === 'back' || view === 'exit'
  const onDetail = view === 'detail' || view === 'tap' || view === 'added'

  return (
    <>
      <PhoneStatusBar time="10:00" background="#fff" color={`${ink}0.6)`} bars="18,18,18" />

      <div style={{
        display: 'flex', height: PHONE_HEADER_H, alignItems: 'center', justifyContent: 'space-between',
        background: '#fff', padding: '0 14px', borderBottom: `1px solid ${ink}0.08)`,
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#121212' }}>
          Kaya Wear
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 13, color: `${ink}0.7)` }}>
          <Search size={15} strokeWidth={1.7} aria-hidden />
          <span style={{ position: 'relative', display: 'flex' }}>
            <ShoppingBag size={16} strokeWidth={1.7} aria-hidden />
            {inCart && (
              <span className="wa-pop" style={{
                position: 'absolute', top: -5, right: -6,
                display: 'grid', height: 14, width: 14, placeItems: 'center',
                borderRadius: '50%', background: '#121212',
                fontFamily: 'ui-monospace,monospace', fontSize: 9, fontWeight: 700, color: '#fff',
              }}>
                1
              </span>
            )}
          </span>
        </span>
      </div>

      <div style={{ position: 'relative', height: BODY_H, overflow: 'hidden', background: '#fff' }}>
        <div style={{ padding: 14 }}>
          {onDetail ? (
            <div className="wa-fade" key="detail">
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 10, fontSize: 11, color: `${ink}0.5)` }}>
                <ChevronLeft size={13} strokeWidth={1.8} aria-hidden /> Kurtas
              </span>
              <ProductBlock height={186} />
              <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#121212' }}>Block Print Kurta</p>
              <p style={{ marginTop: 3, fontSize: 13, color: `${ink}0.6)` }}>₹1,299</p>

              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <span key={size} style={{
                    display: 'grid', height: 26, width: 30, placeItems: 'center', borderRadius: 6,
                    border: `1px solid ${size === 'M' ? '#121212' : `${ink}0.14)`}`,
                    fontSize: 11, fontWeight: 600,
                    background: size === 'M' ? '#121212' : '#fff',
                    color: size === 'M' ? '#fff' : `${ink}0.6)`,
                  }}>
                    {size}
                  </span>
                ))}
              </div>

              <div style={{ position: 'relative', marginTop: 16 }}>
                <span style={{
                  display: 'grid', height: 40, placeItems: 'center', borderRadius: 8,
                  background: '#121212', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.02em', color: '#fff',
                  transform: view === 'tap' ? 'scale(0.97)' : 'none',
                  transition: 'transform 0.18s ease',
                }}>
                  {view === 'added' ? 'Added to cart' : 'Add to cart'}
                </span>
                {view === 'tap' && (
                  <span aria-hidden className="wa-tap" style={{
                    position: 'absolute', top: 6, left: '50%', height: 28, width: 28,
                    marginLeft: -14, borderRadius: '50%', background: 'rgba(255,255,255,0.55)',
                  }} />
                )}
              </div>
            </div>
          ) : (
            <div className="wa-fade" key="list">
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, borderRadius: 8,
                border: `1px solid ${ink}0.1)`, padding: '8px 10px', fontSize: 11, color: `${ink}0.4)`,
              }}>
                <Search size={12} strokeWidth={1.7} aria-hidden /> Search Kaya Wear
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {CATALOG.map(item => (
                  <div key={item.name}>
                    <ProductBlock height={104} />
                    <p style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: '#121212' }}>{item.name}</p>
                    <p style={{ marginTop: 1, fontSize: 11, color: `${ink}0.5)` }}>{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {view === 'added' && (
          <span className="wa-pop" style={{
            position: 'absolute', bottom: 58, left: 14, right: 14,
            display: 'grid', placeItems: 'center', borderRadius: 8, background: '#121212',
            padding: '9px 12px', fontSize: 11.5, fontWeight: 600, color: '#fff',
          }}>
            Block Print Kurta (M) added to your cart
          </span>
        )}

        {/* App tab bar */}
        <div style={{
          position: 'absolute', insetInline: 0, bottom: 0,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          height: 46, background: '#fff', borderTop: `1px solid ${ink}0.08)`,
        }}>
          {[Home, Search, ShoppingBag, User].map((Icon, i) => (
            <Icon key={i} size={16} strokeWidth={1.6} aria-hidden style={{ color: i === 0 ? '#121212' : `${ink}0.35)` }} />
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Android home screen ───────────────────────────────────────────────── */

function HomeScreen({ notification }: { notification: boolean }) {
  return (
    <>
      <PhoneStatusBar time="10:15" background="#12100e" />

      <div style={{
        position: 'relative', height: PHONE_HEADER_H + BODY_H, overflow: 'hidden',
        padding: '24px 18px 0',
        background: 'linear-gradient(170deg, #2b2620 0%, #12100e 55%, #0b0a09 100%)',
      }}>
        <p style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>10:15</p>
        <p style={{ marginTop: 5, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Saturday</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 36 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{
              display: 'grid', height: 44, placeItems: 'center', borderRadius: 13,
              background: i === 2 ? '#FFD600' : i === 5 ? '#25d366' : 'rgba(255,255,255,0.12)',
            }}>
              {i === 2 && <Shirt size={17} strokeWidth={1.8} style={{ color: '#121212' }} aria-hidden />}
              {i === 5 && <MessageCircle size={17} strokeWidth={1.8} style={{ color: '#fff' }} aria-hidden />}
            </span>
          ))}
        </div>

        <div style={{
          position: 'absolute', insetInline: 18, bottom: 22,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          borderRadius: 22, background: 'rgba(255,255,255,0.1)', padding: '10px 0',
        }}>
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={{ height: 34, width: 34, borderRadius: 11, background: i === 3 ? '#25d366' : 'rgba(255,255,255,0.16)' }} />
          ))}
        </div>

        {notification && (
          <div className="wa-pop" style={{
            position: 'absolute', insetInline: 12, top: 12,
            display: 'flex', alignItems: 'flex-start', gap: 9,
            borderRadius: 16, background: '#fbf9f6', padding: '11px 12px',
            boxShadow: '0 18px 30px -18px rgba(0,0,0,0.75)',
          }}>
            <span style={{ display: 'grid', height: 26, width: 26, flexShrink: 0, placeItems: 'center', borderRadius: 9, background: '#25d366' }}>
              <MessageCircle size={14} strokeWidth={1.9} style={{ color: '#fff' }} aria-hidden />
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 9.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: `${ink}0.45)` }}>
                WhatsApp · now
              </span>
              <span style={{ display: 'block', marginTop: 2, fontSize: 12, fontWeight: 700, color: '#121212' }}>Kaya Wear</span>
              <span style={{ display: 'block', marginTop: 1, fontSize: 11.5, lineHeight: 1.45, color: `${ink}0.65)` }}>
                You left something in your cart
              </span>
            </span>
          </div>
        )}
      </div>
    </>
  )
}

/* ── Chat ──────────────────────────────────────────────────────────────── */

function Bubble({ m }: { m: RecoveryMessage }) {
  return (
    <div className="wa-pop" style={{
      maxWidth: '92%', borderRadius: '12px 12px 12px 3px', background: '#fff',
      padding: '10px 12px', fontSize: 12.5, lineHeight: 1.55, color: '#121212',
      boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
    }}>
      {m.preview}
      {m.hasOffer && (
        <div style={{
          marginTop: 8, borderRadius: 6,
          background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.22)',
          padding: '6px 10px', fontSize: 11.5, fontWeight: 600, color: '#92400e',
        }}>
          🏷 {m.offerText}
        </div>
      )}
      <span style={{
        display: 'block', textAlign: 'right', fontFamily: 'ui-monospace, monospace',
        fontSize: 9.5, color: '#a09890', marginTop: 5,
      }}>
        {m.clockTime}
      </span>
    </div>
  )
}

/* One loop of the story the section describes: a shopper adds to cart, closes
   the app, sees the notification land on their home screen, and opens WhatsApp. */
export default function AbandonedCartDemo({
  messages,
  storefront = true,
}: {
  messages: RecoveryMessage[]
  /* false plays the chat half only, for a section that has already shown the store */
  storefront?: boolean
}) {
  const flow = useMemo(() => (storefront ? FLOW : []), [storefront])

  const chat = useMemo<ChatNode[]>(() => {
    const nodes: ChatNode[] = []
    messages.forEach((m, i) => {
      if (i > 0) nodes.push({ t: 'divider', ms: 800, text: `${m.timing} later` })
      nodes.push({ t: 'typing', ms: 650 })
      nodes.push({ t: 'msg', ms: 1500, m })
    })
    nodes.push({ t: 'cta', ms: 900 })
    return nodes
  }, [messages])

  const total = flow.length + chat.length
  const [stage, setStage] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced.current) setStage(total)
  }, [total])

  useEffect(() => {
    if (reduced.current) return
    const step = stage < flow.length ? flow[stage] : chat[stage - flow.length]
    const id = window.setTimeout(() => setStage(s => (s >= total ? 0 : s + 1)), step ? step.ms : HOLD_MS)
    return () => window.clearTimeout(id)
  }, [stage, chat, flow, total])

  if (stage < flow.length) {
    const view = flow[stage].view
    const closing = view === 'exit'

    if (view === 'home' || view === 'notify') {
      return (
        <PhoneFrame>
          <HomeScreen notification={view === 'notify'} />
        </PhoneFrame>
      )
    }

    return (
      <PhoneFrame>
        <div style={{ background: '#0b0a09' }}>
          <div style={{
            transformOrigin: '50% 62%',
            transform: closing ? 'scale(0.88)' : 'none',
            opacity: closing ? 0.12 : 1,
            transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease',
          }}>
            <StoreScreen view={view} />
          </div>
        </div>
      </PhoneFrame>
    )
  }

  const visible = chat.slice(0, stage - flow.length + 1)

  return (
    <PhoneFrame>
      <div className="wa-fade" key="chat">
        <WhatsAppScreen time={messages[0]?.clockTime ?? '10:15'} name="Kaya Wear" subtitle="Business account" avatarLetter="K" height={BODY_H} topFade>
          {visible.map((node, i) => {
            const isLast = i === visible.length - 1

            if (node.t === 'typing') {
              if (!isLast) return null
              return (
                <div key={i} className="wa-pop" style={{
                  display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content',
                  borderRadius: '16px 16px 16px 4px', background: '#fff', padding: '12px 14px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
                }}>
                  {[0, 1, 2].map(d => (
                    <span key={d} className="wa-dot" style={{ display: 'inline-block', height: 6, width: 6, borderRadius: '50%', background: '#b0a89a', animationDelay: `${d * 0.16}s` }} />
                  ))}
                </div>
              )
            }

            if (node.t === 'divider') {
              return (
                <div key={i} className="wa-fade" style={{
                  margin: '2px auto', borderRadius: 999, background: 'rgba(0,0,0,0.07)',
                  padding: '4px 12px', fontFamily: 'ui-monospace, monospace', fontSize: 10.5,
                  letterSpacing: '0.04em', color: 'rgba(18,18,18,0.5)',
                }}>
                  {node.text}
                </div>
              )
            }

            if (node.t === 'msg') return <Bubble key={i} m={node.m} />

            return (
              <div key={i} className="wa-pop" style={{
                borderRadius: 8, background: '#fff', textAlign: 'center', padding: '9px 12px',
                fontSize: 12.5, fontWeight: 500, color: '#027eb5', boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
              }}>
                Complete my order →
              </div>
            )
          })}
        </WhatsAppScreen>
      </div>
    </PhoneFrame>
  )
}
