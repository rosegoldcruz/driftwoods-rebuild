// components/Hero.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LoadingScreen } from './LoadingScreen'
import { StarBorder } from './ui/StarBorder'

const TOAST_ORDER_URL = 'https://order.toasttab.com/online/the-pier-driftwoods'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const preloadTargets = [
      'https://cdn.ing/assets/i/r/143988/ue3nwb6bsmjre17n396ofy1dvivs/wall.webp',
      '/signage.svg',
    ]

    let loadedCount = 0
    const markLoaded = () => {
      loadedCount += 1
      if (!isCancelled && loadedCount >= preloadTargets.length) {
        setIsReady(true)
      }
    }

    preloadTargets.forEach((src) => {
      const img = new Image()
      img.onload = markLoaded
      img.onerror = markLoaded
      img.src = src
    })

    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) setIsReady(true)
    }, 1200)

    return () => {
      isCancelled = true
      clearTimeout(fallbackTimer)
    }
  }, [])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 350], [1, 0])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <>
      <LoadingScreen isReady={isReady} onComplete={() => setShowContent(true)} />

      <section ref={sectionRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden desktop-neon-stage">
        <motion.div className="absolute inset-0 z-0" style={{ y: isMobile ? 0 : y }}>
          <img
            src="https://cdn.ing/assets/i/r/143988/ue3nwb6bsmjre17n396ofy1dvivs/wall.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />

          <div className="absolute inset-0 bg-dark/50" />
          <div className="absolute inset-0 hidden lg:block bg-[radial-gradient(circle_at_50%_35%,rgba(224,122,47,0.18),transparent_60%)]" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 container text-center px-4 py-16"
          style={{ opacity: isMobile ? 1 : opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.img
              src="/signage.svg"
              alt="Driftwoods Bar & Grill"
              className="h-24 sm:h-32 md:h-40 lg:h-48 mx-auto mb-6"
              loading="eager"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />

            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cream font-light mb-8 tracking-wide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Your Neighborhood Bar & Grill Experience
            </motion.h1>

            <motion.div
              className="text-cream/90 text-sm sm:text-base space-y-1 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
              <p>Friday: 11:00 AM - 11:00 PM</p>
              <p>Saturday: 8:00 AM - 11:00 PM</p>
              <p>Sunday: 8:00 AM - 10:00 PM</p>
            </motion.div>

            <motion.a
              href="https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors mb-10 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <MapPin size={18} />
              9832 N. 7th St. Phoenix, AZ. 85020
            </motion.a>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <StarBorder
                as="a"
                href={TOAST_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                color="magenta"
                speed="5s"
                thickness={1}
                className="inline-flex rounded-xl min-h-[56px] min-w-[180px]"
                style={{ touchAction: 'manipulation' }}
                contentClassName="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-lg px-8 py-4 transition-all active:scale-[0.98] shadow-lg shadow-primary/30 lg:hover:shadow-[0_0_24px_rgba(224,122,47,0.45)]"
              >
                Order Online
              </StarBorder>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-cream font-semibold text-lg px-8 py-4 rounded-xl border-2 border-cream/50 hover:border-cream transition-all min-h-[56px] min-w-[180px] active:scale-[0.98]"
                style={{ touchAction: 'manipulation' }}
              >
                View Menu
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/30 hover:text-cream/60 transition-colors hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.3, delay: 0.5 },
            y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-label="Scroll to content"
        >
          <ChevronDown size={28} />
        </motion.button>
      </section>
    </>
  )
}
