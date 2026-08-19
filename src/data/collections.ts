import komalTara1 from '@/assets/products/komal-tara-1.png'
import komalTara2 from '@/assets/products/komal-tara-2.png'
import sonaPankh1 from '@/assets/products/sona-pankh-1.png'
import sonaPankh2 from '@/assets/products/sona-pankh-2.png'

export const collections = [
  {
    slug: 'nikhaar',
    name: 'Nikhaar',
    tagline: 'The light that comes from within.',
    chapter: 'Chapter I',
    description:
      'Nikhaar is where Israaya begins — soft peach and champagne gold, worked entirely by hand across dupatta, kurta and pant. Each piece carries a motif that only reveals itself in movement.',
    image: komalTara1,
    pieceIds: ['komal-tara', 'sona-pankh', 'reshmi-shaam'],
  },
  {
    slug: 'sona-pankh',
    name: 'Sona Pankh',
    tagline: 'Feathers cast in gold.',
    chapter: 'Chapter I',
    description:
      'The heaviest hand-embroidered dupatta the atelier has made — trees and birds worked across the surface in resham, pearl and sequin, photographed within the piece\u2019s namesake chapter.',
    image: sonaPankh1,
    pieceIds: ['sona-pankh'],
  },
  {
    slug: 'chapter-i',
    name: 'Chapter I',
    tagline: 'Where the collection begins.',
    chapter: 'Chapter I',
    description:
      'The founding chapter of Israaya — six pieces that set the palette, the craft language and the quiet mood the house has carried ever since.',
    image: sonaPankh2,
    pieceIds: ['anaar-noor', 'chandni-raat', 'bela-jaan'],
  },
]

export const stories = [
  {
    slug: 'komal-tara',
    title: 'Komal Tara',
    chapter: 'Chapter I · 06',
    excerpt:
      'A soft peach suit that sits somewhere between subtle and striking, made for the day that calls for something a little more special than easy.',
    body: [
      'Komal Tara comes in a soft peach, easy to wear and easy to style, whether it\u2019s a summer morning or a formal event. The colour sits somewhere between subtle and striking, which is exactly what makes it work so well.',
      'The three-piece set is made to feel comfortable and put together, without needing much effort. The embroidery is done in resham thread with silver pearls and sequins, hand worked across both the front and back of the outfit — nothing about the design feels accidental.',
      'The motif is split in two, and comes together as one full peacock only when you\u2019re walking, a detail that shows itself with movement rather than sitting still.',
      'It works well for a daytime wedding, a festive lunch, or any occasion that calls for something a little more special. It\u2019s the kind of piece you can dress up with heavier jewellery or keep simple, depending on the day.',
    ],
    image: komalTara1,
    images: [komalTara1, komalTara2],
  },
  {
    slug: 'sona-pankh',
    title: 'Sona Pankh',
    chapter: 'Chapter I · 05',
    excerpt:
      'The heaviest hand-embroidered dupatta we have made — trees and birds worked across the surface in resham, pearl and sequin.',
    body: [
      'Sona Pankh is made in a warm champagne gold, a colour that feels rich and grounded rather than loud. This three-piece Farsi Suit Set carries the heaviest hand-embroidered dupatta we have made, worked in resham thread, pearls and sequins, with trees and birds running across the surface. It is one of the most detailed pieces in the collection, and it shows the moment you see it.',
      'The detailing runs through the entire outfit, on the sleeves, along the hem, and through the dupatta, all done entirely by hand. Every motif has been placed with care, giving the surface a texture you can actually feel and not just see. It\u2019s a heavy piece, but wearable, the kind of embroidery that photographs well and holds up in person too.',
      'What makes Sona Pankh stand out is how versatile it is to style. Wear it with the dupatta for a complete, festive look, or set it aside and let the outfit carry itself for something more relaxed. Both versions work well on their own, so it really comes down to the occasion and how you want to feel that day. Either way, it still feels like the same piece, just styled differently depending on the moment.',
    ],
    image: sonaPankh1,
    images: [sonaPankh1, sonaPankh2],
  },
  {
    slug: 'chandni-raat',
    title: 'Chandni Raat',
    chapter: 'Chapter I · 03',
    excerpt:
      'Florals climbing from the hem in dabka and sequin, for the moments that ask for something quietly heavier.',
    body: [
      'Chandni Raat is an ivory occasion set, made for the evenings that call for something a little more considered than everyday wear.',
      'Hand-embroidered florals climb from the hem upward in dabka and sequin, growing denser as they near the neckline — a quiet build rather than an obvious statement.',
      'Underneath the embellishment is a fitted Anarkali silhouette, cut to move easily through a full evening, whether that means dancing, standing for photographs, or sitting through a long dinner.',
    ],
    image: 'https://images.unsplash.com/photo-1610047614256-023d7c028d0b?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610047614256-023d7c028d0b?q=80&w=1400&auto=format&fit=crop',
      komalTara2,
    ],
  },
]

export const socialGrid = [
  komalTara1,
  sonaPankh1,
  komalTara2,
  sonaPankh2,
  'https://images.unsplash.com/photo-1610047614256-023d7c028d0b?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=900&auto=format&fit=crop',
]
