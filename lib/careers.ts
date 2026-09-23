/** Editors enter the stipend with or without a leading ₹ ("₹1,500 – ₹2,500" vs
 * "1,000 – 2,000"), so the views strip it and render exactly one themselves. */
export function stipendAmount(stipend: string): string {
  return stipend.replace(/^\s*₹\s*/, '').trim()
}
