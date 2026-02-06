import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space'
})

export const metadata: Metadata = {
  title: 'vyke.ai | AI Music Production Platform',
  description: 'The intelligent music production assistant. Analyze, produce, and perform with AI-powered tools built for modern producers.',
  keywords: ['AI Music', 'Music Production', 'Ableton', 'VST Plugin', 'Electronic Music'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
