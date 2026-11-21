import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useStore } from '@/lib/store'
import MobileMenu from './MobileMenu'
import logo from '@/assets/ISRAAYA LOGO.svg'
import logo1 from '@/assets/ISRAAYA MOTIF.svg'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

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

  // Close the mobile/tablet menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close the menu automatically if the viewport grows into desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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
        className={`fixed top-2 sm:top-3 lg:top-5 inset-x-2 sm:inset-x-4 lg:inset-x-8 mx-auto max-w-[1400px] z-50
          rounded-full border backdrop-blur-md
          transition-[background-color,border-color,box-shadow] duration-500 ${
            showTransparent
              ? 'bg-black/10 border-white/15 shadow-none'
              : 'bg-ivory/90 border-charcoal/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-1 lg:py-1.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Desktop nav (lg+) */}
          <nav
            className={`hidden lg:flex items-center gap-5 xl:gap-8 text-[11px] xl:text-xs tracking-label uppercase whitespace-nowrap ${textColor}`}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="underline-reveal">
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger (mobile + tablet + small laptop) */}
          <button
            className={`lg:hidden justify-self-start p-1 -ml-1 ${textColor}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} strokeWidth={1.3} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-self-center font-display text-2xl tracking-[0.15em] ${textColor}`}
          >
            <img
              loading="eager"
              decoding="async"
              src={logo1}
              alt="Israaya Logo"
              className="h-5 sm:h-6 lg:h-7 xl:h-8 w-auto -mb-4 sm:-mb-5"
            />
            <img
              loading="eager"
              decoding="async"
              src={logo}
              alt="Israaya Logo"
              className="h-11 sm:h-14 lg:h-14 xl:h-16 w-auto -mb-2"
            />
          </Link>

          {/* Actions */}
          <div
            className={`flex items-center justify-end gap-3 sm:gap-5 xl:gap-6 ${textColor}`}
          >
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex p-1"
              aria-label="Search"
              data-cursor="Search"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>
            <button className="hidden sm:inline-flex p-1" aria-label="Account">
              <User size={18} strokeWidth={1.3} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1"
              aria-label="Bag"
              data-cursor="Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-burgundy text-softwhite text-[9px] flex items-center justify-center">
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