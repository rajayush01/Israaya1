import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { socialGrid } from '@/data/collections'
import InstagramIcon from '@/components/ui/InstagramIcon'
import { useStore } from '@/lib/store'

const INSTAGRAM_HANDLE = 'israayaindiaofficial'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

export default function InstagramGrid() {
  const { setNewsletterOpen } = useStore()
  const [activeImg, setActiveImg] = useState<string | null>(null)

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <RevealText>
              <SectionLabel>From Israaya</SectionLabel>
            </RevealText>

            <RevealText
              as="h2"
              delay={0.1}
              className="font-display text-[9vw] md:text-[3.4vw] mt-3 leading-[0.98]"
            >
              @{INSTAGRAM_HANDLE}
            </RevealText>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline text-xs tracking-label uppercase underline-reveal"
          >
            Follow
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {socialGrid.map((img, i) => (
            <RevealText
              key={img}
              delay={(i % 3) * 0.06}
              className={`group relative overflow-hidden ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveImg(img)}
                className={`relative overflow-hidden w-full text-left ${
                  i === 0
                    ? 'h-[380px] md:h-[520px]'
                    : 'h-[180px] md:h-[250px]'
                }`}
                aria-label="Open Israaya post"
                data-cursor="View"
              >
                <img
                  src={img}
                  alt={`Israaya Instagram post ${i + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-softwhite text-[10px] tracking-label uppercase">
                    <InstagramIcon size={13} />
                    View on Instagram
                  </span>
                </div>
              </button>
            </RevealText>
          ))}
        </div>

        {/* CTA */}
        <RevealText
          delay={0.15}
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-charcoal/30 text-charcoal px-7 py-3.5 text-xs tracking-label uppercase hover:bg-charcoal hover:text-softwhite transition-colors duration-500"
          >
            <InstagramIcon size={14} />
            Follow
          </a>

          <button
            type="button"
            onClick={() => setNewsletterOpen(true)}
            className="border border-charcoal/30 text-charcoal px-7 py-3.5 text-xs tracking-label uppercase hover:bg-charcoal hover:text-softwhite transition-colors duration-500"
          >
            Subscribe
          </button>
        </RevealText>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-6"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setActiveImg(null)}
              className="absolute top-8 right-8 text-softwhite"
              aria-label="Close"
            >
              <X size={26} strokeWidth={1.2} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              <div className="w-full aspect-[4/5] bg-charcoal border border-softwhite/10 overflow-hidden rounded-2xl">
                <img
                  src={activeImg}
                  alt="Israaya Instagram post"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-softwhite/30 text-softwhite px-7 py-3.5 text-xs tracking-label uppercase hover:bg-softwhite hover:text-charcoal transition-colors duration-500"
                >
                  <InstagramIcon size={14} />
                  Follow
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveImg(null)
                    setNewsletterOpen(true)
                  }}
                  className="border border-softwhite/30 text-softwhite px-7 py-3.5 text-xs tracking-label uppercase hover:bg-softwhite hover:text-charcoal transition-colors duration-500"
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}