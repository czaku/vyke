'use client'

import { SmoothScrollProvider } from './components/smooth-scroll-provider'
import { CustomCursor } from './components/custom-cursor'
import { Navigation } from './components/navigation'
import { HeroSection } from './components/hero-section'
import { FeaturedMixes } from './components/featured-mixes'
import { AboutSection } from './components/about-section'
import { TourDates } from './components/tour-dates'
import { NewsletterSection } from './components/newsletter-section'
import { Footer } from './components/footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      
      <main className="grain-overlay">
        {/* Hero - Full viewport with parallax */}
        <HeroSection />
        
        {/* Mixes - Horizontal scrolling cards */}
        <section id="mixes">
          <FeaturedMixes />
        </section>
        
        {/* About - Story with image parallax */}
        <section id="about">
          <AboutSection />
        </section>
        
        {/* Tour Dates - Timeline */}
        <section id="tour">
          <TourDates />
        </section>
        
        {/* Newsletter & Contact */}
        <section id="contact">
          <NewsletterSection />
        </section>
      </main>
      
      <Footer />
    </SmoothScrollProvider>
  )
}
