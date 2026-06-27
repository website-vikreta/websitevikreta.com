import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface BlogImageCardProps {
  imageUrl: string
  title: string
  category: string
  readTime: string
  href: string
  themeColor: string
}

const BlogImageCard = React.forwardRef<HTMLDivElement, BlogImageCardProps>(
  ({ imageUrl, title, category, readTime, href, themeColor }, ref) => {
    return (
      <div
        ref={ref}
        style={{ "--theme-color": themeColor } as React.CSSProperties}
        className="group w-full h-full"
      >
        <Link
          href={href}
          className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden shadow-lg
                     transition-all duration-500 ease-in-out
                     group-hover:scale-[1.03]"
          style={{ boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.4)` }}
          aria-label={`Read article: ${title}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.92), hsl(var(--theme-color) / 0.55) 35%, transparent 65%)`,
            }}
          />

          {/* Category pill — top left */}
          <div className="relative p-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-full px-3 py-1">
              {category}
            </span>
          </div>

          {/* Bottom content */}
          <div className="relative mt-auto p-5 text-white">
            <p className="text-sm text-white/70 mb-2 font-medium">{readTime}</p>
            <h3 className="text-xl font-bold leading-snug tracking-tight line-clamp-3">
              {title}
            </h3>

            {/* CTA bar */}
            <div
              className="mt-5 flex items-center justify-between rounded-lg px-4 py-3 border
                         backdrop-blur-md transition-all duration-300
                         group-hover:bg-white/20 group-hover:border-white/40"
              style={{
                background: `hsl(var(--theme-color) / 0.2)`,
                borderColor: `hsl(var(--theme-color) / 0.3)`,
              }}
            >
              <span className="text-sm font-semibold tracking-wide">Read Article</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    )
  }
)
BlogImageCard.displayName = "BlogImageCard"

export { BlogImageCard }
