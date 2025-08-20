"use client";

// This component is a client-side component, allowing the use of React hooks.
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDraftingCompass,
  FaRobot,
  FaPython,
  FaGithub,
  FaTools,
  FaCodeBranch,
  FaChartBar,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiFastapi,
  SiMongodb,
  SiAnaconda,
  SiFigma,
} from "react-icons/si";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiPencilRuler2Line, RiBracesLine } from "react-icons/ri";
import { LuPaintbrush } from "react-icons/lu";

// --- Data for the about section with added descriptions ---
const aboutData = {
  skills: [
    {
      name: "React.js",
      description: "Building modern and responsive user interfaces.",
      icon: <FaReact size={40} />,
    },
    {
      name: "Tailwind CSS",
      description: "Rapidly styling applications with utility-first CSS.",
      icon: <SiTailwindcss size={40} />,
    },
    {
      name: "Redux",
      description: "Managing complex application state effectively.",
      icon: <SiRedux size={40} />,
    },
    {
      name: "Node.js",
      description: "Developing scalable back-end services and APIs.",
      icon: <FaNodeJs size={40} />,
    },
    {
      name: "UI/UX Design",
      description:
        "Creating intuitive and visually appealing user experiences.",
      icon: <FaDraftingCompass size={40} />,
    },
    {
      name: "Machine Learning",
      description: "Developing intelligent, data-driven algorithms.",
      icon: <FaRobot size={40} />,
    },
    {
      name: "Python",
      description: "Scripting and building robust applications.",
      icon: <FaPython size={40} />,
    },
    {
      name: "FastAPI",
      description: "Crafting high-performance and scalable APIs.",
      icon: <SiFastapi size={40} />,
    },
    {
      name: "MongoDB",
      description: "Managing flexible, document-based NoSQL databases.",
      icon: <SiMongodb size={40} />,
    },
  ],
  tools: [
    {
      name: "GitHub",
      description: "Collaborating on code and version control.",
      icon: <FaGithub size={40} />,
    },
    {
      name: "VS Code",
      description: "My primary code editor for development.",
      icon: <FaTools size={40} />,
    },
    {
      name: "Jupyter",
      description: "Exploring and analyzing data interactively.",
      icon: <FaPython size={40} />,
    },
    {
      name: "Anaconda",
      description: "Managing environments for data science projects.",
      icon: <SiAnaconda size={40} />,
    },
    {
      name: "Figma",
      description: "Crafting UI/UX prototypes and design systems.",
      icon: <SiFigma size={40} />,
    },
  ],
  interests: [
    {
      title: "AI & Machine Learning",
      description:
        "Exploring deep learning architectures and NLP to build smarter, data-driven applications.",
      tags: ["TensorFlow", "PyTorch", "OpenCV"],
      icon: <FaRobot />,
    },
    {
      title: "Full Stack Architecture",
      description:
        "Building scalable web applications from front-end to back-end with a focus on clean code and user experience.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      icon: <FaCodeBranch />,
    },
    {
      title: "Data Science & Analytics",
      description:
        "Leveraging big data technologies to extract meaningful insights and create predictive models.",
      tags: ["Python", "R", "Tableau"],
      icon: <FaChartBar />,
    },
  ],
};

