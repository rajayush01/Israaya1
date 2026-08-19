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
    id: 'komal-tara',
    name: 'Komal Tara',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 06',
    price: 24500,
    description:
      'A soft peach three-piece suit set, easy to wear for a summer morning or a formal evening. The embroidery is done in resham thread with silver pearls and sequins, hand worked across both the front and back of the outfit — a peacock motif split in two, coming together only when you walk.',
    fabric: 'Pure silk chanderi, resham & pearl embroidery',
    craft: 'Hand-worked resham thread, silver pearls & sequins',
    fit: 'Relaxed three-piece — kurta, dupatta, straight pants',
    images: [komalTara1, komalTara2],
    category: 'sets',
    isNew: true,
  },
  {
    id: 'sona-pankh',
    name: 'Sona Pankh',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 05',
    price: 38900,
    description:
      'Made in a warm champagne gold that feels rich and grounded rather than loud. This three-piece Farsi Suit Set carries the heaviest hand-embroidered dupatta we have made — worked in resham thread, pearls and sequins, with trees and birds running across the surface.',
    fabric: 'Silk organza dupatta, cotton silk kurta',
    craft: 'All-over hand embroidery — resham, pearl, sequin',
    fit: 'Farsi suit set — kurta, dupatta, sharara pants',
    images: [sonaPankh1, sonaPankh2],
    category: 'sets',
  },
  {
    id: 'anaar-noor',
    name: 'Anaar Noor',
    collection: 'Chapter I',
    chapter: 'Chapter I · 02',
    price: 19800,
    description:
      'A deep burgundy kurta with antique gold thread running along the neckline and hem, cut for movement rather than occasion. Worn on its own, or layered for something more.',
    fabric: 'Handloom silk cotton',
    craft: 'Gold zari border, hand finished',
    fit: 'Straight kurta, relaxed through the body',
    images: [
      'https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628620835051-8f40f48c928d?q=80&w=1400&auto=format&fit=crop',
    ],
    category: 'kurtas',
  },
  {
    id: 'chandni-raat',
    name: 'Chandni Raat',
    collection: 'Chapter I',
    chapter: 'Chapter I · 03',
    price: 45200,
    description:
      'An ivory occasion set with hand-embroidered florals climbing from the hem, made for the moments that call for something quietly heavier.',
    fabric: 'Silk tissue, net dupatta',
    craft: 'Dabka, sequin & thread embroidery',
    fit: 'Anarkali set with fitted yoke',
    images: [
      'https://images.unsplash.com/photo-1610047614256-023d7c028d0b?q=80&w=1400&auto=format&fit=crop',
      komalTara2,
    ],
    category: 'occasionwear',
    isNew: true,
  },
  {
    id: 'reshmi-shaam',
    name: 'Reshmi Shaam',
    collection: 'Nikhaar',
    chapter: 'Chapter I · 07',
    price: 16400,
    description:
      'A dusty rose separate top with soft draping through the sleeve, meant to be paired back with the wardrobe you already own.',
    fabric: 'Mul cotton',
    craft: 'Thread embroidery at cuff',
    fit: 'Boxy, cropped at the hip',
    images: [
      'https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=1400&auto=format&fit=crop',
      komalTara1,
    ],
    category: 'separates',
  },
  {
    id: 'bela-jaan',
    name: 'Bela Jaan',
    collection: 'Chapter I',
    chapter: 'Chapter I · 01',
    price: 21900,
    description:
      'A champagne slip dress with hand-finished edges, worn under a dupatta for day and alone for evening.',
    fabric: 'Silk crepe',
    craft: 'Hand-rolled hems, pearl trim',
    fit: 'Bias-cut, falls below the knee',
    images: [
      'https://images.unsplash.com/photo-1571587289339-cb7da03fb5a6?q=80&w=1400&auto=format&fit=crop',
      sonaPankh1,
    ],
    category: 'dresses',
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
