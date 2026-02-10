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
      scale: 0.8,
      rotateZ: index % 2 === 0 ? -5 : 5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      rotateZ: 0,
      transition: { 
        duration: 1, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
        damping: 15
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
        className="glass-morphism rounded-2xl p-8 h-full cursor-pointer transition-all duration-700 border border-yellow-400/20"
        whileHover={{ 
          y: -15,
          scale: 1.03,
          rotateX: 8,
          boxShadow: '0 25px 50px rgba(251, 191, 36, 0.3)',
          borderColor: 'rgba(251, 191, 36, 0.5)',
          transition: { duration: 0.4 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Achievement Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-yellow-400/30"
              style={{ backgroundColor: `${achievement.color}20` }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                borderColor: achievement.color,
                transition: { duration: 0.6 }
              }}
            >
              <motion.div 
                style={{ color: achievement.color }}
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                {achievement.icon}
              </motion.div>
            </motion.div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.span 
                  className="px-4 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-orbitron font-semibold border border-yellow-400/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {achievement.category}
                </motion.span>
                <motion.span 
                  className="text-xs font-orbitron text-yellow-300 font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {achievement.position}
                </motion.span>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-yellow-400 mb-1">
                {achievement.title}
              </h3>
              <p className="font-inter text-yellow-300/80 text-sm">
                {achievement.competition}
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Description */}
        <motion.div
          className="mb-6 overflow-hidden"
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "4rem" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <p className="font-inter text-gray-300 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {achievement.stats.map((stat, statIndex) => (
            <motion.div
              key={statIndex}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0.7, 
                x: isExpanded ? 0 : -10 
              }}
              transition={{ delay: statIndex * 0.15 }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                animate={{ 
                  scale: isExpanded ? [1, 1.2, 1] : 1,
                  opacity: isExpanded ? [1, 0.7, 1] : 0.7
                }}
                transition={{ duration: 2, repeat: isExpanded ? Infinity : 0 }}
              />
              <span className="font-inter text-xs text-gray-300">
                {stat}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-xs text-gray-400">
            {achievement.date}
          </span>
          <motion.div
            className="text-yellow-400 text-xs font-orbitron"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            ↓
          </motion.div>
        </div>

        {/* Enhanced Shine Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          animate={{
            backgroundPosition: isExpanded ? '100% 0' : '0% 0',
          }}
          transition={{ duration: 1.5, repeat: isExpanded ? Infinity : 0 }}
        />
        
        {/* Enhanced Glow Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${achievement.color}30, transparent)`,
            boxShadow: `0 0 40px ${achievement.color}50`
          }}
          animate={{
            boxShadow: isExpanded ? `0 0 60px ${achievement.color}60` : `0 0 40px ${achievement.color}50`
          }}
          transition={{ duration: 0.6 }}
        />
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
      className="relative h-64 mb-16 flex items-end justify-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      {/* Podium */}
      <div className="flex items-end gap-6">
        <motion.div
          className="glass-morphism w-24 h-36 rounded-t-lg flex flex-col items-center justify-center border border-yellow-400/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)' }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Medal className="w-10 h-10 text-yellow-300 mb-3" />
          </motion.div>
          <span className="font-orbitron font-bold text-yellow-300 text-lg">2nd</span>
        </motion.div>
        
        <motion.div
          className="glass-morphism w-28 h-44 rounded-t-lg flex flex-col items-center justify-center border-2 border-yellow-400 shadow-[0_0_40px_rgba(251,191,36,0.5)]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ 
            y: -15, 
            scale: 1.05,
            boxShadow: '0 30px 60px rgba(251, 191, 36, 0.6)' 
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Trophy className="w-12 h-12 text-yellow-400 mb-3" />
          </motion.div>
          <span className="font-orbitron font-bold text-yellow-400 text-xl">1st</span>
        </motion.div>
        
        <motion.div
          className="glass-morphism w-24 h-28 rounded-t-lg flex flex-col items-center justify-center border border-yellow-400/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)' }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Award className="w-10 h-10 text-yellow-200 mb-3" />
          </motion.div>
          <span className="font-orbitron font-bold text-yellow-200 text-lg">3rd</span>
        </motion.div>
      </div>

      {/* Enhanced Confetti Animation */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#fbbf24', '#f59e0b', '#f97316', '#ea580c', '#dc2626'][index % 5],
                left: `${Math.random() * 100}%`,
                top: `-10px`
              }}
              animate={{
                y: [0, 300],
                x: [0, (Math.random() - 0.5) * 150],
                rotate: [0, 720],
                scale: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
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
      className="relative min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Elegant Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle gradient orbs */}
        <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-tr from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Elegant grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, transparent 24%, rgba(250, 204, 21, 0.03) 25%, transparent 26%, transparent 74%, rgba(250, 204, 21, 0.03) 75%, transparent 76%)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ y, opacity }}
      >
        {/* Elegant Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-6">
            <span className="font-inter text-sm font-medium text-yellow-400/80 tracking-widest uppercase">
              Achievements & Recognition
            </span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black mb-6 tracking-wider">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              HALL OF FAME
            </span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A collection of milestones that mark the journey of innovation, perseverance, and excellence
          </p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Trophy Podium */}
        <TrophyPodium />

        {/* Elegant Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        {/* Elegant Achievement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {achievementStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-morphism p-8 rounded-2xl text-center border border-white/10 hover:border-yellow-400/30 transition-all duration-500"
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: '0 20px 40px rgba(250, 204, 21, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-orbitron text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="font-inter text-sm text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Elegant Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-inter text-gray-300 text-lg leading-relaxed mb-8">
              Every achievement represents a step towards innovation and excellence. 
              I'm always seeking new challenges to push the boundaries of technology and create meaningful impact.
            </p>
            <motion.button
              className="group relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Let's Collaborate on Something Amazing</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
