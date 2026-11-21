import PolicyLayout, { type PolicySection } from './PolicyLayout'
import { EmailLink, WhatsAppLink } from '@/lib/siteInfo'

const sections: PolicySection[] = [
  {
    id: 'window',
    title: 'Return & Exchange Window',
    paragraphs: [
      'You must raise a size exchange request within 4 days of receiving your order. We do not accept requests beyond this window.',
      'We do not offer returns or refunds for reasons of size, fit, or change of mind. Only size exchanges, as outlined here, are available.',
    ],
  },
  {
    id: 'shipping-charges',
    title: 'Exchange Shipping Charges',
    paragraphs: [
      'For size exchanges, the shipping charges for both pickup of the original piece and delivery of the replacement will be borne by the customer.',
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    bullets: [
      'Products must be unused, unworn, and in perfect condition, with all original tags intact.',
      'Exchange is valid only for incorrect size ordered. Any other reasons are subject to approval.',
    ],
  },
  {
    id: 'non-exchangeable',
    title: 'Non-Exchangeable Items',
    paragraphs: [
      'Customized orders (colour changes, design tweaks, or any other personalization) are final sale and not eligible for exchange, since these are made specifically to your request.',
    ],
  },
  {
    id: 'on-us',
    title: "When It's On Us",
    paragraphs: [
      "If we've made a mistake, we'll make it right.",
      'If you receive the wrong product, or the product has a manufacturing defect, we will offer a store credit or a replacement, as per your preference. We do not offer cash refunds.',
    ],
  },
  {
    id: 'notes',
    title: 'Important Notes',
    paragraphs: [
      'Any item returned in a used, damaged, or altered condition will not be eligible for exchange and will be sent back to you without further action.',
      <>
        For any questions, or to initiate an exchange, please contact us on WhatsApp at <WhatsAppLink /> or via email
        at <EmailLink /> with your order number and concern.
      </>,
    ],
  },
]

export default function Returns() {
  return (
    <PolicyLayout
      eyebrow="Customer Care"
      title="Returns & Exchanges"
      intro="At Israaya, every piece is made to order and crafted by hand. As we work with made-to-order production timelines, we request you to kindly review the following policy before making a purchase."
      highlights={[
        { label: 'Exchange window', value: '4 days' },
        { label: 'Available', value: 'Size exchanges' },
        { label: 'If we get it wrong', value: 'Credit or replacement' },
      ]}
      sections={sections}
    />
  )
}