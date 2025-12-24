import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Driftwoods team! We\'re hiring servers, bartenders, cooks, and hosts. Competitive pay, flexible hours, and great benefits. Apply now at our Sunnyslope location.',
  openGraph: {
    title: 'Careers at Driftwoods | Join Our Team',
    description: 'Looking for restaurant jobs in Phoenix? Driftwoods is hiring! Great team, flexible hours, and room to grow.',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
