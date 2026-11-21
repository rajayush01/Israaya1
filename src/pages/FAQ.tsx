import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EMAIL = 'israayaindia@gmail.com'
const WHATSAPP_NUMBER = '91XXXXXXXXXX' // TODO: replace with the real number (country code + number, no + or spaces)
const WHATSAPP_LABEL = '+91 XXXXX XXXXX' // TODO: display format

const EmailLink = () => (
  <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 decoration-burgundy/40 hover:decoration-burgundy transition-colors">
    {EMAIL}
  </a>
)

const WhatsAppLink = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noreferrer"
    className="underline underline-offset-4 decoration-burgundy/40 hover:decoration-burgundy transition-colors"
  >
    {WHATSAPP_LABEL}
  </a>
)

type FAQItem = { q: string; a: ReactNode }

const FAQS: FAQItem[] = [
  {
    q: 'What is Israaya, and what makes it unique?',
    a: (
      <>
        Israaya is a made to order Indian wear label that experiments with traditional embroidery and craft to
        create fun, versatile pieces, not built for one occasion or one culture, but for global everyday wear. Each
        chapter takes inspiration from a different theme, era or idea, using age old techniques in new ways rather
        than repeating the past. Made for the woman of today who values art, fashion and culture, Israaya is also
        built to support the artisans behind it, promoting Indian craftsmanship and giving it the recognition it
        deserves.
      </>
    ),
  },
  {
    q: 'How do I choose the right size?',
    a: (
      <>
        Please refer to our Size Guide, available from XS to 7XL, before placing your order. Custom sizing is also
        available, please get in touch with us directly to arrange this. If you need any assistance with sizing or
        fit, feel free to <Link to="/contact" className="underline underline-offset-4 decoration-burgundy/40 hover:decoration-burgundy transition-colors">contact us</Link>, and we'll be happy to help.
      </>
    ),
  },
  {
    q: 'What payment methods do you accept?',
    a: (
      <>
        We accept all major credit and debit cards, UPI, net banking, and other secure online payment methods
        available at checkout. Cash on Delivery (COD) is not currently available, but will be introduced soon.
      </>
    ),
  },
  {
    q: 'How should I care for my garment?',
    a: (
      <>
        To preserve the fabric, embroidery, and craftsmanship of your garment, we recommend dry cleaning only.
        Store your piece in a cool place away from heat, wrapped in muslin or a proper garment bag, to keep it well
        maintained for years to come.
      </>
    ),
  },
  {
    q: 'How long will my order take to arrive?',
    a: (
      <>
        As all our garments are made to order, domestic orders are typically delivered within 15–25 days, unless
        stated otherwise on the product page. International orders may take slightly longer. If you require your
        order urgently, expedited shipping may be available. Please contact us via email at <EmailLink /> or
        WhatsApp at <WhatsAppLink /> before placing your order, and we will do our best to accommodate your request.
      </>
    ),
  },
  {
    q: 'Do you offer custom sizing?',
    a: (
      <>
        Yes. Custom sizing is available, please get in touch with us directly to arrange your measurements before
        placing your order.
      </>
    ),
  },
  {
    q: 'Can I customize the design of my piece?',
    a: (
      <>
        Yes. Since every Israaya piece is made to order, small customizations are welcome, from changing the colour
        to tweaking the neckline or adding and removing elements like a dupatta. Please reach out to us on{' '}
        <WhatsAppLink /> or <EmailLink /> before placing your order so we can confirm what's possible for the
        specific piece you have in mind.
      </>
    ),
  },
  {
    q: 'What is your return and exchange policy?',
    a: (
      <>
        As each garment is made to order, we do not currently accept returns. Size exchanges are available, please
        contact us within 4 days of receiving your order to arrange one.
      </>
    ),
  },
  {
    q: 'Do you ship internationally?',
    a: (
      <>
        Yes, we ship both within India and internationally. Shipping cost and delivery timelines vary for
        international orders and are higher than domestic shipping. Please get in touch with us for international
        deliveries or expedited orders before placing your order.
      </>
    ),
  },
]

function FAQRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: FAQItem
  index: number
  open: boolean
  onToggle: () => void
}) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.05, 0.3), ease: [0.25, 1, 0.5, 1] }}
      className="border-b border-charcoal/15"
    >
      <h3>
        <button
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group w-full flex items-start gap-4 sm:gap-6 py-5 sm:py-6 lg:py-7 text-left"
        >
          <span className="font-display text-xs sm:text-sm text-burgundy/70 tracking-label pt-1.5 sm:pt-2 w-6 sm:w-8 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={`flex-1 font-display text-lg sm:text-xl lg:text-2xl leading-snug text-charcoal transition-colors duration-300 ${
              open ? 'text-burgundy' : 'group-hover:text-burgundy'
            }`}
          >
            {item.q}
          </span>

          <span
            className={`mt-1 sm:mt-1.5 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              open
                ? 'bg-burgundy border-burgundy text-softwhite'
                : 'border-charcoal/25 text-charcoal group-hover:border-burgundy'
            }`}
          >
            <Plus
              size={15}
              strokeWidth={1.4}
              className={`transition-transform duration-500 ease-out ${open ? 'rotate-45' : ''}`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <p className="pl-10 sm:pl-14 pr-10 sm:pr-14 pb-6 sm:pb-8 text-sm sm:text-[15px] leading-[1.85] text-charcoal/75 max-w-[62ch]">
              {item.a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 sm:gap-14 lg:gap-16 xl:gap-24">
          {/* Intro (sticky on lg+) */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-xs tracking-label uppercase text-burgundy mb-5"
            >
              Help & Information
            </m.p>

            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="font-display text-5xl sm:text-6xl xl:text-7xl leading-[1.02]"
            >
              Frequently
              <br />
              asked <span className="italic text-burgundy">questions</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="mt-6 sm:mt-8 max-w-md text-sm sm:text-[15px] leading-[1.85] text-charcoal/70"
            >
              Everything you need to know about sizing, shipping, customisation and care. Can't find what you're
              looking for? We're always happy to help.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-charcoal text-softwhite text-xs tracking-label uppercase px-6 py-3.5 hover:bg-burgundy transition-colors duration-500"
              >
                Contact us
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-charcoal/25 text-charcoal text-xs tracking-label uppercase px-6 py-3.5 hover:border-burgundy hover:text-burgundy transition-colors duration-500"
              >
                WhatsApp
              </a>
            </m.div>
          </aside>

          {/* Accordion */}
          <section aria-label="Frequently asked questions" className="border-t border-charcoal/15">
            {FAQS.map((item, i) => (
              <FAQRow
                key={item.q}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}