import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import { collections } from '@/data/collections'

const collectionVideo =
  'https://pub-5910ba650a5b4f4ba76486d5a3630c49.r2.dev/IsrayaaFinalwebp/VID-11-compressed.mp4'

export default function Collections() {
  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1600px] mx-auto px-6 md:px-10">
      <RevealText
        as="h1"
        className="font-display text-[11vw] md:text-[4.5vw] leading-[0.95] mb-16"
      >
        Collections
      </RevealText>

      <div className="flex flex-col gap-20">
        {collections.map((c, i) => (
          <RevealText
            key={c.slug}
            delay={i * 0.1}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <Link
              to={`/collections/${c.slug}`}
              className={`block overflow-hidden group ${
                i % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
           className="w-full h-[700px] md:h-[900px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              >
                <source src={collectionVideo} type="video/mp4" />
              </video>
            </Link>

            <div>
              <p className="text-[10px] tracking-label uppercase text-brown/50 mb-3">
                {c.chapter}
              </p>

              <p className="font-display text-4xl md:text-5xl mb-4">
                {c.name}
              </p>

              <p className="text-brown/70 mb-8 max-w-2xl italic font-display text-lg">
                Nikhaar means the full blossoming of beauty into its most radiant
                form, the moment a flower stops growing and simply becomes what
                it was always meant to be. This is our debut chapter, the one
                Israaya launches from, and it draws its inspiration entirely
                from nature, from gardens, from the small quiet details you only
                notice when you slow down and actually look. Every piece takes
                its name from something found there, a star caught in moonlight,
                a peacock feather, a bird mid-flight, each one carrying its own
                small story from the natural world.
              </p>

              <Link
                to={`/collections/${c.slug}`}
                className="text-xs tracking-label uppercase underline-reveal"
              >
                Shop the Collection
              </Link>
            </div>
          </RevealText>
        ))}
      </div>
    </div>
  )
}