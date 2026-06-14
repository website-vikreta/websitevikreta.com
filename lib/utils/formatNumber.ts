export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(0) + 'K'
  }
  return value.toString()
}
