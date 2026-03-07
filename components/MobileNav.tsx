// components/MobileNav.tsx
'use client'

import { useEffect, useId, useRef, type RefObject } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useNav } from '@/context/NavContext'

type NavLink = {
  href: string
  label: string
}

type MobileNavProps = {
  navLinks: NavLink[]
}

function useFocusTrap(active: boolean, containerRef: RefObject<HTMLDivElement | null>, onEscape: () => void) {
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

export function MobileNav({ navLinks }: MobileNavProps) {
  const { isNavOpen: isOpen, toggleNav: onToggle, closeNav: onClose, triggerCelebration } = useNav()
  const menuId = useId()
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const handleNavLinkClick = () => {
    triggerCelebration()
    onClose()
  }

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
        className="p-2 text-cream hover:text-primary transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {isOpen
        ? createPortal(
            <div
              id={menuId}
              ref={overlayRef}
              aria-modal="true"
              role="dialog"
              aria-label="Mobile navigation menu"
              className="fixed top-0 left-0 w-screen h-screen z-[120] bg-[#121f37]"
              style={{
                paddingTop: 'max(1.25rem, env(safe-area-inset-top, 0px))',
                paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
              }}
            >
              <div className="h-full w-full flex flex-col">
                <div className="flex items-start justify-end px-4 sm:px-6 lg:px-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-white/90 hover:text-white transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X size={34} strokeWidth={2.1} />
                  </button>
                </div>

                <nav aria-label="Mobile main navigation" className="flex-1 flex items-center justify-end px-6 sm:px-8 lg:px-16">
                  <ul className="space-y-3 text-right">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block font-heading text-[2rem] sm:text-[2.25rem] leading-[1.05] tracking-[0.06em] uppercase font-semibold text-white/95 hover:text-primary-light transition-colors"
                          onClick={handleNavLinkClick}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <a
                        href="https://order.toasttab.com/online/the-pier-driftwoods"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="block font-heading text-[2rem] sm:text-[2.25rem] leading-[1.05] tracking-[0.06em] uppercase font-semibold text-white/95 hover:text-primary-light transition-colors"
                      >
                        Order Online
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
