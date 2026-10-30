'use client'

import { usePathname } from 'next/navigation'

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return null
  return <>{children}</>
}
