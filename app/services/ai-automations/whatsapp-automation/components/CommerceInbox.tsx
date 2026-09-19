'use client'

const CHANNELS = [
  { name: 'WhatsApp', count: '48' },
  { name: 'Instagram DM', count: '12' },
  { name: 'Meta Ads', count: '09' },
  { name: 'Shopify', count: '21' },
  { name: 'IndiaMART', count: '06' },
]

const THREADS = [
  {
    letter: 'P',
    name: 'Priya S.',
    via: 'Shopify',
    snippet: 'Cart reminder sent · Block Print Kurta (M)',
    status: 'Cart recovery',
    tone: '#b45309',
  },
  {
    letter: 'R',
    name: 'Rahul M.',
    via: 'Instagram',
    snippet: 'Is COD available for Nagpur?',
    status: 'AI replied',
    tone: '#1a8a5a',
  },
  {
    letter: 'A',
    name: 'Ananya K.',
    via: 'Meta Ads',
    snippet: 'Order #4127 confirmed, moving to dispatch',
    status: 'COD confirmed',
    tone: '#1a8a5a',
  },
  {
    letter: 'S',
    name: 'Sneha T.',
    via: 'IndiaMART',
    snippet: 'Bulk enquiry for 40 pieces',
    status: 'With Aarti',
    tone: '#525252',
  },
]

export default function CommerceInbox() {
  return (
    <div className="border border-(--color-border) bg-(--color-surface)">
      <div className="flex items-center justify-between gap-4 border-b border-(--color-border) px-5 py-4">
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)">
          <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1a8a5a]" />
          One team inbox
        </span>
        <span className="text-sm text-(--color-text-faint)">Kaya Wear</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
        <ul className="flex flex-wrap gap-x-6 gap-y-2.5 border-b border-(--color-border) px-5 py-4 sm:block sm:w-48 sm:space-y-3.5 sm:border-b-0 sm:border-r">
          {CHANNELS.map(({ name, count }, i) => (
            <li
              key={name}
              className={`flex items-center justify-between gap-5 text-base ${
                i === 0 ? 'font-semibold text-(--color-text)' : 'text-(--color-text-muted)'
              }`}
            >
              {name}
              <span className="font-mono text-sm text-(--color-text-faint)">{count}</span>
            </li>
          ))}
        </ul>

        <ul className="divide-y divide-(--color-border)">
          {THREADS.map(({ letter, name, via, snippet, status, tone }) => (
            <li key={name} className="flex items-start gap-3 px-5 py-4 transition-colors duration-300 hover:bg-(--color-bg-muted)">
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-(--color-border-strong) text-sm font-bold text-(--color-text)">
                {letter}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-bold text-(--color-text)">{name}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-faint)">{via}</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-(--color-text-muted)">{snippet}</span>
              </span>
              <span
                className="shrink-0 whitespace-nowrap px-2 py-1 text-xs font-semibold"
                style={{ background: `${tone}14`, border: `1px solid ${tone}38`, color: tone }}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-(--color-border) px-5 py-4 text-sm leading-relaxed text-(--color-text-muted)">
        Every channel lands here. Cart recovery, COD confirmation, and order updates run
        from the same inbox, on your number.
      </p>
    </div>
  )
}
