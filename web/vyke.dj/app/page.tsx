import { HeroSection } from '@/components/hero-section'
import { FeaturedMixes } from '@/components/featured-mixes'
import { AboutSection } from '@/components/about-section'
import { TourDates } from '@/components/tour-dates'
import { NewsletterSection } from '@/components/newsletter-section'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { CustomCursor } from '@/components/custom-cursor'

export default function Home() {
  return (
    <main className="grain-overlay">
      <CustomCursor />
      <Navigation />
      
      <HeroSection />
      
      <section id="music">
        <FeaturedMixes />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <section id="tour">
        <TourDates />
      </section>
      
      <section id="contact">
        <NewsletterSection />
      </section>
      
      <Footer />
    </main>
  )
}
