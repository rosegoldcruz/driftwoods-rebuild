'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
  skipEnabled?: boolean
}

export function LoadingScreen({ onComplete, skipEnabled = true }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [canSkip, setCanSkip] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('driftwoods_intro_seen')
    if (hasSeenIntro) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    // Allow skip after 1 second
    const skipTimer = setTimeout(() => setCanSkip(true), 1000)

    // Auto-dismiss after video ends or 6 seconds max
    const maxTimer = setTimeout(() => {
      handleDismiss()
    }, 6000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(maxTimer)
    }
  }, [])

  const handleDismiss = () => {
    sessionStorage.setItem('driftwoods_intro_seen', 'true')
    setIsVisible(false)
    onComplete?.()
  }

  const handleVideoEnd = () => {
    handleDismiss()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
            poster="https://cdn.ing/assets/i/r/221699/variants/5dhf6lc2vge1c8e4r8qqe0qibxt3/ffa771bd373b30a1a63111797ef5dd88627acefa289ede100f7c545462724c63/neon-desktop-enh.webp"
          >
            <source src="/videos/load-screen.mp4" type="video/mp4" />
          </video>

          {/* Skip Button */}
          {skipEnabled && canSkip && (
            <motion.button
              onClick={handleDismiss}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/80 hover:text-cream
                         px-6 py-2 rounded-full border border-cream/30 hover:border-cream/60
                         backdrop-blur-sm transition-all duration-200 text-sm tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Skip
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
