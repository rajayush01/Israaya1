import RevealText from '@/components/ui/RevealText'

const sections = [
  {
    title: 'Shipping Methods and Costs',
    paragraphs: [
      'We ship both within India and internationally.',
      'Standard domestic shipping is included in the product price. Fast or priority shipping within India is available at an extra charge.',
      'Domestic and international orders can be placed directly on our website. If you have any queries or would like to discuss anything before making a purchase, please reach out to us via email at israayaindia@gmail.com or WhatsApp at +91 95992 80024.',
    ],
  },
  {
    title: 'Delivery Timeline',
    paragraphs: [
      'As every piece is made to order, domestic orders are typically delivered within 15–25 days from order confirmation.',
      'International orders may take slightly longer. Please get in touch with us before placing an international order for an accurate timeline.',
      'If you need your order urgently, expedited shipping may be available. Contact us before placing your order so we can accommodate your request where possible.',
    ],
  },
  {
    title: 'Taxes & Duties',
    paragraphs: [
      'For Indian customers, product prices displayed are inclusive of all taxes and duties.',
      'For international customers, taxes, customs and import duties may apply depending on your country and are the responsibility of the recipient. Please contact us for more information before ordering.',
    ],
  },
]

export default function Shipping() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[900px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-4">
        Shipping &amp; Delivery
      </RevealText>
      <RevealText delay={0.05}>
        <p className="text-brown/60 mb-16 text-sm">
          Questions about your order?{' '}
          <a href="/contact" className="underline-reveal text-brown">
            Contact us.
          </a>
        </p>
      </RevealText>

      <div className="space-y-14">
        {sections.map((s, i) => (
          <RevealText key={i} delay={i * 0.08}>
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
