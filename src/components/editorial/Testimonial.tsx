
import RevealText from '@/components/ui/RevealText'
import SectionLabel from '@/components/ui/SectionLabel'

const testimonials = [
  {
    quote:
      'The moment I opened the package, I knew this was something special. The detailing, the fabric, the way it falls — everything feels incredibly thoughtful.',
    name: 'Ananya S.',
    occasion: 'A special celebration',
  },
  {
    quote:
      'There is something so timeless about these pieces. I wore mine for a family celebration and received compliments all evening.',
    name: 'Meera R.',
    occasion: 'Festive wear',
  },
  {
    quote:
      'You can genuinely see the craftsmanship. It feels like wearing something made with care rather than something mass-produced.',
    name: 'Riya M.',
    occasion: 'A love for handcrafted fashion',
  },
  {
    quote:
      'The detailing is beautiful and the entire experience felt so personal. It is the kind of piece I know I will keep for years.',
    name: 'Kavya D.',
    occasion: 'A timeless addition',
  },
  {
    quote:
      'Elegant, delicate and so beautifully made. The piece looks even more beautiful in person than it did online.',
    name: 'Naina P.',
    occasion: 'Everyday elegance',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-36 bg-cream overflow-hidden">
      <style>{`
        @keyframes testimonial-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .testimonial-track {
          display: flex;
          width: max-content;
          animation: testimonial-scroll 55s linear infinite;
          will-change: transform;
        }

        .testimonial-carousel:hover .testimonial-track {
          animation-play-state: paused;
        }

        .testimonial-card {
          position: relative;
          width: 340px;
          min-height: 410px;
          flex-shrink: 0;
          transition: transform 700ms cubic-bezier(.2,.7,.2,1);
        }

        @media (min-width: 768px) {
          .testimonial-card {
            width: 440px;
            min-height: 480px;
          }
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
        }

        /* Thread-inspired dashed frame */
        .testimonial-stitch {
          border: 1px dashed rgba(112, 82, 60, 0.35);
          transition: border-color 500ms ease;
        }

        .testimonial-card:hover .testimonial-stitch {
          border-color: rgba(112, 82, 60, 0.8);
        }

        /* Thread corner ornaments */
        .testimonial-ornament {
          position: absolute;
          z-index: 2;
          font-size: 13px;
          color: rgba(112, 82, 60, 0.45);
          transition: transform 500ms ease, color 500ms ease;
        }

        .testimonial-card:hover .testimonial-ornament {
          color: rgba(112, 82, 60, 0.85);
        }

        .testimonial-card:hover .ornament-tl {
          transform: rotate(45deg);
        }

        .testimonial-card:hover .ornament-tr {
          transform: rotate(-45deg);
        }

        .testimonial-card:hover .ornament-bl {
          transform: rotate(-45deg);
        }

        .testimonial-card:hover .ornament-br {
          transform: rotate(45deg);
        }

        /* Edge fade */
        .testimonial-carousel {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );

          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
          }

          .testimonial-card {
            transition: none;
          }
        }
      `}</style>

      {/* Heading */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <RevealText>
          <SectionLabel>Words from Our Women</SectionLabel>
        </RevealText>

        <RevealText
          delay={0.1}
          as="h2"
          className="font-display text-[10vw] md:text-[4.2vw] leading-[0.98] mt-4 max-w-4xl"
        >
          Worn with love.
          <br />
          Remembered forever.
        </RevealText>

        <RevealText delay={0.2}>
          <p className="text-brown/60 text-sm md:text-base mt-6 max-w-md leading-relaxed">
            Every piece finds its own story, in the moments it is worn
            and the memories it becomes a part of.
          </p>
        </RevealText>
      </div>

      {/* Carousel */}
      <div className="testimonial-carousel relative mt-16 md:mt-24">
        <div className="testimonial-track gap-6 md:gap-8 px-6 md:px-10">

          {/* Original cards */}
          {testimonials.map((t, i) => (
            <article
              key={`original-${i}`}
              className="testimonial-card group flex flex-col justify-between bg-cream p-8 md:p-12"
            >
              {/* Outer frame */}
              <div className="absolute inset-0 border border-brown/20 pointer-events-none" />

              {/* Stitched frame */}
              <div className="testimonial-stitch absolute inset-[14px] md:inset-[18px] pointer-events-none" />

              {/* Corner ornaments */}
              <span className="testimonial-ornament ornament-tl top-3 left-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-tr top-3 right-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-bl bottom-3 left-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-br bottom-3 right-3">
                ✳
              </span>

              {/* Quote */}
              <div className="relative z-10">
                <span
                  aria-hidden="true"
                  className="block font-display text-7xl md:text-8xl text-brown/20 leading-[0.7] transition-colors duration-500 group-hover:text-brown/40"
                >
                  “
                </span>

                <blockquote className="font-display text-xl md:text-3xl leading-relaxed text-brown/90 mt-5">
                  {t.quote}
                </blockquote>
              </div>

              {/* Customer */}
              <div className="relative z-10 mt-12 pt-6 border-t border-brown/15 flex items-end justify-between">
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-brown">
                    {t.name}
                  </p>

                  <p className="text-xs text-brown/50 mt-2">
                    {t.occasion}
                  </p>
                </div>

                <span className="font-display text-2xl text-brown/30 transition-transform duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </article>
          ))}

          {/* Duplicate cards for seamless loop */}
          {testimonials.map((t, i) => (
            <article
              key={`duplicate-${i}`}
              aria-hidden="true"
              className="testimonial-card group flex flex-col justify-between bg-cream p-8 md:p-12"
            >
              {/* Outer frame */}
              <div className="absolute inset-0 border border-brown/20 pointer-events-none" />

              {/* Stitched frame */}
              <div className="testimonial-stitch absolute inset-[14px] md:inset-[18px] pointer-events-none" />

              {/* Corner ornaments */}
              <span className="testimonial-ornament ornament-tl top-3 left-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-tr top-3 right-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-bl bottom-3 left-3">
                ✳
              </span>

              <span className="testimonial-ornament ornament-br bottom-3 right-3">
                ✳
              </span>

              {/* Quote */}
              <div className="relative z-10">
                <span
                  aria-hidden="true"
                  className="block font-display text-7xl md:text-8xl text-brown/20 leading-[0.7] transition-colors duration-500 group-hover:text-brown/40"
                >
                  “
                </span>

                <blockquote className="font-display text-xl md:text-3xl leading-relaxed text-brown/90 mt-5">
                  {t.quote}
                </blockquote>
              </div>

              {/* Customer */}
              <div className="relative z-10 mt-12 pt-6 border-t border-brown/15 flex items-end justify-between">
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-brown">
                    {t.name}
                  </p>

                  <p className="text-xs text-brown/50 mt-2">
                    {t.occasion}
                  </p>
                </div>

                <span className="font-display text-2xl text-brown/30">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-brown/40">
          Made with care. Worn with love.
        </p>
      </div>
    </section>
  )
}
