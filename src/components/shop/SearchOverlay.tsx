import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '@/lib/store'
import { products } from '@/data/products'

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

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-ivory"
        >
          <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-36">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8"
              aria-label="Close search"
            >
              <X size={24} strokeWidth={1.2} />
            </button>

            <p className="font-display text-[9vw] md:text-4xl mb-8">
              What are you looking for?
            </p>

            <div className="flex items-center gap-4 border-b border-charcoal/20 pb-4">
              <Search size={18} strokeWidth={1.3} className="text-brown/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, pieces..."
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-brown/40"
              />
            </div>

            {!query && (
              <div className="mt-10 flex flex-wrap gap-3">
                {['Nikhaar', 'Sona Pankh', 'Kurtas', 'Occasionwear'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs tracking-label uppercase border border-charcoal/15 px-4 py-2 hover:border-charcoal/40 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-10 space-y-6">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-5 group"
                >
                  <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover" />
                  <div>
                    <p className="font-display text-xl group-hover:text-burgundy transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-brown/50">{p.collection} · ₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
