import type { ReactNode } from 'react'
import type { Product } from '@/data/products'
import ProductCard from './ProductCard'

/**
 * Shared grid for Shop and Collection pages.
 * Entrance is a CSS animation (no per-card Framer observers), staggered for the first row or two only.
 * `resetKey` remounts the grid when the filter/sort changes so the new set fades in as one.
 */
export default function CatalogGrid({
  products,
  resetKey,
  empty,
}: {
  products: Product[]
  resetKey: string
  empty: ReactNode
}) {
  if (products.length === 0) return <div className="py-16 text-center">{empty}</div>

  return (
    <div
      key={resetKey}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14"
    >
      {products.map((p, i) => (
        <div key={p.id} className="rise-in" style={{ ['--d' as string]: `${Math.min(i, 8) * 55}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
