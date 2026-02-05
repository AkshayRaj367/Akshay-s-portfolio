'use client'

import { useState, useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillNode {
  name: string
  level: number
  category: string
  color: string
  icon?: string
}

// Category color gradients - Updated to yellow/black theme
const categoryColors = {
  'All': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  'Programming': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  'Web Development': 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)',
  'AI/ML': 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
  'Cloud & DevOps': 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%)',
  '3D Development': 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
  'Tools': 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
}

interface SkillCardProps {
  skill: SkillNode
  index: number
  isSelected: boolean
  onClick: () => void
  categoryColor: string
}

function SkillCard({ skill, index, isSelected, onClick, categoryColor }: SkillCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ 
        y: -12,
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-black/90 backdrop-blur-lg border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 overflow-hidden group ${
        isSelected 
          ? 'border-yellow-400 shadow-[0_20px_60px_rgba(251,191,36,0.4)]' 
          : 'border-yellow-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(251,191,36,0.2)]'
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-400/5"></div>
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* Animated Skill Icon */}
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm bg-yellow-400 shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {skill.name.charAt(0)}
          </motion.div>
          <div>
            <h3 className="font-bold text-yellow-400 text-lg">
              {skill.name}
            </h3>
            <p className="text-xs text-yellow-300/70">{skill.category}</p>
          </div>
        </div>
        {/* Animated Status Indicator */}
        <motion.div 
          className="w-4 h-4 rounded-full shadow-sm relative"
          style={{ 
            backgroundColor: skill.color,
            boxShadow: `0 0 12px ${skill.color}60`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: skill.color, opacity: 0.3 }}></div>
        </motion.div>
      </div>
      
      {/* Enhanced Proficiency Display */}
      <div className="mb-4 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-yellow-200 font-medium">Proficiency</span>
          <motion.span 
            className="text-xl font-bold text-yellow-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-yellow-400/30 relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              background: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']
            }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.level}%` : 0 }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          >
            {/* Multiple Shimmer Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent animate-pulse"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            {/* Progress Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full blur-sm"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced Category Badge */}
      <div className="inline-block relative z-10">
        <motion.span 
          className="px-4 py-2 rounded-full text-xs font-bold border relative overflow-hidden"
          style={{
            background: `${categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']}20`,
            borderColor: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools'],
            color: '#FBBF24'
          }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">{skill.category}</span>
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
            style={{
              background: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']
            }}
          />
        </motion.span>
      </div>

      {/* Hover Effect Overlay */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-yellow-400/10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

function CategoryTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          className={`relative px-6 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden group ${
            activeCategory === category
              ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
              : 'bg-black/80 backdrop-blur text-yellow-400 border-2 border-yellow-400/50 hover:transform hover:scale-105'
          }`}
          onClick={() => onCategoryChange(category)}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -3,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated Background for Active Tab */}
          {activeCategory === category && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {/* Hover Background */}
          {activeCategory !== category && (
            <motion.div
              className="absolute inset-0 bg-yellow-400/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
          
          <span className="relative z-10">{category}</span>
          
          {/* Active Indicator */}
          {activeCategory === category && (
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-600 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const allSkills: SkillNode[] = [
    // Programming Languages
    { name: 'Python', level: 90, category: 'Programming', color: '#3776ab' },
    { name: 'JavaScript', level: 88, category: 'Programming', color: '#f7df1e' },
    { name: 'TypeScript', level: 85, category: 'Programming', color: '#3178c6' },
    { name: 'Java', level: 75, category: 'Programming', color: '#007396' },
    { name: 'C++', level: 70, category: 'Programming', color: '#00599c' },
    
    // Web Development
    { name: 'React', level: 92, category: 'Web Development', color: '#61dafb' },
    { name: 'Next.js', level: 88, category: 'Web Development', color: '#000000' },
    { name: 'Node.js', level: 85, category: 'Web Development', color: '#339933' },
    { name: 'Express', level: 82, category: 'Web Development', color: '#000000' },
    { name: 'MongoDB', level: 80, category: 'Web Development', color: '#47a248' },
    { name: 'PostgreSQL', level: 78, category: 'Web Development', color: '#336791' },
    { name: 'HTML/CSS', level: 90, category: 'Web Development', color: '#e34c26' },
    
    // AI/ML
    { name: 'TensorFlow', level: 85, category: 'AI/ML', color: '#ff6f00' },
    { name: 'PyTorch', level: 82, category: 'AI/ML', color: '#ee4c2c' },
    { name: 'Scikit-learn', level: 88, category: 'AI/ML', color: '#f7931e' },
    { name: 'NLTK', level: 80, category: 'AI/ML', color: '#0096d6' },
    { name: 'OpenCV', level: 75, category: 'AI/ML', color: '#5c3ee5' },
    { name: 'Machine Learning', level: 85, category: 'AI/ML', color: '#ff6384' },
    
    // Cloud & DevOps
    { name: 'AWS', level: 78, category: 'Cloud & DevOps', color: '#ff9900' },
    { name: 'Docker', level: 75, category: 'Cloud & DevOps', color: '#2496ed' },
    { name: 'Git', level: 90, category: 'Cloud & DevOps', color: '#f05032' },
    { name: 'CI/CD', level: 70, category: 'Cloud & DevOps', color: '#ff6b6b' },
    
    // 3D Development
    { name: 'Three.js', level: 80, category: '3D Development', color: '#000000' },
    { name: 'Unreal Engine', level: 75, category: '3D Development', color: '#313131' },
    { name: 'Blender', level: 70, category: '3D Development', color: '#ea7600' },
    { name: 'Autodesk Maya', level: 65, category: '3D Development', color: '#00a4ef' },
    { name: 'Substance Painter', level: 68, category: '3D Development', color: '#ff4e4e' },
    
    // Tools
    { name: 'Power BI', level: 82, category: 'Tools', color: '#f2c811' },
    { name: 'Google Analytics', level: 78, category: 'Tools', color: '#ff6b00' },
    { name: 'Tableau', level: 78, category: 'Tools', color: '#e97627' },
    { name: 'Figma', level: 85, category: 'Tools', color: '#f24e1e' },
  ]

  const categories = ['All', ...Array.from(new Set(allSkills.map(skill => skill.category)))]
  
  const filteredSkills = activeCategory === 'All' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory)

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-black"
    >
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ y, opacity }}
      >
        {/* Enhanced Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-bold text-5xl md:text-6xl mb-4 text-yellow-400 relative"
            whileHover={{ scale: 1.05 }}
          >
            Skills & Expertise
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-yellow-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg text-yellow-200 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </motion.p>
          <motion.div 
            className="w-32 h-1 bg-yellow-400 mx-auto rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Tech Stack Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">
            Tech Stack
          </h3>
          <div className="text-center text-white/60">
            Tech stack carousel component coming soon...
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isSelected={selectedSkill === skill.name}
              onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
              categoryColor={categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']}
            />
          ))}
        </div>

        {/* Enhanced Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-yellow-400/30 relative overflow-hidden group"
            whileHover={{ 
              y: -5, 
              scale: 1.05,
              borderColor: '#facc15'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-3xl font-bold text-yellow-400 mb-2 relative z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              {allSkills.length}
            </motion.div>
            <div className="text-yellow-200 relative z-10">Total Skills</div>
          </motion.div>
          
          <motion.div 
            className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-yellow-400/30 relative overflow-hidden group"
            whileHover={{ 
              y: -5, 
              scale: 1.05,
              borderColor: '#facc15'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-3xl font-bold text-yellow-400 mb-2 relative z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            >
              {categories.length - 1}
            </motion.div>
            <div className="text-yellow-200 relative z-10">Categories</div>
          </motion.div>
          
          <motion.div 
            className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-yellow-400/30 relative overflow-hidden group"
            whileHover={{ 
              y: -5, 
              scale: 1.05,
              borderColor: '#facc15'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-3xl font-bold text-yellow-400 mb-2 relative z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            >
              {Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length)}%
            </motion.div>
            <div className="text-yellow-200 relative z-10">Avg. Proficiency</div>
          </motion.div>
          
          <motion.div 
            className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-yellow-400/30 relative overflow-hidden group"
            whileHover={{ 
              y: -5, 
              scale: 1.05,
              borderColor: '#facc15'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-3xl font-bold text-yellow-400 mb-2 relative z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
            >
              {allSkills.filter(skill => skill.level >= 85).length}
            </motion.div>
            <div className="text-yellow-200 relative z-10">Expert Skills</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
