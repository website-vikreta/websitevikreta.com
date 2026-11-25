/** Sends a lead through our server (captcha-checked), never straight to EmailJS. */
export async function sendLead(params: Record<string, string>, token: string | null): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token ?? '', params }),
  })
  if (!res.ok) throw new Error(`send failed: ${res.status}`)
}
