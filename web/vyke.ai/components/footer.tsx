'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Youtube, MessageCircle } from 'lucide-react'

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Download']
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Tutorials', 'API Reference', 'Community', 'Blog']
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact', 'Partners']
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'Cookies']
  }
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b4d8] flex items-center justify-center">
                <span className="text-black font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-lg">vyke.ai</span>
            </a>
            <p className="text-sm text-white/40 max-w-xs mb-6">
              AI-powered music production assistant. Built by producers, for producers.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            © 2026 vyke.ai. All rights reserved.
          </p>
          <p className="text-sm text-white/30">
            Made with ♥ by producers, for producers
          </p>
        </div>
      </div>
    </footer>
  )
}
