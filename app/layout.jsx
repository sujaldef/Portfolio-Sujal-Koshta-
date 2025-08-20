//_File: my-portfolio/app/layout.jsx_

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css'; // Your global styles

export const metadata = {
  title: 'Sujal Koshta | Full-Stack Developer & AI Enthusiast',
  description: 'The professional portfolio of Sujal Koshta, showcasing projects in React, Next.js, AI/ML, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className="bg-[var(--bg)] gradient-bg text-[var(--text-main)] font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}