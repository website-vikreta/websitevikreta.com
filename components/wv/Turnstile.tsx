'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

type Status = 'verifying' | 'success' | 'error'

type TurnstileRenderOptions = {
  sitekey: string
  theme: 'light'
  size: 'normal'
  callback: (token: string) => void
  'error-callback': () => void
  'expired-callback': () => void
}

interface TurnstileApi {
  render: (el: HTMLElement, opts: TurnstileRenderOptions) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT_URL
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => {
      scriptPromise = null
      reject(new Error('Turnstile script failed to load'))
    }
    document.head.appendChild(s)
  })
  return scriptPromise
}

export interface TurnstileHandle {
  /** True once Cloudflare has issued a token (or there is no site key: dev/CI). */
  verify: () => Promise<boolean>
  /** The single-use token. Send it to /api/contact, which verifies it with Cloudflare. */
  getToken: () => string | null
  /** Call after every send attempt: a token can only be used once. */
  reset: () => void
}

/**
 * Cloudflare's own Turnstile widget: it checks the visitor by itself and shows
 * "Success!", asking for a click only when the browser looks suspicious.
 * The token is verified server-side by /api/contact, the only route that sends email.
 * With no site key (local dev / CI) nothing renders and verify() passes.
 */
const Turnstile = forwardRef<TurnstileHandle, { className?: string }>(function Turnstile({ className }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const tokenRef = useRef<string | null>(null)
  const [status, setStatus] = useState<Status>('verifying')
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false
    let widgetId: string | null = null

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'light',
          size: 'normal',
          callback: (token) => {
            tokenRef.current = token
            setStatus('success')
            setBlocked(false)
          },
          'error-callback': () => {
            tokenRef.current = null
            setStatus('error')
          },
          // Cloudflare re-runs the check on its own after expiry.
          'expired-callback': () => {
            tokenRef.current = null
            setStatus('verifying')
          },
        })
        widgetIdRef.current = widgetId
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      if (widgetId != null) window.turnstile?.remove(widgetId)
      widgetIdRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    if (!SITE_KEY) return
    tokenRef.current = null
    setStatus('verifying')
    setBlocked(false)
    const id = widgetIdRef.current
    if (id != null) window.turnstile?.reset(id)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      verify: async () => {
        if (!SITE_KEY || status === 'success') return true
        setBlocked(true)
        return false
      },
      getToken: () => tokenRef.current,
      reset,
    }),
    [status, reset],
  )

  if (!SITE_KEY) return null

  return (
    <div className={className ? `wv-turnstile ${className}` : 'wv-turnstile'} data-status={status}>
      <div ref={containerRef} />
      {status === 'error' && (
        <p className="wv-turnstile-error" role="alert">
          Verification failed. Reload the page and try again.
        </p>
      )}
      {blocked && status === 'verifying' && (
        <p className="wv-turnstile-error" role="alert">
          Almost done, we are still verifying you. Try again in a second.
        </p>
      )}
    </div>
  )
})

Turnstile.displayName = 'Turnstile'

export default Turnstile
