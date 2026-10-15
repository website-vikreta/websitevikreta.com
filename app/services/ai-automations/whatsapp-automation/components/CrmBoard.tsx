'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import BoardWindow from './BoardWindow'
import DashedPath from './DashedPath'
import { LazyMotion, domAnimation, m, type Variants } from 'motion/react'
import { Bell, ChevronDown, Check, Globe, MousePointer2 } from 'lucide-react'

const TAG = {
  IndiaMART: 'bg-[#fdc9a4] text-[#7c2d12]',
  'Meta Ads': 'bg-[#bfdbfe] text-[#1e3a8a]',
  Justdial: 'bg-[#fde68a] text-[#713f12]',
  Instagram: 'bg-[#f5c2ec] text-[#701a75]',
  Website: 'bg-[#99e0d3] text-[#134e4a]',
  WhatsApp: 'bg-[#a7f0c0] text-[#14532d]',
}

type Lead = {
  name: string
  tag: keyof typeof TAG
  need: string
  value?: string
  reminder?: string
  chip?: string
  paid?: boolean
  owner: { initial: string; bg: string }
}

const AARTI = { initial: 'A', bg: 'bg-[#c9a227]' }
const ROHAN = { initial: 'R', bg: 'bg-[#3f6b5a]' }
const MEERA = { initial: 'M', bg: 'bg-[#b5654a]' }

const SNEHA: Lead = { name: 'Sneha T.', tag: 'IndiaMART', need: 'Bulk order, 40 pcs', value: '₹48,000', reminder: 'Today 4 PM', owner: AARTI }
const VIKRAM: Lead = { name: 'Vikram R.', tag: 'Meta Ads', need: 'Linen Kurta', value: '₹1,599', owner: ROHAN }
const NEHA: Lead = { name: 'Neha P.', tag: 'Justdial', need: 'Store visit', reminder: 'Tomorrow 11 AM', owner: MEERA }
const RAHUL: Lead = { name: 'Rahul M.', tag: 'Instagram', need: 'Cotton Kurta x2', value: '₹2,598', owner: ROHAN }
const ANANYA: Lead = { name: 'Ananya K.', tag: 'Website', need: 'Order #4127', value: '₹1,299', chip: 'COD', owner: MEERA }
const PRIYA: Lead = { name: 'Priya S.', tag: 'WhatsApp', need: 'Order #4126', value: '₹2,450', paid: true, owner: AARTI }

const list: Variants = { hide: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const pop: Variants = {
  hide: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

function Card({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-semibold">{lead.name}</span>
        <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${TAG[lead.tag]}`}>{lead.tag}</span>
      </div>
      <span className="mt-1 block text-[12px] text-[#3f3f46]">{lead.need}</span>
      {lead.value && <span className="mt-1 block text-[13px] font-semibold">{lead.value}</span>}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 whitespace-nowrap text-[11px] text-[#71717a]">
          {lead.reminder && (<><Bell size={11} aria-hidden /> {lead.reminder}</>)}
          {lead.chip && <span className="rounded bg-[#f4f4f5] px-1.5 py-0.5 text-[10px] font-medium text-[#3f3f46]">{lead.chip}</span>}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white ${lead.owner.bg}`}>{lead.owner.initial}</span>
          {lead.paid && (
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1a8a5a] text-white"><Check size={10} strokeWidth={3} aria-hidden /></span>
          )}
        </span>
      </div>
    </div>
  )
}

function Column({ title, count, className = '', children }: { title: string; count: number; className?: string; children: ReactNode }) {
  return (
    <div className={`flex-col rounded-xl bg-[#e6e8eb] p-2 ${className}`}>
      <div className="mb-2 flex items-center justify-between px-1 pt-1">
        <span className="text-[13px] font-medium">{title}</span>
        <span className="rounded-full bg-[#d4d4d8] px-1.5 font-mono text-[10px] text-[#3f3f46]">{count}</span>
      </div>
      <m.div variants={list} className="flex flex-col gap-2">{children}</m.div>
    </div>
  )
}

/* Lead sources on the left, each feeding the New enquiry column through a dashed curve.
   Tiles are a fixed 40px on a 50px pitch so the curve start points can be hard-coded. */
const TILE_TOP = 64
const TILE_PITCH = 50
const CURVE_END = { x: 70, y: 112 }
const SOURCES: { key: string; node: ReactNode }[] = [
  { key: 'meta', node: <Image src="/tools-logos/26-Meta.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" /> },
  { key: 'indiamart', node: <span className="grid h-6 w-6 place-items-center rounded-full bg-[#d32f2f] text-[11px] font-bold text-white">M</span> },
  { key: 'justdial', node: <span className="text-[12px] font-extrabold tracking-tight"><span className="text-[#f58220]">J</span><span className="text-[#1a5fb4]">d</span></span> },
  { key: 'web', node: <Globe size={18} className="text-[#52525b]" /> },
]

