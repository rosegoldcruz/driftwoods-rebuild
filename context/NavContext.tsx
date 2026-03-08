// context/NavContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type NavContextValue = {
  isNavOpen: boolean
  flingCount: number
  celebrationCount: number
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  triggerFling: () => void
  triggerCelebration: () => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [flingCount, setFlingCount] = useState(0)
  const [celebrationCount, setCelebrationCount] = useState(0)
  const openNav   = useCallback(() => setIsNavOpen(true), [])
  const closeNav  = useCallback(() => setIsNavOpen(false), [])
  const toggleNav = useCallback(() => setIsNavOpen((v) => !v), [])
  const triggerFling = useCallback(() => setFlingCount((count) => count + 1), [])
  const triggerCelebration = useCallback(() => setCelebrationCount((count) => count + 1), [])
  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        flingCount,
        celebrationCount,
        openNav,
        closeNav,
        toggleNav,
        triggerFling,
        triggerCelebration,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside <NavProvider>')
  return ctx
}

