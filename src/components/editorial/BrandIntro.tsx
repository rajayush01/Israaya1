import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'

export default function BrandIntro() {
  return (
    <section className="py-28 md:py-40 max-w-[1600px] mx-auto px-6 md:px-10">
      <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-start">
        <div className="md:col-span-2">
          <RevealText>
            <SectionLabel>Since 2024</SectionLabel>
          </RevealText>
        </div>

        <RevealText
          as="h2"
          delay={0.1}
          className="md:col-span-7 font-display text-[9vw] md:text-[3.4vw] leading-[1.08] text-charcoal"
        >
          Clothes that carry stories.
        </RevealText>

        <RevealText
          delay={0.2}
          className="md:col-span-3 text-sm md:text-base text-brown/80 leading-relaxed md:pt-3"
        >
          Modern Indianwear shaped by craft, memory and the quiet beauty of
          everyday rituals — made slowly, by hand, for the way women live
          today.
        </RevealText>
      </div>
    </section>
  )
}
