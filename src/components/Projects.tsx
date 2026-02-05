'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Play } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  stats?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category: 'web' | 'ml' | 'mobile' | 'tool'
}

interface ProjectCardProps {
  project: Project
  index: number
  layout?: 'grid' | 'featured'
}

function ProjectCard({ project, index, layout = 'grid' }: ProjectCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [isFlipped, setIsFlipped] = useState(false)

  const cardVariants = {
    grid: {
      hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }
      }
    },
    featured: {
      hidden: { 
        opacity: 0, 
        x: index % 2 === 0 ? -30 : 30, 
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay: index * 0.15,
          ease: "easeOut"
        }
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants[layout]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative group ${layout === 'featured' ? 'col-span-2' : ''}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full transition-all duration-300 cursor-pointer"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div 
          className="p-6 h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Project Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-400/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: techIndex * 0.1, duration: 0.4 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-3 py-1 bg-white/10 text-white/60 rounded-full text-xs font-medium">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
            {project.featured && (
              <motion.div 
                className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <span className="text-xs font-bold text-black">FEATURED</span>
              </motion.div>
            )}
          </div>

          {/* Project Description */}
          <p className="text-white/70 mb-6 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Project Stats */}
          {project.stats && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {project.stats.map((stat, statIndex) => (
                <motion.div 
                  key={statIndex} 
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + statIndex * 0.1, duration: 0.5 }}
                >
                  <div className="text-yellow-400 font-semibold text-sm">
                    {stat}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-yellow-400 text-black px-4 py-2 rounded-lg text-center font-medium hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-white/20 transition-colors duration-200 flex items-center justify-center gap-2 border border-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </motion.a>
            )}
          </div>

          {/* Hover Effect Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-yellow-400/5 to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 p-6 h-full bg-white/5 backdrop-blur-xl border border-white/10"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <motion.h4 
            className="text-lg font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Full Tech Stack
          </motion.h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05, duration: 0.4 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-white/60 text-sm mb-4">
              Click to flip back
            </p>
            <div className="w-12 h-12 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Play size={20} className="text-yellow-400" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FilterTabs({ 
  categories, 
  activeFilter, 
  onFilterChange 
}: {
  categories: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeFilter === category
              ? 'bg-yellow-400 text-black shadow-lg'
              : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
          }`}
          onClick={() => onFilterChange(category)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const projects: Project[] = [
    {
      id: '1',
      title: 'College Information Management App',
      description: 'Full-stack automation platform that streamlines administrative processes, reduces manual workload, and enhances data security through role-based authentication and real-time analytics.',
      image: '/projects/college-app.png',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
      stats: ['30% Workload Reduction', '40% Faster Queries', '95% Security Compliance'],
      category: 'web',
      featured: true,
      githubUrl: 'https://github.com/AkshayRaj367/college-management-app'
    },
    {
      id: '2',
      title: 'Game Smiths Club Website',
      description: 'Official club website deployed on college servers, featuring event management, member registration, and interactive gaming resources with real-time updates.',
      image: '/projects/gamesmiths.png',
      techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'PostgreSQL'],
      stats: ['2000+ Website Hits', '400+ Auditorium Presentation', '150+ Members'],
      category: 'web',
      featured: true,
      liveUrl: 'https://game-smiths-club.vercel.app',
      githubUrl: 'https://github.com/AkshayRaj367/gamesmiths-website'
    },
    {
      id: '3',
      title: 'QR Code Generator and Scanner',
      description: 'Secure QR code system with AES encryption for data protection, featuring real-time scanning, batch generation, and advanced error correction.',
      image: '/projects/qr-scanner.png',
      techStack: ['Python', 'OpenCV', 'PyQRCode', 'Tkinter', 'Cryptography'],
      stats: ['50% Usability Improvement', '25% Accuracy Boost', 'AES-256 Encryption'],
      category: 'tool',
      githubUrl: 'https://github.com/AkshayRaj367/qr-generator-scanner'
    },
    {
      id: '4',
      title: 'College Blog Website',
      description: 'Centralized blog portal for students and faculty with content management, user authentication, and real-time commenting system.',
      image: '/projects/college-blog.png',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Markdown'],
      category: 'web',
      liveUrl: 'https://gcet-blog.vercel.app',
      githubUrl: 'https://github.com/AkshayRaj367/college-blog'
    },
    {
      id: '5',
      title: 'AI Smart Glasses',
      description: 'Computer vision-powered smart glasses with real-time OCR, object detection, and text-to-speech capabilities for visually impaired users.',
      image: '/projects/ai-glasses.png',
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi', 'Flask'],
      stats: ['40% OCR Improvement', 'Real-time Processing', '95% Accuracy'],
      category: 'ml',
      githubUrl: 'https://github.com/AkshayRaj367/ai-smart-glasses'
    },
    {
      id: '6',
      title: '3D Virtual Herbal Garden',
      description: 'Immersive 3D educational experience showcasing medicinal plants with detailed information, interactive models, and AR integration.',
      image: '/projects/herbal-garden.png',
      techStack: ['Unity', 'C#', 'Blender', 'ARCore', 'Firebase'],
      stats: ['60% Storage Reduction', 'AR Integration', '3D Models'],
      category: 'mobile',
      githubUrl: 'https://github.com/AkshayRaj367/virtual-herbal-garden'
    }
  ]

  const categories = ['All', 'Web Development', 'Machine Learning', 'Mobile', 'Tools']
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => {
        const categoryMap: Record<string, string> = {
          'Web Development': 'web',
          'Machine Learning': 'ml',
          'Mobile': 'mobile',
          'Tools': 'tool'
        }
        return project.category === categoryMap[activeFilter]
      })

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-20 px-4 bg-black"
    >
      {/* Elegant Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-300/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, transparent 24%, rgba(250, 204, 21, 0.05) 25%, transparent 26%, transparent 74%, rgba(250, 204, 21, 0.05) 75%, transparent 76%)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ y, opacity }}
      >
        {/* Elegant Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Portfolio Showcase
          </h2>
          <p className="text-lg text-white/60 mb-6 max-w-2xl mx-auto">
            Explore my latest projects and technical achievements
          </p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="font-space text-2xl font-bold text-neon-cyan mb-8 text-center">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  layout="featured"
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <div>
            <h3 className="font-space text-2xl font-bold text-neon-cyan mb-8 text-center">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  layout="grid"
                />
              ))}
            </div>
          </div>
        )}

        {/* View More Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/AkshayRaj367"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-morphism px-8 py-4 rounded-full font-semibold text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
