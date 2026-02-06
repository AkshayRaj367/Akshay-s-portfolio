'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useInView as useInViewHook } from 'react-intersection-observer'
import ProfileCard from './ProfileCard'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ end, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInViewHook({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationId: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animationId = requestAnimationFrame(animate)
      
      return () => cancelAnimationFrame(animationId)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

interface SkillBarProps {
  skill: string
  level: number
  delay: number
}

function SkillBar({ skill, level, delay }: SkillBarProps) {
  const [width, setWidth] = useState(0)
  const { ref, inView } = useInViewHook({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setWidth(level)
      }, delay * 1000)
    }
  }, [inView, level, delay])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-space text-yellow-400">{skill}</span>
        <span className="font-inter text-yellow-300">{level}%</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden border border-yellow-400/30">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full relative overflow-hidden"
          style={{ width: `${width}%` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.5, delay }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  )
}

function FloatingTechIcon({ tech, x, y, delay }: { tech: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute text-neon-purple opacity-30 font-space text-sm"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {tech}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skills = [
    { name: "Full Stack Development", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "React/Next.js", level: 88 },
    { name: "Node.js/Express", level: 82 },
    { name: "Python/Django", level: 86 },
    { name: "Data Science", level: 84 },
  ]

  const stats = [
    { number: 8.93, suffix: " CGPA", label: "Academic Excellence" },
    { number: 10, suffix: "+", label: "Projects Completed" },
    { number: 6, suffix: "+", label: "Certifications" },
    { number: 400, suffix: "+", label: "Workshop Attendees" },
    { number: 2000, suffix: "+", label: "Website Hits" },
  ]

  const techIcons = ["React", "Node", "Python", "ML", "NLP", "MongoDB", "AWS", "Docker"]

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Background Elements - REMOVED */}
      {/* <div className="absolute inset-0">
        {techIcons.map((tech, index) => (
          <FloatingTechIcon
            key={tech}
            tech={tech}
            x={10 + (index % 4) * 20}
            y={20 + Math.floor(index / 4) * 30}
            delay={index * 0.5}
          />
        ))}
      </div> */}

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{ y, opacity }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-yellow-400 text-center">
            ABOUT ME
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </motion.div>

        {/* Bio Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20">
              <h3 className="font-space text-2xl font-semibold text-yellow-400 mb-4">
                Final Year BTech Student
              </h3>
              <p className="font-inter text-yellow-100 leading-relaxed mb-4">
                I am a final year Computer Science (Data Science) student at Geethanjali College 
                of Engineering and Technology, maintaining an impressive <span className="text-yellow-300 font-semibold">8.93 CGPA</span>. 
                My passion lies at the intersection of Full Stack Development and Artificial Intelligence, 
                where I build innovative solutions that bridge cutting-edge technology with real-world applications.
              </p>
              <p className="font-inter text-yellow-100 leading-relaxed">
                As a Google Student Ambassador and Secretary of Game Smiths Club, I actively contribute 
                to the tech community by conducting workshops and leading development initiatives. 
                My experience spans from building production-ready applications to conducting AI research 
                that achieves significant efficiency improvements.
              </p>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProfileCard
              name="P. MARIA BALA AKSHAY RAJ"
              title="Full Stack Developer"
              handle="@akshayraj"
              status="Available for Work"
              contactText="Contact Me"
              showUserInfo={true}
              showIcon={true}
              className="max-w-md"
              innerGradient=""
              miniAvatarUrl=""
              onContactClick={() => console.log('Contact clicked')}
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/50 backdrop-blur-sm p-6 rounded-xl text-center border border-yellow-400/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="font-inter text-sm text-yellow-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills & Achievements Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Skills Card */}
            <motion.div
              className="relative h-64 preserve-3d group"
              whileHover={{ rotateY: 10, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center backface-hidden border border-blue-400/30">
                <div className="text-center">
                  <motion.div
                    className="text-5xl mb-3 text-blue-400"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    ⚡
                  </motion.div>
                  <h3 className="font-space text-2xl font-bold text-white mb-2">Technical Skills</h3>
                  <p className="font-inter text-blue-200 text-sm">React, Node.js, Python, ML, NLP</p>
                </div>
              </div>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center border border-purple-400/30"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['React', 'Node', 'Python', 'ML', 'NLP', 'Next'].map((skill, i) => (
                      <motion.div
                        key={skill}
                        className="bg-white/10 rounded-lg p-2 text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <span className="text-xs text-purple-200">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="font-inter text-purple-200 text-xs">Advanced proficiency in modern web technologies</p>
                </div>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              className="relative h-64 preserve-3d group"
              whileHover={{ rotateY: -10, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center backface-hidden border border-green-400/30">
                <div className="text-center">
                  <motion.div
                    className="text-5xl mb-3 text-green-400"
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                  <h3 className="font-space text-2xl font-bold text-white mb-2">Experience</h3>
                  <p className="font-inter text-green-200 text-sm">2+ Years Building Production Apps</p>
                </div>
              </div>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center border border-emerald-400/30"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-teal-200">Frontend</span>
                      <span className="text-teal-400">Expert</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-teal-200">Backend</span>
                      <span className="text-teal-400">Advanced</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-teal-200">ML/AI</span>
                      <span className="text-teal-400">Proficient</span>
                    </div>
                  </div>
                  <p className="font-inter text-teal-200 text-xs">Full-stack development expertise</p>
                </div>
              </div>
            </motion.div>

            {/* Innovation Card */}
            <motion.div
              className="relative h-64 preserve-3d group"
              whileHover={{ rotateY: 15, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center backface-hidden border border-orange-400/30">
                <div className="text-center">
                  <motion.div
                    className="text-5xl mb-3 text-orange-400"
                    animate={{ 
                      scale: [1, 1.2, 1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    💡
                  </motion.div>
                  <h3 className="font-space text-2xl font-bold text-white mb-2">Innovation</h3>
                  <p className="font-inter text-orange-200 text-sm">60% Storage Reduction • 40% OCR Improvement</p>
                </div>
              </div>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center border border-red-400/30"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="space-y-3 mb-4">
                    <motion.div
                      className="w-16 h-16 bg-white/10 rounded-lg mx-auto flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity }}
                    >
                      <span className="text-2xl">🥽</span>
                    </motion.div>
                    <div className="w-16 h-16 bg-white/10 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                  </div>
                  <p className="font-inter text-red-200 text-xs">AI research and smart glasses development</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
