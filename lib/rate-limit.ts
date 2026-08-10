import { headers } from 'next/headers'

const hits = new Map<string, { count: number; resetAt: number }>()

/**
 * In-memory per-instance fixed-window rate limit, keyed by client IP +
 * namespace (so e.g. `like` and `comment` don't share one counter). Throws
 * once `limit` is exceeded within `windowMs`.
 *
 * ponytail: doesn't hold a limit across multiple serverless instances, and
 * `hits` grows unbounded across distinct IPs — swap for Upstash/Vercel KV
 * if this ever sees real distributed abuse.
 */
export async function assertNotRateLimited(namespace: string, limit: number, windowMs: number) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const key = `${namespace}:${ip}`
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return
  }
  if (++entry.count > limit) {
    throw new Error('Too many requests — please slow down.')
  }
}
