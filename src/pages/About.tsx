import RevealText from '@/components/ui/RevealText'
<<<<<<< HEAD
import SectionLabel from '@/components/ui/SectionLabel'

const sections = [
  {
    label: 'Our Story',
    paragraphs: [
      'Israaya is built on a simple belief, that Indian wear does not have to choose between heritage and ease, between occasion and everyday, between tradition and the rest of the world. Conceived to reimagine what Indian wear can be for the woman of today, Israaya exists at the intersection of craft, comfort and global design sensibility.',
      'The label moves beyond the occasion-wear formula Indian wear has long been confined to, building elevated basics alongside statement pieces and treating Indian wear as something to be worn often rather than reserved for a handful of days a year. Design is never limited by geography, body or moment.',
      'Each collection under Israaya exists as its own chapter, a distinct world built around a theme, an era or an idea that will never be repeated. No chapter borrows from the one before it, each created once and retired to make space for the next. It is this structure that lets Israaya experiment freely across centuries and aesthetics, while staying rooted in one philosophy — that Indian craftsmanship, handled with care, can hold its own on any global stage.',
      'That philosophy extends to how Israaya is made. Every piece begins with karigars practising techniques passed down through generations, reimagined through a modern lens for the women wearing them today. Nothing is mass produced. Every piece is made to order and hand embroidered only once it is called for, because slow fashion is not a limitation but the intended way forward — an industry built on intention rather than volume.',
      'Today, Israaya represents an evolving vision of what Indian wear can be: global, versatile and entirely its own world, where craftsmanship remains the ultimate marker of luxury.',
    ],
  },
  {
    label: 'Our Founder',
    paragraphs: [
      'Israaya is the work of Khushi Dang, Founder and Creative Director, built from a pull toward Indian craft, fashion and culture that began early and never faded, sharpened later by an education in fashion and luxury business between London and Manchester, and by a life lived between India and abroad. That movement between worlds — growing up in India, living overseas, travelling widely — became the lens Israaya was eventually built through, a way of seeing Indian craftsmanship not as something regional but as something the rest of the world had simply never been given proper access to.',
      'What Israaya is built on is this: Indian craft is top tier and endlessly versatile, and it deserves a global stage, real recognition, and the space to be refined and elevated rather than mass produced and repeated. Every silhouette, every detail and every decision is created with intention, not simply to make beautiful clothing, but pieces with soul, pieces that become a reflection of the woman wearing them.',
      'It is made to order rather than made to sit on a shelf, carrying the belief that slow fashion is not a limitation but the intended way forward — intention over volume, permanence over trend. This is knowledge that cannot be taught in a season, carried instead by karigars who have spent generations perfecting a single stitch and passing it down as inheritance rather than instruction. It is a brand built for a global audience meeting this craftsmanship properly for the first time, and for everyone who already knows its worth.',
    ],
    quote:
      'Indian artists and Indian ideas have shaped the world for centuries without ever being given full credit for it. Israaya exists to change that, one piece at a time.',
  },
  {
    label: 'Our Philosophy',
    paragraphs: [
      'Every Israaya piece is designed around one rule: it has to be as easy to live in as it is beautiful to look at. A silhouette that looks stunning but restricts movement is a failed design, not a finished one. So every cut is tested against how it moves, not just how it photographs.',
      'Craft comes before decoration. We do not add embroidery to fill space or justify a price point. Every technique used — zardozi, dori work, resham, beadwork — is chosen because it is the right technique for that piece, developed in conversation with the karigars who actually know how to execute it well. This is also why no two chapters repeat a technique the same way twice. Each chapter is built from scratch, on its own terms.',
      'Craft, for us, is also livelihood. Every order placed puts income directly into the hands of the women and karigar families who make it, and we are actively building the systems to make that support go further, from consistent, fair work to skill development that lasts beyond a single order. We are also in conversation with organisations focused on education, craft preservation and women\u2019s empowerment, with the intention of formalising these partnerships as Israaya grows.',
      'Israaya is an international, progressive brand rooted in India but built for a global lens, and that same standard runs through everything we make: intention followed through completely, from the first sketch to the final stitch, from the karigar\u2019s hands to the woman who wears it.',
    ],
  },
  {
    label: 'Our Values',
    values: [
      {
        title: 'Built by the hands we build around.',
        body: 'Israaya exists because of the karigars who make it. Every decision, from technique to timeline, is shaped around giving their craft the space and respect it has always deserved.',
      },
      {
        title: 'Made to order, not made to sit.',
        body: 'Nothing is produced until it is ordered. Every piece is cut, fitted and finished for one person.',
      },
      {
        title: 'Time is part of the design.',
        body: 'Every piece carries the time intention takes to get right, not the time a deadline allows. We build slowly on purpose, because craftsmanship rushed is craftsmanship compromised.',
      },
      {
        title: 'Custom made for every body.',
        body: 'Standard sizing was never the standard here. Every piece is available in a full size range with custom measurements on request, because fit should never be the reason a woman goes without.',
      },
      {
        title: 'India on the global stage.',
        body: 'We build with the belief that Indian craft belongs at the same table as the world\u2019s finest maisons, not referenced from a distance but recognised outright.',
      },
      {
        title: 'Craft as opportunity.',
        body: 'Every order supports the women and karigar families behind it, and we are building toward deeper partnerships in education and craft preservation so that opportunity extends further than one order at a time.',
      },
    ],
  },
  {
    label: 'Made in India',
    paragraphs: [
      'Every Israaya piece is made in India, start to finish, by karigar families who have carried their craft across generations. These are artisans trained not in a single technique but in an entire inherited language of embroidery, skills passed down as knowledge rather than instruction, refined over years until they become instinct rather than method. Our artisans come from different cities across India, each carrying craft shaped by its own region, era and cultural history, so every piece draws from a distinct part of the country rather than one single tradition.',
      'What makes working with them extraordinary is not just what they already know, but how willing they are to take it further. Age-old techniques, in their hands, continue to grow rather than simply repeat — open to interpretation, to experimentation, to being reimagined in ways that feel modern and fresh while staying rooted in exactly where they came from. This is what allows Israaya to keep evolving with every chapter, because the artisans behind it are collaborators who bring generations of expertise to every new idea we bring them.',
      'Made in India is not a label we add for credibility. It is the only way Israaya was ever going to be built. Every order placed puts value directly back into the artisan communities behind it, keeping techniques alive that would otherwise fade with each generation that moves further from them.',
    ],
    closing: 'This is India\u2019s craft, made by India\u2019s hands, for the world.',
  },
]

