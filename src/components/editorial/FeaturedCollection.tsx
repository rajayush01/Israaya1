import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { products } from '@/data/products'

export default function FeaturedCollection() {
  const [featured, small, third] = products

  return (
    <section id="collection" className="py-10 md:py-20 max-w-[1600px] mx-auto px-6 md:px-10">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <RevealText>
            <SectionLabel>The Collection</SectionLabel>
          </RevealText>
          <RevealText as="h2" delay={0.1} className="font-display text-[10vw] md:text-[4vw] mt-3 leading-[0.95]">
            Pieces made to be remembered.
          </RevealText>
        </div>
        <Link to="/shop" className="hidden md:inline text-xs tracking-label uppercase underline-reveal">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <RevealText className="md:col-span-4 md:row-span-2 flex flex-col gap-4">
          <Link to={`/product/${small.id}`} className="block overflow-hidden group">
            <img
              src={small.images[0]}
              alt={small.name}
              className="w-full h-[280px] object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </Link>
          <ProductBlurb product={small} />
        </RevealText>

        <RevealText delay={0.15} className="md:col-span-8 md:row-span-2 relative">
          <Link to={`/product/${featured.id}`} className="block overflow-hidden group relative">
            <img
              src={featured.images[0]}
              alt={featured.name}
              className="w-full h-[420px] md:h-[620px] object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-charcoal/60 to-transparent">
              <ProductBlurb product={featured} light />
            </div>
          </Link>
        </RevealText>

        <RevealText delay={0.25} className="md:col-span-4">
          <Link to={`/product/${third.id}`} className="block overflow-hidden group">
            <img
              src={third.images[0]}
              alt={third.name}
              className="w-full h-[260px] object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </Link>
          <ProductBlurb product={third} />
        </RevealText>
      </div>
    </section>
  )
}

function ProductBlurb({
  product,
  light,
}: {
  product: (typeof products)[number]
  light?: boolean
}) {
  return (
    <div className={`pt-3 flex items-baseline justify-between ${light ? 'text-softwhite' : 'text-charcoal'}`}>
      <div>
        <p className="text-[10px] tracking-label uppercase opacity-60 mb-1">{product.collection}</p>
        <p className="font-display text-lg md:text-xl">{product.name}</p>
      </div>
      <p className="text-sm">₹{product.price.toLocaleString('en-IN')}</p>
    </div>
  )
}
