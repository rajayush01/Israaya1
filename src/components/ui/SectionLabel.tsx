export default function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <span
      className={`text-xs tracking-label uppercase ${
        light ? 'text-softwhite/70' : 'text-brown/60'
      }`}
    >
      {children}
    </span>
  )
}
