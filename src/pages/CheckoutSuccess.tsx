import { Link, Navigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { formatINR, useStore } from '@/lib/store'
import { SITE } from '@/lib/siteInfo'

export default function CheckoutSuccess() {
  const order = useStore((s) => s.lastOrder)

  if (!order) return <Navigate to="/shop" replace />

  return (
    <div className="pt-36 md:pt-44 pb-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full border border-burgundy text-burgundy flex items-center justify-center mx-auto mb-8">
          <Check size={22} strokeWidth={1.4} />
        </div>
        <p className="text-[10px] tracking-label uppercase text-brown/50 mb-3">Order placed</p>
        <h1 className="font-display text-4xl md:text-5xl mb-6">Thank you, {order.name.split(' ')[0]}</h1>
        <p className="text-brown/70 leading-relaxed mb-10">
          Your order <span className="text-charcoal">{order.orderNumber}</span> ({order.itemCount}{' '}
          {order.itemCount === 1 ? 'piece' : 'pieces'}, {formatINR(order.total)}) is with our team. We will
          write to {order.email} to confirm the details and share payment instructions. Every piece is made to
          order, so delivery takes 15–20 days from confirmation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="bg-charcoal text-softwhite px-10 py-4 text-xs tracking-label uppercase hover:bg-burgundy transition-colors duration-500"
          >
            Continue Shopping
          </Link>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-charcoal/25 px-10 py-4 text-xs tracking-label uppercase hover:border-charcoal transition-colors duration-500"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
