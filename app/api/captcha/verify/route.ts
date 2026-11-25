import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? ''
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * POST /api/captcha/verify — body: { token: string }
 *
 * Every form submission must pass through here before EmailJS is called.
 * Cloudflare decides in the browser whether a visitor needs a challenge;
 * this endpoint confirms the resulting token with Cloudflare server-side.
 */
export async function POST(req: NextRequest) {
  let token = ''
  try {
    const raw = await req.text()
    const body = JSON.parse(raw) as { token?: unknown }
    if (typeof body.token === 'string') token = body.token
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  if (!token) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  // Dev/CI without the secret: keep forms usable. Production must set it.
  if (!SECRET_KEY) {
    return NextResponse.json({ success: true })
  }

  try {
    const form = new FormData()
    form.append('secret', SECRET_KEY)
    form.append('response', token)

    const res = await fetch(VERIFY_URL, { method: 'POST', body: form, cache: 'no-store' })
    const json = (await res.json()) as { success?: boolean }

    if (!json.success) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[captcha/verify] error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
