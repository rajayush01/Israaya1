import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { siteImages } from '@/data/images'

const craftImageLarge = siteImages.craftLarge
const craftImageSmall = siteImages.craftSmall

export default function CraftSection() {
  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <RevealText>
          <SectionLabel>Rooted in Craft</SectionLabel>
        </RevealText>

        <RevealText
          as="h2"
          delay={0.1}
          className="font-display text-[10vw] md:text-[4.2vw] leading-[0.98] mt-4 max-w-3xl"
        >
          Every piece begins with the hands that make it.
        </RevealText>

    <div className="grid md:grid-cols-12 gap-4 md:gap-5 mt-16">
  <RevealText delay={0.1} className="md:col-span-8">
    <img loading="eager" decoding="async"
      src={craftImageLarge}
      alt="Hand embroidery detail"
      className="w-full h-[500px] md:h-[680px] object-cover object-center"
    />
  </RevealText>

  <div className="md:col-span-4 flex flex-col justify-between gap-8">
    <RevealText delay={0.2}>
      <img loading="eager" decoding="async"
        src={craftImageSmall}
        alt="Fabric detail"
        className="w-full h-[420px] md:h-[480px] object-cover object-center"
      />
    </RevealText>

    <RevealText
      delay={0.3}
      className="text-brown/80 leading-relaxed text-sm md:text-base max-w-sm"
    >
      Resham thread, silver pearls and hand-placed sequins — each motif
      worked without repetition, so that no two pieces catch the light in
      quite the same way. Our karigars spend weeks on a single dupatta,
      embroidering by hand across looms passed down through generations of
      Indian craftsmanship.
    </RevealText>
  </div>
</div>
      </div>
    </section>
  )
}
