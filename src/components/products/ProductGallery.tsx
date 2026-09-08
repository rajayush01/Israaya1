import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (next: number) => {
    if (next === index) return
    setDirection(next > index ? 1 : -1)
    setIndex((next + images.length) % images.length)
  }

  return (
    <div>
    <div className="flex gap-4 md:gap-5">
      {/* Thumbnail rail (desktop) */}
      {images.length > 1 && (
        <div className="hidden sm:flex flex-col gap-3 w-16 md:w-20 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`overflow-hidden border transition-colors duration-300 ${
                i === index ? 'border-charcoal' : 'border-transparent hover:border-charcoal/30'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt={`${name} thumbnail ${i + 1}`} className="w-full aspect-[3/4] object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {/* Sliding main image */}
      <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-champagne/20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${name} ${index + 1}`}
            custom={direction}
            initial={{ x: direction >= 0 ? '100%' : '-100%', opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? '-100%' : '100%', opacity: 0.4 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center hover:bg-ivory transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} strokeWidth={1.4} />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center hover:bg-ivory transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} strokeWidth={1.4} />
            </button>

            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-charcoal' : 'w-1.5 bg-charcoal/25'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>

      {/* Thumbnail strip (mobile) */}
      {images.length > 1 && (
        <div className="sm:hidden flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`overflow-hidden border shrink-0 w-16 transition-colors duration-300 ${
                i === index ? 'border-charcoal' : 'border-transparent'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt={`${name} thumbnail ${i + 1}`} className="w-full aspect-[3/4] object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
