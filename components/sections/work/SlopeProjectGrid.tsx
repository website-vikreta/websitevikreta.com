'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SLOPE_COLUMN_OFFSET = [
  '',
  'lg:mt-6 xl:mt-8',
  'lg:mt-12 xl:mt-16',
] as const

interface SlopeProjectGridProps {
  items: ReactNode[]
  cellClassName?: string
  columnOffsets?: readonly string[]
  gapClassName?: string
}

function splitIntoSlopeColumns(items: ReactNode[]) {
  return [0, 1, 2].map((column) =>
    items
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index % 3 === column),
  )
}

export function SlopeProjectGrid({
  items,
  cellClassName,
  columnOffsets = SLOPE_COLUMN_OFFSET,
  gapClassName = 'lg:gap-8 xl:gap-10',
}: SlopeProjectGridProps) {
  const columns = splitIntoSlopeColumns(items)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn('overflow-hidden rounded-sm', cellClassName)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className={cn('hidden lg:grid lg:grid-cols-3', gapClassName)}>
        {columns.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className={cn('flex flex-col gap-6 md:gap-8 xl:gap-10', columnOffsets[columnIndex])}
          >
            {columnItems.map(({ item, index }) => (
              <div
                key={index}
                className={cn('overflow-hidden rounded-sm', cellClassName)}
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
