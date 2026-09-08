import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { products } from '@/data/products'

export default function FeaturedCollection() {
  const featured = products.slice(0, 3)

  return (
    <section id="collection" className="py-16 md:py-24 max-w-[1600px] mx-auto px-6 md:px-10">
      <div className="mb-14 flex flex-col items-center text-center">
        <RevealText>
          <SectionLabel>The Collection</SectionLabel>
        </RevealText>
        <RevealText as="h2" delay={0.1} className="font-display text-[10vw] md:text-[4vw] mt-3 leading-[0.95]">
          Pieces made to be remembered.
        </RevealText>
        <RevealText delay={0.2}>
          <Link to="/shop" className="inline-block mt-5 text-xs tracking-label uppercase underline-reveal">
            View All
          </Link>
        </RevealText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
        {featured.map((p, i) => (
          <RevealText key={p.id} delay={i * 0.1} className="flex flex-col gap-4">
            <Link to={`/product/${p.id}`} className="block overflow-hidden group aspect-[3/4]">
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
            </Link>
            <ProductBlurb product={p} />
          </RevealText>
        ))}
      </div>
    </section>
  )
}

function ProductBlurb({ product }: { product: (typeof products)[number] }) {
  return (
    <div className="flex items-baseline justify-between text-charcoal">
      <div>
        <p className="text-[10px] tracking-label uppercase opacity-60 mb-1">{product.collection}</p>
        <p className="font-display text-lg md:text-xl">{product.name}</p>
      </div>
      <p className="text-sm">₹{product.price.toLocaleString('en-IN')}</p>
    </div>
  )
}
