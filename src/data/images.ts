import links from './uploaded-links.json'

/**
 * Single source of truth for every photo on the site.
 * All URLs come from uploaded-links.json (Cloudflare R2). To swap a photo,
 * change the index in the slot below — nothing else needs touching.
 */
const all: string[] = links.map((l) => l.url)

// Wraps around so a shorter JSON never leaves a slot undefined.
const at = (i: number) => all[i % all.length]
const range = (start: number, count: number) =>
  Array.from({ length: count }, (_, k) => at(start + k))

export const productImages = {
  hansa: range(0, 4),
  madhura: range(4, 3),
  'sitara-chandni': range(7, 4),
  kamal: range(11, 3),
  'sona-pankh': range(14, 2),
  'komal-tara': range(16, 2),
}

export const siteImages = {
  hero: at(18),
  collectionCover: at(18), // Nikhaar cover shares the hero shot
  parallax: at(19),
  philosophy: at(20),
  craftLarge: at(21),
  craftSmall: at(22),
  campaign: at(23),
  newsletter: at(24),
  menuBackground: at(25),
}

export const socialImages = range(26, 8)
