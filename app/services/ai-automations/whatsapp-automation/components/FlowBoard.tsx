'use client'

import type { ReactNode } from 'react'
import BoardWindow from './BoardWindow'
import ScaledCanvas from './ScaledCanvas'
import DashedPath from './DashedPath'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { ArrowLeft, CheckCircle2, Clock, Footprints, Maximize, Minus, Plus, QrCode, Shirt } from 'lucide-react'

/* Everything is laid out on a fixed 1024×572 canvas (the reference image's own coordinates)
   and scaled to the board's width, so nodes and wires line up exactly at any size. */
const W = 1024
const H = 572

const EASE = [0.16, 1, 0.3, 1] as const
// Scales every delay and draw time below, so the flow's pacing can be tuned in one place
const SPEED = 0.65

function Node({
  x, y, w, title, color, delay, active, children,
}: { x: number; y: number; w: number; title: ReactNode; color: string; delay: number; active: boolean; children: ReactNode }) {
  return (
    <m.div
      initial={false}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
      transition={{ delay: active ? delay * SPEED : 0, duration: 0.45, ease: EASE }}
      className="absolute overflow-hidden rounded-md border border-black/10 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
      style={{ left: x, top: y, width: w }}
    >
      <div className="px-2.5 py-1.5 text-[12px] font-medium leading-tight text-white" style={{ background: color }}>
        {title}
      </div>
      <div className="p-2">{children}</div>
    </m.div>
  )
}

