"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { FaBuilding, FaCheckCircle } from "react-icons/fa";
import { projectsData, experienceData } from "../../lib/data";

const ProjectsSection = () => {
  return (
    <section className="bg-[#2a0a10] text-[#E8D8C4] w-full border-t border-[#C7B7A3]/10">
      
      {/* --- PART 1: THE HERO EXPERIENCE (INTERNSHIP) --- */}
      <div className="w-full bg-[#2a0a10] relative overflow-hidden">
        {/* Subtle Background Branding */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8D8C4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 py-24">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                <div>
                    <span className="text-[#C7B7A3] font-mono text-sm tracking-widest uppercase mb-2 block">Professional Experience</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-[#E8D8C4]">
                        Engineering <br />
                        <span className="italic opacity-70">at Scale.</span>
                    </h2>
                </div>
                <div className="md:max-w-xs text-right">
                    <p className="text-[#C7B7A3]/80 text-sm leading-relaxed">
                        Deploying production-grade applications for industry leaders.
                    </p>
                </div>
            </div>

            {/* The Experience Block */}
            {experienceData.map((exp, i) => (
                <div key={i} className="w-full border border-[#C7B7A3]/20 rounded-3xl p-8 md:p-12 bg-[#2a0a10] relative overflow-hidden group">
                    
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-[#C7B7A3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Company Header */}
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-[#C7B7A3]/10 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-[#E8D8C4] text-[#2a0a10] flex items-center justify-center text-3xl">
                                <FaBuilding />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#E8D8C4]">{exp.company}</h3>
                                <p className="text-[#C7B7A3]">{exp.role}</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-4 text-xs font-mono text-[#C7B7A3]/60 uppercase tracking-widest">
                            <span>{exp.period}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                        </div>
                    </div>

                    {/* The Two Projects Grid */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {exp.projects.map((proj, idx) => (
                            <HeroProjectCard key={idx} project={proj} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- PART 2: SELECTED PERSONAL WORKS --- */}
      <div className="w-full py-24">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 flex flex-col items-center">
            <motion.div 
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 180 }}
              transition={{ duration: 1 }}
              className="mb-4 text-[#C7B7A3]"
            >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
               </svg>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tight text-[#E8D8C4]">Personal Projects</h2>
        </div>

        <div className="w-full border-t border-[#C7B7A3]/20">
            {projectsData.map((project, i) => (
               <ProjectItem key={i} project={project} index={i} />
            ))}
        </div>
      </div>

    </section>
  );
};

// --- SUB-COMPONENT: Hero/Internship Project Card ---
const HeroProjectCard = ({ project }) => {
    return (
        <div className="bg-[#1a0508] border border-[#C7B7A3]/10 rounded-2xl p-8 hover:border-[#C7B7A3]/40 transition-all duration-300 hover:-translate-y-1 group/card">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-[#E8D8C4] text-xs font-bold uppercase tracking-wider bg-[#C7B7A3]/10 px-3 py-1 rounded-full">
                        {project.type}
                    </span>
                    <h4 className="text-2xl font-serif text-[#E8D8C4] mt-4 group-hover/card:underline decoration-[#C7B7A3]/50 underline-offset-4">
                        {project.title}
                    </h4>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#C7B7A3]/10 text-[#E8D8C4] hover:bg-[#E8D8C4] hover:text-[#2a0a10] transition-colors">
                    <GoArrowUpRight size={20} />
                </a>
            </div>
            
            <p className="text-[#C7B7A3]/80 text-sm mb-6 leading-relaxed">
                {project.details}
            </p>

            <div className="mb-6 p-4 bg-[#2a0a10] rounded-xl border border-[#C7B7A3]/5">
                <div className="flex gap-2 items-start">
                    <FaCheckCircle className="text-[#E8D8C4] mt-1 shrink-0" size={14} />
                    <p className="text-xs text-[#E8D8C4]/90 italic">"{project.impact}"</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] text-[#C7B7A3] border border-[#C7B7A3]/20 px-2 py-1 rounded uppercase tracking-wider">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}

// --- SUB-COMPONENT: Standard List Item (Existing) ---
const ProjectItem = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group w-full border-b border-[#C7B7A3]/20 relative overflow-hidden bg-[#2a0a10]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:h-[450px]">
                
                {/* Info */}
                <div className="p-8 md:p-12 flex flex-col justify-between border-r border-[#C7B7A3]/20 relative z-10 transition-colors duration-500 group-hover:bg-[#C7B7A3]/5">
                    <div className="space-y-6">
                        <div>
                           <p className="text-[#C7B7A3] text-xs uppercase tracking-widest mb-2">0{index + 1} / {project.location}</p>
                           <h3 className="text-3xl md:text-4xl font-medium text-[#E8D8C4]">
                               {project.title}
                           </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 pt-4">
                             <div>
                                 <p className="text-[#C7B7A3] text-xs uppercase tracking-widest mb-2">Tech Stack</p>
                                 <p className="text-sm font-light text-[#E8D8C4]/80">{project.tech.slice(0, 3).join(" • ")}</p>
                             </div>
                             <div>
                                 <p className="text-[#C7B7A3] text-xs uppercase tracking-widest mb-2">Description</p>
                                 <p className="text-sm font-light text-[#E8D8C4]/80">{project.shortDescription}</p>
                             </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-12 md:mt-0">
                         <a href={project.link} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full border border-[#C7B7A3]/40 flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#E8D8C4] scale-110 border-[#E8D8C4]' : 'bg-transparent'}`}>
                             <GoArrowUpRight className={`text-xl transition-colors duration-500 ${isHovered ? 'text-[#2a0a10]' : 'text-[#E8D8C4]'}`} />
                         </a>
                    </div>
                </div>

                {/* Image Reveal */}
                <div className="relative h-full w-full overflow-hidden bg-[#22080d]">
                    <div className="absolute inset-0 p-12 flex items-center justify-center">
                        <motion.div 
                            className="relative w-full h-full shadow-2xl overflow-hidden rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                             <Image 
                                src={`/projects/${project.images[0]}`}
                                alt={project.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                             />
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProjectsSection;