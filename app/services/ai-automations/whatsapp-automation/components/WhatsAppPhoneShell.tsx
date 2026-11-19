'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { BadgeCheck, Camera, ChevronLeft, EllipsisVertical, Mic, Paperclip, Smile, Wifi } from 'lucide-react'

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

export const PHONE_STATUS_H = 44 // iOS status bar, tall enough to clear the Dynamic Island
export const PHONE_HEADER_H = 48
export const PHONE_INPUT_H = 56 // message bar + room for the home indicator
export const PHONE_RIM = 10 // titanium edge (3) + black bezel (7)
// Height below the chat header. Every page phone uses this so they all match the hero's iPhone
export const PHONE_BODY_H = 452

/* iPhone frame: titanium rim, bezel, Dynamic Island, side buttons, home indicator.
   Any screen rendered inside it must add up to the same height, or the frame jumps when one
   screen swaps for another. `fill` makes it fill its parent instead of the default 330px column. */
export function PhoneFrame({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <div className={fill ? 'h-full w-full' : 'mx-auto w-full max-w-[330px]'}>
      <div className="relative h-full rounded-[54px] bg-[linear-gradient(145deg,#8a8a8e,#3a3a3c_30%,#636366_55%,#2c2c2e_80%,#8a8a8e)] p-[3px] shadow-[0_40px_80px_-30px_rgba(20,18,15,0.5),0_0_0_0.5px_rgba(0,0,0,0.4)]">
        <span aria-hidden className="absolute -left-[3px] top-[100px] h-6 w-[3px] rounded-l-sm bg-[#4a4a4c]" />
        <span aria-hidden className="absolute -left-[3px] top-[140px] h-11 w-[3px] rounded-l-sm bg-[#4a4a4c]" />
        <span aria-hidden className="absolute -left-[3px] top-[192px] h-11 w-[3px] rounded-l-sm bg-[#4a4a4c]" />
        <span aria-hidden className="absolute -right-[3px] top-[156px] h-16 w-[3px] rounded-r-sm bg-[#4a4a4c]" />
        <div className="h-full rounded-[51px] bg-black p-[7px]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[44px] bg-[#efe7de]">
            <span aria-hidden className="absolute left-1/2 top-[10px] z-20 h-[24px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
            {children}
            <span aria-hidden className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-black/85" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* iOS status bar. `color` tints the time and icons; `bars` is kept as the rgb triple older
   callers pass for the signal bars and battery. */
export function PhoneStatusBar({
  time,
  background = '#f7f7f7',
  color = '#111',
  bars = '0,0,0',
}: {
  time: string
  background?: string
  color?: string
  bars?: string
}) {
  const ink = `rgb(${bars})`
  return (
    <div
      className="flex shrink-0 items-center justify-between px-5 pt-1 text-[13px] font-semibold"
      style={{ height: PHONE_STATUS_H, background, color }}
    >
      <span>{time}</span>
      <span className="flex items-center gap-1" style={{ color: ink }}>
        <span className="flex items-end gap-[1.5px]">
          {[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-[1px]" style={{ height: h, background: ink }} />)}
        </span>
        <Wifi size={13} strokeWidth={2.5} />
        <span className="relative ml-0.5 h-[11px] w-[22px] rounded-[3.5px] border p-[1.5px]" style={{ borderColor: `rgba(${bars},0.4)` }}>
          <span className="block h-full w-[75%] rounded-[1.5px]" style={{ background: ink }} />
        </span>
      </span>
    </div>
  )
}

/* WhatsApp (iOS) chat header */
export function ChatHeader({ name, subtitle, avatarLetter, avatarColor = '#c9a227' }: { name: string; subtitle?: string; avatarLetter: string; avatarColor?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.06] bg-[#f7f7f7] px-2.5" style={{ height: PHONE_HEADER_H }}>
      <ChevronLeft size={20} className="text-[#111b21]" />
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: avatarColor }}>
        {avatarLetter}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-center gap-1 text-[14px] font-semibold text-[#111b21]">
          {name}
          <BadgeCheck size={15} className="shrink-0 fill-[#25d366] text-white" />
        </span>
        {subtitle && <span className="block truncate text-[10.5px] text-[#667781]">{subtitle}</span>}
      </span>
      <EllipsisVertical size={17} className="text-[#111b21]" />
    </div>
  )
}

/* WhatsApp (iOS) message bar, with room underneath for the frame's home indicator */
export function MessageBar() {
  return (
    <div className="shrink-0 bg-[#f7f7f7] px-2.5 pt-1.5" style={{ height: PHONE_INPUT_H }}>
      <div className="flex h-[34px] items-center gap-2">
        <span className="flex h-full flex-1 items-center gap-2 rounded-full bg-white px-2.5 text-[12px] text-[#8696a0] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)]">
          <Smile size={15} className="text-[#54656f]" />
          <span className="flex-1">Message</span>
          <Paperclip size={14} className="text-[#54656f]" />
          <Camera size={15} className="text-[#54656f]" />
        </span>
        <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#00a884] text-white">
          <Mic size={16} />
        </span>
      </div>
    </div>
  )
}

const CHAT_BG = 'radial-gradient(circle at 1px 1px, rgba(20,18,15,0.05) 1px, transparent 0) 0 0 / 5px 5px, #efe7de'

type WhatsAppScreenProps = {
  time: string
  name: string
  subtitle: string
  avatarLetter: string
  avatarColor?: string
  /* Height below the chat header (chat + message bar), so screens swapped in the same frame line up */
  height?: number
  topFade?: boolean
  /* Older messages glide up as new ones arrive, instead of jumping (the chat always stays pinned to the newest) */
  smoothScroll?: boolean
  children: ReactNode
}

/* iOS WhatsApp screen: status bar, chat header, message canvas, message bar. Bubbles come in as
   children from HeroJourneyPhone, AbandonedCartDemo, ConversationalAISection. */
export function WhatsAppScreen({
  time,
  name,
  subtitle,
  avatarLetter,
  avatarColor,
  height = PHONE_BODY_H,
  topFade = false,
  smoothScroll = false,
  children,
}: WhatsAppScreenProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const inner = innerRef.current
    if (!box || !inner) return
    const glide = smoothScroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ro = new ResizeObserver(() => box.scrollTo({ top: box.scrollHeight, behavior: glide ? 'smooth' : 'auto' }))
    ro.observe(inner)
    return () => ro.disconnect()
  }, [smoothScroll])

  return (
    <>
      <PhoneStatusBar time={time} />
      <ChatHeader name={name} subtitle={subtitle} avatarLetter={avatarLetter} avatarColor={avatarColor} />
      <div className="relative" style={{ height: height - PHONE_INPUT_H, background: CHAT_BG }}>
        <div ref={boxRef} className="h-full overflow-hidden">
          <div ref={innerRef} className="flex min-h-full flex-col justify-end gap-2 px-2.5 pb-3.5 pt-3">
            {children}
          </div>
        </div>
        {topFade && (
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-9 bg-gradient-to-b from-[#efe7de] to-transparent" />
        )}
      </div>
      <MessageBar />
    </>
  )
}

/* Chat that fills whatever height its parent gives it (boards that size the phone themselves) */
export function FillChat({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden p-2.5" style={{ background: CHAT_BG }}>
      {children}
    </div>
  )
}

export default function WhatsAppPhoneShell(props: WhatsAppScreenProps) {
  return (
    <PhoneFrame>
      <WhatsAppScreen {...props} />
    </PhoneFrame>
  )
}
