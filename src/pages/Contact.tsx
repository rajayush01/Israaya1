import RevealText from '@/components/ui/RevealText'

export default function Contact() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[700px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4vw] leading-[1.05] mb-10">
        Contact
      </RevealText>
      <RevealText delay={0.1} className="text-brown/80 leading-relaxed mb-10">
        For orders, collaborations or press enquiries, write to us and we
        will respond within two business days.
      </RevealText>
      <RevealText delay={0.2}>
        <a href="mailto:hello@israaya.in" className="font-display text-2xl underline-reveal">
          hello@israaya.in
        </a>
      </RevealText>
    </div>
  )
}
