import type { ReactNode } from 'react'

/* Floating proof note beside a phone, drawn as a chat message in the site's palette with sharp corners.
   `side` is the side of the phone it sits on: it is placed just clear of the phone (never over it) and its
   pointed corner faces the phone. White on the left, black on the right. It pops in when the message it is
   about lands, then stays; the float runs on the wrapper. Expects the phone to be centred, 330px wide. */
export function ProofCard({ side, top, delay = 0, show, time, children }: { side: 'left' | 'right'; top: number; delay?: number; show: boolean; time: string; children: ReactNode }) {
  const left = side === 'left'
  return (
    <div
      className={`wa-float absolute z-20 hidden sm:block ${left ? 'right-[calc(50%+183px)]' : 'left-[calc(50%+183px)]'}`}
      style={{ top, animationDelay: `${delay}s` }}
    >
      <div
        className={`relative w-[160px] rounded-[3px] px-3 pb-1.5 pt-2 text-[13.5px] leading-snug shadow-[0_1px_3px_rgba(20,18,15,0.12)] transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          left
            ? 'rounded-tr-none bg-(--color-surface) text-(--color-text) before:absolute before:-right-2 before:top-0 before:border-b-[9px] before:border-l-[10px] before:border-b-transparent before:border-l-(--color-surface)'
            : 'rounded-tl-none bg-(--color-text) text-white before:absolute before:-left-2 before:top-0 before:border-b-[9px] before:border-r-[10px] before:border-b-transparent before:border-r-(--color-text)'
        } ${show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'}`}
      >
        {children}
        <span className={`mt-0.5 block text-right text-[10px] ${left ? 'text-(--color-text-faint)' : 'text-white/60'}`}>{time}</span>
      </div>
    </div>
  )
}
