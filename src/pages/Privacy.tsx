import PolicyLayout, { type PolicySection } from './PolicyLayout'
import { EmailLink, WhatsAppLink, PolicyLink } from '@/lib/siteInfo'

const sections: PolicySection[] = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'This Privacy Policy explains how Israaya India ("Israaya", "we", "us") collects, uses and protects your personal information when you visit our website, place an order or contact us.',
      'By using our website, you agree to the practices described here. If you do not agree, please do not use the site.',
    ],
  },
  {
    id: 'collect',
    title: 'Information We Collect',
    paragraphs: ['We collect only what we need to make, ship and support your order:'],
    bullets: [
      'Contact details: your name, email address and phone number.',
      'Order details: shipping and billing addresses, the pieces you order, and your order history.',
      'Measurements and customization requests, where you ask for custom sizing or design changes.',
      'Messages you send us through our contact form, WhatsApp, email or Instagram.',
      'Basic technical data such as device, browser and pages visited, collected through cookies and similar tools.',
    ],
  },
  {
    id: 'use',
    title: 'How We Use Your Information',
    bullets: [
      'To process, make, ship and deliver your made-to-order pieces.',
      'To arrange custom sizing, customization and exchanges.',
      'To respond to your questions and provide customer support.',
      'To send order updates and, where you have agreed, news about new chapters.',
      'To keep our website secure, prevent fraud and improve how it works.',
      'To meet our legal and tax obligations.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who We Share It With',
    paragraphs: [
      'We do not sell your personal information. We share it only with trusted partners who help us serve you, and only as much as they need:',
    ],
    bullets: [
      'Payment providers, to process your payment securely.',
      'Courier and logistics partners, to deliver your order.',
      'Our production team, who receive the details needed to make your piece, such as size and customization requests.',
      'Service providers that host our website or help us with analytics and communication.',
      'Authorities, where we are required to do so by law.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    paragraphs: [
      'Payments are processed by secure third-party payment providers. We do not store your full card details on our servers.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'We use cookies and similar technologies to keep your bag working, remember your preferences and understand how the site is used. You can control or disable cookies in your browser settings, though some parts of the site may not work as intended without them.',
    ],
  },
  {
    id: 'retention',
    title: 'Retention & Security',
    paragraphs: [
      'We keep your information only as long as needed to fulfil your order, support you, and meet legal and accounting requirements.',
      'We use reasonable technical and organisational measures to protect your information. No online system is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'rights',
    title: 'Your Choices & Rights',
    paragraphs: [
      <>
        You can ask us to access, correct or delete the personal information we hold about you, or withdraw your
        consent to marketing messages at any time, by writing to <EmailLink /> or messaging us on <WhatsAppLink />. We
        will respond as required under applicable Indian law, including the Digital Personal Data Protection Act, 2023.
      </>,
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    paragraphs: [
      'Our website is not directed at children under 18, and we do not knowingly collect their personal information. If you believe a child has shared information with us, please contact us and we will remove it.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this policy from time to time. The latest version will always be available on this page, with the date it was last updated.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      <>
        For any privacy questions, write to <EmailLink /> or reach us on WhatsApp at <WhatsAppLink />. You can also read
        our <PolicyLink to="/terms">Terms & Conditions</PolicyLink>.
      </>,
    ],
  },
]

export default function Privacy() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your trust matters as much as your order. This page explains what we collect, why we collect it, and how we look after it."
      sections={sections}
    />
  )
}