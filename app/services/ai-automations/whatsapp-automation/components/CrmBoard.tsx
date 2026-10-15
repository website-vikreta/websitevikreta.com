'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
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
        <span className="flex items-center gap-1 text-[11px] text-[#71717a]">
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

function Column({ title, count, className = '', colRef, children }: { title: string; count: number; className?: string; colRef?: React.Ref<HTMLDivElement>; children: ReactNode }) {
  return (
    <div ref={colRef} className={`flex-col rounded-xl bg-[#e6e8eb] p-2 ${className}`}>
      <div className="mb-2 flex items-center justify-between px-1 pt-1">
        <span className="text-[13px] font-medium">{title}</span>
        <span className="rounded-full bg-[#d4d4d8] px-1.5 font-mono text-[10px] text-[#3f3f46]">{count}</span>
      </div>
      <m.div variants={list} className="flex flex-col gap-2">{children}</m.div>
    </div>
  )
}

/* Lead sources on the left, each feeding the New enquiry column through a dashed curve */
const SOURCES: { key: string; node: ReactNode; h: number }[] = [
  { key: 'meta', node: <Image src="/tools-logos/26-Meta.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />, h: 36 },
  { key: 'indiamart', node: <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d32f2f] text-[10px] font-bold text-white">M</span>, h: 36 },
  { key: 'justdial', node: <Image src="/services/whatsapp-automation/integrations/justdial.svg" alt="" width={60} height={16} className="h-auto w-14 max-w-none -rotate-90" />, h: 64 },
  { key: 'web', node: <Globe size={18} className="text-[#52525b]" />, h: 36 },
]

export default function CrmBoard({ active = true }: { active?: boolean }) {
  const qualifiedRef = useRef<HTMLDivElement>(null)
  const orderRef = useRef<HTMLDivElement>(null)
  // 0 = resting in Qualified, 1 = picked up and dragging, 2 = dropped in Order placed
  const [stage, setStage] = useState(0)
  const [dx, setDx] = useState(0)

  useEffect(() => {
    if (!active) return
    const t0 = window.setTimeout(() => setStage(0), 0)
    const t1 = window.setTimeout(() => {
      // Measure at drag time: the board may have been display:none (or a different width) when it activated
      const q = qualifiedRef.current, o = orderRef.current
      if (q && o) setDx(o.offsetLeft - q.offsetLeft)
      setStage(1)
    }, 1100)
    const t2 = window.setTimeout(() => setStage(2), 2300)
    return () => [t0, t1, t2].forEach((t) => window.clearTimeout(t))
  }, [active])

  const step = active ? stage : 0
  const landed = step === 2

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hide"
        animate={active ? 'show' : 'hide'}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-(--color-border) bg-[#f1f2f4] text-[#121212] shadow-[0_30px_60px_-30px_rgba(20,18,15,0.35)]"
      >
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <span className="text-xl font-semibold tracking-tight">Leads</span>
          <span className="flex items-center gap-1 rounded-md border border-(--color-border) bg-white px-2.5 py-1 text-[12px]">
            This week <ChevronDown size={13} aria-hidden />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 gap-2 px-3 pb-3">
          {/* Lead sources */}
          <div className="relative hidden w-16 shrink-0 sm:block" aria-hidden>
            <div className="absolute left-0 top-12 flex flex-col gap-3">
              {SOURCES.map(({ key, node, h }) => (
                <m.span
                  key={key}
                  variants={pop}
                  style={{ height: h }}
                  className="grid w-9 place-items-center overflow-hidden rounded-md border border-(--color-border) bg-white"
                >
                  {node}
                </m.span>
              ))}
            </div>
            <svg className="absolute left-0 top-0 overflow-visible" width="64" height="300" viewBox="0 0 64 300">
              {[66, 114, 176, 238].map((y, i) => (
                <m.path
                  key={y}
                  d={`M38 ${y} C 52 ${y}, 50 ${i < 2 ? 72 : 96}, 66 ${i < 2 ? 72 : 96}`}
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  variants={{ hide: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { delay: 0.3 + i * 0.1, duration: 0.6 } } }}
                />
              ))}
            </svg>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
            <Column title="New enquiry" count={12} className="hidden sm:flex">
              <m.div variants={pop}><Card lead={SNEHA} /></m.div>
              <m.div variants={pop}><Card lead={VIKRAM} /></m.div>
            </Column>

            <Column title="Qualified" count={landed ? 7 : 8} className="flex" colRef={qualifiedRef}>
              <m.div variants={pop}><Card lead={NEHA} /></m.div>
              <m.div variants={pop} className="relative">
                {/* Dashed slot left behind while Rahul's card is in the air */}
                <span
                  className={`absolute inset-0 rounded-lg border-2 border-dashed border-[#c4c4cc] transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden
                />
                <m.div
                  className="relative z-10 rounded-lg"
                  animate={{
                    x: step === 0 ? 0 : step === 1 ? dx * 0.55 : dx,
                    y: step === 1 ? -14 : landed ? 0 : 0,
                    rotate: step === 1 ? -5 : 0,
                    scale: step === 1 ? 1.05 : 1,
                    boxShadow: step === 1 ? '0 0 0 2px #FFD600, 0 18px 30px -12px rgba(0,0,0,0.3)' : '0 0 0 0px #FFD600, 0 0 0 0 rgba(0,0,0,0)',
                  }}
                  transition={{ type: 'spring', stiffness: 160, damping: 20 }}
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

            <Column title="Order placed" count={landed ? 6 : 5} className="flex" colRef={orderRef}>
              <m.div variants={pop}><Card lead={ANANYA} /></m.div>
            </Column>

            <Column title="Paid" count={3} className="hidden sm:flex">
              <m.div variants={pop}><Card lead={PRIYA} /></m.div>
            </Column>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  )
}
