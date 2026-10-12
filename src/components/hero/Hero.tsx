// import { m } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
// import { siteImages } from '@/data/images'

// const heroImage = siteImages.hero

// const ease = [0.25, 1, 0.5, 1] as const

// export default function Hero() {
//   return (
//     <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
//       <m.div
//         initial={{ opacity: 0, scale: 1.04 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.8, ease }}
//         className="absolute inset-0"
//       >
//         <img loading="eager" decoding="async"
//           src={heroImage}
//           fetchPriority="high"
//           alt="Israaya — Nikhaar collection"
//           className="w-full h-full object-cover object-[center_50%]"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />
//       </m.div>

//       <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-20 md:pb-24">
//         <m.p
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.1, duration: 1, ease }}
//           className="text-xs md:text-sm tracking-label uppercase text-softwhite/70 mb-5"
//         >
//           Nikhaar · Chapter I
//         </m.p>

//         <m.h1
//           initial={{ opacity: 0, y: 28 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.3, duration: 1.3, ease }}
//           className="font-display text-softwhite text-[15vw] md:text-[7vw] leading-[0.92] tracking-tight"
//         >
//           Modern Indianwear,
//           <br />
//           <span className="italic text-champagne">Rooted in Craft.</span>
//         </m.h1>

//         <m.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.9, duration: 1, ease }}
//           className="mt-10"
//         >
//           <a
//             href="#collection"
//             className="group inline-flex items-center gap-3 text-softwhite text-xs tracking-label uppercase"
//             data-cursor="Explore"
//           >
//             <span className="underline-reveal">Explore the Collection</span>
//             <ArrowRight
//               size={14}
//               strokeWidth={1.3}
//               className="transition-transform duration-500 group-hover:translate-x-1.5"
//             />
//           </a>
//         </m.div>
//       </div>

//       <m.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.4, duration: 1 }}
//         className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-3"
//       >
//         <span className="text-[10px] tracking-label uppercase text-softwhite/60 [writing-mode:vertical-lr]">
//           Scroll to Discover
//         </span>
//         <span className="w-px h-10 bg-softwhite/40 relative overflow-hidden">
//           <m.span
//             animate={{ y: ['-100%', '100%'] }}
//             transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
//             className="absolute inset-0 bg-champagne"
//           />
//         </span>
//       </m.div>
//     </section>
//   )
// }











import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteImages } from '@/data/images'
import heroVideo from '../../assets/israaya-video.mp4'

const heroImage = siteImages.hero
const ease = [0.25, 1, 0.5, 1] as const

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const video = videoRef.current
    if (!video) return

    // Defer video loading slightly so the poster can appear first.
    const timeoutId = window.setTimeout(() => {
      video.load()

      // Explicitly attempt playback for browsers that permit autoplay.
      video.play().catch(() => {
        // Keep the poster visible if playback is blocked.
      })
    }, 500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [reduceMotion])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0"
      >
        {/* Optimized fallback poster */}
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-[center_50%] transition-opacity duration-700 ${
            videoReady && !reduceMotion ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {!reduceMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={heroImage}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover object-[center_50%]"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />
      </m.div>

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-24">
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          className="mb-5 text-xs uppercase tracking-label text-softwhite/70 md:text-sm"
        >
          Nikhaar · Chapter I
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease }}
          className="font-display text-[15vw] leading-[0.92] tracking-tight text-softwhite md:text-[7vw]"
        >
          Modern Indianwear,
          <br />
          <span className="italic text-champagne">
            Rooted in Craft.
          </span>
        </m.h1>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
          className="mt-10"
        >
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-label text-softwhite"
            data-cursor="Explore"
          >
            <span className="underline-reveal">
              Explore the Collection
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </a>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-6 flex flex-col items-center gap-3 md:right-10"
      >
        <span className="text-[10px] uppercase tracking-label text-softwhite/60 [writing-mode:vertical-lr]">
          Scroll to Discover
        </span>

        <span className="relative h-10 w-px overflow-hidden bg-softwhite/40">
          <m.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-champagne"
          />
        </span>
      </m.div>
    </section>
  )
}
