'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
    >
      <nav className="container flex items-center justify-between" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Driftwoods Home">
          <img
            src="/Neon sign.webp"
            alt="Driftwoods"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="text-cream hover:text-primary transition-colors font-medium"
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li role="none">
            <a
              href="https://order.toasttab.com/online/the-pier-driftwoods"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
              role="menuitem"
            >
              Order Online
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-cream hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 right-0 bg-dark/98 backdrop-blur-lg md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
          <ul className="flex flex-col p-6 gap-4" role="menu">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className="block text-cream hover:text-primary transition-colors font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li role="none" className="pt-4">
              <a
                href="https://order.toasttab.com/online/the-pier-driftwoods"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
                role="menuitem"
              >
                Order Online
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
