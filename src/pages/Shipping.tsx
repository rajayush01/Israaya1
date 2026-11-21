import PolicyLayout, { type PolicySection } from './PolicyLayout'
import { EmailLink, WhatsAppLink, PolicyLink } from '@/lib/siteInfo'

const sections: PolicySection[] = [
  {
    id: 'methods',
    title: 'Shipping Methods and Costs',
    paragraphs: [
      'We ship both within India and internationally.',
      'Standard domestic shipping is included in the product price. Fast or priority shipping within India is available at an extra charge.',
      'Shipping cost and delivery timelines vary for international orders and are higher than domestic shipping.',
      <>
        Orders can be placed directly on our website. If you have any queries or would like to discuss anything
        before making a purchase, please reach out to us via email at <EmailLink /> or WhatsApp at <WhatsAppLink />.
      </>,
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery Timeline',
    paragraphs: [
      'As every piece is made to order, domestic orders are typically delivered within 15–25 days from order confirmation.',
      'International orders may take slightly longer. Please get in touch with us before placing an international order for an accurate timeline.',
      'If you need your order urgently, expedited shipping may be available. Contact us before placing your order so we can accommodate your request where possible.',
    ],
  },
  {
    id: 'taxes',
    title: 'Taxes & Duties',
    paragraphs: [
      'For Indian customers, product prices displayed are inclusive of all taxes and duties.',
      'For international customers, taxes, customs and import duties may apply depending on your country and are the responsibility of the recipient. Please contact us for more information before ordering.',
    ],
  },
  {
    id: 'exchanges',
    title: 'Exchanges & Returns',
    paragraphs: [
      <>
        Every piece is made to order. Please read our <PolicyLink to="/returns">Return & Exchange Policy</PolicyLink>{' '}
        before placing your order.
      </>,
    ],
  },
]

export default function Shipping() {
  return (
    <PolicyLayout
      eyebrow="Customer Care"
      title="Shipping & Delivery"
      intro="Every Israaya piece is cut, fitted and finished for one person. Here is how we get it to you, within India and across the world."
      highlights={[
        { label: 'Domestic delivery', value: '15–25 days' },
        { label: 'Standard domestic shipping', value: 'Included' },
        { label: 'We ship', value: 'India & worldwide' },
      ]}
      sections={sections}
    />
  )
}