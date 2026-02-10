'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Sun, Moon } from 'lucide-react'
import PillNav from './PillNav'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Listen for loading completion
    const checkLoadingComplete = () => {
      const pageLoader = document.querySelector('[data-page-loaded]')
      if (pageLoader || !document.querySelector('.fixed.inset-0.z-50')) {
        setTimeout(() => setIsLoading(false), 100)
      }
    }

    // Check immediately and then periodically
    checkLoadingComplete()
    const interval = setInterval(checkLoadingComplete, 500)
    
    // Clean up interval after 10 seconds
    setTimeout(() => clearInterval(interval), 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real implementation, you would toggle a theme class on body
    document.documentElement.classList.toggle('light')
  }

  const handleMobileMenuClick = () => {
    // Handle mobile menu interactions if needed
  }

  // Convert nav items to PillNav format
  const pillNavItems = [
    { label: 'Home', href: '#hero' },
    ...navItems.map(item => ({
      label: item.name,
      href: item.href
    }))
  ]

  return (
    <>
      {/* PillNav Component - Only show after loading completes */}
      {!isLoading && (
        <div className={`fixed top-4 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-90'
        }`}>
          <PillNav
          logo={<span style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', color: '#000000' }}>A</span>}
          items={pillNavItems}
          activeHref={`#${activeSection}` || '#hero'}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#fbbf24"
          pillColor="#000000"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#fbbf24"
          onMobileMenuClick={handleMobileMenuClick}
          initialLoadAnimation={true}
        />
        </div>
      )}

      {/* Right Side Actions - Only show after loading completes */}
      {!isLoading && (
        <div className={`fixed top-4 right-4 z-[100] transition-all duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-90'
        }`}>
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full glass-morphism border border-white/10 hover:border-yellow-400 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-yellow-400" />}
          </motion.button>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-50 origin-left"
        style={{ scaleX: useScrollProgress() }}
      />
    </>
  )
}

// Hook for scroll progress
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(Math.min(progress, 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}
