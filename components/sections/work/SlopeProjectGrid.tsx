'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SLOPE_COLUMN_OFFSET = [
  '',
  'lg:mt-24 xl:mt-32',
  'lg:mt-48 xl:mt-64',
] as const

interface SlopeProjectGridProps {
  items: ReactNode[]
  cellClassName?: string
}

function splitIntoSlopeColumns(items: ReactNode[]) {
  return [0, 1, 2].map((column) =>
    items
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index % 3 === column),
  )
}

export function SlopeProjectGrid({ items, cellClassName }: SlopeProjectGridProps) {
  const columns = splitIntoSlopeColumns(items)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn('border border-(--color-border)', cellClassName)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {columns.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className={cn('flex flex-col gap-6', SLOPE_COLUMN_OFFSET[columnIndex])}
          >
            {columnItems.map(({ item, index }) => (
              <div
                key={index}
                className={cn('border border-(--color-border)', cellClassName)}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
