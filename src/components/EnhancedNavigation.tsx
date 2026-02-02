'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [blobPosition, setBlobPosition] = useState({ x: 0, width: 0 });
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update blob position when active section changes
    const activeElement = navRef.current?.querySelector(`[data-section="${activeSection}"]`);
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      setBlobPosition({
        x: activeRect.left - navRect.left,
        width: activeRect.width,
      });
    }
  }, [activeSection]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            AKSHAY
          </motion.div>

          {/* Navigation Items */}
          <div className="relative hidden md:flex items-center space-x-8">
            {/* Blob Background */}
            <motion.div
              className="absolute h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-20"
              animate={{
                x: blobPosition.x,
                width: blobPosition.width,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
            
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                data-section={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 z-10 ${
                  activeSection === item.name
                    ? 'text-yellow-400'
                    : 'text-yellow-200 hover:text-yellow-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-yellow-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            >
              <motion.path
                d="M 3 6 L 21 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { d: 'M 3 6 L 21 6' },
                  open: { d: 'M 3 18 L 21 18' },
                }}
              />
              <motion.path
                d="M 3 12 L 21 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.path
                d="M 3 18 L 21 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { d: 'M 3 18 L 21 18' },
                  open: { d: 'M 3 6 L 21 6' },
                }}
              />
            </motion.svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl border-l border-white/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col p-8 space-y-6">
                <motion.h3
                  className="text-2xl font-bold text-white mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Menu
                </motion.h3>
                
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left px-6 py-4 rounded-lg font-medium transition-all ${
                      activeSection === item.name
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
