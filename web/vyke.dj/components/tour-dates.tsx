'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { MapPin, Calendar, Ticket, ArrowRight } from 'lucide-react'

const GIGS = [
  {
    id: 1,
    date: "FEB 14",
    year: "2026",
    venue: "Fabric",
    city: "London, UK",
    country: "UK",
    event: "Valentine's Circuit Night",
    type: "Club",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke, Special Guest TBA"
  },
  {
    id: 2,
    date: "MAR 08",
    year: "2026",
    venue: "Ministry of Sound",
    city: "London, UK",
    country: "UK",
    event: "Afro House Sessions",
    type: "Club",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke, More TBA"
  },
  {
    id: 3,
    date: "APR 19",
    year: "2026",
    venue: "Printworks",
    city: "London, UK",
    country: "UK",
    event: "Spring Warehouse Party",
    type: "Warehouse",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke, International Headliner"
  },
  {
    id: 4,
    date: "MAY 24",
    year: "2026",
    venue: "Amnesia",
    city: "Ibiza, Spain",
    country: "ES",
    event: "Opening Weekend",
    type: "Festival",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke B2B, Resident DJs"
  },
  {
    id: 5,
    date: "JUN 21",
    year: "2026",
    venue: "Studio 338",
    city: "London, UK",
    country: "UK",
    event: "Summer Solstice Day Party",
    type: "Day Party",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke, Extended Set"
  },
  {
    id: 6,
    date: "JUL 12",
    year: "2026",
    venue: "DC-10",
    city: "Ibiza, Spain",
    country: "ES",
    event: "CircoLoco",
    type: "Festival",
    status: "upcoming",
    ticketUrl: "#",
    lineup: "Luke Vyke, Lineup TBA"
  },
]

export function TourDates() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const progressWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="orb orb-pink w-[600px] h-[600px] -left-40 bottom-0"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[#e056c8] text-sm tracking-[0.3em] uppercase">Tour</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold">
            Upcoming <span className="text-gradient-accent">Dates</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl">
            Catch me at clubs, warehouses, and festivals across the UK and beyond.
            More dates coming soon.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[100px] top-0 bottom-0 w-px bg-white/10 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#e056c8] to-[#8b5cf6]"
              style={{ height: progressWidth }}
            />
          </div>

          {/* Gigs list */}
          <div className="space-y-6">
            {GIGS.map((gig, index) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 rounded-2xl transition-all duration-300 hover:glossy-card">
                  {/* Date */}
                  <div className="flex-shrink-0 w-[100px] text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-gradient-accent">
                      {gig.date.split(' ')[0]}
                    </div>
                    <div className="text-sm text-white/50">{gig.date.split(' ')[1]}</div>
                    <div className="text-xs text-white/30">{gig.year}</div>
                  </div>

                  {/* Timeline dot - hidden on mobile */}
                  <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] animate-ping opacity-20" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient-accent transition-all">
                        {gig.event}
                      </h3>
                      <span className="px-2 py-0.5 text-xs bg-white/10 text-white/70 rounded">
                        {gig.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#e056c8]" />
                        {gig.venue}, {gig.city}
                      </span>
                    </div>

                    {gig.lineup && (
                      <p className="mt-2 text-xs text-white/40">
                        {gig.lineup}
                      </p>
                    )}
                  </div>

                  {/* Ticket button */}
                  <motion.a
                    href={gig.ticketUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] rounded-full text-sm font-medium text-white shadow-lg shadow-[#e056c8]/25 hover:shadow-xl hover:shadow-[#e056c8]/40 transition-shadow"
                  >
                    <Ticket className="w-4 h-4" />
                    Get Tickets
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More dates coming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-white/40 text-sm">
              More dates announced soon. Follow on Instagram for updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
