'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="about">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/food-menu-hero.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-dark/85" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-8">
            About <span className="text-primary">Driftwoods</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Nestled in the heart of Sunnyslope, Driftwoods is more than just a bar and grill –
            it's a gathering place for the community. We bring the gastropub experience to your
            neighborhood with a menu that combines classic comfort food with creative culinary twists.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Whether you're joining us for weekend brunch, a casual lunch, happy hour with friends,
            or a family dinner, we're committed to making every visit memorable. Our rotating
            craft beer selection, signature cocktails, and house-made dishes keep locals coming
            back for more.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-8 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2018</div>
              <div className="text-cream/70 text-sm uppercase tracking-wider">Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-cream/70 text-sm uppercase tracking-wider">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">16</div>
              <div className="text-cream/70 text-sm uppercase tracking-wider">Craft Taps</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
