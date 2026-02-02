'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let lastEmitTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Emit particles at intervals while moving
      const now = Date.now();
      if (now - lastEmitTime > 20) { // Emit every 20ms
        const newParticle: TrailParticle = {
          id: particleIdRef.current++,
          x: mouseX,
          y: mouseY,
          timestamp: now,
        };

        setParticles(prev => [...prev, newParticle].slice(-20)); // Keep only last 20 particles
        lastEmitTime = now;
      }

      lastMousePos.current = { x: mouseX, y: mouseY };
    };

    const handleMouseStop = () => {
      isMoving = false;
    };

    // Clean up old particles
    const cleanupParticles = () => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.timestamp < 500)); // Remove particles older than 500ms
      animationFrameRef.current = requestAnimationFrame(cleanupParticles);
    };

    // Start cleanup loop
    animationFrameRef.current = requestAnimationFrame(cleanupParticles);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseStop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseStop);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: Math.max(0, 1 - (Date.now() - particle.timestamp) / 500),
            transform: `scale(${Math.max(0.2, 1 - (Date.now() - particle.timestamp) / 500)})`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
          }}
        />
      ))}
    </div>
  );
}
