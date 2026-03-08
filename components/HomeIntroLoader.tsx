'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'

const LOADER_VIDEO_SRC = '/videos/Load screen 2.mp4'

export function HomeIntroLoader() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const handleVideoEnd = () => {
    if (!sectionRef.current) return

    // Simple fade-out overlay - no scroll, homepage in normal flow underneath
    gsap.to(sectionRef.current, {
      opacity: 0,
      duration: 0.8,
      pointerEvents: 'none',
      onComplete: () => setIsVisible(false),
    })
  }

  if (!isVisible) return null

  return (
    <section
      ref={sectionRef}
      id="loader-section"
      className="loader-section"
      aria-label="Driftwoods intro"
    >
      <video
        className="loader-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
      >
        <source src={LOADER_VIDEO_SRC} type="video/mp4" />
      </video>
    </section>
  )
}
