"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

// --- Components ---

// 1. Infinite Text Marquee (Updated for Dark Mode)
const Marquee = ({ text, direction = "left", speed = 20 }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap opacity-[0.05] pointer-events-none select-none absolute top-1/2 -translate-y-1/2 w-full">
      <motion.div
        className="flex gap-10 text-[12vw] font-black uppercase leading-none text-[#E8D8C4]"
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {Array(4).fill(text).map((t, i) => (
          <span key={i} className="tracking-tighter">{t}</span>
        ))}
      </motion.div>
    </div>
  );
};

// 2. Magnetic Button (Updated Colors)
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- Main Hero Section ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax text
  const y2 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax image
  const [time, setTime] = useState("");

  // Fix hydration mismatch for time
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false}));
    const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false}));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen bg-[#2a0a10] text-[#E8D8C4] overflow-hidden flex flex-col pt-24 pb-12 lg:pt-0 lg:pb-0 justify-center border-b border-[#C7B7A3]/10">
      
      {/* 1. Background Elements */}
      {/* Grid Pattern - Changed to light opacity */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#E8D8C4 1px, transparent 1px), linear-gradient(90deg, #E8D8C4 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#561C24] rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-screen" />
      
      <Marquee text="CREATIVE DEVELOPER • DESIGN • CODE • " speed={40} />

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* --- LEFT: Typography --- */}
        <motion.div 
            style={{ y: y1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8 order-2 lg:order-1"
        >
            <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-4"
                >
                    <span className="h-[1px] w-12 bg-[#C7B7A3]"></span>
                    <span className="uppercase tracking-[0.2em] text-xs font-medium text-[#C7B7A3]">Portfolio 2024</span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl font-medium leading-[0.95] tracking-tight text-[#E8D8C4]"
                    >
                        Hello, I'm <br/>
                        <span className="italic opacity-80">Sujal Koshta.</span>
                    </motion.h1>
                </div>

                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl md:text-3xl font-light text-[#C7B7A3] mt-1"
                    >
                        Architecting Digital <br className="hidden md:block"/>
                        {/* Underline changed to match theme */}
                        <span className="font-semibold text-[#E8D8C4] underline decoration-1 underline-offset-4 decoration-[#C7B7A3]/50">Experiences.</span>
                    </motion.h2>
                </div>
            </div>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-base md:text-lg text-[#C7B7A3] max-w-lg leading-relaxed font-light border-l border-[#C7B7A3]/30 pl-6"
            >
                A <strong className="text-[#E8D8C4] font-medium">Full-Stack Developer</strong> & <strong className="text-[#E8D8C4] font-medium">UI Designer</strong> blending technical precision with editorial aesthetics to build brands that stand out.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6"
            >
                <a href="#contact">
                    {/* Magnetic Button - Colors Inverted for Contrast */}
                    <MagneticButton className="group relative bg-[#E8D8C4] text-[#2a0a10] px-8 py-3 rounded-none overflow-hidden flex items-center gap-3 text-sm font-bold shadow-[0_0_15px_rgba(232,216,196,0.1)]">
                        <div className="absolute inset-0 w-full h-full bg-[#C7B7A3] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        <span className="relative z-10">Start a Project</span>
                        <span className="relative z-10 bg-[#2a0a10] text-[#E8D8C4] rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                             <FaArrowRight size={10}/>
                        </span>
                    </MagneticButton>
                </a>
                
                <a href="#projects" className="group flex items-center gap-2 text-[#E8D8C4] text-sm font-medium border-b border-[#E8D8C4]/30 hover:border-[#E8D8C4] transition-all pb-1">
                    View Case Studies
                </a>
            </motion.div>
        </motion.div>

        {/* --- RIGHT: The "Arch" Image --- */}
        <motion.div 
            className="lg:col-span-5 relative h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2"
            style={{ y: y2 }}
        >
             {/* Abstract Floating Shapes - Color updated */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-10 w-24 h-24 border border-[#C7B7A3]/30 rounded-full flex items-center justify-center opacity-50"
             >
                 <div className="w-1.5 h-1.5 bg-[#C7B7A3] rounded-full" />
             </motion.div>

             {/* The Main Image Container */}
             <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative w-full max-w-[350px] aspect-[3/4]"
             >
                 {/* The Mask Shape */}
                 <div className="absolute inset-0 rounded-t-[150px] rounded-b-[20px] overflow-hidden bg-[#2a0a10] border border-[#C7B7A3]/10 shadow-2xl">
                     <Image
                        src="/img3.jpg"
                        alt="Sujal Koshta"
                        fill
                        className="object-cover scale-110 hover:scale-100 transition-transform duration-1000 opacity-90 hover:opacity-100"
                        priority
                      />
                      {/* Gradient Overlay for integration */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a10]/60 to-transparent pointer-events-none" />
                 </div>

                  {/* Decorative Dots - Colors updated */}
                  <div className="absolute -right-4 top-16 flex flex-col gap-2">
                        <span className="w-1.5 h-1.5 bg-[#E8D8C4] rounded-full" />
                        <span className="w-1.5 h-1.5 bg-[#E8D8C4]/20 rounded-full" />
                        <span className="w-1.5 h-1.5 bg-[#E8D8C4]/20 rounded-full" />
                  </div>
             </motion.div>
        </motion.div>
      </div>

      {/* --- BOTTOM: Footer Strip --- */}
      <div className="absolute bottom-0 w-full border-t border-[#C7B7A3]/10 py-4 bg-[#2a0a10]/80 backdrop-blur-sm z-20 hidden md:block">
          <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest text-[#C7B7A3]">
               <div className="flex gap-8">
                   <span>Based in Indore, India</span>
                   <span>Local Time: {time}</span>
               </div>
               <div className="flex items-center gap-2 animate-bounce text-[#E8D8C4]">
                   Scroll Down <FaArrowDown />
               </div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;