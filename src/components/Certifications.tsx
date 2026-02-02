'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  image: string
  category: 'technical' | 'professional' | 'academic'
  skills: string[]
}

function CertificationCard({ 
  certification, 
  isActive, 
  index, 
  total 
}: { 
  certification: Certification
  isActive: boolean
  index: number
  total: number
}) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const cardAngle = (index - Math.floor(total / 2)) * 15
  const cardZ = isActive ? 100 : Math.abs(index - Math.floor(total / 2)) * -20

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: `rotateY(${cardAngle}deg) translateZ(${cardZ}px)`,
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateY: isActive ? 0 : cardAngle,
        translateZ: isActive ? 100 : cardZ,
        scale: isActive ? 1.1 : 0.9
      }}
      transition={{ 
        duration: 0.6, 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <motion.div
        className="glass-morphism rounded-xl p-8 w-full max-w-md h-full max-h-[600px] overflow-hidden cursor-pointer"
        whileHover={{ 
          y: -10,
          transition: { duration: 0.3 }
        }}
        initial={{ opacity: 0, rotateY: 180 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          rotateY: inView ? 0 : 180 
        }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Certificate Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-neon-cyan" />
              <span className="px-3 py-1 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan rounded-full text-xs font-space font-semibold">
                {certification.category}
              </span>
            </div>
            <h3 className="font-space text-xl font-bold text-white mb-2">
              {certification.title}
            </h3>
            <p className="font-inter text-neon-blue font-semibold mb-2">
              {certification.issuer}
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{certification.date}</span>
            </div>
          </div>
        </div>

        {/* Certificate Image */}
        <div className="relative mb-6 rounded-lg overflow-hidden bg-dark-secondary/50 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10"></div>
          <Award className="w-16 h-16 text-neon-cyan/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-space text-2xl font-bold text-neon-cyan/30">
              {certification.issuer.split(' ').map(word => word[0]).join('').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-space text-sm font-semibold text-gray-400 mb-3">
            Key Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-inter"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Credential ID */}
        {certification.credentialId && (
          <div className="mb-4">
            <p className="font-inter text-xs text-gray-400">
              Credential ID: <span className="text-neon-cyan">{certification.credentialId}</span>
            </p>
          </div>
        )}

        {/* View Certificate Button */}
        {certification.credentialUrl && (
          <motion.a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full glass-morphism px-4 py-3 rounded-lg text-center text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} />
            <span className="text-sm font-inter font-semibold">View Certificate</span>
          </motion.a>
        )}

        {/* Glow Effect */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-blue/20 opacity-50 pointer-events-none"></div>
        )}
      </motion.div>
    </motion.div>
  )
}

function CarouselControls({ 
  currentIndex, 
  total, 
  onPrevious, 
  onNext 
}: {
  currentIndex: number
  total: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.button
        onClick={onPrevious}
        className="glass-morphism p-3 rounded-full text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} />
      </motion.button>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-neon-cyan w-8' 
                : 'bg-neon-cyan/30'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="glass-morphism p-3 rounded-full text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentIndex === total - 1}
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  )
}

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Essential Automation Professional',
      issuer: 'Automation Anywhere',
      date: 'October 2024',
      credentialId: 'AAP-2024-104782',
      credentialUrl: 'https://certificates.automationanywhere.com/aap-2024-104782',
      image: '/certificates/automation-anywhere.png',
      category: 'technical',
      skills: ['RPA', 'Process Automation', 'Bot Development', 'Analytics']
    },
    {
      id: '2',
      title: 'SQL Advanced',
      issuer: 'HackerRank',
      date: 'October 2024',
      credentialId: 'HR-SQL-ADV-2024-104782',
      credentialUrl: 'https://www.hackerrank.com/certificates/sql-advanced-104782',
      image: '/certificates/sql-advanced.png',
      category: 'technical',
      skills: ['Advanced SQL', 'Database Design', 'Query Optimization', 'Data Analysis']
    },
    {
      id: '3',
      title: 'Data Analytics Job Simulation',
      issuer: 'Accenture',
      date: 'October 2024',
      credentialId: 'ACC-DA-2024-104782',
      credentialUrl: 'https://certificates.accenture.com/data-analytics-104782',
      image: '/certificates/accenture-data.png',
      category: 'professional',
      skills: ['Data Visualization', 'Statistical Analysis', 'Business Intelligence', 'Tableau']
    },
    {
      id: '4',
      title: 'Google Analytics',
      issuer: 'Google',
      date: 'October 2024',
      credentialId: 'GA-2024-104782',
      credentialUrl: 'https://skillshop.exceedlms.com/student/award/104782',
      image: '/certificates/google-analytics.png',
      category: 'technical',
      skills: ['Web Analytics', 'User Behavior', 'Conversion Tracking', 'SEO']
    },
    {
      id: '5',
      title: 'Digital Transformation',
      issuer: 'Google Cloud',
      date: 'October 2024',
      credentialId: 'GCC-DT-2024-104782',
      credentialUrl: 'https://www.cloudskillsboost.google/course_certificates/104782',
      image: '/certificates/google-cloud.png',
      category: 'professional',
      skills: ['Cloud Strategy', 'Digital Innovation', 'Change Management', 'Agile']
    },
    {
      id: '6',
      title: 'ML, NLP, PowerBI Internship',
      issuer: 'HBIC Solutions',
      date: 'May 2025',
      credentialId: 'HBIC-ML-2025-104782',
      credentialUrl: 'https://certificates.hbic.com/ml-nlp-internship-104782',
      image: '/certificates/hbic-internship.png',
      category: 'academic',
      skills: ['Machine Learning', 'NLP', 'Power BI', 'Data Engineering', 'Python']
    }
  ]

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(certifications.length - 1, prev + 1))
  }

  const visibleCertifications = certifications.slice(
    Math.max(0, currentIndex - 1),
    Math.min(certifications.length, currentIndex + 2)
  )

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
            CREDENTIALS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative h-[600px] mb-8" style={{ perspective: '1200px' }}>
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                isActive={index === currentIndex}
                index={index}
                total={certifications.length}
              />
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <CarouselControls
          currentIndex={currentIndex}
          total={certifications.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Certification Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { number: '6', label: 'Total Certifications', color: 'neon-cyan' },
            { number: '3', label: 'Technical Skills', color: 'neon-blue' },
            { number: '2', label: 'Professional Courses', color: 'neon-purple' },
            { number: '1', label: 'Industry Internship', color: 'neon-green' }
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

        {/* View All Credentials */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://linkedin.com/in/akshay-raj-367"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-morphism px-8 py-4 rounded-full font-semibold text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award size={20} />
            View All Credentials on LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
