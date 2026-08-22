'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { AuditModal } from '@/components/ui/AuditModal'

/** Hash used sitewide by CTAs that should pop the audit form instead of navigating. See scroll-to-hash.ts. */
export const AUDIT_MODAL_HASH = '#book-audit'

interface AuditModalContextValue {
  openAuditModal: () => void
}

const AuditModalContext = createContext<AuditModalContextValue | null>(null)

/** Mounted once at the app root. Renders the modal and exposes `useAuditModal()` to any CTA. */
export function AuditModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openAuditModal = useCallback(() => setOpen(true), [])
  const value = useMemo(() => ({ openAuditModal }), [openAuditModal])

  return (
    <AuditModalContext.Provider value={value}>
      {children}
      <AuditModal open={open} onOpenChange={setOpen} />
    </AuditModalContext.Provider>
  )
}

/** No-op fallback outside the provider so a stray render never throws — the provider is always mounted in app/layout.tsx. */
export function useAuditModal(): AuditModalContextValue {
  return useContext(AuditModalContext) ?? { openAuditModal: () => {} }
}
