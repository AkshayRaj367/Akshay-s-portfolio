'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Award, Target, TrendingUp, Users } from 'lucide-react'

// Journey milestone data
const journeyMilestones = [
  {
    year: '2021',
    title: 'Started Coding Journey',
    description: 'Began my journey into software development with Python and web technologies.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-400',
    stats: ['First Line of Code', 'Python Basics', 'Web Development']
  },
  {
    year: '2022',
    title: 'College & Deep Learning',
    description: 'Joined GCET and dove deep into machine learning and AI technologies.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-400',
    stats: ['Machine Learning', 'AI Research', 'College Projects']
  },
  {
    year: '2023',
    title: 'First Hackathon Win',
    description: 'Won my first major hackathon and started building real-world applications.',
    icon: <Award className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-400',
    stats: ['Hackathon Winner', 'Full Stack Apps', 'Open Source']
  },
  {
    year: '2024',
    title: 'Research & Innovation',
    description: 'Published research papers and represented at national level competitions.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-400 to-teal-400',
    stats: ['Research Papers', 'National Events', 'Tech Leadership']
  },
  {
    year: '2025',
    title: 'Professional Growth',
    description: 'Expanded into advanced technologies and started mentoring junior developers.',
    icon: <Calendar className="w-8 h-8" />,
    color: 'from-red-400 to-pink-400',
    stats: ['Advanced Projects', 'Mentorship', 'Industry Impact']
  }
];

export default function Journey() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="journey" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, transparent 24%, rgba(168, 85, 247, 0.03) 25%, transparent 26%, transparent 74%, rgba(168, 85, 247, 0.03) 75%, transparent 76%)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ y, opacity }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-6">
            <span className="font-inter text-sm font-medium text-purple-400/80 tracking-widest uppercase">
              My Professional Journey
            </span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black mb-6 tracking-wider">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              JOURNEY
            </span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            From curious beginner to innovative developer - every step shaped by passion and perseverance
          </p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mx-auto rounded-full shadow-lg shadow-purple-400/50"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Timeline Cards */}
        <div className="relative space-y-12 mb-20">
          {journeyMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="timeline-card"
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Timeline Line */}
              {index < journeyMilestones.length - 1 && (
                <div className="timeline-line" />
              )}

              {/* Year Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={`year-badge ${milestone.color}`}>
                  <div className="year-badge-icon">
                    {milestone.icon}
                  </div>
                </div>
                <div className="year-display">
                  {milestone.year}
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                <h3 className="card-title">
                  {milestone.title}
                </h3>
                <p className="card-description">
                  {milestone.description}
                </p>

                {/* Stats */}
                <div className="stats-container">
                  {milestone.stats.map((stat, statIndex) => (
                    <motion.span
                      key={stat}
                      className={`stat-badge ${milestone.color}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + statIndex * 0.1, duration: 0.4 }}
                    >
                      {stat}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
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
              This journey is just the beginning. Every challenge overcome and every lesson learned 
              fuels my passion for creating innovative solutions that make a difference.
            </p>
            <motion.button
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full font-bold text-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Join Me on This Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .timeline-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 32px;
          margin-left: 60px;
          transition: all 0.3s ease;
        }

        .timeline-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 25px 50px rgba(168, 85, 247, 0.15);
        }

        .timeline-line {
          position: absolute;
          left: -60px;
          top: 100%;
          width: 2px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(168, 85, 247, 0.2));
          border-radius: 1px;
        }

        .year-badge {
          position: absolute;
          left: -60px;
          top: 0;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .year-badge:hover {
          transform: scale(1.1);
        }

        .year-badge-icon {
          color: white;
        }

        .year-display {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          text-align: right;
        }

        .card-content {
          position: relative;
        }

        .card-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .timeline-card:hover .card-title {
          color: rgba(168, 85, 247, 0.9);
        }

        .card-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .stats-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stat-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
          transition: all 0.3s ease;
        }

        .stat-badge:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .timeline-card {
            margin-left: 40px;
            padding: 24px;
          }

          .year-badge {
            left: -40px;
            width: 40px;
            height: 40px;
          }

          .timeline-line {
            left: -40px;
            height: 40px;
          }

          .year-display {
            font-size: 1.25rem;
          }

          .card-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  )
}
