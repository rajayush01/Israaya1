import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/data/products'

export default function ProductCard({
  product,
  aspect = 'portrait',
}: {
  product: Product
  aspect?: 'portrait' | 'square' | 'tall'
}) {
  const heightClass =
    aspect === 'tall' ? 'h-[520px]' : aspect === 'square' ? 'h-[340px]' : 'h-[420px]'

  return (
    <Link to={`/product/${product.id}`} className="group block" data-cursor="View">
      <div className={`relative overflow-hidden ${heightClass}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1100ms] ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 scale-105 transition-all duration-[1100ms] ease-out group-hover:opacity-100 group-hover:scale-100"
          />
        )}
        {product.isNew && (
          <span className="absolute top-4 left-4 text-[10px] tracking-label uppercase bg-ivory/90 px-2.5 py-1">
            New
          </span>
        )}
      </div>

      <div className="pt-4 flex items-start justify-between transition-transform duration-500 group-hover:-translate-y-0.5">
        <div>
          <p className="text-[10px] tracking-label uppercase text-brown/50 mb-1">
            {product.collection}
          </p>
          <p className="font-display text-lg">{product.name}</p>
          <p className="text-sm text-charcoal/70 mt-1">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-1 text-[10px] tracking-label uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
        >
          View Piece <ArrowUpRight size={12} strokeWidth={1.3} />
        </motion.span>
      </div>
    </Link>
  )
}
