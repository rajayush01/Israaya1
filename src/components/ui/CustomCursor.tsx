import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    // mousemove only writes motion values (no React render, no layout);
    // the label is resolved on mouseover, which fires only when the hovered element changes.
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]')
      setLabel(target?.getAttribute('data-cursor') || '')
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <m.div
      style={{ x: springX, y: springY, willChange: 'transform' }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <m.div
          initial={false}
          animate={{
            scale: label ? 1 : 0.16, // 64px circle shrunk to a ~10px dot — transform only
            backgroundColor: label ? 'rgba(126,23,57,0.9)' : 'rgba(29,26,24,0.8)',
          }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
        >
          <span
            className={`text-[10px] tracking-label uppercase text-softwhite transition-opacity duration-200 ${
              label ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {label}
          </span>
        </m.div>
      </div>
    </m.div>
  )
}
