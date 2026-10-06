import { useRef } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  onClick,
  className = '',
  strength = 0.3,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springCfg = { stiffness: 150, damping: 12, mass: 0.4 }
  const sx = useSpring(x, springCfg)
  const sy = useSpring(y, springCfg)

  // motion values + a cached rect: no React re-render and no layout read per mouse-move
  const handleEnter = () => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
  }
  const handleMove = (e: React.MouseEvent) => {
    const r = rect.current
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      data-cursor="view"
    >
      {children}
    </m.button>
  )
}
