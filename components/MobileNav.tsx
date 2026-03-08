// components/MobileNav.tsx
'use client'

import { useEffect, useId, useRef, type RefObject } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useNav } from '@/context/NavContext'
import { CoolMode } from './ui/cool-mode'

type NavLink = { href: string; label: string }
type MobileNavProps = { navLinks: NavLink[] }

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

/* ── focus trap ── */
function useFocusTrap(active: boolean, containerRef: RefObject<HTMLDivElement | null>, onEscape: () => void) {
  useEffect(() => {
    if (!active || !containerRef.current) return
    const container = containerRef.current
    const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(sel))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onEscape(); return }
      if (e.key !== 'Tab' || focusable.length === 0) return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, containerRef, onEscape])
}

/* ── framer variants ── */
const backdropV = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
}

const panelV = {
  hidden: { x: '100%' },
  show:   { x: '0%', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:   { x: '100%', transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } },
}

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const linkV = {
  hidden: { opacity: 0, x: 50, filter: 'blur(8px)' },
  show:   { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, x: 30, filter: 'blur(4px)', transition: { duration: 0.25 } },
}

const closeBtnV = {
  hidden: { opacity: 0, rotate: -90, scale: 0.5 },
  show:   { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, rotate: 90, scale: 0.5, transition: { duration: 0.2 } },
}

const footerV = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
}

/* ── component ── */
export function MobileNav({ navLinks }: MobileNavProps) {
  const { isNavOpen: isOpen, openNav, closeNav: onClose, triggerFling, triggerCelebration } = useNav()
  const menuId = useId()
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const handleHamburgerOpen = () => {
    if (isOpen) { onClose(); return }
    openNav()
    triggerFling() // ← icon fling ONLY fires here
  }

  const handleNavLinkClick = () => {
    triggerCelebration() // confetti only, NO fling
    onClose()
  }

  useFocusTrap(isOpen, overlayRef, onClose)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className="p-2 text-cream hover:text-primary transition-colors"
        onClick={handleHamburgerOpen}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen
          ? createPortal(
              <div
                id={menuId}
                ref={overlayRef}
                aria-modal="true"
                role="dialog"
                aria-label="Navigation menu"
                className="fixed inset-0 z-[120]"
              >
                {/* ── dark backdrop (left side visible through) ── */}
                <motion.div
                  className="absolute inset-0 bg-[#080e18]/85"
                  variants={backdropV}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={onClose}
                />

                {/* ── sliding tray panel (right half) ── */}
                <motion.div
                  className="nav-tray"
                  variants={panelV}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{
                    paddingTop: 'max(1.5rem, env(safe-area-inset-top, 0px))',
                    paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
                  }}
                >
                  {/* ambient layers — grain + gradient drift + scanlines */}
                  <div className="nav-tray-grain" aria-hidden="true" />
                  <div className="nav-tray-drift" aria-hidden="true" />
                  <div className="nav-tray-scan" aria-hidden="true" />

                  {/* close button */}
                  <div className="relative z-10 flex justify-end px-6 sm:px-8 lg:px-10 mb-2 lg:mb-4">
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="p-2.5 rounded-full border border-white/10 text-cream/50 hover:text-cream hover:border-white/25 transition-all"
                      aria-label="Close menu"
                      variants={closeBtnV}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <X size={24} strokeWidth={1.5} />
                    </motion.button>
                  </div>

                  {/* nav links */}
                  <nav aria-label="Main navigation" className="relative z-10 flex-1 flex items-center px-8 sm:px-10 lg:px-14">
                    <motion.ul
                      className="w-full space-y-1 sm:space-y-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {navLinks.map((link, i) => (
                        <motion.li key={link.href} variants={linkV}>
                          <CoolMode options={{ particle: 'circle', particleCount: 20 }} className="block">
                            <Link
                              href={link.href}
                              className="nav-tray-link group"
                              onClick={handleNavLinkClick}
                            >
                              <span className="nav-tray-index">{ROMAN[i]}</span>
                              <span className="nav-tray-label">{link.label}</span>
                            </Link>
                          </CoolMode>
                        </motion.li>
                      ))}

                      {/* order online CTA */}
                      <motion.li variants={linkV} className="pt-4 sm:pt-6">
                        <CoolMode options={{ particle: 'circle', particleCount: 20 }} className="block">
                          <a
                            href="https://order.toasttab.com/online/the-pier-driftwoods"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleNavLinkClick}
                            className="nav-tray-cta"
                          >
                            Order Online
                          </a>
                        </CoolMode>
                      </motion.li>
                    </motion.ul>
                  </nav>

                  {/* footer info */}
                  <motion.div
                    className="relative z-10 px-8 sm:px-10 lg:px-14 pt-5 mt-auto"
                    variants={footerV}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <div className="border-t border-white/[0.08] pt-5">
                      <p className="text-[11px] sm:text-xs tracking-[0.15em] uppercase text-cream/30 font-light">
                        Driftwoods &middot; Bar &amp; Grill
                      </p>
                      <p className="text-[11px] sm:text-xs text-cream/20 mt-1 font-light">
                        9832 N. 7th St. Phoenix, AZ 85020
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>,
              document.body
            )
          : null}
      </AnimatePresence>
    </>
  )
}
