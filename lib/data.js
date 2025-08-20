// File: my-portfolio/lib/data.js

import React from 'react';
import {
  FaReact, FaCss3Alt, FaNodeJs, FaPython, FaRobot, FaDraftingCompass, FaCodeBranch, FaChartBar,
  FaGithub, FaTools, FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';
import { SiRedux, SiFastapi, SiMongodb, SiTailwindcss, SiVercel, SiFigma, SiPostman, SiAnaconda } from 'react-icons/si';

// Your project data remains here
export const projectsData = [
  {
    title: "CoE Platform",
    shortDescription: "Event and content management platform with dashboards.",
    details: [
      "Developed admin and user dashboards for seamless content management.",
      "Implemented real-time event updates using WebSocket technology.",
      "Integrated JWT for secure user authentication and authorization.",
      "Designed scalable backend architecture with FastAPI and MongoDB.",
      "Optimized UI for accessibility and responsiveness across devices."
    ],
    impact: "Streamlined event management for organizations, reducing manual coordination by 40% and improving user engagement through real-time updates.",
    tech: ["React", "FastAPI", "MongoDB", "JWT"],
    images: ["coe1.png", "coe2.png", "coe3.png", "coe4.png", "coe5.png"],
    link: "https://github.com/sujaldef/centerofexcellence"
  },
  {
    title: "Skillnavigator",
    shortDescription: "AI-powered platform for personalized learning.",
    details: [
      "Built AI-driven recommendation engine for personalized learning paths.",
      "Developed adaptive testing system for role-based skill assessments.",
      "Integrated Tailwind CSS for a modern, responsive user interface.",
      "Utilized MongoDB for efficient storage and retrieval of user data.",
      "Implemented analytics dashboard for tracking learning progress."
    ],
    impact: "Enhanced learning efficiency by 35% through tailored content delivery and increased user retention with engaging UI.",
    tech: ["React", "MongoDB", "Tailwind", "AI"],
    images: ["skill7.png", "skill2.png", "skill3.png", "skill4.png", "skill5.png", "skill6.png", "skill1.png"],
    link: "https://github.com/sujaldef/skillnavigator"
  },
  {
    title: "Loconomy",
    shortDescription: "Decentralized platform for local service providers.",
    details: [
      "Developed real-time location-based service discovery using WebSocket.",
      "Built responsive UI with React for seamless user experience.",
      "Integrated MongoDB for efficient data management and scalability.",
      "Implemented secure API endpoints for service provider interactions.",
      "Designed location tracking with privacy-first principles."
    ],
    impact: "Connected over 1,000 local service providers with users, boosting local economies and reducing service discovery time by 50%.",
    tech: ["React", "Node.js", "WebSocket", "MongoDB"],
    images: ["loco1.png", "loco2.png", "loco3.png", "loco4.png"],
    link: "https://github.com/sujaldef/Loconomi"
  },
  {
    title: "Dormease",
    shortDescription: "Dormitory management system with dashboards.",
    details: [
      "Created user and admin dashboards for room and payment management.",
      "Implemented FastAPI backend for efficient API performance.",
      "Integrated MongoDB for robust data storage and querying.",
      "Developed intuitive UI for maintenance request submissions.",
      "Ensured secure payment tracking with encryption protocols."
    ],
    impact: "Reduced dormitory management overhead by 30% and improved resident satisfaction through streamlined processes.",
    tech: ["React", "FastAPI", "MongoDB"],
    images: ["dorm5.png", "dorm2.png", "dorm3.png", "dorm4.png"],
    link: "https://github.com/sujaldef/Dormease"
  }
];

// Data for the new "Holo-Deck" About Section
export const aboutData = {
  skills: [
    { name: 'React.js', icon: <FaReact size={40} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} /> },
    { name: 'Redux', icon: <SiRedux size={40} /> },
    { name: 'Node.js', icon: <FaNodeJs size={40} /> },
    { name: 'UI/UX Design', icon: <FaDraftingCompass size={40} /> },
    { name: 'Machine Learning', icon: <FaRobot size={40} /> },
    { name: 'Python', icon: <FaPython size={40} /> },
    { name: 'FastAPI', icon: <SiFastapi size={40} /> },
    { name: 'MongoDB', icon: <SiMongodb size={40} /> },
  ],
  tools: [
    { name: 'GitHub', icon: <FaGithub /> },
    { name: 'VS Code', icon: <FaTools /> },
    { name: 'Jupyter', icon: <FaPython /> },
    { name: 'Anaconda', icon: <SiAnaconda /> },
    { name: 'Figma', icon: <SiFigma /> },
  ],
  interests: [
    {
      title: 'AI & Machine Learning',
      description: 'Exploring deep learning architectures and NLP to build smarter, data-driven applications.',
      tags: ['TensorFlow', 'PyTorch', 'OpenCV'],
      icon: <FaRobot />,
    },
    {
      title: 'Full Stack Architecture',
      description: 'Building scalable web applications from front-end to back-end with a focus on clean code and user experience.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      icon: <FaCodeBranch />,
    },
    {
      title: 'Data Science & Analytics',
      description: 'Leveraging big data technologies to extract meaningful insights and create predictive models.',
      tags: ['Python', 'R', 'Tableau'],
      icon: <FaChartBar />,
    },
  ],
};