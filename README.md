# Israaya India

Modern Indianwear, rooted in craft — an award-caliber editorial ecommerce
site built for Israaya India.

## Stack
React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · GSAP ·
Lenis smooth scroll · Zustand · React Router

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## What's included

- Cinematic hero, brand intro, asymmetrical featured-collection layout
- Editorial product grid with alternating aspect ratios + hover crossfade
- Full product detail page (gallery, size selector, accordions, related pieces)
- "Rooted in Craft" macro-imagery section, parallax campaign section,
  editorial "Stories" chapters (listing + individual story pages),
  Instagram-inspired masonry grid, campaign video modal, brand philosophy section
- Collections listing + individual collection detail pages (chapter intro
  + the pieces in that collection)
- Transparent-to-solid header, fullscreen mobile menu, fullscreen search
  overlay, slide-in cart drawer (Zustand-backed), shop page with category
  filters
- Custom magnetic-cursor (desktop only, respects touch devices),
  page transitions, scroll-triggered reveals, infinite marquee,
  loading screen, subtle film-grain overlay
- `prefers-reduced-motion` respected globally

## Pages

`/` `/shop` `/product/:id` `/collections` `/collections/:slug`
`/stories` `/stories/:slug` `/about` `/contact`

## Notes

- **Komal Tara** and **Sona Pankh** use your real campaign photography
  (extracted from the Instagram carousel you shared) — those are the two
  documented pieces with real editorial copy pulled from your captions.
- The remaining four pieces (Anaar Noor, Chandni Raat, Reshmi Shaam, Bela
  Jaan) are placeholders — names, copy, prices and photography are invented
  to round out the grid, using verified-working Unsplash editorial photos
  in a similar palette. Swap `src/data/products.ts` with real pieces and
  photography whenever ready; component structure won't need to change.
- Checkout is a UI stub — wire it to your payment/inventory provider of choice.

