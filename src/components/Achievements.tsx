'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trophy, Medal, Star, Award, Target, Zap } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  competition: string
  date: string
  position: string
  description: string
  stats: string[]
  category: 'hackathon' | 'presentation' | 'competition' | 'leadership'
  icon: React.ReactNode
  color: string
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -15,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative group"
    >
      <motion.div
        className="glass-morphism rounded-xl p-6 h-full cursor-pointer transition-all duration-500"
        whileHover={{ 
          y: -10,
          scale: 1.02,
          rotateX: 5,
          transition: { duration: 0.3 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Achievement Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${achievement.color}20` }}
            >
              <div style={{ color: achievement.color }}>
                {achievement.icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan rounded-full text-xs font-space font-semibold">
                  {achievement.category}
                </span>
                <span className="text-xs font-space text-neon-purple font-bold">
                  {achievement.position}
                </span>
              </div>
              <h3 className="font-space text-lg font-bold text-white">
                {achievement.title}
              </h3>
              <p className="font-inter text-neon-blue text-sm">
                {achievement.competition}
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Description */}
        <motion.div
          className="mb-4"
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "3rem" }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-inter text-gray-300 text-sm leading-relaxed overflow-hidden">
            {achievement.description}
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 gap-2 mb-4">
          {achievement.stats.map((stat, statIndex) => (
            <motion.div
              key={statIndex}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0.7, 
                x: isExpanded ? 0 : -10 
              }}
              transition={{ delay: statIndex * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
              <span className="font-inter text-xs text-gray-400">
                {stat}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-xs text-gray-500">
            {achievement.date}
          </span>
          <motion.div
            className="text-neon-cyan text-xs font-space"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${achievement.color}20, transparent)`,
            boxShadow: `0 0 30px ${achievement.color}40`
          }}
        ></div>
      </motion.div>
    </motion.div>
  )
}

function TrophyPodium() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      className="relative h-64 mb-12 flex items-end justify-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Podium */}
      <div className="flex items-end gap-4">
        <motion.div
          className="glass-morphism w-20 h-32 rounded-t-lg flex flex-col items-center justify-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Medal className="w-8 h-8 text-neon-purple mb-2" />
          <span className="font-space font-bold text-neon-purple">2nd</span>
        </motion.div>
        
        <motion.div
          className="glass-morphism w-24 h-40 rounded-t-lg flex flex-col items-center justify-center border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,255,255,0.5)]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Trophy className="w-10 h-10 text-neon-cyan mb-2" />
          <span className="font-space font-bold text-neon-cyan">1st</span>
        </motion.div>
        
        <motion.div
          className="glass-morphism w-20 h-24 rounded-t-lg flex flex-col items-center justify-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Award className="w-8 h-8 text-neon-blue mb-2" />
          <span className="font-space font-bold text-neon-blue">3rd</span>
        </motion.div>
      </div>

      {/* Confetti Animation */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#00ffff', '#ff00ff', '#0080ff', '#00ff00', '#ff0080'][index % 5],
                left: `${Math.random() * 100}%`,
                top: `-10px`
              }}
              animate={{
                y: [0, 250],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Carbon Emissions Research',
      competition: 'Paper Presentation 2024',
      date: 'March 2024',
      position: '1st Place',
      description: 'Research paper on innovative carbon reduction strategies using AI and IoT technologies. Developed a predictive model that achieved 20% reduction in carbon emissions through optimized energy consumption patterns.',
      stats: ['20% Carbon Reduction', 'AI-Powered Analytics', 'IoT Integration', 'Published Research'],
      category: 'presentation',
      icon: <Star className="w-6 h-6" />,
      color: '#00ffff'
    },
    {
      id: '2',
      title: 'AI Smart Glasses',
      competition: 'Geenovate 2024',
      date: 'April 2024',
      position: 'Top 10',
      description: 'Developed computer vision-powered smart glasses for visually impaired users with real-time OCR, object detection, and text-to-speech capabilities. Achieved significant improvements in accuracy and processing speed.',
      stats: ['40% OCR Improvement', 'Real-time Processing', '95% Accuracy', 'Social Impact Award'],
      category: 'competition',
      icon: <Target className="w-6 h-6" />,
      color: '#ff00ff'
    },
    {
      id: '3',
      title: '3D Virtual Herbal Garden',
      competition: 'Smart India Hackathon 2024',
      date: 'July 2024',
      position: 'Top 20',
      description: 'Created an immersive 3D educational platform showcasing medicinal plants with AR integration. Implemented efficient data storage solutions and interactive 3D models for enhanced learning.',
      stats: ['60% Storage Reduction', 'AR Integration', '3D Models', 'Educational Innovation'],
      category: 'hackathon',
      icon: <Trophy className="w-6 h-6" />,
      color: '#0080ff'
    },
    {
      id: '4',
      title: 'College ERP System',
      competition: 'Smart India Hackathon 2025',
      date: 'January 2025',
      position: 'Top 40',
      description: 'Comprehensive college management system with automated workflows, real-time analytics, and mobile accessibility. Features include attendance tracking, grade management, and resource scheduling.',
      stats: ['National Level', '3000+ Participants', 'Innovation Track', 'Industry Mentors'],
      category: 'hackathon',
      icon: <Zap className="w-6 h-6" />,
      color: '#00ff00'
    }
  ]

  const achievementStats = [
    { number: '4', label: 'Major Achievements', color: 'neon-cyan' },
    { number: '2', label: 'National Hackathons', color: 'neon-purple' },
    { number: '1', label: 'Research Publication', color: 'neon-blue' },
    { number: '20%', label: 'Carbon Reduction Impact', color: 'neon-green' }
  ]

  return (
    <section 
      ref={sectionRef}
      id="achievements" 
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
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
            HALL OF FAME
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </motion.div>

        {/* Trophy Podium */}
        <TrophyPodium />

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {achievementStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-morphism p-6 rounded-xl text-center card-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`font-orbitron text-3xl md:text-4xl font-bold text-gradient mb-2 bg-gradient-to-r from-${stat.color} to-neon-purple`}>
                {stat.number}
              </div>
              <div className="font-inter text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-inter text-gray-400 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Every achievement represents a step towards innovation and excellence. 
            I'm always seeking new challenges to push the boundaries of technology and create meaningful impact.
          </motion.p>
          <motion.button
            className="glass-morphism px-8 py-4 rounded-full font-semibold text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Collaborate on Something Amazing
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
