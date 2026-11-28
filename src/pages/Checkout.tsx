import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import { formatINR, selectItemCount, selectSubtotal, useStore } from '@/lib/store'
import {
  EMPTY_FORM,
  INDIAN_STATES,
  OrderError,
  buildPayload,
  isIndia,
  submitOrder,
  validate,
  whatsappOrderUrl,
  type CheckoutErrors,
  type CheckoutForm,
} from '@/lib/checkout'

const PAYMENT_NOTE =
  'No payment is taken on this page. Once your order is placed, our team confirms the details with you and shares secure payment instructions.'

const inputClass = (error?: string) =>
  `w-full bg-softwhite border px-4 py-3 text-sm outline-none transition-colors placeholder:text-brown/35 focus:border-charcoal ${
    error ? 'border-burgundy' : 'border-charcoal/20'
  }`

function Field({
  label,
  error,
  children,
  className = '',
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] tracking-label uppercase text-brown/60 mb-2">{label}</span>
      {children}
      {error && (
        <span role="alert" className="block text-xs text-burgundy mt-1.5">
          {error}
        </span>
      )}
    </label>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useStore((s) => s.cart)
  const itemCount = useStore(selectItemCount)
  const subtotal = useStore(selectSubtotal)
  const clearCart = useStore((s) => s.clearCart)
  const setLastOrder = useStore((s) => s.setLastOrder)
  const setCartOpen = useStore((s) => s.setCartOpen)

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutForm, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const india = isIndia(form.country)
  const whatsappUrl = useMemo(() => whatsappOrderUrl(form, cart, subtotal), [form, cart, subtotal])

  const set = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    // Re-validate live, but only for fields the shopper has already visited.
    if (touched[key] || errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
  }

  const bind = (key: Exclude<keyof CheckoutForm, 'agree'>) => ({
    name: key,
    value: form[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(key, e.target.value),
    onBlur: () => {
      setTouched((t) => ({ ...t, [key]: true }))
      setErrors((prev) => ({ ...prev, [key]: validate(form)[key] }))
    },
    'aria-invalid': Boolean(errors[key]),
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const found = validate(form)
    setErrors(found)
    const firstBad = Object.keys(found)[0]
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }

    setSubmitting(true)
    setServerError(null)
    try {
      const { orderNumber } = await submitOrder(buildPayload(form, cart, subtotal))
      setLastOrder({
        orderNumber,
        placedAt: new Date().toISOString(),
        email: form.email.trim(),
        name: form.fullName.trim(),
        total: subtotal,
        itemCount,
      })
      clearCart()
      navigate('/checkout/success', { replace: true })
    } catch (error) {
      setServerError(error instanceof OrderError ? error.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="pt-40 md:pt-48 pb-24 px-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl mb-4">Your bag is empty</h1>
        <p className="text-brown/60 mb-10">Add a piece to begin checkout.</p>
        <Link
          to="/shop"
          className="inline-block bg-charcoal text-softwhite px-10 py-4 text-xs tracking-label uppercase hover:bg-burgundy transition-colors duration-500"
        >
          Explore the Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <RevealText as="h1" className="font-display text-[11vw] md:text-[4vw] leading-[0.95] mb-12 text-center md:text-left">
          Checkout
        </RevealText>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-start">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-12">
            <section aria-labelledby="contact-h">
              <h2 id="contact-h" className="text-xs tracking-label uppercase mb-6 pb-3 border-b border-charcoal/10">
                Contact
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email" error={errors.email}>
                  <input {...bind('email')} type="email" inputMode="email" autoComplete="email" className={inputClass(errors.email)} />
                </Field>
                <Field label="Phone / WhatsApp" error={errors.phone}>
                  <input {...bind('phone')} type="tel" inputMode="tel" autoComplete="tel" className={inputClass(errors.phone)} />
                </Field>
              </div>
            </section>

            <section aria-labelledby="ship-h">
              <h2 id="ship-h" className="text-xs tracking-label uppercase mb-6 pb-3 border-b border-charcoal/10">
                Delivery address
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" error={errors.fullName} className="sm:col-span-2">
                  <input {...bind('fullName')} autoComplete="name" className={inputClass(errors.fullName)} />
                </Field>
                <Field label="Address" error={errors.address1} className="sm:col-span-2">
                  <input {...bind('address1')} autoComplete="address-line1" className={inputClass(errors.address1)} />
                </Field>
                <Field label="Apartment, landmark (optional)" className="sm:col-span-2">
                  <input {...bind('address2')} autoComplete="address-line2" className={inputClass()} />
                </Field>
                <Field label="City" error={errors.city}>
                  <input {...bind('city')} autoComplete="address-level2" className={inputClass(errors.city)} />
                </Field>
                <Field label="State" error={errors.state}>
                  {india ? (
                    <select {...bind('state')} autoComplete="address-level1" className={inputClass(errors.state)}>
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <input {...bind('state')} autoComplete="address-level1" className={inputClass(errors.state)} />
                  )}
                </Field>
                <Field label={india ? 'PIN code' : 'Postal code'} error={errors.pin}>
                  <input
                    {...bind('pin')}
                    inputMode={india ? 'numeric' : 'text'}
                    maxLength={india ? 6 : 12}
                    autoComplete="postal-code"
                    className={inputClass(errors.pin)}
                  />
                </Field>
                <Field label="Country" error={errors.country}>
                  <input {...bind('country')} autoComplete="country-name" className={inputClass(errors.country)} />
                </Field>
                <Field label="Customisation or event date (optional)" className="sm:col-span-2">
                  <textarea
                    {...bind('notes')}
                    rows={3}
                    placeholder="Sizing tweaks, design changes, or the date you need it by"
                    className={inputClass()}
                  />
                </Field>
              </div>
            </section>

            <section aria-labelledby="pay-h">
              <h2 id="pay-h" className="text-xs tracking-label uppercase mb-6 pb-3 border-b border-charcoal/10">
                Payment
              </h2>
              <p className="text-sm text-brown/70 leading-relaxed">{PAYMENT_NOTE}</p>
            </section>

            <div>
              <label className="flex items-start gap-3 text-sm text-brown/80 cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={(e) => set('agree', e.target.checked)}
                  className="mt-1 accent-burgundy"
                />
                <span>
                  I understand every piece is made to order (15–20 days) and agree to the{' '}
                  <Link to="/terms" className="underline-reveal" target="_blank">Terms</Link> and{' '}
                  <Link to="/returns" className="underline-reveal" target="_blank">Return &amp; Exchange Policy</Link>.
                </span>
              </label>
              {errors.agree && (
                <p role="alert" className="text-xs text-burgundy mt-2">{errors.agree}</p>
              )}
            </div>

            {serverError && (
              <div role="alert" className="border border-burgundy/40 bg-burgundy/5 p-5 text-sm">
                <p className="text-burgundy mb-3">{serverError}</p>
                <p className="text-brown/70 mb-4">
                  Your bag is safe. You can try again, or send this order to us on WhatsApp and we will take it from there.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-label uppercase underline-reveal"
                >
                  Send order on WhatsApp
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-burgundy text-softwhite py-5 text-xs tracking-label uppercase hover:bg-wine transition-colors duration-500 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
            >
              <Lock size={13} strokeWidth={1.5} />
              {submitting ? 'Placing your order…' : `Place order · ${formatINR(subtotal)}`}
            </button>
          </form>

          <aside className="lg:sticky lg:top-32 bg-softwhite border border-charcoal/10 p-6 md:p-8" aria-label="Order summary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs tracking-label uppercase">Order summary ({itemCount})</h2>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="text-[10px] tracking-label uppercase text-brown/60 underline-reveal"
              >
                Edit bag
              </button>
            </div>

            <ul className="divide-y divide-charcoal/10">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-4 py-4 first:pt-0">
                  <div className="relative shrink-0">
                    <img
                      loading="eager"
                      decoding="async"
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover object-top bg-cream"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-charcoal text-softwhite text-[10px] flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base leading-tight">{item.name}</p>
                    <p className="text-xs text-brown/50 mt-1">
                      {[item.color, `Size ${item.size}`].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <p className="text-sm whitespace-nowrap">{formatINR(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <dl className="border-t border-charcoal/10 mt-2 pt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-brown/70">
                <dt>Delivery</dt>
                <dd>{india ? 'Included' : 'Confirmed after order'}</dd>
              </div>
              <div className="flex justify-between font-display text-xl pt-3 border-t border-charcoal/10">
                <dt>Total</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  )
}
