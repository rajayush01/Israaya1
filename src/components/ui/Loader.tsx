import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useMotionValue } from 'framer-motion'
import logo from '@/assets/ISRAAYA LOGO.svg'
import motif from '@/assets/israaya-motif.webp'

export default function Loader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const [hidden, setHidden] = useState(false)
  const progress = useMotionValue(0) // drives a transform — no React re-render per frame
  const readyRef = useRef(ready)
  const doneRef = useRef(onDone)
  readyRef.current = ready
  doneRef.current = onDone

  useEffect(() => {
    const start = performance.now()
    const minDuration = 1200
    let raf = 0
    let finished = false

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / minDuration)
      // hold at 90% until the hero photo is decoded, so the first screen never pops in
      progress.set(Math.min(t, readyRef.current ? 1 : 0.9))
      if (t >= 1 && readyRef.current && !finished) {
        finished = true
        setTimeout(() => setHidden(true), 300)
        setTimeout(() => doneRef.current(), 900)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress])

  return (
    <AnimatePresence>
      {!hidden && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[200] bg-charcoal flex flex-col items-center justify-center"
        >
          <img loading="eager" decoding="async" src={motif} alt="Israaya Logo" className="w-32 h-24 object-contain" />
          <img loading="eager" decoding="async" src={logo} alt="Israaya Logo" className="w-32 h-24" />
          <div className="w-40 h-px bg-softwhite/20 overflow-hidden">
            <m.div
              style={{ scaleX: progress }}
              className="h-full w-full bg-champagne origin-left"
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
