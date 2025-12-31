import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MobileCTA } from '@/components/MobileCTA'
import { SmoothScroll } from '@/components/SmoothScroll'
import IntroGate from '@/components/IntroGate'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A212F',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://driftwoodsaz.com'),
  title: {
    default: 'Driftwoods | Your Neighborhood Bar & Grill in Sunnyslope, Phoenix',
    template: '%s | Driftwoods Bar & Grill',
  },
  description: 'Sunnyslope\'s favorite gastropub. Great food, craft beers, cocktails, and warm hospitality. Open daily for lunch, dinner, and weekend brunch. 9832 N 7th St, Phoenix AZ.',
  keywords: 'driftwoods, bar and grill, gastropub, sunnyslope, phoenix, arizona, restaurant, brunch, craft beer, cocktails, happy hour, wings, burgers, fish and chips',
  authors: [{ name: 'Driftwoods Restaurant' }],
  creator: 'Driftwoods',
  publisher: 'Driftwoods',
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: 'Driftwoods | Bar & Grill in Sunnyslope, Phoenix',
    description: 'Great food, craft beers, and warm hospitality in the heart of Sunnyslope. Open daily for lunch, dinner & weekend brunch.',
    url: 'https://driftwoodsaz.com',
    siteName: 'Driftwoods',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://cdn.ing/assets/i/r/214512/xk6mpgu495onutfpuwnxy83ltocv/data-uri.webp',
        width: 1200,
        height: 630,
        alt: 'Driftwoods Bar & Grill - Sunnyslope Phoenix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driftwoods | Bar & Grill',
    description: 'Your neighborhood bar & grill in Sunnyslope, Phoenix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://driftwoodsaz.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

// LocalBusiness Schema - SEO Critical
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://driftwoodsaz.com',
  name: 'Driftwoods',
  alternateName: 'Driftwoods Bar & Grill',
  description: 'Embark on a culinary journey that combines the warmth of a neighborhood bar with the sophistication of an upscale American gastropub. Located in the heart of Sunnyslope, Driftwoods is more than just a restaurant – it\'s a gathering place where friends and families come together to savor delightful cuisine, sip on carefully crafted cocktails, enjoy regional craft beers, and create lasting memories.',
  url: 'https://driftwoodsaz.com',
  telephone: '+1-480-393-3261',
  email: 'info@driftwoodsaz.com',
  image: 'https://cdn.ing/assets/i/r/214512/xk6mpgu495onutfpuwnxy83ltocv/data-uri.webp',
  logo: 'https://cdn.ing/assets/i/r/214509/fkyilpfeqnsd2zfkgixja2728ic9/logo.webp',
  priceRange: '$$',
  servesCuisine: ['American', 'Gastropub', 'Bar Food'],
  acceptsReservations: true,
  menu: 'https://driftwoodsaz.com/menu',
  hasMenu: {
    '@type': 'Menu',
    url: 'https://driftwoodsaz.com/menu',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9832 N 7th St',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    postalCode: '85020',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.5763074,
    longitude: -112.065576,
  },
  hasMap: 'https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '11:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '11:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '22:00',
    },
  ],
  potentialAction: {
    '@type': 'OrderAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://order.toasttab.com/online/the-pier-driftwoods',
      actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
    },
    deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickUp'],
  },
  sameAs: [
    'https://www.facebook.com/driftwoodsaz',
    'https://www.instagram.com/driftwoodsaz',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.ing" />
        <link rel="preconnect" href="https://toastability-production.s3.amazonaws.com" />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased bg-dark text-cream">
        <IntroGate />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <MobileCTA />
        </SmoothScroll>
      </body>
    </html>
  )
}
