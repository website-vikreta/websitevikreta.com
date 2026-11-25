import type { ReactNode } from 'react'
import '@/app/wv.css'
import './automation.css'
import { wvFonts } from '../fonts'
import { ScrollProgress, Smooth } from '../ui'
import { StickyCta } from './StickyCta'

export function AutomationShell({ children }: { children: ReactNode }) {
  return (
    <div className={`wv ${wvFonts}`}>
      <ScrollProgress />
      <Smooth />
      <noscript><style>{'.wv-kt-ch{transform:none!important}'}</style></noscript>
      {children}
      <StickyCta />
    </div>
  )
}
