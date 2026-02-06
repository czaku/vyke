'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, Play, Pause } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
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

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Video/Image with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale, y }}
        >
          {/* Placeholder for background video - replace with actual video */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-transparent to-transparent animate-pulse-glow" />
            </div>
          </div>
          
          {/* Video overlay gradient */}
          <div className="video-overlay" />
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center px-4"
          style={{ opacity, y: textY }}
        >
          {/* Name reveal animation */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.2 
              }}
            >
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter">
                <span className="text-gradient">VYKE</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.6 
              }}
            >
              <p className="mt-4 text-xl md:text-2xl text-white/60 tracking-[0.3em] uppercase">
                Luke Vyke
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.9 
              }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl text-white/40 max-w-md mx-auto">
                Electronic music artist blending house, techno, and Afro-Caribbean rhythms
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.23, 1, 0.32, 1],
                delay: 1.2 
              }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="magnetic-button group relative px-8 py-4 bg-white text-black rounded-full font-medium text-sm tracking-wide overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? 'Pause Mix' : 'Listen Now'}
                </span>
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="magnetic-button px-8 py-4 border border-white/30 rounded-full font-medium text-sm tracking-wide hover:bg-white/10 transition-colors duration-300">
                View Dates
              </button>
            </motion.div>
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
            <span>House</span>
            <span>•</span>
            <span>Techno</span>
            <span>•</span>
            <span>Afro</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ opacity }}
        >
          <div className="flex flex-col gap-4 text-xs tracking-widest text-white/30 uppercase [writing-mode:vertical-lr] rotate-180">
            <span>London</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
