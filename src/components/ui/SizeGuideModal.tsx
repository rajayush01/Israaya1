import { m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'] as const

const measurements: Record<typeof sizes[number], { BUST: number; WAIST: number; HIP: number }> = {
  XS:  { BUST: 32, WAIST: 26, HIP: 36 },
  S:   { BUST: 34, WAIST: 28, HIP: 38 },
  M:   { BUST: 36, WAIST: 30, HIP: 40 },
  L:   { BUST: 38, WAIST: 32, HIP: 42 },
  XL:  { BUST: 40, WAIST: 34, HIP: 44 },
  XXL: { BUST: 42, WAIST: 36, HIP: 46 },
  '3XL': { BUST: 44, WAIST: 38, HIP: 48 },
  '4XL': { BUST: 46, WAIST: 40, HIP: 50 },
  '5XL': { BUST: 48, WAIST: 42, HIP: 52 },
  '6XL': { BUST: 50, WAIST: 44, HIP: 54 },
}

export default function SizeGuideModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <m.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <m.div
        key="panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-ivory max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-charcoal/10">
          <div>
            <p className="text-[10px] tracking-label uppercase text-brown/50 mb-1">Israaya</p>
            <h2 className="font-display text-2xl">Size Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-charcoal/20 hover:border-charcoal/50 transition-colors duration-300"
            aria-label="Close size guide"
          >
            <X size={15} strokeWidth={1.3} />
          </button>
        </div>

        {/* Note */}
        <p className="px-7 pt-5 pb-4 text-xs text-brown/60 leading-relaxed">
          All measurements are in <span className="font-medium text-brown/80">inches</span> and refer to body measurements, not garment measurements. If you are between sizes, we recommend sizing up. Every piece is made to order and open to custom sizing — reach out on WhatsApp or email.
        </p>

        {/* Table */}
        <div className="px-7 pb-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-charcoal/15">
                <th className="text-left text-[10px] tracking-label uppercase text-brown/50 pb-3 pr-6 font-normal">
                  Size
                </th>
                <th className="text-left text-[10px] tracking-label uppercase text-brown/50 pb-3 pr-6 font-normal">
                  Bust
                </th>
                <th className="text-left text-[10px] tracking-label uppercase text-brown/50 pb-3 pr-6 font-normal">
                  Waist
                </th>
                <th className="text-left text-[10px] tracking-label uppercase text-brown/50 pb-3 font-normal">
                  Hip
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, i) => (
                <tr
                  key={size}
                  className={`border-b border-charcoal/8 transition-colors duration-200 hover:bg-charcoal/[0.03] ${
                    i % 2 === 0 ? '' : 'bg-charcoal/[0.02]'
                  }`}
                >
                  <td className="py-3 pr-6 font-medium text-brown">{size}</td>
                  <td className="py-3 pr-6 text-brown/70">{measurements[size].BUST}"</td>
                  <td className="py-3 pr-6 text-brown/70">{measurements[size].WAIST}"</td>
                  <td className="py-3 text-brown/70">{measurements[size].HIP}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </m.div>
    </AnimatePresence>
  )
}
