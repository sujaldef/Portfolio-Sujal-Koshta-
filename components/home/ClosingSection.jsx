// File: my-portfolio/components/home/ClosingSection.jsx

'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaUser, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';

// This is a new custom hook for the 3D tilt effect on hover
const useTilt = () => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    ref.current.style.setProperty('--x', `${y}deg`);
    ref.current.style.setProperty('--y', `${-x}deg`);
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--x', '0deg');
    ref.current.style.setProperty('--y', '0deg');
  };
  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};

const ClosingSection = () => {
  const { ref: resumeCardRef, onMouseMove, onMouseLeave } = useTilt();
  const [formData, setFormData] = useState({ email: '', reason: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const contactReasons = ['Job Opportunity', 'Project Inquiry', 'Collaboration', 'General Question'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.reason) newErrors.reason = 'Please select a reason.';
    if (!formData.message) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('sending');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus(response.ok ? 'success' : 'error');
      if (response.ok) setFormData({ email: '', reason: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 sm:px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* The main container is now a single column that centers its content */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-16">
        
        {/* Resume Section */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4">My Resume</h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Want the full story? Download my resume to see a detailed overview of my skills, projects, and professional experience.
            </p>
          </div>
          <div
            className="group relative"
            ref={resumeCardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#11071F]/80 to-[#190D2E]/80 border border-slate-700/50 rounded-xl p-8 flex flex-col justify-between transition-transform duration-300 overflow-hidden"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(var(--x)) rotateY(var(--y))' }}
            >
              {/* --- Background Glow --- */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center">
                    <FaUser className="text-2xl text-[var(--text-muted)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Sujal Koshta</h3>
                    <p className="text-sm text-[var(--text-muted)]">Full-Stack Developer</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">PDF</span>
              </div>
              
              <div className="space-y-4 mb-6 relative z-10">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Summary</h4>
                  <div className="w-full h-1.5 bg-slate-700/50 rounded-full mb-1"></div>
                  <div className="w-5/6 h-1.5 bg-slate-700/50 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Key Skills</h4>
                  <div className="flex items-center gap-4">
                     <FaReact className="text-xl text-blue-400" />
                     <FaNodeJs className="text-xl text-green-400" />
                     <FaPython className="text-xl text-yellow-400" />
                     <div className="w-full h-1.5 bg-slate-700/50 rounded-full"></div>
                  </div>
                </div>
              </div>

              <a href="/Sujal_koshta_resume.pdf" download="Sujal_Koshta_Resume.pdf" className="w-full mt-4 inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-bold py-3 px-6 rounded-lg transition-transform transform group-hover:scale-105 shadow-lg group-hover:shadow-[var(--primary)]/30 relative z-10">
                <FaFileDownload />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4">Let's Build Something</h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Have an idea or a project in mind? Fill out the form below and let's bring it to life.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-gradient-to-br from-[#11071F]/50 to-[#190D2E]/50 backdrop-blur-sm border border-slate-800/50 p-8 rounded-xl shadow-2xl">
            <div>
              <p className="block text-sm font-medium text-[var(--text-muted)] mb-3">What brings you here?</p>
              <div className="grid grid-cols-2 gap-2">
                {contactReasons.map((reason) => (
                  <button key={reason} type="button" onClick={() => setFormData(prev => ({ ...prev, reason }))} className={`relative px-3 py-2 text-sm rounded-md transition duration-200 text-center ${formData.reason === reason ? 'text-white' : 'text-[var(--text-muted)] bg-slate-800/50 hover:bg-slate-700/50'}`}>
                     {formData.reason === reason && <motion.div layoutId="contactReason" className="absolute inset-0 bg-[var(--primary)]/80 rounded-md" />}
                     <span className="relative">{reason}</span>
                  </button>
                ))}
              </div>
              {errors.reason && <p className="text-red-400 text-xs mt-2">{errors.reason}</p>}
            </div>
            <div className="relative">
               <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="peer w-full p-3 bg-transparent border-2 border-slate-700/50 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition placeholder-transparent" placeholder="Email"/>
               <label htmlFor="email" className="absolute left-3 -top-2.5 text-sm text-[var(--text-muted)] bg-[#140A23] px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--primary)]">Your Email</label>
               {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
            </div>
             <div className="relative">
               <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleInputChange} required className="peer w-full p-3 bg-transparent border-2 border-slate-700/50 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition placeholder-transparent" placeholder="Message"></textarea>
               <label htmlFor="message" className="absolute left-3 -top-2.5 text-sm text-[var(--text-muted)] bg-[#140A23] px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--primary)]">Your Message</label>
               {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
            </div>
            <div>
              <button type="submit" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--primary)] text-white font-semibold rounded-md hover:bg-[var(--primary)]/90 transition duration-200 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
                {status === 'sending' ? (<><FaSpinner className="animate-spin" /> Sending...</>) : (<><FaPaperPlane /> Send Message</>)}
              </button>
            </div>
            {status === 'success' && <div className="p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-md flex items-center gap-3 text-sm"><FaCheckCircle /> Message sent successfully!</div>}
            {status === 'error' && <div className="p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-md flex items-center gap-3 text-sm"><FaExclamationTriangle /> Something went wrong. Please try again.</div>}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ClosingSection;