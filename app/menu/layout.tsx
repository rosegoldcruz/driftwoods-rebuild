import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'View the Driftwoods menu - American gastropub fare including burgers, steaks, fish & chips, craft cocktails, and 16 beers on tap. Weekend brunch, happy hour specials, and more.',
  keywords: 'driftwoods menu, phoenix restaurant menu, sunnyslope food, gastropub menu, craft beer, cocktails, brunch menu, happy hour',
  openGraph: {
    title: 'Menu | Driftwoods Bar & Grill',
    description: 'Explore our full menu - from brunch to late-night bites. American gastropub favorites, craft cocktails, and 16 beers on tap.',
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
