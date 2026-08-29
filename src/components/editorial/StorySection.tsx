import { Link } from 'react-router-dom'
import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'
import { stories } from '@/data/collections'

export default function StorySection() {
  return (
    <section className="py-24 md:py-32 max-w-[1600px] mx-auto px-6 md:px-10">
      <RevealText>
        <SectionLabel>The Stories We Wear</SectionLabel>
      </RevealText>
      <RevealText as="h2" delay={0.1} className="font-display text-[9vw] md:text-[3.6vw] mt-3 mb-14 leading-[0.98]">
        Told through every chapter.
      </RevealText>

      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <RevealText key={story.slug} delay={i * 0.1}>
            <Link to={`/stories/${story.slug}`} className="group block">
              <div className="overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[420px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-[10px] tracking-label uppercase text-brown/50 mt-5 mb-2">
                {story.chapter}
              </p>
              <p className="font-display text-2xl mb-2">{story.title}</p>
              <p className="text-sm text-brown/70 leading-relaxed">{story.excerpt}</p>
              <p className="text-[10px] tracking-label uppercase underline-reveal mt-4 inline-block">
                Explore Story
              </p>
            </Link>
          </RevealText>
        ))}
      </div>
    </section>
  )
}
