import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [label, setLabel] = useState('')
  const [isTouch, setIsTouch] = useState(true)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 40 })
  const springY = useSpring(y, { stiffness: 400, damping: 40 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement).closest('[data-cursor]')
      setLabel(target?.getAttribute('data-cursor') || '')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (isTouch) return null

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <motion.div
        animate={{
          width: label ? 64 : 10,
          height: label ? 64 : 10,
          backgroundColor: label ? 'rgba(126,23,57,0.9)' : 'rgba(29,26,24,0.8)',
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="rounded-full flex items-center justify-center"
      >
        {label && (
          <span className="text-[10px] tracking-label uppercase text-softwhite">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
