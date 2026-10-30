import { Anton, Inter_Tight } from 'next/font/google'

const display = Anton({ weight: '400', subsets: ['latin'], variable: '--wv-display' })
const sans = Inter_Tight({ subsets: ['latin'], variable: '--wv-sans' })

export const wvFonts = `${display.variable} ${sans.variable}`
