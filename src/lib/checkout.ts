import { API_BASE } from '@/lib/catalog'
import { SITE } from '@/lib/siteInfo'
import { formatINR, type CartItem } from '@/lib/store'

export type CheckoutForm = {
  email: string
  phone: string
  fullName: string
  address1: string
  address2: string
  city: string
  state: string
  pin: string
  country: string
  notes: string
  agree: boolean
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

export const EMPTY_FORM: CheckoutForm = {
  email: '',
  phone: '',
  fullName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pin: '',
  country: 'India',
  notes: '',
  agree: false,
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

export const isIndia = (country: string) => country.trim().toLowerCase() === 'india'

export function validate(form: CheckoutForm): CheckoutErrors {
  const e: CheckoutErrors = {}
  const india = isIndia(form.country)
  const digits = form.phone.replace(/\D/g, '')

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address.'
  if (form.fullName.trim().length < 2) e.fullName = 'Enter your full name.'
  if (india ? !/^(91)?[6-9]\d{9}$/.test(digits) : digits.length < 7 || digits.length > 15)
    e.phone = india ? 'Enter a valid 10-digit mobile number.' : 'Enter a valid phone number with country code.'
  if (form.address1.trim().length < 5) e.address1 = 'Enter your street address.'
  if (!form.city.trim()) e.city = 'Enter your city.'
  if (!form.state.trim()) e.state = india ? 'Select your state.' : 'Enter your state or region.'
  if (india ? !/^[1-9]\d{5}$/.test(form.pin.trim()) : form.pin.trim().length < 3)
    e.pin = india ? 'Enter a valid 6-digit PIN code.' : 'Enter your postal code.'
  if (!form.country.trim()) e.country = 'Enter your country.'
  if (!form.agree) e.agree = 'Please confirm to place your order.'
  return e
}

/**
 * Order contract expected from the backend (adjust to your API):
 *   POST {API_BASE}/storefront/orders
 *   -> 201 { data: { orderNumber: string } }
 * The server must re-price every line from its own catalog; `unitPrice` is informational only.
 */
export type OrderPayload = {
  customer: { name: string; email: string; phone: string }
  shippingAddress: {
    line1: string
    line2: string
    city: string
    state: string
    pin: string
    country: string
  }
  items: { productSlug: string; variantId?: string; name: string; size: string; quantity: number; unitPrice: number }[]
  subtotal: number
  notes: string
}

export function buildPayload(form: CheckoutForm, items: CartItem[], subtotal: number): OrderPayload {
  return {
    customer: { name: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim() },
    shippingAddress: {
      line1: form.address1.trim(),
      line2: form.address2.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pin: form.pin.trim(),
      country: form.country.trim(),
    },
    items: items.map((i) => ({
      productSlug: i.productId,
      variantId: i.variantId,
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      unitPrice: i.price,
    })),
    subtotal,
    notes: form.notes.trim(),
  }
}

export class OrderError extends Error {}

export async function submitOrder(payload: OrderPayload): Promise<{ orderNumber: string }> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`${API_BASE}/storefront/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new OrderError(body?.message || `The order service returned ${response.status}.`)
    }
    const data = body?.data ?? body
    const orderNumber = String(data?.orderNumber || data?.orderId || data?._id || '')
    if (!orderNumber) throw new OrderError('The order was sent but no order number came back.')
    return { orderNumber }
  } catch (error) {
    if (error instanceof OrderError) throw error
    throw new OrderError('We could not reach the order service. Please check your connection and try again.')
  } finally {
    window.clearTimeout(timeout)
  }
}

/** Fallback so a shopper is never stuck: the same order, pre-written for the brand's WhatsApp. */
export function whatsappOrderUrl(form: CheckoutForm, items: CartItem[], subtotal: number): string {
  const lines = items.map(
    (i) => `• ${i.name}${i.color ? ` (${i.color})` : ''} — Size ${i.size} × ${i.quantity} — ${formatINR(i.price * i.quantity)}`,
  )
  const text = [
    `Hello ${SITE.brand}, I'd like to place an order:`,
    '',
    ...lines,
    '',
    `Subtotal: ${formatINR(subtotal)}`,
    '',
    `Name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Address: ${[form.address1, form.address2, form.city, form.state, form.pin, form.country].filter(Boolean).join(', ')}`,
    form.notes ? `Notes: ${form.notes}` : '',
  ]
    .filter((l, i, arr) => l !== '' || arr[i - 1] !== '')
    .join('\n')
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`
}
