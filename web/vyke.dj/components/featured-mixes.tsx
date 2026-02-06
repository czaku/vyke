'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import { Play, Clock, Music, ExternalLink } from 'lucide-react'

const MIXES = [
  {
    id: 1,
    title: "Afro Circuit Sunrise",
    subtitle: "Miami Poolside Sessions",
    duration: "1:24:36",
    genre: "Afro Circuit / 123 BPM",
    description: "Sun-drenched grooves for those golden hour moments",
    image: "/images/dj/secondary_dj.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
      { name: "Mixcloud", url: "#" },
    ]
  },
  {
    id: 2,
    title: "Warehouse Circuit",
    subtitle: "London Underground",
    duration: "2:15:42",
    genre: "Circuit House / 128 BPM",
    description: "Peak-time energy for warehouse raves and dark rooms",
    image: "/images/dj/side.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
      { name: "Spotify", url: "#" },
    ]
  },
  {
    id: 3,
    title: "Tribal Foundations",
    subtitle: "Afro House Essential Mix",
    duration: "1:08:15",
    genre: "Afro House / 122 BPM",
    description: "Deep, soulful rhythms from Lagos to London",
    image: "/images/dj/front_casual.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
    ]
  },
  {
    id: 4,
    title: "After Hours Vyke",
    subtitle: "Sunrise Set",
    duration: "1:45:22",
    genre: "Deep Circuit / 120 BPM",
    description: "When the party winds down but the vibe continues",
    image: "/images/dj/main_dj.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
      { name: "Mixcloud", url: "#" },
    ]
  },
  {
    id: 5,
    title: "Festival Energy",
    subtitle: "Live from Ibiza",
    duration: "1:32:18",
    genre: "Circuit House / 126 BPM",
    description: "Main stage power for festival crowds",
    image: "/images/dj/secondary_dj.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
    ]
  },
  {
    id: 6,
    title: "Late Night Grooves",
    subtitle: "Studio Sessions Vol. 1",
    duration: "0:58:44",
    genre: "Afro Circuit / 124 BPM",
    description: "Intimate vibes recorded live in the studio",
    image: "/images/dj/side.jpeg",
    platforms: [
      { name: "SoundCloud", url: "#" },
      { name: "Spotify", url: "#" },
    ]
  },
]

export function FeaturedMixes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Section header */}
      <div className="px-4 md:px-8 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#e056c8] text-sm tracking-[0.3em] uppercase">Mixes</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold">
            Featured <span className="text-gradient-accent">Sets</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl">
            Curated mixes spanning Circuit House, Afro Circuit, and Afro House. 
            Each set tells a story—find your vibe.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrolling mix cards */}
      <motion.div 
        className="flex gap-6 px-4 md:px-8 lg:px-16 pb-8"
        style={{ x }}
      >
        {MIXES.map((mix, index) => (
          <motion.div
            key={mix.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-shrink-0 w-[350px] md:w-[400px] group"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden glossy-card">
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={mix.image}
                  alt={mix.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Genre badge */}
                <motion.div 
                  className="absolute top-6 left-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-3 py-1 text-xs font-medium bg-[#e056c8]/20 text-[#e056c8] rounded-full border border-[#e056c8]/30">
                    {mix.genre}
                  </span>
                </motion.div>

                {/* Play button - appears on hover */}
                <motion.button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl shadow-[#e056c8]/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.button>

                {/* Mix info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient-accent transition-all duration-300">
                    {mix.title}
                  </h3>
                  <p className="text-[#8b5cf6] text-sm font-medium">{mix.subtitle}</p>
                  <p className="text-white/60 text-sm line-clamp-2">{mix.description}</p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{mix.duration}</span>
                  </div>

                  {/* Platform links */}
                  <div className="flex gap-3 pt-4">
                    {mix.platforms.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/70 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10"
                      >
                        <Music className="w-3 h-3" />
                        {platform.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <div className="px-4 md:px-8 lg:px-16 mt-8">
        <div className="flex items-center gap-4 text-white/40 text-sm">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span>Scroll for more mixes</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
