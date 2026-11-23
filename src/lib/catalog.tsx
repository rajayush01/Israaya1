import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products as fallbackProducts, type Product, type ProductVariant } from '@/data/products'

type CatalogCategory = { name: string; slug: string }
type Announcement = { id: string; message: string }
type StorefrontPopup = { title: string; subtitle: string; image: string; buttonText: string; buttonLink: string }
type CatalogValue = {
  products: Product[]
  categories: CatalogCategory[]
  announcements: Announcement[]
  popupBanner: StorefrontPopup | null
  marqueeText: string
  loading: boolean
}

const CatalogContext = createContext<CatalogValue | null>(null)
const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')
const record = (value: unknown): Record<string, any> => value && typeof value === 'object' ? value as Record<string, any> : {}
const list = (value: unknown): any[] => Array.isArray(value) ? value : []
const nameOf = (value: unknown, fallback: string) => String(record(value).name || fallback)

function mapProduct(value: unknown): Product {
  const raw = record(value)
  const variants = list(raw.variants)
  const defaultId = String(record(raw.defaultVariant)._id || raw.defaultVariant || '')
  const mappedVariants: ProductVariant[] = variants.map((item) => {
    const prices = record(item.prices)
    const originalPrice = Number(prices.original || 0)
    return {
      id: String(item._id || ''),
      colorName: String(item.colorName || ''),
      colorCode: String(item.colorCode || '#d6d3d1'),
      price: Number(prices.discounted || prices.original || 0),
      ...(originalPrice > Number(prices.discounted || prices.original || 0) ? { originalPrice } : {}),
      images: [item.coverImage, ...list(item.images)].filter(Boolean).map(String),
      videos: list(item.videos).map(String),
      sizes: list(item.sizes).filter((size) => Number(size.stock ?? 1) > 0).map((size) => String(size.size || '')).filter(Boolean),
    }
  })
  const variant = mappedVariants.find((item) => item.id === defaultId) || mappedVariants[0]
  const variantRecord = variants.find((item) => String(item._id) === variant?.id) || record(raw.defaultVariant)
  const prices = record(variantRecord.prices)
  const category = record(raw.category)
  const subCategory = record(raw.subCategory)
  const tags = list(raw.tags).map(String)
  const price = Number(prices.discounted || prices.original || 0)
  const originalPrice = Number(prices.original || 0)
  const sizes = variant?.sizes || []
  const title = String(raw.title || 'Untitled piece')
  const slug = String(raw.slug || raw._id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
  const images = variant?.images || [variantRecord.coverImage, ...list(variantRecord.images)].filter(Boolean).map(String)

  return {
    id: slug,
    name: title,
    collection: nameOf(subCategory, nameOf(category, 'Israaya')),
    chapter: '',
    price: variant?.price ?? price,
    ...(originalPrice > price ? { originalPrice } : {}),
    color: variant?.colorName || String(variantRecord.colorName || ''),
    description: String(raw.description || ''),
    fabric: '',
    craft: tags.join(', '),
    fit: sizes.length ? `Available sizes: ${sizes.join(', ')}` : 'Contact us for sizing details.',
    images,
    videos: variant?.videos || list(variantRecord.videos).map(String),
    sizes,
    variants: mappedVariants,
    defaultVariantId: defaultId || variant?.id,
    category: String(category.slug || nameOf(category, 'all').toLowerCase().replace(/[^a-z0-9]+/g, '-')),
    isNew: tags.some((tag) => tag.toLowerCase() === 'new') || Boolean(raw.createdAt && Date.now() - new Date(raw.createdAt).getTime() < 30 * 86400000),
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [categories, setCategories] = useState<CatalogCategory[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [popupBanner, setPopupBanner] = useState<StorefrontPopup | null>(null)
  const [marqueeText, setMarqueeText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const get = async (path: string) => {
      const response = await fetch(`${API_BASE}/storefront/${path}`)
      if (!response.ok) throw new Error(`Storefront API returned ${response.status}`)
      return response.json()
    }

    Promise.all([get('products'), get('categories'), get('banners'), get('marquee')])
      .then(([productResponse, categoryResponse, bannerResponse, marqueeResponse]) => {
        if (!active) return
        const loadedProducts = list(record(productResponse).data).map(mapProduct).filter((item) => item.images.length > 0 || Boolean(item.videos?.length))
        setProducts(loadedProducts)
        setCategories(list(record(categoryResponse).data).map((item) => ({ name: String(item.name), slug: String(item.slug || '') })))
        const bannerData = record(record(bannerResponse).data)
        setAnnouncements(list(bannerData.announcements).map((item) => ({ id: String(item._id), message: String(item.message || '') })))
        const popup = record(bannerData.popupBanner)
        if (popup._id) setPopupBanner({
          title: String(popup.title || ''),
          subtitle: String(popup.subtitle || ''),
          image: String(popup.image || ''),
          buttonText: String(popup.buttonText || 'Explore'),
          buttonLink: String(popup.buttonLink || '/shop'),
        })
        setMarqueeText(String(record(record(marqueeResponse).data).text || ''))
      })
      .catch((error) => console.warn('Using local catalog until storefront API is available:', error))
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [])

  const value = useMemo(() => ({ products, categories, announcements, popupBanner, marqueeText, loading }), [products, categories, announcements, popupBanner, marqueeText, loading])
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const value = useContext(CatalogContext)
  if (!value) throw new Error('useCatalog must be used within CatalogProvider')
  return value
}
