import { WaButton } from './WaButton'

/** Mobile-only bar (<720px). Hidden by CSS above that. */
export function StickyCta() {
  return (
    <div className="wv-ax-sticky">
      <WaButton text="Hi, I want to automate something." variant="y" small label="WhatsApp us" />
      <a href="#lead" className="wv-btn wv-btn-ghost wv-btn-sm">
        Get plan
      </a>
    </div>
  )
}
