import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import heroImage from '@/assets/products/komal-tara-2.png'

const ease = [0.25, 1, 0.5, 1] as const

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Israaya — Nikhaar collection"
          className="w-full h-full object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />
      </motion.div>

      <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-20 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease }}
          className="text-xs md:text-sm tracking-label uppercase text-softwhite/70 mb-5"
        >
          Nikhaar · Chapter I
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.3, ease }}
          className="font-display text-softwhite text-[15vw] md:text-[7vw] leading-[0.92] tracking-tight"
        >
          Modern Indianwear,
          <br />
          <span className="italic text-champagne">Rooted in Craft.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1, ease }}
          className="mt-10"
        >
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 text-softwhite text-xs tracking-label uppercase"
            data-cursor="Explore"
          >
            <span className="underline-reveal">Explore the Collection</span>
            <ArrowRight
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-label uppercase text-softwhite/60 [writing-mode:vertical-lr]">
          Scroll to Discover
        </span>
        <span className="w-px h-10 bg-softwhite/40 relative overflow-hidden">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-champagne"
          />
        </span>
      </motion.div>
    </section>
  )
}
