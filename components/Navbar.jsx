// File: my-portfolio/components/Navbar.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  // UPDATED: Removed "resume" as it is now part of the "contact" section
  const links = ['hero', 'about', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link));
      const scrollPosition = window.scrollY + 100;

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

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-lg border border-slate-700/50 rounded-full shadow-lg z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center px-4 py-2 space-x-2">
          {links.map((link) => (
            <a key={link} href={`#${link}`} onClick={() => setActiveLink(link)} className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors">
              <span className={`capitalize transition-colors ${activeLink === link ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}>
                {link === 'hero' ? 'Home' : link}
              </span>
              {activeLink === link && (
                <motion.div layoutId="activePill" className="absolute inset-0 bg-[var(--primary)]/50 rounded-full" style={{ borderRadius: 9999 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}/>
              )}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-end p-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-black/40 backdrop-blur-lg border border-slate-700/50 rounded-full text-white z-50" aria-label="Open menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl font-semibold capitalize text-[var(--text-muted)] hover:text-white transition-colors">
                  {link === 'hero' ? 'Home' : link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;