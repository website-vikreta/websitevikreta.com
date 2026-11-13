'use client'

import { memo, useEffect, useRef, useState } from 'react'
import WhatsAppPhoneShell, { Ticks } from './WhatsAppPhoneShell'
import { useInView } from './useInView'

/* Plays once when the phone scrolls into view, then stays put: -1 waits, 0 the confirmation lands,
   1 the buyer taps a button, 2 the store replies (final, nothing leaves the screen). */
const PHASE_MS: Record<number, number> = { [-1]: 120, 0: 1100, 1: 800 }

const OUTCOME = {
  confirm: {
    tap: 'Confirm order',
    reply: 'Confirmed. Your kurta is packed and ships today. Tracking link follows.',
    badge: 'Ships today',
    badgeClass: 'bg-[#e7f6ec] text-[#1a7a3a]',
  },
  cancel: {
    tap: 'Cancel order',
    reply: 'Cancelled. Nothing will ship, and you will not be charged.',
    badge: 'Return avoided · ₹250 saved',
    badgeClass: 'bg-[#fdf1e3] text-[#9a4a07]',
  },
}

function CodConfirmDemo({ onStep }: { onStep?: (step: number) => void }) {
  const [wrapRef, inView] = useInView<HTMLDivElement>()
  const [phase, setPhase] = useState(-1)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) {
      const id = window.setTimeout(() => setPhase(2), 0)
      return () => window.clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (reduced.current || !inView || phase >= 2) return
    const id = window.setTimeout(() => setPhase((p) => p + 1), PHASE_MS[phase])
    return () => window.clearTimeout(id)
  }, [phase, inView])

  useEffect(() => { onStep?.(Math.max(0, phase)) }, [phase, onStep])

  const out = OUTCOME.confirm

  return (
    // Fixed width: as a flex item it would otherwise shrink to fit the bubbles and jump each phase
    <div ref={wrapRef} aria-hidden className="w-full max-w-[330px]">
      <WhatsAppPhoneShell time="11:42" name="Kaya Wear" subtitle="Business account" avatarLetter="K">
        {phase >= 0 && (
          <div className="wa-pop max-w-[86%] self-start overflow-hidden rounded-lg rounded-tl-sm bg-white text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
            <p className="px-2.5 pt-2">
              Hi Priya, thanks for your order <b>#1042</b>.<br />
              Block Print Kurta (M) · <b>₹1,299</b> · Cash on delivery.<br />
              Please confirm so we can ship it.
            </p>
            <span className="block px-2.5 pb-1.5 text-right text-[10px] text-[#667781]">11:42</span>
            {(['confirm', 'cancel'] as const).map((k) => {
              const tapped = phase >= 1 && k === 'confirm'
              return (
                <span
                  key={k}
                  className="relative block border-t border-black/[0.08] py-2 text-center text-[13px] font-medium text-[#027eb5]"
                >
                  {OUTCOME[k].tap}
                  {tapped && phase === 1 && (
                    <span className="wa-tap absolute left-1/2 top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-[#027eb5]/30" />
                  )}
                </span>
              )
            })}
          </div>
        )}

        {phase >= 1 && (
          <div className="wa-pop flex items-end gap-1.5 self-end rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[13px] text-[#111b21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
            {out.tap}
            <span className="flex items-center gap-0.5 text-[10px] text-[#667781]">11:43 <Ticks /></span>
          </div>
        )}

        {phase >= 2 && (
          <div className="wa-pop max-w-[86%] self-start rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
            {out.reply}
            <span className={`mt-2 flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${out.badgeClass}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> {out.badge}
            </span>
          </div>
        )}
      </WhatsAppPhoneShell>
    </div>
  )
}

export default memo(CodConfirmDemo)
