'use client'

import type { ReactNode } from 'react'
import BoardWindow from './BoardWindow'
import { LazyMotion, domAnimation, m, type Variants } from 'motion/react'
import { Bell, Bot, MessageCircle, MessageSquare, MessageSquareText, Send } from 'lucide-react'

/* Brand marks lucide doesn't ship — single-path, currentColor */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

const CHANNELS: { name: string; count: string; icon: ReactNode }[] = [
  { name: 'WhatsApp', count: '48', icon: <WhatsAppIcon /> },
  { name: 'Instagram', count: '12', icon: <InstagramIcon /> },
  { name: 'Facebook', count: '07', icon: <FacebookIcon /> },
  { name: 'RCS', count: '04', icon: <MessageCircle size={16} strokeWidth={1.8} /> },
  { name: 'Website chat', count: '11', icon: <MessageSquare size={16} strokeWidth={1.8} /> },
]

const PILL = {
  ai: 'bg-[#1a8a5a] text-white',
  agent: 'bg-[#e4e4e7] text-[#3f3f46]',
  open: 'bg-(--color-accent) text-[#121212]',
  done: 'bg-[#e4e4e7] text-[#3f3f46]',
}

const THREADS: { initials: string; name: string; via: string; snippet: string; status: string; pill: keyof typeof PILL; avatar: string }[] = [
  { initials: 'PS', name: 'Priya S.', via: 'WhatsApp', snippet: 'Is the Block Print Kurta available in M?', status: 'AI replied', pill: 'ai', avatar: 'bg-[#d8c4ae]' },
  { initials: 'RM', name: 'Rahul M.', via: 'Instagram', snippet: 'Is COD available for Nagpur?', status: 'AI replied', pill: 'ai', avatar: 'bg-[#d8c4ae]' },
  { initials: 'AK', name: 'Ananya K.', via: 'Website chat', snippet: 'Need 40 pieces for a wedding order', status: 'With Aarti', pill: 'agent', avatar: 'bg-[#d8c4ae]' },
  { initials: 'ST', name: 'Sneha T.', via: 'Facebook', snippet: 'When will my order ship?', status: 'Open', pill: 'open', avatar: 'bg-(--color-accent)' },
  { initials: 'KJ', name: 'Kabir J.', via: 'RCS', snippet: 'Thanks, got the tracking link', status: 'Resolved', pill: 'done', avatar: 'bg-[#e4e4e7]' },
]

const TEAM = [
  { initial: 'A', bg: 'bg-[#c9a227]' },
  { initial: 'R', bg: 'bg-[#3f6b5a]' },
  { initial: 'M', bg: 'bg-[#b5654a]' },
]

/* Rows stagger in, then the chat plays out bubble by bubble. Replays every time the board becomes active. */
const list: Variants = { hide: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }
const row: Variants = {
  hide: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}
const bubble = (delay: number): Variants => ({
  hide: { opacity: 0, y: 8, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { delay, duration: 0.3, ease: [0.34, 1.4, 0.64, 1] } },
})

function Bubble({ out, time, delay, children }: { out?: boolean; time: string; delay: number; children: ReactNode }) {
  return (
    <m.div
      variants={bubble(delay)}
      className={`max-w-[78%] rounded-xl px-3 py-2 text-[13px] leading-snug text-[#121212] shadow-[0_1px_1px_rgba(0,0,0,0.08)] ${
        out ? 'ml-auto rounded-br-sm bg-[#d9fdd3]' : 'rounded-bl-sm bg-white'
      }`}
    >
      {children}
      <span className="mt-1 block text-right text-[10px] text-[#667781]">{time}</span>
    </m.div>
  )
}

