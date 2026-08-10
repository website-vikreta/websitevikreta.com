'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { CommentForm } from '@/components/blog/CommentForm'
import { REVEAL_EASE } from '@/components/ui/Reveal'
import { getCommentIdentity } from '@/lib/comment-identity'

export function CommentComposer({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initial, setInitial] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitial(getCommentIdentity()?.name.charAt(0).toUpperCase() ?? null)
  }, [])

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-3 border border-(--color-border) px-4 py-3 text-left text-sm text-(--color-text-faint) transition-colors duration-300 hover:border-(--color-border-strong) hover:text-(--color-text-muted)"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-text) text-sm font-semibold text-(--color-bg)"
          aria-hidden="true"
        >
          {initial ?? <MessageCircle size={16} strokeWidth={1.75} />}
        </span>
        Add a comment…
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: REVEAL_EASE }}
    >
      <CommentForm postId={postId} onCancel={() => setIsOpen(false)} onPosted={() => setIsOpen(false)} />
    </motion.div>
  )
}
