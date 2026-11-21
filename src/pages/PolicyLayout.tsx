import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import { SITE } from '@/lib/siteInfo'

export type PolicySection = {
  id: string
  title: string
  paragraphs?: ReactNode[]
  bullets?: ReactNode[]
}

type Highlight = { label: string; value: string }

const POLICY_LINKS = [
  { to: '/shipping', label: 'Shipping Policy' },
  { to: '/returns', label: 'Return & Exchange Policy' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}

export default function PolicyLayout({
  eyebrow,
  title,
  intro,
  highlights,
  sections,
}: {
  eyebrow: string
  title: string
  intro?: ReactNode
  highlights?: Highlight[]
  sections: PolicySection[]
}) {
  const { pathname } = useLocation()
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const active = useActiveSection(ids)
  const related = POLICY_LINKS.filter((l) => l.to !== pathname)

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-ivory text-charcoal">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36">
        {/* ── Header ── */}
        <header className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <RevealText>
            <p className="text-[10px] sm:text-xs tracking-label uppercase text-burgundy mb-5">{eyebrow}</p>
          </RevealText>
          <RevealText as="h1" delay={0.05} className="font-display text-[13vw] sm:text-6xl lg:text-7xl leading-[0.98]">
            {title}
          </RevealText>
          {intro && (
            <RevealText delay={0.12}>
              <div className="mt-6 sm:mt-8 text-sm sm:text-[15px] leading-[1.85] text-brown/70 max-w-2xl">{intro}</div>
            </RevealText>
          )}
          <RevealText delay={0.16}>
            <p className="mt-6 text-[10px] tracking-label uppercase text-brown/45">
              Last updated · {SITE.policiesUpdated}
            </p>
          </RevealText>
        </header>

        {/* ── At a glance ── */}
        {highlights && (
          <RevealText delay={0.2}>
            <div className="mb-14 sm:mb-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
              {highlights.map((h) => (
                <div key={h.label} className="bg-ivory p-5 sm:p-6 lg:p-8">
                  <p className="text-[10px] tracking-label uppercase text-brown/50 mb-3">{h.label}</p>
                  <p className="font-display text-2xl sm:text-3xl text-burgundy leading-tight">{h.value}</p>
                </div>
              ))}
            </div>
          </RevealText>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.5fr)_minmax(0,8.5fr)] gap-10 lg:gap-16 xl:gap-24">
          {/* ── TOC: chips on <lg, sticky list on lg+ ── */}
          <aside>
            <nav aria-label="On this page" className="lg:hidden flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={goTo(s.id)}
                  className="rounded-full border border-charcoal/20 px-4 py-2 text-[10px] tracking-label uppercase text-brown/70 hover:border-burgundy hover:text-burgundy transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>

            <nav aria-label="On this page" className="hidden lg:block sticky top-40">
              <p className="text-[10px] tracking-label uppercase text-brown/45 mb-5">On this page</p>
              <ul className="space-y-1 border-l border-charcoal/10">
                {sections.map((s, i) => {
                  const on = active === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={goTo(s.id)}
                        className={`-ml-px flex gap-3 border-l py-2 pl-4 text-[13px] leading-snug transition-colors duration-300 ${
                          on
                            ? 'border-burgundy text-burgundy'
                            : 'border-transparent text-brown/60 hover:text-charcoal'
                        }`}
                      >
                        <span className="font-display text-xs pt-px opacity-70">{String(i + 1).padStart(2, '0')}</span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* ── Sections ── */}
          <div>
            {sections.map((s, i) => (
              <RevealText key={s.id}>
                <section id={s.id} className="scroll-mt-28 lg:scroll-mt-36 border-t border-charcoal/15 py-8 sm:py-10 lg:py-12 first:pt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-[4rem_minmax(0,1fr)] gap-3 sm:gap-6">
                    <span className="font-display text-sm text-burgundy/70 tracking-label">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl leading-tight mb-5 sm:mb-6">{s.title}</h2>
                      <div className="space-y-4 max-w-[68ch]">
                        {s.paragraphs?.map((p, j) => (
                          <p key={j} className="text-sm sm:text-[15px] leading-[1.85] text-brown/75">
                            {p}
                          </p>
                        ))}
                        {s.bullets && (
                          <ul className="space-y-3 pt-1">
                            {s.bullets.map((b, j) => (
                              <li key={j} className="flex gap-3 text-sm sm:text-[15px] leading-[1.85] text-brown/75">
                                <span className="mt-[0.85em] h-px w-4 shrink-0 bg-burgundy/60" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </RevealText>
            ))}

            {/* ── Related policies + contact ── */}
            <div className="border-t border-charcoal/15 pt-10 sm:pt-12">
              <p className="text-[10px] tracking-label uppercase text-brown/45 mb-5">More policies</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
                {related.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group flex items-center justify-between rounded-sm border border-charcoal/15 px-5 py-4 text-sm hover:border-burgundy hover:text-burgundy transition-colors duration-300"
                  >
                    {l.label}
                    <ArrowUpRight size={16} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-sm bg-charcoal text-softwhite p-6 sm:p-8">
                <div>
                  <p className="font-display text-2xl sm:text-3xl mb-1">Still have a question?</p>
                  <p className="text-sm text-softwhite/70">We're always happy to help.</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex self-start sm:self-auto items-center rounded-full bg-softwhite text-charcoal text-xs tracking-label uppercase px-6 py-3.5 hover:bg-ivory transition-colors duration-500"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}