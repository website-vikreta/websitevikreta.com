'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { AuditModal } from '@/components/ui/AuditModal'

export interface AuditModalConfig {
  /** GA4 form_name + button_location label for this popup's submissions. */
  formName: string
  /** Visible form heading, and the dialog's accessible name for screen readers. */
  heading: string
  subjectPlaceholder: string
  messagePlaceholder: string
  /** Screen-reader-only dialog description (Radix requires one). */
  dialogDescription: string
}

const AUDIT_CONFIG: AuditModalConfig = {
  formName: 'book_audit_modal',
  heading: 'Book a Free Process Audit',
  subjectPlaceholder: 'What do you need automated?',
  messagePlaceholder: 'Describe the repetitive work you want to automate…',
  dialogDescription: "Tell us about the repetitive work you want automated — we'll reply within 24 hours.",
}

const PROJECT_CALL_CONFIG: AuditModalConfig = {
  formName: 'book_project_call_modal',
  heading: 'Book a Free Project Call',
  subjectPlaceholder: 'What do you need built?',
  messagePlaceholder: 'Describe the CRM, portal, or app you need…',
  dialogDescription: "Tell us what you need built — we'll reply within 24 hours.",
}

const FREE_QUOTE_CONFIG: AuditModalConfig = {
  formName: 'get_quote_modal',
  heading: 'Get a Free Quote',
  subjectPlaceholder: 'What kind of website do you need?',
  messagePlaceholder: 'Describe your project, timeline, and budget…',
  dialogDescription: "Tell us about your website project — we'll reply within 24 hours.",
}

const MARKETING_AUDIT_CONFIG: AuditModalConfig = {
  formName: 'book_marketing_audit_modal',
  heading: 'Book a Free Marketing Audit',
  subjectPlaceholder: 'What are you trying to grow?',
  messagePlaceholder: 'Tell us about your traffic, leads, or rankings goal…',
  dialogDescription: "Tell us what you want to grow — we'll reply within 24 hours.",
}

/**
 * One entry per popup variant sitewide, keyed by the `#hash` that opens it.
 * `Button`/`TextLink` look a clicked href up here; a miss falls through to
 * their normal same-page scroll behavior. Add a page's own popup by adding
 * an entry — never fork AuditModal/AuditForm for new copy.
 */
export const AUDIT_MODAL_CONFIGS: Record<string, AuditModalConfig> = {
  '#book-audit':        AUDIT_CONFIG,
  '#start-project':     PROJECT_CALL_CONFIG,
  '#get-quote':         FREE_QUOTE_CONFIG,
  '#marketing-audit':   MARKETING_AUDIT_CONFIG,
}

/** Back-compat default for any caller that opens the modal with no config. */
export const AUDIT_MODAL_HASH = '#book-audit'

interface AuditModalContextValue {
  openAuditModal: (config?: AuditModalConfig) => void
}

const AuditModalContext = createContext<AuditModalContextValue | null>(null)

/** Mounted once at the app root. Renders the modal and exposes `useAuditModal()` to any CTA. */
export function AuditModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<AuditModalConfig>(AUDIT_CONFIG)

  const openAuditModal = useCallback((nextConfig: AuditModalConfig = AUDIT_CONFIG) => {
    setConfig(nextConfig)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openAuditModal }), [openAuditModal])

  return (
    <AuditModalContext.Provider value={value}>
      {children}
      <AuditModal open={open} onOpenChange={setOpen} config={config} />
    </AuditModalContext.Provider>
  )
}

/** No-op fallback outside the provider so a stray render never throws — the provider is always mounted in app/layout.tsx. */
export function useAuditModal(): AuditModalContextValue {
  return useContext(AuditModalContext) ?? { openAuditModal: () => {} }
}
