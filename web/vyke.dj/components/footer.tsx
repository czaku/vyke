'use client'

import { motion } from 'framer-motion'
import { LukeVykeLogo } from './logo'
import { Instagram, Music, ExternalLink, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  music: [
    { label: 'SoundCloud', href: '#' },
    { label: 'Mixcloud', href: '#' },
    { label: 'Spotify', href: '#' },
    { label: 'Apple Music', href: '#' },
  ],
  connect: [
    { label: 'Instagram', href: 'https://instagram.com/lukevyke' },
    { label: 'Twitter', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Resident Advisor', href: '#' },
  ],
  info: [
    { label: 'Booking', href: 'mailto:bookings@lukevyke.com' },
    { label: 'Press Kit', href: '#' },
    { label: 'Tech Rider', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8 lg:px-16 border-t border-white/10">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e056c8] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LukeVykeLogo size="md" animated={false} />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Circuit House • Afro Circuit • Afro House<br />
              London-based DJ & producer
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a 
                href="https://instagram.com/lukevyke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#e056c8]/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white/70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#8b5cf6]/20 transition-colors"
              >
                <Music className="w-5 h-5 text-white/70" />
              </a>
              <a 
                href="mailto:bookings@lukevyke.com" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6366f1]/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-white/70" />
              </a>
            </div>
          </div>

          {/* Music links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wider uppercase">Music</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.music.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/50 hover:text-[#e056c8] transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wider uppercase">Connect</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white/50 hover:text-[#8b5cf6] transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wider uppercase">Info</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Luke Vyke. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Built with code, caffeine, and heavy basslines.
          </p>
        </div>
      </div>
    </footer>
  )
}
