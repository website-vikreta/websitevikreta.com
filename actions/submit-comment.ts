'use server'

import { revalidatePath } from 'next/cache'
import { writeClient } from '@/sanity/lib/write-client'
import { assertNotRateLimited } from '@/lib/rate-limit'

// Naive on purpose — catches the obvious spam pattern (a pasted URL). Real
// spam/link filtering is a separate later pass, not this schema-level check.
const LINK_PATTERN = /(https?:\/\/|www\.|\.(com|net|org|io|co|in|info|biz|dev|xyz)\b)/i

const MIN_SUBMIT_MS = 3_000

export type SubmitCommentResult = { success: true } | { error: string }

export async function submitComment(
  _prevState: SubmitCommentResult | null,
  formData: FormData,
): Promise<SubmitCommentResult> {
  // Honeypot: a real form field but hidden from sighted users via CSS (not
  // `type="hidden"`, which some scrapers already skip). A human never fills
  // it; a script that blindly fills every input does. Pretend success so
  // the bot has no signal it was caught. Field name deliberately avoids
  // "website"/"url"/"company" etc. — those are exactly the categories
  // browser password-manager/autofill extensions target, and an extension
  // silently filling this on a real visitor's behalf would falsely flag a
  // genuine comment as a bot. Logged (server-only, never shown to the
  // visitor) so a misfire is debuggable instead of an invisible dead end.
  if (formData.get('hp_check')) {
    console.warn('[submitComment] blocked: honeypot field was filled')
    return { success: true }
  }

  // JS-execution check: `jsToken` is only ever set by a useEffect running
  // client-side (see CommentForm.tsx). A bot posting raw HTML straight at
  // this action (no JS engine) never runs that effect, so the field
  // arrives missing/empty. Same silent-success treatment as the honeypot.
  const jsToken = formData.get('jsToken') as string | null
  if (!jsToken) {
    console.warn('[submitComment] blocked: missing jsToken (no client-side JS execution detected)')
    return { success: true }
  }

  await assertNotRateLimited('comment', 5, 60_000)

  const postId = formData.get('postId') as string
  const parentId = formData.get('parentId') as string | null
  const pathname = formData.get('pathname') as string
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!postId || !name || !email || !message) {
    return { error: 'Please fill in every field.' }
  }

  if (LINK_PATTERN.test(message)) {
    return { error: 'Links are not allowed in comments to prevent spam.' }
  }

  // Time-to-submit check: `jsToken` doubles as the timestamp the form
  // mounted client-side. A real person needs at least a few seconds to
  // read the fields and type; a script that fills and submits instantly
  // doesn't.
  if (Date.now() - Number(jsToken) < MIN_SUBMIT_MS) {
    return { error: 'Submission too fast. Please try again.' }
  }

  await writeClient.create({
    _type: 'comment',
    name,
    email,
    message,
    post: { _type: 'reference', _ref: postId },
    ...(parentId ? { parentComment: { _type: 'reference', _ref: parentId } } : {}),
  })

  revalidatePath(pathname)

  return { success: true }
}
