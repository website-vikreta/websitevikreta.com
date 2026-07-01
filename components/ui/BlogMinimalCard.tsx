import Link from "next/link"
import Image from "next/image"
import { TextLink } from "@/components/ui/TextLink"

interface BlogMinimalCardProps {
  imageUrl: string
  title: string
  href: string
}

export default function BlogMinimalCard({ imageUrl, title, href }: BlogMinimalCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={href} aria-label={`Read article: ${title}`} className="block">
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h3 className="mt-5 text-lg md:text-xl font-medium hover:text-[var(--color-black)] transition-colors duration-200">
          {title}
        </h3>
      </Link>
      <div className="mt-4">
        <TextLink href={href}>Read</TextLink>
      </div>
    </div>
  )
}
