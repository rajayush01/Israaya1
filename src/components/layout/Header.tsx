import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useStore } from '@/lib/store'
import MobileMenu from './MobileMenu'
import logo from '@/assets/ISRAAYA LOGO.svg'
import logo1 from '@/assets/ISRAAYA MOTIF.svg'

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
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Home page sits over a dark hero until scrolled; every other page
  // starts on a light background so the pill reads dark from frame one.
  const showTransparent = isHome && !scrolled
  const textColor = showTransparent ? 'text-softwhite' : 'text-charcoal'

  return (
    <>
      <m.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-3 md:top-5 inset-x-3 md:inset-x-8 mx-auto max-w-[1400px] z-50
          rounded-full border backdrop-blur-md
          transition-[background-color,border-color,box-shadow] duration-500 ${
            showTransparent
              ? 'bg-black/10 border-white/15 shadow-none'
              : 'bg-ivory/90 border-charcoal/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
          }`}
      >
        <div className="px-5 md:px-10 py-1 md:py-1.5 grid grid-cols-3 items-center">
          <nav className={`hidden md:flex gap-8 text-xs tracking-label uppercase ${textColor}`}>
            <Link to="/shop" className="underline-reveal">Shop</Link>
            <Link to="/collections" className="underline-reveal">Collections</Link>
            <Link to="/stories" className="underline-reveal">Stories</Link>
            <Link to="/about" className="underline-reveal">About</Link>
            <Link to="/contact" className="underline-reveal">Contact</Link>
          </nav>

          <button
            className={`md:hidden justify-self-start ${textColor}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.3} />
          </button>

          <Link
            to="/"
            className={`flex flex-col items-center justify-self-center font-display text-2xl tracking-[0.15em] ${textColor}`}
          >
            <img
              loading="eager"
              decoding="async"
              src={logo1}
              alt="Israaya Logo"
              className="h-6 md:h-8 w-auto -mb-5"
            />
            <img
              loading="eager"
              decoding="async"
              src={logo}
              alt="Israaya Logo"
              className="h-14 md:h-16 w-auto -mb-2"
            />
          </Link>

          <div className={`flex items-center justify-end gap-5 md:gap-6 ${textColor}`}>
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
      </m.header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}