'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  isReady: boolean
  onComplete?: () => void
}

export function LoadingScreen({ isReady, onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(false)
  const didCompleteRef = useRef(false)

  useEffect(() => {
    const complete = () => {
      if (didCompleteRef.current) return
      didCompleteRef.current = true
      setIsVisible(false)
      onComplete?.()
    }

    const showTimer = setTimeout(() => {
      if (!isReady) setIsVisible(true)
    }, 300)

    const maxTimer = setTimeout(() => {
      complete()
    }, 1500)

    if (isReady) {
      complete()
    }

    return () => {
      clearTimeout(showTimer)
      clearTimeout(maxTimer)
    }
  }, [isReady, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#ede6df]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          aria-live="polite"
          aria-label="Loading content"
        >
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dark/20 bg-white/60 px-6 py-8 shadow-lg">
            <img src="/Neon sign.webp" alt="" className="h-14 w-auto object-contain" />
            <div className="h-1.5 w-36 overflow-hidden rounded-full bg-dark/15" aria-hidden="true">
              <motion.div
                className="h-full w-1/2 rounded-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '220%' }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-sm font-medium text-dark/80">Loading Driftwoods...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
