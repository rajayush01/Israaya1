import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { products } from '@/data/products'
import { useStore } from '@/lib/store'
import RevealText from '@/components/ui/RevealText'
import ProductCard from '@/components/products/ProductCard'

const sizes = ['XS', 'S', 'M', 'L', 'XL']

const accordions = [
  { title: 'Fabric & Craft', key: 'fabricCraft' as const },
  { title: 'Fit & Sizing', key: 'fit' as const },
  { title: 'Care', key: 'care' as const },
  { title: 'Delivery & Customization', key: 'shipping' as const },
  { title: 'Returns', key: 'returns' as const },
]

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [size, setSize] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>('fabricCraft')
  const { addToCart, toggleWishlist, wishlist } = useStore()

  if (!product) return <Navigate to="/shop" replace />

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)
  const isWishlisted = wishlist.includes(product.id)

  const accordionContent: Record<string, string> = {
    fabricCraft: `${product.fabric}. ${product.craft}. Colour may vary slightly due to the handmade nature of this piece.`,
    fit: product.fit,
    care: 'Dry clean only. For detailed care, see our Care Instructions page.',
    shipping:
      'Made to order and shipped both within India and internationally. Standard delivery is 15–20 days from order confirmation, inclusive of delivery within India — international orders may take slightly longer depending on destination. Every piece is open to customization, from sizing to small design changes — reach out to us on WhatsApp or email to personalize your piece or request faster delivery for an upcoming event.',
    returns: 'Exchanges accepted within 7 days for unworn, unaltered pieces with tags attached. See our Return & Exchange Policy for full details.',
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <RevealText key={i} delay={i * 0.1}>
              <img src={img} alt={`${product.name} ${i + 1}`} className="w-full object-cover" />
            </RevealText>
          ))}
        </div>

        {/* Info */}
        <div className="md:sticky md:top-28 md:self-start pb-24">
          <p className="text-[10px] tracking-label uppercase text-brown/50 mb-2">
            {product.collection} · {product.chapter}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-1">{product.name}</h1>
          <p className="text-[11px] tracking-label uppercase text-brown/50 mb-4">{product.color}</p>
          <p className="text-lg mb-6 flex items-baseline gap-3">
            <span>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-brown/40 line-through text-base">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
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
              <button className="text-[10px] tracking-label uppercase underline-reveal">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2">
              {sizes.map((s) => (
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
          </div>

          <div className="flex gap-3 mb-10">
            <button
              onClick={() => size && addToCart(product, size)}
              disabled={!size}
              className="flex-1 bg-burgundy text-softwhite py-4 text-xs tracking-label uppercase hover:bg-wine transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {size ? 'Add to Bag' : 'Select a Size'}
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
                  <motion.span animate={{ rotate: open === a.key ? 180 : 0 }}>
                    <ChevronDown size={15} strokeWidth={1.3} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === a.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-brown/70 pb-4 leading-relaxed">
                        {accordionContent[a.key]}
                      </p>
                    </motion.div>
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
    </div>
  )
}
