// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import FlingIcons from './FlingIcons'
import { NavProvider } from '@/context/NavContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

function NavbarInner() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <FlingIcons />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg py-2.5' : 'bg-dark/90 backdrop-blur-md py-3.5'
        }`}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2" aria-label="Driftwoods Home">
            <img src="/signage.svg" alt="Driftwoods" className="h-9 md:h-10 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-4">
          <MobileNav navLinks={navLinks} />
        </div>
      </nav>
      </header>
    </>
  )
}

export function Navbar() {
  return (
    <NavProvider>
      <NavbarInner />
    </NavProvider>
  )
}
