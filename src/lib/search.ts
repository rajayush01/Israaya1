import type { Product } from '@/data/products'

/** Lower-case, strip accents and punctuation so "Noor-Bahar", "noor bahar" and "Nóor" all match. */
export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9₹\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

type Indexed = {
  product: Product
  name: string
  primary: string // things a shopper would type first: name, collection, colours, category
  secondary: string // longer descriptive text
}

const FILTER_LABELS: Record<string, string> = {
  nikhaar: 'nikhaar collection',
  'aw-26-27': 'autumn winter 26 27',
}

/** Everything a shopper might reasonably type, built only from real catalog data. */
export function buildIndex(products: Product[]): Indexed[] {
  return products.map((product) => {
    const colours = [product.color, ...(product.variants?.map((v) => v.colorName) ?? [])]
    const filters = (product.shopFilters ?? []).map((f) => FILTER_LABELS[f] ?? f)
    return {
      product,
      name: normalize(product.name),
      primary: normalize([product.name, product.collection, product.category, ...colours, ...filters].join(' ')),
      secondary: normalize([product.description, product.fabric, product.craft, product.fit].join(' ')),
    }
  })
}

/** All words must match (AND). Name hits rank above colour/collection hits, which rank above descriptions. */
export function searchProducts(index: Indexed[], query: string): Product[] {
  const tokens = normalize(query).split(' ').filter(Boolean)
  if (!tokens.length) return []

  return index
    .map((entry) => {
      let score = 0
      for (const token of tokens) {
        if (entry.name.startsWith(token)) score += 12
        else if (entry.name.split(' ').some((w) => w.startsWith(token))) score += 9
        else if (entry.name.includes(token)) score += 6
        else if (entry.primary.split(' ').some((w) => w.startsWith(token))) score += 4
        else if (entry.primary.includes(token)) score += 2
        else if (entry.secondary.includes(token)) score += 1
        else return { product: entry.product, score: 0 } // a missing word kills the match
      }
      return { product: entry.product, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.product)
}

/** Suggestion chips derived from the live catalog instead of a hard-coded list. */
export function buildSuggestions(products: Product[], limit = 6): string[] {
  const out: string[] = []
  const add = (label: string) => {
    const clean = label.trim()
    if (clean && !out.some((o) => o.toLowerCase() === clean.toLowerCase())) out.push(clean)
  }
  products.forEach((p) => add(p.collection))
  products.slice(0, 4).forEach((p) => add(p.name))
  products.forEach((p) => add(p.color))
  return out.slice(0, limit)
}
