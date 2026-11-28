import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'

const pillars = [
  {
    no: '01',
    title: 'Made to order',
    text: 'Nothing is produced until it is ordered. Every piece is cut, fitted and finished for one person.',
  },
  {
    no: '02',
    title: 'Made in India',
    text: 'Hand embroidered start to finish by karigar families who carry their craft across generations.',
  },
  {
    no: '03',
    title: 'Made for every body',
    text: 'Full size range, XS to 7XL, with custom measurements on request.',
  },
]

export default function BrandIntro() {
  return (
    <section className="py-16 md:py-24 max-w-[1600px] mx-auto px-6 md:px-10">
      {/* Top: label / headline / story */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-2">
          <RevealText>
            <SectionLabel>Our Story</SectionLabel>
          </RevealText>
        </div>

        <RevealText
          as="h2"
          delay={0.1}
          className="md:col-span-6 font-display text-[8vw] md:text-[2.5vw] leading-[1.1] text-charcoal"
        >
          The new language of Indian wear.
        </RevealText>

        <div className="md:col-span-4 md:pt-2">
          <RevealText
            delay={0.2}
            className="text-sm md:text-[15px] text-brown/80 leading-relaxed"
          >
            Indian wear that doesn&apos;t choose between heritage and ease.
            Each collection is its own chapter, made slowly by hand, once,
            and retired to make space for the next.
          </RevealText>

          <RevealText delay={0.3}>
            <Link
              to="/about"
              className="group mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal"
            >
              <span className="border-b border-charcoal/40 pb-0.5 transition-colors group-hover:border-charcoal">
                Read our story
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </RevealText>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-12 md:mt-16 grid md:grid-cols-3 border-t border-charcoal/15">
        {pillars.map((p, i) => (
          <RevealText
            key={p.no}
            delay={0.1 + i * 0.1}
            className={`py-6 md:py-8 md:px-8 border-b md:border-b-0 border-charcoal/15 ${
              i !== 0 ? 'md:border-l' : 'md:pl-0'
            } md:border-charcoal/15`}
          >
            <span className="text-[11px] tracking-[0.25em] text-brown/60">
              {p.no}
            </span>
            <h3 className="mt-3 font-display text-xl md:text-2xl text-charcoal">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-brown/80 leading-relaxed max-w-[34ch]">
              {p.text}
            </p>
          </RevealText>
        ))}
      </div>
    </section>
  )
}