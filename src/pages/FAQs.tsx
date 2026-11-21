import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'

const faqs = [
  {
    q: 'What is Israaya, and what makes it unique?',
    a: 'Israaya is a made to order Indian wear label that experiments with traditional embroidery and craft to create fun, versatile pieces — not built for one occasion or one culture, but for global everyday wear. Each chapter takes inspiration from a different theme, era or idea, using age-old techniques in new ways rather than repeating the past. Made for the woman of today who values art, fashion and culture, Israaya is also built to support the artisans behind it, promoting Indian craftsmanship and giving it the recognition it deserves.',
  },
  {
    q: 'How do I choose the right size?',
    a: 'Please refer to our Size Guide, available from XS to 7XL, before placing your order. Custom sizing is also available — please get in touch with us directly to arrange this. If you need any assistance with sizing or fit, feel free to contact us and we\'ll be happy to help.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, UPI, net banking, and other secure online payment methods available at checkout. Cash on Delivery (COD) is not currently available, but will be introduced soon.',
  },
  {
    q: 'How should I care for my garment?',
    a: 'To preserve the fabric, embroidery, and craftsmanship of your garment, we recommend dry cleaning only. Store your piece in a cool place away from heat, wrapped in muslin or a proper garment bag, to keep it well maintained for years to come.',
  },
  {
    q: 'How long will my order take to arrive?',
    a: 'As all our garments are made to order, domestic orders are typically delivered within 15–25 days, unless stated otherwise on the product page. International orders may take slightly longer. If you require your order urgently, expedited shipping may be available — please contact us via email at israayaindia@gmail.com or WhatsApp at +91 95992 80024 before placing your order, and we will do our best to accommodate your request.',
  },
  {
    q: 'Do you offer custom sizing?',
    a: 'Yes. Custom sizing is available — please get in touch with us directly to arrange your measurements before placing your order.',
  },
  {
    q: 'Can I customize the design of my piece?',
    a: 'Yes. Since every Israaya piece is made to order, small customizations are welcome — from changing the colour to tweaking the neckline or adding and removing elements like a dupatta. Please reach out to us on WhatsApp or email before placing your order so we can confirm what\'s possible for the specific piece you have in mind.',
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'As each garment is made to order, we do not currently accept returns. Size exchanges are available — please contact us within 4 days of receiving your order to arrange one.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship both within India and internationally. Shipping costs and delivery timelines vary for international orders and are higher than domestic shipping. Please get in touch with us for international deliveries or expedited orders before placing your order.',
  },
]

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[900px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-4">
        FAQs
      </RevealText>
      <RevealText delay={0.05}>
        <p className="text-brown/60 mb-16 text-sm">
          Can't find what you're looking for?{' '}
          <a href="/contact" className="underline-reveal text-brown">
            Get in touch.
          </a>
        </p>
      </RevealText>

      <div className="border-t border-charcoal/10">
        {faqs.map((faq, i) => (
          <RevealText key={i} delay={i * 0.04}>
            <div className="border-b border-charcoal/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-sm md:text-base font-medium leading-snug">{faq.q}</span>
                <m.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 mt-0.5"
                >
                  <ChevronDown size={16} strokeWidth={1.3} />
                </m.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-brown/70 leading-relaxed pb-5 max-w-2xl">
                      {faq.a}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </RevealText>
        ))}
      </div>
    </div>
  )
}
