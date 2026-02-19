'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [surroundColor, setSurroundColor] = useState('rgb(42, 51, 68)')
  const videoRef = useRef<HTMLVideoElement>(null)

  const sampleVideoColor = () => {
    const video = videoRef.current
    if (!video || video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })

    if (!context) {
      return
    }

    const sampleSize = 32
    canvas.width = sampleSize
    canvas.height = sampleSize
    context.drawImage(video, 0, 0, sampleSize, sampleSize)

    const imageData = context.getImageData(0, 0, sampleSize, sampleSize).data
    let red = 0
    let green = 0
    let blue = 0
    let count = 0

    for (let index = 0; index < imageData.length; index += 4) {
      red += imageData[index]
      green += imageData[index + 1]
      blue += imageData[index + 2]
      count += 1
    }

    if (count === 0) {
      return
    }

    const averageRed = Math.round(red / count)
    const averageGreen = Math.round(green / count)
    const averageBlue = Math.round(blue / count)

    const brighten = (channel: number) => Math.min(255, Math.round(channel * 0.9 + 20))
    setSurroundColor(`rgb(${brighten(averageRed)}, ${brighten(averageGreen)}, ${brighten(averageBlue)})`)
  }

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('driftwoods_intro_seen')
    if (hasSeenIntro) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    const colorInterval = window.setInterval(() => {
      sampleVideoColor()
    }, 450)

    return () => {
      window.clearInterval(colorInterval)
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
          className="fixed inset-0 z-[9999] flex items-center justify-center h-[100dvh]"
          style={{ backgroundColor: surroundColor }}
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
            onLoadedData={sampleVideoColor}
            onTimeUpdate={sampleVideoColor}
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain"
            poster="https://cdn.ing/assets/i/r/221699/variants/5dhf6lc2vge1c8e4r8qqe0qibxt3/ffa771bd373b30a1a63111797ef5dd88627acefa289ede100f7c545462724c63/neon-desktop-enh.webp"
          >
            <source src="/videos/load-screen.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
