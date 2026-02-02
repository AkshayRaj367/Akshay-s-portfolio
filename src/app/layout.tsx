import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Orbitron } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import EnhancedNavigation from '@/components/EnhancedNavigation'
import ScrollProgress from '@/components/ScrollProgress'
import PageLoader from '@/components/PageLoader'
import CursorTrail from '@/components/CursorTrail'
import SimpleTestCursor from '@/components/SimpleTestCursor'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'Akshay Raj - Full Stack Developer & ML Engineer',
  description: 'Portfolio of P. Maria Bala Akshay Raj - BTech Computer Science student specializing in Full Stack Development, Machine Learning, and NLP',
  keywords: ['Full Stack Developer', 'Machine Learning', 'NLP', 'MERN Stack', 'React', 'Node.js', 'Python', 'Data Science'],
  authors: [{ name: 'P. Maria Bala Akshay Raj' }],
  openGraph: {
    title: 'P. Maria Bala Akshay Raj - Portfolio',
    description: 'Full Stack Developer & ML Engineer',
    type: 'website',
    url: 'https://akshay-portfolio.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} font-inter bg-black text-yellow-400 overflow-x-hidden`}>
        <PageLoader />
        <SmoothScroll />
        <ScrollProgress />
        <EnhancedNavigation />
        <SimpleTestCursor />
        {children}
      </body>
    </html>
  )
}
