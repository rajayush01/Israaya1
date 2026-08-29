import { useState } from 'react'
import InstagramIcon from '@/components/ui/InstagramIcon'
import RevealText from '@/components/ui/RevealText'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="bg-charcoal text-softwhite pt-24 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <RevealText as="h2" className="font-display text-[14vw] md:text-[8vw] leading-none tracking-tight text-softwhite/95 mb-16">
          ISRAAYA
        </RevealText>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 pb-16 border-b border-softwhite/10">
          <FooterCol title="Shop" items={['Nikhaar Collection', 'All Products']} />
          <FooterCol title="Customer Care" items={['Contact Us', 'FAQs', 'Shipping & Delivery', 'Returns & Exchanges', 'Cancellation Policy', 'Size Guide', 'Care Guide', 'Bespoke Enquiries']} />
          <FooterCol title="Legal" items={['Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Return & Exchange Policy', 'Cancellation Policy', 'Disclaimer']} />
          <FooterCol
            title="Follow"
            items={[]}
            custom={
              <a
                href="https://www.instagram.com/israayaindiaofficial/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-softwhite/70 hover:text-softwhite transition-colors underline-reveal"
              >
                <InstagramIcon size={15} /> Instagram
              </a>
            }
          />

          <div className="col-span-2 md:col-span-1">
            <p className="text-xs tracking-label uppercase text-softwhite/50 mb-4">
              Letters from Israaya
            </p>
            {subscribed ? (
              <p className="text-sm text-champagne">You're on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSubscribed(true)
                }}
                className="flex items-end border-b border-softwhite/30 pb-2"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Your Email"
                  className="bg-transparent flex-1 text-sm placeholder:text-softwhite/40 outline-none"
                />
                <button
                  type="submit"
                  className="text-xs tracking-label uppercase text-champagne underline-reveal shrink-0"
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-2 text-[11px] tracking-wide text-softwhite/40">
          <span>© {new Date().getFullYear()} Israaya India</span>
          <span>Made in India.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
  custom,
}: {
  title: string
  items: string[]
  custom?: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs tracking-label uppercase text-softwhite/50 mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="text-sm text-softwhite/70 hover:text-softwhite transition-colors underline-reveal">
              {item}
            </a>
          </li>
        ))}
        {custom && <li>{custom}</li>}
      </ul>
    </div>
  )
}
