"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaRobot, FaPython, FaGithub, FaTools, 
  FaCodeBranch, FaChartBar, FaArrowRight, FaBrain, FaDatabase, FaCat, FaTerminal, FaCoffee 
} from "react-icons/fa";
import { SiTailwindcss, SiFastapi, SiFigma, SiAnaconda } from "react-icons/si";

// --- 1. DATA WITH HIDDEN SIDES ---
// Added 'flipContent' to specific items
const initialItems = [
  // FLIPPABLE CARD 1: React -> Next.js
  { 
    id: 1, type: "skill", name: "React.js", sub: "Frontend", icon: <FaReact />, size: "wide",
    flipContent: { name: "Next.js", sub: "The Real MVP", icon: "⚛️" } 
  },
  { id: 2, type: "skill", name: "Node.js", sub: "Backend", icon: <FaNodeJs />, size: "square" },
  { id: 3, type: "skill", name: "Tailwind", sub: "Design", icon: <SiTailwindcss />, size: "square" },
  
  // FLIPPABLE CARD 2: AI -> Skynet
  { 
    id: 4, type: "skill", name: "Machine Learning", sub: "AI Core", icon: <FaRobot />, size: "tall",
    flipContent: { name: "Skynet", sub: "Judgment Day Pending...", icon: "🤖" }
  },
  
  // FLIPPABLE CARD 3: Python -> Hiss
  { 
    id: 5, type: "skill", name: "Python", sub: "Language", icon: <FaPython />, size: "square",
    flipContent: { name: "sssss...", sub: "Just a snake", icon: "🐍" }
  },
  { id: 6, type: "skill", name: "FastAPI", sub: "API", icon: <SiFastapi />, size: "square" },
  
  // TOOLS
  { id: 7, type: "tool", name: "GitHub", sub: "Version Control", icon: <FaGithub />, size: "square" },
  { id: 8, type: "tool", name: "VS Code", sub: "Editor", icon: <FaTools />, size: "wide" },
  { id: 9, type: "tool", name: "Figma", sub: "Prototyping", icon: <SiFigma />, size: "square" },
  { id: 10, type: "tool", name: "Anaconda", sub: "Data Suite", icon: <SiAnaconda />, size: "tall" },
  
  // INTERESTS
  { id: 11, type: "interest", name: "Neural Networks", sub: "Deep Learning", icon: <FaBrain />, size: "wide" },
  { id: 12, type: "interest", name: "Scalable Arch", sub: "System Design", icon: <FaCodeBranch />, size: "wide" },
  { id: 13, type: "interest", name: "Data Viz", sub: "Analytics", icon: <FaChartBar />, size: "square" },
];

const secretCards = [
    { id: 99, type: "secret", name: "Caffeine", sub: "Fuel Source", icon: <FaCoffee />, size: "square" },
    { id: 100, type: "secret", name: "Vim", sub: "Trapped Forever", icon: <FaTerminal />, size: "wide" },
];

const tabs = [
  { id: "all", label: "All Systems" },
  { id: "skill", label: "Tech Stack" },
  { id: "tool", label: "Armory" },
  { id: "interest", label: "R&D" },
];


// --- 2. THE SPACE KITTY COMPONENT ---
const SpaceKitty = () => {
  return (
    <motion.div
      initial={{ x: "-100vw", y: 100, rotate: 0 }}
      animate={{ 
        x: "100vw", 
        y: [100, 50, 150, 100], // Floating up and down
        rotate: [0, 10, -10, 0] // Wiggling
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear",
        delay: 2 // Wait a bit before appearing
      }}
      className="absolute z-0 pointer-events-none opacity-20 text-6xl filter blur-[1px]"
    >
      🐈‍⬛
    </motion.div>
  );
};


