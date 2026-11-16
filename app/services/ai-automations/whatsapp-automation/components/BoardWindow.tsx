import type { ReactNode } from 'react'

/* macOS-style window frame shared by every platform board, so each one reads as a real screen.
   `dark` matches boards whose own header is dark (the inbox); everything else gets a light bar. */
export default function BoardWindow({
  title,
  dark = false,
  children,
}: {
  title?: string
  dark?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-(--color-border) bg-white text-[#121212] shadow-[0_30px_60px_-30px_rgba(20,18,15,0.35)]">
      <div
        aria-hidden
        className={`relative flex h-8 shrink-0 items-center gap-2 px-3.5 ${
          dark ? 'bg-[#2a3441]' : 'border-b border-black/[0.06] bg-[#ececea]'
        }`}
      >
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
        {title && (
          <span className={`absolute inset-x-0 text-center text-[11px] font-medium ${dark ? 'text-white/60' : 'text-black/45'}`}>
            {title}
          </span>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
