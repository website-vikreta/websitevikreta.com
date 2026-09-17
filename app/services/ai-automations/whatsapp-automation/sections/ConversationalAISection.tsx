'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const BENEFITS = [
  'Answers product questions instantly, 24/7',
  'Recommends alternatives if an item is out of stock',
  'Captures leads and hands off complex queries to your team',
]

function ChatPhone() {
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
          <span>14:30</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {[8, 10, 12].map((h, i) => (
              <span key={i} style={{ display: 'inline-block', height: h, width: 3, borderRadius: 2, background: 'rgba(255,255,255,0.85)' }} />
            ))}
            <span style={{ marginLeft: 4, display: 'inline-block', height: 9, width: 18, borderRadius: 3, border: '1px solid rgba(255,255,255,0.55)' }} />
          </span>
        </div>

        {/* Chat header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#008069', padding: '4px 12px 10px',
        }}>
          <svg viewBox="0 0 24 24" width={15} height={15} style={{ flexShrink: 0, color: '#fff', opacity: 0.85 }}>
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
          </svg>
          <span style={{
            display: 'grid', height: 30, width: 30, flexShrink: 0,
            placeItems: 'center', borderRadius: '50%',
            background: '#c9a227', fontSize: '11px', fontWeight: 700, color: '#fff',
          }}>B</span>
          <span>
            <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
              Brand Bot
            </span>
            <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.2 }}>
              Always online
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
          height: 452,
          overflow: 'hidden',
          background: 'radial-gradient(circle at 1px 1px, rgba(20,18,15,0.045) 1px, transparent 0) 0 0 / 4px 4px',
        }}>
          
          <div style={{
            alignSelf: 'flex-end',
            maxWidth: '85%',
            borderRadius: '12px 12px 3px 12px',
            background: '#d9fdd3',
            padding: '10px 12px',
            fontSize: '12.5px',
            lineHeight: 1.5,
            color: '#111b21',
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
          }}>
            Do you have the Black Comfort Sneakers in size 9?
            <span style={{ display: 'block', textAlign: 'right', fontSize: '9px', color: 'rgba(0,0,0,0.45)', marginTop: '4px' }}>14:31</span>
          </div>

          <div style={{
            alignSelf: 'flex-start',
            maxWidth: '90%',
            borderRadius: '12px 12px 12px 3px',
            background: '#fff',
            padding: '10px 12px',
            fontSize: '12.5px',
            lineHeight: 1.5,
            color: '#111b21',
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
          }}>
            Hi! Yes, we have exactly 2 pairs left in Size 9. 👟<br/><br/>Would you like me to reserve a pair for you?
            <span style={{ display: 'block', textAlign: 'right', fontSize: '9px', color: 'rgba(0,0,0,0.45)', marginTop: '4px' }}>14:31</span>
          </div>
          
          <div style={{
            alignSelf: 'flex-end',
            maxWidth: '85%',
            borderRadius: '12px 12px 3px 12px',
            background: '#d9fdd3',
            padding: '10px 12px',
            fontSize: '12.5px',
            lineHeight: 1.5,
            color: '#111b21',
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
          }}>
            Yes please! How long does shipping take to Mumbai?
            <span style={{ display: 'block', textAlign: 'right', fontSize: '9px', color: 'rgba(0,0,0,0.45)', marginTop: '4px' }}>14:32</span>
          </div>

        </div>
      </div>
      </div>
    </div>
  )
}

export default function ConversationalAISection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#ai-heading', { trigger: scope.current })
    revealFadeUp('.ai-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.ai-benefit', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.ai-phone', { y: 30, trigger: scope.current })
  })

  return (
    <section ref={scope} id="conversational-ai" className="scroll-mt-32 border-y border-(--color-border) py-16 md:py-20" aria-labelledby="ai-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          
          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold text-(--color-accent)">
              Conversational AI Automation
            </p>
            <h2 id="ai-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              A salesperson that never sleeps.
            </h2>
            <p className="ai-intro mt-5 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
              Stop losing customers because they had a quick question at 2 AM. Our AI handles inquiries, recommends products, and acts as a concierge for your brand on autopilot.
            </p>
            
            <ul className="mt-10 flex flex-col gap-5">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="ai-benefit flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-accent) text-black">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-base text-(--color-text)">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="ai-phone flex items-center justify-center lg:justify-end">
            <ChatPhone />
          </div>
          
        </div>
      </div>
    </section>
  )
}
