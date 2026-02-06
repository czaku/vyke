'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'

const tourDates = [
  {
    id: 1,
    date: "FEB 14",
    venue: " fabric",
    city: "London, UK",
    event: "Valentine's Warehouse",
    status: "on-sale",
    color: "#ff3366"
  },
  {
    id: 2,
    date: "FEB 28",
    venue: "Printworks",
    city: "London, UK",
    event: "Drumcode Night",
    status: "on-sale",
    color: "#8833ff"
  },
  {
    id: 3,
    date: "MAR 08",
    venue: "Berghain",
    city: "Berlin, DE",
    event: "Klubnacht",
    status: "sold-out",
    color: "#33ff88"
  },
  {
    id: 4,
    date: "MAR 15",
    venue: "Amnesia",
    city: "Ibiza, ES",
    event: "Opening Party",
    status: "on-sale",
    color: "#ffaa33"
  },
  {
    id: 5,
    date: "MAR 22",
    venue: "Warehouse Project",
    city: "Manchester, UK",
    event: "RESISTANCE",
    status: "on-sale",
    color: "#3388ff"
  }
]

export function TourDates() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%'])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] text-white/40 uppercase">Tour</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold">
            <span className="text-gradient">Upcoming Dates</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-0 md:left-32 top-0 bottom-0 w-px bg-white/10">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-pink-500"
              style={{ height: lineWidth }}
            />
          </div>

          {/* Tour dates */}
          <div className="space-y-8">
            {tourDates.map((gig, index) => (
              <motion.div
                key={gig.id}
                className="relative pl-8 md:pl-40 group cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 md:left-32 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white/30 bg-black group-hover:scale-150 transition-transform duration-300"
                  style={{ borderColor: gig.color }}
                />

                {/* Card */}
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Date */}
                    <div className="flex-shrink-0 w-24">
                      <p className="text-2xl md:text-3xl font-bold text-gradient-accent">{gig.date.split(' ')[0]}</p>
                      <p className="text-sm text-white/40">{gig.date.split(' ')[1]}</p>
                    </div>

                    {/* Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold group-hover:text-gradient-accent transition-all duration-300">
                        {gig.venue}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {gig.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {gig.event}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex-shrink-0">
                      {gig.status === 'sold-out' ? (
                        <span className="px-4 py-2 rounded-full bg-white/10 text-white/40 text-sm">
                          Sold Out
                        </span>
                      ) : (
                        <motion.button 
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm group/btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Get Tickets
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${gig.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <motion.div 
            className="pl-8 md:pl-40 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a href="#" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              View all dates
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
