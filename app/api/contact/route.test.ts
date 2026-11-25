import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const OK = { name: 'Test Lead', email: 'lead@example.com', mobile: '+919999999999', message: 'hi' }

async function load(env: Record<string, string>) {
  vi.resetModules()
  for (const k of ['EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY', 'CLOUDFLARE_TURNSTILE_SECRET_KEY']) vi.stubEnv(k, env[k] ?? '')
  vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', '')
  vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', '')
  vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', '')
  vi.stubEnv('NEXT_PUBLIC_EMAILJS_PRIVATE_KEY', '')
  return (await import('./route')).POST
}
const post = (POST: Awaited<ReturnType<typeof load>>, body: unknown) =>
  POST(new NextRequest('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) }))

const ENV = { EMAILJS_SERVICE_ID: 's', EMAILJS_TEMPLATE_ID: 't', EMAILJS_PUBLIC_KEY: 'pub', EMAILJS_PRIVATE_KEY: 'priv', CLOUDFLARE_TURNSTILE_SECRET_KEY: 'sec' }

describe('POST /api/contact', () => {
  let fetchMock: ReturnType<typeof vi.fn>
  beforeEach(() => {
    fetchMock = vi.fn(async (url: string) =>
      new Response(JSON.stringify(url.includes('cloudflare') ? { success: true } : {}), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('refuses a send with no captcha token and never calls EmailJS', async () => {
    const res = await post(await load(ENV), { params: OK })
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('refuses when Cloudflare rejects the token', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: false }), { status: 200 }))
    const res = await post(await load(ENV), { token: 'bad', params: OK })
    expect(res.status).toBe(400)
    expect(fetchMock).toHaveBeenCalledTimes(1) // only the Cloudflare check
  })

  it('sends with the private key, drops unknown fields, rejects a bad email', async () => {
    const POST = await load(ENV)
    expect((await post(POST, { token: 't', params: { ...OK, email: 'nope' } })).status).toBe(400)

    const res = await post(POST, { token: 't', params: { ...OK, evil: 'x' } })
    expect(res.status).toBe(200)
    const sent = JSON.parse(fetchMock.mock.calls.at(-1)![1].body as string)
    expect(sent.accessToken).toBe('priv')
    expect(sent.template_params).toMatchObject({ name: 'Test Lead', reply_to: 'lead@example.com', to_name: 'Website Vikreta' })
    expect(sent.template_params.evil).toBeUndefined()
  })

  it('fails closed when the Turnstile secret is missing in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    const res = await post(await load({ ...ENV, CLOUDFLARE_TURNSTILE_SECRET_KEY: '' }), { token: 't', params: OK })
    expect(res.status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
