import { useParams, Navigate, Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import { stories } from '@/data/collections'
import { products } from '@/data/products'

export default function StoryDetail() {
  const { slug } = useParams()
  const story = stories.find((s) => s.slug === slug)

  if (!story) return <Navigate to="/stories" replace />

  const relatedProduct = products.find((p) => p.id === story.slug)

  return (
    <article className="pt-24 md:pt-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 pt-16 pb-10 text-center">
        <RevealText className="text-[10px] tracking-label uppercase text-brown/50 mb-4">
          {story.chapter}
        </RevealText>
        <RevealText as="h1" delay={0.1} className="font-display text-[12vw] md:text-[5vw] leading-[0.95]">
          {story.title}
        </RevealText>
      </div>

      <RevealText className="max-w-[1600px] mx-auto px-6 md:px-10">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-[60vh] md:h-[85vh] object-cover object-top"
        />
      </RevealText>

      <div className="max-w-[720px] mx-auto px-6 md:px-10 py-16 md:py-24">
        {story.body.map((para, i) => (
          <RevealText key={i} delay={i * 0.08} className="text-brown/80 leading-relaxed text-base md:text-lg mb-6">
            {para}
          </RevealText>
        ))}

        {story.images.length > 1 && (
          <RevealText className="grid grid-cols-2 gap-4 my-12">
            {story.images.map((img, i) => (
              <img key={i} src={img} alt="" className="w-full h-[300px] object-cover object-top" />
            ))}
          </RevealText>
        )}

        {relatedProduct && (
          <RevealText className="border-t border-charcoal/10 pt-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-label uppercase text-brown/50 mb-1">Shop the piece</p>
              <p className="font-display text-2xl">{relatedProduct.name}</p>
              <p className="text-sm text-brown/60">₹{relatedProduct.price.toLocaleString('en-IN')}</p>
            </div>
            <Link
              to={`/product/${relatedProduct.id}`}
              className="text-xs tracking-label uppercase underline-reveal"
            >
              View Piece
            </Link>
          </RevealText>
        )}
      </div>
    </article>
  )
}
