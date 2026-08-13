'use client'

import { trackLinkClick } from '@/lib/analytics'

export function AuthorLinkedInLink({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLinkClick(href, 'author_page')}
      className={className}
    >
      {children}
    </a>
  )
}
