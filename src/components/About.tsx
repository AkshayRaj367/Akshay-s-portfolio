'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useInView as useInViewHook } from 'react-intersection-observer'

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
        <span className="font-space text-neon-cyan">{skill}</span>
        <span className="font-inter text-neon-blue">{level}%</span>
      </div>
      <div className="w-full bg-dark-secondary rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full relative overflow-hidden"
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
      {/* Background Elements */}
      <div className="absolute inset-0">
        {techIcons.map((tech, index) => (
          <FloatingTechIcon
            key={tech}
            tech={tech}
            x={10 + (index % 4) * 20}
            y={20 + Math.floor(index / 4) * 30}
            delay={index * 0.5}
          />
        ))}
      </div>

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
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-gradient glow-text">
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
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-space text-2xl font-semibold text-neon-cyan mb-4">
                Final Year BTech Student
              </h3>
              <p className="font-inter text-gray-300 leading-relaxed mb-4">
                I am a final year Computer Science (Data Science) student at Geethanjali College 
                of Engineering and Technology, maintaining an impressive <span className="text-neon-blue font-semibold">8.93 CGPA</span>. 
                My passion lies at the intersection of Full Stack Development and Artificial Intelligence, 
                where I build innovative solutions that bridge cutting-edge technology with real-world applications.
              </p>
              <p className="font-inter text-gray-300 leading-relaxed">
                As a Google Student Ambassador and Secretary of the Game Smiths Club, I actively contribute 
                to the tech community by conducting workshops and leading development initiatives. 
                My experience spans from building production-ready applications to conducting AI research 
                that achieves significant efficiency improvements.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-space text-2xl font-semibold text-neon-cyan mb-6">
                Technical Expertise
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    delay={0.8 + index * 0.1}
                  />
                ))}
              </div>
            </div>
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
              className="glass-morphism p-6 rounded-xl text-center card-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="font-inter text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Card Flip Section */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              front: "🚀 Innovation",
              back: "Led AI research team achieving 60% storage reduction and 40% OCR improvement in smart glasses project"
            },
            {
              front: "🎯 Leadership",
              back: "Google Student Ambassador conducting workshops for 200+ students and Secretary of Game Smiths Club with 150+ members"
            },
            {
              front: "💡 Problem Solver",
              back: "Built gamified study scheduler increasing engagement by 40% and college automation platform reducing workload by 30%"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative h-48 preserve-3d"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 glass-morphism rounded-xl p-6 flex items-center justify-center backface-hidden">
                <div className="text-center">
                  <div className="text-4xl mb-4">{item.front.split(' ')[0]}</div>
                  <div className="font-space text-xl text-neon-cyan">{item.front.split(' ')[1]}</div>
                </div>
              </div>
              <div 
                className="absolute inset-0 glass-morphism rounded-xl p-6 flex items-center justify-center"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <p className="font-inter text-sm text-gray-300 text-center">
                  {item.back}
                </p>
              </div>
            </motion.div>
          ))}
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
