'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import {
  FaGithub,
  FaTimes,
  FaGlobe,
  FaBuilding,
  FaCheckCircle,
} from 'react-icons/fa';

// ─── PROJECT DATA ────────────────────────────────────────────────────────────

export const projectsData = [
  // =========================
  // RECENT INTERNSHIPS
  // =========================
  {
    id: 'hero-1',
    category: 'Internship',
    internshipTitle: 'Recent Internship',
    dateRange: 'Jan 5, 2026 – Feb 5, 2026',
    isRecent: true,
    isLiveProject: true,
    company: 'Via Zenvoyager (Client: Hero MotoCorp)',
    title: 'Surakshit Saathi',
    shortDescription:
      'Multilingual safety training platform managing slots, attendance, and certifications.',
    details: [
      'Built user and admin dashboards for managing training sessions and attendance.',
      'Implemented OTP-based authentication and verification workflows.',
      'Developed online/offline slot booking system with scheduling management.',
      'Integrated multilingual support using i18n for Hindi and English accessibility.',
      'Designed responsive UI with role-based access control for admins, trainers, and users.',
    ],
    impact:
      'Reduced manual training coordination effort and streamlined large-scale safety operations.',
    tech: ['React', 'Redux Toolkit', 'FastAPI', 'MongoDB', 'i18n'],
    images: ['surakshit1.png', 'surakshit2.png', 'surakshit3.png', 'surakshit4.png'],
    liveLink: 'https://csr.heromotocorp.com/surakshit-saathi/',
    githubLink: '',
  },
  {
    id: 'hero-2',
    category: 'Internship',
    internshipTitle: 'Recent Internship',
    dateRange: 'Jan 5, 2026 – Feb 5, 2026',
    isRecent: true,
    isLiveProject: true,
    company: 'Via Zenvoyager (Client: Hero MotoCorp)',
    title: 'My Family. My Safety',
    shortDescription:
      'Centralized dashboard for monitoring large-scale road safety initiatives.',
    details: [
      'Developed dashboards for tracking competitions, audits, and execution phases.',
      'Implemented QR-based certificate generation and result access.',
      'Built monitoring systems for Safe School Zones and signage execution.',
      'Integrated real-time pledge tracking with analytics visualization.',
      'Enabled centralized reporting across multiple schools and locations.',
    ],
    impact:
      'Enabled data-driven execution and monitoring of safety initiatives across multiple zones.',
    tech: ['React', 'Redux Toolkit', 'FastAPI', 'MongoDB', 'JIRA'],
    images: ['safety1.png', 'safety2.png', 'safety3.png', 'safety4.png'],
    liveLink: 'https://csr.heromotocorp.com/',
    githubLink: '',
  },

  // =========================
  // FIRST INTERNSHIP
  // =========================
  {
    id: 'personal-1',
    category: 'Internship',
    internshipTitle: 'First Internship',
    dateRange: 'Apr 15, 2025 – May 15, 2025',
    isRecent: false,
    isLiveProject: true,
    company: '47billion',
    title: 'CoE Platform',
    shortDescription:
      'Event and content management platform with real-time updates and admin workflows.',
    details: [
      'Built admin and user dashboards for centralized content management.',
      'Implemented real-time event updates using WebSocket technology.',
      'Integrated JWT authentication and authorization.',
      'Designed scalable backend APIs using FastAPI and MongoDB.',
      'Optimized responsive UI and accessibility across devices.',
    ],
    impact:
      'Improved user engagement and operational efficiency through real-time event workflows.',
    tech: ['React', 'FastAPI', 'MongoDB', 'JWT'],
    images: ['coe4.png', 'coe2.png', 'coe3.png', 'coe1.png', 'coe5.png'],
    liveLink: 'https://coe-47billion.vercel.app/',
    githubLink: '',
  },

  // =========================
  // FULL-STACK PROJECTS
  // =========================
  {
    id: 'sphere-1',
    category: 'Personal Project',
    projectType: 'Full-Stack',
    company: 'Personal',
    title: 'SphereTest',
    shortDescription:
      'Real-time multiplayer assessment platform with live sessions, Socket.io communication, and dynamic leaderboards.',
    details: [
      'Built a complete full-stack assessment ecosystem using React, Node.js, Express, MongoDB, Socket.io, and JWT authentication.',
      'Implemented real-time session lifecycle including waiting lobby, test start, answer submission, and leaderboard synchronization.',
      'Designed role-based dashboards for admins and students with protected routes and authorization middleware.',
      'Created support for multiple question formats including MCQ, CODE, TEXT, and BOOL questions.',
      'Developed a 5-step sphere creation workflow with scheduling, duration, security settings, and participant controls.',
      'Integrated live multiplayer communication through Socket.io rooms and real-time broadcasting.',
      'Built analytics pages, participant tracking, and leaderboard systems with responsive dark-themed UI.',
      'Implemented express-validator validation, secure JWT flows, ownership authorization checks, and protected APIs.',
    ],
    impact:
      'Enabled scalable real-time online assessments with synchronized multiplayer experiences and live analytics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'Framer Motion'],
    images: ['sphere1.png', 'sphere2.png', 'sphere3.png', 'sphere4.png'],
    liveLink: '',
    githubLink: '',
  },
  {
    id: 'personal-2',
    category: 'Personal Project',
    projectType: 'Full-Stack',
    company: 'Personal',
    title: 'Skillnavigator',
    shortDescription:
      'AI-powered learning platform for adaptive skill development and personalized learning paths.',
    details: [
      'Built AI-driven recommendation systems for personalized learning experiences.',
      'Developed adaptive assessments for skill and role-based evaluation.',
      'Integrated responsive modern UI using Tailwind CSS.',
      'Implemented analytics dashboards for learning progress visualization.',
      'Designed scalable backend and data management using MongoDB.',
    ],
    impact:
      'Improved learning efficiency and personalized content delivery for users.',
    tech: ['React', 'MongoDB', 'Tailwind CSS', 'AI'],
    images: ['skill7.png', 'skill2.png', 'skill3.png', 'skill4.png', 'skill5.png'],
    liveLink: 'https://skillnav.vercel.app/',
    githubLink: '',
  },
  {
    id: 'personal-5',
    category: 'Personal Project',
    projectType: 'Full-Stack',
    company: 'Personal',
    title: 'Loconomy',
    shortDescription:
      'Location-based decentralized service discovery platform connecting users with nearby providers.',
    details: [
      'Built real-time location-based service discovery using WebSocket communication.',
      'Designed responsive frontend interfaces with React.',
      'Integrated MongoDB for scalable data storage and provider management.',
      'Implemented secure APIs for provider interactions and listings.',
      'Developed privacy-focused live location tracking workflows.',
    ],
    impact:
      'Connected local service providers with users through real-time discovery systems.',
    tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    images: ['loco4.png', 'loco2.png', 'loco3.png', 'loco1.png'],
    liveLink: '',
    githubLink: 'https://github.com/sujaldef/Loconomi',
  },
  {
    id: 'personal-4',
    category: 'Personal Project',
    projectType: 'Full-Stack',
    company: 'Personal',
    title: 'Dormease',
    shortDescription:
      'Dormitory management platform with dashboards, room management, and payment workflows.',
    details: [
      'Built admin and user dashboards for room allocation and management.',
      'Developed FastAPI backend services for efficient API communication.',
      'Integrated MongoDB for scalable data handling and querying.',
      'Implemented maintenance request and issue tracking workflows.',
      'Designed secure payment tracking and management systems.',
    ],
    impact:
      'Reduced operational overhead in hostel and dormitory management workflows.',
    tech: ['React', 'FastAPI', 'MongoDB'],
    images: ['dorm5.png', 'dorm2.png', 'dorm3.png', 'dorm4.png'],
    liveLink: '',
    githubLink: 'https://github.com/sujaldef/Dormease',
  },

  // =========================
  // ML / AI PROJECTS
  // =========================
  {
    id: 'openrepo-1',
    category: 'Personal Project',
    projectType: 'ML-Based',
    company: 'Personal',
    title: 'OpenRepo',
    shortDescription:
      'AI-powered code analysis backend providing intelligent repository insights and recommendations.',
    details: [
      'Built a FastAPI-based backend for intelligent static code analysis.',
      'Implemented AI-powered code quality prediction and repository health analysis.',
      'Developed issue detection pipelines for bugs, vulnerabilities, and code smells.',
      'Integrated machine learning workflows for predictive repository insights.',
      'Built recommendation systems using LLM-powered improvement suggestions.',
      'Generated repository metrics including complexity analysis and maintainability insights.',
      'Designed scalable REST APIs for code scanning and analytics workflows.',
    ],
    impact:
      'Automated repository analysis and accelerated developer productivity through AI-powered insights.',
    tech: ['Python', 'FastAPI', 'Machine Learning', 'FAISS', 'LLM'],
    images: ['openr1.png', 'openr2.png', 'openr3.png', 'openr4.png'],
    liveLink: '',
    githubLink: '',
  },
  {
    id: 'adia-1',
    category: 'Personal Project',
    projectType: 'ML-Based',
    company: 'Personal',
    title: 'ADIA',
    shortDescription:
      'Autonomous Data Intelligence Agent using ReAct orchestration, analytics engines, and RAG workflows.',
    details: [
      'Designed a 5-layer backend architecture using FastAPI, LangChain orchestration, and deterministic tool execution.',
      'Implemented ReAct-based reasoning workflows for autonomous planning and execution.',
      'Built SQL execution engines with secure read-only validation and query generation.',
      'Developed analytics pipelines using pandas and scipy for anomaly detection and insights.',
      'Integrated RAG systems using sentence-transformers and FAISS vector retrieval.',
      'Created conversational memory systems with session-based context management.',
      'Built visualization engines generating analytical charts and insights dynamically.',
      'Designed modular APIs supporting query execution, telemetry, history, and alert systems.',
    ],
    impact:
      'Enabled autonomous business analytics workflows through AI planning, retrieval systems, and tool orchestration.',
    tech: ['Python', 'FastAPI', 'LangChain', 'Pandas', 'Scipy', 'FAISS', 'SQLite', 'LLM'],
    images: ['adia1.png', 'adia2.png', 'adia3.png'],
    liveLink: '',
    githubLink: '',
  },
  {
    id: 'personal-3',
    category: 'Personal Project',
    projectType: 'ML-Based',
    company: 'Personal (Collaboration)',
    title: 'Medi-Setu (Medical Bridge)',
    shortDescription:
      'Mobile-first telemedicine ecosystem connecting patients, doctors, pharmacies, and labs in low-bandwidth regions.',
    details: [
      'Built a complete healthcare coordination platform supporting patients, doctors, pharmacies, labs, and admins.',
      'Implemented teleconsultation workflows with appointment scheduling and Jitsi integration.',
      'Designed low-bandwidth mobile-first experiences optimized for rural accessibility.',
      'Integrated prescription management, medicine ordering, and lab booking systems.',
      'Developed modular REST APIs with JWT authentication and Redux Toolkit state management.',
      'Built notification-first healthcare coordination workflows for improved accessibility.',
    ],
    impact:
      'Improved healthcare accessibility by unifying fragmented healthcare journeys into a single digital ecosystem.',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Jitsi'],
    collaboration: {
      summary: 'Built in collaboration with Sourabh Mourya and Sujal Khosta.',
      members: [
        { name: 'Sourabh Mourya', github: 'https://github.com/sourabh-mourya' },
        { name: 'Sujal Khosta', github: 'https://github.com/sujaldef' },
      ],
    },
    images: [
      'medi_web1.png',
      'medi_web2.png',
      'medi_phone1.png',
      'medi_phone2.png',
      'medi_phone3.png',
    ],
    liveLink: 'https://medisetu-healthcare.vercel.app/',
    githubLink: '',
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const resolveImageSrc = (image) =>
  typeof image === 'string' ? image : image?.src || '';

const isPortraitImage = (image) => {
  if (typeof image === 'object' && image?.format) return image.format === 'mobile';
  const imageName = resolveImageSrc(image).toLowerCase();
  return imageName.includes('phone') || imageName.includes('mobile');
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const ProjectsInteractive = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter by internship type
  const recentInternships = projectsData.filter((p) => p.isRecent === true);
  const firstInternship = projectsData.filter((p) => p.internshipTitle === 'First Internship');

  // Personal projects — use projectType directly to avoid overlaps
  const fullStackProjects = projectsData.filter(
    (p) => p.category === 'Personal Project' && p.projectType === 'Full-Stack',
  );
  const mlProjects = projectsData.filter(
    (p) => p.category === 'Personal Project' && p.projectType === 'ML-Based',
  );

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  return (
    <section className="bg-[#2a0a10] text-[#E8D8C4] py-24 px-6 md:px-12 w-full relative border-t border-[#C7B7A3]/10">

      {/* ── SECTION 1: RECENT INTERNSHIP ── */}
      <div className="max-w-[1400px] mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#C7B7A3]/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#C7B7A3] font-mono text-sm tracking-widest uppercase">
                Recent Internship
              </span>
              <span className="px-3 py-1 bg-[#C7B7A3]/10 border border-[#C7B7A3]/30 rounded-full text-[#C7B7A3] text-xs font-medium uppercase tracking-wider">
                Current
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#E8D8C4]">
              <span className="text-[#C7B7A3]">Via Zenvoyager</span> @ Hero MotoCorp
            </h2>
            <p className="text-[#C7B7A3]/70 text-sm mt-2 font-mono">
              Jan 5, 2026 – Feb 5, 2026
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recentInternships.map((project) => (
            <FeaturedCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* ── SECTION 2: FIRST INTERNSHIP ── */}
      <div className="max-w-[1400px] mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#C7B7A3]/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#C7B7A3] font-mono text-sm tracking-widest uppercase">
                First Internship
              </span>
              <span className="px-3 py-1 bg-[#C7B7A3]/10 border border-[#C7B7A3]/30 rounded-full text-[#C7B7A3] text-xs font-medium uppercase tracking-wider">
                Foundation
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#E8D8C4]">
              <span className="text-[#C7B7A3]">47billion</span>
            </h2>
            <p className="text-[#C7B7A3]/70 text-sm mt-2 font-mono">
              Apr 15, 2025 – May 15, 2025
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {firstInternship.map((project) => (
            <FeaturedCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* ── SECTION 3A: FULL-STACK PROJECTS ── */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
          <h3 className="text-2xl font-serif text-[#C7B7A3] uppercase tracking-widest">
            Full-Stack Projects
          </h3>
          <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fullStackProjects.map((project) => (
            <StandardCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* ── SECTION 3B: ML-BASED PROJECTS ── */}
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
          <h3 className="text-2xl font-serif text-[#C7B7A3] uppercase tracking-widest">
            ML-Based Projects
          </h3>
          <div className="h-[1px] bg-[#C7B7A3]/20 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mlProjects.map((project) => (
            <StandardCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* ── SHARED DRAWER MODAL ── */}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
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

// ─── FEATURED CARD ────────────────────────────────────────────────────────────

const FeaturedCard = ({ project, onClick }) => {
  const firstImage = resolveImageSrc(project.images[0]);
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer bg-[#22080d] border border-[#C7B7A3]/10 rounded-3xl overflow-hidden hover:border-[#C7B7A3]/30 transition-all duration-300 shadow-lg"
    >
      <div className="relative h-[250px] w-full overflow-hidden">
        {project.isLiveProject && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#150406]/90 rounded-full text-[#E8D8C4] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#E8D8C4]/55 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#E8D8C4] rounded-full animate-pulse shadow-[0_0_8px_rgba(232,216,196,0.8)]"></span>{' '}
            Live
          </div>
        )}
        <Image
          src={`/projects/${firstImage}`}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#22080d] to-transparent opacity-90" />
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-3xl font-serif text-[#E8D8C4] mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#E8D8C4]/10 text-[#E8D8C4] px-2 py-1 rounded backdrop-blur-sm border border-[#E8D8C4]/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className="text-[#C7B7A3]/80 text-sm leading-relaxed mb-6">
          {project.shortDescription}
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8D8C4] bg-[#2a0a10] p-3 rounded-lg border border-[#C7B7A3]/10">
          <FaCheckCircle className="text-[#C7B7A3]/60" />
          <span>{project.impact.substring(0, 60)}...</span>
        </div>
        <div className="mt-6 flex items-center text-[#C7B7A3] text-sm font-medium group-hover:text-[#E8D8C4] transition-colors">
          View Case Study{' '}
          <GoArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── STANDARD CARD ────────────────────────────────────────────────────────────

const StandardCard = ({ project, onClick }) => {
  const firstImage = resolveImageSrc(project.images[0]);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer bg-[#2a0a10] border border-[#C7B7A3]/10 rounded-xl overflow-hidden hover:border-[#C7B7A3]/40 transition-all duration-300"
    >
      <div className="relative aspect-video w-full bg-[#000]">
        <Image
          src={`/projects/${firstImage}`}
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
            <span
              key={i}
              className="text-[10px] text-[#C7B7A3] border border-[#C7B7A3]/20 px-1.5 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── DRAWER CONTENT ───────────────────────────────────────────────────────────

const ProjectDrawerContent = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="h-full flex flex-col bg-[#1a0508] relative overflow-hidden">
      {/* Fixed Header */}
      <div className="p-8 pb-4 border-b border-[#C7B7A3]/10 flex-shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[#C7B7A3] text-xs uppercase tracking-widest block mb-2">
              {project.category}
            </span>
            {project.dateRange && (
              <p className="text-[#C7B7A3]/70 text-xs font-mono mb-2">{project.dateRange}</p>
            )}
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

        {/* Tabs */}
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <p className="text-[#E8D8C4]/90 text-lg leading-relaxed">{project.shortDescription}</p>

            {project.collaboration && (
              <div className="p-4 bg-[#2a0a10] rounded-xl border border-[#C7B7A3]/10">
                <h4 className="text-xs font-bold text-[#C7B7A3] uppercase tracking-wider mb-2">
                  Collaboration
                </h4>
                <p className="text-[#E8D8C4]/85 text-sm leading-relaxed">
                  {project.collaboration.summary}
                </p>
                {project.collaboration.members?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.collaboration.members.map((member) => (
                      <a
                        key={member.name}
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C7B7A3]/30 text-[#E8D8C4] text-xs hover:border-[#E8D8C4] transition-colors"
                      >
                        <FaGithub /> {member.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#E8D8C4] text-[#2a0a10] px-6 py-3 rounded-full font-medium text-sm hover:bg-white transition-colors shadow-lg shadow-[#E8D8C4]/10"
                >
                  <FaGlobe /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-[#C7B7A3]/30 text-[#E8D8C4] px-6 py-3 rounded-full font-medium text-sm hover:border-[#E8D8C4] transition-colors"
                >
                  <FaGithub /> View Code
                </a>
              )}
            </div>

            <div className="p-6 bg-[#2a0a10] rounded-xl border border-[#C7B7A3]/10 mt-6">
              <h4 className="text-xs font-bold text-[#C7B7A3] uppercase tracking-wider mb-3">
                Project Impact
              </h4>
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
            <div>
              <h4 className="text-sm font-bold text-[#E8D8C4] uppercase tracking-wider mb-4 border-l-2 border-[#E8D8C4] pl-3">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {project.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#C7B7A3]/90 text-sm leading-relaxed p-3 bg-[#2a0a10] rounded-lg border border-[#C7B7A3]/5"
                  >
                    <FaCheckCircle className="text-[#E8D8C4] shrink-0 mt-0.5" size={14} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#E8D8C4] uppercase tracking-wider mb-4 border-l-2 border-[#E8D8C4] pl-3">
                Technology
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#C7B7A3]/10 border border-[#C7B7A3]/20 rounded text-sm text-[#E8D8C4]"
                  >
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
                <div
                  key={i}
                  className={`relative w-full rounded-xl overflow-hidden border border-[#C7B7A3]/20 shadow-2xl group ${
                    isPortraitImage(img)
                      ? 'aspect-[9/16] max-w-[360px] mx-auto bg-[#120407]'
                      : 'aspect-video'
                  }`}
                >
                  <Image
                    src={`/projects/${resolveImageSrc(img)}`}
                    alt={`Gallery ${i}`}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${
                      isPortraitImage(img)
                        ? 'object-contain bg-[#120407]'
                        : 'object-cover'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-mono">
                      IMG_0{i + 1} // VIEW MODE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#C7B7A3]/10 bg-[#150406] flex justify-between items-center text-[10px] text-[#C7B7A3]/40 font-mono uppercase">
        <span>Status: Deployed</span>
        <span>ID: {project.id || '001'}</span>
      </div>
    </div>
  );
};

export default ProjectsInteractive;