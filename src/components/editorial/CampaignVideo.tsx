import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import sonaPankh2 from '@/assets/products/sona-pankh-2.png'

export default function CampaignVideo() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-charcoal">
      <img
        src={sonaPankh2}
        alt="Israaya in motion"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative h-full flex flex-col items-center justify-center gap-8">
        <RevealText as="h2" className="font-display text-softwhite text-[11vw] md:text-[4.5vw] text-center leading-none tracking-tight">
          Israaya
          <br />
          <span className="italic">in Motion</span>
        </RevealText>

        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-softwhite/60 flex items-center justify-center hover:bg-softwhite/10 transition-colors duration-500"
          aria-label="Play campaign video"
          data-cursor="Play"
        >
          <Play size={20} strokeWidth={1.2} className="text-softwhite ml-1" />
        </button>
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
              className="w-full max-w-4xl aspect-video bg-charcoal border border-softwhite/10 flex items-center justify-center"
            >
              <img
                src={sonaPankh2}
                alt="Campaign placeholder"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
