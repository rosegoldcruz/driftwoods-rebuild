'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: '9832 N. 7th St.\nPhoenix, AZ 85020',
    link: 'https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020',
    linkText: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '(480) 393-3261',
    link: 'tel:+14803933261',
    linkText: 'Call Us',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@driftwoodsaz.com',
    link: 'mailto:info@driftwoodsaz.com',
    linkText: 'Send Email',
  },
]

const hours = [
  { day: 'Monday - Thursday', time: '11:00 AM - 10:00 PM' },
  { day: 'Friday', time: '11:00 AM - 11:00 PM' },
  { day: 'Saturday', time: '8:00 AM - 11:00 PM' },
  { day: 'Sunday', time: '8:00 AM - 10:00 PM' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-dark">
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-gray-300">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-dark-lighter">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl h-fit">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-cream font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400 whitespace-pre-line">{item.content}</p>
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-light transition-colors mt-2 text-sm"
                      >
                        {item.linkText}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="bg-dark p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-cream">Hours of Operation</h3>
                </div>
                <ul className="space-y-2">
                  {hours.map((item) => (
                    <li key={item.day} className="flex justify-between text-gray-400">
                      <span>{item.day}</span>
                      <span className="text-cream">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-8">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300">
                    Thanks for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-cream mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark border border-gray-700 text-cream focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-cream mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark border border-gray-700 text-cream focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-cream mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark border border-gray-700 text-cream focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-cream mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark border border-gray-700 text-cream focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="reservation">Reservations</option>
                        <option value="catering">Catering & Events</option>
                        <option value="feedback">Feedback</option>
                        <option value="employment">Employment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-cream mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark border border-gray-700 text-cream focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-dark">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.5!2d-112.0697!3d33.5722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b6d0e4f3c1a5d%3A0x1234567890abcdef!2s9832%20N%207th%20St%2C%20Phoenix%2C%20AZ%2085020!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Driftwoods Location Map"
        />
      </section>
    </>
  )
}
