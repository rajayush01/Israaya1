import { Link } from 'react-router-dom'

export const SITE = {
  brand: 'Israaya',
  email: 'israayaindia@gmail.com',
  whatsappDisplay: '+91 95992 80024',
  whatsappUrl: 'https://wa.me/919599280024',
  phoneDisplay: '+91 95992 80024',
  phoneHref: 'tel:+919599280024',
  instagramHandle: '@israayaindiaofficial',
  instagramUrl: 'https://www.instagram.com/israayaindiaofficial/',
  policiesUpdated: 'November 2026',
  jurisdiction: '[City]', // TODO: replace with the city whose courts should govern disputes
}

export const EmailLink = () => (
  <a href={`mailto:${SITE.email}`} className="underline-reveal text-brown">
    {SITE.email}
  </a>
)

export const WhatsAppLink = () => (
  <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="underline-reveal text-brown">
    {SITE.whatsappDisplay}
  </a>
)

export const PolicyLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="underline-reveal text-brown">
    {children}
  </Link>
)