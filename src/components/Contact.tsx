'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, User } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="glass-morphism rounded-2xl p-10 border border-yellow-400/20"
      initial={{ opacity: 0, rotateX: -15, scale: 0.9 }}
      whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 25px 50px rgba(251, 191, 36, 0.2)',
        borderColor: 'rgba(251, 191, 36, 0.4)'
      }}
    >
      {isSubmitted ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-400/30"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <Send className="w-10 h-10 text-yellow-400" />
          </motion.div>
          <h3 className="font-orbitron text-3xl font-bold text-yellow-400 mb-3">
            Message Sent!
          </h3>
          <p className="font-inter text-gray-300 text-lg">
            Thank you for reaching out. I'll get back to you soon!
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <label className="block font-inter text-sm font-medium text-yellow-400/80 mb-3">
                Name
              </label>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                </motion.div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-500"
                  placeholder="Your Name"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <label className="block font-inter text-sm font-medium text-yellow-400/80 mb-3">
                Email
              </label>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                </motion.div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <label className="block font-inter text-sm font-medium text-yellow-400/80 mb-3">
              Subject
            </label>
            <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                </motion.div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-500"
                  placeholder="What's this about?"
                />
              </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <label className="block font-inter text-sm font-medium text-yellow-400/80 mb-3">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-4 bg-black/30 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-500 resize-none"
              placeholder="Tell me about your project or just say hello..."
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-black text-lg shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}

function ContactInfo() {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'akshay.raj.p.367@gmail.com',
      href: 'mailto:akshay.raj.p.367@gmail.com',
      color: '#fbbf24'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 7780275789',
      href: 'tel:+917780275789',
      color: '#f59e0b'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Hyderabad, Telangana, India',
      href: 'https://maps.google.com/?q=Hyderabad,Telangana,India',
      color: '#f97316'
    }
  ]

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/AkshayRaj367',
      color: '#ffffff'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/akshayraj367',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/akshayraj367',
      color: '#1da1f2'
    }
  ]

  return (
    <div className="space-y-10">
      {/* Contact Information */}
      <motion.div
        className="glass-morphism rounded-2xl p-10 border border-yellow-400/20"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        whileHover={{ 
          y: -10,
          boxShadow: '0 25px 50px rgba(251, 191, 36, 0.2)',
          borderColor: 'rgba(251, 191, 36, 0.4)'
        }}
      >
        <h3 className="font-orbitron text-2xl font-bold text-yellow-400 mb-8">
          Get in Touch
        </h3>
        
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              className="flex items-center gap-4 p-5 rounded-xl bg-black/30 hover:bg-black/50 transition-all duration-500 group border border-yellow-400/10 hover:border-yellow-400/30"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.15 }}
              whileHover={{ x: 8, scale: 1.02 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-yellow-400/30"
                style={{ backgroundColor: `${info.color}20` }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  borderColor: info.color,
                  transition: { duration: 0.6 }
                }}
              >
                <motion.div 
                  style={{ color: info.color }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {info.icon}
                </motion.div>
              </motion.div>
              <div>
                <p className="font-inter text-sm text-yellow-400/80 font-medium">{info.label}</p>
                <p className="font-inter text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium">
                  {info.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className="glass-morphism rounded-2xl p-10 border border-yellow-400/20"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        whileHover={{ 
          y: -10,
          boxShadow: '0 25px 50px rgba(251, 191, 36, 0.2)',
          borderColor: 'rgba(251, 191, 36, 0.4)'
        }}
      >
        <h3 className="font-orbitron text-2xl font-bold text-yellow-400 mb-8">
          Connect With Me
        </h3>
        
        <div className="grid grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square glass-morphism rounded-xl flex flex-col items-center justify-center gap-3 hover:scale-110 transition-all duration-500 group border border-yellow-400/10 hover:border-yellow-400/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.15 }}
              whileHover={{ 
                y: -8,
                rotate: [0, 5, -5, 0],
                boxShadow: '0 15px 30px rgba(251, 191, 36, 0.3)'
              }}
            >
              <motion.div 
                style={{ color: social.color }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {social.icon}
              </motion.div>
              <span className="text-xs font-orbitron text-gray-300 group-hover:text-yellow-400 transition-colors duration-300 font-medium">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Availability Status */}
      <motion.div
        className="glass-morphism rounded-2xl p-8 border border-yellow-400/30"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(251, 191, 36, 0.2)'
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-orbitron text-yellow-400 font-bold text-lg">
            Available for Work
          </span>
        </div>
        <p className="font-inter text-gray-300 text-sm leading-relaxed">
          I'm currently open to freelance projects, internships, and full-time opportunities. 
          Let's discuss how we can work together!
        </p>
      </motion.div>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      id="contact" 
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
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
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
              Get In Touch
            </span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black mb-6 tracking-wider">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              LET'S CONNECT
            </span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Have a project in mind? Want to collaborate? Or just want to say hello? 
            I'd love to hear from you!
          </p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>

        {/* Elegant Footer */}
        <motion.div
          className="text-center mt-20 pt-12 border-t border-yellow-400/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="font-inter text-gray-300 text-sm mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            © 2026 P. Maria Bala Akshay Raj. All rights reserved.
          </motion.p>
          <motion.p
            className="font-inter text-gray-400 text-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Built with Next.js, TypeScript, and lots of ☕ and 🎨
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
