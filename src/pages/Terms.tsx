import PolicyLayout, { type PolicySection } from './PolicyLayout'
import { EmailLink, WhatsAppLink, PolicyLink, SITE } from '@/lib/siteInfo'

const sections: PolicySection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing this website or placing an order with Israaya India ("Israaya", "we", "us"), you agree to these Terms & Conditions and to our Privacy, Shipping and Return & Exchange policies. If you do not agree, please do not use the site.',
    ],
  },
  {
    id: 'products',
    title: 'Our Products',
    paragraphs: [
      'Every Israaya piece is made to order and hand embroidered by karigars once it is called for. Nothing is mass produced.',
      'Because each piece is handmade, slight variations in colour, embroidery and finish are natural and are part of its character. Colours may also appear differently on different screens.',
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Taxes',
    paragraphs: [
      'All prices are shown in Indian Rupees (₹). For Indian customers, displayed prices are inclusive of all taxes and duties.',
      <>
        For international customers, taxes, customs and import duties may apply and are the responsibility of the
        recipient. See our <PolicyLink to="/shipping">Shipping Policy</PolicyLink>.
      </>,
      'We may update prices at any time. The price at the time you place your order is the price you pay.',
    ],
  },
  {
    id: 'orders',
    title: 'Orders & Payment',
    paragraphs: [
      'When you place an order, you confirm that the information you provide is accurate and complete. We may decline or cancel an order in cases such as pricing errors or suspected fraud, and will refund any payment made for it.',
      'We accept major credit and debit cards, UPI, net banking and other secure online payment methods available at checkout. Cash on Delivery is not currently available.',
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing & Customization',
    paragraphs: [
      'Please refer to our Size Guide before ordering. Custom sizing and small design customizations are available on request; please contact us before placing your order so we can confirm what is possible.',
      'Customized orders are made specifically for you and are final sale.',
    ],
  },
  {
    id: 'delivery',
    title: 'Shipping & Delivery',
    paragraphs: [
      <>
        Delivery timelines depend on the piece and your location. Please read our{' '}
        <PolicyLink to="/shipping">Shipping Policy</PolicyLink> for details.
      </>,
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    paragraphs: [
      <>
        As each garment is made to order, we do not accept returns. Size exchanges are available within 4 days of
        delivery. Full details are in our <PolicyLink to="/returns">Return & Exchange Policy</PolicyLink>.
      </>,
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website, including designs, embroidery motifs, photographs, videos, text, logos and the Israaya name, belongs to Israaya or its licensors and is protected by applicable intellectual property laws.',
      'You may not copy, reproduce, distribute or use any of it commercially without our written permission.',
    ],
  },
  {
    id: 'conduct',
    title: 'Acceptable Use',
    paragraphs: ['When using our website, you agree not to:'],
    bullets: [
      'Use the site for any unlawful purpose or in a way that could harm it or other users.',
      'Attempt to gain unauthorised access to the site, our systems or other users’ information.',
      'Use automated tools to scrape or copy content without our permission.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'We take care to keep the information on this website accurate, but we provide it on an "as is" basis. To the fullest extent permitted by law, Israaya is not liable for indirect or consequential losses arising from the use of this website or our products.',
      'Nothing in these terms limits any rights you have under applicable consumer protection law.',
    ],
  },
  {
    id: 'law',
    title: 'Governing Law',
    paragraphs: [
      `These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at ${SITE.jurisdiction}, India.`,
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    paragraphs: [
      'We may update these terms from time to time. The latest version will always be on this page, and continued use of the site means you accept the changes.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      <>
        Questions about these terms? Write to <EmailLink /> or message us on WhatsApp at <WhatsAppLink />.
      </>,
    ],
  },
]

export default function Terms() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="Please read these terms before using our website or placing an order. They are written to be clear, because made-to-order fashion works best when expectations are shared."
      sections={sections}
    />
  )
}