'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Upload, Cpu, Music } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Ideas',
    description: 'Drop in audio files, reference tracks, or start from scratch. vyke.ai analyzes everything in seconds.',
    color: '#00d4aa'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Does the Heavy Lifting',
    description: 'Our models generate patterns, suggest arrangements, match samples, and create variations based on your input.',
    color: '#00b4d8'
  },
  {
    number: '03',
    icon: Music,
    title: 'Refine & Export',
    description: 'Tweak the AI suggestions directly in your DAW. When you are happy, everything exports seamlessly to Ableton.',
    color: '#00d4aa'
  }
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4aa]/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.2em] text-[#00d4aa] uppercase font-medium">How It Works</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            From idea to track in
            <br />
            <span className="text-gradient-accent">three simple steps</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="card p-8 md:p-12 gradient-border">
                    <div className="flex items-start gap-6">
                      <div 
                        className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                        style={{ 
                          background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                          border: `1px solid ${step.color}40`,
                          color: step.color
                        }}
                      >
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-white/50 text-lg leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <motion.div 
                    className="relative w-48 h-48 md:w-64 md:h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-20"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${step.color}, transparent)` }}
                    />
                    <div className="absolute inset-4 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center">
                      <step.icon size={48} style={{ color: step.color }} />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Connector line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-px h-8 bg-gradient-to-b from-[#00d4aa]/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
