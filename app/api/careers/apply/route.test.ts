import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const sanity = vi.hoisted(() => ({ fetch: vi.fn(), create: vi.fn(), upload: vi.fn() }))
const limiter = vi.hoisted(() => ({ assertNotRateLimited: vi.fn() }))

vi.mock('@/sanity/lib/write-client', () => ({ writeClient: { fetch: sanity.fetch, create: sanity.create, assets: { upload: sanity.upload } } }))
vi.mock('@/lib/rate-limit', () => limiter)

async function apply(fields: Record<string, string>) {
  vi.resetModules()
  vi.stubEnv('CLOUDFLARE_TURNSTILE_SECRET_KEY', 'sec')
  const { POST } = await import('./route')
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.append(k, v)
  // Only formData() and headers are read by the route; a plain object avoids multipart encoding in jsdom.
  return POST({ formData: async () => fd, headers: new Headers() } as unknown as NextRequest)
}

describe('POST /api/careers/apply captcha gate', () => {
  let fetchMock: ReturnType<typeof vi.fn>
  beforeEach(() => {
    vi.clearAllMocks()
    fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('stores nothing when the captcha token is missing', async () => {
    const res = await apply({ name: 'A', email: 'a@b.co', openingId: 'x' })
    expect(res.status).toBe(400)
    expect(sanity.fetch).not.toHaveBeenCalled()
    expect(sanity.upload).not.toHaveBeenCalled()
    expect(sanity.create).not.toHaveBeenCalled()
  })

  it('stores nothing when Cloudflare rejects the token', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: false }), { status: 200 }))
    const res = await apply({ token: 'bad', name: 'A', email: 'a@b.co', openingId: 'x' })
    expect(res.status).toBe(400)
    expect(sanity.fetch).not.toHaveBeenCalled()
    expect(sanity.create).not.toHaveBeenCalled()
  })

  it('answers 429 when rate limited, before checking the captcha', async () => {
    limiter.assertNotRateLimited.mockRejectedValueOnce(new Error('slow down'))
    const res = await apply({ token: 't' })
    expect(res.status).toBe(429)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('lets a verified request continue to the normal field checks', async () => {
    const res = await apply({ token: 'ok' })
    expect(res.status).toBe(400)
    expect(await res.json()).toMatchObject({ error: 'Missing required fields' })
    expect(sanity.create).not.toHaveBeenCalled()
  })
})
