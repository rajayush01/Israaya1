import komalTara1 from '@/assets/products/komal-tara-1.png'
import komalTara2 from '@/assets/products/komal-tara-2.png'
import sonaPankh1 from '@/assets/products/sona-pankh-1.png'
import sonaPankh2 from '@/assets/products/sona-pankh-2.png'

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
    images: [
      komalTara1,komalTara2,
    ],
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
    images: [
      sonaPankh1, sonaPankh2
    ],
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
    images: [
      komalTara1, komalTara2
    ],
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
    images: [
      sonaPankh1, sonaPankh2
    ],
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
    images: [sonaPankh1, sonaPankh2],
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
    images: [komalTara1, komalTara2],
    category: 'sets',
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
