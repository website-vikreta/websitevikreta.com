'use client'

import { Arrow, Magnetic } from '../ui'
import { CONTACT } from '../data'
import { trackLinkClick } from '@/lib/analytics'

export function WaButton({ text, variant = 'ghost', small, label = 'Chat on WhatsApp' }: { text: string; variant?: 'y' | 'ghost'; small?: boolean; label?: string }) {
  const href = `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
  const a = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`wv-btn wv-btn-${variant}${small ? ' wv-btn-sm' : ''}`}
      onClick={() => trackLinkClick(href, 'ai_automations_wa')}
    >
      {label} <Arrow size={small ? 13 : 15} />
    </a>
  )
  return small ? a : <Magnetic>{a}</Magnetic>
}
