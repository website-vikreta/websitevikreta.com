const SECRET = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? ''

export type TurnstileResult = { ok: true } | { ok: false; status: number; error: string }

/**
 * Server-side Cloudflare Turnstile check, shared by every route that must stop bots
 * (`/api/contact`, `/api/careers/apply`). Tokens are single-use, so call it once per request.
 * Fails closed in production if the secret is missing; dev/CI without a secret skips it.
 */
export async function verifyTurnstile(req: Request, token: string): Promise<TurnstileResult> {
  if (!SECRET) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[turnstile] CLOUDFLARE_TURNSTILE_SECRET_KEY missing in production')
      return { ok: false, status: 503, error: 'Form is unavailable' }
    }
    return { ok: true }
  }
  if (!token) return { ok: false, status: 400, error: 'Captcha required' }

  try {
    const form = new FormData()
    form.append('secret', SECRET)
    form.append('response', token)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    if (ip) form.append('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, cache: 'no-store' })
    const json = (await res.json()) as { success?: boolean }
    return json.success ? { ok: true } : { ok: false, status: 400, error: 'Captcha failed' }
  } catch (err) {
    console.error('[turnstile] verify error:', err)
    return { ok: false, status: 502, error: 'Captcha check unavailable' }
  }
}
