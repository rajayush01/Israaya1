import links from './uploaded-links.json'
import { sized } from '@/lib/img'

/**
 * Single source of truth for every photo on the site.
 * All URLs come from uploaded-links.json (Cloudflare R2). To swap a photo,
 * change the index in the slot below — nothing else needs touching.
 * The second argument is the width (px) that slot actually needs.
 */
const all: string[] = links.map((l) => l.url)

// Wraps around so a shorter JSON never leaves a slot undefined.
const at = (i: number, width: number, opts?: { grey?: boolean }) =>
  sized(all[i % all.length], width, opts)
const range = (start: number, count: number, width: number) =>
  Array.from({ length: count }, (_, k) => at(start + k, width))

export const productImages = {
  hansa: range(0, 4, 900),
  madhura: range(4, 3, 900),
  'sitara-chandni': range(7, 4, 900),
  kamal: range(11, 3, 900),
  'sona-pankh': range(14, 2, 900),
  'komal-tara': range(16, 2, 900),
}

export const siteImages = {
  hero: at(18, 1920),
  collectionCover: at(18, 1920), // Nikhaar cover shares the hero shot (same URL = one download)
  parallax: at(19, 1920),
  philosophy: at(20, 1200),
  craftLarge: at(21, 1200),
  craftSmall: at(22, 800),
  campaign: at(23, 1600, { grey: true }), // greyscale is baked in, no CSS filter at runtime
  newsletter: at(24, 800),
  menuBackground: at(25, 800),
}

export const socialImages = range(26, 8, 1000)

/** The one image the loader waits for, so the first screen never pops in. */
export const criticalImages: string[] = [siteImages.hero]

/** Everything else, in the order a visitor is likely to meet it. */
export const preloadOrder: string[] = [
  ...Object.values(productImages).map((imgs) => imgs[0]),
  siteImages.craftLarge,
  siteImages.craftSmall,
  siteImages.parallax,
  ...socialImages,
  siteImages.campaign,
  siteImages.philosophy,
  ...Object.values(productImages).flatMap((imgs) => imgs.slice(1)),
  siteImages.newsletter,
  siteImages.menuBackground,
]
