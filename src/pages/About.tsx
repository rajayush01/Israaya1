import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */
const BASE = 'https://pub-5910ba650a5b4f4ba76486d5a3630c49.r2.dev/Israyaawebp'
const file = (n: number) => `${BASE}/IMG_${n}.webp`

const HERO = file(7963)
const STORY = [7964, 7965, 7966, 7967, 7968, 7969].map(file)
const CARD = file(7970)

/* ------------------------------------------------------------------ */
/* Scroll timeline (0 → 1 across the whole runway)                     */
/* Tweak these numbers to change pacing.                               */
/* ------------------------------------------------------------------ */
const RUNWAY_VH = 700 // total scroll length. Larger = slower story.

const T = {
  heroTextOut: [0.08, 0.12], // hero text stays until block 2 starts rising
  rise: [0.12, 0.26], // block 2 rises from the bottom as a card covering the hero (hero is held still until 0.12)
  imageIn: [0.12, 0.27], // image curtain opens left → right WHILE block 2 is still rising
  textIn: [0.22, 0.30], // text starts appearing as block 2 settles into place
  imgStart: 0.37, // first image-to-image transition begins
  imgStep: 0.07, // distance between transitions
  imgDur: 0.04, // length of each transition
  cardUp: [0.76, 0.9], // image card rises from bottom
  cardText: [0.85, 0.94],
} as const

const CREAM = '#F6F1E9'

