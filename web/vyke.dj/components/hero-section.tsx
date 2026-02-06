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
  const y = useTransform(smoothProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2])
  const textY = useTransform(smoothProgress, [0, 0.5], ['0%', '100px'])
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.3])
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])

  // Cycling text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % CYCLING_TEXTS.length)
    }, 4000) // Change every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image with parallax - Using main_dj.jpeg */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/images/dj/main_dj.jpeg"
            alt="Luke Vyke performing"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
          
          {/* Animated orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="orb orb-pink w-[600px] h-[600px] -top-40 -left-40"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="orb orb-purple w-[500px] h-[500px] bottom-0 right-0"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          {/* Glossy overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center px-4"
          style={{ opacity, y: textY }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <LukeVykeLogo size="lg" animated={true} />
          </motion.div>

          {/* Cycling text animation */}
          <div className="text-center h-32 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-gradient">
                  {CYCLING_TEXTS[currentTextIndex].text.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-gradient-accent' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <motion.p 
                  className="mt-4 text-lg md:text-xl text-white/60 tracking-widest uppercase"
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
            className="mt-8 text-lg md:text-xl text-white/50 max-w-lg mx-auto text-center"
          >
            London-based DJ & producer fusing Afro-Latin rhythms with cutting-edge electronic sound
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="magnetic-button group relative px-8 py-4 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] text-white rounded-full font-medium text-sm tracking-wide overflow-hidden shadow-lg shadow-[#e056c8]/25 hover:shadow-xl hover:shadow-[#e056c8]/40 transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? 'Pause Mix' : 'Listen Now'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f06bc9] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="magnetic-button px-8 py-4 border border-white/20 rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm glossy">
              View Dates
            </button>
          </motion.div>

          {/* Text progress indicator */}
          <div className="mt-16 flex gap-2">
            {CYCLING_TEXTS.map((_, index) => (
              <motion.div
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
              </motion.div>
            ))}
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

        {/* Side decorations */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
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
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
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
      </div>
    </section>
  )
}
