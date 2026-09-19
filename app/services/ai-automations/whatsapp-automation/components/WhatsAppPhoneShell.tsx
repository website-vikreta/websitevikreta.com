'use client'

import type { ReactNode } from 'react'

/* Blue double-check ticks, shared by any outbound bubble across the phone mockups */
export function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width={16} height={11} style={{ flexShrink: 0, color: '#4fc3f7' }}>
      <path fill="currentColor" d="M11.07.65 5.4 6.32 3.6 4.5l-.9.9 2.7 2.7 6.57-6.57zM15.35.65 9.68 6.32l-.72-.72-.9.9 1.62 1.62L15.35 1.55z" />
      <path fill="currentColor" d="m.65 5.4 2.7 2.7.9-.9-2.7-2.7z" />
    </svg>
  )
}

/* Bubble/tap keyframes, injected once for every phone mockup that imports this
   shell — PhoneDemo, HeroJourneyPhone, AbandonedCartDemo all rely on them. */
const STYLE_ID = 'wa-phone-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    @keyframes waPop {
      from { opacity:0; transform:scale(0.93) translateY(7px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }
    @keyframes waFade { from{opacity:0} to{opacity:1} }
    @keyframes waDot {
      0%,60%,100% { transform:translateY(0);   opacity:.35; }
      30%          { transform:translateY(-4px); opacity:1; }
    }
    @keyframes waTap {
      from { opacity:0.9; transform:scale(0.4); }
      to   { opacity:0;   transform:scale(1.9); }
    }
    .wa-pop  { animation: waPop  0.24s cubic-bezier(0.34,1.56,0.64,1) both; }
    .wa-fade { animation: waFade 0.32s ease both; }
    .wa-dot  { animation: waDot  1.2s  ease-in-out infinite; }
    .wa-tap  { animation: waTap  0.5s  ease-out both; }
    @media (prefers-reduced-motion:reduce) {
      .wa-pop, .wa-fade, .wa-tap { animation:none!important; opacity:1!important; }
    }
  `
  document.head.appendChild(s)
}

export const PHONE_STATUS_H = 26
export const PHONE_HEADER_H = 44

/* Phone bezel. Any screen rendered inside it must add up to the same height,
   or the frame jumps when one screen swaps for another. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 330, width: '100%', margin: '0 auto' }}>
      <div style={{
        borderRadius: '2.4rem',
        border: '1px solid rgba(0,0,0,0.1)',
        background: '#1a1a1a',
        padding: 10,
        boxShadow: '0 40px 80px -30px rgba(20,18,15,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset',
      }}>
        <div style={{ overflow: 'hidden', borderRadius: '1.9rem', background: '#efe7de' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function PhoneStatusBar({
  time,
  background = '#008069',
  color = 'rgba(255,255,255,0.9)',
  bars = '255,255,255',
}: {
  time: string
  background?: string
  color?: string
  /* rgb triple for the signal bars and battery outline */
  bars?: string
}) {
  return (
    <div style={{
      display: 'flex', height: PHONE_STATUS_H, justifyContent: 'space-between', alignItems: 'center',
      background, padding: '0 14px',
      fontFamily: 'ui-monospace, monospace', fontSize: '10px', color,
    }}>
      <span>{time}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {[8, 10, 12].map((h, i) => (
          <span key={i} style={{ display: 'inline-block', height: h, width: 3, borderRadius: 2, background: `rgba(${bars},${i < 2 ? 0.85 : 0.35})` }} />
        ))}
        <span style={{ marginLeft: 4, display: 'inline-block', height: 9, width: 18, borderRadius: 3, border: `1px solid rgba(${bars},0.55)` }} />
      </span>
    </div>
  )
}

type WhatsAppScreenProps = {
  time: string
  name: string
  subtitle: string
  avatarLetter: string
  avatarColor?: string
  height?: number
  topFade?: boolean
  children: ReactNode
}

/* WhatsApp chrome (status bar, chat header, message canvas). Bubbles come in as
   children from PhoneDemo, HeroJourneyPhone, AbandonedCartDemo. */
export function WhatsAppScreen({
  time,
  name,
  subtitle,
  avatarLetter,
  avatarColor = '#c9a227',
  height = 452,
  topFade = false,
  children,
}: WhatsAppScreenProps) {
  return (
    <>
      <PhoneStatusBar time={time} />

      <div style={{ display: 'flex', height: PHONE_HEADER_H, alignItems: 'center', gap: '8px', background: '#008069', padding: '0 12px' }}>
        <svg viewBox="0 0 24 24" width={15} height={15} style={{ flexShrink: 0, color: '#fff', opacity: 0.85 }}>
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
        </svg>
        <span style={{
          display: 'grid', height: 30, width: 30, flexShrink: 0,
          placeItems: 'center', borderRadius: '50%',
          background: avatarColor, fontSize: '11px', fontWeight: 700, color: '#fff',
        }}>
          {avatarLetter}
        </span>
        <span>
          <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
            {name}
          </span>
          <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.2 }}>
            {subtitle}
          </span>
        </span>
      </div>

      <div style={{
        position: 'relative',
        padding: '12px 10px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '8px',
        height,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 1px 1px, rgba(20,18,15,0.045) 1px, transparent 0) 0 0 / 4px 4px',
      }}>
        {topFade && (
          <span aria-hidden style={{
            pointerEvents: 'none', position: 'absolute', inset: '0 0 auto 0',
            height: 36, zIndex: 10,
            background: 'linear-gradient(to bottom, #efe7de, transparent)',
          }} />
        )}
        {children}
      </div>
    </>
  )
}

export default function WhatsAppPhoneShell(props: WhatsAppScreenProps) {
  return (
    <PhoneFrame>
      <WhatsAppScreen {...props} />
    </PhoneFrame>
  )
}
