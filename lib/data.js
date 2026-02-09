import React from 'react';
import {
  FaReact, FaNodeJs, FaPython, FaRobot, FaDraftingCompass, FaCodeBranch, FaChartBar,
  FaGithub, FaTools, FaBuilding
} from 'react-icons/fa';
import { SiRedux, SiFastapi, SiMongodb, SiTailwindcss, SiAnaconda, SiFigma, SiJirasoftware } from 'react-icons/si';

// --- NEW: Professional Experience Data ---
export const experienceData = [
  {
    company: "Hero MotoCorp (CSR)",
    role: "Full Stack Developer Intern",
    period: "1 Month",
    location: "Remote / Hybrid",
    description: "Contributed to high-impact safety initiatives for one of the world's largest two-wheeler manufacturers.",
    projects: [
      {
        title: "Surakshit Saathi",
        type: "Safety Platform",
        details: "A multilingual safety training platform managing slots, attendance, and certification.",
        impact: "Streamlined operations & reduced manual coordination by 40%.",
        tech: ["React", "Redux", "FastAPI", "MongoDB", "i18n"],
        images: ["surakshit1.png"], // Add your real image paths
        link: "https://github.com/your-username/Surakshit_Saathi" 
      },
      {
        title: "My Family. My Safety",
        type: "Admin Dashboard",
        details: "Centralized tracking for 30+ schools, zone audits, and infrastructure execution.",
        impact: "Enabled real-time decision making for large-scale safety initiatives.",
        tech: ["React", "Redux", "FastAPI", "JIRA"],
        images: ["safety1.png"], // Add your real image paths
        link: "https://github.com/your-username/Surakshit_Saathi"
      }
    ]
  }
];

// --- EXISTING: Personal Projects ---
export const projectsData = [
  {
    title: "CoE Platform",
    shortDescription: "Event and content management platform.",
    tech: ["React", "FastAPI", "MongoDB", "JWT"],
    images: ["coe1.png"],
    location: "Personal Project",
    link: "https://github.com/sujaldef/centerofexcellence"
  },
  {
    title: "Skillnavigator",
    shortDescription: "AI-powered personalized learning.",
    tech: ["React", "MongoDB", "Tailwind", "AI"],
    images: ["skill7.png"],
    location: "Personal Project",
    link: "https://github.com/sujaldef/skillnavigator"
  },
  {
    title: "Loconomy",
    shortDescription: "Decentralized local service platform.",
    tech: ["React", "Node.js", "WebSocket", "MongoDB"],
    images: ["loco1.png"],
    location: "Personal Project",
    link: "https://github.com/sujaldef/Loconomi"
  },
  {
    title: "Dormease",
    shortDescription: "Dormitory management system.",
    tech: ["React", "FastAPI", "MongoDB"],
    images: ["dorm5.png"],
    location: "Personal Project",
    link: "https://github.com/sujaldef/Dormease"
  }
];