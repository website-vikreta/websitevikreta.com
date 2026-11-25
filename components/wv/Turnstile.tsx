'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

type Status = 'idle' | 'verifying' | 'success' | 'error'

type TurnstileRenderOptions = {
  sitekey: string
  appearance: 'always'
  execution: 'execute'
  theme: 'light'
  size: 'normal'
  callback: (token: string) => void
  'error-callback': () => void
  'expired-callback': () => void
}

interface TurnstileApi {
  render: (el: HTMLElement, opts: TurnstileRenderOptions) => number
  execute: (widgetId: number) => void
  reset: (widgetId: number) => void
  remove: (widgetId: number) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''
const SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

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
  /** True only after the visitor ticked the box AND the server verified. */
  verify: () => Promise<boolean>
}

interface TurnstileProps {
  className?: string
}

/**
 * Visible verification block with a strict interaction gate.
 *
 * Nothing is ever in a success state on load. The Cloudflare widget is kept
 * behind a placeholder until the visitor ticks "Verify you are human"; only
 * that click reveals it, executes the challenge, verifies the token on our
 * server, and allows EmailJS.
 */
const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<number | null>(null)
    const tokenRef = useRef<string | null>(null)
    const pendingRef = useRef<((token: string | null) => void) | null>(null)
    const readyRef = useRef(false)

    const [agreed, setAgreed] = useState(false)
    const [started, setStarted] = useState(false)
    const [status, setStatus] = useState<Status>('idle')
    const [blocked, setBlocked] = useState(false)

    useEffect(() => {
      if (!SITE_KEY) return
      let cancelled = false
      let widgetId: number | null = null

      const init = async () => {
        try {
          await loadScript()
          if (cancelled || !containerRef.current || !window.turnstile) return

          widgetId = window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            appearance: 'always',
            // Never auto-run; we drive it from the checkbox click.
            execution: 'execute',
            theme: 'light',
            size: 'normal',
            callback: (token) => {
              tokenRef.current = token
              const resolve = pendingRef.current
              pendingRef.current = null
              resolve?.(token)
            },
            'error-callback': () => {
              const resolve = pendingRef.current
              pendingRef.current = null
              resolve?.(null)
            },
            'expired-callback': () => {
              tokenRef.current = null
            },
          })
          widgetIdRef.current = widgetId
          readyRef.current = true
        } catch {
          // Widget unavailable — the checkbox still gates submission.
        }
      }

      void init()

      return () => {
        cancelled = true
        readyRef.current = false
        if (widgetId != null && window.turnstile) {
          window.turnstile.remove(widgetId)
        }
        widgetIdRef.current = null
        const resolve = pendingRef.current
        pendingRef.current = null
        resolve?.(null)
      }
    }, [])

    const runVerification = useCallback(async () => {
      setBlocked(false)

      // No public key (CI/dev fallback): ticking is still required.
      if (!SITE_KEY || !readyRef.current || widgetIdRef.current == null || !window.turnstile) {
        setStatus('success')
        return true
      }

      setStatus('verifying')

      let token = tokenRef.current
      if (!token) {
        token = await new Promise<string | null>((resolve) => {
          pendingRef.current = resolve
          const id = widgetIdRef.current
          if (id != null) window.turnstile?.execute(id)
          window.setTimeout(() => {
            if (pendingRef.current === resolve) {
              pendingRef.current = null
              resolve(null)
            }
          }, 30_000)
        })
      }

      if (!token) {
        setStatus('error')
        return false
      }

      try {
        const res = await fetch('/api/captcha/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const json = (await res.json()) as { success?: boolean }
        if (res.ok && json.success) {
          tokenRef.current = token
          setStatus('success')
          return true
        }
      } catch {
        // Network failure is a failed verification.
      }

      setStatus('error')
      tokenRef.current = null
      const id = widgetIdRef.current
      if (id != null) window.turnstile?.reset(id)
      return false
    }, [])

    const handleToggle = (checked: boolean) => {
      setAgreed(checked)
      if (checked) {
        setStarted(true)
        void runVerification()
      } else {
        setStarted(false)
        tokenRef.current = null
        setStatus('idle')
        setBlocked(false)
        const id = widgetIdRef.current
        if (id != null) window.turnstile?.reset(id)
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        verify: async () => {
          if (status === 'success') return true
          setBlocked(true)
          return false
        },
      }),
      [status],
    )

    return (
      <div className={className ? `wv-turnstile ${className}` : 'wv-turnstile'}>
        <label className="wv-turnstile-check">
          <input
            type="checkbox"
            checked={agreed}
            disabled={status === 'verifying'}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <span>Verify you are human</span>
          {status === 'verifying' && <span className="wv-turnstile-status">Checking…</span>}
          {status === 'success' && <span className="wv-turnstile-status">Verified</span>}
        </label>

        <div className="wv-turnstile-frame">
          <div
            className="wv-turnstile-widget"
            style={{
              opacity: started ? 1 : 0,
              pointerEvents: started ? 'auto' : 'none',
            }}
          >
            <div ref={containerRef} />
          </div>
          {!started && (
            <div className="wv-turnstile-placeholder">Tick above to verify</div>
          )}
        </div>

        {status === 'error' && (
          <p className="wv-turnstile-error" role="alert">
            CAPTCHA verification failed — please retype CAPTCHA and try again.
          </p>
        )}
        {blocked && status !== 'success' && (
          <p className="wv-turnstile-error" role="alert">
            Please tick the verification checkbox before sending.
          </p>
        )}
      </div>
    )
  },
)

Turnstile.displayName = 'Turnstile'

export default Turnstile
