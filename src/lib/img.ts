// /**
//  * Every photo lives on R2 as a full-size original (DSLR JPGs, several MB each).
//  * Decoding a multi-megapixel image just to paint it in a 500px slot is the main source
//  * of scroll jank, so each photo is requested at the width its slot needs, re-encoded as
//  * WebP by wsrv.nl (a free image CDN). If the resizer is ever unreachable, any <img>
//  * silently falls back to the original R2 URL (see installImageFallback).
//  *
//  * Once the files on R2 are pre-resized, set USE_IMAGE_RESIZER = false to load straight from R2.
//  */
// export const USE_IMAGE_RESIZER = true

// export function sized(url: string, width: number, opts: { grey?: boolean } = {}): string {
//   if (!USE_IMAGE_RESIZER) return url
//   return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=78&we${
//     opts.grey ? '&filt=greyscale' : ''
//   }`
// }

// function originalOf(src: string): string | null {
//   try {
//     const u = new URL(src)
//     return u.hostname === 'wsrv.nl' ? u.searchParams.get('url') : null
//   } catch {
//     return null
//   }
// }

// /** One global listener: if a resized image fails to load, retry it once from the original URL. */
// export function installImageFallback() {
//   document.addEventListener(
//     'error',
//     (e) => {
//       const el = e.target
//       if (!(el instanceof HTMLImageElement) || el.dataset.fallback) return
//       const original = originalOf(el.currentSrc || el.src)
//       if (!original) return
//       el.dataset.fallback = '1'
//       el.src = original
//     },
//     true,
//   )
// }


/**
 * Every photo lives on R2 as a full-size original.
 * wsrv.nl resizes images and converts them to WebP to reduce
 * network transfer, decoding cost, and scrolling jank.
 *
 * Once images are pre-resized on R2, set USE_IMAGE_RESIZER = false.
 */
export const USE_IMAGE_RESIZER = true

/**
 * Standard image widths used by migrated components.
 */
export const tiers = {
  hero: 1920,
  half: 1200,
  card: 800,
  thumb: 600,
} as const

export type Tier = keyof typeof tiers

/**
 * Build a resized image URL.
 *
 * Supports:
 *   sized(url, 800)
 *   sized(url, 800, { grey: true })
 *   sized(url, 'card')
 */
export function sized(
  url: string,
  widthOrTier: number | Tier,
  opts: { grey?: boolean } = {},
): string {
  if (!USE_IMAGE_RESIZER) return url

  const width =
    typeof widthOrTier === 'number'
      ? widthOrTier
      : tiers[widthOrTier]

  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=78${
    opts.grey ? '&filt=greyscale' : ''
  }`
}

/**
 * Resolve the original R2 URL from a wsrv.nl URL.
 */
function originalOf(src: string): string | null {
  try {
    const url = new URL(src)

    return url.hostname === 'wsrv.nl'
      ? url.searchParams.get('url')
      : null
  } catch {
    return null
  }
}

/**
 * Global fallback: retry failed resized images using the original URL.
 * Install once in main.tsx.
 */
export function installImageFallback() {
  if (typeof document === 'undefined') return

  document.addEventListener(
    'error',
    (event) => {
      const el = event.target

      if (
        !(el instanceof HTMLImageElement) ||
        el.dataset.fallback
      ) {
        return
      }

      const original = originalOf(el.currentSrc || el.src)

      if (!original) return

      el.dataset.fallback = '1'
      el.src = original
    },
    true,
  )
}

const highPriority = {
  fetchpriority: 'high',
} as const

/**
 * Backward-compatible image props for React and Framer Motion.
 *
 * Examples:
 *   <img {...imgProps(url, 'card')} />
 *   <m.img {...imgProps(url, 'hero', true)} />
 *
 * priority = true:
 *   eager loading + high fetch priority
 *
 * priority = false:
 *   lazy loading + default fetch priority
 */
export function imgProps(
  url: string,
  tier: Tier,
  priority = false,
) {
  return {
    src: sized(url, tier),
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    ...(priority ? highPriority : {}),
  }
}

