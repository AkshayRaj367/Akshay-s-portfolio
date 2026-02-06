'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Particles from './Particles'
import TextType from './TextType'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 300, damping: 30 })
  
  const backgroundY = useTransform(smoothScrollY, [0, 1], [0, -50])
  const textY = useTransform(smoothScrollY, [0, 1], [0, -30])
  const opacity = useTransform(smoothScrollY, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        setIsVisible(isInView)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        {isVisible && (
          <Particles
            particleColors={["#facc15", "#fde047", "#fef3c7"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="w-full h-full"
          />
        )}
      </div>
      
      {/* Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          className="font-orbitron text-4xl md:text-6xl lg:text-8xl font-bold text-yellow-400 text-center leading-tight mb-8 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring" }}
        >
          P. MARIA BALA
          <br />
          AKSHAY RAJ
        </motion.h1>
        
        <motion.div
          className="text-xl md:text-2xl lg:text-3xl font-space font-semibold text-yellow-300 mb-12 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <TextType 
            text={[
              "Full Stack Developer",
              "Machine Learning Engineer", 
              "AI Innovation Architect"
            ]}
            typingSpeed={40}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            deletingSpeed={30}
            cursorBlinkDuration={0.3}
            variableSpeed={false}
            onSentenceComplete={() => {}}
            className="text-yellow-300"
          />
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
