import { useEffect, useRef } from 'react'

type Props = {
  src: string
  poster?: string
  className?: string
}

/**
 * Autoplaying loop that only decodes frames while it is actually on screen.
 * Respects reduced-motion (shows the poster instead of playing).
 */
export default function InViewVideo({ src, poster, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay can be blocked (data saver, low power) — the poster stays visible */
          })
        } else {
          video.pause()
        }
      },
      { rootMargin: '150px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
