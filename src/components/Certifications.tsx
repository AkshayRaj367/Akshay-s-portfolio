'use client'

import { useState, useRef, useEffect } from 'react'
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
  currentIndex,
  total 
}: { 
  certification: Certification
  isActive: boolean
  index: number
  currentIndex: number
  total: number
}) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  // Calculate if this card is in the center position
  const isCenterCard = index === currentIndex
  const isLeftCard = index === (currentIndex - 1 + total) % total
  const isRightCard = index === (currentIndex + 1) % total

  return (
    <motion.div
      ref={ref}
      className={`w-full max-w-md mx-auto transition-all duration-500 ${
        isCenterCard ? 'opacity-100 scale-100 z-20' : 
        isLeftCard || isRightCard ? 'opacity-80 scale-95 z-10' : 
        'opacity-50 scale-90 z-0'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isCenterCard ? 1 : isLeftCard || isRightCard ? 0.8 : 0.5,
        y: isCenterCard ? 0 : 20,
        scale: isCenterCard ? 1 : isLeftCard || isRightCard ? 0.95 : 0.9,
        zIndex: isCenterCard ? 20 : isLeftCard || isRightCard ? 10 : 0
      }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <motion.div
        className="bg-black/90 backdrop-blur-lg border-2 border-yellow-400/30 rounded-2xl p-8 h-full cursor-pointer"
        whileHover={{ 
          y: -10,
          borderColor: 'rgba(251, 191, 36, 0.6)',
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Certificate Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-bold uppercase">
                {certification.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              {certification.title}
            </h3>
            <p className="text-yellow-200 font-semibold mb-2">
              {certification.issuer}
            </p>
            <div className="flex items-center gap-2 text-yellow-300 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{certification.date}</span>
            </div>
          </div>
        </div>

        {/* Certificate Image */}
        <div className="relative mb-6 rounded-lg overflow-hidden bg-yellow-400/5 border border-yellow-400/20 h-48 flex items-center justify-center">
          <img 
            src={`https://drive.google.com/thumbnail?id=${certification.credentialUrl?.match(/\/d\/([^\/]+)/)?.[1]}&sz=w400`}
            alt={`${certification.title} Certificate`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10"></div>
                  <svg class="w-16 h-16 text-yellow-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-2xl font-bold text-yellow-400/20">
                      ${certification.issuer.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </span>
                  </div>
                `;
              }
            }}
            onLoad={(e) => {
              // Ensure image is visible when loaded
              const target = e.target as HTMLImageElement;
              target.style.display = 'block';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-yellow-600/5 pointer-events-none"></div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-yellow-300 mb-3">
            Key Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-400/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Credential ID */}
        {certification.credentialId && (
          <div className="mb-4">
            <p className="text-xs text-yellow-300">
              Credential ID: <span className="text-yellow-400 font-mono">{certification.credentialId}</span>
            </p>
          </div>
        )}

        {/* View Certificate Button */}
        {certification.credentialUrl && (
          <motion.a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-yellow-400/10 border-2 border-yellow-400/50 px-4 py-3 rounded-lg text-center text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} />
            <span className="text-sm">View Certificate</span>
          </motion.a>
        )}

        {/* Active Glow Effect */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-yellow-300/10 to-yellow-400/10 pointer-events-none"></div>
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
    <div className="flex items-center justify-center gap-6 mt-8">
      <motion.button
        onClick={onPrevious}
        className="bg-black/80 backdrop-blur-lg border-2 border-yellow-400/50 p-3 rounded-full text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={20} />
      </motion.button>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-yellow-400 w-8' 
                : 'bg-yellow-400/30 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="bg-black/80 backdrop-blur-lg border-2 border-yellow-400/50 p-3 rounded-full text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  )
}

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout>()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certifications.length)
      }, 4000) // Auto-scroll every 4 seconds
    }

    startAutoScroll()

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }

    const handleMouseLeave = () => {
      startAutoScroll()
    }

    const carouselElement = document.querySelector('#certifications-carousel')
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', handleMouseEnter)
      carouselElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', handleMouseEnter)
        carouselElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'SQL Advanced',
      issuer: 'HackerRank',
      date: 'October 2024',
      credentialId: 'HR-SQL-ADV-2024-104782',
      credentialUrl: 'https://drive.google.com/file/d/11Vyo87zrZbysacZzS_Yn2mNFfN5g3X3v/view',
      image: '/certificates/hackerrank-sql.png',
      category: 'technical',
      skills: ['Advanced SQL', 'Database Design', 'Query Optimization', 'Data Analysis']
    },
    {
      id: '2',
      title: 'Essential Automation Professional',
      issuer: 'Automation Anywhere',
      date: 'October 2024',
      credentialId: 'AAP-2024-104782',
      credentialUrl: 'https://drive.google.com/file/d/12n0RNef1PUvYvfROYfMjj9N59yaStZhu/view',
      image: '/certificates/automation-anywhere.png',
      category: 'technical',
      skills: ['RPA', 'Process Automation', 'Bot Development', 'Analytics']
    },
    {
      id: '3',
      title: 'Google Analytics',
      issuer: 'Google',
      date: 'October 2024',
      credentialId: 'GA-2024-104782',
      credentialUrl: 'https://drive.google.com/file/d/1hT4yjmawfsZKiDKrIJGxhds0alLtJYsW/view',
      image: '/certificates/google-analytics.png',
      category: 'technical',
      skills: ['Web Analytics', 'User Behavior', 'Conversion Tracking', 'SEO']
    },
    {
      id: '4',
      title: 'ML, NLP, PowerBI Internship',
      issuer: 'HBIC Solutions',
      date: 'May 2025',
      credentialId: 'HBIC-ML-2025-104782',
      credentialUrl: 'https://drive.google.com/file/d/1ScdOx7vr27N9RMe0tJ-j4K3xTFfiYKki/view',
      image: '/certificates/hbic-internship.png',
      category: 'academic',
      skills: ['Machine Learning', 'NLP', 'Power BI', 'Data Engineering', 'Python']
    },
    {
      id: '5',
      title: 'Digital Transformation',
      issuer: 'Google Cloud',
      date: 'October 2024',
      credentialId: 'GCC-DT-2024-104782',
      credentialUrl: 'https://drive.google.com/file/d/12n6LMvnUArC5bXiFQrLesYM3HOpHfyfS/view',
      image: '/certificates/google-cloud.png',
      category: 'professional',
      skills: ['Cloud Strategy', 'Digital Innovation', 'Change Management', 'Agile']
    },
    {
      id: '6',
      title: 'MongoDB Developer',
      issuer: 'MongoDB University',
      date: 'October 2024',
      credentialId: 'MDB-DEV-2024-104782',
      credentialUrl: 'https://drive.google.com/file/d/1zOzYgd2Y4li1rdgOzAD2eO1Na-duk6_1/view',
      image: '/certificates/mongodb.png',
      category: 'technical',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'Document Management']
    }
  ]

  const handlePrevious = () => {
    // Pause auto-scroll temporarily
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length)
    // Resume auto-scroll after 10 seconds
    setTimeout(() => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certifications.length)
      }, 4000)
    }, 10000)
  }

  const handleNext = () => {
    // Pause auto-scroll temporarily
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }
    setCurrentIndex((prev) => (prev + 1) % certifications.length)
    // Resume auto-scroll after 10 seconds
    setTimeout(() => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certifications.length)
      }, 4000)
    }, 10000)
  }

  // Create infinite loop by duplicating certifications multiple times for true infinity
  const infiniteCertifications = [...certifications, ...certifications, ...certifications, ...certifications, ...certifications]
  const adjustedIndex = currentIndex + (certifications.length * 2) // Start from the middle set

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl md:text-6xl mb-4 text-yellow-400 text-center">
              Certifications & Credentials
            </h2>
            <p className="text-lg text-yellow-200 mb-6 max-w-2xl mx-auto text-center">
              Professional certifications and credentials that validate my expertise and commitment to continuous learning
            </p>
            <div className="w-32 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </motion.div>

        {/* Dynamic Carousel */}
        <div id="certifications-carousel" className="relative max-w-6xl mx-auto mb-12">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out gap-6" 
                 style={{ transform: `translateX(-${adjustedIndex * 33.333}%)` }}>
              {infiniteCertifications.map((certification, index) => (
                <div key={`${certification.id}-${index}`} className="w-full md:w-1/3 flex-shrink-0">
                  <CertificationCard
                    certification={certification}
                    isActive={index % certifications.length === currentIndex}
                    index={index % certifications.length}
                    currentIndex={currentIndex}
                    total={certifications.length}
                  />
                </div>
              ))}
            </div>
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
            { number: '6', label: 'Total Certifications' },
            { number: '4', label: 'Technical Skills' },
            { number: '2', label: 'Professional Courses' },
            { number: '1', label: 'Industry Internship' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/80 backdrop-blur-lg border-2 border-yellow-400/30 rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: 'rgba(251, 191, 36, 0.6)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-yellow-200">
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
            className="bg-yellow-400/10 border-2 border-yellow-400/50 px-8 py-4 rounded-full font-semibold text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400 transition-all duration-300 inline-flex items-center gap-3"
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
