'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const links = ['hero', 'about', 'projects', 'contact'];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link));
      const scrollPosition = window.scrollY + 200; // Trigger slightly earlier

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveLink(links[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <>
      {/* --- DESKTOP: Subtle Floating Glass --- */}
      <motion.nav
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-[#E8D8C4]/10 bg-[#2a0a10]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          {links.map((link) => {
            const isActive = activeLink === link;
            return (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setActiveLink(link)}
                  className="relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                >
                  {/* The Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#E8D8C4] rounded-full shadow-[0_0_10px_rgba(232,216,196,0.3)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* The Text Label */}
                  <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-[#2a0a10]' : 'text-[#E8D8C4]/70 hover:text-[#E8D8C4]'}`}>
                    {link === 'hero' ? 'Home' : link}
                  </span>
                </a>
            );
          })}
        </div>
      </motion.nav>

      {/* --- MOBILE: Trigger & Menu --- */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-3 bg-[#2a0a10]/80 backdrop-blur-md text-[#E8D8C4] rounded-full border border-[#E8D8C4]/20 shadow-lg"
        >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 bg-[#2a0a10] z-40 flex flex-col items-center justify-center space-y-8"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(#E8D8C4 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

            {links.map((link, i) => (
              <motion.a 
                key={link} 
                href={`#${link}`} 
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="text-4xl font-light text-[#E8D8C4] hover:italic hover:text-white transition-all"
              >
                <span className="text-sm font-mono text-[#E8D8C4]/40 mr-4">0{i + 1}</span>
                {link === 'hero' ? 'Home' : link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;