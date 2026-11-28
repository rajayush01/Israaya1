import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import type { Product as CatalogProduct } from '@/data/products'
import { useCatalog } from '@/lib/catalog'
import { useStore } from '@/lib/store'
import RevealText from '@/components/ui/RevealText'
import ProductCard from '@/components/products/ProductCard'
import ProductGallery from '@/components/products/ProductGallery'
import SizeGuideModal from '@/components/ui/SizeGuideModal'
import { FALLBACK_SIZES as fallbackSizes } from '@/lib/sizes'

type ProductVariantOption = {
  id: string
  colorName: string
  colorCode: string
  price: number
  originalPrice?: number
  images: string[]
  videos: string[]
  sizes: string[]
}

type ProductWithVariants = CatalogProduct & {
  variants?: ProductVariantOption[]
  defaultVariantId?: string
  selectedVariantId?: string
  sizes?: string[]
  videos?: string[]
}

const accordions = [
  { title: 'Fabric & Craft', key: 'fabricCraft' as const },
  { title: 'Fit & Sizing', key: 'fit' as const },
  { title: 'Care', key: 'care' as const },
  { title: 'Delivery & Customization', key: 'shipping' as const },
  { title: 'Returns', key: 'returns' as const },
]

export default function Product() {
  const { id } = useParams()
  const { products, loading } = useCatalog()
  const product = products.find((p) => p.id === id) as ProductWithVariants | undefined
  const [size, setSize] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>('fabricCraft')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const addedTimer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(addedTimer.current), [])

  useEffect(() => {
    setSelectedVariantId(product?.defaultVariantId || product?.variants?.[0]?.id)
    setSize(null)
  }, [product?.id, product?.defaultVariantId])

  const selectedVariant: ProductVariantOption | undefined = product?.variants?.find((variant) => variant.id === selectedVariantId) || product?.variants?.[0]
  const activeProduct: ProductWithVariants | undefined = product && selectedVariant
    ? {
        ...product,
        selectedVariantId: selectedVariant.id,
        color: selectedVariant.colorName,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        images: selectedVariant.images,
        videos: selectedVariant.videos,
        sizes: selectedVariant.sizes,
      }
    : product

  if (!product && loading) return <div className="min-h-[50vh] pt-40 text-center">Loading piece…</div>
  if (!product) return <Navigate to="/shop" replace />

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)
  const sizes: string[] = selectedVariant ? selectedVariant.sizes : product.sizes?.length ? product.sizes : fallbackSizes
  const isWishlisted = wishlist.includes(product.id)
  const unavailable = Boolean(selectedVariant) && sizes.length === 0

  const accordionContent: Record<string, React.ReactNode> = {
    fabricCraft: product.fabric || product.craft || 'Please contact us for fabric and craftsmanship details.',
    fit: product.fit,
    care: (
      <span className="space-y-2 block">
        <span className="block">Wash Care: Dry clean only. For detailed care, see our Care Instructions page.</span>
        <span className="block">Colour may vary slightly due to the handmade nature of this piece.</span>
      </span>
    ),
    shipping: (
      <span className="space-y-3 block">
        <span className="block">
          <span className="text-brown/50 uppercase tracking-label text-[10px]">Delivery Timeline</span>
          <span className="block mt-1">15–20 days, made to order, inclusive of delivery within India. International orders may take slightly longer.</span>
        </span>
        <span className="block">
          <span className="text-brown/50 uppercase tracking-label text-[10px]">Customization</span>
          <span className="block mt-1">Every Israaya piece is made to order and open to customization, from sizing to small design changes. Reach out to us on WhatsApp or email to personalize your piece or request faster delivery for an upcoming event.</span>
        </span>
        <span className="block">
          <span className="text-brown/50 uppercase tracking-label text-[10px]">Shipping</span>
          <span className="block mt-1">Made to order and shipped both within India and internationally. Standard delivery is 15–20 days from order confirmation, with international orders taking slightly longer depending on destination.</span>
        </span>
      </span>
    ),
    returns: 'Exchanges accepted within 7 days for unworn, unaltered pieces with tags attached. See our Return & Exchange Policy for full details.',
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <RevealText>
          <ProductGallery images={activeProduct?.images || product.images} videos={activeProduct?.videos} name={product.name} />
        </RevealText>

        {/* Info */}
        <div className="md:sticky md:top-28 md:self-start pb-24">
          <p className="text-[10px] tracking-label uppercase text-brown/50 mb-2">
            {product.collection}{product.chapter ? ` · ${product.chapter}` : ''}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-1">{product.name}</h1>
          <p className="text-[11px] tracking-label uppercase text-brown/50 mb-3">{activeProduct?.color}</p>
          {product.variants && product.variants.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-5" aria-label="Choose a color">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => { setSelectedVariantId(variant.id); setSize(null) }}
                  className={`w-8 h-8 rounded-full border-2 ${selectedVariant?.id === variant.id ? 'border-charcoal p-1' : 'border-transparent'}`}
                  aria-label={variant.colorName || 'Choose variant'}
                  title={variant.colorName}
                >
                  <span className="block w-full h-full rounded-full border border-charcoal/15" style={{ backgroundColor: variant.colorCode }} />
                </button>
              ))}
            </div>
          )}
          <p className="text-lg mb-6 flex items-baseline gap-3">
            <span>₹{(activeProduct?.price || 0).toLocaleString('en-IN')}</span>
            {activeProduct?.originalPrice && (
              <>
                <span className="text-brown/40 line-through text-base">
                  ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs tracking-label uppercase text-burgundy">10% off</span>
              </>
            )}
          </p>

          <p className="text-sm text-brown/80 leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-label uppercase text-brown/50">Size</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-[10px] tracking-label uppercase underline-reveal">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-11 h-11 text-xs border transition-colors duration-300 ${
                    size === s
                      ? 'border-charcoal bg-charcoal text-softwhite'
                      : 'border-charcoal/20 hover:border-charcoal/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {selectedVariant && sizes.length === 0 && <p className="mt-3 text-xs text-brown/60">Currently unavailable in this color.</p>}
            <p className="mt-3 text-[10px] tracking-label uppercase text-brown/40">
              Custom on request — reach out on WhatsApp or email
            </p>
          </div>

          <div className="flex gap-3 mb-10">
            <button
              onClick={() => {
                if (!size || !activeProduct) return
                addToCart(activeProduct, size)
                setAdded(true)
                window.clearTimeout(addedTimer.current)
                addedTimer.current = window.setTimeout(() => setAdded(false), 1800)
              }}
              disabled={!size || unavailable}
              className="flex-1 bg-burgundy text-softwhite py-4 text-xs tracking-label uppercase hover:bg-wine transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {unavailable ? 'Currently Unavailable' : added ? 'Added to Bag ✓' : size ? 'Add to Bag' : 'Select a Size'}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-14 border border-charcoal/20 flex items-center justify-center"
              aria-label="Wishlist"
            >
              <Heart
                size={17}
                strokeWidth={1.3}
                className={isWishlisted ? 'fill-burgundy text-burgundy' : ''}
              />
            </button>
          </div>

          <p className="text-[10px] tracking-label uppercase text-brown/50 mb-4">The Details</p>
          <div className="border-t border-charcoal/10">
            {accordions.map((a) => (
              <div key={a.key} className="border-b border-charcoal/10">
                <button
                  onClick={() => setOpen(open === a.key ? null : a.key)}
                  className="w-full flex items-center justify-between py-4 text-sm"
                >
                  {a.title}
                  <m.span animate={{ rotate: open === a.key ? 180 : 0 }}>
                    <ChevronDown size={15} strokeWidth={1.3} />
                  </m.span>
                </button>
                <AnimatePresence>
                  {open === a.key && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="text-sm text-brown/70 pb-4 leading-relaxed">
                        {accordionContent[a.key]}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 border-t border-charcoal/10 mt-10">
        <p className="text-[10px] tracking-label uppercase text-brown/50 mb-8">You May Also Like</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {related.map((p) => (
            <div key={p.id} onClick={() => window.scrollTo(0, 0)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
    </div>
  )
}
