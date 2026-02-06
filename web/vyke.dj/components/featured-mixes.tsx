'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Clock, Music } from 'lucide-react'

const mixes = [
  {
    id: 1,
    title: "Afro Circuit Sessions",
    subtitle: "Vol. 12",
    duration: "1:23:45",
    genre: "Afro House",
    color: "from-orange-500 to-red-600",
    description: "Deep journey through contemporary Afro-Caribbean electronic sounds"
  },
  {
    id: 2,
    title: "Warehouse Techno",
    subtitle: "Live Set",
    duration: "2:15:00",
    genre: "Techno",
    color: "from-purple-600 to-blue-600",
    description: "Raw warehouse energy captured live in London"
  },
  {
    id: 3,
    title: "Sunset Grooves",
    subtitle: "Ibiza 2025",
    duration: "1:45:30",
    genre: "Deep House",
    color: "from-pink-500 to-purple-600",
    description: "Sunset session from the White Isle"
  },
  {
    id: 4,
    title: "After Hours",
    subtitle: "Underground",
    duration: "3:00:00",
    genre: "Minimal",
    color: "from-green-500 to-teal-600",
    description: "Deep minimal selections for the late night hours"
  }
]

export function FeaturedMixes() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Section header */}
      <motion.div 
        className="px-8 md:px-16 mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm tracking-[0.3em] text-white/40 uppercase">Latest</span>
        <h2 className="mt-4 text-5xl md:text-7xl font-bold">
          <span className="text-gradient">Mixes</span>
        </h2>
      </motion.div>

      {/* Horizontal scrolling cards */}
      <motion.div 
        className="flex gap-6 px-8 md:px-16"
        style={{ x }}
      >
        {mixes.map((mix, index) => (
          <motion.div
            key={mix.id}
            className="relative flex-shrink-0 w-[350px] md:w-[450px] group cursor-pointer"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {/* Card background */}
            <div className={`relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br ${mix.color} p-8 flex flex-col justify-between`}>
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/80">
                  <Music size={16} />
                  <span className="text-xs tracking-widest uppercase">{mix.genre}</span>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {mix.title}
                </h3>
                <p className="mt-2 text-lg text-white/80">{mix.subtitle}</p>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  {mix.description}
                </p>
              </div>

              {/* Play button overlay */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <Play size={32} className="text-black ml-1" fill="black" />
                </div>
              </motion.div>

              {/* Bottom info */}
              <div className="relative z-10 flex items-center gap-2 text-white/60">
                <Clock size={16} />
                <span className="text-sm">{mix.duration}</span>
              </div>
            </div>

            {/* Card shadow/glow */}
            <div className={`absolute -inset-1 bg-gradient-to-br ${mix.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
          </motion.div>
        ))}

        {/* "View All" card */}
        <motion.div
          className="relative flex-shrink-0 w-[350px] md:w-[450px] h-[500px] rounded-3xl border border-white/10 flex items-center justify-center group cursor-pointer hover:border-white/30 transition-colors duration-300"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <span className="text-2xl">→</span>
            </div>
            <p className="text-lg font-medium">View All Mixes</p>
            <p className="text-sm text-white/40 mt-2">Archive of past sets</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
