'use client'

import { Phone, Navigation, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDiff = currentScrollY - lastScrollY.current
          
          // Only trigger if scrolled past threshold (300px)
          if (currentScrollY > 300) {
            setIsVisible(true)
            
            // Detect scroll direction with threshold to prevent jitter
            if (scrollDiff > 10) {
              setScrollDirection('down')
            } else if (scrollDiff < -10) {
              setScrollDirection('up')
            }
          } else {
            setIsVisible(false)
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show CTA when visible AND scrolling up (or at rest)
  const showBar = isVisible && scrollDirection === 'up'

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Gradient fade for smooth blend */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-dark/95 to-transparent pointer-events-none" />
          
          <div className="bg-dark/98 backdrop-blur-xl border-t border-gray-800/50">
            <div className="flex">
              {/* Call Button - Primary action (LEFT) */}
              <a
                href="tel:+14803933261"
                className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold transition-colors active:scale-[0.98]"
                style={{ 
                  touchAction: 'manipulation',
                  minHeight: '56px',
                  paddingTop: '14px',
                  paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))'
                }}
              >
                <Phone size={22} strokeWidth={2.5} />
                <span className="text-base">Call Now</span>
              </a>
              
              {/* Divider */}
              <div className="w-px bg-gray-800" />
              
              {/* Directions Button - Secondary action (RIGHT) */}
              <a
                href="https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 bg-dark-lighter hover:bg-dark text-cream font-semibold transition-colors active:scale-[0.98]"
                style={{ 
                  touchAction: 'manipulation',
                  minHeight: '56px',
                  paddingTop: '14px',
                  paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))'
                }}
              >
                <Navigation size={20} strokeWidth={2.5} />
                <span className="text-base">Directions</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
