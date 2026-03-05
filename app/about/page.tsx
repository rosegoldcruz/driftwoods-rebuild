// app/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const TOAST_ORDER_URL = 'https://order.toasttab.com/online/the-pier-driftwoods'

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center desktop-divider-fade">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://toastability-production.s3.amazonaws.com/mde1j4ezs7n337wamdy49u36yj7o" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-dark/75" />
        </div>

        <div className="container relative z-10 py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              About <span className="text-primary neon-word">Driftwoods</span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 leading-relaxed max-w-3xl mx-auto">
              At Driftwoods, we invite you to embark on a culinary journey that combines the warmth of a neighborhood bar with the sophistication of an upscale American gastropub.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-28 desktop-atmosphere lg:-mt-10">
        <div className="decorative-line-art deco-beer hidden lg:block w-[250px] h-[250px] left-[-65px] top-[20%]" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(26,33,47,0.45) 0%, rgba(26,33,47,0.88) 80%), url('https://cdn.ing/assets/i/r/285217/g1mr05q1hdm62w1sb7ljkq1poqqs/spaghetti-and-meatballs-with-garlic-bread-overhead.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto rounded-2xl premium-card bg-dark/55 backdrop-blur-md p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-cream mb-4 desktop-heading-glow">Crafted for Community</h2>
            <p className="text-lg text-cream/90 leading-relaxed">
              Located in the heart of Sunnyslope, Driftwoods is a gathering place where friends and families savor great food, enjoy craft cocktails, and create lasting memories together.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-lighter desktop-atmosphere">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6 desktop-heading-glow">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  Located in the heart of Sunnyslope, Driftwoods is more than just a restaurant – it's a gathering place where friends and families come together to savor delightful cuisine, sip on carefully crafted cocktails, enjoy regional craft beers, and create lasting memories.
                </p>
                <p>
                  What started as a neighborhood bar has evolved into a full-service gastropub, offering everything from weekend brunch to late-night bites. Our menu celebrates classic American comfort food with a creative twist, using locally sourced ingredients whenever possible.
                </p>
                <p>
                  Whether you're catching the game with friends, enjoying a date night, or bringing the whole family for Sunday brunch, Driftwoods is your home away from home.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden premium-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://cdn.ing/assets/i/r/285217/g1mr05q1hdm62w1sb7ljkq1poqqs/spaghetti-and-meatballs-with-garlic-bread-overhead.jpg"
                alt="Delicious food at Driftwoods"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-dark desktop-atmosphere desktop-neon-stage">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark-lighter to-transparent opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="container">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream text-center mb-12 desktop-heading-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Stand For
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: 'Community First',
                description:
                  "We're more than a restaurant — we're a gathering place for our neighbors. From hosting local events to supporting Sunnyslope initiatives, community is at our core.",
                icon: '🏠',
              },
              {
                title: 'Quality Ingredients',
                description:
                  'Every dish is crafted with care using the freshest ingredients. We partner with local suppliers and source responsibly to bring you the best.',
                icon: '🥗',
              },
              {
                title: 'Warm Hospitality',
                description:
                  "From the moment you walk through our doors, you're family. Our team is dedicated to making every visit memorable.",
                icon: '❤️',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card-pro p-8 rounded-2xl premium-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-cream mb-4">{value.title}</h3>
                <p className="text-cream/75">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary desktop-atmosphere">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 desktop-heading-glow">Ready to Visit?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Come experience the Driftwoods difference. We can't wait to welcome you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={TOAST_ORDER_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors min-h-[56px] order-cta-pulse">
                Order Online
              </a>
              <Link href="/menu" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[56px]">
                View Menu
              </Link>
              <Link href="/contact" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[56px]">
                Get Directions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
