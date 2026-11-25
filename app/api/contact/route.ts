import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstile } from '@/lib/turnstile'

export const runtime = 'nodejs'

// Server-only. The NEXT_PUBLIC_ fallbacks let the existing Vercel values keep working
// (the careers route already reads the private key from NEXT_PUBLIC_EMAILJS_PRIVATE_KEY).
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Only these template params are forwarded; anything else a caller sends is dropped.
const FIELDS = ['name', 'reply_to', 'email', 'mobile', 'service', 'service_type', 'budget', 'message'] as const
const MAX_LEN = 2000

const bad = (status: number, error: string) => NextResponse.json({ success: false, error }, { status })

/**
 * POST /api/contact — body: { token: string, params: { name, email, mobile, ... } }
 *
 * The single path every lead form uses to send email. The browser can no longer call
 * EmailJS itself: the Turnstile token is verified here, then EmailJS is called with the
 * PRIVATE key, which never leaves the server. Turn on "Use Private Key" in the EmailJS
 * dashboard (Account → Security) so direct calls with the public IDs are refused.
 */
export async function POST(req: NextRequest) {
  let token = ''
  let raw: Record<string, unknown> = {}
  try {
    const body = (await req.json()) as { token?: unknown; params?: unknown }
    if (typeof body.token === 'string') token = body.token
    if (body.params && typeof body.params === 'object') raw = body.params as Record<string, unknown>
  } catch {
    return bad(400, 'Invalid request')
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    console.error('[contact] EmailJS env is not configured')
    return bad(503, 'Form is unavailable')
  }

  // 1. Bot check. Fails closed in production; dev/CI without a secret skips it.
  const captcha = await verifyTurnstile(req, token)
  if (!captcha.ok) return bad(captcha.status, captcha.error)

  // 2. Validate and whitelist the fields.
  const params: Record<string, string> = {}
  for (const k of FIELDS) {
    const v = raw[k]
    if (typeof v === 'string') params[k] = v.trim().slice(0, MAX_LEN)
  }
  if (!params.name || params.name.length < 2) return bad(400, 'Name is required')
  if (!params.email || !EMAIL_RE.test(params.email)) return bad(400, 'Valid email is required')
  params.reply_to = params.email
  params.budget ||= 'Not specified'
  params.to_name = 'Website Vikreta'

  // 3. Send with the private key.
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        template_params: params,
      }),
    })
    if (!res.ok) {
      console.error('[contact] EmailJS failed:', res.status, await res.text())
      return bad(502, 'Could not send')
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] send error:', err)
    return bad(502, 'Could not send')
  }
}
