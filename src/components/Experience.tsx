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
      x: isLeft ? -100 : 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Content Card */}
      <motion.div
        className="w-full md:w-5/12 glass-morphism rounded-xl p-6 cursor-pointer"
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${experience.color}20` }}
            >
              <div style={{ color: experience.color }}>
                {experience.icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan rounded-full text-xs font-space font-semibold">
                  {experience.type}
                </span>
              </div>
              <h3 className="font-space text-lg font-bold text-white">
                {experience.title}
              </h3>
              <p className="font-inter text-neon-blue font-semibold">
                {experience.organization}
              </p>
              <p className="font-inter text-gray-400 text-sm">
                {experience.role}
              </p>
            </div>
          </div>
        </div>

        {/* Period */}
        <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{experience.period}</span>
        </div>

        {/* Description */}
        <motion.div
          className="mb-4"
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "3rem" }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-inter text-gray-300 text-sm leading-relaxed overflow-hidden">
            {experience.description}
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            height: isExpanded ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-space text-sm font-semibold text-neon-cyan mb-2">
            Key Achievements
          </h4>
          <div className="space-y-2">
            {experience.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                <span className="font-inter text-xs text-gray-400">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.skills.slice(0, isExpanded ? experience.skills.length : 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-inter"
            >
              {skill}
            </span>
          ))}
          {!isExpanded && experience.skills.length > 3 && (
            <span className="px-2 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs font-inter">
              +{experience.skills.length - 3}
            </span>
          )}
        </div>

        {/* Expand Indicator */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-xs text-gray-500">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </span>
          <motion.div
            className="text-neon-cyan text-xs"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="relative flex items-center justify-center w-0 md:w-2/12 px-4">
        <motion.div
          className="w-4 h-4 bg-neon-cyan rounded-full relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-neon-cyan rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neon-cyan to-transparent -translate-y-1/2" />
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
      <div className="flex flex-col gap-3">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-neon-cyan/30"
            animate={{
              backgroundColor: index <= currentProgress ? '#00ffff' : 'rgba(0, 255, 255, 0.3)',
              scale: index === currentProgress ? 1.5 : 1
            }}
            transition={{ duration: 0.3 }}
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
      title: 'AI Research Team Lead',
      organization: 'HBIC Solutions',
      role: 'Research Intern',
      period: 'May 2025 - Present',
      description: 'Leading a 5-person AI research team focused on developing innovative machine learning solutions for real-world problems. Implementing cutting-edge algorithms and optimizing data storage.',
      achievements: [
        'Led team of 5 researchers',
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
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            JOURNEY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
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

        {/* Experience Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { number: '5', label: 'Leadership Roles', color: 'neon-cyan' },
            { number: '200+', label: 'Students Mentored', color: 'neon-purple' },
            { number: '10+', label: 'Workshops Conducted', color: 'neon-blue' },
            { number: '40%', label: 'Engagement Boost', color: 'neon-green' }
          ].map((stat, index) => (
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
            Every role and project has been a stepping stone in my journey of continuous learning and growth. 
            I'm passionate about leveraging technology to create meaningful impact and inspire others.
          </motion.p>
          <motion.button
            className="glass-morphism px-8 py-4 rounded-full font-semibold text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Connect and Collaborate
          </motion.button>
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
