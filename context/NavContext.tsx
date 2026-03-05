// context/NavContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type NavContextValue = {
  isNavOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const openNav   = useCallback(() => setIsNavOpen(true), [])
  const closeNav  = useCallback(() => setIsNavOpen(false), [])
  const toggleNav = useCallback(() => setIsNavOpen((v) => !v), [])
  return (
    <NavContext.Provider value={{ isNavOpen, openNav, closeNav, toggleNav }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside <NavProvider>')
  return ctx
}
