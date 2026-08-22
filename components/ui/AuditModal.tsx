'use client'

import { useRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { AuditForm } from '@/components/ui/AuditForm'
import type { AuditModalConfig } from '@/components/ui/AuditModalProvider'

interface AuditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: AuditModalConfig
}

/** Sitewide popup form shell — copy/placeholders come from `config`, opened from any CTA via `useAuditModal()`. */
export function AuditModal({ open, onOpenChange, config }: AuditModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="audit-modal-overlay" />
        <DialogPrimitive.Content
          ref={contentRef}
          className="audit-modal-content bg-(--color-surface) border border-(--color-border)"
          onOpenAutoFocus={(e) => {
            // Land focus on the first field, not the dialog wrapper.
            e.preventDefault()
            const firstField = contentRef.current?.querySelector<HTMLElement>('input, textarea')
            firstField?.focus()
          }}
        >
          <DialogPrimitive.Title className="sr-only">{config.heading}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {config.dialogDescription}
          </DialogPrimitive.Description>

          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 flex size-9 items-center justify-center border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-200 ease-out hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
          >
            <X size={16} strokeWidth={1.75} aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="p-6 pt-14 sm:p-8 sm:pt-16">
            <AuditForm
              formName={config.formName}
              heading={config.heading}
              subjectPlaceholder={config.subjectPlaceholder}
              messagePlaceholder={config.messagePlaceholder}
              onSuccess={() => { /* leave open — user sees the confirmation */ }}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
