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

// Category color gradients
const categoryColors = {
  'All': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'Programming': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'Web Development': 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'AI/ML': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'Cloud & DevOps': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  '3D Development': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'Tools': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
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
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white/90 backdrop-blur-lg border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-purple-400 shadow-[0_12px_40px_rgba(168,85,247,0.3)]' : 'border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
      }`}
      style={{
        borderColor: isSelected ? undefined : undefined,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
      }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Skill Icon */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
               style={{ background: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools'] }}>
            {skill.name.charAt(0)}
          </div>
          <h3 className="font-bold text-gray-800 text-lg">
            {skill.name}
          </h3>
        </div>
        {/* Status Indicator */}
        <div 
          className="w-3 h-3 rounded-full shadow-sm"
          style={{ 
            backgroundColor: skill.color,
            boxShadow: `0 0 8px ${skill.color}40`
          }}
        ></div>
      </div>
      
      {/* Proficiency Display */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 font-medium">Proficiency</span>
          <span className="text-lg font-bold text-gray-800">{skill.level}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              background: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']
            }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.level}%` : 0 }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Category Badge */}
      <div className="inline-block">
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium border"
          style={{
            background: `${categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools']}20`,
            borderColor: categoryColors[skill.category as keyof typeof categoryColors] || categoryColors['Tools'],
            color: '#64748b'
          }}
        >
          {skill.category}
        </span>
      </div>
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
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeCategory === category
              ? 'text-white shadow-lg transform scale-105'
              : 'bg-white/80 backdrop-blur text-gray-700 border-2 hover:transform hover:scale-105'
          }`}
          style={{
            background: activeCategory === category 
              ? categoryColors[category as keyof typeof categoryColors] || categoryColors['Tools']
              : undefined,
            borderColor: activeCategory !== category 
              ? categoryColors[category as keyof typeof categoryColors]?.split(',')[0]?.replace('135deg, ', '') || '#667eea'
              : undefined
          }}
          onClick={() => onCategoryChange(category)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
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
      className="relative min-h-screen py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <h2 className="font-bold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

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

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">{allSkills.length}</div>
            <div className="text-gray-600">Total Skills</div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length - 1}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length)}%
            </div>
            <div className="text-gray-600">Avg. Proficiency</div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {allSkills.filter(skill => skill.level >= 85).length}
            </div>
            <div className="text-gray-600">Expert Skills</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
