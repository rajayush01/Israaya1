import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, removeFromCart, updateQuantity } = useStore()
  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[90] bg-charcoal/40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 z-[95] h-full w-full sm:w-[420px] bg-softwhite flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-charcoal/10">
              <p className="text-xs tracking-label uppercase">
                Your Bag ({cart.reduce((n, i) => n + i.quantity, 0)})
              </p>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 divide-y divide-charcoal/10">
              {cart.length === 0 && (
                <p className="py-16 text-center text-sm text-brown/60">Your bag is empty.</p>
              )}
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg">{item.product.name}</p>
                    <p className="text-xs text-brown/50 mt-1">Size {item.size}</p>
                    <p className="text-sm mt-2">₹{item.product.price.toLocaleString('en-IN')}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))
                        }
                        className="w-6 h-6 flex items-center justify-center border border-charcoal/20"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-charcoal/20"
                      >
                        <Plus size={11} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="ml-auto text-[10px] tracking-label uppercase text-brown/50 underline-reveal"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-charcoal/10">
                <div className="flex justify-between text-sm mb-5">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full bg-burgundy text-softwhite py-4 text-xs tracking-label uppercase hover:bg-wine transition-colors duration-500">
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
