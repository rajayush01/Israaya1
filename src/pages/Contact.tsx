import { useState } from 'react'
import RevealText from '@/components/ui/RevealText'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '', _honey: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Honeypot: if the hidden field is filled, silently reject (bot)
    if (form._honey) return
    if (!form.name || !form.email || !form.comment) {
      setError(true)
      return
    }
    setError(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-32 md:pt-40 pb-32 px-6 md:px-10">

      {/* ── Title ── */}
      <RevealText as="h1" className="font-display text-[13vw] md:text-[5vw] leading-[0.95] text-center mb-10">
        Contact
      </RevealText>

      {/* ── Contact details ── */}
      <RevealText delay={0.08}>
        <div className="text-center space-y-1.5 mb-16 text-sm text-brown/75">
          <p>
            <span className="text-brown/40 text-[10px] tracking-label uppercase mr-2">Email</span>
            <a href="mailto:israayaindia@gmail.com" className="underline-reveal text-brown">
              israayaindia@gmail.com
            </a>
          </p>
          <p>
            <span className="text-brown/40 text-[10px] tracking-label uppercase mr-2">WhatsApp</span>
            <a href="https://wa.me/919599280024" target="_blank" rel="noreferrer" className="underline-reveal text-brown">
              +91 95992 80024
            </a>
          </p>
          <p>
            <span className="text-brown/40 text-[10px] tracking-label uppercase mr-2">Instagram</span>
            <a href="https://www.instagram.com/israayaindiaofficial/" target="_blank" rel="noreferrer" className="underline-reveal text-brown">
              @israayaindiaofficial
            </a>
          </p>
          <p>
            <span className="text-brown/40 text-[10px] tracking-label uppercase mr-2">Phone</span>
            <a href="tel:+919599280024" className="underline-reveal text-brown">
              +91 95992 80024
            </a>
          </p>
        </div>
      </RevealText>

      {/* ── Form ── */}
      <RevealText delay={0.14}>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <p className="font-display text-3xl md:text-4xl mb-3">Thank you.</p>
              <p className="text-sm text-brown/60">
                We've received your message and will be in touch within two business days.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="_honey"
                value={form._honey}
                onChange={handle}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />

              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <FormField label="Name" name="name" type="text" value={form.name} onChange={handle} required />
                <FormField label="Email" name="email" type="email" value={form.email} onChange={handle} required />
              </div>

              {/* Row 2 — Phone */}
              <div className="mb-6">
                <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handle} />
              </div>

              {/* Row 3 — Comment */}
              <div className="mb-8">
                <label className="block text-[10px] tracking-label uppercase text-brown/50 mb-2">
                  Comment <span className="text-burgundy">*</span>
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handle}
                  required
                  rows={6}
                  placeholder="Your message"
                  className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm placeholder:text-brown/30 outline-none focus:border-charcoal/50 transition-colors duration-300 resize-y"
                />
              </div>

              {error && (
                <p className="text-xs text-burgundy mb-4">
                  Please fill in all required fields.
                </p>
              )}

              {/* Submit — left aligned, solid black */}
              <button
                type="submit"
                className="bg-charcoal text-softwhite px-10 py-4 text-xs tracking-label uppercase hover:bg-charcoal/80 transition-colors duration-500"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </RevealText>
    </div>
  )
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-label uppercase text-brown/50 mb-2">
        {label}
        {required && <span className="text-burgundy ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm placeholder:text-brown/30 outline-none focus:border-charcoal/50 transition-colors duration-300"
      />
    </div>
  )
}
