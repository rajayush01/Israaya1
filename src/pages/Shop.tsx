import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/data/products'

const SORT_OPTIONS = [
  'Featured',
  'Best Selling',
  'Alphabetically, A-Z',
  'Alphabetically, Z-A',
  'Price, Low to High',
  'Price, High to Low',
] as const

export default function Shop() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Featured')

  const filtered = products
    .filter((p) => {
      if (active === 'All') return true
      if (active === 'New Arrivals') return p.isNew
      return p.category === active.toLowerCase()
    })
    .sort((a, b) => {
      switch (sort) {
        case 'Alphabetically, A-Z':
          return a.name.localeCompare(b.name)
        case 'Alphabetically, Z-A':
          return b.name.localeCompare(a.name)
        case 'Price, Low to High':
          return a.price - b.price
        case 'Price, High to Low':
          return b.price - a.price
        default:
          return 0
      }
    })

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-10">
          All Pieces
        </RevealText>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
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

        <div className="w-full max-w-[1600px] flex items-center justify-center gap-8 border-y border-charcoal/10 py-4 mb-14 relative">
          <button className="flex items-center gap-2 text-xs tracking-label uppercase">
            <SlidersHorizontal size={14} strokeWidth={1.4} />
            Filters
          </button>
          <span className="text-charcoal/15">|</span>
          <div className="flex items-center gap-2 text-xs tracking-label uppercase">
            <label htmlFor="sort" className="text-brown/50">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORT_OPTIONS)[number])}
              className="bg-transparent outline-none text-charcoal uppercase tracking-label text-xs cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <span className="absolute right-0 text-[11px] text-brown/40 hidden md:inline">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
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
    </div>
  )
}
