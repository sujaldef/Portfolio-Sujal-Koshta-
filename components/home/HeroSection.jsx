"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

// --- 1. Utility Components ---

// Magnetic Button Wrapper
const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * strength);
    position.y.set(middleY * strength);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation
const RevealText = ({ children, delay = 0, className }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- 2. Main Hero Component ---
const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const handleScroll = () => {
    document
      .getElementById("closing")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [0, -10]);


  // Mouse Follower Logic
  const mouse = { x: useSpring(0, { stiffness: 50, damping: 20 }), y: useSpring(0, { stiffness: 50, damping: 20 }) };
  
  useEffect(() => {
    const manageMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    };
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#2a0a10] text-[#E8D8C4] flex items-center justify-center"
      >
      
      {/* --- A. DYNAMIC BACKGROUND --- */}
      
      {/* 1. Base Grain (Noise) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 2. The "Spotlight" Gradient following mouse */}
      <motion.div 
        style={{ left: mouse.x, top: mouse.y }}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#561C24] rounded-full blur-[150px] opacity-20 pointer-events-none z-0 mix-blend-screen"
      />

      {/* 3. Grid Lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />


      {/* --- B. CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20 lg:pt-0">
        
        {/* --- LEFT: TYPOGRAPHY (Col Span 7) --- */}
        <motion.div style={{ y: yText }} className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          
          {/* Status Badge */}
          <RevealText className="mb-6">
            <div className="flex items-center gap-3 border border-[#C7B7A3]/20 w-fit px-4 py-2 rounded-full bg-[#2a0a10]/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C7B7A3]">Available for Hire</span>
            </div>
          </RevealText>

          {/* Headline */}
          <h1 className="text-[12vw] lg:text-[7rem] leading-[0.85] font-light tracking-tighter text-[#E8D8C4] mb-8 mix-blend-exclusion">
            <RevealText delay={0.1}>DIGITAL</RevealText>
            <RevealText delay={0.2}>
              <span className="italic font-serif text-[#C7B7A3]">CRAFTSMAN</span>
            </RevealText>
          </h1>

          {/* Subtext */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-t border-[#C7B7A3]/20 pt-8 max-w-2xl">
            <RevealText delay={0.4}>
              <p className="text-[#C7B7A3] text-lg leading-relaxed max-w-md">
                I am <span className="text-[#E8D8C4] font-semibold">Sujal Koshta</span>. A Full-Stack Developer blending technical precision with artistic direction to build immersive web experiences.
              </p>
            </RevealText>
            
            {/* CTA Button */}
            <RevealText delay={0.5} className="mt-4 md:mt-0">
            <button
  onClick={handleScroll}
  className="w-36 h-36 rounded-full bg-[#E8D8C4] text-[#2a0a10]
             flex flex-col items-center justify-center gap-2
             group relative overflow-hidden"
>
  <div className="absolute inset-0 bg-[#C7B7A3]" />

  <span className="relative z-10 text-sm font-bold uppercase tracking-wide">
    Let's Talk
  </span>

  <FaArrowRight
    className="relative z-10 group-hover:rotate-75
               transition-transform duration-800 ease-out"
  />
</button>

</RevealText>


          </div>

          {/* Socials */}
          <div className="flex gap-6 mt-12 text-[#C7B7A3]">
             {[FaGithub, FaLinkedin, FaInstagram].map((Icon, i) => (
                <Magnetic key={i} strength={0.2}>
                  <a href="#" className="hover:text-[#E8D8C4] transition-colors p-2">
                    <Icon size={24} />
                  </a>
                </Magnetic>
             ))}
          </div>

        </motion.div>

        {/* --- RIGHT: THE IMAGE (Col Span 5) --- */}
        <motion.div 
          style={{ y: yImage, rotate: rotateImage }} 
          className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
            <div className="relative w-full max-w-[450px] aspect-[3/4]">
                
                {/* Decorative Frame Behind */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute -top-10 -right-10 w-full h-full border border-[#561C24] rounded-full opacity-30 animate-spin-slow"
                    style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", animationDuration: "20s" }}
                />

                {/* The Image Container */}
                <motion.div
                    initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#561C24]/20"
                >
                    <Image
                        src="/2.jpeg" // Using your specific image
                        alt="Sujal Koshta"
                        fill
                        className="object-cover scale-110 hover:scale-100 transition-transform duration-1000 grayscale hover:grayscale-0"
                        priority
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a10] via-transparent to-transparent opacity-60" />

                    {/* Floating Badge on Image */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#2a0a10]/80 backdrop-blur-md rounded-xl border border-[#C7B7A3]/10 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-[#C7B7A3] uppercase tracking-widest">Current Location</p>
                            <p className="text-sm text-[#E8D8C4] font-medium">Indore, India</p>
                        </div>
                        <div className="h-2 w-2 bg-[#E8D8C4] rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </motion.div>

      </div>

      {/* --- C. BOTTOM SCROLL INDICATOR --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference">
         <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8D8C4]">Scroll</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-[#E8D8C4] to-transparent" />
      </div>

    </section>
  );
};

export default HeroSection;