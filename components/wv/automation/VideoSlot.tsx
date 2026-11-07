import Image from 'next/image'
import type { Video } from '@/content/ai-automations/types'
import { showPlaceholders } from '@/lib/ai-automations-seo'
import { JsonLd } from './Sections'
import { VideoPlayer } from './VideoPlayer'

export function VideoSlot({ video }: { video: Video }) {
  if (!video.youtubeId && !showPlaceholders()) return null
  return (
    <section className="wv-sec wv-ax-sec wv-ax-video">
      <div className="wv-wrap">
        {video.youtubeId && (
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'VideoObject',
              name: video.title,
              description: video.title,
              thumbnailUrl: video.poster,
              uploadDate: '2026-11-01',
              embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
            }}
          />
        )}
        <div className="wv-ax-vid">
          <Image src={video.poster} alt="" fill sizes="(min-width:1320px) 1256px, 100vw" />
          {video.youtubeId ? (
            <VideoPlayer id={video.youtubeId} title={video.title} />
          ) : (
            <span className="wv-ax-vid-soon">Video coming soon</span>
          )}
          <span className="wv-ax-vid-t">{video.title}</span>
        </div>
      </div>
    </section>
  )
}