export default function About() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-[860px] mx-auto px-6 md:px-10">
      <RevealText as="h1" className="font-display text-[11vw] md:text-[4vw] leading-[1.05] mb-16 md:mb-24">
        About Israaya
      </RevealText>

      <div className="flex flex-col gap-24 md:gap-32">
        {sections.map((section, si) => (
          <section key={section.label}>
            <div className="mb-6">
              <SectionLabel>{section.label}</SectionLabel>
            </div>

            {section.paragraphs && (
              <RevealText delay={0.05} className="text-brown/80 leading-relaxed text-base md:text-lg space-y-6">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? '' : 'mt-6'}>
                    {p}
                  </p>
                ))}
              </RevealText>
            )}

            {section.quote && (
              <RevealText delay={0.1}>
                <blockquote className="mt-10 border-l-2 border-champagne pl-6 md:pl-8 italic font-display text-xl md:text-2xl leading-snug text-charcoal/90">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              </RevealText>
            )}

            {section.values && (
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mt-2">
                {section.values.map((v, i) => (
                  <RevealText key={v.title} delay={i * 0.05}>
                    <p className="font-display text-lg md:text-xl mb-2 text-charcoal">{v.title}</p>
                    <p className="text-brown/70 leading-relaxed text-sm md:text-base">{v.body}</p>
                  </RevealText>
                ))}
              </div>
            )}

            {section.closing && (
              <RevealText delay={0.1} className="italic font-display text-xl md:text-2xl text-champagne mt-10">
                {section.closing}
              </RevealText>
            )}

            {si < sections.length - 1 && (
              <div className="w-full h-px bg-charcoal/10 mt-24 md:mt-32" />
            )}
          </section>
        ))}
      </div>
=======

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
>>>>>>> 672c88eb4960d8c60fc7a164ffdc617e4d3da2f9
    </div>
  )
}
