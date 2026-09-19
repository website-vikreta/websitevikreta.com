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

type WhatsAppPhoneShellProps = {
  time: string
  name: string
  subtitle: string
  avatarLetter: string
  avatarColor?: string
  height?: number
  topFade?: boolean
  children: ReactNode
}

/* Shared WhatsApp chrome (frame, status bar, chat header, message canvas) reused
   by PhoneDemo, HeroJourneyPhone, CartRecoverySection's recovery phone, and
   ConversationalAISection's chat phone — each supplies its own message bubbles
   as children. */
export default function WhatsAppPhoneShell({
  time,
  name,
  subtitle,
  avatarLetter,
  avatarColor = '#c9a227',
  height = 452,
  topFade = false,
  children,
}: WhatsAppPhoneShellProps) {
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

          {/* Status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#008069', padding: '8px 14px 4px',
            fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.9)',
          }}>
            <span>{time}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              {[8, 10, 12].map((h, i) => (
                <span key={i} style={{ display: 'inline-block', height: h, width: 3, borderRadius: 2, background: i < 2 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }} />
              ))}
              <span style={{ marginLeft: 4, display: 'inline-block', height: 9, width: 18, borderRadius: 3, border: '1px solid rgba(255,255,255,0.55)' }} />
            </span>
          </div>

          {/* Chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#008069', padding: '4px 12px 10px' }}>
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

          {/* Messages area */}
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

        </div>
      </div>
    </div>
  )
}
