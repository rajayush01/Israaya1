import { useState } from 'react'
import RevealText from '@/components/ui/RevealText'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/data/products'

export default function Shop() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')

  const filtered = products.filter((p) => {
    if (active === 'All') return true
    if (active === 'New Arrivals') return p.isNew
    return p.category === active.toLowerCase()
  })

  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1600px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-10">
        All Pieces
      </RevealText>

      <div className="flex flex-wrap gap-2 mb-14 border-b border-charcoal/10 pb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs tracking-label uppercase px-4 py-2 border transition-colors duration-300 ${
              active === c
                ? 'border-charcoal bg-charcoal text-softwhite'
                : 'border-charcoal/15 hover:border-charcoal/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
        {filtered.map((p) => (
          <RevealText key={p.id}>
            <ProductCard product={p} />
          </RevealText>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-brown/60 py-16 text-center">
            No pieces in this category yet.
          </p>
        )}
      </div>
    </div>
  )
}
