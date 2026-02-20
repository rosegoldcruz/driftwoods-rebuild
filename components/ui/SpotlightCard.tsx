'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(224, 122, 47, 0.24)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    divRef.current.style.setProperty('--mouse-x', `${x}px`)
    divRef.current.style.setProperty('--mouse-y', `${y}px`)
    divRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  )
}
