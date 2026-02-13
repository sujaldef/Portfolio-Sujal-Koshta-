//_File: my-portfolio/app/layout.jsx_

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css'; // Your global styles

// app/layout.jsx

export const metadata = {
  title: 'Sujal Koshta | Portfolio',
  description:
    'The professional portfolio of Sujal Koshta, showcasing projects in React, Next.js, AI/ML, and more.',

  openGraph: {
    title: 'Sujal Koshta | Portfolio',
    description:
      'Projects, skills, and experience in full-stack development and AI.',
    url: 'https://your-domain.vercel.app',
    siteName: 'Sujal Koshta',
    images: [
      {
        url: 'https://your-domain.vercel.app/og.png', // MUST be absolute
        width: 1200,
        height: 630,
        alt: 'Sujal Koshta Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sujal Koshta | Portfolio',
    description:
      'Projects, skills, and experience in full-stack development and AI.',
    images: ['https://your-domain.vercel.app/og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth  custom-scroll">
      <body className="bg-[var(--bg)] gradient-bg text-[var(--text-main)] font-sans">
        
        <main>{children}</main>
       
      </body>
    </html>
  );
}