import { productImages } from './images'

export type Product = {
  id: string
  name: string
  collection: string
  chapter: string
  price: number
  originalPrice?: number
  color: string
  description: string
  fabric: string
  craft: string
  fit: string
  images: string[]
  category: 'sets' | 'kurtas' | 'dresses' | 'separates' | 'occasionwear'
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'hansa',
    name: 'Hansa',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 01',
    price: 28500,
    originalPrice: 31650,
    color: 'Pista Green',
    description:
      'Hansa is our interpretation of swans in love, drifting through a garden of their own making. Made in satin with dori embroidery and pearl work, this three-piece dhoti set carries a vibrant colour that feels alive the moment it catches light. Swans move throughout the embroidery alongside pearls and delicate garden motifs, each hand worked and placed with precision — made for the woman who wants colour that speaks for itself.',
    fabric: 'Kurta — satin, Dupatta — satin with embroidered border, Bottom — satin dhoti pants',
    craft: 'Hand-worked dori embroidery and pearl work, swan and garden motifs',
    fit: 'Three-piece dhoti set — kurta, dupatta, dhoti pants. Sizes XS–7XL, custom on request',
    images: productImages['hansa'],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'madhura',
    name: 'Madhura',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 02',
    price: 22800,
    originalPrice: 25330,
    color: 'Lilac',
    description:
      'Madhura is the perfect balance of subtle and fun, simple enough to feel effortless yet detailed enough to become a statement piece the moment you put it on. Crafted in pure Chanderi, it carries white and silver dori hand work embellished with pearls, detailing that reveals itself slowly rather than all at once. At its centre sits our own interpretation of the lotus, surrounded by florals that trail across the neckline. Perfect for daytime events, intimate occasions and destination weddings.',
    fabric: 'Kurta — pure Chanderi, Dupatta — Chanderi with embroidered border, Bottom — Chanderi sharara',
    craft: 'White and silver dori hand work with pearl embellishment, lotus motif',
    fit: 'Three-piece sharara set — kurta, dupatta, sharara. Sizes XS–7XL, custom on request',
    images: productImages['madhura'],
    category: 'sets',
  },
  {
    id: 'sitara-chandni',
    name: 'Sitara Chandni',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 03',
    price: 32400,
    originalPrice: 36000,
    color: 'White',
    description:
      'Sitara Chandni is that one white staple anarkali you\u2019ll keep coming back to. Crafted in pure Chanderi, inspired by the way moonlight sits on everything it touches — never loud, never fading into the background either. Hand embroidered with intricate silver zardozi work, detailed with delicate floral and subtle animal motifs woven through the yoke and sleeves. Timeless in its silhouette and effortless to style across multiple occasions.',
    fabric: 'Kurta — pure Chanderi, Dupatta — Chanderi with embroidered border, Bottom — Chanderi pants',
    craft: 'Silver zardozi hand embroidery, floral and animal motifs at yoke and sleeves',
    fit: 'Three-piece Anarkali set. Sizes XS–6XL, custom on request',
    images: productImages['sitara-chandni'],
    category: 'occasionwear',
    isNew: true,
  },
  {
    id: 'kamal',
    name: 'Kamal',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 04',
    price: 26900,
    originalPrice: 29890,
    color: 'Pink Ombre',
    description:
      'Kamal is built around a version of festive dressing that whispers instead of shouts. Silk meets a flowing organza dupatta in an ombre that fades gently from one shade into another, soft enough to feel like it was dipped in colour. Come closer and the fabric tells its own story — butterflies caught mid flight and flowers formed through organza patchwork, finished with beadwork that lifts just slightly off the surface. Easy enough for a sunny brunch, dressed up enough for a soiree.',
    fabric: 'Kurta — silk, Dupatta — organza (ombre), Bottom — silk farsi salwar',
    craft: 'Organza patchwork butterfly and floral motifs, hand-placed beadwork',
    fit: 'Three-piece Farsi suit set — short kurta, farsi salwar, dupatta. Sizes XS–6XL, custom on request',
    images: productImages['kamal'],
    category: 'sets',
  },
  {
    id: 'sona-pankh',
    name: 'Sona Pankh',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 05',
    price: 38900,
    originalPrice: 43220,
    color: 'Champagne Gold',
    description:
      'A three-piece Farsi suit set in warm champagne gold silk, comprising a straight silk kurta, a silk farsi salwar and the heaviest hand-embroidered dupatta in the collection. Resham thread, pearls and sequins are worked by hand into a dense pattern of trees and birds, covering the dupatta from end to end. The kurta and salwar stay comparatively minimal, so the set can be styled two ways — fully embellished with the dupatta, or relaxed and everyday without it.',
    fabric: 'Kurta — silk, Dupatta — silk (heavily hand embroidered), Bottom — silk farsi salwar',
    craft: 'All-over hand embroidery — resham thread, pearls and sequins, trees and birds motif',
    fit: 'Three-piece Farsi suit set — kurta, dupatta, salwar. Sizes XS–6XL, custom on request',
    images: productImages['sona-pankh'],
    category: 'sets',
  },
  {
    id: 'komal-tara',
    name: 'Komal Tara',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 06',
    price: 24500,
    originalPrice: 27220,
    color: 'Peach',
    description:
      'A three-piece suit set in soft peach silk, comprising a long straight kurta, matching straight pants and a dupatta finished in a unique textured organza that sets it apart from the rest of the set. Resham thread and sequin embroidery run along the neckline and down the front split of the kurta, kept precise and detailed against an otherwise clean silhouette. The dupatta\u2019s texture adds dimension without embroidery, so the set feels considered from every angle.',
    fabric: 'Kurta — silk, Dupatta — silk (textured), Bottom — silk pants',
    craft: 'Resham thread and sequin embroidery at neckline and front split',
    fit: 'Three-piece suit set — kurta, dupatta, pants. Sizes XS–6XL, custom on request',
    images: productImages['komal-tara'],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'morpankh',
    name: 'Morpankh',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 07',
    price: 14500,
    color: 'Powder Blue',
    description:
      'A three-piece suit set in powder blue, comprising a long straight kurta and matching pants in chanderi, paired with an organza dupatta. The kurta carries hand beadwork throughout in our own interpretation of the peacock motif, worked alongside flowers and leaves that connect into one continuous pattern across the fabric. The detailing sits close and considered rather than dense, every bead placed by hand so the piece reads simple and elegant from a distance, revealing its full intricacy only up close. The organza dupatta stays light against the chanderi base, keeping the whole set easy to wear from a summer morning through to a formal celebration.',
    fabric: 'Kurta — Chanderi, Bottom — Chanderi pants, Dupatta — Organza',
    craft: 'Hand beadwork, peacock motif with flowers and leaves in a continuous pattern',
    fit: 'Three-piece suit set — kurta, pants, dupatta. Sizes XS–6XL, custom on request',
    images: productImages['morpankh'],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'basant',
    name: 'Basant',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 08',
    price: 15000,
    color: 'Yellow',
    description:
      'A three-piece skirt set in yellow, comprising a long straight kurta and matching skirt in chanderi, paired with a net dupatta. White dori work runs across the neckline, sleeves and hem, finished with white pearl sequins that catch light against the chanderi base without overwhelming it. Festive and detailed enough for a wedding function or celebration, and a strong fit for a bridal trousseau, the piece pairs the lightness of chanderi with just enough embroidery weight to feel occasion ready.',
    fabric: 'Kurta — Chanderi, Skirt — Chanderi, Dupatta — Net',
    craft: 'White dori work at neckline, sleeves and hem, with white pearl sequins',
    fit: 'Three-piece skirt set — kurta, skirt, dupatta. Sizes XS–6XL, custom on request',
    images: productImages['basant'],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'megh',
    name: 'Megh',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 09',
    price: 14500,
    color: 'Powder Blue',
    description:
      'A soft powder blue A-line suit set, made up of a straight kurta, matching pants and an organza dupatta with scattered floral motifs. The neckline is finished with silver hand beadwork in a garden inspired pattern, with fine embroidered trails running down the front of the kurta. Light, easy to move in and built for daytime wear, this set works well for a day function, a mehndi, or a casual festive occasion where you want detail without heaviness. Style it with silver jewellery and minimal accessories to keep the palette cohesive.',
    fabric: 'Kurta — Silk, Dupatta — Organza, Bottom — Silk pants',
    craft: 'Silver hand beadwork at neckline, garden-inspired pattern with embroidered trails down the front',
    fit: 'Three-piece suit set — kurta, pants, dupatta. Sizes XS–6XL, custom on request',
    images: productImages['megh'],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'noor-bahar',
    name: 'Noor Bahar',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 10',
    price: 22000,
    color: 'Blush Pink',
    description:
      'A four-piece anarkali set in blush pink, made entirely in chanderi, comprising the anarkali, a detachable embroidered jacket, a dupatta and a matching pajama. The jacket is heavily hand embroidered in silver thread, beads, pearls and sequins, with a garden pattern of butterflies and leaves covering it fully — detailed work that takes real time and skill to finish. The anarkali itself carries embroidery throughout, at the neckline, sleeves and dupatta border, so the handwork is not limited to the jacket alone. This set can be worn two ways: with the jacket it becomes a heavy statement piece perfect for a destination wedding or a big function; without the jacket it works as an elevated everyday piece suited to festivals, occasions, and simpler wedding functions.',
    fabric: 'Anarkali — Chanderi, Jacket — Chanderi with silver embroidery, Dupatta — Chanderi with embroidered border, Pajama — Chanderi',
    craft: 'Heavy hand embroidery in silver thread, beads, pearls and sequins — butterfly and garden motifs on jacket; embroidery at neckline, sleeves and dupatta border',
    fit: 'Four-piece anarkali set — anarkali, detachable jacket, dupatta, pajama. Sizes XS–6XL, custom on request',
    images: productImages['noor-bahar'],
    category: 'occasionwear',
    isNew: true,
  },
]

export const categories = [
  'All',
  'New Arrivals',
  'Sets',
  'Kurtas',
  'Dresses',
  'Separates',
  'Occasionwear',
] as const
