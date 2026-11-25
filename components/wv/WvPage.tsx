import '@/app/wv.css'
import { Vikreta } from './Home'
import { wvFonts } from './fonts'
import { ScrollProgress, Smooth } from './ui'

export function WvPage() {
  return (
    <div className={`wv ${wvFonts}`}>
      <ScrollProgress />
      <Smooth />
      <Vikreta />
    </div>
  )
}
