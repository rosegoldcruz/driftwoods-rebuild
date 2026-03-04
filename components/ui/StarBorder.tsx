import React from 'react'

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T
  className?: string
  children?: React.ReactNode
  color?: string
  speed?: React.CSSProperties['animationDuration']
  thickness?: number
  contentClassName?: string
}

export const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'magenta',
  speed = '5s',
  thickness = 1,
  children,
  contentClassName = '',
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button'

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-bottom ${speed} linear infinite alternate`,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-top ${speed} linear infinite alternate`,
        }}
      />
      <div className={`relative z-[1] rounded-[20px] ${contentClassName}`}>{children}</div>
    </Component>
  )
}
