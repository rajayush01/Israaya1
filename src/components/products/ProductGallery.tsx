import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import productVideo from '@/assets/video/Hansa.mp4'

// A product video, when present, occupies index 0; images follow it.

export default function ProductGallery({
  images,
  videos = [],
  name,
}: {
  images: string[]
  videos?: string[]
  name: string
}) {
  const videoItems = videos.length ? videos : name === 'Hansa' ? [productVideo] : []
  const total = videoItems.length + images.length
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideo = active < videoItems.length
  const video = videoItems[active]
  const imageOffset = videoItems.length
  const imgIdx = active - imageOffset

  const goTo = (next: number) => {
    if (next === active) return
    setDirection(next > active ? 1 : -1)
    setActive(total ? (next + total) % total : 0)
  }

  // Pause video whenever user navigates away from it
  useEffect(() => {
    if (!isVideo) videoRef.current?.pause()
  }, [active, isVideo])

  return (
    <div>
      <div className="flex gap-4 md:gap-5">

        {/* ── Thumbnail rail (desktop) ── */}
        <div className="hidden sm:flex flex-col gap-3 w-16 md:w-20 shrink-0">

          {/* Video thumbnail */}
          {videoItems.map((videoItem, index) => <button
            key={videoItem}
            onClick={() => goTo(index)}
            className={`relative overflow-hidden border transition-colors duration-300 ${
              active === index ? 'border-charcoal' : 'border-transparent hover:border-charcoal/30'
            }`}
            aria-label={`View video ${index + 1}`}
          >
            <video
              src={videoItem}
              className="w-full aspect-[3/4] object-cover object-top pointer-events-none"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
              <div className="w-6 h-6 rounded-full bg-ivory/90 flex items-center justify-center">
                <Play size={9} strokeWidth={1.5} className="ml-0.5" />
              </div>
            </div>
          </button>)}

          {/* Image thumbnails */}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i + imageOffset)}
              className={`overflow-hidden border transition-colors duration-300 ${
                active === i + imageOffset ? 'border-charcoal' : 'border-transparent hover:border-charcoal/30'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                loading="eager"
                decoding="async"
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full aspect-[3/4] object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* ── Main viewer ── */}
        <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-champagne/20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {isVideo ? (
              <m.div
                key="video"
                custom={direction}
                initial={{ x: direction >= 0 ? '100%' : '-100%', opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction >= 0 ? '-100%' : '100%', opacity: 0.4 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <video
                  ref={videoRef}
                  src={video}
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </m.div>
            ) : (
              <m.img
                key={imgIdx}
                src={images[imgIdx]}
                alt={`${name} ${imgIdx + 1}`}
                custom={direction}
                initial={{ x: direction >= 0 ? '100%' : '-100%', opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction >= 0 ? '-100%' : '100%', opacity: 0.4 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            )}
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={16} strokeWidth={1.4} />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={16} strokeWidth={1.4} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? 'w-6 bg-charcoal' : 'w-1.5 bg-charcoal/25'
                }`}
                aria-label={videoItems[i] ? `View video ${i + 1}` : `Go to image ${i - imageOffset + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip (mobile) ── */}
      <div className="sm:hidden flex gap-3 mt-4 overflow-x-auto">

        {/* Video thumbnail mobile */}
        {videoItems.map((videoItem, index) => <button
          key={videoItem}
          onClick={() => goTo(index)}
          className={`relative overflow-hidden border shrink-0 w-16 transition-colors duration-300 ${
            active === index ? 'border-charcoal' : 'border-transparent'
          }`}
          aria-label={`View video ${index + 1}`}
        >
          <video
            src={videoItem}
            className="w-full aspect-[3/4] object-cover object-top pointer-events-none"
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
            <div className="w-5 h-5 rounded-full bg-ivory/90 flex items-center justify-center">
              <Play size={8} strokeWidth={1.5} className="ml-0.5" />
            </div>
          </div>
        </button>)}

        {/* Image thumbnails mobile */}
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goTo(i + imageOffset)}
            className={`overflow-hidden border shrink-0 w-16 transition-colors duration-300 ${
              active === i + imageOffset ? 'border-charcoal' : 'border-transparent'
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <img
              loading="eager"
              decoding="async"
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              className="w-full aspect-[3/4] object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
