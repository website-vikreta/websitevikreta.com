import Image from 'next/image'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ptComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-[var(--color-text)]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--color-text)]">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 text-[var(--color-text)]">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-[var(--color-text-muted)]">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#FFD600] pl-4 italic my-6 text-[var(--color-text-muted)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-[var(--color-text)]">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-neutral-800 px-1 rounded text-sm font-mono text-[#FFD600]">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noreferrer' : undefined}
        className="underline hover:text-[#FFD600] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) =>
      value?.asset ? (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(720).url()}
            alt={value.alt ?? ''}
            width={720}
            height={405}
            className="rounded w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-center text-[var(--color-text-muted)] mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    table: ({ value }: any) => {
      const rows: { cells?: string[] }[] = value?.rows ?? []
      if (!rows.length) return null
      return (
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i === 0
                      ? 'border-b-2 border-[#FFD600] bg-neutral-900'
                      : 'border-b border-neutral-800'
                  }
                >
                  {(row.cells ?? []).map((cell, j) => {
                    const Tag = i === 0 ? 'th' : 'td'
                    return (
                      <Tag
                        key={j}
                        className="px-4 py-2 text-left text-[var(--color-text)] font-normal"
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
}

export default function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={ptComponents} />
}
