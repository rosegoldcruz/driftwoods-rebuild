// app/page.tsx
import { Hero, AboutSection, NewsletterForm, TrustSection } from '@/components'
import { HomeIntroLoader } from '@/components/HomeIntroLoader'

export default function HomePage() {
  return (
    <>
      <HomeIntroLoader />
      <Hero />
      <TrustSection />

      <AboutSection />
      <NewsletterForm />
    </>
  )
}
