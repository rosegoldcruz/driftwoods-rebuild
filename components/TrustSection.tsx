// components/TrustSection.tsx
'use client'

import { Star, Quote, MapPin, Clock, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import SpotlightCard from './ui/SpotlightCard'

const testimonials = [
  {
    text: 'Best fish and chips in Phoenix! The atmosphere is exactly what Sunnyslope needed.',
    author: 'Michael R.',
    rating: 5,
  },
  {
    text: 'Our go-to spot for weekend brunch. The staff remembers our names and the food is consistently amazing.',
    author: 'Sarah K.',
    rating: 5,
  },
  {
    text: 'Finally, a real gastropub in the neighborhood. Great craft beer selection and the burgers are incredible.',
    author: 'David L.',
    rating: 5,
  },
]

const localInfo = [
  {
    icon: MapPin,
    title: 'Easy to Find',
    description: 'Located on 7th St, just south of Dunlap in the heart of Sunnyslope',
  },
  {
    icon: Car,
    title: 'Free Parking',
    description: 'Plenty of free parking available in our lot and on the street',
  },
  {
    icon: Clock,
    title: 'Open Late',
    description: 'Kitchen open until 10pm weekdays, 11pm Fri & Sat',
  },
]

export function TrustSection() {
  return (
    <section className="relative py-20 bg-dark desktop-atmosphere desktop-neon-stage" id="trust">
      <div className="decorative-line-art deco-burger hidden lg:block w-[320px] h-[320px] left-[-85px] top-[18%]" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-center sm:text-left">
            <span className="text-2xl lg:text-3xl font-bold text-cream neon-word">4.7</span>
            <span className="text-gray-400 ml-2">on Google · 280+ reviews</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.2, delay: index * 0.08 }}
            >
              <SpotlightCard
                className="bg-dark-lighter p-6 rounded-2xl premium-card h-full"
                spotlightColor="rgba(224, 122, 47, 0.22)"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <p className="text-cream font-medium">— {testimonial.author}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {localInfo.map((info, index) => (
            <motion.div
              key={info.title}
              className="flex items-start gap-4 p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.2, delay: index * 0.08 }}
            >
              <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0 glow-icon-chip">
                <info.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-cream font-semibold mb-1">{info.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{info.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
