'use client';

import { motion } from 'framer-motion';

interface InfiniteCarouselProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function InfiniteCarousel({ 
  items, 
  speed = 50, 
  direction = 'left',
  className = '' 
}: InfiniteCarouselProps) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === 'left' ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 px-6 py-3 bg-yellow-400/10 backdrop-blur-lg border border-yellow-400/30 rounded-full"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              borderColor: 'rgba(251, 191, 36, 0.5)'
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-yellow-400 font-medium">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Multi-row carousel component
export function MultiRowTechCarousel() {
  const row1 = ['Python', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'];
  const row2 = ['AWS', 'Docker', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Git'];
  const row3 = ['Three.js', 'Blender', 'Figma', 'Power BI', 'Tableau', 'Next.js'];
  
  return (
    <div className="py-12 space-y-8">
      <InfiniteCarousel items={row1} speed={30} direction="left" />
      <InfiniteCarousel items={row2} speed={40} direction="right" />
      <InfiniteCarousel items={row3} speed={35} direction="left" />
    </div>
  );
}
