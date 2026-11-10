export const dynamic = 'force-dynamic'

export function GET(req: Request) {
  const c = req.headers.get('x-vercel-ip-country')
  return Response.json({ country: c && /^[A-Z]{2}$/.test(c) ? c : null }, { headers: { 'Cache-Control': 'private, no-store' } })
}
