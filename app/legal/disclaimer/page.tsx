import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Disclaimer | WebsiteVikreta',
  description: 'Read WebsiteVikreta\'s disclaimer covering website content, external links, testimonials, trademarks, and limitations of liability.',
  keywords: [
    'WebsiteVikreta disclaimer',
    'website disclaimer',
    'legal disclaimer',
    'web agency disclaimer',
  ],
  openGraph: {
    title: 'Disclaimer | WebsiteVikreta',
    description: 'Read WebsiteVikreta\'s disclaimer covering website content, external links, testimonials, trademarks, and limitations of liability.',
    url: 'https://stage.websitevikreta.com/legal/disclaimer',
    siteName: 'WebsiteVikreta',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebsiteVikreta Disclaimer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | WebsiteVikreta',
    description: 'Read WebsiteVikreta\'s disclaimer covering website content, external links, testimonials, trademarks, and limitations of liability.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/legal/disclaimer',
  },
  robots: {
    index: true,
    follow: false,
  },
}

const sections = [
  {
    heading: 'Website Disclaimer',
    content: 'The information provided by Website Vikreta ("Company", "we", "our", "us") on websitevikreta.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Site or reliance on any information provided on the Site. Your use of the Site and your reliance on any information on the Site is solely at your own risk.',
  },
  {
    heading: 'External Links Disclaimer',
    content: 'The Site may contain links to other websites or content belonging to or originating from third parties or links to websites and features. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Site. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.',
  },
  {
    heading: 'Testimonials Disclaimer',
    content: [
      'The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users.',
      'However, the experiences are personal to those particular users and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.',
      'Your individual results may vary.',
      'The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar or typing errors.',
      'The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions.',
    ],
  },
  {
    heading: 'Errors and Omissions Disclaimer',
    content: 'While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Website Vikreta is not responsible for any errors or omissions or for the results obtained from the use of this information. All information in this site is provided \'as is\', with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied. In no event will Website Vikreta, its related partnerships or corporations, or the partners, agents or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in this Site or for any consequential, special or similar damages.',
  },
  {
    heading: 'Logos and Trademarks Disclaimer',
    content: 'All logos and trademarks of third parties referenced on websitevikreta.com are the trademarks and logos of their respective owners. Any inclusion of such trademarks or logos does not imply or constitute any approval, endorsement or sponsorship of Website Vikreta by such owners.',
  },
  {
    heading: 'Contact Us',
    content: 'Should you have any feedback, comments, requests for technical support or other inquiries, please contact us by email: contact@websitevikreta.com.',
  },
]

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="August 19, 2020"
      sections={sections}
    />
  )
}
