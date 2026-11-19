'use client'

import Image from 'next/image'
import BoardWindow from './BoardWindow'
import ScaledCanvas from './ScaledCanvas'
import DashedPath from './DashedPath'
import IPhone, { IPHONE_RIM } from './IPhone'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { ExternalLink, Star } from 'lucide-react'

/* Fixed 1024×572 canvas, scaled to fit (see ScaledCanvas). Each step's message sits inside the
   phone at the same height as the step, so the connector runs straight across into the chat. */
const W = 1024
const H = 572
const EASE = [0.16, 1, 0.3, 1] as const
const STEP_GAP = 0.45

const CARD_X = 132
const CARD_W = 330
const CARD_H = 58
const DOT_X = 100
const FIRST_CENTER = 162
const PITCH = 78

// Chat area runs from y 122 to 500 (IPHONE_TOP/BOTTOM chrome), which all five step centres sit inside
const PHONE = { x: 620, y: 20, w: 282, h: 548 }
const BUBBLE_X = PHONE.x + IPHONE_RIM + 10
const BUBBLE_W = 218

type Step = {
  title: string
  time: string
  state: 'done' | 'current' | 'pending'
  message: string
  sentAt?: string
  link?: string
  button?: string
  stars?: boolean
}

const STEPS: Step[] = [
  { title: 'Order placed', time: '10:02 AM', state: 'done', sentAt: '10:02 AM', message: 'Hi Ananya, we got your order #4127 for ₹1,299. Reply YES to confirm COD.' },
  { title: 'COD confirmed', time: '10:05 AM', state: 'done', sentAt: '10:05 AM', message: "Confirmed. We'll pack it today." },
  { title: 'Shipped · Delhivery', time: 'Next day 2:14 PM', state: 'done', sentAt: '2:14 PM', message: 'Your order has shipped. Track it:', link: 'wa.link/track4127', button: 'Track order' },
  { title: 'Out for delivery', time: '9:30 AM', state: 'current', sentAt: '9:30 AM', message: 'Out for delivery today. Keep ₹1,299 ready, or pay by UPI.' },
  { title: 'Delivered', time: '(pending)', state: 'pending', message: 'Delivered. How did we do?', stars: true },
]

function Bubble({ step }: { step: Step }) {
  return (
    <>
      <span className="block px-2.5 pt-1.5">
        {step.message}
        {step.link && <> <span className="text-[#027eb5]">{step.link}</span></>}
      </span>
      {step.stars && (
        <span className="flex gap-0.5 px-2.5 pt-1 text-[#a1a1aa]">
          {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={12} strokeWidth={1.5} />)}
        </span>
      )}
      {step.sentAt ? (
        <span className="block px-2.5 pb-1 text-right text-[9.5px] text-[#8696a0]">{step.sentAt}</span>
      ) : (
        <span className="block pb-1.5" />
      )}
      {step.button && (
        <span className="flex items-center justify-center gap-1 border-t border-[#ececec] py-1.5 text-[12.5px] font-medium text-[#027eb5]">
          <ExternalLink size={11} /> {step.button}
        </span>
      )}
    </>
  )
}

export default function StoreBoard({ active = true }: { active?: boolean }) {
  const show = (delay: number, from: Record<string, number> = { opacity: 0, y: 8 }) => ({
    initial: false as const,
    animate: active ? { opacity: 1, x: 0, y: 0 } : from,
    transition: { delay: active ? delay : 0, duration: 0.45, ease: EASE },
  })

  const lastCenter = FIRST_CENTER + PITCH * (STEPS.length - 1)

  return (
    <LazyMotion features={domAnimation}>
      <BoardWindow title="Kaya Wear · Store automation">
        <div className="flex flex-1 flex-col justify-center bg-[#f4f6f8] text-[#121212]">
          <ScaledCanvas width={W} height={H}>
            <div className="relative h-full w-full">

              {/* Header: connected stores + the order this timeline follows */}
              <m.div {...show(0.05)} className="absolute left-[92px] top-[24px] flex h-[40px] items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-3 text-[12px] text-[#1a8a5a] shadow-sm">
                <Image src="/tools-logos/20-Shopify.svg" alt="" width={18} height={20} className="h-5 w-auto" />
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#22a861]" />Connected</span>
                <Image src="/services/whatsapp-automation/integrations/woocommerce.svg" alt="" width={53} height={11} className="ml-1 h-[11px] w-auto" />
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#22a861]" />Connected</span>
              </m.div>
              <m.h3 {...show(0.1)} className="absolute left-[92px] top-[76px] text-[24px] font-bold tracking-tight">
                Order #4127 · Ananya K. · ₹1,299 · COD
              </m.h3>

              {/* Phone: iOS WhatsApp chrome; the messages are placed over its chat area below */}
              <m.div
                {...show(0.15, { opacity: 0, y: 16 })}
                className="absolute"
                style={{ left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h }}
              >
                <IPhone time="9:30" name="Kaya Wear" avatarLetter="K" />
              </m.div>

              {/* Spine + connectors */}
              <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
                <DashedPath d={`M${DOT_X} ${FIRST_CENTER} V ${lastCenter}`} active={active} delay={0.3} duration={STEP_GAP * 4} ease="linear" strokeWidth={1.2} />
                {STEPS.map(({ title }, i) => {
                  const cy = FIRST_CENTER + i * PITCH
                  return (
                    <DashedPath
                      key={title}
                      d={`M${CARD_X + CARD_W} ${cy} H ${BUBBLE_X - 4}`}
                      active={active}
                      delay={0.45 + i * STEP_GAP}
                      duration={0.35}
                      dash="2 3"
                    />
                  )
                })}
              </svg>

              {STEPS.map((step, i) => {
                const { title, time, state } = step
                const cy = FIRST_CENTER + i * PITCH
                const delay = 0.3 + i * STEP_GAP
                const pending = state === 'pending'
                return (
                  <div key={title}>
                    {/* Dot: filled once the step happens, yellow for the live step, hollow while pending */}
                    <m.span
                      initial={false}
                      animate={active ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
                      transition={{ delay: active ? delay : 0, duration: 0.3, ease: [0.34, 1.6, 0.64, 1] }}
                      className={`absolute h-4 w-4 rounded-full ${
                        state === 'done' ? 'bg-[#1f2328]' : state === 'current' ? 'bg-(--color-accent)' : 'border-2 border-[#a1a1aa] bg-[#f4f6f8]'
                      }`}
                      style={{ left: DOT_X - 8, top: cy - 8 }}
                    />
                    {state === 'current' && active && (
                      <m.span
                        className="absolute h-4 w-4 rounded-full bg-(--color-accent)"
                        style={{ left: DOT_X - 8, top: cy - 8 }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{ delay: delay + 0.3, duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}

                    <m.div
                      {...show(delay, { opacity: 0, x: -10 })}
                      className={`absolute flex flex-col justify-center rounded-lg border bg-white px-4 ${
                        state === 'current' ? 'border-[#121212]/15 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]' : 'border-[#e4e4e7] shadow-sm'
                      } ${pending ? 'text-[#a1a1aa]' : ''}`}
                      style={{ left: CARD_X, top: cy - CARD_H / 2, width: CARD_W, height: CARD_H }}
                    >
                      <span className="text-[16px] font-semibold leading-tight">{title}</span>
                      <span className={`text-[13.5px] ${pending ? '' : 'text-[#52525b]'}`}>{time}</span>
                    </m.div>

                    {/* The WhatsApp message this step sent, centred on the step's line */}
                    <div className="absolute -translate-y-1/2" style={{ left: BUBBLE_X, top: cy, width: BUBBLE_W }}>
                      <m.div
                        initial={false}
                        animate={active ? { opacity: pending ? 0.5 : 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ delay: active ? delay + 0.2 : 0, duration: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
                        className={`origin-left overflow-hidden rounded-lg rounded-tl-none bg-white text-[12.5px] leading-snug text-[#111b21] ${
                          state === 'current' ? 'shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_22px_-8px_rgba(0,0,0,0.3)]' : 'shadow-[0_1px_1px_rgba(0,0,0,0.12)]'
                        }`}
                      >
                        <Bubble step={step} />
                      </m.div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScaledCanvas>
        </div>
      </BoardWindow>
    </LazyMotion>
  )
}
