'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Cpu, Zap, Sparkles, Brain } from 'lucide-react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);

  const loadingPhases = [
    { icon: Code, label: 'Initializing Code', duration: 800 },
    { icon: Database, label: 'Connecting Data', duration: 600 },
    { icon: Cpu, label: 'Processing Logic', duration: 700 },
    { icon: Brain, label: 'Loading Intelligence', duration: 800 },
    { icon: Zap, label: 'Powering Up', duration: 600 },
    { icon: Sparkles, label: 'Almost Ready', duration: 500 },
  ];

  useEffect(() => {
    const totalDuration = loadingPhases.reduce((acc, phase) => acc + phase.duration, 0);
    const startTime = Date.now();
    let currentPhaseIndex = 0;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      
      setProgress(newProgress);

      // Update current phase based on progress
      const phaseProgress = newProgress / 100;
      const newPhaseIndex = Math.min(
        Math.floor(phaseProgress * loadingPhases.length),
        loadingPhases.length - 1
      );
      
      if (newPhaseIndex !== currentPhaseIndex) {
        currentPhaseIndex = newPhaseIndex;
        setCurrentPhase(currentPhaseIndex);
      }

      if (newProgress >= 100) {
        setTimeout(() => setIsLoading(false), 500);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-600/5"></div>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251, 191, 36, 0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  y: [0, -100, -200],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Main Loading Content */}
          <div className="relative z-10 text-center">
            {/* Logo Animation */}
            <motion.div
              className="mb-12"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                type: 'spring',
                stiffness: 100,
                damping: 20
              }}
            >
              <div className="relative">
                {/* Outer Ring */}
                <motion.div
                  className="w-32 h-32 mx-auto border-4 border-yellow-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-2 w-28 h-28 mx-auto border-2 border-yellow-400/50 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Inner Content */}
                <div className="absolute inset-4 w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Code className="w-12 h-12 text-black" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Phase Icons */}
            <div className="mb-8 flex justify-center items-center gap-4">
              {loadingPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: index <= currentPhase ? 1 : 0.3,
                      scale: index === currentPhase ? 1.2 : index < currentPhase ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === currentPhase 
                        ? 'bg-yellow-400 text-black' 
                        : index < currentPhase 
                          ? 'bg-yellow-400/30 text-yellow-400' 
                          : 'bg-black/30 border border-yellow-400/20 text-yellow-400/50'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index === currentPhase && (
                      <motion.div
                        className="absolute -inset-2 bg-yellow-400/20 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Current Phase Text */}
            <motion.div
              className="mb-8 h-8"
              key={currentPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-yellow-400">
                {loadingPhases[currentPhase].label}
              </h3>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-black/50 rounded-full overflow-hidden border border-yellow-400/30 mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="text-yellow-300 font-mono text-lg"
              key={Math.round(progress)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Loading Tips */}
            <motion.div
              className="mt-12 text-yellow-200/60 text-sm max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p>Building amazing experiences with cutting-edge technology...</p>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 text-yellow-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 text-yellow-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8 text-yellow-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 text-yellow-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <Cpu className="w-6 h-6" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
