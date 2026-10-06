/**
 * Every photo lives on R2 as a full-size original (DSLR JPGs, several MB each).
 * Decoding a multi-megapixel image just to paint it in a 500px slot is the main source
 * of scroll jank, so each photo is requested at the width its slot needs, re-encoded as
 * WebP by wsrv.nl (a free image CDN). If the resizer is ever unreachable, any <img>
 * silently falls back to the original R2 URL (see installImageFallback).
 *
 * Once the files on R2 are pre-resized, set USE_IMAGE_RESIZER = false to load straight from R2.
 */
export const USE_IMAGE_RESIZER = true

export function sized(url: string, width: number, opts: { grey?: boolean } = {}): string {
  if (!USE_IMAGE_RESIZER) return url
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=78&we${
    opts.grey ? '&filt=greyscale' : ''
  }`
}

function originalOf(src: string): string | null {
  try {
    const u = new URL(src)
    return u.hostname === 'wsrv.nl' ? u.searchParams.get('url') : null
  } catch {
    return null
  }
}

/** One global listener: if a resized image fails to load, retry it once from the original URL. */
export function installImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const el = e.target
      if (!(el instanceof HTMLImageElement) || el.dataset.fallback) return
      const original = originalOf(el.currentSrc || el.src)
      if (!original) return
      el.dataset.fallback = '1'
      el.src = original
    },
    true,
  )
}