// --- 3. BENTO CARD (Now handles Tilt OR Flip) ---
const BentoCard = ({ item }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const [isFlipped, setIsFlipped] = useState(false);

  // Tilt Logic
  const handleMouseMove = (e) => {
    if (item.flipContent) return; // Disable tilt if it's a flip card
    
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const hoverX = e.clientX - left - width / 2;
    const hoverY = e.clientY - top - height / 2;
    x.set((hoverY / height) * -20);
    y.set((hoverX / width) * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  };

  const sizeClasses = {
    square: "col-span-1 row-span-1",
    wide: "col-span-1 md:col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
  };

  return (
    <motion.div
      ref={ref}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => item.flipContent && setIsFlipped(true)}
      style={{
        rotateX: item.flipContent ? 0 : mouseY, // Only tilt if NOT flippable
        rotateY: item.flipContent ? 0 : mouseX,
        transformStyle: "preserve-3d",
      }}
      className={`group relative perspective-1000 ${sizeClasses[item.size] || "col-span-1"}`}
    >
        {/* CONTAINER FOR FLIP ANIMATION */}
        <motion.div 
            className="relative w-full h-full duration-500 preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            
            {/* === FRONT FACE === */}
            <div className="absolute inset-0 backface-hidden bg-[#2a0a10] border border-[#C7B7A3]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C7B7A3]/40 transition-colors shadow-2xl">
                {/* Sheen Effect (Only for non-flip cards) */}
                {!item.flipContent && (
                    <motion.div 
                        style={{ x: mouseX, y: mouseY }}
                        className="absolute inset-[-50%] bg-gradient-to-r from-transparent via-[#E8D8C4]/5 to-transparent blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                )}
                
                <div className="flex justify-between items-start z-10">
                    <div className={`p-3 rounded-lg text-[#E8D8C4] text-xl transition-transform duration-300 ${item.type === 'secret' ? 'bg-red-900/30 text-red-200' : 'bg-[#C7B7A3]/5'}`}>
                        {item.icon}
                    </div>
                    {item.flipContent ? (
                        <span className="text-[10px] text-[#C7B7A3]/40 uppercase tracking-widest border border-[#C7B7A3]/20 px-2 py-1 rounded-full">Hover Me</span>
                    ) : (
                        <FaArrowRight className="text-[#C7B7A3]/30 -rotate-45 group-hover:rotate-0 group-hover:text-[#E8D8C4] transition-all duration-300" />
                    )}
                </div>

                <div className="z-10 mt-4">
                    <h3 className="text-[#E8D8C4] font-medium text-lg leading-tight">{item.name}</h3>
                    <p className="text-[#C7B7A3]/60 text-xs font-mono uppercase tracking-wider mt-1">{item.sub}</p>
                </div>
            </div>

            {/* === BACK FACE (Hidden by default) === */}
            {item.flipContent && (
                <div 
                    className="absolute inset-0 backface-hidden bg-[#E8D8C4] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="text-4xl mb-2 animate-bounce">{item.flipContent.icon}</div>
                    <h3 className="text-[#2a0a10] font-bold text-xl">{item.flipContent.name}</h3>
                    <p className="text-[#2a0a10]/70 text-xs font-mono uppercase tracking-widest">{item.flipContent.sub}</p>
                </div>
            )}

        </motion.div>
    </motion.div>
  );
};


// --- 4. MAIN COMPONENT ---
const AboutBento = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [items, setItems] = useState(initialItems);
  const containerRef = useRef(null);
  
  // Glitch Effect State
  const [titleText, setTitleText] = useState("Manifest");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
  
  const handleGlitch = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setTitleText(prev => 
        prev.split("").map((letter, index) => {
          if(index < iterations) return "Manifest"[index];
          return letters[Math.floor(Math.random() * 26)];
        }).join("")
      );
      if(iterations >= 8) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const unlockSecret = () => {
      if(items.length > initialItems.length) return; 
      const newSecret = secretCards[Math.floor(Math.random() * secretCards.length)];
      setItems(prev => [...prev, { ...newSecret, id: Date.now() }]);
  };

  const filteredItems = activeTab === "all" ? items : items.filter(item => item.type === activeTab);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#1a0508] py-32 px-4 flex flex-col items-center overflow-hidden">
      
      {/* 🐈 THE SPACE KITTY (Floats behind everything) */}
      <SpaceKitty />

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-6xl w-full z-10 relative">
        
        {/* Header */}
        <motion.div style={{ y: yTitle }} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-7xl font-serif text-[#E8D8C4] tracking-tight cursor-default" onMouseEnter={handleGlitch}>
                Technical <span className="italic text-[#C7B7A3]">{titleText}</span>
            </h2>
            <p className="text-[#C7B7A3]/60 max-w-xl mx-auto text-sm md:text-base font-light font-mono">
                // HOVER_CARDS_FOR_DATA_LEAK<br/>
                An organized collection of capabilities & research.
            </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
            <div className="flex flex-wrap justify-center gap-2 bg-[#2a0a10] border border-[#C7B7A3]/10 p-1.5 rounded-full backdrop-blur-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 ${activeTab === tab.id ? "text-[#2a0a10]" : "text-[#C7B7A3] hover:text-[#E8D8C4]"}`}
                    >
                        {activeTab === tab.id && (
                            <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#E8D8C4] rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[180px]">
            <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                    <BentoCard key={item.id} item={item} />
                ))}
            </AnimatePresence>
            
            {/* The "More" Button */}
            {activeTab === 'all' && (
                <motion.div 
                    layout
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={unlockSecret}
                    className="col-span-1 row-span-1 border border-dashed border-[#C7B7A3]/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer group select-none hover:bg-[#E8D8C4]/5 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full border-2 border-[#C7B7A3]/20 border-t-[#E8D8C4] animate-spin mb-3 group-hover:border-t-green-400" />
                    <span className="text-[#C7B7A3]/30 text-xs uppercase tracking-widest group-hover:text-[#E8D8C4] transition-colors">
                        {items.length > initialItems.length ? "System Unlocked" : "Load Secret"}
                    </span>
                </motion.div>
            )}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutBento;