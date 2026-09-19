'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import WhatsAppPhoneShell from '../components/WhatsAppPhoneShell'

const BENEFITS = [
  'Answers product questions instantly, 24/7',
  'Recognizes hot keywords like product names and colours to start the right conversation',
  'Captures leads and hands off complex queries to your team',
]

function ChatPhone() {
  return (
    <WhatsAppPhoneShell time="14:30" name="Brand Bot" subtitle="Always online" avatarLetter="B">
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
    </WhatsAppPhoneShell>
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
            <h2 id="ai-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              A salesperson that never sleeps.
            </h2>
            <p className="ai-intro mt-5 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
              Stop losing customers because they had a quick question at 2 AM. Our AI handles inquiries, guides them to the right product, and acts as a concierge for your brand on autopilot.
            </p>
            
            <ul className="mt-10 flex flex-col gap-5">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="ai-benefit flex items-start gap-3">
                  <Check size={16} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
                  <span className="text-base text-(--color-text)">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <p className="ai-benefit mt-6 text-sm leading-relaxed text-(--color-text-muted)">
              <span className="font-mono text-xs text-(--color-text-faint)">Example: </span>
              Someone types &quot;kurta&quot; or &quot;black t-shirts&quot;. The keyword is recognized and the right product conversation starts automatically, no typing a menu number.
            </p>
          </div>

          {/* Visual */}
          <div className="ai-phone flex items-center justify-center lg:justify-start">
            <ChatPhone />
          </div>
          
        </div>
      </div>
    </section>
  )
}
