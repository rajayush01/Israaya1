import { useEffect, useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion'

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */
const BASE = 'https://pub-5910ba650a5b4f4ba76486d5a3630c49.r2.dev/Israyaawebp'
const file = (n: number) => `${BASE}/IMG_${n}.webp`

const IMG = {
  hero: file(7963),
  story: file(7964),
  founder: file(7965),
  quote: file(7969),
  philosophy: file(7966),
  values: file(7967),
  india: file(7968),
  closing: file(7970),
}

const CREAM = '#F6F1E9'

/* ------------------------------------------------------------------ */
/* Pacing (all numbers are in viewport heights of scroll)              */
/*                                                                     */
/* Every chapter is a tall "runway" with a sticky 100svh stage inside. */
/*   0 → 100   the stage rises from the bottom as a card over the      */
/*             previous one, image curtain opens during this rise      */
/*   100 → …   pinned. Copy changes beat by beat, BEAT_VH per beat      */
/*   last 100  the NEXT chapter rises over this one                    */
/* ------------------------------------------------------------------ */
const BEAT_VH = 45 // scroll per beat. Larger = slower story.
const HERO_HOLD_VH = 60 // how long the hero stays before chapter 1 rises
const runwayFor = (beats: number) => 200 + BEAT_VH * beats

const STAGE_SHADOW = 'shadow-[0_-40px_80px_rgba(0,0,0,0.25)]'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function useStage(runway: number) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const at = (vh: number) => vh / runway // scroll distance → progress
  return { ref, p, at }
}

