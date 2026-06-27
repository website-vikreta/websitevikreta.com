import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms and Conditions | WebsiteVikreta',
  description: 'Read the terms and conditions for using WebsiteVikreta\'s website and services, including intellectual property, payments, and acceptable use.',
  keywords: [
    'WebsiteVikreta terms',
    'terms and conditions',
    'website terms of use',
    'service agreement',
  ],
  openGraph: {
    title: 'Terms and Conditions | WebsiteVikreta',
    description: 'Read the terms and conditions for using WebsiteVikreta\'s website and services, including intellectual property, payments, and acceptable use.',
    url: 'https://stage.websitevikreta.com/legal/terms-and-conditions',
    siteName: 'WebsiteVikreta',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebsiteVikreta Terms and Conditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | WebsiteVikreta',
    description: 'Read the terms and conditions for using WebsiteVikreta\'s website and services.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/legal/terms-and-conditions',
  },
  robots: {
    index: true,
    follow: false,
  },
}

const sections = [
  {
    heading: 'Introduction',
    content: 'Welcome to Website Vikreta ("Company", "we", "our", "us"). These Terms of Service ("Terms") govern your use of our website located at WebsiteVikreta.com operated by Website Vikreta. Our Privacy Policy also governs your use of our Service. Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood these Agreements and agree to be bound by them. If you do not agree with these Agreements, you may not use the Service.',
  },
  {
    heading: 'Communications',
    content: 'By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at contact@websitevikreta.com.',
  },
  {
    heading: 'Purchases',
    content: 'If you wish to purchase any product or service made available through our Service, you may be asked to supply certain information relevant to your purchase including your credit or debit card number, expiration date, billing address, and shipping information. You represent and warrant that you have the legal right to use any payment method provided and that all information you supply is true, correct and complete. We reserve the right to refuse or cancel your order at any time for reasons including product or service availability, errors in the description or price, error in your order, fraud, or unauthorized or illegal transactions.',
  },
  {
    heading: 'Contests, Sweepstakes and Promotions',
    content: 'Any contests, sweepstakes or other promotions made available through our Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy.',
  },
  {
    heading: 'Refunds',
    content: 'We issue refunds for Contracts within 30 days of the original purchase of the Contract.',
  },
  {
    heading: 'Content',
    content: 'Content found on or through this Service is the property of Website Vikreta or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.',
  },
  {
    heading: 'Prohibited Uses',
    content: [
      'You may use Service only for lawful purposes and in accordance with these Terms.',
      'You agree not to use Service in any way that violates any applicable national or international law or regulation.',
      'You agree not to use Service to exploit, harm, or attempt to exploit or harm minors in any way.',
      'You agree not to transmit any advertising or promotional material, including any \'junk mail\', \'chain letter\', \'spam\', or any other similar solicitation.',
      'You agree not to impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.',
      'You agree not to use any robot, spider, or other automatic device to access Service for any purpose including monitoring or copying any material on Service.',
      'You agree not to introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.',
      'You agree not to attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service or any server, computer, or database connected to Service.',
    ],
  },
  {
    heading: 'Analytics',
    content: 'We may use third-party Service Providers to monitor and analyze the use of our Service.',
  },
  {
    heading: 'No Use By Minors',
    content: 'Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and have the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of these Terms.',
  },
  {
    heading: 'Intellectual Property',
    content: 'Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Website Vikreta and its licensors. Service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without the prior written consent of Website Vikreta.',
  },
  {
    heading: 'Copyright Policy',
    content: 'We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights of any person or entity. If you are a copyright owner and believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to contact@websitevikreta.com with the subject line: \'Copyright Infringement\'.',
  },
  {
    heading: 'DMCA Notice and Procedure for Copyright Infringement Claims',
    content: [
      'An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright\'s interest.',
      'A description of the copyrighted work that you claim has been infringed, including the URL of the location where the copyrighted work exists.',
      'Identification of the URL or other specific location on Service where the material that you claim is infringing is located.',
      'Your address, telephone number, and email address.',
      'A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.',
      'A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner\'s behalf.',
      'You can contact our Copyright Agent via email at contact@websitevikreta.com.',
    ],
  },
  {
    heading: 'Error Reporting and Feedback',
    content: 'You may provide us directly at contact@websitevikreta.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service. You acknowledge and agree that you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback, and that Company is not under any obligation of confidentiality with respect to the Feedback.',
  },
  {
    heading: 'Links to Other Websites',
    content: 'Our Service may contain links to third party websites or services that are not owned or controlled by Website Vikreta. Website Vikreta has no control over and assumes no responsibility for the content, privacy policies, or practices of any third party websites or services. We strongly advise you to read the Terms of Service and Privacy Policies of any third party websites or services that you visit.',
  },
  {
    heading: 'Disclaimer of Warranty',
    content: 'These services are provided by Company on an \'as is\' and \'as available\' basis. Company makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk. Company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise.',
  },
  {
    heading: 'Limitation of Liability',
    content: 'Except as prohibited by law, you will hold us and our officers, directors, employees, and agents harmless for any indirect, punitive, special, incidental, or consequential damage, however it arises. Except as prohibited by law, if there is liability found on the part of Company, it will be limited to the amount paid for the products and/or services, and under no circumstances will there be consequential or punitive damages.',
  },
  {
    heading: 'Termination',
    content: 'We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of Terms. All provisions of Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity and limitations of liability.',
  },
  {
    heading: 'Governing Law',
    content: 'These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. These Terms constitute the entire agreement between us regarding our Service.',
  },
  {
    heading: 'Changes to Service and Amendments to Terms',
    content: 'We reserve the right to withdraw or amend our Service in our sole discretion without notice. We may amend Terms at any time by posting the amended terms on this site. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes.',
  },
  {
    heading: 'Waiver and Severability',
    content: 'No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition. If any provision of Terms is held by a court to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.',
  },
  {
    heading: 'Acknowledgement',
    content: 'By using Service or other services provided by us, you acknowledge that you have read these Terms of Service and agree to be bound by them.',
  },
  {
    heading: 'Contact Us',
    content: 'Please send your feedback, comments, and requests for technical support by email: contact@websitevikreta.com.',
  },
]

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="August 19, 2020"
      sections={sections}
    />
  )
}
