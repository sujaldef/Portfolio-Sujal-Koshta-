//_File: my-portfolio/components/Footer.jsx_

import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    // Fixed typo: --backgroundoppo -> --bg
    <footer style={{ padding: 'var(--section-padding-sm)' }} className="bg-[var(--bg)] text-[var(--text-muted)] text-center flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16">
      <p>© 2025 Sujal Koshta. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="https://www.linkedin.com/in/sujalkoshta/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition"><FaLinkedin size={20} /></a>
        <a href="https://github.com/sujaldef" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition"><FaGithub size={20} /></a>
        {/* Added a tooltip for the disabled icon */}
        <a href="#" title="Twitter (Not active)" className="opacity-50 cursor-not-allowed"><FaTwitter size={20} /></a>
      </div>
    </footer>
  );
};

export default Footer;