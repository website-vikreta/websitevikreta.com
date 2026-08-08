'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { writeClient } from '@/sanity/lib/write-client'

const RATE_LIMIT = 20
const WINDOW_MS = 60_000
// ponytail: in-memory per-instance fixed window — stops a script hammering
// this action from one machine without adding a store dependency. Doesn't
// hold a limit across multiple serverless instances, and the Map grows
// unbounded across distinct IPs; swap for Upstash/Vercel KV if this ever
// gets real abuse traffic.
const hits = new Map<string, { count: number; resetAt: number }>()

async function assertNotRateLimited() {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return
  }
  if (++entry.count > RATE_LIMIT) {
    throw new Error('Too many like requests — please slow down.')
  }
}

/** `setIfMissing` covers any post the backfill script hasn't reached yet — `inc` alone would error on a genuinely missing field. `revalidatePath` clears the cached fetch for the page that called this, so the next render (Next.js auto-refreshes the route after a Server Action resolves) reads the real count instead of the stale cached one — without it, `useOptimistic` snaps back to the old `initialLikes` prop once the action settles. */
async function adjustLikes(postId: string, pathname: string, delta: 1 | -1): Promise<number> {
  await assertNotRateLimited()

  const result = await writeClient
    .patch(postId)
    .setIfMissing({ likes: 0 })
    .inc({ likes: delta })
    .commit()

  let likes = result.likes as number
  // A concurrent unlike (double click, two tabs) could race the count below
  // zero — clamp it back rather than show a negative like count.
  if (likes < 0) {
    await writeClient.patch(postId).set({ likes: 0 }).commit()
    likes = 0
  }

  revalidatePath(pathname)
  return likes
}

export async function likePost(postId: string, pathname: string) {
  return adjustLikes(postId, pathname, 1)
}

export async function unlikePost(postId: string, pathname: string) {
  return adjustLikes(postId, pathname, -1)
}
