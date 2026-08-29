import RevealText from '@/components/ui/RevealText'
import komalTara1 from '@/assets/products/komal-tara-1.png'

export default function PhilosophySection() {
  return (
    <section className="py-24 md:py-36 max-w-[1600px] mx-auto px-6 md:px-10">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <RevealText>
          <img
            src={komalTara1}
            alt="Israaya philosophy"
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
        </RevealText>

        <div>
          <RevealText as="h2" className="font-display text-[9vw] md:text-[3.6vw] leading-[1.02]">
            Made in India.
            <br />
            Worn around the world.
          </RevealText>
          <RevealText delay={0.15} className="mt-8 text-brown/80 leading-relaxed max-w-md">
            Israaya explores Indianwear through a contemporary lens —
            preserving the intimacy of craft while creating pieces for the
            way women live today. Every silhouette carries a memory of the
            hands that shaped it.
          </RevealText>
        </div>
      </div>
    </section>
  )
}
