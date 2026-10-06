import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import { preloadCritical, preloadRest } from '@/lib/preload'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/shop/CartDrawer'
import SearchOverlay from '@/components/shop/SearchOverlay'
import NewsletterPopup from '@/components/shop/NewsletterPopup'
// import CustomCursor from '@/components/ui/CustomCursor'
import Loader from '@/components/ui/Loader'

import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Product from '@/pages/Product'
import Collections from '@/pages/Collections'
import CollectionDetail from '@/pages/CollectionDetail'
import Stories from '@/pages/Stories'
import StoryDetail from '@/pages/StoryDetail'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

function PageTransition({ children }: { children: React.ReactNode }) {
  // Opacity-only: fading a whole page is cheap, translating it forces a huge repaint.
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
    >
      {children}
    </m.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
        <Route path="/collections/:slug" element={<PageTransition><CollectionDetail /></PageTransition>} />
        <Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
        <Route path="/stories/:slug" element={<PageTransition><StoryDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [assetsReady, setAssetsReady] = useState(false)

  useSmoothScroll()

  useEffect(() => {
    // 1) the loader waits for the hero to be decoded, 2) then everything else warms up in the background
    preloadCritical().then(() => {
      setAssetsReady(true)
      preloadRest()
    })
  }, [])

  return (
    <div className="grain">
      {loading && <Loader ready={assetsReady} onDone={() => setLoading(false)} />}
      {/* <CustomCursor /> */}
      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <NewsletterPopup />
    </div>
  )
}

export default App
