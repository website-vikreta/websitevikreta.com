'use client'

import type { ReactNode } from 'react'
import BoardWindow from './BoardWindow'
import ScaledCanvas from './ScaledCanvas'
import IPhone from './IPhone'
import { Ticks } from './WhatsAppPhoneShell'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { CalendarClock, Check, ExternalLink, Tag, X } from 'lucide-react'

/* Same approach as FlowBoard: the reference image's 1024×572 coordinates, scaled to fit. */
const W = 1024
const H = 572
const EASE = [0.16, 1, 0.3, 1] as const


const RESULTS = [
  { label: 'Sent', value: '2,140', pct: 100, share: '100%', color: '#3f4448' },
  { label: 'Delivered', value: '2,096', pct: 97, share: '~97%', color: '#6b7075' },
  { label: 'Read', value: '1,804', pct: 84, share: '~84%', color: '#a3a7ab' },
  { label: 'Replied', value: '312', pct: 14, share: '~14%', color: '#FFD600' },
]

function Card({ x, y, w, h, delay, active, children }: { x: number; y: number; w: number; h: number; delay: number; active: boolean; children: ReactNode }) {
  return (
    <m.div
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: active ? delay : 0, duration: 0.5, ease: EASE }}
      className="absolute rounded-lg border border-[#d4d4d8] bg-white px-4 py-3"
      style={{ left: x, top: y, width: w, height: h }}
    >
      {children}
    </m.div>
  )
}

const label = 'block text-[15px] text-[#3f3f46]'
const chip = 'inline-flex items-center gap-1.5 rounded-md bg-[#f1f1f3] px-2 py-0.5'

