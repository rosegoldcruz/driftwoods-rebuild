// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { CoolMode } from './ui/cool-mode'
import { StarBorder } from './ui/StarBorder'
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
        isScrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-dark/95 backdrop-blur-md py-5'
      }`}
    >
      <nav className="container flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" aria-label="Driftwoods Home">
          <img src="/signage.svg" alt="Driftwoods" className="h-10 md:h-14 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <CoolMode options={{ particle: 'circle', particleCount: 20 }}>
                  <Link href={link.href} className="text-cream hover:text-primary transition-colors font-medium">
                    {link.label}
                  </Link>
                </CoolMode>
              </li>
            ))}
            <li>
              <StarBorder
                as="a"
                href="https://order.toasttab.com/online/the-pier-driftwoods"
                target="_blank"
                rel="noopener noreferrer"
                color="magenta"
                speed="5s"
                thickness={1}
                className="inline-flex rounded-lg"
                contentClassName="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white px-8 py-4 font-semibold text-sm transition-all"
              >
                Order Online
              </StarBorder>
            </li>
          </ul>

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
