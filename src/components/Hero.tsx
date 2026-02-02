'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Full Stack Developer | ML Engineer | NLP Specialist"
  const { scrollYProgress } = useScroll()
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })
  
  const backgroundY = useTransform(smoothScrollY, [0, 1], [0, -50])
  const textY = useTransform(smoothScrollY, [0, 1], [0, -30])
  const opacity = useTransform(smoothScrollY, [0, 0.5], [1, 0])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          className="font-orbitron text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-yellow-400 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          P. MARIA BALA
          <br />
          AKSHAY RAJ
        </motion.h1>
        
        <motion.h2
          className="font-space text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-yellow-300 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          BTech Computer Science (Data Science) Student
        </motion.h2>
        
        <motion.p
          className="font-inter text-lg md:text-xl mb-8 text-yellow-200 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Full Stack Developer | ML Engineer | NLP Specialist
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 text-center"
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
