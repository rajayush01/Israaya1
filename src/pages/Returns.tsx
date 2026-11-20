import RevealText from '@/components/ui/RevealText'

const sections = [
  {
    title: 'Return & Exchange Window',
    paragraphs: [
      'You must raise a size exchange request within 4 days of receiving your order. We do not accept requests beyond this window.',
      'We do not offer returns or refunds for reasons of size, fit, or change of mind — only size exchanges as outlined above.',
    ],
  },
  {
    title: 'Exchange Shipping Charges',
    paragraphs: [
      'For size exchanges, the shipping charges for both pickup of the original piece and delivery of the replacement will be borne by the customer.',
    ],
  },
  {
    title: 'Eligibility',
    paragraphs: [
      'Products must be unused, unworn, and in perfect condition, with all original tags intact.',
      'Exchange is valid only for incorrect size ordered. Any other reasons are subject to approval.',
    ],
  },
  {
    title: 'Non-Exchangeable Items',
    paragraphs: [
      'Customized orders — colour changes, design tweaks, or any other personalization — are final sale and not eligible for exchange, since these are made specifically to your request.',
    ],
  },
  {
    title: "When It's On Us",
    paragraphs: [
      "If we've made a mistake, we'll make it right.",
      'If you receive the wrong product, or the product has a manufacturing defect, we will offer a store credit or a replacement, as per your preference. We do not offer cash refunds.',
    ],
  },
  {
    title: 'Important Notes',
    paragraphs: [
      'Any item returned in a used, damaged, or altered condition will not be eligible for exchange and will be sent back to you without further action.',
      'For any questions, or to initiate an exchange, please contact us on WhatsApp or via email with your order number and concern.',
    ],
  },
]

export default function Returns() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[900px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-4">
        Returns &amp; Exchanges
      </RevealText>
      <RevealText delay={0.05}>
        <p className="text-brown/70 leading-relaxed mb-3 text-sm max-w-xl">
          At Israaya, every piece is made to order and crafted by hand. As we
          work with made-to-order production timelines, we request you to
          kindly review the following policy before making a purchase.
        </p>
        <p className="text-brown/60 mb-16 text-sm">
          Need help?{' '}
          <a href="/contact" className="underline-reveal text-brown">
            Contact us.
          </a>
        </p>
      </RevealText>

      <div className="space-y-14">
        {sections.map((s, i) => (
          <RevealText key={i} delay={i * 0.07}>
            <div className="border-t border-charcoal/10 pt-8">
              <h2 className="text-[10px] tracking-label uppercase text-brown/50 mb-5">{s.title}</h2>
              <div className="space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm text-brown/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </RevealText>
        ))}
      </div>
    </div>
  )
}
