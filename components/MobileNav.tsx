'use client'

import { useEffect, useId, useRef, type RefObject } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

type NavLink = {
  href: string
  label: string
}

type MobileNavProps = {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  navLinks: NavLink[]
}

function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement>, onEscape: () => void) {
  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape()
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, containerRef, onEscape])
}

export function MobileNav({ isOpen, onToggle, onClose, navLinks }: MobileNavProps) {
  const menuId = useId()
  const overlayRef = useRef<HTMLElement>(null)

  useFocusTrap(isOpen, overlayRef, onClose)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className="md:hidden p-2 text-cream hover:text-primary transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen ? (
        <section
          id={menuId}
          ref={overlayRef}
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-[120] md:hidden bg-dark/96 backdrop-blur-md"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2" aria-label="Driftwoods Home" onClick={onClose}>
                <img src="/Neon sign.webp" alt="Driftwoods" className="h-10 w-auto object-contain" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-cream hover:text-primary transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={28} />
              </button>
            </div>

            <nav aria-label="Mobile main navigation" className="flex-1">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-lg border border-cream/20 px-5 py-4 text-xl font-semibold text-cream hover:border-primary hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="https://order.toasttab.com/online/the-pier-driftwoods"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block text-center text-lg order-cta-pulse"
                    onClick={onClose}
                  >
                    Order Online
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      ) : null}
    </>
  )
}
