'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { StatusPage } from '@/components/wv/StatusPage'
import { Arrow } from '@/components/wv/ui'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage code="500" title="Something broke" text="An unexpected error occurred. Try again, or head back home.">
      <button type="button" onClick={reset} className="wv-btn wv-btn-y">
        Try again <Arrow />
      </button>
      <Link href="/" className="wv-btn wv-btn-ghost">
        Visit home
      </Link>
    </StatusPage>
  )
}
