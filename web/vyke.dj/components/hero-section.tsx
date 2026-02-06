'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { LukeVykeLogo } from './logo'

const CYCLING_TEXTS = [
  { text: 'Luke Vyke', subtitle: 'Artist & Technologist' },
  { text: 'Circuit House', subtitle: 'High-Energy Afro-Latin Grooves' },
  { text: 'Afro Circuit', subtitle: 'Tribal Rhythms Meets Electronic' },
  { text: 'Afro House', subtitle: 'Deep, Soulful, Dancefloor Ready' },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smooth spring animation for natural feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Parallax transforms
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.5], ['0%', '100px'])

  // Cycling text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % CYCLING_TEXTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
      
      {/* Animated orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="orb orb-pink w-[800px] h-[800px] -top-40 -right-40"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="orb orb-purple w-[600px] h-[600px] bottom-1/4 -left-20"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-16 py-32 gap-8 lg:gap-16">
        
        {/* Left side - Text content */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left"
          style={{ opacity, y: textY }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 flex justify-center lg:justify-start"
          >
            <LukeVykeLogo size="lg" animated={true} />
          </motion.div>

          {/* Cycling text animation */}
          <div className="h-36 lg:h-40 flex flex-col items-center lg:items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center lg:items-start"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gradient">
                  {CYCLING_TEXTS[currentTextIndex].text.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-gradient-accent' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <motion.p 
                  className="mt-4 text-base md:text-lg text-white/60 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {CYCLING_TEXTS[currentTextIndex].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-base md:text-lg text-white/50 max-w-md mx-auto lg:mx-0"
          >
            London-based DJ & producer fusing Afro-Latin rhythms with cutting-edge electronic sound
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          >
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="magnetic-button group relative px-8 py-4 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] text-white rounded-full font-medium text-sm tracking-wide overflow-hidden shadow-lg shadow-[#e056c8]/25 hover:shadow-xl hover:shadow-[#e056c8]/40 transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? 'Pause Mix' : 'Listen Now'}
              </span>
            </button>

            <button className="magnetic-button px-8 py-4 border border-white/20 rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm glossy">
              View Dates
            </button>
          </motion.div>

          {/* Text progress indicator */}
          <div className="mt-10 flex gap-2 justify-center lg:justify-start">
            {CYCLING_TEXTS.map((_, index) => (
              <div
                key={index}
                className="h-1 rounded-full bg-white/20 overflow-hidden"
                style={{ width: 40 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6]"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: currentTextIndex === index ? '100%' : '0%'
                  }}
                  transition={{ 
                    duration: currentTextIndex === index ? 4 : 0,
                    ease: 'linear'
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Decorative ring behind image */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#e056c8]/30 to-[#8b5cf6]/30 blur-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Image container */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/dj/main_dj.jpeg"
                alt="Luke Vyke"
                fill
                className="object-cover object-top"
                priority
              />
              
              {/* Gradient overlay for text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
              
              {/* Glossy frame effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 p-4 glossy-card rounded-2xl border border-white/10"
            >
              <div className="text-2xl font-bold text-gradient-accent">Luke Vyke</div>
              <p className="text-white/60 text-sm">London, UK</p>
            </motion.div>

            {/* Genre tags floating around */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 px-4 py-2 bg-[#e056c8]/20 backdrop-blur-sm rounded-full text-sm text-[#e056c8] border border-[#e056c8]/30"
            >
              Circuit House
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute top-1/4 -right-8 px-4 py-2 bg-[#8b5cf6]/20 backdrop-blur-sm rounded-full text-sm text-[#8b5cf6] border border-[#8b5cf6]/30"
            >
              Afro Circuit
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs tracking-widest text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <motion.div 
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{ opacity }}
      >
        <div className="flex flex-col gap-4 text-xs tracking-widest text-white/30 uppercase [writing-mode:vertical-lr]">
          <span className="text-[#e056c8]">Circuit</span>
          <span>•</span>
          <span>Afro</span>
          <span>•</span>
          <span className="text-[#8b5cf6]">House</span>
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{ opacity }}
      >
        <div className="flex flex-col gap-4 text-xs tracking-widest text-white/30 uppercase [writing-mode:vertical-lr] rotate-180">
          <span className="text-[#e056c8]">London</span>
          <span>•</span>
          <span>2026</span>
          <span>•</span>
          <span className="text-[#8b5cf6]">Vyke</span>
        </div>
      </motion.div>
    </section>
  )
}
