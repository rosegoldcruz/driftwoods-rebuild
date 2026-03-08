'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'

const LOADER_VIDEO_SRC = '/videos/Load screen 2.mp4'

export function HomeIntroLoader() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const handleVideoEnd = () => {
    if (!sectionRef.current) return

    // Complete fade-out with full cleanup to prevent mobile ghosting
    gsap.to(sectionRef.current, {
      opacity: 0,
      duration: 0.8,
      pointerEvents: 'none',
      onComplete: () => {
        // Hide visibility and clear GSAP properties to prevent mobile Safari ghosting
        gsap.set(sectionRef.current, { 
          visibility: 'hidden',
          clearProps: 'all'
        })
        setIsVisible(false)
      },
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
