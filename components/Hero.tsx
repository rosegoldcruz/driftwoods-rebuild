'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LoadingScreen } from './LoadingScreen'

const TOAST_ORDER_URL = 'https://order.toasttab.com/online/the-pier-driftwoods'
const HERO_VIDEO_SRC = '/videos/load-screen.mp4'
const HERO_PHOTO_SRC = '/Neon sign.webp'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isCancelled = false
    let loadedCount = 0
    const targetCount = 2
    const markLoaded = () => {
      loadedCount += 1
      if (!isCancelled && loadedCount >= targetCount) {
        setIsReady(true)
      }
    }

    const img = new Image()
    img.onload = markLoaded
    img.onerror = markLoaded
    img.src = HERO_PHOTO_SRC

    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.onloadeddata = markLoaded
    video.onerror = markLoaded
    video.src = HERO_VIDEO_SRC
    video.load()

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
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero-video w-full h-full"
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="hero-overlay absolute inset-0" />
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(circle at 18% 20%, rgba(85, 165, 184, 0.24), transparent 32%), radial-gradient(circle at 82% 28%, rgba(255, 255, 255, 0.12), transparent 24%), radial-gradient(circle at 50% 75%, rgba(7, 54, 74, 0.26), transparent 44%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061523] via-[#061523]/70 to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 container px-4 py-16 md:py-24"
          style={{ opacity: isMobile ? 1 : opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="text-center lg:text-left">
              <motion.div
                className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d6edf7] backdrop-blur-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                Sunnyslope, Phoenix
              </motion.div>

              <motion.h1
                className="max-w-3xl text-5xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 18 }}
                transition={{ duration: 0.45, delay: 0.16 }}
              >
                Catch the Night Tide
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-base leading-8 text-[#d7e6ee] sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
                transition={{ duration: 0.45, delay: 0.24 }}
              >
                Rolling surf in the backdrop, cold taps at the rail, and a kitchen built for Sunnyslope nights. Driftwoods brings coastal motion to 7th Street without losing the grit that makes this neighborhood ours.
              </motion.p>

              <motion.a
                href="https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9fd0e2] transition-colors hover:text-white sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <MapPin size={18} />
                9832 N. 7th St., Phoenix, AZ 85020
              </motion.a>

              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15 }}
                transition={{ duration: 0.4, delay: 0.36 }}
              >
                <a
                  href={TOAST_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-cta-pulse inline-flex min-h-[58px] min-w-[190px] items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-[0_16px_40px_rgba(193,95,35,0.35)] active:scale-[0.98]"
                  style={{ touchAction: 'manipulation' }}
                >
                  Order Online
                </a>

                <Link
                  href="/menu"
                  className="inline-flex min-h-[58px] min-w-[190px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/10 active:scale-[0.98]"
                  style={{ touchAction: 'manipulation' }}
                >
                  View Menu
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 grid gap-3 text-left sm:grid-cols-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 18 }}
                transition={{ duration: 0.45, delay: 0.42 }}
              >
                <div className="rounded-2xl border border-white/10 bg-[#082033]/65 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8dc1d4]">On Tap</p>
                  <p className="mt-2 text-xl font-semibold text-white">16 rotating pours</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#082033]/65 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8dc1d4]">Kitchen</p>
                  <p className="mt-2 text-xl font-semibold text-white">Brunch to late-night</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#082033]/65 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8dc1d4]">Atmosphere</p>
                  <p className="mt-2 text-xl font-semibold text-white">Game-day local energy</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative mx-auto w-full max-w-[420px]"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 24 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(125,191,210,0.22),transparent_42%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.08),transparent_30%)] blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#081a2b]/80 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-[1.55rem]">
                  <img
                    src={HERO_PHOTO_SRC}
                    alt="Driftwoods neon signage inside the restaurant"
                    className="h-[420px] w-full object-cover sm:h-[480px]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111d]/88 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8dc1d4]">Inside Driftwoods</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Neon glow, wood grain, and a bar built for long nights.</p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8dc1d4]">Neighborhood</p>
                    <p className="mt-2 text-base font-medium text-white">Sunnyslope regulars, weekend brunch, and every big game.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8dc1d4]">Mood</p>
                    <p className="mt-2 text-base font-medium text-white">Coastal influence without the tiki theme.</p>
                  </div>
                </div>
              </div>
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
