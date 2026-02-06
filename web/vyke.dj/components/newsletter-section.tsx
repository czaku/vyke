'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, Instagram, Music, ExternalLink } from 'lucide-react'
import { LukeVykeLogo } from './logo'

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/lukevyke', color: '#e056c8' },
  { name: 'SoundCloud', icon: Music, url: '#', color: '#8b5cf6' },
  { name: 'Mixcloud', icon: ExternalLink, url: '#', color: '#6366f1' },
]

export function NewsletterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="orb orb-pink w-[500px] h-[500px] left-1/4 top-1/4"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="orb orb-purple w-[600px] h-[600px] right-0 bottom-0"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="orb orb-blue w-[400px] h-[400px] left-0 bottom-1/4"
          animate={{ 
            x: [0, 60, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <LukeVykeLogo size="xl" animated={true} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Stay in the <span className="text-gradient-accent">Loop</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg mb-12 max-w-xl mx-auto"
          >
            Get notified about new mixes, upcoming shows, and exclusive content.
            No spam, just vibes.
          </motion.p>

          {/* Newsletter form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-md mx-auto mb-16"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 glossy-card rounded-2xl text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-white/60 text-sm">Watch your inbox for updates from Luke Vyke.</p>
              </motion.div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] rounded-full blur-xl opacity-30" />
                <div className="relative flex gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/40 outline-none text-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 bg-gradient-to-r from-[#e056c8] to-[#8b5cf6] rounded-full font-medium text-white text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[#e056c8]/30 transition-shadow disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-14 h-14 rounded-2xl glossy-card flex items-center justify-center transition-all duration-300 hover:border-[color:var(--social-color)]"
                style={{ '--social-color': social.color } as React.CSSProperties}
              >
                <social.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 rounded-lg text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Booking inquiry */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 pt-16 border-t border-white/10"
          >
            <p className="text-white/40 text-sm">
              For booking inquiries:{' '}
              <a 
                href="mailto:bookings@lukevyke.com" 
                className="text-[#e056c8] hover:text-[#f06bc9] transition-colors underline underline-offset-4"
              >
                bookings@lukevyke.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
