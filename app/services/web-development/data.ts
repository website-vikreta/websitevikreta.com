export interface WebDevProject {
  id:          number
  title:       string
  description: string
  logo:        string | null
  href:        string
}

export const PROJECTS: WebDevProject[] = [
  {
    id: 1,
    title: 'Tocal',
    description: 'A sleek product site for DbyT Dynamics with a clean, modern presentation.',
    logo: '/client-logos/tocal.svg',
    href: 'https://tocal.in/',
  },
  {
    id: 2,
    title: 'Sustainable Bitcoin Protocol',
    description: 'Institutional-grade market infrastructure site for a sustainable Bitcoin protocol.',
    logo: '/client-logos/sustainable-bitcoin-protocol.svg',
    href: 'https://www.sustainablebtc.org/',
  },
  {
    id: 3,
    title: 'Earth by Blancora',
    description: 'A sustainable, stylish e-commerce storefront for a women\'s clothing brand.',
    logo: '/client-logos/blancora.svg',
    href: 'https://blancoraclothing.com/shop',
  },
  {
    id: 4,
    title: 'Archmodal',
    description: 'A polished home page for an architectural modeling and design studio.',
    logo: '/client-logos/archmodal.svg',
    href: 'https://www.archmodal.com/',
  },
  {
    id: 5,
    title: 'Psilent Ganges',
    description: 'An engineering solutions site built for clarity, performance, and trust.',
    // No real logo asset exists for this client yet — flagged, not fabricated.
    logo: null,
    href: 'https://psilentganges.netlify.app/',
  },
  {
    id: 6,
    title: 'Katalyst Consulting',
    description: 'A professional consulting firm site focused on credibility and growth.',
    logo: '/client-logos/katalyst.png',
    href: 'https://www.katalystcs.co.in/',
  },
]
