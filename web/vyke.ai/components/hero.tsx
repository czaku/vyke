'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Download } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00d4aa]/10 rounded-full blur-[150px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00b4d8]/10 rounded-full blur-[150px]"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-8 text-center"
        style={{ opacity, y }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
          <span className="text-sm text-white/70">Now in Beta</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="text-gradient">Produce faster.</span>
          <br />
          <span className="text-white/90">Create better.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto"
        >
          The AI-powered music production assistant that understands your creative intent.
          From analysis to arrangement in minutes, not hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
            <Download size={20} />
            Download Beta
          </button>
          <button className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
            <Play size={20} />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '10x', label: 'Faster Workflow' },
            { value: '50K+', label: 'Tracks Analyzed' },
            { value: '500+', label: 'Beta Users' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gradient-accent">{stat.value}</p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* App preview placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8"
      >
        <div className="relative">
          <div className="aspect-[16/9] rounded-t-2xl bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/10 border-b-0 overflow-hidden">
            {/* App UI mockup */}
            <div className="absolute inset-4 rounded-xl bg-[#0d1117] border border-white/5 flex">
              {/* Sidebar */}
              <div className="w-16 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/20" />
                <div className="w-8 h-8 rounded-lg bg-white/5" />
                <div className="w-8 h-8 rounded-lg bg-white/5" />
                <div className="w-8 h-8 rounded-lg bg-white/5" />
              </div>
              {/* Main content */}
              <div className="flex-1 p-6">
                <div className="h-8 w-48 bg-white/5 rounded-lg mb-6" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#00d4aa]/20 to-transparent border border-[#00d4aa]/20" />
                  <div className="aspect-square rounded-xl bg-white/5" />
                  <div className="aspect-square rounded-xl bg-white/5" />
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-[#00d4aa]/20 blur-[100px] -z-10 opacity-50" />
        </div>
      </motion.div>
    </section>
  )
}