export default function CampaignBoard({ active = true }: { active?: boolean }) {
  return (
    <LazyMotion features={domAnimation}>
      <BoardWindow title="Kaya Wear · Campaigns">
        <div
          className="flex flex-1 flex-col justify-center bg-[#f7f7f5] text-[#121212]"
        >
          <ScaledCanvas width={W} height={H}>
            <div className="relative h-full w-full">
              <m.h3
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: active ? 0.05 : 0, duration: 0.5, ease: EASE }}
                className="absolute left-[52px] top-[40px] text-[31px] font-bold tracking-tight"
              >
                Campaign: Diwali Edit 2026
              </m.h3>

              <Card x={52} y={104} w={352} h={76} delay={0.15} active={active}>
                <span className={label}>Template</span>
                <span className="mt-1 flex items-center gap-2 text-[17px]">
                  diwali_edit_launch
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#d6f5dd] px-2 py-0.5 text-[12px] text-[#1a7a3a]">
                    <Check size={12} strokeWidth={2.5} /> Approved by Meta
                  </span>
                </span>
              </Card>

              <Card x={416} y={104} w={214} h={76} delay={0.22} active={active}>
                <span className={label}>Category</span>
                <span className={`${chip} mt-1 text-[17px]`}><Tag size={15} /> Marketing</span>
              </Card>

              <Card x={52} y={192} w={578} h={76} delay={0.29} active={active}>
                <div className="flex justify-between">
                  <div>
                    <span className="flex items-center gap-[110px]">
                      <span className={label}>Audience</span>
                      <span className="rounded-md bg-[#f1f1f3] px-2 py-0.5 text-[12px] font-semibold">2,140 contacts</span>
                    </span>
                    <span className="mt-1 block text-[17px]">Opted-in customers · Bought in last 90 days</span>
                  </div>
                  <div>
                    <span className={label}>Scheduled</span>
                    <span className={`${chip} mt-1 text-[17px]`}><CalendarClock size={15} /> 18 Oct, 7:00 PM</span>
                  </div>
                </div>
              </Card>

              <Card x={52} y={305} w={578} h={222} delay={0.4} active={active}>
                <span className="block text-[18px] font-semibold">Campaign Results</span>
                <div className="mt-4 flex flex-col gap-[15px]">
                  {RESULTS.map(({ label: name, value, pct, share, color }, i) => (
                    <div key={name} className="flex items-center gap-3 text-[17px]">
                      <span className="w-[86px]">{name}</span>
                      <span className="w-[54px] text-right tabular-nums">{value}</span>
                      <span className="relative h-[26px] flex-1 overflow-hidden rounded-md bg-[#e7e7ea]">
                        <m.span
                          className="absolute inset-y-0 left-0 rounded-md"
                          style={{ background: color }}
                          initial={false}
                          animate={{ width: active ? `${pct}%` : '0%' }}
                          transition={{ delay: active ? 0.7 + i * 0.15 : 0, duration: 0.9, ease: EASE }}
                        />
                      </span>
                      <span className="w-[50px] text-right text-[15px] tabular-nums text-[#3f3f46]">{share}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Phone preview of the template as the customer sees it */}
              <m.div
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: active ? 0.3 : 0, duration: 0.6, ease: EASE }}
                className="absolute left-[700px] top-[18px] h-[522px] w-[268px]"
              >
                <IPhone time="7:00" name="Kaya Wear" avatarLetter="K">
                    <span className="mx-auto rounded-md bg-white/80 px-2 py-0.5 text-[9.5px] text-[#54656f] shadow-sm">Today</span>

                    {/* Template message, as Meta renders it: media header, body, footer, then button rows */}
                    <m.div
                      initial={false}
                      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ delay: active ? 1.0 : 0, duration: 0.45, ease: [0.34, 1.4, 0.64, 1] }}
                      className="w-[88%] origin-bottom-left"
                    >
                      <div className="rounded-lg rounded-tl-none bg-white p-1 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                        <div className="grid h-[104px] place-items-center rounded-md bg-[#c9cbcd] font-serif text-[22px] leading-[1.05] text-[#4b5563]">
                          <span className="text-center">Diwali<br />Edit</span>
                        </div>
                        <p className="px-1.5 pt-1.5 text-[11.5px] leading-snug text-[#111b21]">
                          Hi Priya, our Diwali Edit is live. Handblock kurtas and co-ord sets, new this week.
                        </p>
                        <span className="flex items-end justify-between px-1.5 pb-0.5 pt-1">
                          <span className="text-[9.5px] text-[#8696a0]">Kaya Wear</span>
                          <span className="text-[9px] text-[#8696a0]">7:00 PM</span>
                        </span>
                      </div>
                      <span className="mt-0.5 flex items-center justify-center gap-1 rounded-lg bg-white py-1.5 text-[11.5px] font-medium text-[#027eb5] shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                        <ExternalLink size={11} /> Shop the edit
                      </span>
                      <span className="mt-0.5 flex items-center justify-center gap-1 rounded-lg bg-white py-1.5 text-[11.5px] font-medium text-[#027eb5] shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                        <X size={11} /> Stop promotions
                      </span>
                    </m.div>

                    {/* Priya taps the button: it comes back as her reply */}
                    <m.div
                      initial={false}
                      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ delay: active ? 1.9 : 0, duration: 0.35, ease: [0.34, 1.4, 0.64, 1] }}
                      className="ml-auto flex origin-bottom-right items-end gap-1.5 rounded-lg rounded-tr-none bg-[#d9fdd3] px-2 py-1 text-[11.5px] text-[#111b21] shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
                    >
                      Shop the edit
                      <span className="flex items-center gap-0.5 text-[9px] text-[#8696a0]">7:02 PM <Ticks /></span>
                    </m.div>
                </IPhone>
              </m.div>

              <span className="absolute left-[700px] top-[548px] w-[268px] text-center text-[11px] text-[#71717a]">
                Order updates sent as Utility messages
              </span>
            </div>
          </ScaledCanvas>
        </div>
      </BoardWindow>
    </LazyMotion>
  )
}
