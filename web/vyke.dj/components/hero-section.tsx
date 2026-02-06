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
  const textY = useTransform(smoothProgress, [0, 0.5], ['0%', '100px'])
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '20%'])
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % CYCLING_TEXTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Full background image - blended in */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src="/images/dj/main_dj.jpeg"
            alt="Luke Vyke"
            fill
            className="object-cover object-[center_15%]"
            priority
          />
          
          {/* Multi-layer gradient for blending */}
          {/* Top gradient - darker at top for nav readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/20 to-transparent" />
          
          {/* Bottom gradient - fades to black */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          
          {/* Side gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/40" />
          
          {/* Color orbs for atmosphere */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="orb orb-pink w-[800px] h-[800px] -top-40 -left-40"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.35, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="orb orb-purple w-[600px] h-[600px] bottom-0 right-0"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20"
          style={{ opacity, y: textY }}
        >
          <div className="max-w-3xl">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mb-6"
            >
              <LukeVykeLogo size="md" animated={true} />
            </motion.div>

            {/* Cycling text */}
            <div className="h-32 md:h-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gradient">
                    {CYCLING_TEXTS[currentTextIndex].text.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? 'text-gradient-accent' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                  <motion.p 
                    className="mt-3 text-base md:text-lg text-white/60 tracking-widest uppercase"
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
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-4 text-base md:text-lg text-white/50 max-w-md"
            >
              London-based DJ & producer fusing Afro-Latin rhythms with cutting-edge electronic sound
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="magnetic-button group relative px-7 py-3.5 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] text-white rounded-full font-medium text-sm tracking-wide overflow-hidden shadow-lg shadow-[#e056c8]/25 hover:shadow-xl hover:shadow-[#e056c8]/40 transition-shadow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause Mix' : 'Listen Now'}
                </span>
              </button>

              <button className="magnetic-button px-7 py-3.5 border border-white/20 rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors backdrop-blur-sm">
                View Dates
              </button>
            </motion.div>

            {/* Progress indicators */}
            <div className="mt-8 flex gap-2">
              {CYCLING_TEXTS.map((_, index) => (
                <div
                  key={index}
                  className="h-1 rounded-full bg-white/20 overflow-hidden"
                  style={{ width: 32 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6]"
                    initial={{ width: 0 }}
                    animate={{ width: currentTextIndex === index ? '100%' : '0%' }}
                    transition={{ duration: currentTextIndex === index ? 4 : 0, ease: 'linear' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

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

        {/* Side text */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ opacity }}
        >
          <div className="flex flex-col gap-3 text-xs tracking-widest text-white/30 uppercase [writing-mode:vertical-lr]">
            <span className="text-[#e056c8]">Circuit</span>
            <span>•</span>
            <span>Afro</span>
            <span>•</span>
            <span className="text-[#8b5cf6]">House</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ opacity }}
        >
          <div className="flex flex-col gap-3 text-xs tracking-widest text-white/30 uppercase [writing-mode:vertical-lr] rotate-180">
            <span className="text-[#e056c8]">London</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
