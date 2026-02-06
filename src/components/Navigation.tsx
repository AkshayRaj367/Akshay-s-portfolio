'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Sun, Moon } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)

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

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real implementation, you would toggle a theme class on the body
    document.documentElement.classList.toggle('light')
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-morphism border-b border-white/10 backdrop-blur-md' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="#hero" 
                className="font-orbitron text-xl font-bold text-gradient cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#hero')
                }}
              >
                AKSHAY
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`font-inter text-sm font-medium transition-colors duration-300 hover:text-neon-cyan ${
                      activeSection === item.href.slice(1) 
                        ? 'text-neon-cyan' 
                        : 'text-gray-300'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass-morphism border border-white/20 hover:border-neon-cyan transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-neon-cyan" /> : <Moon className="w-4 h-4 text-neon-cyan" />}
              </motion.button>

              {/* Resume Download */}
              <motion.a
                href="https://drive.google.com/file/d/1I3ERis3vRLUb8gpe23IEuMTuQFVxDayK/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-morphism rounded-lg border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 text-neon-cyan font-inter text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass-morphism border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isOpen ? <X className="w-5 h-5 text-neon-cyan" /> : <Menu className="w-5 h-5 text-neon-cyan" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-dark-primary/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-64 glass-morphism border-l border-white/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <span className="font-orbitron text-lg font-bold text-gradient">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                  >
                    <X className="w-5 h-5 text-neon-cyan" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4">
                  <div className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg font-inter text-sm font-medium transition-all duration-300 hover:bg-neon-cyan/10 hover:text-neon-cyan ${
                          activeSection === item.href.slice(1) 
                            ? 'bg-neon-cyan/20 text-neon-cyan' 
                            : 'text-gray-300'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 space-y-3">
                  <motion.button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 glass-morphism rounded-lg border border-white/20 hover:border-neon-cyan transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-neon-cyan" /> : <Moon className="w-4 h-4 text-neon-cyan" />}
                    <span className="text-neon-cyan font-inter text-sm">Toggle Theme</span>
                  </motion.button>

                  <motion.a
                    href="https://drive.google.com/file/d/1I3ERis3vRLUb8gpe23IEuMTuQFVxDayK/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 glass-morphism rounded-lg border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 text-neon-cyan font-inter text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-cyan z-50 origin-left"
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
