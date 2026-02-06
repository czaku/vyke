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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.5], ['0%', '80px'])
  // Parallax: image moves slower than scroll
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '-15%'])
  const containerY = useTransform(smoothProgress, [0, 1], ['0%', '10%'])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % CYCLING_TEXTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="orb orb-pink w-[900px] h-[900px] -top-1/4 -right-1/4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="orb orb-purple w-[700px] h-[700px] -bottom-1/4 -left-1/4"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-16 py-32 lg:py-24 gap-8 lg:gap-12"
        style={{ y: containerY }}
      >
        
        {/* Left - Text */}
        <motion.div 
          className="flex-1 max-w-xl text-center lg:text-left order-2 lg:order-1"
          style={{ opacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <LukeVykeLogo size="lg" animated={true} />
          </motion.div>

          <div className="h-28 md:h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gradient">
                  {CYCLING_TEXTS[currentTextIndex].text.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-gradient-accent' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <motion.p 
                  className="mt-2 text-sm md:text-base text-white/50 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {CYCLING_TEXTS[currentTextIndex].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm md:text-base text-white/40 max-w-sm mx-auto lg:mx-0"
          >
            London-based DJ & producer fusing Afro-Latin rhythms with cutting-edge electronic sound
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="magnetic-button px-6 py-3 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] text-white rounded-full text-sm font-medium shadow-lg shadow-[#e056c8]/20 hover:shadow-xl hover:shadow-[#e056c8]/30 transition-shadow"
            >
              <span className="flex items-center gap-2">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Listen'}
              </span>
            </button>
            <button className="magnetic-button px-6 py-3 border border-white/15 rounded-full text-sm text-white/70 hover:bg-white/5 transition-colors">
              View Dates
            </button>
          </motion.div>

          <div className="mt-6 flex gap-1.5 justify-center lg:justify-start">
            {CYCLING_TEXTS.map((_, i) => (
              <div key={i} className="h-1 w-6 rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6]"
                  initial={{ width: 0 }}
                  animate={{ width: currentTextIndex === i ? '100%' : '0%' }}
                  transition={{ duration: currentTextIndex === i ? 4 : 0 }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Image with parallax */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2 max-w-md lg:max-w-lg xl:max-w-xl w-full"
          style={{ y: imageY }}
        >
          <div className="relative w-full aspect-[4/5] max-w-sm md:max-w-md lg:max-w-full">
            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#e056c8]/40 to-[#8b5cf6]/40 blur-3xl"
              animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.95, 1.02, 0.95] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Image frame */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/dj/main_dj.jpeg"
                alt="Luke Vyke"
                fill
                className="object-cover object-top"
                priority
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
              
              {/* Frame highlight */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
            </div>

            {/* Floating genre tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-4 -right-2 md:top-6 md:-right-4 px-3 py-1.5 bg-[#e056c8]/20 backdrop-blur-md rounded-full text-xs md:text-sm text-[#e056c8] border border-[#e056c8]/30"
            >
              Circuit House
            </motion.div>

            {/* Floating location tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 -left-2 md:bottom-6 md:-left-4 px-3 py-1.5 bg-[#8b5cf6]/20 backdrop-blur-md rounded-full text-xs md:text-sm text-[#8b5cf6] border border-[#8b5cf6]/30"
            >
              London, UK
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-widest text-white/30 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <motion.div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block" style={{ opacity }}>
        <div className="flex flex-col gap-3 text-xs tracking-widest text-white/25 uppercase [writing-mode:vertical-lr]">
          <span className="text-[#e056c8]">Circuit</span>
          <span>•</span>
          <span>Afro</span>
          <span>•</span>
          <span className="text-[#8b5cf6]">House</span>
        </div>
      </motion.div>

      <motion.div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block" style={{ opacity }}>
        <div className="flex flex-col gap-3 text-xs tracking-widest text-white/25 uppercase [writing-mode:vertical-lr] rotate-180">
          <span className="text-[#e056c8]">London</span>
          <span>•</span>
          <span>2026</span>
        </div>
      </motion.div>
    </section>
  )
}
