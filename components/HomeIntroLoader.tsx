'use client'

import { useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { gsap } from 'gsap'

const LOADER_VIDEO_SRC = '/videos/Load screen 2.mp4'

export function HomeIntroLoader() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(true)

  const handleVideoEnd = useCallback(() => {
    const el = sectionRef.current
    if (!el) return

    // Immediately block interaction
    el.style.pointerEvents = 'none'

    gsap.to(el, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Kill any lingering GSAP tweens on this element
        gsap.killTweensOf(el)

        // Force-hide the element so no ghost frame can appear
        el.style.display = 'none'
        el.style.visibility = 'hidden'

        // Synchronously unmount from React tree — flushSync ensures
        // the DOM removal happens in the same microtask, so there is
        // zero frames where clearProps could flash the element back.
        flushSync(() => setMounted(false))
      },
    })
  }, [])

  if (!mounted) return null

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
