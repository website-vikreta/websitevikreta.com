'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { submitComment, type SubmitCommentResult } from '@/actions/submit-comment'
import { getCommentIdentity, setCommentIdentity, clearCommentIdentity, type CommentIdentity } from '@/lib/comment-identity'

interface CommentFormProps {
  postId: string
  /** Set when this form is replying to a specific comment (threading). */
  parentId?: string
  /** Called after a successful post — parent collapses the composer. */
  onPosted?: () => void
  /** Renders a Cancel button next to Post when provided. */
  onCancel?: () => void
}

export function CommentForm({ postId, parentId, onPosted, onCancel }: CommentFormProps) {
  const pathname = usePathname()
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [identity, setIdentity] = useState<CommentIdentity | null>(null)
  // Set only once React mounts client-side — a bot posting raw HTML (no JS
  // execution) never runs this effect, so `jsToken` arrives empty. Its
  // value doubles as a submit timestamp for the server's time-to-submit
  // check (see actions/submit-comment.ts).
  const [mountedTime, setMountedTime] = useState<string>('')

  useEffect(() => {
    // localStorage is only readable client-side — reading it during render
    // would break SSR/hydration, so this has to run post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIdentity(getCommentIdentity())
    // Intentional: the anti-bot property IS "this only runs when a real JS
    // engine mounts the component" — there's no non-effect equivalent that
    // preserves that.
    setMountedTime(Date.now().toString())
  }, [])

  const [state, formAction, isPending] = useActionState<SubmitCommentResult | null, FormData>(
    async (prevState, formData) => {
      let result: SubmitCommentResult
      try {
        result = await submitComment(prevState, formData)
      } catch {
        // e.g. rate limit throw — show a message instead of an uncaught rejection.
        return { error: 'Something went wrong. Please try again.' }
      }
      if ('success' in result) {
        const name = (formData.get('name') as string) ?? ''
        const email = (formData.get('email') as string) ?? ''
        if (name && email) setCommentIdentity({ name, email })
        formRef.current?.reset()
        onPosted?.()
      }
      return result
    },
    null,
  )

  function handleNotYou() {
    clearCommentIdentity()
    setIdentity(null)
  }

  const fieldClass =
    'w-full border border-(--color-border) bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none transition-colors duration-300 placeholder:text-(--color-text-faint) focus:border-(--color-border-strong) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)'
  const labelClass = 'block text-sm font-medium text-(--color-text-muted) mb-1.5'

  return (
    <form ref={formRef} action={formAction} className="flex w-full flex-col gap-3 sm:gap-3.5">
      <input type="hidden" name="postId" value={postId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <input type="hidden" name="pathname" value={pathname} />
      <input type="hidden" name="jsToken" value={mountedTime} />

      {/* Honeypot — real input hidden from sighted users, invisible to
          screen readers, never focusable. Bots that fill every field on
          the form fill this too; humans never see it. Name deliberately
          avoids "website"/"url"/"company" — those are what browser
          autofill/password-manager extensions specifically target, and one
          silently filling this on a real visitor's behalf would falsely
          flag a genuine comment as a bot. */}
      <input
        type="text"
        name="hp_check"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      />

      {identity ? (
        <>
          <input type="hidden" name="name" value={identity.name} />
          <input type="hidden" name="email" value={identity.email} />
          <p className="text-xs text-(--color-text-faint)">
            Commenting as <span className="font-medium text-(--color-text)">{identity.name}</span>
            {' · '}
            <button
              type="button"
              onClick={handleNotYou}
              className="underline underline-offset-2 hover:text-(--color-text-muted)"
            >
              Not you?
            </button>
          </p>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor={`${uid}-name`} className={labelClass}>Name</label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              required
              disabled={isPending}
              placeholder="Jane Doe"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={labelClass}>Email</label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              required
              disabled={isPending}
              placeholder="jane@company.com"
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-(--color-text-faint)">
              Never shown publicly — used only to fetch your avatar.
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>
          {parentId ? 'Reply' : 'Comment'}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={3}
          required
          autoFocus
          disabled={isPending}
          placeholder="Share your thoughts…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {state && 'error' in state && (
        <p className="text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }} role="alert">
          {state.error}
        </p>
      )}
      {state && 'success' in state && (
        <p className="text-xs text-(--color-text-muted)" role="status">
          Thanks — your {parentId ? 'reply' : 'comment'} has been posted.
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-fit py-[0.8125rem] px-[1.625rem] text-[0.9375rem] disabled:opacity-60"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" />
              Submitting…
            </span>
          ) : (
            parentId ? 'Post reply' : 'Post comment'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="btn btn-ghost py-2.5 px-5 text-sm disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
