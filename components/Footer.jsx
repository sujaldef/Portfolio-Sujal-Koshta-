import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3F0EA] border-t border-[#1A1A1A]/10 py-12 px-6 lg:px-12 text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-center md:text-left">
             <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
                © {currentYear} Sujal Koshta.
             </p>
             <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-center md:justify-start">
                Built with <FaHeart className="text-red-400" size={10} /> in React & Tailwind.
             </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/sujalkoshta/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform hover:text-blue-600">
              <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/sujaldef" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform hover:text-black">
              <FaGithub size={20} />
          </a>
          {/* Disabled Link Style */}
          <a href="#" className="opacity-30 cursor-not-allowed" title="Coming Soon">
              <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;