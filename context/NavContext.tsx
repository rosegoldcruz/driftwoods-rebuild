// context/NavContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type NavContextValue = {
  isNavOpen: boolean
  celebrationCount: number
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  triggerCelebration: () => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [celebrationCount, setCelebrationCount] = useState(0)
  const openNav   = useCallback(() => setIsNavOpen(true), [])
  const closeNav  = useCallback(() => setIsNavOpen(false), [])
  const toggleNav = useCallback(() => setIsNavOpen((v) => !v), [])
  const triggerCelebration = useCallback(() => setCelebrationCount((count) => count + 1), [])
  return (
    <NavContext.Provider value={{ isNavOpen, celebrationCount, openNav, closeNav, toggleNav, triggerCelebration }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside <NavProvider>')
  return ctx
}

