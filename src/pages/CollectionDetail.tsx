import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import CatalogGrid from '@/components/products/CatalogGrid'
import { collections } from '@/data/collections'
import { useCatalog } from '@/lib/catalog'

export default function CollectionDetail() {
  const { products } = useCatalog()
  const { slug } = useParams()
  const collection = collections.find((c) => c.slug === slug)

  const pieces = useMemo(() => {
    if (!collection) return []
    return products.filter(
      (p) =>
        collection.pieceIds.includes(p.id) ||
        p.collection.toLowerCase() === collection.name.toLowerCase() ||
        p.category === collection.slug,
    )
  }, [products, collection])

  if (!collection) return <Navigate to="/collections" replace />

  return (
    <div className="pt-24 md:pt-28">
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-charcoal">
        <img
          loading="eager"
          decoding="async"
          fetchPriority="high"
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
        <RevealText className="max-w-2xl mx-auto text-center text-brown/80 leading-relaxed mb-16 text-base md:text-lg">
          <span className="font-display text-5xl md:text-6xl leading-none align-[-0.3em] mr-1 text-brown/40">&ldquo;</span>
          {collection.description}
          <span className="font-display text-5xl md:text-6xl leading-none align-[-0.3em] ml-1 text-brown/40">&rdquo;</span>
        </RevealText>

        {pieces.length > 0 && (
          <p className="text-[11px] tracking-label uppercase text-brown/50 border-b border-charcoal/10 pb-4 mb-10">
            {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}
          </p>
        )}

        <CatalogGrid
          products={pieces}
          resetKey={collection.slug}
          empty={<p className="text-brown/60">Pieces from this collection are being added.</p>}
        />
      </div>
    </div>
  )
}
