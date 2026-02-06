'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import { Cpu, Music, Globe, Zap } from 'lucide-react'

const STATS = [
  { value: '5+', label: 'Years Producing', icon: Music },
  { value: 'Tech', label: 'Driven', icon: Cpu },
  { value: '50+', label: 'Sets Played', icon: Globe },
  { value: '∞', label: 'Energy', icon: Zap },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const textX = useTransform(scrollYProgress, [0, 0.5], ['100px', '0px'])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="orb orb-purple w-[800px] h-[800px] -right-40 top-1/4"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20"
        >
          <span className="text-[#e056c8] text-sm tracking-[0.3em] uppercase">About</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold">
            The <span className="text-gradient-accent">Geek</span><br />
            Behind The Decks
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <motion.div 
                className="absolute inset-0"
                style={{ y: imageY }}
              >
                <Image
                  src="/images/dj/front_casual.jpeg"
                  alt="Luke Vyke"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
              
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 p-6 glossy-card rounded-2xl"
            >
              <div className="text-4xl font-bold text-gradient-accent">Luke Vyke</div>
              <p className="text-white/60 mt-1">London, UK</p>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            style={{ x: textX }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl font-light leading-relaxed text-white/90"
            >
              I'm a <span className="text-[#e056c8] font-medium">tech geek who found his calling behind the decks</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/70 leading-relaxed"
            >
              Based in London, I specialize in Circuit House, Afro Circuit, and Afro House—
              genres that pulse with energy and make bodies move. My sound is a fusion of 
              tribal rhythms, Latin percussion, and cutting-edge electronic production.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-white/70 leading-relaxed"
            >
              What sets me apart? I'm not just playing tracks—I'm <span className="text-[#8b5cf6]">building technology 
              to stand out</span>. From custom Ableton tools to AI-powered track analysis, I'm 
              merging my software engineering background with my passion for dance music.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/70 leading-relaxed"
            >
              The goal? <span className="text-gradient-accent font-medium">Play the world's biggest festivals</span>.
              I'm building the tech, refining the sound, and creating experiences that 
              people remember long after the bass drops.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-[#e056c8]" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
