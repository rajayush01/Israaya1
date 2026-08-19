import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import { collections } from '@/data/collections'

export default function Collections() {
  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1600px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-16">
        Collections
      </RevealText>

      <div className="flex flex-col gap-20">
        {collections.map((c, i) => (
          <RevealText key={c.slug} delay={i * 0.1} className="grid md:grid-cols-2 gap-8 items-center">
            <Link to={`/collections/${c.slug}`} className={`block overflow-hidden group ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-[380px] md:h-[480px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </Link>
            <div>
              <p className="text-[10px] tracking-label uppercase text-brown/50 mb-3">{c.chapter}</p>
              <p className="font-display text-4xl md:text-5xl mb-4">{c.name}</p>
              <p className="text-brown/70 mb-8 max-w-sm italic font-display text-lg">{c.tagline}</p>
              <Link to={`/collections/${c.slug}`} className="text-xs tracking-label uppercase underline-reveal">
                Shop the Collection
              </Link>
            </div>
          </RevealText>
        ))}
      </div>
    </div>
  )
}
