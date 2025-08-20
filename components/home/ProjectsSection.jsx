'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaGithub } from 'react-icons/fa';
import { projectsData } from '../../lib/data';


const CardImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={`/projects/${images[index]}`}
            alt={`Project preview ${index + 1}`}
            fill
            className="object-cover object-top"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}></div>
        ))}
      </div>
    </>
  );
};

// --- Modal Slideshow Component with Smoother Animation ---
const ModalImageSlider = ({ images, projectTitle }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-video bg-black/30 rounded-lg overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }} // Slide in from the right
          animate={{ opacity: 1, x: 0 }} // Slide to center
          exit={{ opacity: 0, x: -100 }} // Slide out to the left
          transition={{
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth motion (easeOutBack-like)
          }}
          className="absolute inset-0"
        >
          <Image
            src={`/projects/${images[index]}`}
            alt={`${projectTitle} screenshot ${index + 1}`}
            fill
            className="object-contain"
            quality={100}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition z-10"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition z-10"
      >
        <FaChevronRight />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// --- The "Executive" Project Modal ---
const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#11071F] to-[#190D2E] border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition z-20"
            >
              <FaTimes size={24} />
            </button>
            <div className="w-full mb-6">
              <ModalImageSlider images={project.images} projectTitle={project.title} />
            </div>
            <div className="text-white space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[var(--primary)]/20 text-xs px-3 py-1 rounded-full text-[var(--primary)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-4">
                  <h4 className="text-lg font-semibold text-slate-200">Key Features</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-1.5">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-lg font-semibold text-slate-200">Project Impact</h4>
                  <p className="text-slate-400">{project.impact}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--primary)]/80 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- The NEW Project Card with Hover Slideshow ---
const ProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800/50 shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
    >
      <CardImageSlider images={project.images} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-slate-300 mb-4">{project.shortDescription}</p>
      </div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold transform group-hover:scale-105 transition-transform">
          View Details
        </span>
      </div>
    </motion.div>
  );
};

// --- Main ProjectsSection Component ---
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center text-4xl font-semibold mb-4">
        My Work
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-[var(--text-muted)] text-center leading-relaxed">
          A showcase of my capabilities in creating modern, scalable, and user-friendly web applications.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.title} project={project} onOpenModal={openModal} />
        ))}
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={closeModal} />
    </section>
  );
};

export default ProjectsSection;