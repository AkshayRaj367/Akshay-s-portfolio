'use client';

import { useState, useEffect } from 'react';

export default function SimpleTestCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: mousePosition.x - 25,
        top: mousePosition.y - 25,
        width: '50px',
        height: '50px',
      }}
    >
      <div 
        className="w-full h-full rounded-full border-2 border-yellow-400 bg-yellow-400/20 backdrop-blur-sm"
        style={{
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      />
    </div>
  );
}
