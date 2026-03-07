'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

const LOADER_VIDEO_SRC = '/videos/Load screen 2.mp4'

gsap.registerPlugin(ScrollToPlugin)

export function HomeIntroLoader() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  const hasSequencePlayedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let fallbackTimer: number | null = null
    let timeline: gsap.core.Timeline | null = null
    let canPlayCleanup: (() => void) | null = null

    const handleWindowLoad = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      const video = videoRef.current
      const title = titleRef.current
      const subtitle = subtitleRef.current
      const progressFill = progressFillRef.current
      const heroSection = document.getElementById('hero-section')

      if (!title || !subtitle || !progressFill || !heroSection) return

      const startSequence = () => {
        if (hasSequencePlayedRef.current) return
        hasSequencePlayedRef.current = true

        if (fallbackTimer !== null) {
          window.clearTimeout(fallbackTimer)
          fallbackTimer = null
        }

        timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

        timeline
          .fromTo(
            [title, subtitle],
            { opacity: 0, y: 42 },
            { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }
          )
          .fromTo(
            progressFill,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.35, ease: 'power2.inOut' },
            '-=0.45'
          )

        if (video) {
          const playPromise = video.play()
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => undefined)
          }

          const remaining = Number.isFinite(video.duration) && video.duration > 0
            ? Math.min(Math.max(video.duration - video.currentTime, 0.8), 6)
            : 2.8

          timeline.to({}, { duration: remaining, ease: 'none' })
        } else {
          timeline.to({}, { duration: 2.8, ease: 'none' })
        }

        timeline.to(window, {
          duration: 1.6,
          scrollTo: { y: heroSection, autoKill: false },
          ease: 'power3.inOut',
        })
      }

      if (video) {
        const handleCanPlay = () => {
          video.removeEventListener('canplay', handleCanPlay)
          canPlayCleanup = null
          startSequence()
        }

        if (video.readyState >= 2) {
          startSequence()
        } else {
          video.addEventListener('canplay', handleCanPlay)
          canPlayCleanup = () => video.removeEventListener('canplay', handleCanPlay)
          fallbackTimer = window.setTimeout(() => {
            video.removeEventListener('canplay', handleCanPlay)
            canPlayCleanup = null
            if (!hasStartedRef.current || hasSequencePlayedRef.current) return
            startSequence()
          }, 1200)
        }
      } else {
        startSequence()
      }
    }

    if (document.readyState === 'complete') {
      handleWindowLoad()
    } else {
      window.addEventListener('load', handleWindowLoad, { once: true })
    }

    return () => {
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer)
      }
      canPlayCleanup?.()
      timeline?.kill()
      window.removeEventListener('load', handleWindowLoad)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="loader-section"
      className="loader-section relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
      aria-label="Driftwoods intro"
    >
      <video
        ref={videoRef}
        className="loader-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={LOADER_VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,18,0.28)_0%,rgba(2,10,18,0.54)_52%,rgba(2,10,18,0.86)_100%)]" />

      <div className="loader-content relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl font-semibold uppercase tracking-[0.28em] text-white sm:text-6xl md:text-7xl"
        >
          Driftwoods
        </h1>
        <p
          ref={subtitleRef}
          className="mt-5 max-w-xl text-sm font-medium uppercase tracking-[0.24em] text-white/70 sm:text-base"
        >
          Coastal fire. Night glow. Neighborhood ritual.
        </p>
        <div className="mt-10 h-[2px] w-full max-w-md overflow-hidden rounded-full bg-white/20">
          <div ref={progressFillRef} className="h-full w-full origin-left bg-primary" />
        </div>
      </div>
    </section>
  )
}
