'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Users, Calendar, Award, Target, Zap, ChevronRight } from 'lucide-react'

interface ExperienceItem {
  id: string
  title: string
  organization: string
  role: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
  type: 'leadership' | 'technical' | 'community'
  icon: React.ReactNode
  color: string
}

function TimelineItem({ 
  experience, 
  index, 
  isLeft 
}: { 
  experience: ExperienceItem
  index: number
  isLeft: boolean
}) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -150 : 150,
      scale: 0.7,
      rotateY: isLeft ? -15 : 15,
      rotateZ: index % 2 === 0 ? -8 : 8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      transition: { 
        duration: 1.2, 
        delay: index * 0.3,
        type: "spring",
        stiffness: 70,
        damping: 20
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Content Card */}
      <motion.div
        className="w-full md:w-5/12 glass-morphism rounded-2xl p-8 cursor-pointer border border-yellow-400/20 transition-all duration-700"
        whileHover={{ 
          scale: 1.05,
          y: -12,
          rotateX: 5,
          boxShadow: '0 25px 50px rgba(251, 191, 36, 0.3)',
          borderColor: 'rgba(251, 191, 36, 0.5)',
          transition: { duration: 0.4 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-yellow-400/30"
              style={{ backgroundColor: `${experience.color}20` }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 360,
                borderColor: experience.color,
                transition: { duration: 0.6 }
              }}
            >
              <motion.div 
                style={{ color: experience.color }}
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.8 }}
              >
                {experience.icon}
              </motion.div>
            </motion.div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.span 
                  className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-orbitron font-semibold border border-yellow-400/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {experience.type}
                </motion.span>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-yellow-400 mb-1">
                {experience.title}
              </h3>
              <p className="font-inter text-yellow-300/90 font-semibold">
                {experience.organization}
              </p>
              <p className="font-inter text-gray-300 text-sm">
                {experience.role}
              </p>
            </div>
          </div>
        </div>

        {/* Period */}
        <div className="flex items-center gap-3 mb-6 text-gray-300 text-sm">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Calendar className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <span className="font-medium">{experience.period}</span>
        </div>

        {/* Description */}
        <motion.div
          className="mb-6 overflow-hidden"
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "4rem" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <p className="font-inter text-gray-300 text-sm leading-relaxed">
            {experience.description}
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            height: isExpanded ? "auto" : 0 
          }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="font-orbitron text-sm font-semibold text-yellow-400 mb-3">
            Key Achievements
          </h4>
          <div className="space-y-3">
            {experience.achievements.map((achievement, achIndex) => (
              <motion.div 
                key={achIndex} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isExpanded ? 1 : 0, 
                  x: isExpanded ? 0 : -20 
                }}
                transition={{ delay: achIndex * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mt-1.5 flex-shrink-0"
                  animate={{ 
                    scale: isExpanded ? [1, 1.3, 1] : 1,
                    opacity: isExpanded ? [1, 0.7, 1] : 0.7
                  }}
                  transition={{ duration: 2, repeat: isExpanded ? Infinity : 0 }}
                />
                <span className="font-inter text-xs text-gray-300">
                  {achievement}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {experience.skills.slice(0, isExpanded ? experience.skills.length : 3).map((skill, skillIndex) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-orbitron border border-yellow-400/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: skillIndex * 0.05 }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(251, 191, 36, 0.6)' }}
            >
              {skill}
            </motion.span>
          ))}
          {!isExpanded && experience.skills.length > 3 && (
            <motion.span 
              className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-orbitron border border-yellow-400/30"
              whileHover={{ scale: 1.05 }}
            >
              +{experience.skills.length - 3}
            </motion.span>
          )}
        </div>

        {/* Expand Indicator */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-xs text-gray-400">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
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
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          animate={{
            backgroundPosition: isExpanded ? '100% 0' : '0% 0',
          }}
          transition={{ duration: 1.5, repeat: isExpanded ? Infinity : 0 }}
        />
        
        {/* Enhanced Glow Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${experience.color}30, transparent)`,
            boxShadow: `0 0 40px ${experience.color}50`
          }}
          animate={{
            boxShadow: isExpanded ? `0 0 60px ${experience.color}60` : `0 0 40px ${experience.color}50`
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Timeline Dot */}
      <div className="relative flex items-center justify-center w-0 md:w-2/12 px-4">
        <motion.div
          className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full relative z-10 border-2 border-yellow-400/50"
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ delay: index * 0.3 + 0.5 }}
          whileHover={{ scale: 1.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-yellow-400 to-transparent -translate-y-1/2" />
      </div>

      {/* Empty Space for Alternating Layout */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  )
}

function ProgressIndicator({ 
  currentProgress, 
  totalItems 
}: { 
  currentProgress: number
  totalItems: number 
}) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
      <div className="flex flex-col gap-4">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full bg-yellow-400/30 border border-yellow-400/20"
            animate={{
              backgroundColor: index <= currentProgress ? '#fbbf24' : 'rgba(251, 191, 36, 0.3)',
              borderColor: index <= currentProgress ? '#fbbf24' : 'rgba(251, 191, 36, 0.2)',
              scale: index === currentProgress ? [1, 1.5, 1] : 1,
              boxShadow: index === currentProgress ? '0 0 20px rgba(251, 191, 36, 0.6)' : 'none'
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const [currentProgress, setCurrentProgress] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const experiences: ExperienceItem[] = [
    {
      id: '1',
      title: 'Google Student Ambassador',
      organization: 'Google',
      role: 'Campus Ambassador',
      period: '2024 - 2025',
      description: 'Selected as Google Student Ambassador to represent the college and conduct technical workshops, mentor students, and promote Google technologies. Organized and led multiple technical sessions.',
      achievements: [
        'Conducted workshops for 200+ students',
        'Organized Google Cloud Study Jams',
        'Mentored 50+ students in cloud technologies',
        'Built community of 100+ tech enthusiasts'
      ],
      skills: ['Public Speaking', 'Event Management', 'Cloud Computing', 'Mentorship', 'Community Building'],
      type: 'leadership',
      icon: <Award className="w-5 h-5" />,
      color: '#4285f4'
    },
    {
      id: '2',
      title: 'Secretary',
      organization: 'Game Smiths Club',
      role: 'Club Leadership',
      period: '2025 - 2026',
      description: 'Leading the Game Smiths Club with 150+ members, organizing gaming events, technical workshops, and game development competitions. Managing club operations and fostering innovation in game development.',
      achievements: [
        'Managed club of 150+ members',
        'Organized 10+ gaming events',
        'Conducted game development workshops',
        'Increased club engagement by 40%'
      ],
      skills: ['Leadership', 'Event Planning', 'Game Development', 'Team Management', 'Public Relations'],
      type: 'leadership',
      icon: <Users className="w-5 h-5" />,
      color: '#ff00ff'
    },
    {
      id: '3',
      title: 'AI Research ',
      organization: 'HBIC Solutions',
      role: 'Research Intern',
      period: 'May 2025 - Present',
      description: ' AI research team focused on developing innovative machine learning solutions for real-world problems. Implementing cutting-edge algorithms and optimizing data storage.',
      achievements: [
        'Achieved 60% storage reduction',
        'Improved OCR accuracy by 40%',
        'Published research findings'
      ],
      skills: ['Machine Learning', 'Team Leadership', 'Research', 'Python', 'Data Optimization'],
      type: 'technical',
      icon: <Target className="w-5 h-5" />,
      color: '#00ffff'
    },
    {
      id: '4',
      title: 'CSI Member',
      organization: 'Computer Society of India',
      role: 'Technical Member',
      period: '2023 - Present',
      description: 'Active member of CSI student chapter, conducting technical workshops on programming languages, AI/ML technologies, and organizing technical events for the student community.',
      achievements: [
        'Conducted R Programming workshops',
        'Organized AI/ML awareness sessions',
        'Participated in 10+ technical events',
        'Mentored junior students'
      ],
      skills: ['Technical Training', 'Workshop Organization', 'Programming', 'AI/ML', 'Mentoring'],
      type: 'community',
      icon: <Zap className="w-5 h-5" />,
      color: '#00ff00'
    },
    {
      id: '5',
      title: 'Gamified Study Scheduler',
      organization: 'Personal Project',
      role: 'Full Stack Developer',
      period: '2024',
      description: 'Developed a gamified study scheduler application that increased student engagement by 40% through interactive features, progress tracking, and reward systems.',
      achievements: [
        'Built full-stack application',
        'Achieved 40% engagement boost',
        'Implemented gamification features',
        'Served 100+ active users'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'Game Design', 'UX/UI'],
      type: 'technical',
      icon: <Briefcase className="w-5 h-5" />,
      color: '#ff0080'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="experience" 
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
              Professional Journey
            </span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black mb-6 tracking-wider">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              EXPERIENCE
            </span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A journey through leadership roles, technical challenges, and continuous growth in the tech industry
          </p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Elegant Experience Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {[
            { number: '5', label: 'Leadership Roles', color: 'yellow' },
            { number: '200+', label: 'Students Mentored', color: 'orange' },
            { number: '2+', label: 'Workshops Conducted', color: 'red' },
            { number: '40%', label: 'Engagement Boost', color: 'yellow' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-morphism p-8 rounded-2xl text-center border border-white/10 hover:border-yellow-400/30 transition-all duration-500"
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: '0 20px 40px rgba(251, 204, 21, 0.2)'
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
          className="text-center mt-20"
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
              Every role and project has been a stepping stone in my journey of continuous learning and growth. 
              I'm passionate about leveraging technology to create meaningful impact and inspire others.
            </p>
            <motion.button
              className="group relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Let's Connect and Collaborate</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Progress Indicator */}
      <ProgressIndicator 
        currentProgress={currentProgress} 
        totalItems={experiences.length} 
      />
    </section>
  )
}
