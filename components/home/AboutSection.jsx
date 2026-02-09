"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaDraftingCompass, FaRobot, FaPython, 
  FaGithub, FaTools, FaCodeBranch, FaChartBar, FaArrowRight, FaBrain, FaDatabase, FaLayerGroup 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiRedux, SiFastapi, SiMongodb, 
  SiAnaconda, SiFigma, SiTensorflow 
} from "react-icons/si";

// --- Data ---
const allItems = [
  // SKILLS
  { id: 1, type: "skill", name: "React.js", sub: "Frontend", icon: <FaReact />, size: "wide" }, // Wide card
  { id: 2, type: "skill", name: "Node.js", sub: "Backend", icon: <FaNodeJs />, size: "square" },
  { id: 3, type: "skill", name: "Tailwind", sub: "Design", icon: <SiTailwindcss />, size: "square" },
  { id: 4, type: "skill", name: "Machine Learning", sub: "AI Core", icon: <FaRobot />, size: "tall" }, // Tall card
  { id: 5, type: "skill", name: "Python", sub: "Language", icon: <FaPython />, size: "square" },
  { id: 6, type: "skill", name: "FastAPI", sub: "API", icon: <SiFastapi />, size: "square" },
  
  // TOOLS
  { id: 7, type: "tool", name: "GitHub", sub: "Version Control", icon: <FaGithub />, size: "square" },
  { id: 8, type: "tool", name: "VS Code", sub: "Editor", icon: <FaTools />, size: "wide" },
  { id: 9, type: "tool", name: "Figma", sub: "Prototyping", icon: <SiFigma />, size: "square" },
  { id: 10, type: "tool", name: "Anaconda", sub: "Data Suite", icon: <SiAnaconda />, size: "tall" },
  
  // INTERESTS (Converted to fit grid)
  { id: 11, type: "interest", name: "Neural Networks", sub: "Deep Learning", icon: <FaBrain />, size: "wide" },
  { id: 12, type: "interest", name: "Scalable Arch", sub: "System Design", icon: <FaCodeBranch />, size: "wide" },
  { id: 13, type: "interest", name: "Data Viz", sub: "Analytics", icon: <FaChartBar />, size: "square" },
];

const tabs = [
  { id: "all", label: "All Systems" },
  { id: "skill", label: "Tech Stack" },
  { id: "tool", label: "Armory" },
  { id: "interest", label: "R&D" },
];

// --- Components ---

const BentoCard = ({ item }) => {
  // Dynamic classes based on size prop
  const sizeClasses = {
    square: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`group relative overflow-hidden bg-[#2a0a10] border border-[#C7B7A3]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C7B7A3]/40 transition-colors ${sizeClasses[item.size] || "col-span-1"}`}
    >
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8D8C4]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-[#C7B7A3]/5 rounded-lg text-[#E8D8C4] text-xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
            </div>
            <FaArrowRight className="text-[#C7B7A3]/30 -rotate-45 group-hover:rotate-0 group-hover:text-[#E8D8C4] transition-all duration-300" />
        </div>

        <div className="z-10 mt-4">
            <h3 className="text-[#E8D8C4] font-medium text-lg leading-tight">{item.name}</h3>
            <p className="text-[#C7B7A3]/60 text-xs font-mono uppercase tracking-wider mt-1">{item.sub}</p>
        </div>
    </motion.div>
  );
};

// --- Main Section ---

const AboutBento = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = activeTab === "all" 
    ? allItems 
    : allItems.filter(item => item.type === activeTab);

  return (
    <section className="relative min-h-screen bg-[#1a0508] py-24 px-4 flex flex-col items-center">
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      <div className="max-w-6xl w-full z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif text-[#E8D8C4]"
            >
                Technical <span className="italic text-[#C7B7A3]">Manifest</span>
            </motion.h2>
            <p className="text-[#C7B7A3]/60 max-w-xl mx-auto text-sm md:text-base font-light">
                An organized collection of my capabilities, tools, and current research interests.
            </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 bg-[#2a0a10] border border-[#C7B7A3]/10 p-1.5 rounded-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === tab.id ? "text-[#2a0a10]" : "text-[#C7B7A3] hover:text-[#E8D8C4]"}`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#E8D8C4] rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* The Bento Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]"
        >
            <AnimatePresence>
                {filteredItems.map((item) => (
                    <BentoCard key={item.id} item={item} />
                ))}
            </AnimatePresence>
            
            {/* Decorator Box (Only shows on 'all' view to fill space nicely) */}
            {activeTab === 'all' && (
                <motion.div 
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="col-span-1 row-span-1 border border-dashed border-[#C7B7A3]/20 rounded-2xl flex items-center justify-center"
                >
                    <span className="text-[#C7B7A3]/30 text-xs uppercase tracking-widest">More Loading...</span>
                </motion.div>
            )}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutBento;