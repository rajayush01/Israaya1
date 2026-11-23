import { Link } from 'react-router-dom'
import { useCatalog } from '@/lib/catalog'

export default function StorefrontBanners() {
  const { announcements, popupBanner } = useCatalog()

  if (!announcements.length && !popupBanner) return null

  return (
    <>
      {announcements.length > 0 && (
        <div className="bg-burgundy text-softwhite py-3 px-6 text-center text-[10px] md:text-xs tracking-label uppercase">
          {announcements.map((item) => <span key={item.id} className="mx-5">{item.message}</span>)}
        </div>
      )}
      {popupBanner && (
        <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="relative min-h-[320px] md:min-h-[520px] overflow-hidden bg-charcoal">
            <img src={popupBanner.image} alt={popupBanner.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent" />
            <div className="relative z-10 min-h-[320px] md:min-h-[520px] max-w-2xl flex flex-col items-start justify-end p-8 md:p-16 text-softwhite">
              <h2 className="font-display text-4xl md:text-6xl leading-tight">{popupBanner.title}</h2>
              {popupBanner.subtitle && <p className="mt-4 max-w-lg text-sm md:text-base text-softwhite/80">{popupBanner.subtitle}</p>}
              {popupBanner.buttonLink.startsWith('http') ? (
                <a href={popupBanner.buttonLink} className="mt-7 text-xs tracking-label uppercase underline-reveal">{popupBanner.buttonText}</a>
              ) : (
                <Link to={popupBanner.buttonLink || '/shop'} className="mt-7 text-xs tracking-label uppercase underline-reveal">{popupBanner.buttonText}</Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
