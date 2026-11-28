import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/data/products'

/** Slim snapshot of a product — small enough to persist, enough to render the bag and checkout. */
export type CartItem = {
  key: string
  productId: string
  variantId?: string
  name: string
  collection: string
  color: string
  image: string
  price: number
  originalPrice?: number
  size: string
  quantity: number
}

export type PlacedOrder = {
  orderNumber: string
  placedAt: string
  email: string
  name: string
  total: number
  itemCount: number
}

export const MAX_QTY = 10

export const cartKey = (productId: string, size: string, variantId?: string) =>
  `${productId}::${variantId ?? 'default'}::${size}`

type Store = {
  cart: CartItem[]
  wishlist: string[]
  lastOrder: PlacedOrder | null
  isCartOpen: boolean
  isSearchOpen: boolean
  isNewsletterOpen: boolean
  addToCart: (product: Product, size: string, quantity?: number) => void
  removeFromCart: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  setLastOrder: (order: PlacedOrder | null) => void
  toggleWishlist: (id: string) => void
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setNewsletterOpen: (open: boolean) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      lastOrder: null,
      isCartOpen: false,
      isSearchOpen: false,
      isNewsletterOpen: false,

      addToCart: (product, size, quantity = 1) =>
        set((state) => {
          const key = cartKey(product.id, size, product.selectedVariantId)
          const existing = state.cart.find((i) => i.key === key)
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) } : i,
              ),
              isCartOpen: true,
            }
          }
          const line: CartItem = {
            key,
            productId: product.id,
            variantId: product.selectedVariantId,
            name: product.name,
            collection: product.collection,
            color: product.color,
            image: product.images[0] ?? '',
            price: product.price,
            originalPrice: product.originalPrice,
            size,
            quantity: Math.min(MAX_QTY, quantity),
          }
          return { cart: [...state.cart, line], isCartOpen: true }
        }),

      removeFromCart: (key) => set((state) => ({ cart: state.cart.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.key === key ? { ...i, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) } : i,
          ),
        })),

      clearCart: () => set({ cart: [] }),
      setLastOrder: (order) => set({ lastOrder: order }),

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),

      setCartOpen: (open) => set({ isCartOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setNewsletterOpen: (open) => set({ isNewsletterOpen: open }),
    }),
    {
      name: 'israaya-bag-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Only the bag, wishlist and last order survive a reload — never UI flags.
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, lastOrder: s.lastOrder }),
    },
  ),
)

export const selectItemCount = (s: Store) => s.cart.reduce((n, i) => n + i.quantity, 0)
export const selectSubtotal = (s: Store) => s.cart.reduce((n, i) => n + i.price * i.quantity, 0)

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`