// --- Updated Rotating Cards Component with mouse interaction and new styling ---
const RotatingCards = ({ data }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let autoRotate = true;
    let rotationSpeed = 0.05; // Base speed for constant rotation

    // Handle mouse movement to add user control
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        // Calculate the mouse position relative to the center (-1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        // Adjust rotation speed based on mouseX. The outer limits of the container will have the fastest speed.
        rotationSpeed = mouseX * 0.5;
        autoRotate = false;
      }
    };

    // Reset to auto-rotate when the mouse leaves the container
    const handleMouseLeave = () => {
      autoRotate = true;
      rotationSpeed = 0.05;
    };

    const animate = () => {
      setRotation((prevRotation) => prevRotation + rotationSpeed);
      if (autoRotate) {
        rotationSpeed = 0.05; // Revert to base speed for auto-rotation
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      animate();
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rotating-cards-wrapper flex items-center justify-center p-8 lg:p-12"
    >
      {/* The rotation style is now dynamically controlled by React state */}
      <div
        className="rotating-cards-inner"
        style={{
          "--quantity": data.length,
          transform: `translate(-50%, -50%) perspective(1000px) rotateX(-15deg) rotateY(${rotation}deg)`,
        }}
      >
        {data.map((item, index) => {
          return (
            <div
              key={item.name}
              className="card rounded-xl p-4 shadow-xl"
              style={{
                "--index": index,
              }}
            >
              <div className="flex flex-col items-center justify-center w-full h-full text-center p-2 text-slate-100">
                <div className="text-4xl mb-2">{item.icon}</div>
                <span className="font-semibold text-sm sm:text-base mb-1">
                  {item.name}
                </span>
                <p className="text-xs text-slate-400 max-w-[120px]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Main AboutSection Component with the new layout ---
const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const { skills, tools, interests } = aboutData;

  const navItems = [
    { id: "bio", label: "Introduction" },
    { id: "skills", label: "Competencies" },
    { id: "tools", label: "My Toolkit" },
    { id: "interests", label: "Interests" },
  ];

  const cardItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <>
      <style>
        {`
          /* Default primary color variable, can be overridden by a parent component */
          :root {
            --primary: #8a2be2; /* Example: a vibrant purple */
          }

          .rotating-cards-wrapper {
            --w: 120px;
            --h: 180px;
            position: relative;
            width: 100%;
            height: 400px;
            text-align: center;
            overflow: hidden;
            touch-action: none; /* Prevents touch scrolling on the carousel */
          }

          .rotating-cards-inner {
            --translateZ: calc((var(--w) + var(--h)) * 0.8);
            --rotateX: -15deg;
            --perspective: 1000px;
            position: absolute;
            width: var(--w);
            height: var(--h);
            top: 50%;
            left: 50%;
            transform-style: preserve-3d;
            /* The transform is now controlled by JavaScript */
          }

          .rotating-cards-inner .card {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--w);
            height: var(--h);
            backdrop-filter: blur(8px);
            /* The cards now use the primary color */
            background: linear-gradient(135deg, rgba(var(--primary), 0.1), rgba(var(--primary), 0.3));
            border: 1px solid rgba(var(--primary), 0.5);
            transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .rotating-cards-inner .card:hover {
            transform: scale(1.05) rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
            box-shadow: 0 0 30px rgba(var(--primary), 0.4);
          }

          @media (max-width: 640px) {
            .rotating-cards-wrapper {
              --w: 100px;
              --h: 150px;
              height: 300px;
            }
          }
        `}
      </style>
      <section
        id="about"
        className="py-20 px-4 sm:px-6 bg-[#0D0618] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center text-4xl font-semibold mb-4">
              About Me
            </h2>
            <p className="max-w-3xl mx-auto mb-16 text-slate-400 text-center leading-relaxed">
              An overview of my technical skills, the tools I use, and my
              professional interests.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <ul className="space-y-2 lg:sticky lg:top-24">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${activeTab === item.id ? "bg-slate-800" : "bg-transparent hover:bg-slate-800/50"}`}
                    >
                      <div
                        className={`w-1 h-8 rounded-full transition-colors duration-300 ${activeTab === item.id ? "bg-[var(--primary)]" : "bg-slate-700"}`}
                      />
                      <span
                        className={`font-semibold transition-colors duration-300 ${activeTab === item.id ? "text-white" : "text-slate-400"}`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeTab === "bio" && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-slate-200">
                        Introduction
                      </h3>
                      <p className="text-lg text-slate-400 leading-relaxed">
                        I am a results-oriented Full-Stack Developer with a
                        proven track record of designing, developing, and
                        deploying scalable and efficient web applications. My
                        expertise spans the entire development lifecycle, from
                        conceptualization and UI/UX design to back-end
                        architecture and database management. I am deeply
                        passionate about leveraging technology to solve complex
                        problems and create intuitive, user-centric digital
                        experiences. My work in AI-driven and hyperlocal
                        platforms has honed my ability to thrive in agile,
                        fast-paced environments and deliver high-quality,
                        impactful software.
                      </p>
                    </div>
                  )}

                  {activeTab === "skills" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      {/* Using the updated RotatingCards component */}
                      <RotatingCards data={skills} />
                    </div>
                  )}

                  {activeTab === "tools" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      {/* Using the updated RotatingCards component */}
                      <RotatingCards data={tools} />
                    </div>
                  )}

                  {activeTab === "interests" && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-slate-200">
                        Areas of Professional Interest
                      </h3>
                      <motion.div className="space-y-6">
                        {interests.map((interest) => (
                          <motion.div
                            key={interest.title}
                            className="bg-slate-800/50 p-6 rounded-lg"
                            variants={cardItemVariants}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "rgba(30, 41, 59, 0.8)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center gap-4 mb-3">
                              <div className="text-2xl text-[var(--primary)]">
                                {interest.icon}
                              </div>
                              <h4 className="font-bold text-lg text-slate-200">
                                {interest.title}
                              </h4>
                            </div>
                            <p className="text-sm text-slate-400 mb-4">
                              {interest.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {interest.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