/** Fades + lifts a block into place between two progress values. */
function Fade({
  p,
  from,
  to,
  className,
  children,
}: {
  p: MotionValue<number>
  from: number
  to: number
  className?: string
  children: ReactNode
}) {
  const opacity = useTransform(p, [from, to], [0, 1])
  const y = useTransform(p, [from, to], [28, 0])
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

/** One screenful of copy. Crossfades with its neighbours as you scroll. */
function Beat({
  p,
  i,
  n,
  runway,
  children,
}: {
  p: MotionValue<number>
  i: number
  n: number
  runway: number
  children: ReactNode
}) {
  const last = i === n - 1
  const start = i === 0 ? 55 : 100 + BEAT_VH * i - 8
  const a = start / runway
  const f = (i === 0 ? 35 : 14) / runway
  const b = (100 + BEAT_VH * (i + 1)) / runway
  // const f = 14 / runway
  const times = last ? [a, a + f] : [a, a + f, b - f, b]
  const opacity = useTransform(p, times, last ? [0, 1] : [0, 1, 1, 0])
  const y = useTransform(p, times, last ? [24, 0] : [24, 0, 0, -24])
  return (
    <motion.div className="col-start-1 row-start-1" style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

const para = (...texts: string[]) => (
  <div className="space-y-4 md:space-y-5">
    {texts.map((t) => (
      <p key={t.slice(0, 24)}>{t}</p>
    ))}
  </div>
)

/* ------------------------------------------------------------------ */
/* Chapter: card rises over the previous one, image curtain opens from */
/* its own side while rising, copy then changes beat by beat           */
/* ------------------------------------------------------------------ */
function Chapter({
  side,
  src,
  alt,
  eyebrow,
  title,
  beats,
  first = false,
}: {
  side: 'left' | 'right' // which side the IMAGE is on
  src: string
  alt: string
  eyebrow: string
  title: ReactNode
  beats: ReactNode[]
  first?: boolean
}) {
  const n = beats.length
  const runway = runwayFor(n)
  const { ref, p, at } = useStage(runway)

  // Curtain: left images open left → middle, right images open right → middle.
  const rightInset = useTransform(p, [0, at(100)], [side === 'left' ? 100 : 0, 0])
  const leftInset = useTransform(p, [0, at(100)], [side === 'right' ? 100 : 0, 0])
  const clipPath = useMotionTemplate`inset(0% ${rightInset}% 0% ${leftInset}%)`
  const imageScale = useTransform(p, [0, at(100)], [1.18, 1])

  const lineScale = useTransform(p, [at(100), at(100 + BEAT_VH * n)], [0, 1])

  return (
    <section
      ref={ref}
      className="relative"
      style={{
        height: `${runway}svh`,
        marginTop: first ? `${HERO_HOLD_VH}svh` : '-100svh',
      }}
    >
      <div
        className={`sticky top-0 flex w-full flex-col overflow-hidden will-change-transform md:flex-row ${STAGE_SHADOW}`}
        style={{ height: '100svh', backgroundColor: CREAM }}
      >
        {/* IMAGE */}
        <motion.div
          className={`relative h-[38%] w-full overflow-hidden md:h-full md:w-1/2 ${
            side === 'right' ? 'md:order-2' : ''
          }`}
          style={{ clipPath }}
        >
          <motion.img
            src={src}
            alt={alt}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ scale: imageScale }}
          />
        </motion.div>

        {/* COPY */}
        <div
          className={`relative flex h-[62%] w-full flex-col justify-center px-6 md:h-full md:w-1/2 md:px-16 lg:px-24 ${
            side === 'right' ? 'md:order-1' : ''
          }`}
        >
          <Fade p={p} from={at(35)} to={at(65)}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-brown/70 md:mb-8">
              {eyebrow}
            </p>
          </Fade>

          <Fade p={p} from={at(40)} to={at(70)}>
            <h2 className="font-display text-[8vw] leading-[1.05] text-charcoal md:text-[3.2vw]">
              {title}
            </h2>
          </Fade>

          <div className="mt-4 grid max-w-md text-[13px] leading-[1.6] text-brown/80 md:mt-8 md:text-base md:leading-[1.75]">
            {beats.map((b, i) => (
              <Beat key={i} p={p} i={i} n={n} runway={runway}>
                {b}
              </Beat>
            ))}
          </div>

          {/* Progress through this chapter */}
          <Fade
            p={p}
            from={at(90)}
            to={at(110)}
            className="absolute bottom-5 left-6 right-6 md:bottom-12 md:left-16 md:right-16 lg:left-24 lg:right-24"
          >
            <span className="block h-px w-full bg-charcoal/15">
              <motion.span
                className="block h-px origin-left bg-charcoal/70"
                style={{ scaleX: lineScale }}
              />
            </span>
          </Fade>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Full-bleed quote: rises over the previous chapter, image settles    */
/* ------------------------------------------------------------------ */
function QuoteBand() {
  const runway = 250
  const { ref, p, at } = useStage(runway)
  const scale = useTransform(p, [0, at(100)], [1.18, 1])

  return (
    <section ref={ref} className="relative" style={{ height: `${runway}svh`, marginTop: '-100svh' }}>
      <div
        className={`sticky top-0 w-full overflow-hidden bg-charcoal ${STAGE_SHADOW}`}
        style={{ height: '100svh' }}
      >
        <motion.img
          src={IMG.quote}
          alt="Israaya craft"
          decoding="async"
          className="h-full w-full object-cover will-change-transform"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
        <div className="absolute inset-0 flex items-end px-6 pb-14 md:items-center md:px-16 md:pb-0 lg:px-24">
          <Fade p={p} from={at(75)} to={at(115)}>
            <blockquote className="max-w-4xl font-display text-[7vw] italic leading-[1.15] text-white md:text-[3.4vw]">
              &ldquo;Indian artists and Indian ideas have shaped the world for centuries
              without ever being given full credit for it. Israaya exists to change that, one
              piece at a time.&rdquo;
            </blockquote>
          </Fade>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Closing card (same as your original block 3)                        */
/* ------------------------------------------------------------------ */
function ClosingCard() {
  const runway = 190
  const { ref, p, at } = useStage(runway)
  const scale = useTransform(p, [0, at(100)], [1.18, 1])

  return (
    <section ref={ref} className="relative" style={{ height: `${runway}svh`, marginTop: '-100svh' }}>
      <div
        className={`sticky top-0 w-full p-3 will-change-transform md:p-6 ${STAGE_SHADOW}`}
        style={{ height: '100svh', backgroundColor: CREAM }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <motion.img
            src={IMG.closing}
            alt="Israaya, made in India, made for the world"
            decoding="async"
            className="h-full w-full object-cover will-change-transform"
            style={{ scale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6 md:bottom-14 md:left-12">
            <Fade p={p} from={at(105)} to={at(140)}>
              <h2 className="font-display text-[13vw] leading-[0.95] text-white md:text-[6.5vw]">
                Made in India,
                <br />
                made for the world.
              </h2>
            </Fade>
            <Fade p={p} from={at(125)} to={at(155)}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                This is India&rsquo;s craft, made by India&rsquo;s hands, for the world.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const VALUES = [
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
    body: 'Every piece carries the time intention takes to get right, not the time a deadline allows. We build slowly on purpose, because craftsmanship rushed is craftsmanship compromised, and intention is not something that can be sped up.',
  },
  {
    title: 'Custom made for every body.',
    body: 'Standard sizing was never the standard here. Every piece is available in a full size range with custom measurements on request, because fit should never be the reason a woman goes without.',
  },
  {
    title: 'India on the global stage.',
    body: 'We build with the belief that Indian craft belongs at the same table as the world’s finest maisons, not referenced from a distance but recognised outright.',
  },
  {
    title: 'Craft as opportunity.',
    body: 'Every order supports the women and karigar families behind it, and we are building toward deeper partnerships in education and craft preservation so that opportunity extends further than one order at a time.',
  },
]

const valueBeat = (items: typeof VALUES) => (
  <div className="space-y-5 md:space-y-7">
    {items.map((v) => (
      <div key={v.title}>
        <h3 className="mb-1 font-display text-base leading-snug text-charcoal md:mb-2 md:text-2xl">
          {v.title}
        </h3>
        <p>{v.body}</p>
      </div>
    ))}
  </div>
)

const STORY_BEATS = [
  para(
    'Israaya is built on a simple belief, that Indian wear does not have to choose between heritage and ease, between occasion and everyday, between tradition and the rest of the world. Conceived to reimagine what Indian wear can be for the woman of today, Israaya exists at the intersection of craft, comfort and global design sensibility.',
  ),
  para(
    'The label moves beyond the occasion wear formula Indian wear has long been confined to, building elevated basics alongside statement pieces and treating Indian wear as something to be worn often rather than reserved for a handful of days a year. Design is never limited by geography, body or moment.',
  ),
  para(
    'Each collection under Israaya exists as its own chapter, a distinct world built around a theme, an era or an idea that will never be repeated. No chapter borrows from the one before it, each created once and retired to make space for the next. It is this structure that lets Israaya experiment freely across centuries and aesthetics, while staying rooted in one philosophy, that Indian craftsmanship, handled with care, can hold its own on any global stage.',
  ),
  para(
    'That philosophy extends to how Israaya is made. Every piece begins with karigars practising techniques passed down through generations, reimagined through a modern lens for the women wearing them today. Nothing is mass produced. Every piece is made to order and hand embroidered only once it is called for, because slow fashion is not a limitation but the intended way forward, an industry built on intention rather than volume.',
  ),
  para(
    'Today, Israaya represents an evolving vision of what Indian wear can be, global, versatile and entirely its own world, where craftsmanship remains the ultimate marker of luxury.',
  ),
]

const FOUNDER_BEATS = [
  para(
    'Israaya is the work of Khushi Dang, built from a pull toward Indian craft, fashion and culture that began early and never faded, sharpened later by an education in fashion and luxury business between London and Manchester, and by a life lived between India and abroad.',
  ),
  para(
    'That movement between worlds, growing up in India, living overseas, travelling widely, became the lens Israaya was eventually built through, a way of seeing Indian craftsmanship not as something regional but as something the rest of the world had simply never been given proper access to.',
  ),
  para(
    'What Israaya is built on is this. Indian craft is top tier and endlessly versatile, and it deserves a global stage, real recognition, and the space to be refined and elevated rather than mass produced and repeated.',
  ),
  para(
    'Every silhouette, every detail and every decision is created with intention, not simply to make beautiful clothing, but pieces with soul, pieces that become a reflection of the woman wearing them. It is made to order rather than made to sit on a shelf, carrying the belief that slow fashion is not a limitation but the intended way forward, intention over volume, permanence over trend.',
  ),
  para(
    'This is knowledge that cannot be taught in a season, carried instead by karigars who have spent generations perfecting a single stitch and passing it down as inheritance rather than instruction. It is a brand built for a global audience meeting this craftsmanship properly for the first time, and for everyone who already knows its worth.',
  ),
]

const PHILOSOPHY_BEATS = [
  para(
    'Every Israaya piece is designed around one rule: it has to be as easy to live in as it is beautiful to look at. A silhouette that looks stunning but restricts movement is a failed design, not a finished one. So every cut is tested against how it moves, not just how it photographs.',
  ),
  para(
    'Craft comes before decoration. We do not add embroidery to fill space or justify a price point. Every technique used, zardozi, dori work, resham, beadwork, is chosen because it is the right technique for that piece, developed in conversation with the karigars who actually know how to execute it well. This is also why no two chapters repeat a technique the same way twice. Each chapter is built from scratch, on its own terms.',
  ),
  para(
    'Craft, for us, is also a livelihood. Every order placed puts income directly into the hands of the women and karigar families who make it, and we are actively building the systems to make that support go further, from consistent, fair work to skill development that lasts beyond a single order.',
  ),
  para(
    'We are also in conversation with organisations focused on education, craft preservation and women’s empowerment, with the intention of formalising these partnerships as Israaya grows. Building a brand on Indian craftsmanship means investing in the people who carry it, not just the product they produce.',
  ),
  para(
    'Israaya is an international, progressive brand rooted in India but built for a global lens, and that same standard runs through everything we make: intention followed through completely, from the first sketch to the final stitch, from the karigar’s hands to the woman who wears it.',
  ),
]

const VALUES_BEATS = [
  valueBeat(VALUES.slice(0, 2)),
  valueBeat(VALUES.slice(2, 4)),
  valueBeat(VALUES.slice(4, 6)),
]

const INDIA_BEATS = [
  para(
    'Every Israaya piece is made in India, start to finish, by karigar families who have carried their craft across generations. These are artisans trained not in a single technique but in an entire inherited language of embroidery, skills passed down as knowledge rather than instruction, refined over years until they become instinct rather than method.',
  ),
  para(
    'Our artisans come from different cities across India, each carrying craft shaped by its own region, era and cultural history, so every piece draws from a distinct part of the country rather than one single tradition.',
  ),
  para(
    'What makes working with them extraordinary is not just what they already know, but how willing they are to take it further. Age old techniques, in their hands, continue to grow rather than simply repeat. They open up to interpretation, to experimentation, to being reimagined in ways that feel modern and fresh while staying rooted in exactly where they came from.',
  ),
  para(
    'This is what allows Israaya to keep evolving with every chapter, because the artisans behind it are not simply executing a brief, they are collaborators who bring generations of expertise to every new idea we bring them.',
  ),
  para(
    'Made in India is not a label we add for credibility. It is the only way Israaya was ever going to be built. Every order placed puts value directly back into the artisan communities behind it, keeping techniques alive that would otherwise fade with each generation that moves further from them.',
  ),
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function About() {
  // Preload every image so nothing flashes mid-scroll.
  useEffect(() => {
    Object.values(IMG).forEach((src) => {
      const i = new Image()
      i.src = src
    })
  }, [])

  // Hero stays pinned at the back; chapters rise over it.
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 1200], [1, 1.1])
  const heroTextOpacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <main className="relative">
      {/* ============ HERO ============ */}
      <div className="sticky top-0 z-0 w-full overflow-hidden" style={{ height: '100svh' }}>
        <motion.img
          src={IMG.hero}
          alt="Israaya"
          className="h-full w-full object-cover will-change-transform"
          style={{ scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-10 md:px-12 md:pb-14"
          style={{ opacity: heroTextOpacity }}
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-white/80">
              The New Language of Indian Wear
            </p>
            <h1 className="font-display text-[16vw] leading-[0.9] text-white md:text-[8vw]">
              Israaya
            </h1>
          </div>
          <p className="hidden pb-2 text-[11px] uppercase tracking-[0.35em] text-white/80 md:block">
            Scroll
          </p>
        </motion.div>
      </div>

      {/* ============ CHAPTERS: image LEFT, RIGHT, (quote), LEFT, RIGHT, LEFT ============ */}
      <Chapter
        first
        side="left"
        src={IMG.story}
        alt="Israaya collection, look 1"
        eyebrow="Our Story"
        title={
          <>
            Indian wear,
            <br />
            reimagined.
          </>
        }
        beats={STORY_BEATS}
      />

      <Chapter
        side="right"
        src={IMG.founder}
        alt="Khushi Dang, Founder and Creative Director of Israaya"
        eyebrow="Our Founder"
        title={
          <>
            Khushi Dang,
            <br />
            Founder and Creative Director.
          </>
        }
        beats={FOUNDER_BEATS}
      />

      <QuoteBand />

      <Chapter
        side="left"
        src={IMG.philosophy}
        alt="Israaya collection, look 3"
        eyebrow="Our Philosophy"
        title={
          <>
            As easy to live in
            <br />
            as it is beautiful.
          </>
        }
        beats={PHILOSOPHY_BEATS}
      />

      <Chapter
        side="right"
        src={IMG.values}
        alt="Israaya collection, look 4"
        eyebrow="Our Values"
        title={
          <>
            What Israaya
            <br />
            is built on.
          </>
        }
        beats={VALUES_BEATS}
      />

      <Chapter
        side="left"
        src={IMG.india}
        alt="Israaya artisans and embroidery"
        eyebrow="Made in India"
        title={
          <>
            Start to finish,
            <br />
            by karigar families.
          </>
        }
        beats={INDIA_BEATS}
      />

      <ClosingCard />

      {/* The existing <Footer /> from components/layout renders after this,
          so it is intentionally not included here. */}
    </main>
  )
}