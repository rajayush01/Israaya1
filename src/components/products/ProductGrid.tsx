import RevealText from '@/components/ui/RevealText'
import ProductCard from './ProductCard'
import { products } from '@/data/products'

const aspects: Array<'portrait' | 'square' | 'tall'> = [
  'tall',
  'square',
  'portrait',
  'portrait',
  'square',
  'tall',
]

export default function ProductGrid() {
  return (
    <section className="py-20 md:py-28 max-w-[1600px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
        {products.map((p, i) => (
          <RevealText key={p.id} delay={(i % 3) * 0.08}>
            <ProductCard product={p} aspect={aspects[i % aspects.length]} />
          </RevealText>
        ))}
      </div>
    </section>
  )
}
