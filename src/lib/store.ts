import { create } from 'zustand'
import type { Product } from '@/data/products'

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

type Store = {
  cart: CartItem[]
  wishlist: string[]
  isCartOpen: boolean
  isSearchOpen: boolean
  addToCart: (product: Product, size: string) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  toggleWishlist: (id: string) => void
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
}

export const useStore = create<Store>((set) => ({
  cart: [],
  wishlist: [],
  isCartOpen: false,
  isSearchOpen: false,
  addToCart: (product, size) =>
    set((state) => {
      const existing = state.cart.find(
        (i) => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isCartOpen: true,
        }
      }
      return {
        cart: [...state.cart, { product, size, quantity: 1 }],
        isCartOpen: true,
      }
    }),
  removeFromCart: (id, size) =>
    set((state) => ({
      cart: state.cart.filter((i) => !(i.product.id === id && i.size === size)),
    })),
  updateQuantity: (id, size, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.product.id === id && i.size === size ? { ...i, quantity } : i
      ),
    })),
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((w) => w !== id)
        : [...state.wishlist, id],
    })),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
}))
