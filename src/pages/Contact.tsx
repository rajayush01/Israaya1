import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import RevealText from '@/components/ui/RevealText'
import { SITE } from '@/lib/siteInfo'

const TOPICS = [
  'Order enquiry',
  'Custom sizing',
  'Customization',
  'Expedited delivery',
  'Size exchange',
  'Something else',
]

const CHANNELS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, external: false },
  { label: 'WhatsApp', value: SITE.whatsappDisplay, href: SITE.whatsappUrl, external: true },
  { label: 'Instagram', value: SITE.instagramHandle, href: SITE.instagramUrl, external: true },
  { label: 'Phone', value: SITE.phoneDisplay, href: SITE.phoneHref, external: false },
]

const inputCls =
  'w-full bg-transparent border-0 border-b border-charcoal/25 px-0 py-3 text-sm sm:text-[15px] text-charcoal placeholder:text-brown/35 outline-none focus:border-burgundy transition-colors duration-300 rounded-none'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '', _honey: '' })
  const [topic, setTopic] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Honeypot: if the hidden field is filled, silently reject (bot)
    if (form._honey) return
    if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    // TODO: send { ...form, topic } to your backend / form service here
    setSubmitted(true)
  }

  return (
    <main className="bg-ivory text-charcoal">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 sm:gap-16 lg:gap-16 xl:gap-28">
          {/* ── Left: intro + channels ── */}
          <div>
            <RevealText>
              <p className="text-[10px] sm:text-xs tracking-label uppercase text-burgundy mb-5">Customer Care</p>
            </RevealText>
            <RevealText as="h1" delay={0.05} className="font-display text-[16vw] sm:text-7xl xl:text-8xl leading-[0.95]">
              Contact
            </RevealText>

            <RevealText delay={0.12}>
              <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-[15px] leading-[1.85] text-brown/70">
                Every Israaya piece is made to order, so we're always happy to help with sizing, customization or an
                upcoming event. For custom sizing, design changes or faster delivery, please reach out before placing
                your order.
              </p>
            </RevealText>

            <RevealText delay={0.18}>
              <ul className="mt-10 sm:mt-14 border-t border-charcoal/15">
                {CHANNELS.map((c) => (
                  <li key={c.label} className="border-b border-charcoal/15">
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group flex items-center justify-between gap-4 py-4 sm:py-5"
                    >
                      <span className="min-w-0">
                        <span className="block text-[10px] tracking-label uppercase text-brown/50 mb-1.5">
                          {c.label}
                        </span>
                        <span className="block font-display text-lg sm:text-xl xl:text-2xl truncate group-hover:text-burgundy transition-colors duration-300">
                          {c.value}
                        </span>
                      </span>
                      <span className="shrink-0 w-9 h-9 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-burgundy group-hover:border-burgundy group-hover:text-softwhite transition-colors duration-300">
                        <ArrowUpRight size={15} strokeWidth={1.4} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </RevealText>
          </div>

          {/* ── Right: form ── */}
          <RevealText delay={0.14}>
            <div className="rounded-sm border border-charcoal/10 bg-softwhite/60 p-6 sm:p-10 xl:p-12">
              {submitted ? (
                <div className="py-14 sm:py-20 text-center">
                  <p className="font-display text-4xl sm:text-5xl mb-4">Thank you.</p>
                  <p className="text-sm text-brown/65 max-w-sm mx-auto leading-relaxed">
                    We've received your message and will be in touch within two business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 className="font-display text-3xl sm:text-4xl mb-2">Send us a message</h2>
                  <p className="text-sm text-brown/60 mb-8 sm:mb-10">
                    Choose a topic if it helps, then tell us how we can help.
                  </p>

                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={handle}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Topic chips */}
                  <fieldset className="mb-8 sm:mb-10">
                    <legend className="text-[10px] tracking-label uppercase text-brown/50 mb-3">Topic (optional)</legend>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => {
                        const on = topic === t
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setTopic(on ? null : t)}
                            className={`rounded-full border px-4 py-2 text-[11px] sm:text-xs transition-colors duration-300 ${
                              on
                                ? 'bg-burgundy border-burgundy text-softwhite'
                                : 'border-charcoal/20 text-brown/75 hover:border-burgundy hover:text-burgundy'
                            }`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mb-7">
                    <Field label="Name" name="name" type="text" value={form.name} onChange={handle} required autoComplete="name" />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handle} required autoComplete="email" />
                  </div>

                  <div className="mb-7">
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handle} autoComplete="tel" />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="comment" className="block text-[10px] tracking-label uppercase text-brown/50">
                      Comment <span className="text-burgundy">*</span>
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={form.comment}
                      onChange={handle}
                      required
                      rows={5}
                      placeholder="Your message"
                      className={`${inputCls} resize-y min-h-[8rem]`}
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs text-burgundy mb-5">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-full bg-charcoal text-softwhite px-10 py-4 text-xs tracking-label uppercase hover:bg-burgundy transition-colors duration-500"
                    >
                      Submit
                    </button>
                    <a
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brown/60 underline-reveal sm:ml-1"
                    >
                      Prefer WhatsApp? Message us directly
                    </a>
                  </div>
                </form>
              )}
            </div>
          </RevealText>
        </div>
      </div>
    </main>
  )
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] tracking-label uppercase text-brown/50">
        {label}
        {required && <span className="text-burgundy ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={label}
        className={inputCls}
      />
    </div>
  )
}