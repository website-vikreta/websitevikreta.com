import { BlogCard } from '@/components/blog/BlogCard'
import type { DisplayPost } from '@/sanity/types'
import type { HeadingPart, HomeLink } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'
import { HomeCta } from './HomeCta'

export function Blog({ heading, posts, cta }: { heading: HeadingPart[]; posts: DisplayPost[]; cta: HomeLink }) {
  if (posts.length === 0) return null
  return (
    <Section id="blog" labelledBy="blog-h">
      <SectionHeading id="blog-h" parts={heading} />
      <div className="home-grid-3">
        {posts.map((p) => (
          <BlogCard key={p._id} post={p} className="h-full" />
        ))}
      </div>
      <div className="home-center">
        <HomeCta link={cta} variant="ghost" />
      </div>
    </Section>
  )
}
