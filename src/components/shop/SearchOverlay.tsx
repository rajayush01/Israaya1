import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { X, Search, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/lib/store'
import { useCatalog } from '@/lib/catalog'
import { buildIndex, buildSuggestions, searchProducts } from '@/lib/search'
import useScrollLock from '@/hooks/useScrollLock'

const MAX_RESULTS = 8

export default function SearchOverlay() {
  const { products } = useCatalog()
  const isSearchOpen = useStore((s) => s.isSearchOpen)
  const setSearchOpen = useStore((s) => s.setSearchOpen)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useScrollLock(isSearchOpen)

  // Everything below is derived from the live catalog — nothing is hard-coded.
  const index = useMemo(() => buildIndex(products), [products])
  const suggestions = useMemo(() => buildSuggestions(products), [products])
  const trimmed = query.trim()
  const results = useMemo(() => (trimmed ? searchProducts(index, trimmed) : []), [index, trimmed])
  const showing = trimmed ? results.slice(0, MAX_RESULTS) : products.slice(0, 4)

  const close = () => {
    setSearchOpen(false)
    setQuery('')
  }

  useEffect(() => {
    if (!isSearchOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen])

  const submit = () => {
    if (!trimmed) return
    // One exact-ish hit goes straight to the piece; otherwise show the full result set on the shop page.
    if (results.length === 1) navigate(`/product/${results[0].id}`)
    else navigate(`/shop?q=${encodeURIComponent(trimmed)}`)
    close()
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          data-lenis-prevent
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          onAnimationComplete={() => inputRef.current?.focus()}
          className="fixed inset-0 z-[100] bg-ivory overflow-y-auto overscroll-contain"
        >
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-5"
            >
              <div className="flex items-center gap-4 flex-1">
                <Search size={18} strokeWidth={1.3} className="text-brown/50 shrink-0" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pieces, colours, collections"
                  aria-label="Search pieces"
                  className="flex-1 bg-transparent outline-none font-display text-xl md:text-2xl placeholder:text-charcoal/50 [&::-webkit-search-cancel-button]:hidden"
                />
              </div>
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="text-[10px] tracking-label uppercase text-brown/50 hover:text-charcoal transition-colors"
                >
                  Clear
                </button>
              )}
              <button type="button" onClick={close} aria-label="Close search" className="shrink-0">
                <X size={22} strokeWidth={1.2} />
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 mt-12">
              {!trimmed && (
                <div>
                  <p className="text-[10px] tracking-label uppercase text-brown/40 mb-5 border-b border-charcoal/10 pb-3">
                    Popular Searches
                  </p>
                  <ul className="space-y-4">
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => {
                            setQuery(s)
                            inputRef.current?.focus()
                          }}
                          className="text-sm tracking-wide uppercase text-charcoal/80 hover:text-burgundy transition-colors text-left"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={trimmed ? 'md:col-span-2' : ''}>
                <p
                  className="text-[10px] tracking-label uppercase text-brown/40 mb-5 border-b border-charcoal/10 pb-3"
                  aria-live="polite"
                >
                  {trimmed
                    ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${trimmed}”`
                    : 'Featured Pieces'}
                </p>

                {showing.length === 0 ? (
                  <div className="py-10">
                    <p className="text-sm text-brown/60 mb-5">No pieces match your search.</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 4).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setQuery(s)}
                          className="text-[10px] tracking-label uppercase px-3 py-2 border border-charcoal/20 hover:border-charcoal transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                      {showing.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={close}
                          className="group block text-center"
                        >
                          <div className="overflow-hidden mb-3 bg-cream">
                            <img
                              loading="eager"
                              decoding="async"
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full aspect-[3/4] object-cover object-top transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                            />
                          </div>
                          <p className="text-sm group-hover:text-burgundy transition-colors leading-snug">
                            {p.name}
                          </p>
                          <p className="text-[10px] tracking-label uppercase text-brown/40 mt-1">
                            {[p.collection, p.color].filter(Boolean).join(' · ')}
                          </p>
                          <p className="text-xs text-brown/60 mt-1">
                            ₹{p.price.toLocaleString('en-IN')}
                          </p>
                        </Link>
                      ))}
                    </div>

                    {trimmed && results.length > MAX_RESULTS && (
                      <button
                        type="button"
                        onClick={submit}
                        className="mt-12 mx-auto flex items-center gap-2 text-xs tracking-label uppercase underline-reveal"
                      >
                        View all {results.length} results <ArrowRight size={13} strokeWidth={1.4} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