/* Dashed wire between two ports, with a coloured dot at each end */
function Wire({ from, to, delay, active, fromColor, toColor }: {
  from: [number, number]; to: [number, number]; delay: number; active: boolean; fromColor: string; toColor: string
}) {
  const [x1, y1] = from
  const [x2, y2] = to
  const mid = (x1 + x2) / 2
  return (
    <g>
      <DashedPath d={`M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} active={active} delay={delay * SPEED} duration={0.5 * SPEED} stroke="#52525b" />
      {([[x1, y1, fromColor, 0], [x2, y2, toColor, 0.45]] as const).map(([cx, cy, fill, lag]) => (
        <m.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          fill={fill}
          stroke="white"
          strokeWidth="1"
          initial={false}
          animate={active ? { opacity: 1, r: 3.5 } : { opacity: 0, r: 0 }}
          transition={{ delay: active ? (delay + lag) * SPEED : 0, duration: 0.2, ease: 'easeOut' }}
        />
      ))}
    </g>
  )
}

const C = {
  trigger: '#22a861',
  menu: '#4f6bd8',
  arrivals: '#1e88e5',
  form: '#16968a',
  reminder: '#8e959e',
  kurtas: '#ec6a1c',
  address: '#1976d2',
  payment: '#2fa84f',
  confirm: '#3a9e8c',
}

function Thumb({ icon, caption, price }: { icon: ReactNode; caption?: string; price?: string }) {
  return (
    <div className="flex-1">
      <div className="grid h-10 place-items-center rounded bg-[#e5e7eb] text-[#6b7280]">{icon}</div>
      {caption ? (
        <span className="mt-1 block text-[8px] leading-tight text-[#3f3f46]">{caption}<br />{price}</span>
      ) : (
        <span className="mt-1 block rounded border border-[#e5e7eb] text-center text-[8px] leading-[14px] text-[#3f3f46]">Buy now</span>
      )}
    </div>
  )
}

const pill = 'rounded-md border border-[#d4d4d8] bg-white py-1 text-center text-[11px] text-[#27272a]'

export default function FlowBoard({ active = true }: { active?: boolean }) {
  return (
    <LazyMotion features={domAnimation}>
      <BoardWindow title="Kaya Wear · Flow builder">
      <div
        className="flex flex-1 flex-col justify-center bg-[#f6f5f1] text-[#121212]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.13) 1px, transparent 0)', backgroundSize: '14px 14px' }}
      >
        <ScaledCanvas width={W} height={H}>
          <div className="relative h-full w-full">

            {/* Top bar */}
            <div className="absolute left-4 top-3 flex items-center overflow-hidden rounded-md border border-black/10 bg-white text-[14px] shadow-sm">
              <span className="border-r border-black/10 px-3 py-2"><ArrowLeft size={16} /></span>
              <span className="px-3 py-2">Flow: Kaya Wear sales bot</span>
            </div>
            <div className="absolute right-4 top-3 flex items-center gap-2 rounded-md bg-[#18181b] px-3 py-2 text-[14px] text-white">
              Live
              <span className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${active ? 'bg-(--color-accent)' : 'bg-[#52525b]'}`}>
                <m.span
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-[#18181b]"
                  initial={false}
                  animate={{ left: active ? 18 : 2 }}
                  transition={{ delay: active ? 2.4 * SPEED : 0, type: 'spring', stiffness: 400, damping: 28 }}
                />
              </span>
            </div>

            {/* Zoom controls + minimap (static chrome) */}
            <div className="absolute right-4 top-16 flex flex-col overflow-hidden rounded-md border border-black/10 bg-white text-[#3f3f46]">
              <span className="border-b border-black/10 p-1.5"><Plus size={14} /></span>
              <span className="p-1.5"><Minus size={14} /></span>
            </div>
            <span className="absolute right-4 top-[128px] rounded-md border border-black/10 bg-white p-1.5 text-[#3f3f46]"><Maximize size={14} /></span>
            <div className="absolute bottom-3 right-4 h-[72px] w-[104px] rounded-md border border-black/10 bg-white p-1.5">
              <div className="relative h-full w-full rounded-sm bg-[#f4f4f5]">
                {[[8, 22, '#22a861'], [26, 8, '#4f6bd8'], [44, 8, '#1e88e5'], [62, 18, '#16968a'], [80, 22, '#8e959e'], [26, 40, '#ec6a1c'], [44, 40, '#1976d2'], [62, 40, '#2fa84f'], [80, 40, '#3a9e8c']].map(([l, t, c]) => (
                  <span key={`${l}-${t}`} className="absolute h-2 w-3 rounded-[1px]" style={{ left: `${l}%`, top: `${t}%`, background: c as string }} />
                ))}
              </div>
            </div>

            {/* Wires */}
            <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
              <Wire from={[195, 285]} to={[272, 183]} delay={0.4} active={active} fromColor={C.trigger} toColor={C.menu} />
              <Wire from={[410, 183]} to={[457, 168]} delay={0.95} active={active} fromColor={C.menu} toColor={C.arrivals} />
              <Wire from={[597, 168]} to={[644, 276]} delay={1.35} active={active} fromColor={C.arrivals} toColor={C.form} />
              <Wire from={[782, 276]} to={[821, 276]} delay={1.75} active={active} fromColor={C.form} toColor={C.reminder} />
              <Wire from={[195, 316]} to={[272, 420]} delay={0.5} active={active} fromColor={C.trigger} toColor={C.kurtas} />
              <Wire from={[437, 420]} to={[470, 420]} delay={1.05} active={active} fromColor={C.kurtas} toColor={C.address} />
              <Wire from={[605, 420]} to={[642, 420]} delay={1.45} active={active} fromColor={C.address} toColor={C.payment} />
              <Wire from={[776, 420]} to={[813, 420]} delay={1.85} active={active} fromColor={C.payment} toColor={C.confirm} />
            </svg>

            {/* Nodes, in the order a conversation reaches them */}
            <Node x={58} y={237} w={137} color={C.trigger} delay={0.1} active={active}
              title={<span className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" /></svg>Trigger: keyword</span>}>
              <div className="flex flex-col gap-1.5">
                <span className="rounded-full bg-[#f4f4f5] px-3 py-1 text-[12px]">hi</span>
                <span className="rounded-full bg-[#f4f4f5] px-3 py-1 text-[12px]">kurta</span>
              </div>
            </Node>

            <Node x={272} y={113} w={138} color={C.menu} delay={0.7} active={active} title="Send menu">
              <div className="flex flex-col gap-1.5">
                <span className={pill}>Shop collections</span>
                <span className={pill}>Track order</span>
                <span className={pill}>Talk to us</span>
              </div>
            </Node>

            <Node x={457} y={113} w={140} color={C.arrivals} delay={1.1} active={active} title="Carousel: New arrivals">
              <div className="flex gap-1.5">
                <Thumb icon={<Shirt size={18} />} />
                <Thumb icon={<Footprints size={18} />} />
                <Thumb icon={<Shirt size={18} />} />
              </div>
            </Node>

            <Node x={644} y={198} w={138} color={C.form} delay={1.5} active={active} title={<>WhatsApp form:<br />Book appointment</>}>
              <div className="flex flex-col gap-1.5">
                {['Name', 'Date', 'Time'].map((f) => (
                  <span key={f} className="rounded border border-[#d4d4d8] px-2 py-1 text-[11px] text-[#71717a]">{f}</span>
                ))}
              </div>
            </Node>

            <Node x={821} y={237} w={146} color={C.reminder} delay={1.9} active={active} title="Reminder: 1 day before">
              <div className="grid h-7 place-items-center text-[#71717a]"><Clock size={18} /></div>
            </Node>

            <Node x={272} y={371} w={165} color={C.kurtas} delay={0.8} active={active} title="Carousel: Kurtas">
              <div className="flex gap-1.5">
                <Thumb icon={<Shirt size={18} />} caption="Cotton Kurta" price="₹1,299" />
                <Thumb icon={<Shirt size={18} />} caption="Linen Kurta" price="₹1,599" />
                <Thumb icon={<Shirt size={18} />} caption="Printed Kurta" price="₹999" />
              </div>
            </Node>

            <Node x={470} y={371} w={135} color={C.address} delay={1.2} active={active} title="Collect address">
              <span className="block text-[12px] leading-snug">Request customer address</span>
            </Node>

            <Node x={642} y={371} w={134} color={C.payment} delay={1.6} active={active} title="Payment link">
              <div className="grid h-9 place-items-center"><QrCode size={30} strokeWidth={1.5} /></div>
            </Node>

            <Node x={813} y={371} w={134} color={C.confirm} delay={2.0} active={active} title="Send confirmation">
              <div className="flex flex-col items-center gap-0.5 text-[12px]">
                <CheckCircle2 size={16} className="text-[#2fa84f]" />
                Order confirmed
              </div>
            </Node>
          </div>
        </ScaledCanvas>
      </div>
      </BoardWindow>
    </LazyMotion>
  )
}
