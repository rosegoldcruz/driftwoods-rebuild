'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
    children: React.ReactNode
    href?: string
    onClick?: () => void
    className?: string
    strength?: number
}

export function MagneticButton({
    children,
    href,
    onClick,
    className = '',
    strength = 0.4
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLElement>(null)
    const [isReducedMotion, setIsReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        const button = buttonRef.current
        if (!button || isReducedMotion) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        button.addEventListener('mousemove', handleMouseMove)
        button.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            button.removeEventListener('mousemove', handleMouseMove)
            button.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength, isReducedMotion])

    const baseClasses = `
    inline-flex items-center justify-center gap-2 
    bg-gradient-to-r from-primary to-orange-600
    text-white font-bold text-lg 
    px-10 py-5 rounded-2xl
    shadow-2xl shadow-primary/40
    hover:shadow-primary/60 hover:scale-105
    transition-shadow
    cursor-pointer
    relative overflow-hidden
    ${className}
  `

    const shimmerStyle = `
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
    before:translate-x-[-200%] hover:before:translate-x-[200%]
    before:transition-transform before:duration-700
  `

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={`${baseClasses} ${shimmerStyle}`}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={`${baseClasses} ${shimmerStyle}`}
        >
            {children}
        </button>
    )
}
