import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Driftwoods Bar & Grill in Sunnyslope, Phoenix. Call (480) 393-3261 or visit us at 9832 N 7th St, Phoenix, AZ 85020. Hours, directions, and contact form.',
  openGraph: {
    title: 'Contact Driftwoods | Phoenix Bar & Grill',
    description: 'Get in touch with Driftwoods. Find our hours, location, phone number, and send us a message.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
