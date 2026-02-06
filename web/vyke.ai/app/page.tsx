import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Pricing } from '@/components/pricing'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="noise-overlay">
      <Navigation />
      
      <Hero />
      
      <section id="features">
        <Features />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      <section id="pricing">
        <Pricing />
      </section>
      
      <Footer />
    </main>
  )
}
