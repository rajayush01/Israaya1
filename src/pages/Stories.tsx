import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import { stories } from '@/data/collections'

export default function Stories() {
  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1600px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-16">
        The Stories We Wear
      </RevealText>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
        {stories.map((s, i) => (
          <RevealText key={s.slug} delay={(i % 2) * 0.1}>
            <Link to={`/stories/${s.slug}`} className="group block cursor-pointer">
              <div className="overflow-hidden mb-5">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-[440px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[10px] tracking-label uppercase text-brown/50 mb-2">{s.chapter}</p>
              <p className="font-display text-3xl mb-3">{s.title}</p>
              <p className="text-sm text-brown/70 leading-relaxed max-w-md">{s.excerpt}</p>
            </Link>
          </RevealText>
        ))}
      </div>
    </div>
  )
}
