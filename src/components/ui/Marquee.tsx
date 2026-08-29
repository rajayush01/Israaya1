export default function Marquee({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden border-y border-charcoal/10 py-5 bg-cream/60">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="mx-6 text-sm tracking-label uppercase text-brown/70 font-display italic"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
