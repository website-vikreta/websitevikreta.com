import BlogMinimalCard from "@/components/ui/BlogMinimalCard"
import { RevealText, RevealFade } from "@/components/ui/Reveal"

export interface BlogPreviewPost {
  title: string
  excerpt: string
  href: string
  imageUrl?: string
  category?: string
  readTime?: string
}

export function BlogPreviewSectionClient({ posts }: { posts: BlogPreviewPost[] }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="container py-20 md:py-28">

        {/* Heading */}
        <div className="mb-10 md:mb-14 max-w-3xl mx-auto text-center">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-[var(--color-text)]">
            The{" "}
            <span style={{ color: "var(--color-accent)" }}>thinking</span>
            {" "}behind the work.
          </RevealText>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-16 md:gap-y-14">
          {posts.map((post, i) => (
            <RevealFade key={post.href} delay={0.15 + i * 0.1}>
              <BlogMinimalCard
                imageUrl={post.imageUrl ?? "/placeholder-blog.jpg"}
                title={post.title}
                href={post.href}
              />
            </RevealFade>
          ))}
        </div>

      </div>
    </section>
  )
}
