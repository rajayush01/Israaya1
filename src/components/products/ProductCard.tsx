import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import type { Product } from '@/data/products'
import { useStore } from '@/lib/store'
import { FALLBACK_SIZES } from '@/lib/sizes'

const ASPECTS = {
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[3/4.4]',
  square: 'aspect-square',
} as const

export default function ProductCard({
  product,
  aspect = 'portrait',
}: {
  product: Product
  aspect?: keyof typeof ASPECTS
}) {
  const addToCart = useStore((s) => s.addToCart)
  const [picking, setPicking] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const hasVariants = Boolean(product.variants?.length)
  // API products know their real stock; local seed products fall back to the standard size run.
  const sizes = hasVariants ? product.sizes ?? [] : product.sizes?.length ? product.sizes : FALLBACK_SIZES
  const soldOut = hasVariants && sizes.length === 0

  const quickAdd = (size: string) => {
    addToCart({ ...product, selectedVariantId: product.defaultVariantId }, size)
    setJustAdded(size)
    setPicking(false)
    window.setTimeout(() => setJustAdded(null), 1500)
  }

  return (
    <article className="group" data-cursor="View">
      <div className={`relative overflow-hidden bg-cream ${ASPECTS[aspect]}`}>
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block"
        >
          <img
            loading="eager"
            decoding="async"
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
          {product.images[1] && (
            <img
              loading="eager"
              decoding="async"
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        {product.isNew && (
          <span className="pointer-events-none absolute top-4 left-4 text-[10px] tracking-label uppercase bg-ivory/90 px-2.5 py-1">
            New
          </span>
        )}
        {soldOut && (
          <span className="pointer-events-none absolute top-4 right-4 text-[10px] tracking-label uppercase bg-charcoal text-softwhite px-2.5 py-1">
            Sold out
          </span>
        )}

        {!soldOut && (
          <div className="qa-bar absolute inset-x-3 bottom-3" data-open={picking}>
            {picking ? (
              <div className="bg-ivory/95 p-3 shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-label uppercase text-brown/60">Select size</span>
                  <button
                    type="button"
                    onClick={() => setPicking(false)}
                    aria-label="Close size picker"
                    className="text-charcoal/60 hover:text-charcoal"
                  >
                    <X size={14} strokeWidth={1.4} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => quickAdd(s)}
                      className="min-w-9 h-9 px-2 text-xs border border-charcoal/20 bg-softwhite hover:bg-charcoal hover:text-softwhite hover:border-charcoal transition-colors duration-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPicking(true)}
                className="w-full flex items-center justify-center gap-2 bg-ivory/95 py-3 text-[10px] tracking-label uppercase hover:bg-charcoal hover:text-softwhite transition-colors duration-300"
              >
                {justAdded ? (
                  `Added · ${justAdded}`
                ) : (
                  <>
                    <Plus size={12} strokeWidth={1.5} /> Quick Add
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <Link to={`/product/${product.id}`} className="block pt-4">
        <p className="text-[10px] tracking-label uppercase text-brown/50 mb-1">{product.collection}</p>
        <p className="font-display text-lg leading-snug">{product.name}</p>
        <p className="text-sm text-charcoal/70 mt-1 flex items-baseline gap-2">
          <span>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-charcoal/35 line-through text-xs">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </p>
      </Link>
    </article>
  )
}