/* ------------------------------------------------------------------ */
/* Story image layer: wipes up over the previous one                   */
/* ------------------------------------------------------------------ */
function StoryImage({
  src,
  index,
  progress,
}: {
  src: string
  index: number // 1-based position in the wipe sequence
  progress: MotionValue<number>
}) {
  const begin = T.imgStart + (index - 1) * T.imgStep
  const end = begin + T.imgDur
  const reveal = useTransform(progress, [begin, end], [100, 0])
  const scale = useTransform(progress, [begin, end], [1.2, 1])
  const clipPath = useMotionTemplate`inset(${reveal}% 0% 0% 0%)`

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ clipPath, zIndex: index }}
    >
      <motion.img
        src={src}
        alt={`Israaya collection, look ${index + 1}`}
        decoding="async"
        className="h-full w-full object-cover will-change-transform"
        style={{ scale }}
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Text block that rises into place at a given scroll position         */
/* ------------------------------------------------------------------ */
function Rise({
  progress,
  start,
  className,
  children,
}: {
  progress: MotionValue<number>
  start: number
  className?: string
  children: ReactNode
}) {
  const opacity = useTransform(progress, [start, start + 0.035], [0, 1])
  const y = useTransform(progress, [start, start + 0.035], [28, 0])
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function About() {
  const runway = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress: p } = useScroll({
    target: runway,
    offset: ['start start', 'end end'],
  })

  // Preload every image so nothing flashes mid-scroll.
  useEffect(() => {
    ;[HERO, ...STORY, CARD].forEach((src) => {
      const i = new Image()
      i.src = src
    })
  }, [])

  // Scene 1: hero
  const heroScale = useTransform(p, [...T.rise], [1, 1.1])
  const heroTextOpacity = useTransform(p, [...T.heroTextOut], [1, 0])
  // Block 2 rises from the bottom like a card and covers the hero
  const block2Y = useTransform(p, [...T.rise], ['100%', '0%'])

  // Inside block 2: once it covers the viewport it stays fixed.
  // The first image is revealed like a curtain, left → middle.
  const imageReveal = useTransform(p, [...T.imageIn], [100, 0])
  const imageClip = useMotionTemplate`inset(0% ${imageReveal}% 0% 0%)`
  const firstImageScale = useTransform(p, [...T.imageIn], [1.18, 1])

  // Scene 3: image card rises from the bottom
  const cardY = useTransform(p, [...T.cardUp], ['100%', '0%'])
  const cardImageScale = useTransform(p, [T.cardUp[0], 1], [1.18, 1])
  const cardTextOpacity = useTransform(p, [...T.cardText], [0, 1])
  const cardTextY = useTransform(p, [...T.cardText], [24, 0])

  // Counter follows whichever image is currently showing
  useMotionValueEvent(p, 'change', (v) => {
    let n = 0
    for (let i = 1; i < STORY.length; i++) {
      if (v >= T.imgStart + (i - 1) * T.imgStep + T.imgDur / 2) n = i
    }
    setActive(n)
  })

  return (
    <main>
      {/* Tall runway. The sticky stage inside it is the only thing the user sees. */}
      <div ref={runway} style={{ height: `${RUNWAY_VH}vh` }} className="relative">
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100svh', backgroundColor: CREAM }}
        >
          {/* ============ BLOCK 1: HERO ============ */}
          <div className="absolute inset-0 z-0">
            <motion.img
              src={HERO}
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

          {/* ============ BLOCK 2: OUR STORY (rises over the hero, then stays fixed) ============ */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col shadow-[0_-40px_80px_rgba(0,0,0,0.25)] will-change-transform md:flex-row"
            style={{ y: block2Y, backgroundColor: CREAM }}
          >
            {/* Left half: image curtain moves to the middle, then images change */}
            <motion.div
              className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2"
              style={{ clipPath: imageClip }}
            >
              <motion.img
                src={STORY[0]}
                alt="Israaya collection, look 1"
                decoding="async"
                className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
                style={{ scale: firstImageScale }}
              />
              {STORY.slice(1).map((src, i) => (
                <StoryImage key={src} src={src} index={i + 1} progress={p} />
              ))}
            </motion.div>

            {/* Right half: text appears after the image reaches the middle */}
            <div className="relative flex h-1/2 w-full flex-col justify-center px-6 md:h-full md:w-1/2 md:px-16 lg:px-24">
              <Rise progress={p} start={T.textIn[0]}>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-brown/70 md:mb-8">
                  Our Story
                </p>
              </Rise>

              <Rise progress={p} start={T.textIn[0] + 0.01}>
                <h2 className="font-display text-[9vw] leading-[1.05] text-charcoal md:text-[3.6vw]">
                  Indian wear,
                  <br />
                  reimagined.
                </h2>
              </Rise>

              <div className="mt-5 max-w-md space-y-4 text-sm leading-relaxed text-brown/80 md:mt-8 md:space-y-5 md:text-base">
                <Rise progress={p} start={T.textIn[0] + 0.025}>
                  <p>
                    Israaya is built on a simple belief, that Indian wear does not have to
                    choose between heritage and ease, between occasion and everyday.
                  </p>
                </Rise>
                <Rise progress={p} start={T.textIn[0] + 0.04} className="hidden md:block">
                  <p>
                    Founded by Khushi Dang, Israaya was built from a pull toward Indian
                    craft, fashion and culture, and a life lived between India and abroad.
                  </p>
                </Rise>
                <Rise progress={p} start={T.textIn[0] + 0.055} className="hidden md:block">
                  <p>
                    Every piece is made to order and hand embroidered by karigars carrying
                    techniques passed down through generations.
                  </p>
                </Rise>
              </div>

              <Rise
                progress={p}
                start={T.textIn[0] + 0.07}
                className="mt-8 hidden max-w-sm lg:block"
              >
                <blockquote className="border-l border-champagne pl-5 font-display text-lg italic leading-snug text-charcoal/90">
                  &ldquo;Indian artists and Indian ideas have shaped the world for
                  centuries without ever being given full credit for it. Israaya exists to
                  change that, one piece at a time.&rdquo;
                </blockquote>
              </Rise>

              {/* Progress through the six looks */}
              <Rise
                progress={p}
                start={T.textIn[0] + 0.08}
                className="absolute bottom-5 left-6 right-6 md:bottom-12 md:left-16 md:right-16 lg:left-24 lg:right-24"
              >
                <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-brown/60">
                  <span>{String(active + 1).padStart(2, '0')}</span>
                  <span className="relative h-px flex-1 bg-charcoal/15">
                    <span
                      className="absolute inset-y-0 left-0 bg-charcoal/70 transition-all duration-500"
                      style={{ width: `${((active + 1) / STORY.length) * 100}%` }}
                    />
                  </span>
                  <span>{String(STORY.length).padStart(2, '0')}</span>
                </div>
              </Rise>
            </div>
          </motion.div>

          {/* ============ BLOCK 3: IMAGE CARD (rises over block 2) ============ */}
          <motion.div
            className="absolute inset-0 z-30 p-3 will-change-transform md:p-6"
            style={{ y: cardY, backgroundColor: CREAM }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <motion.img
                src={CARD}
                alt="Israaya, made in India, made for the world"
                decoding="async"
                className="h-full w-full object-cover will-change-transform"
                style={{ scale: cardImageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <motion.h2
                className="absolute bottom-8 left-6 font-display text-[13vw] leading-[0.95] text-white md:bottom-14 md:left-12 md:text-[6.5vw]"
                style={{ opacity: cardTextOpacity, y: cardTextY }}
              >
                Made in India,
                <br />
                made for the world.
              </motion.h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The existing <Footer /> from components/layout renders after this,
          so it is intentionally not included here. */}
    </main>
  )
}