export default function CommerceInbox({ active = true }: { active?: boolean }) {
  const state = active ? 'show' : 'hide'

  return (
    <LazyMotion features={domAnimation}>
      <BoardWindow title="Kaya Wear · Inbox" dark>
      <div className="flex flex-1 flex-col bg-white text-[#121212]">
        <div className="flex items-center justify-between bg-[#2f3a48] px-4 py-3">
          <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-white">
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-[#25d366]" />
            One team inbox
          </span>
          <span className="font-serif text-lg text-white">Kaya Wear</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[160px_1.3fr_1fr]">
          {/* Channels */}
          <div className="hidden border-r border-(--color-border) bg-[#f4f4f5] px-2 py-3 sm:block">
            <span className="mb-2 block px-2 text-[13px] font-semibold text-[#71717a]">Channels</span>
            <ul className="flex flex-col gap-0.5">
              {CHANNELS.map(({ name, count, icon }, i) => (
                <li
                  key={name}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] ${i === 0 ? 'bg-[#e4e4e7] font-semibold' : 'text-[#3f3f46]'}`}
                >
                  <span className="shrink-0 text-[#3f3f46]">{icon}</span>
                  <span className="flex-1 truncate">{name}</span>
                  <span className="rounded bg-white px-1.5 font-mono text-[10px] text-[#52525b]">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conversations */}
          <div className="border-r border-(--color-border) p-2.5">
            <span className="mb-2 block px-1 text-[13px] font-semibold">Conversations</span>
            <m.ul variants={list} initial="hide" animate={state} className="flex flex-col gap-1.5">
              {THREADS.map(({ initials, name, via, snippet, status, pill, avatar }, i) => (
                <m.li
                  key={name}
                  variants={row}
                  className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 ${
                    i === 0 ? 'border-[#a1a1aa] bg-[#f4f4f5]' : 'border-(--color-border) bg-white'
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border border-black/10 text-[11px] font-semibold ${avatar}`}>
                    {initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-[13px] font-semibold">{name}</span>
                      <span className="shrink-0 rounded bg-[#f4f4f5] px-1 text-[9px] uppercase tracking-wide text-[#52525b]">{via}</span>
                    </span>
                    <span className="block truncate text-[12px] text-[#3f3f46]">{snippet}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${PILL[pill]}`}>{status}</span>
                </m.li>
              ))}
            </m.ul>
          </div>

          {/* Open chat */}
          <m.div initial="hide" animate={state} className="hidden min-h-0 flex-col md:flex">
            <div className="flex items-center justify-between border-b border-(--color-border) px-3 py-2.5">
              <span className="text-[13px]">
                <span className="font-semibold">Priya S.</span>
                <span className="text-[#71717a]"> • WhatsApp</span>
              </span>
              <span className="flex gap-2 text-[#52525b]" aria-hidden>
                <MessageSquareText size={15} />
                <Bell size={15} />
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 bg-[#efe7de] p-3">
              <Bubble time="10:14 AM" delay={0.5}>Is the Block Print Kurta available in M?</Bubble>
              <div className="flex items-center gap-1.5">
                <Bubble out time="10:15 AM" delay={1.2}>
                  Yes, 6 left in M. Want me to hold one for you?{' '}
                  <span className="rounded bg-black/5 px-1 text-[9px] font-semibold text-[#3f6b5a]">AI</span>
                </Bubble>
                <m.span variants={bubble(1.3)} className="shrink-0 text-[#52525b]" aria-hidden>
                  <Bot size={16} />
                </m.span>
              </div>
              <Bubble time="10:16 AM" delay={1.9}>Yes please</Bubble>
            </div>

            <m.div
              variants={bubble(2.4)}
              className="flex items-center justify-between gap-2 border-t border-(--color-border) px-3 py-2 text-[11px] text-[#3f3f46]"
            >
              <span className="flex items-center gap-1.5">
                <span className="flex -space-x-1.5" aria-hidden>
                  {TEAM.map(({ initial, bg }) => (
                    <span key={initial} className={`grid h-5 w-5 place-items-center rounded-full border border-white text-[9px] font-semibold text-white ${bg}`}>
                      {initial}
                    </span>
                  ))}
                </span>
                Aarti, Rohan, Meera
              </span>
              <span>Assigned to Aarti</span>
            </m.div>

            <div className="flex items-center justify-between border-t border-(--color-border) px-3 py-2.5 text-[12px] text-[#a1a1aa]">
              Type a message…
              <Send size={15} aria-hidden />
            </div>
          </m.div>
        </div>
      </div>
      </BoardWindow>
    </LazyMotion>
  )
}
