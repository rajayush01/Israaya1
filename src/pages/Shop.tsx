import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import CatalogGrid from '@/components/products/CatalogGrid'
import { useCatalog } from '@/lib/catalog'
import { buildIndex, buildSuggestions, searchProducts } from '@/lib/search'

const FILTERS = [
  { label: 'All Products', key: 'all' },
  { label: 'Nikhaar Collection', key: 'nikhaar' },
  { label: 'Autumn/Winter \u201926/\u201927', key: 'aw-26-27' },
] as const

type FilterKey = (typeof FILTERS)[number]['key']

const SORT_OPTIONS = [
  'Featured',
  'Best Selling',
  'Alphabetically, A-Z',
  'Alphabetically, Z-A',
  'Price, Low to High',
  'Price, High to Low',
] as const

type SortOption = (typeof SORT_OPTIONS)[number]

const isFilter = (v: string | null): v is FilterKey => FILTERS.some((f) => f.key === v)
const isSort = (v: string | null): v is SortOption => SORT_OPTIONS.some((o) => o === v)

export default function Shop() {
  const { products } = useCatalog()
  const [params, setParams] = useSearchParams()

  // Filter, sort and search live in the URL so Back / refresh / shared links keep the same view.
  const filterParam = params.get('filter')
  const sortParam = params.get('sort')
  const active: FilterKey = isFilter(filterParam) ? filterParam : 'all'
  const sort: SortOption = isSort(sortParam) ? sortParam : 'Featured'
  const urlQuery = params.get('q') ?? ''

  const update = (next: Record<string, string | null>) => {
    const copy = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? copy.set(k, v) : copy.delete(k)))
    setParams(copy, { replace: true })
  }

  // Local input state keeps typing instant; the URL is updated after a short pause.
  const [query, setQuery] = useState(urlQuery)
  useEffect(() => setQuery(urlQuery), [urlQuery])
  useEffect(() => {
    if (query === urlQuery) return
    const t = window.setTimeout(() => update({ q: query.trim() || null }), 250)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const deferredQuery = useDeferredValue(query)
  const index = useMemo(() => buildIndex(products), [products])
  const suggestions = useMemo(() => buildSuggestions(products, 5), [products])

  const filtered = useMemo(() => {
    const searching = deferredQuery.trim().length > 0
    const base = searching ? searchProducts(index, deferredQuery) : products
    const byFilter = base.filter((p) => active === 'all' || p.shopFilters?.includes(active))

    // While searching, relevance order wins unless the shopper explicitly picked a sort.
    if (searching && (sort === 'Featured' || sort === 'Best Selling')) return byFilter

    const copy = [...byFilter]
    switch (sort) {
      case 'Alphabetically, A-Z':
        return copy.sort((a, b) => a.name.localeCompare(b.name))
      case 'Alphabetically, Z-A':
        return copy.sort((a, b) => b.name.localeCompare(a.name))
      case 'Price, Low to High':
        return copy.sort((a, b) => a.price - b.price)
      case 'Price, High to Low':
        return copy.sort((a, b) => b.price - a.price)
      default:
        return copy
    }
  }, [products, index, deferredQuery, active, sort])

  const searching = deferredQuery.trim().length > 0

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-10">
          All Pieces
        </RevealText>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8" role="tablist" aria-label="Collections">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={active === f.key}
              onClick={() => update({ filter: f.key === 'all' ? null : f.key })}
              className={`text-xs tracking-label uppercase px-4 py-2 border transition-colors duration-300 ${
                active === f.key
                  ? 'border-charcoal bg-charcoal text-softwhite'
                  : 'border-charcoal/15 hover:border-charcoal/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 border-y border-charcoal/10 py-4 mb-14">
          <label className="relative flex items-center w-full md:max-w-xs">
            <Search size={14} strokeWidth={1.4} className="absolute left-0 text-brown/50" />
            <span className="sr-only">Search pieces</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, colours…"
              className="w-full bg-transparent pl-6 pr-6 py-1 text-sm outline-none placeholder:text-brown/40 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  update({ q: null })
                }}
                aria-label="Clear search"
                className="absolute right-0 text-brown/50 hover:text-charcoal"
              >
                <X size={14} strokeWidth={1.4} />
              </button>
            )}
          </label>

          <div className="flex items-center justify-between md:justify-end gap-6 text-xs tracking-label uppercase">
            <span className="text-[11px] text-brown/50 normal-case tracking-normal" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-brown/50">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => update({ sort: e.target.value === 'Featured' ? null : e.target.value })}
                className="bg-transparent outline-none text-charcoal uppercase tracking-label text-xs cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <CatalogGrid
          products={filtered}
          resetKey={`${active}|${sort}`}
          empty={
            searching ? (
              <div className="flex flex-col items-center gap-5">
                <p className="text-brown/70">
                  No pieces match &ldquo;{deferredQuery.trim()}&rdquo;
                  {active !== 'all' ? ' in this collection' : ''}.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {active !== 'all' && (
                    <button
                      onClick={() => update({ filter: null })}
                      className="text-[10px] tracking-label uppercase px-3 py-2 border border-charcoal/20 hover:border-charcoal transition-colors"
                    >
                      Search all products
                    </button>
                  )}
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="text-[10px] tracking-label uppercase px-3 py-2 border border-charcoal/20 hover:border-charcoal transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-brown/60">No pieces in this collection yet.</p>
            )
          }
        />
      </div>
    </div>
  )
}
