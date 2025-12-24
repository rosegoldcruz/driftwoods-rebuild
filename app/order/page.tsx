'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const orderOptions = [
  {
    name: 'DoorDash',
    logo: '🚗',
    description: 'Fast delivery to your door',
    link: 'https://www.doordash.com/store/driftwoods-phoenix-123456/',
    color: 'bg-red-500',
  },
  {
    name: 'Uber Eats',
    logo: '🍔',
    description: 'Order for pickup or delivery',
    link: 'https://www.ubereats.com/store/driftwoods-phoenix/',
    color: 'bg-green-500',
  },
  {
    name: 'Grubhub',
    logo: '🍽️',
    description: 'Easy ordering, great service',
    link: 'https://www.grubhub.com/restaurant/driftwoods-phoenix/',
    color: 'bg-orange-500',
  },
  {
    name: 'Call Direct',
    logo: '📞',
    description: 'Order by phone for pickup',
    link: 'tel:+14803933261',
    color: 'bg-primary',
  },
]

export default function OrderPage() {
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
              Order <span className="text-primary">Online</span>
            </h1>
            <p className="text-xl text-gray-300">
              Get Driftwoods delivered to your door or ready for pickup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Options */}
      <section className="py-20 bg-dark-lighter">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-4">
                Choose Your Platform
              </h2>
              <p className="text-gray-400">
                Select your preferred delivery service or call us directly for pickup orders.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {orderOptions.map((option, index) => (
                <motion.a
                  key={option.name}
                  href={option.link}
                  target={option.link.startsWith('http') ? '_blank' : undefined}
                  rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-dark p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`text-4xl p-3 rounded-xl ${option.color}`}>
                      {option.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cream group-hover:text-primary transition-colors">
                        {option.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-sm font-medium">
                      {option.link.startsWith('tel') ? 'Call Now' : 'Order Now'}
                    </span>
                    <ExternalLink size={16} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pickup Info */}
      <section className="py-16 bg-cream">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              Prefer to Pick Up?
            </h2>
            <p className="text-dark/70 mb-6">
              Call us at <a href="tel:+14803933261" className="text-primary font-semibold">(480) 393-3261</a> to 
              place your order and we'll have it ready when you arrive.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-md inline-block">
              <p className="text-dark font-medium mb-2">Pickup Location:</p>
              <address className="not-italic text-dark/70">
                9832 N. 7th St.<br />
                Phoenix, AZ 85020
              </address>
              <a
                href="https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary mt-4 hover:text-primary-dark transition-colors"
              >
                Get Directions
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* View Menu CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Not Sure What to Order?
            </h2>
            <p className="text-white/90 mb-6">
              Check out our full menu for inspiration.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors"
            >
              View Full Menu
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
