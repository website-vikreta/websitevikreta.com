'use client'

import { useState } from 'react'

/** YouTube facade: no iframe (and no third-party request) until click. */
export function VideoPlayer({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false)
  if (on)
    return <iframe className="wv-ax-vid-f" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
  return (
    <button type="button" className="wv-ax-vid-play" onClick={() => setOn(true)} aria-label={`Play video: ${title}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
    </button>
  )
}
