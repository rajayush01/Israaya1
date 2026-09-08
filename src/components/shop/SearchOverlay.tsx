import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '@/lib/store'
import { products } from '@/data/products'

const POPULAR_SEARCHES = ['Nikhaar', 'Sona Pankh', 'Kurta Sets', 'Occasionwear']

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const popularProducts = products.slice(0, 4)
  const showing = query ? results : popularProducts

  const close = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[100] bg-ivory overflow-y-auto"
        >
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20">
            <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-5">
              <div className="flex items-center gap-4 flex-1">
                <Search size={18} strokeWidth={1.3} className="text-brown/50 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Best Sellers"
                  className="flex-1 bg-transparent outline-none font-display text-xl md:text-2xl placeholder:text-charcoal/70"
                />
              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-[10px] tracking-label uppercase text-brown/50 hover:text-charcoal transition-colors"
                >
                  Clear
                </button>
              )}
              <button onClick={close} aria-label="Close search" className="shrink-0">
                <X size={22} strokeWidth={1.2} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 mt-12">
              {!query && (
                <div>
                  <p className="text-[10px] tracking-label uppercase text-brown/40 mb-5 border-b border-charcoal/10 pb-3">
                    Popular Searches
                  </p>
                  <ul className="space-y-4">
                    {POPULAR_SEARCHES.map((s) => (
                      <li key={s}>
                        <button
                          onClick={() => setQuery(s)}
                          className="text-sm tracking-wide uppercase text-charcoal/80 hover:text-burgundy transition-colors"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={query ? 'md:col-span-2' : ''}>
                <p className="text-[10px] tracking-label uppercase text-brown/40 mb-5 border-b border-charcoal/10 pb-3">
                  {query ? `Results for "${query}"` : 'Popular Products'}
                </p>

                {showing.length === 0 ? (
                  <p className="text-sm text-brown/50 py-10">No pieces match your search.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                    {showing.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        onClick={close}
                        className="group block text-center"
                      >
                        <div className="overflow-hidden mb-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full aspect-[3/4] object-cover object-top transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                          />
                        </div>
                        <p className="text-sm group-hover:text-burgundy transition-colors leading-snug">
                          {p.name}
                        </p>
                        <p className="text-xs text-brown/50 mt-1">
                          From ₹{p.price.toLocaleString('en-IN')}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
