'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

export function LukeVykeLogo({ size = 'md', animated = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, fontSize: 'text-sm' },
    md: { width: 48, height: 48, fontSize: 'text-lg' },
    lg: { width: 80, height: 80, fontSize: 'text-2xl' },
    xl: { width: 120, height: 120, fontSize: 'text-4xl' },
  }

  const { width, height, fontSize } = sizes[size]

  const LogoSVG = () => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glossy circular background */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e056c8" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f06bc9" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glossy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="white" result="specular">
            <fePointLight x="-50" y="-50" z="200" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular" />
          <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </defs>

      {/* Outer ring with gradient */}
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Inner filled circle with gradient */}
      <motion.circle
        cx="50"
      cy="50"
        r="40"
        fill="url(#logoGradient)"
        fillOpacity="0.15"
        initial={animated ? { scale: 0, opacity: 0 } : false}
        animate={animated ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* LV Monogram - Luke Vyke */}
      <motion.g
        initial={animated ? { opacity: 0, y: 10 } : false}
        animate={animated ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* L */}
        <path
          d="M28 35 L28 65 L42 65"
          stroke="url(#logoGradientLight)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
        />
        {/* V */}
        <path
          d="M48 35 L58 65 L68 35"
          stroke="url(#logoGradientLight)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
        />
      </motion.g>

      {/* Decorative dots */}
      <motion.circle
        cx="20"
        cy="50"
        r="3"
        fill="#e056c8"
        initial={animated ? { scale: 0 } : false}
        animate={animated ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
      <motion.circle
        cx="80"
        cy="50"
        r="3"
        fill="#8b5cf6"
        initial={animated ? { scale: 0 } : false}
        animate={animated ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
      <motion.circle
        cx="50"
        cy="20"
        r="3"
        fill="#6366f1"
        initial={animated ? { scale: 0 } : false}
        animate={animated ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 1 }}
      />
      <motion.circle
        cx="50"
        cy="80"
        r="3"
        fill="#f06bc9"
        initial={animated ? { scale: 0 } : false}
        animate={animated ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 1.1 }}
      />

      {/* Sound wave bars */}
      <motion.g
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={85 + i * 4}
            y={45 + (i % 2) * 5}
            width="2"
            height={10 - (i % 2) * 5}
            rx="1"
            fill="url(#logoGradient)"
            animate={animated ? {
              height: [10 - (i % 2) * 5, 15, 10 - (i % 2) * 5],
              y: [45 + (i % 2) * 5, 42.5, 45 + (i % 2) * 5]
            } : false}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.g>
    </svg>
  )

  if (size === 'xl') {
    return (
      <div className="flex flex-col items-center gap-4">
        <LogoSVG />
        <span className={`font-bold tracking-wider ${fontSize} text-gradient-accent`}>
          LUKE VYKE
        </span>
      </div>
    )
  }

  return <LogoSVG />
}

export function LogoWithText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LukeVykeLogo size="sm" animated={false} />
      <span className="font-bold text-lg tracking-wider text-white">
        LUKE<span className="text-gradient-accent">VYKE</span>
      </span>
    </div>
  )
}
