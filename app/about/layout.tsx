import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Driftwoods - Sunnyslope\'s favorite neighborhood bar & grill. Discover our story, values, and what makes us the heart of the community in Phoenix, AZ.',
  openGraph: {
    title: 'About Driftwoods | Your Neighborhood Bar & Grill',
    description: 'More than a restaurant — a neighborhood gathering place in Sunnyslope, Phoenix.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
