import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { socialGrid } from '@/data/collections'
import InstagramIcon from '@/components/ui/InstagramIcon'

export default function InstagramGrid() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-14">
          <div>
            <RevealText>
              <SectionLabel>From Israaya</SectionLabel>
            </RevealText>
            <RevealText as="h2" delay={0.1} className="font-display text-[9vw] md:text-[3.4vw] mt-3 leading-[0.98]">
              @israayaindiaofficial
            </RevealText>
          </div>
          <a
            href="https://www.instagram.com/israayaindiaofficial/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-xs tracking-label uppercase underline-reveal"
          >
            Follow
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {socialGrid.map((img, i) => (
            <RevealText
              key={img}
              delay={(i % 3) * 0.06}
              className={`group relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'h-[380px] md:h-[520px]' : 'h-[180px] md:h-[250px]'}`}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-softwhite text-[10px] tracking-label uppercase">
                    <InstagramIcon size={13} /> View on Instagram
                  </span>
                </div>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  )
}
