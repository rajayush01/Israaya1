import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
// import InstagramIcon from '@/components/ui/InstagramIcon'
// import { useStore } from '@/lib/store'
import { siteImages } from '@/data/imageManifest'

const reelImage = siteImages[30]
const INSTAGRAM_HANDLE = 'israayaindiaofficial'
// const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

export default function CampaignVideo() {
  const [open, setOpen] = useState(false)
  // const { setNewsletterOpen } = useStore()

  return (
    <section className="relative bg-ivory overflow-hidden">
      {/* Diagonal-framed cinematic band — referencing House On The Clouds' "Soul + Cinema" section */}
      <div
        className="relative bg-charcoal"
        style={{ clipPath: 'polygon(0 7%, 100% 0%, 100% 93%, 0% 100%)' }}
      >
        <img
          src={reelImage}
          alt="Israaya in motion"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/45 to-charcoal/75" />

        <div className="relative flex flex-col items-center text-center px-6 py-28 md:py-40">
          <RevealText className="text-[10px] tracking-label uppercase text-softwhite/60 mb-6">
            @{INSTAGRAM_HANDLE}
          </RevealText>

          <RevealText
            as="h2"
            delay={0.1}
            className="font-display text-softwhite text-[11vw] md:text-[4.2vw] leading-none tracking-tight"
          >
            Israaya
          </RevealText>

          <RevealText
            delay={0.2}
            className="font-display italic text-softwhite/80 text-sm md:text-lg max-w-xl mt-8 leading-relaxed"
          >
            Every collection has its own rhythm, and so do our films. Chapter after
            chapter, we set out to capture Israaya not as garments but as living
            stories — moments of craft, culture and quiet elegance, carried from
            India to the rest of the world.
          </RevealText>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-8 text-softwhite"
              aria-label="Close video"
            >
              <X size={26} strokeWidth={1.2} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-w-sm aspect-[9/16] bg-charcoal border border-softwhite/10 flex items-center justify-center overflow-hidden rounded-2xl"
            >
              {/* Replace with an embedded Instagram reel (blockquote embed) once the
                  live reel URL from @israayaindiaofficial is available. */}
              <img
                src={reelImage}
                alt="Campaign placeholder"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
