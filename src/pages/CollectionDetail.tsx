import { useParams, Navigate } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import ProductCard from '@/components/products/ProductCard'
import { collections } from '@/data/collections'
import { products } from '@/data/products'

export default function CollectionDetail() {
  const { slug } = useParams()
  const collection = collections.find((c) => c.slug === slug)

  if (!collection) return <Navigate to="/collections" replace />

  const pieces = products.filter((p) => collection.pieceIds.includes(p.id))

  return (
    <div className="pt-24 md:pt-28">
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-charcoal">
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16">
          <RevealText className="text-[10px] tracking-label uppercase text-softwhite/70 mb-4">
            {collection.chapter}
          </RevealText>
          <RevealText as="h1" delay={0.1} className="font-display text-softwhite text-[13vw] md:text-[6vw] leading-[0.92]">
            {collection.name}
          </RevealText>
          <RevealText delay={0.2} className="italic font-display text-lg text-champagne mt-4">
            {collection.tagline}
          </RevealText>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <RevealText className="max-w-2xl text-brown/80 leading-relaxed mb-16 text-base md:text-lg">
          {collection.description}
        </RevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {pieces.map((p) => (
            <RevealText key={p.id}>
              <ProductCard product={p} />
            </RevealText>
          ))}
          {pieces.length === 0 && (
            <p className="col-span-full text-brown/60 py-10">
              Pieces from this collection are being added.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
