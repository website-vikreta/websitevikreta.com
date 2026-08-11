'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Reply } from 'lucide-react'
import { CommentForm } from '@/components/blog/CommentForm'
import { REVEAL_EASE } from '@/components/ui/Reveal'
import type { Comment } from '@/sanity/types'

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <div className="group flex gap-3 rounded-sm p-2 -m-2 transition-colors duration-300 hover:bg-(--color-bg-muted)">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-text) text-sm font-semibold text-(--color-bg)"
        aria-hidden="true"
      >
        {comment.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-(--color-text)">{comment.name}</span>
          <span className="text-xs text-(--color-text-faint)">{timeAgo(comment._createdAt)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-muted)">
          {comment.message}
        </p>
      </div>
    </div>
  )
}

interface CommentThreadProps {
  postId: string
  comment: Comment
  /** Flat — replies never nest further than one level. */
  replies: Comment[]
}

export function CommentThread({ postId, comment, replies }: CommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <div>
      <CommentRow comment={comment} />

      <div className="ml-12 mt-2">
        {!showReplyForm && (
          <button
            type="button"
            onClick={() => setShowReplyForm(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-text-muted) transition-colors duration-300 hover:text-(--color-text)"
          >
            <Reply size={13} strokeWidth={1.75} aria-hidden="true" />
            Reply
          </button>
        )}

        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: REVEAL_EASE }}
            className="mt-1"
          >
            <CommentForm
              postId={postId}
              parentId={comment._id}
              onCancel={() => setShowReplyForm(false)}
              onPosted={() => setShowReplyForm(false)}
            />
          </motion.div>
        )}

        {replies.length > 0 && (
          <ul className="mt-4 flex flex-col gap-4 border-l border-(--color-border) pl-4">
            {replies.map((reply) => (
              <li key={reply._id}>
                <CommentRow comment={reply} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
