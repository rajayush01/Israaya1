import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteImages } from '@/data/imageManifest'

const parallaxImage = siteImages[42]

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <section ref={ref} className="relative h-[80vh] md:h-[100vh] overflow-hidden bg-charcoal">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={parallaxImage}
          alt="Israaya campaign"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
      </motion.div>

      <div className="relative h-full flex items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
          className="font-display italic text-softwhite text-[10vw] md:text-[3.6vw] text-center leading-tight"
        >
          Woven into every silhouette.
        </motion.p>
      </div>
    </section>
  )
}
