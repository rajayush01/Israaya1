import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { siteImages } from '@/data/images'

const parallaxImage = siteImages.parallax

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // translate only (the old scale animation re-rasterised a full-screen photo every frame);
  // the image is oversized so the edges never show during the shift.
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative h-[80vh] md:h-[100vh] overflow-hidden bg-charcoal">
      <m.div
        style={{ y, willChange: 'transform' }}
        className="absolute inset-x-0 -top-[12%] -bottom-[12%]"
      >
        <img loading="eager" decoding="async"
          src={parallaxImage}
          alt="Israaya campaign"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
      </m.div>

      <div className="relative h-full flex items-center justify-center px-6">
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="font-display italic text-softwhite text-[10vw] md:text-[3.6vw] text-center leading-tight"
        >
          Woven into every silhouette.
        </m.p>
      </div>
    </section>
  )
}
