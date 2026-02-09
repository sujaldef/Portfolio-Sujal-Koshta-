"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { FaGithub, FaTimes, FaGlobe, FaBuilding, FaCheckCircle } from "react-icons/fa";
import { projectsData } from "../../lib/data"; 

const ProjectsInteractive = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter Data
  const heroProjects = projectsData.filter(p => p.company.includes("Hero"));
  const personalProjects = projectsData.filter(p => !p.company.includes("Hero"));

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section className="bg-[#2a0a10] text-[#E8D8C4] py-24 px-6 md:px-12 w-full relative border-t border-[#C7B7A3]/10">
      
      {/* --- SECTION 1: PROFESSIONAL EXPERIENCE (HERO MOTOCORP) --- */}
      <div className="max-w-[1400px] mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#C7B7A3]/10 pb-6">
            <div>
                <span className="text-[#C7B7A3] font-mono text-sm tracking-widest uppercase mb-2 block">
                    Internship Experience
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#E8D8C4]">
                    Built for <span className="text-red-500">Hero MotoCorp</span>
                </h2>
            </div>
            <div className="flex items-center gap-2 text-[#C7B7A3]/60 text-sm mt-4 md:mt-0">
                <FaBuilding />
                <span>Via Zenvoyager</span>
            </div>
        </div>

        {/* Wide Cards Layout for Hero Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {heroProjects.map((project) => (
                <FeaturedCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                />
            ))}
        </div>
      </div>


      {/* --- SECTION 2: PERSONAL PROJECTS (GRID) --- */}
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 flex items-center gap-4">
             <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
             <h3 className="text-2xl font-serif text-[#C7B7A3] uppercase tracking-widest">Personal Projects</h3>
             <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalProjects.map((project) => (
            <StandardCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {/* --- SHARED: Right Slide Drawer (Modal) --- */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-[#1a0508] z-[60] border-l border-[#C7B7A3]/20 shadow-2xl overflow-y-auto"
            >
              <ProjectDrawerContent 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

// --- COMPONENT 1: Featured Card (For Hero Projects) ---
const FeaturedCard = ({ project, onClick }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group cursor-pointer bg-[#22080d] border border-[#C7B7A3]/10 rounded-3xl overflow-hidden hover:border-[#C7B7A3]/30 transition-all duration-300 shadow-lg"
        >
            {/* Image Area - Larger */}
            <div className="relative h-[250px] w-full overflow-hidden">
                <Image 
                    src={`/projects/${project.images[0]}`} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#22080d] to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-serif text-[#E8D8C4] mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] bg-[#E8D8C4]/10 text-[#E8D8C4] px-2 py-1 rounded backdrop-blur-sm border border-[#E8D8C4]/20">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
                <p className="text-[#C7B7A3]/80 text-sm leading-relaxed mb-6">
                    {project.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8D8C4] bg-[#2a0a10] p-3 rounded-lg border border-[#C7B7A3]/10">
                    <FaCheckCircle className="text-green-500/50" />
                    <span>{project.impact.substring(0, 60)}...</span>
                </div>
                
                <div className="mt-6 flex items-center text-[#C7B7A3] text-sm font-medium group-hover:text-[#E8D8C4] transition-colors">
                    View Case Study <GoArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    )
}

// --- COMPONENT 2: Standard Card (For Personal Projects) ---
const StandardCard = ({ project, onClick }) => {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            onClick={onClick}
            className="group cursor-pointer bg-[#2a0a10] border border-[#C7B7A3]/10 rounded-xl overflow-hidden hover:border-[#C7B7A3]/40 transition-all duration-300"
        >
            <div className="relative aspect-video w-full bg-[#000]">
                <Image 
                    src={`/projects/${project.images[0]}`} 
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-[#E8D8C4] line-clamp-1">{project.title}</h4>
                    <GoArrowUpRight className="text-[#C7B7A3] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <p className="text-[#C7B7A3]/60 text-xs line-clamp-2 mb-3">{project.shortDescription}</p>
                <div className="flex gap-2">
                     {project.tech.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] text-[#C7B7A3] border border-[#C7B7A3]/20 px-1.5 py-0.5 rounded">
                            {t}
                        </span>
                     ))}
                </div>
            </div>
        </motion.div>
    )
}

// --- COMPONENT 3: Drawer Content (Same as before) ---
// --- COMPONENT 3: Drawer Content (Tabbed Console Layout) ---
const ProjectDrawerContent = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
      <div className="h-full flex flex-col bg-[#1a0508] relative overflow-hidden">
          
          {/* --- 1. Fixed Header (Always Visible) --- */}
          <div className="p-8 pb-4 border-b border-[#C7B7A3]/10 flex-shrink-0">
              <div className="flex justify-between items-start">
                  <div>
                      <span className="text-[#C7B7A3] text-xs uppercase tracking-widest block mb-2">
                          {project.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif text-[#E8D8C4] leading-tight">
                          {project.title}
                      </h2>
                  </div>
                  <button 
                      onClick={onClose}
                      className="p-2 rounded-full bg-[#C7B7A3]/10 text-[#C7B7A3] hover:bg-[#E8D8C4] hover:text-[#2a0a10] transition-colors"
                  >
                      <FaTimes size={20} />
                  </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-6 mt-8 border-b border-[#C7B7A3]/10">
                  {['overview', 'technical', 'gallery'].map((tab) => (
                      <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                              activeTab === tab 
                              ? 'text-[#E8D8C4] border-b-2 border-[#E8D8C4]' 
                              : 'text-[#C7B7A3]/60 hover:text-[#E8D8C4]'
                          }`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
          </div>

          {/* --- 2. Scrollable Content Area (Dynamic) --- */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                  <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                  >
                      {/* Main Description */}
                      <p className="text-[#E8D8C4]/90 text-lg leading-relaxed">
                          {project.shortDescription}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                          {project.liveLink && (
                              <a href={project.liveLink} target="_blank" rel="noreferrer"
                                  className="flex items-center gap-2 bg-[#E8D8C4] text-[#2a0a10] px-6 py-3 rounded-full font-medium text-sm hover:bg-white transition-colors shadow-lg shadow-[#E8D8C4]/10">
                                  <FaGlobe /> Live Demo
                              </a>
                          )}
                          {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noreferrer"
                                  className="flex items-center gap-2 border border-[#C7B7A3]/30 text-[#E8D8C4] px-6 py-3 rounded-full font-medium text-sm hover:border-[#E8D8C4] transition-colors">
                                  <FaGithub /> View Code
                              </a>
                          )}
                      </div>

                      {/* Impact Box */}
                      <div className="p-6 bg-[#2a0a10] rounded-xl border border-[#C7B7A3]/10 mt-6">
                          <h4 className="text-xs font-bold text-[#C7B7A3] uppercase tracking-wider mb-3">Project Impact</h4>
                          <div className="flex gap-3">
                              <span className="text-[#E8D8C4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8D8C4] shrink-0 shadow-[0_0_10px_#E8D8C4]" />
                              <p className="text-[#E8D8C4] italic text-base">"{project.impact}"</p>
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* TAB: TECHNICAL */}
              {activeTab === 'technical' && (
                  <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                  >
                      {/* Key Features */}
                      <div>
                          <h4 className="text-sm font-bold text-[#E8D8C4] uppercase tracking-wider mb-4 border-l-2 border-[#E8D8C4] pl-3">Key Features</h4>
                          <ul className="grid grid-cols-1 gap-4">
                              {project.details.map((detail, i) => (
                                  <li key={i} className="flex gap-3 text-[#C7B7A3]/90 text-sm leading-relaxed p-3 bg-[#2a0a10] rounded-lg border border-[#C7B7A3]/5">
                                      <FaCheckCircle className="text-[#E8D8C4] shrink-0 mt-0.5" size={14} />
                                      {detail}
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* Tech Stack */}
                      <div>
                          <h4 className="text-sm font-bold text-[#E8D8C4] uppercase tracking-wider mb-4 border-l-2 border-[#E8D8C4] pl-3">Technology</h4>
                          <div className="flex flex-wrap gap-2">
                              {project.tech.map((t, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-[#C7B7A3]/10 border border-[#C7B7A3]/20 rounded text-sm text-[#E8D8C4]">
                                      {t}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* TAB: GALLERY */}
              {activeTab === 'gallery' && (
                  <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col"
                  >
                      <div className="grid grid-cols-1 gap-6 pb-4">
                          {project.images.map((img, i) => (
                              <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#C7B7A3]/20 shadow-2xl group">
                                  <Image 
                                      src={`/projects/${img}`} 
                                      alt={`Gallery ${i}`} 
                                      fill 
                                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                      <span className="text-white text-xs font-mono">IMG_0{i+1} // VIEW MODE</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </motion.div>
              )}
          </div>

          {/* --- 3. Footer Status (Decorative) --- */}
          <div className="p-4 border-t border-[#C7B7A3]/10 bg-[#150406] flex justify-between items-center text-[10px] text-[#C7B7A3]/40 font-mono uppercase">
              <span>Status: Deployed</span>
              <span>ID: {project.id || '001'}</span>
          </div>
      </div>
  );
};

export default ProjectsInteractive;