import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { siteImages } from '@/data/imageManifest'

const popupImage = siteImages[36]

export default function NewsletterPopup() {
  const { isNewsletterOpen, setNewsletterOpen } = useStore()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const close = () => {
    setNewsletterOpen(false)
    // reset after the exit transition finishes
    setTimeout(() => setSubmitted(false), 400)
  }

  return (
    <AnimatePresence>
      {isNewsletterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-ivory grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[92vh]"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 text-charcoal md:text-softwhite mix-blend-difference"
              aria-label="Close"
            >
              <X size={22} strokeWidth={1.3} />
            </button>

            <div className="hidden md:block h-full">
              <img
                src={popupImage}
                alt="Israaya India"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col items-center justify-center text-center px-8 py-14 md:px-10">
              <p className="text-[10px] tracking-label uppercase text-brown/50 mb-3">
                Join the House
              </p>
              <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-4">
                Be the first to know
              </h3>
              <p className="text-sm text-brown/70 leading-relaxed mb-8 max-w-xs">
                Sign up for early access to new chapters, private previews and stories
                from the house of Israaya.
              </p>

              {submitted ? (
                <p className="text-sm text-burgundy">
                  You&rsquo;re on the list. Welcome to the house.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="w-full max-w-xs"
                >
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-charcoal/25 pb-3 mb-6 text-sm text-center outline-none placeholder:text-brown/40 focus:border-charcoal transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-charcoal text-softwhite py-4 text-xs tracking-label uppercase hover:bg-burgundy transition-colors duration-500"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
