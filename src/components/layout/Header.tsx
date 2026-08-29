import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useStore } from '@/lib/store'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cart, setCartOpen, setSearchOpen } = useStore()
  const itemCount = cart.reduce((n, i) => n + i.quantity, 0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Only the home page has a dark hero to sit over — everywhere else
  // starts on a light background, so the header should read dark from
  // the first frame there, scrolled or not.
  const showTransparent = isHome && !scrolled
  const textColor = showTransparent ? 'text-softwhite' : 'text-charcoal'

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          showTransparent
            ? 'bg-transparent py-7'
            : 'bg-ivory/90 backdrop-blur-md border-b border-charcoal/5 py-4'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-3 items-center">
          <nav className={`hidden md:flex gap-8 text-xs tracking-label uppercase ${textColor}`}>
            <Link to="/shop" className="underline-reveal">Shop</Link>
            <Link to="/collections" className="underline-reveal">Collections</Link>
            <Link to="/stories" className="underline-reveal">Stories</Link>
<<<<<<< HEAD
                        <Link to="/about" className="underline-reveal">About</Link>
            <Link to="/contact" className="underline-reveal">Contact</Link>

=======
>>>>>>> 672c88eb4960d8c60fc7a164ffdc617e4d3da2f9
          </nav>

          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.3} />
          </button>

          <Link
            to="/"
            className={`justify-self-center font-display text-2xl tracking-[0.15em] ${textColor}`}
          >
            ISRAAYA
          </Link>

          <div className={`flex items-center justify-end gap-6 ${textColor}`}>
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex"
              aria-label="Search"
              data-cursor="Search"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>
            <button className="hidden md:inline-flex" aria-label="Account">
              <User size={18} strokeWidth={1.3} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative"
              aria-label="Bag"
              data-cursor="Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-burgundy text-softwhite text-[9px] flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
