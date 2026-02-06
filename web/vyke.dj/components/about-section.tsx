'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  const words = ["Sound", "is", "my", "language", "and", "the", "dancefloor", "is", "my", "canvas"]

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] py-32"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Large typography section */}
        <motion.div 
          className="relative"
          style={{ opacity, scale }}
        >
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block mr-[0.3em] ${index === 0 || index === 6 ? 'text-gradient-accent' : 'text-white'}`}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Two column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-32">
          {/* Left column - sticky image */}
          <motion.div 
            className="relative"
            style={{ y: y1 }}
          >
            <div className="sticky top-32">
              <motion.div
                className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 to-black"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Replace with actual DJ image */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30" />
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-sm text-white/60">Years Experience</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - scrolling text */}
          <motion.div style={{ y: y2 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm tracking-[0.3em] text-white/40 uppercase">About</span>
              <h3 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                From the underground to the main stage
              </h3>
            </motion.div>

            <motion.div 
              className="mt-8 space-y-6 text-lg text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                My journey began in the warehouse parties of East London, where I discovered 
                the transformative power of electronic music. What started as curiosity 
                became obsession, and obsession became craft.
              </p>
              <p>
                Over the past decade, I've had the privilege of sharing the booth with 
                legends, playing at iconic venues, and most importantly, connecting with 
                dancefloors around the world.
              </p>
              <p>
                My sound sits at the intersection of house, techno, and Afro-Caribbean 
                rhythms—always forward-thinking, always rooted in groove.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-8 mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { number: "200+", label: "Gigs Played" },
                { number: "50+", label: "Cities" },
                { number: "1M+", label: "Streams" },
                { number: "3", label: "Residencies" },
              ].map((stat, index) => (
                <div key={index} className="border-t border-white/10 pt-6">
                  <p className="text-3xl md:text-4xl font-bold text-gradient-accent">{stat.number}</p>
                  <p className="mt-2 text-sm text-white/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
