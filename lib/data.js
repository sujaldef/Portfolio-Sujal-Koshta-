import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaRobot,
  FaDraftingCompass,
  FaCodeBranch,
  FaChartBar,
  FaGithub,
  FaTools,
} from 'react-icons/fa';
import {
  SiRedux,
  SiFastapi,
  SiMongodb,
  SiTailwindcss,
  SiAnaconda,
  SiFigma,
} from 'react-icons/si';

export const projectsData = [
  // --- PROFESSIONAL WORK (Zenvoyager / Hero) ---
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
      'Multilingual safety training platform managing slots and certification.',
    details: [
      'Built user and admin dashboards for managing training slots, attendance, and progress tracking.',
      'Implemented OTP-based authentication flow for secure user login and verification.',
      'Developed slot booking and calendar management system for online and offline training sessions.',
      'Integrated multilingual support (English & Hindi) using i18n for better accessibility.',
      'Designed responsive UI with role-based access control for users, trainers, and admins.',
    ],
    impact:
      'Streamlined safety training operations, reducing manual coordination effort by 40%.',
    tech: ['React', 'Redux Toolkit', 'FastAPI', 'MongoDB', 'i18n'],
    images: [
      'surakshit1.png',
      'surakshit2.png',
      'surakshit3.png',
      'surakshit4.png',
    ],
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
      'Centralized dashboard for tracking large-scale safety initiatives.',
    details: [
      'Developed unified dashboard to track drawing competitions across 30+ schools.',
      'Implemented QR-based result access and automated certificate generation.',
      'Built phase-wise tracking for Safe School Zones from audit to installation.',
      'Enabled monitoring of intersections and road signages with execution status.',
      'Integrated online and offline pledge tracking with real-time visualization.',
    ],
    impact:
      'Enabled real-time decision-making for large-scale safety initiatives across multiple zones.',
    tech: ['React', 'Redux Toolkit', 'FastAPI', 'MongoDB', 'JIRA'],
    images: ['safety1.png', 'safety2.png', 'safety3.png', 'safety4.png'],
    liveLink: 'https://csr.heromotocorp.com/',
    githubLink: '',
  },

  // --- INTERNSHIP EXPERIENCES ---
  {
    id: 'personal-5',
    category: 'Personal Project',
    company: 'Personal',
    title: 'Loconomy',
    shortDescription: 'Decentralized platform for local service providers.',
    details: [
      'Developed real-time location-based service discovery using WebSocket.',
      'Built responsive UI with React for seamless user experience.',
      'Integrated MongoDB for efficient data management and scalability.',
      'Implemented secure API endpoints for service provider interactions.',
      'Designed location tracking with privacy-first principles.',
    ],
    impact: 'Connected over 1,000 local service providers with users.',
    tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    images: ['loco1.png', 'loco2.png', 'loco3.png', 'loco4.png'],
    liveLink: '',
    githubLink: 'https://github.com/sujaldef/Loconomi',
  },

  // --- PERSONAL PROJECTS ---
  {
    id: 'personal-2',
    category: 'Personal Project',
    company: 'Personal',
    title: 'Skillnavigator',
    shortDescription: 'AI-powered platform for personalized learning paths.',
    details: [
      'Built AI-driven recommendation engine for personalized learning paths.',
      'Developed adaptive testing system for role-based skill assessments.',
      'Integrated Tailwind CSS for a modern, responsive user interface.',
      'Utilized MongoDB for efficient storage and retrieval of user data.',
      'Implemented analytics dashboard for tracking learning progress.',
    ],
    impact:
      'Enhanced learning efficiency by 35% through tailored content delivery.',
    tech: ['React', 'MongoDB', 'Tailwind', 'AI'],
    images: [
      'skill7.png',
      'skill2.png',
      'skill3.png',
      'skill4.png',
      'skill5.png',
    ],
    liveLink: 'https://skillnav.vercel.app/',
    githubLink: '',
  },
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
      'Event and content management platform with real-time updates.',
    details: [
      'Developed admin and user dashboards for seamless content management.',
      'Implemented real-time event updates using WebSocket technology.',
      'Integrated JWT for secure user authentication and authorization.',
      'Designed scalable backend architecture with FastAPI and MongoDB.',
      'Optimized UI for accessibility and responsiveness across devices.',
    ],
    impact:
      'Improved user engagement through real-time updates and streamlined content flows.',
    tech: ['React', 'FastAPI', 'MongoDB', 'JWT'],
    images: ['coe4.png', 'coe2.png', 'coe3.png', 'coe1.png', 'coe5.png'],
    liveLink: 'https://coe-47billion.vercel.app/',
    githubLink: '',
  },
  {
    id: 'personal-4',
    category: 'Personal Project',
    company: 'Personal',
    title: 'Dormease',
    shortDescription: 'Dormitory management system with dashboards.',
    details: [
      'Created user and admin dashboards for room and payment management.',
      'Implemented FastAPI backend for efficient API performance.',
      'Integrated MongoDB for robust data storage and querying.',
      'Developed intuitive UI for maintenance request submissions.',
      'Ensured secure payment tracking with encryption protocols.',
    ],
    impact: 'Reduced dormitory management overhead by 30%.',
    tech: ['React', 'FastAPI', 'MongoDB'],
    images: ['dorm5.png',  'dorm2.png', 'dorm3.png', 'dorm4.png'],
    liveLink: '',
    githubLink: 'https://github.com/sujaldef/Dormease',
  },
  {
    id: 'personal-3',
    category: 'Personal Project',
    company: 'Personal (Collaboration)',
    title: 'Medi-Setu (Medical Bridge)',
    shortDescription:
      'Mobile-first telemedicine platform connecting patients, doctors, pharmacies, and labs in low-bandwidth regions.',
    details: [
      'Developed a role-based full-stack healthcare platform covering admin, doctor, patient, pharmacy, and lab workflows.',
      'Implemented teleconsultation-ready appointment flow with online/offline modes and Jitsi room generation.',
      'Designed low-bandwidth-tolerant, mobile-first UX for rural and semi-urban users with notification-first interactions.',
      'Built integrated lifecycle flows: consult, prescribe, medicine order, lab booking, report delivery, and emergency support.',
      'Added modular REST APIs with JWT authentication and Redux Toolkit-powered frontend state management.',
    ],
    impact:
      'Improved healthcare access by unifying fragmented care journeys into a single telemedicine coordination platform.',
    tech: [
      'React',
      'Vite',
      'Redux Toolkit',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Jitsi',
    ],
    images: [
      'medi_web1.png',
      'medi_web2.png',
      'medi_phone1.png',
      'medi_phone2.png',
      'medi_phone3.png',
    ],
    collaboration: {
      summary: 'Built in collaboration with Sourabh Mourya and Sujal Khosta.',
      members: [
        {
          name: 'Sourabh Mourya',
          github: 'https://github.com/sourabh-mourya',
        },
        {
          name: 'Sujal Khosta',
          github: 'https://github.com/sujaldef',
        },
      ],
    },
    liveLink: 'https://medisetu-healthcare.vercel.app/',
    githubLink: '',
  },
];

// About Section Data
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
      description:
        'Exploring deep learning architectures and NLP to build smarter, data-driven applications.',
      tags: ['TensorFlow', 'PyTorch', 'OpenCV'],
      icon: <FaRobot />,
    },
    {
      title: 'Full Stack Architecture',
      description:
        'Building scalable web applications from front-end to back-end with a focus on clean code and user experience.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      icon: <FaCodeBranch />,
    },
    {
      title: 'Data Science & Analytics',
      description:
        'Leveraging big data technologies to extract meaningful insights and create predictive models.',
      tags: ['Python', 'R', 'Tableau'],
      icon: <FaChartBar />,
    },
  ],
};
