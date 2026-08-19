import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'

type Tag = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'

const tagMap = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
}

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function RevealText({
  children,
  as = 'div',
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  as?: Tag
  className?: string
  delay?: number
}) {
  const MotionTag = tagMap[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={revealVariants}
      transition={{ delay, duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </MotionTag>
  )
}
