'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Center } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

// Chromatic Particle System
function ChromaticParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
    }
  })

  const particles = Array.from({ length: 300 }, () => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ] as [number, number, number],
    size: Math.random() * 0.1 + 0.02,
    color: ['#A855F7', '#EC4899', '#06B6D4', '#3B82F6', '#84CC16', '#F97316', '#EAB308'][Math.floor(Math.random() * 7)]
  }))

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => {
            const color = new THREE.Color(p.color)
            return [color.r, color.g, color.b]
          }))}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.length}
          array={new Float32Array(particles.map(p => p.size))}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.9}
        sizeAttenuation
        vertexColors
      />
    </points>
  )
}

// Enhanced 3D Name with Chromatic Effects
function ChromaticName() {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.8} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main Name Plate with Rainbow Gradient */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5, 1.5, 0.4]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#EC4899"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
        
        {/* Animated Rainbow Border */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[5.2, 1.7, 0.15]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#3B82F6"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Floating Chromatic Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 3.5,
              Math.sin((i / 12) * Math.PI * 2) * 0.8,
              0
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={['#A855F7', '#EC4899', '#06B6D4', '#3B82F6', '#84CC16', '#F97316', '#EAB308'][i % 7]}
              emissive={['#A855F7', '#EC4899', '#06B6D4', '#3B82F6', '#84CC16', '#F97316', '#EAB308'][i % 7]}
              emissiveIntensity={1}
            />
          </mesh>
        ))}

        {/* Orbiting Rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh
            key={`ring-${i}`}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          >
            <torusGeometry args={[2 + i * 0.5, 0.05, 16, 100]} />
            <meshStandardMaterial
              color={['#EC4899', '#06B6D4', '#84CC16'][i]}
              emissive={['#EC4899', '#06B6D4', '#84CC16'][i]}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Aurora Borealis Background Effect
function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const time = 0
    const colors = ['#A855F7', '#EC4899', '#06B6D4', '#3B82F6', '#84CC16']

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createLinearGradient(
          0, 
          0, 
          canvas.width, 
          canvas.height
        )
        
        gradient.addColorStop(0, colors[i] + '40')
        gradient.addColorStop(0.5, colors[(i + 1) % colors.length] + '20')
        gradient.addColorStop(1, colors[(i + 2) % colors.length] + '40')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        
        const offset = (Date.now() * 0.0001 + i * 0.5) % 1
        const amplitude = 100 + i * 20
        const frequency = 0.01 + i * 0.002
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height / 2 + 
                   Math.sin((x * frequency) + (Date.now() * 0.001) + (i * Math.PI)) * amplitude +
                   Math.cos((x * frequency * 2) + (Date.now() * 0.002)) * (amplitude / 2)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
      }

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30 pointer-events-none"
    />
  )
}

// Enhanced Chromatic Matrix Rain
function ChromaticMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
    const matrixArray = matrix.split("")
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []
    const colors = ['#A855F7', '#EC4899', '#06B6D4', '#3B82F6', '#84CC16', '#F97316', '#EAB308']

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * -100)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        const colorIndex = Math.floor(Math.random() * colors.length)
        
        // Create rainbow gradient effect
        const gradient = ctx.createLinearGradient(0, y - 150, 0, y)
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0)')
        gradient.addColorStop(0.3, colors[colorIndex] + 'CC')
        gradient.addColorStop(0.7, colors[colorIndex] + '88')
        gradient.addColorStop(1, colors[colorIndex] + '22')
        
        ctx.fillStyle = gradient
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-25 pointer-events-none"
    />
  )
}

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Full Stack Developer | ML Engineer | NLP Specialist"
  const { scrollYProgress } = useScroll()
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })
  
  const backgroundY = useTransform(smoothScrollY, [0, 1], [0, -50])
  const textY = useTransform(smoothScrollY, [0, 1], [0, -30])
  const opacity = useTransform(smoothScrollY, [0, 0.5], [1, 0])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Clean Background - NO EFFECTS */}
      {/* <AuroraBackground />
      <ChromaticMatrixRain /> */}
      
      {/* Simple Background - REMOVED COMPLEX 3D */}
      {/* <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#A855F7" />
        <pointLight position={[-15, -15, -15]} intensity={2.5} color="#EC4899" />
        <pointLight position={[15, -15, 15]} intensity={2} color="#06B6D4" />
        <pointLight position={[-15, 15, -15]} intensity={2} color="#3B82F6" />
        <spotLight position={[0, 15, 8]} intensity={1.5} color="#84CC16" angle={0.4} penumbra={1} />
        
        <Suspense fallback={null}>
          <ChromaticName />
          <ChromaticParticleField />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas> */}

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          className="font-orbitron text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-yellow-400 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          P. MARIA BALA
          <br />
          AKSHAY RAJ
        </motion.h1>
        
        <motion.h2
          className="font-space text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-yellow-300 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          BTech Computer Science (Data Science) Student
        </motion.h2>
        
        <motion.p
          className="font-inter text-lg md:text-xl mb-8 text-yellow-200 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Full Stack Developer | ML Engineer | NLP Specialist
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
