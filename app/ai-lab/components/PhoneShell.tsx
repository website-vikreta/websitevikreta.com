import type { ReactNode } from 'react'
import { Wifi } from 'lucide-react'

export const PHONE_STATUS_H = 44
export const PHONE_HEADER_H = 48
export const PHONE_INPUT_H = 56
export const PHONE_RIM = 10
export const PHONE_BODY_H = 452

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
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px]" style={{ height: h, background: ink }} />
          ))}
        </span>
        <Wifi size={13} strokeWidth={2.5} />
        <span
          className="relative ml-0.5 h-[11px] w-[22px] rounded-[3.5px] border p-[1.5px]"
          style={{ borderColor: `rgba(${bars},0.4)` }}
        >
          <span className="block h-full w-[75%] rounded-[1.5px]" style={{ background: ink }} />
        </span>
      </span>
    </div>
  )
}
