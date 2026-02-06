import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Luke Vyke | DJ & Music Producer',
  description: 'Electronic music artist blending house, techno, and Afro-Caribbean rhythms. Experience the sound of Vyke.',
  keywords: ['DJ', 'House Music', 'Techno', 'Electronic Music', 'Luke Vyke'],
  openGraph: {
    title: 'Luke Vyke | DJ & Music Producer',
    description: 'Electronic music artist blending house, techno, and Afro-Caribbean rhythms.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
