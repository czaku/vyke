'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  AudioWaveform, 
  Brain, 
  Wand2, 
  Mic2, 
  Disc3, 
  Sparkles,
  Zap,
  Layers
} from 'lucide-react'

const features = [
  {
    icon: AudioWaveform,
    title: 'Intelligent Analysis',
    description: 'Upload any track and get instant insights on key, BPM, structure, and harmonic relationships.',
  },
  {
    icon: Brain,
    title: 'AI Pattern Generation',
    description: 'Generate drum patterns, basslines, and melodies that match your style and current project.',
  },
  {
    icon: Wand2,
    title: 'One-Click Remix',
    description: 'Transform any track into a new genre or style with intelligent stem separation and rearrangement.',
  },
  {
    icon: Mic2,
    title: 'Voice-to-MIDI',
    description: 'Hum a melody, beatbox a rhythm, or describe a sound. We translate it into MIDI.',
  },
  {
    icon: Disc3,
    title: 'Smart Sample Matching',
    description: 'Find the perfect sample from your library based on spectral and harmonic analysis.',
  },
  {
    icon: Layers,
    title: 'Ableton Integration',
    description: 'Native VST3/AU plugin that communicates directly with your DAW. No export/import needed.',
  },
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.2em] text-[#00d4aa] uppercase font-medium">Features</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Everything you need to
            <br />
            <span className="text-gradient-accent">produce at lightspeed</span>
          </h2>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card p-8 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="icon-bg mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={24} className="text-[#00d4aa]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#" className="inline-flex items-center gap-2 text-[#00d4aa] hover:text-[#00e6b8] transition-colors">
            <Sparkles size={18} />
            <span>See all features</span>
            <span className="text-white/30">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
