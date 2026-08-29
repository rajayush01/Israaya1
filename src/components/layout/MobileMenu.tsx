import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Stories', to: '/stories' },
  { label: 'About', to: '/about' },
]

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[60] bg-charcoal"
    >
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610030181087-540f31c5f2bd?q=80&w=1200&auto=format&fit=crop')",
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="flex justify-between items-center px-6 py-7">
          <span className="font-display text-xl tracking-[0.15em] text-softwhite">
            ISRAAYA
          </span>
          <button onClick={onClose} className="text-softwhite" aria-label="Close menu">
            <X size={24} strokeWidth={1.2} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {links.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <Link
                to={link.to}
                onClick={onClose}
                className="font-display text-5xl text-softwhite/90 py-3 block"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="px-8 pb-10 text-softwhite/50 text-xs tracking-label uppercase">
          Made in India. Worn Around the World.
        </div>
      </div>
    </motion.div>
  )
}
