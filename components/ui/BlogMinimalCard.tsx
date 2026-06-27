import Link from "next/link"
import Image from "next/image"

interface BlogMinimalCardProps {
  imageUrl: string
  title: string
  href: string
}

export default function BlogMinimalCard({
  imageUrl,
  title,
  href,
}: BlogMinimalCardProps) {
  return (
    <Link
      href={href}
      className="block w-full hover:-translate-y-1 transition duration-300"
      aria-label={`Read article: ${title}`}
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-base text-black font-medium mt-3 leading-snug line-clamp-3">
        {title}
      </h3>
    </Link>
  )
}
