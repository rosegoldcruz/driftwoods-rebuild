// components/NewsletterForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      const submissions = JSON.parse(localStorage.getItem('driftwoods_newsletter_submissions') || '[]')
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'website_newsletter',
      })
      localStorage.setItem('driftwoods_newsletter_submissions', JSON.stringify(submissions))

      await new Promise((resolve) => setTimeout(resolve, 800))

      setFormState('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '' })
      setTimeout(() => setFormState('idle'), 5000)
    } catch {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="relative py-20 bg-dark-lighter desktop-atmosphere" id="newsletter">
      <div className="decorative-line-art deco-beer hidden lg:block w-[260px] h-[260px] right-[-80px] bottom-[8%]" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4 desktop-heading-glow">
            Stay in the <span className="neon-word">Loop</span>
          </h2>
          <p className="text-cream/75 mb-8">
            Sign up for our newsletter to receive updates on specials, events, and exclusive offers.
          </p>

          {formState === 'success' ? (
            <motion.div
              className="premium-card bg-green-500/15 text-green-200 rounded-lg p-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={24} />
              <span>Thanks for subscribing! Check your email for confirmation.</span>
            </motion.div>
          ) : formState === 'error' ? (
            <motion.div
              className="premium-card bg-red-500/15 text-red-200 rounded-lg p-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle size={24} />
              <span>Something went wrong. Please try again.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 premium-card bg-dark/55 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name *"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-dark-lighter text-cream placeholder:text-cream/50"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-dark-lighter text-cream placeholder:text-cream/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-dark-lighter text-cream placeholder:text-cream/50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-dark-lighter text-cream placeholder:text-cream/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Subscribe
                  </>
                )}
              </button>

              <p className="text-sm text-cream/55 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
