'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with light inertia - elegant, not aggressive
    lenisRef.current = new Lenis({
      duration: 1.0, // Subtle smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Light inertia
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Disable on mobile for native scroll feel
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        lenisRef.current?.destroy()
      }
    }
    
    handleMediaChange(mediaQuery)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      lenisRef.current?.destroy()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return <>{children}</>
}
