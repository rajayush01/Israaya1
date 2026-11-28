import { useEffect } from 'react'
import { getLenis } from '@/hooks/useSmoothScroll'

/**
 * Freezes the page behind a drawer / overlay. Works with Lenis (stop/start) and with
 * native scrolling (overflow hidden + scrollbar compensation so the layout doesn't jump).
 */
export default function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const html = document.documentElement
    const scrollbar = window.innerWidth - html.clientWidth
    const prevOverflow = html.style.overflow
    const prevPadding = html.style.paddingRight

    html.style.overflow = 'hidden'
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
    getLenis()?.stop()

    return () => {
      html.style.overflow = prevOverflow
      html.style.paddingRight = prevPadding
      getLenis()?.start()
    }
  }, [locked])
}
