import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let raf: number

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setHidden(true), 300)
        setTimeout(onDone, 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[200] bg-charcoal flex flex-col items-center justify-center"
        >
          <p className="font-display text-softwhite text-4xl tracking-[0.2em] mb-3">ISRAAYA</p>
          <p className="text-[10px] tracking-label uppercase text-softwhite/50 mb-8">
            Modern Indianwear
          </p>
          <div className="w-40 h-px bg-softwhite/20 overflow-hidden">
            <motion.div
              style={{ width: `${progress * 100}%` }}
              className="h-full bg-champagne"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
