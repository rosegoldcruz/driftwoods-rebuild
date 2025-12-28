'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Sparkles, ChevronDown } from 'lucide-react'
import { MagneticButton } from './MagneticButton'
import dynamic from 'next/dynamic'

// Dynamic import for 3D carousel to avoid SSR issues
const MenuCarousel3D = dynamic(
    () => import('./MenuCarousel3D').then(mod => ({ default: mod.MenuCarousel3D })),
    { ssr: false, loading: () => <div className="h-[500px] flex items-center justify-center"><Sparkles className="w-8 h-8 text-primary animate-pulse" /></div> }
)

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface Hotspot {
    id: string
    x: number
    y: number
    title: string
    description: string
    offer?: string
}

const hotspots: Hotspot[] = [
    { id: '1', x: 25, y: 30, title: 'Craft Cocktails', description: 'Handcrafted signature drinks with premium spirits', offer: '2-for-1 Happy Hour!' },
    { id: '2', x: 70, y: 45, title: 'Fresh Seafood', description: 'Daily catches from the coast, prepared to perfection' },
    { id: '3', x: 45, y: 70, title: 'Game Day Specials', description: 'Watch the big game with amazing food deals', offer: '$5 Beers during games!' },
]

interface PromoExperienceProps {
    onComplete?: () => void
}

export function PromoExperience({ onComplete }: PromoExperienceProps) {
    const [isVisible, setIsVisible] = useState(true)
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
    const [isReducedMotion, setIsReducedMotion] = useState(false)
    const [hasSeenPromo, setHasSeenPromo] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Check if promo was already seen this session
    useEffect(() => {
        const seen = sessionStorage.getItem('driftwoods_promo_seen')
        if (seen) {
            setIsVisible(false)
            setHasSeenPromo(true)
            onComplete?.()
        }
    }, [onComplete])

    // Check reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(mediaQuery.matches)
        const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    // GSAP scroll-triggered exit animation
    useEffect(() => {
        if (!containerRef.current || !isVisible || isReducedMotion) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'bottom 20%',
                onEnter: () => handleDismiss(),
            })
        }, containerRef)

        return () => ctx.revert()
    }, [isVisible, isReducedMotion])

    // GSAP entrance animations for content
    useEffect(() => {
        if (!contentRef.current || !isVisible || isReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.fromTo('.promo-title',
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
            )
            gsap.fromTo('.promo-subtitle',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
            )
            gsap.fromTo('.promo-carousel',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.8 }
            )
            gsap.fromTo('.promo-cta',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.2 }
            )
            gsap.fromTo('.hotspot',
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.15, delay: 1.5 }
            )
        }, contentRef)

        return () => ctx.revert()
    }, [isVisible, isReducedMotion])

    const handleDismiss = () => {
        sessionStorage.setItem('driftwoods_promo_seen', 'true')
        setIsVisible(false)
        onComplete?.()
    }

    const handleHotspotClick = (id: string) => {
        if (activeHotspot === id) {
            setActiveHotspot(null)
        } else {
            setActiveHotspot(id)
            // GSAP pop animation
            gsap.fromTo(`.hotspot-content-${id}`,
                { opacity: 0, scale: 0.8, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            )
        }
    }

    if (hasSeenPromo && !isVisible) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={containerRef}
                    className="fixed inset-0 z-[100] bg-dark overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: isReducedMotion ? 0.2 : 0.6 }}
                >
                    {/* Background Image with Parallax */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: isReducedMotion ? 0 : 1.5, ease: 'easeOut' }}
                    >
                        <img
                            src="/mggh1s9wu0fld4digs02cx6sc2nj.png"
                            alt=""
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
                    </motion.div>

                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 
                       text-cream transition-all hover:scale-110"
                        aria-label="Close promo"
                    >
                        <X size={24} />
                    </button>

                    {/* Main Content */}
                    <div
                        ref={contentRef}
                        className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-16 overflow-y-auto"
                    >
                        {/* Title */}
                        <h1 className="promo-title text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">
                            <span className="text-cream">Welcome to</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                                Driftwoods
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="promo-subtitle text-lg md:text-xl text-cream/80 text-center max-w-2xl mb-8">
                            Your neighborhood bar & grill experience. Discover our signature dishes,
                            craft cocktails, and the perfect game-day atmosphere.
                        </p>

                        {/* 3D Carousel */}
                        <div className="promo-carousel w-full max-w-5xl mb-8">
                            <MenuCarousel3D />
                        </div>

                        {/* Interactive Hotspots Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            {hotspots.map((hotspot) => (
                                <div
                                    key={hotspot.id}
                                    className="hotspot absolute pointer-events-auto"
                                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                >
                                    <button
                                        onClick={() => handleHotspotClick(hotspot.id)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center
                               transition-all duration-300 ${activeHotspot === hotspot.id
                                                ? 'bg-primary scale-125'
                                                : 'bg-white/20 hover:bg-primary/80 hover:scale-110'
                                            }`}
                                        aria-label={hotspot.title}
                                    >
                                        <Sparkles size={18} className="text-white" />
                                    </button>

                                    {/* Hotspot Content Popup */}
                                    <AnimatePresence>
                                        {activeHotspot === hotspot.id && (
                                            <motion.div
                                                className={`hotspot-content-${hotspot.id} absolute left-12 top-0 w-64 
                                   bg-dark-lighter/95 backdrop-blur-md rounded-xl p-4 
                                   border border-primary/30 shadow-2xl`}
                                                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >
                                                <h3 className="text-primary font-bold text-lg mb-1">{hotspot.title}</h3>
                                                <p className="text-cream/80 text-sm mb-2">{hotspot.description}</p>
                                                {hotspot.offer && (
                                                    <div className="bg-primary/20 text-primary font-semibold text-sm px-3 py-1 rounded-full inline-block">
                                                        {hotspot.offer}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="promo-cta flex flex-col sm:flex-row gap-4 items-center">
                            <MagneticButton href="/menu">
                                View Our Menu
                            </MagneticButton>
                            <MagneticButton
                                href="https://order.toasttab.com/online/the-pier-driftwoods"
                                className="bg-gradient-to-r from-dark-lighter to-dark border-2 border-primary"
                            >
                                Order Online
                            </MagneticButton>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span className="text-sm">Scroll to explore</span>
                            <ChevronDown size={24} />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
