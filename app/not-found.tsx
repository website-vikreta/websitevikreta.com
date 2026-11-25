import Link from 'next/link'
import { StatusPage } from '@/components/wv/StatusPage'
import { Arrow } from '@/components/wv/ui'

export default function NotFound() {
  return (
    <StatusPage code="404" title="Page not found" text="The page you're looking for doesn't exist or may have been moved.">
      <Link href="/" className="wv-btn wv-btn-y">
        Visit home <Arrow />
      </Link>
      <Link href="/work" className="wv-btn wv-btn-ghost">
        See our work
      </Link>
    </StatusPage>
  )
}
