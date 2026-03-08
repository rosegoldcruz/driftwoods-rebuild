'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'

const LOADER_VIDEO_SRC = '/videos/Load screen 2.mp4'

export function HomeIntroLoader() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const handleVideoEnd = () => {
    if (!sectionRef.current) return

    // Slide the fixed loader upward while fading — hero is revealed beneath.
    // No scroll, no fake spacer. The loader moves out of frame cinematically.
    gsap.to(sectionRef.current, {
      y: '-100%',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut',
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
