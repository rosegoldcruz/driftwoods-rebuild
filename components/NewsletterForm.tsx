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

    // Store submission locally (for later CRM integration)
    try {
      const submissions = JSON.parse(localStorage.getItem('driftwoods_newsletter_submissions') || '[]')
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'website_newsletter'
      })
      localStorage.setItem('driftwoods_newsletter_submissions', JSON.stringify(submissions))
      
      // Simulate small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      setFormState('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '' })
      
      // Reset after 5 seconds
      setTimeout(() => setFormState('idle'), 5000)
    } catch (error) {
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
    <section className="py-20 bg-cream" id="newsletter">
      <div className="container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Stay in the Loop
          </h2>
          <p className="text-dark/70 mb-8">
            Sign up for our newsletter to receive updates on specials, events, and exclusive offers.
          </p>

          {formState === 'success' ? (
            <motion.div
              className="bg-green-100 text-green-800 rounded-lg p-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={24} />
              <span>Thanks for subscribing! Check your email for confirmation.</span>
            </motion.div>
          ) : formState === 'error' ? (
            <motion.div
              className="bg-red-100 text-red-800 rounded-lg p-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle size={24} />
              <span>Something went wrong. Please try again.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-dark placeholder:text-dark/50"
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
                    className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-dark placeholder:text-dark/50"
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
                    className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-dark placeholder:text-dark/50"
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
                    className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-dark placeholder:text-dark/50"
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

              <p className="text-sm text-dark/50 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
