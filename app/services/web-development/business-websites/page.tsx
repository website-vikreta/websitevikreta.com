import '@/app/wv.css'
import { LeafPage } from '@/components/wv/web/LeafPage'
import { groupJsonLd, groupMetadata } from '@/components/wv/web/group-seo'
import { wvFonts } from '@/components/wv/fonts'
import { ScrollProgress, Smooth } from '@/components/wv/ui'
import { GROUPS } from '@/content/web/groups'

const G = GROUPS['business-websites']

export const metadata = groupMetadata(G)

export default function Page() {
  return (
    <div className={`wv ${wvFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(groupJsonLd(G)) }} />
      <ScrollProgress />
      <Smooth />
      <LeafPage c={G.c} />
    </div>
  )
}
