import RevealText from '@/components/ui/RevealText'

export default function About() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[1000px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4vw] leading-[1.05] mb-10">
        Our Story
      </RevealText>
      <RevealText delay={0.1} className="text-brown/80 leading-relaxed space-y-6 text-base md:text-lg">
        <p className="mb-6">
          Israaya began with a simple question: what does Indianwear look
          like when it is made for the way women actually live today — not
          only for the occasion, but for the ordinary days between them.
        </p>
        <p className="mb-6">
          Every piece is worked by hand across looms and karigar workshops
          in India, using techniques passed through generations — resham
          thread, hand-placed sequins, pearl work, and zari that catches
          the light differently with every step.
        </p>
        <p>
          We are a small, slow brand. Each collection is a chapter, each
          piece a small story about craft, memory and the women who wear it.
        </p>
      </RevealText>
    </div>
  )
}