export default function CrmBoard({ active = true }: { active?: boolean }) {
  const slotRef = useRef<HTMLDivElement>(null)
  const ananyaRef = useRef<HTMLDivElement>(null)
  // 0 = resting in Qualified, 1 = picked up and dragging, 2 = dropped in Order placed
  const [stage, setStage] = useState(0)
  const [drop, setDrop] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) return
    const t0 = window.setTimeout(() => setStage(0), 0)
    const t1 = window.setTimeout(() => {
      // Measure at drag time: the board may have been display:none (or a different width) when it activated
      const slot = slotRef.current?.getBoundingClientRect()
      const target = ananyaRef.current?.getBoundingClientRect()
      if (slot && target) setDrop({ x: target.left - slot.left, y: target.bottom + 8 - slot.top })
      setStage(1)
    }, 800)
    const t2 = window.setTimeout(() => setStage(2), 1650)
    return () => [t0, t1, t2].forEach((t) => window.clearTimeout(t))
  }, [active])

  const step = active ? stage : 0
  const landed = step === 2

  return (
    <LazyMotion features={domAnimation}>
      <BoardWindow title="Kaya Wear · CRM">
      <m.div
        initial="hide"
        animate={active ? 'show' : 'hide'}
        className="flex flex-1 flex-col bg-[#f1f2f4] text-[#121212]"
      >
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <span className="text-xl font-semibold tracking-tight">Leads</span>
          <span className="flex items-center gap-1 rounded-md border border-(--color-border) bg-white px-2.5 py-1 text-[12px]">
            This week <ChevronDown size={13} aria-hidden />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 gap-2 px-3 pb-3">
          {/* Lead sources */}
          <div className="relative hidden w-[70px] shrink-0 sm:block" aria-hidden>
            {SOURCES.map(({ key, node }, i) => (
              <m.span
                key={key}
                variants={pop}
                style={{ top: TILE_TOP + i * TILE_PITCH }}
                className="absolute left-0 grid h-10 w-10 place-items-center rounded-lg border border-(--color-border) bg-white"
              >
                {node}
              </m.span>
            ))}
            <svg className="absolute left-0 top-0 overflow-visible" width="70" height="300" viewBox="0 0 70 300">
              <defs>
                <marker id="crm-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L6 3 L0 6 Z" fill="#a1a1aa" />
                </marker>
              </defs>
              {SOURCES.map(({ key }, i) => {
                const y = TILE_TOP + 20 + i * TILE_PITCH
                return (
                  <DashedPath
                    key={key}
                    d={`M42 ${y} C 58 ${y}, 52 ${CURVE_END.y}, ${CURVE_END.x} ${CURVE_END.y}`}
                    active={active}
                    delay={0.3 + i * 0.1}
                    duration={0.6}
                    stroke="#a1a1aa"
                    markerEnd={i === 0 ? 'url(#crm-arrow)' : undefined}
                  />
                )
              })}
            </svg>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
            <Column title="New enquiry" count={12} className="hidden sm:flex">
              <m.div variants={pop}><Card lead={SNEHA} /></m.div>
              <m.div variants={pop}><Card lead={VIKRAM} /></m.div>
            </Column>

            <Column title="Qualified" count={landed ? 7 : 8} className="flex">
              <m.div variants={pop}><Card lead={NEHA} /></m.div>
              <m.div ref={slotRef} variants={pop} className="relative">
                {/* Dashed slot left behind while Rahul's card is in the air */}
                <span
                  className={`absolute inset-0 rounded-lg border-2 border-dashed border-[#c4c4cc] transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden
                />
                <m.div
                  className="relative z-10 rounded-lg"
                  animate={{
                    x: step === 0 ? 0 : step === 1 ? drop.x * 0.55 : drop.x,
                    y: step === 1 ? drop.y * 0.5 - 14 : landed ? drop.y : 0,
                    rotate: step === 1 ? -5 : 0,
                    scale: step === 1 ? 1.05 : 1,
                    boxShadow: step === 1 ? '0 0 0 2px #FFD600, 0 18px 30px -12px rgba(0,0,0,0.3)' : '0 0 0 0px #FFD600, 0 0 0 0 rgba(0,0,0,0)',
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                >
                  <Card lead={RAHUL} />
                  <m.span
                    className="absolute -bottom-3 right-2 text-[#121212]"
                    animate={{ opacity: step === 1 ? 1 : 0, scale: step === 1 ? 1 : 0.6 }}
                    aria-hidden
                  >
                    <MousePointer2 size={20} fill="white" strokeWidth={1.5} />
                  </m.span>
                </m.div>
              </m.div>
            </Column>

            <Column title="Order placed" count={landed ? 6 : 5} className="flex">
              <m.div ref={ananyaRef} variants={pop}><Card lead={ANANYA} /></m.div>
            </Column>

            <Column title="Paid" count={3} className="hidden sm:flex">
              <m.div variants={pop}><Card lead={PRIYA} /></m.div>
            </Column>
          </div>
        </div>
      </m.div>
      </BoardWindow>
    </LazyMotion>
  )
}
