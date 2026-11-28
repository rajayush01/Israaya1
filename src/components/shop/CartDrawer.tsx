import { useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { MAX_QTY, formatINR, selectItemCount, selectSubtotal, useStore } from '@/lib/store'
import useScrollLock from '@/hooks/useScrollLock'

export default function CartDrawer() {
  const isCartOpen = useStore((s) => s.isCartOpen)
  const setCartOpen = useStore((s) => s.setCartOpen)
  const cart = useStore((s) => s.cart)
  const removeFromCart = useStore((s) => s.removeFromCart)
  const updateQuantity = useStore((s) => s.updateQuantity)
  const itemCount = useStore(selectItemCount)
  const subtotal = useStore(selectSubtotal)
  const navigate = useNavigate()

  useScrollLock(isCartOpen)

  useEffect(() => {
    if (!isCartOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isCartOpen, setCartOpen])

  const goToCheckout = () => {
    setCartOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[90] bg-charcoal/40"
          />
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 z-[95] h-full w-full sm:w-[440px] bg-softwhite flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-charcoal/10">
              <p className="text-xs tracking-label uppercase">Your Bag ({itemCount})</p>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="font-display text-2xl mb-2">Your bag is empty</p>
                  <p className="text-sm text-brown/60 mb-8">Pieces you add will wait for you here.</p>
                  <div className="flex flex-col items-center gap-4">
                    <Link
                      to="/shop"
                      onClick={() => setCartOpen(false)}
                      className="inline-block bg-charcoal text-softwhite px-8 py-4 text-xs tracking-label uppercase hover:bg-burgundy transition-colors duration-500"
                    >
                      Explore the Shop
                    </Link>
                    <Link
                      to="/collections"
                      onClick={() => setCartOpen(false)}
                      className="text-xs tracking-label uppercase underline-reveal"
                    >
                      View Collections
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-charcoal/10">
                  {cart.map((item) => (
                    <li key={item.key} className="flex gap-4 py-6">
                      <Link
                        to={`/product/${item.productId}`}
                        onClick={() => setCartOpen(false)}
                        className="shrink-0"
                      >
                        <img
                          loading="eager"
                          decoding="async"
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-28 object-cover object-top bg-cream"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-3">
                          <p className="font-display text-lg leading-tight">{item.name}</p>
                          <p className="text-sm whitespace-nowrap">{formatINR(item.price * item.quantity)}</p>
                        </div>
                        <p className="text-xs text-brown/50 mt-1">
                          {[item.color, `Size ${item.size}`].filter(Boolean).join(' · ')}
                        </p>
                        <p className="text-xs text-brown/50 mt-0.5">
                          {formatINR(item.price)}
                          {item.originalPrice ? (
                            <span className="ml-2 line-through text-brown/30">{formatINR(item.originalPrice)}</span>
                          ) : null}
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center border border-charcoal/20">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="w-8 h-8 flex items-center justify-center disabled:opacity-30"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-sm w-7 text-center" aria-live="polite">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              disabled={item.quantity >= MAX_QTY}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-8 h-8 flex items-center justify-center disabled:opacity-30"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="ml-auto text-[10px] tracking-label uppercase text-brown/50 underline-reveal"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-charcoal/10">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <p className="text-[11px] text-brown/50 mb-5">
                  Made to order, delivered in 15–20 days. Delivery within India is included.
                </p>
                <button
                  onClick={goToCheckout}
                  className="w-full bg-burgundy text-softwhite py-4 text-xs tracking-label uppercase hover:bg-wine transition-colors duration-500"
                >
                  Checkout
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-xs tracking-label uppercase mt-4 underline-reveal"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </m.aside>
        </>
      )}
    </AnimatePresence>
  )
}
