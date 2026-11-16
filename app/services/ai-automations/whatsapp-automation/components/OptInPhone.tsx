'use client'

import { ChatHeader, PhoneFrame, PhoneStatusBar, Ticks } from './WhatsAppPhoneShell'

/* Top half of a phone showing the opt-in step Meta requires before any broadcast. The parent card
   crops it at the bottom, so only the permission prompt and the first broadcast peek out. */
export default function OptInPhone({ active = true }: { active?: boolean }) {
  // wa-pop / wa-fade come from the shared phone shell; bubbles drop in one after another
  const pop = (delay: number) => ({
    className: active ? 'wa-pop' : 'opacity-0',
    style: { animationDelay: `${delay}s` },
  })

  const bubble = 'rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]'
  const choice = 'rounded-lg bg-white py-2 text-center text-[13px] font-semibold text-[#00a5f4] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]'

  return (
    <PhoneFrame fill>
      <PhoneStatusBar time="10:14" />
      <ChatHeader name="Kaya Wear" subtitle="Business account" avatarLetter="K" />
      <div
        className="flex flex-1 flex-col gap-2 px-2.5 pt-3"
        style={{ background: 'radial-gradient(circle at 1px 1px, rgba(20,18,15,0.05) 1px, transparent 0) 0 0 / 5px 5px, #efe7de' }}
      >
        <div {...pop(0.1)}>
          <div className={`${bubble} max-w-[85%]`}>
            Hi Priya, thanks for your order. Can we send you updates and offers on WhatsApp?
            <span className="mt-0.5 block text-right text-[10px] text-[#667781]">10:14</span>
          </div>
          <div className="mt-1 grid max-w-[85%] grid-cols-2 gap-1">
            <span className={choice}>Yes, continue</span>
            <span className={choice}>Not now</span>
          </div>
        </div>

        <div {...pop(0.9)} className={`${active ? 'wa-pop' : 'opacity-0'} flex justify-end`}>
          <div className="flex items-center gap-1.5 rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-1.5 text-[13px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
            Yes, continue <Ticks />
          </div>
        </div>

        <div {...pop(1.7)}>
          <div className={`${bubble} max-w-[85%]`}>You are subscribed. Reply STOP any time to opt out.</div>
        </div>

        <div {...pop(2.5)}>
          <div className={`${bubble} max-w-[85%]`}>Diwali Edit is live: 20% off kurtas, today only.</div>
        </div>
      </div>
    </PhoneFrame>
  )
}
