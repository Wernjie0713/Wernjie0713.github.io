import React from 'react';
import { motion } from 'framer-motion';

const RESUME_URL = 'https://drive.google.com/file/d/1VVZ1_Jbo4hWY4xDZo4GvtuLWAajG2QYY/view?usp=sharing';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 border-t border-neon-purple/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xl font-bold text-neon-purple neon-text font-cyber">
              <span className="inline-block">&lt;WJ/&gt;</span>
            </a>
            <p className="text-light/60 text-sm mt-2 font-mono">
              <span className="text-neon-purple">&#169;</span> {currentYear} <span className="text-neon-purple">&#123;</span>Yong Wern Jie<span className="text-neon-purple">&#125;</span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.linkedin.com/in/yong-wern-jie-0a5b90261/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/60 hover:text-neon-purple transition-colors group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/wernjie0713"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/60 hover:text-neon-purple transition-colors group"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="mailto:yongwernjie.2003@gmail.com"
                className="text-light/60 hover:text-neon-purple transition-colors group"
                aria-label="Email"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/60 hover:text-neon-purple transition-colors group"
                aria-label="Resume"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2z"/>
                </svg>
              </a>
            </div>
            <nav className="flex flex-wrap justify-center gap-5 text-xs text-light/60">
              {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  className="hover:text-neon-purple transition-colors font-mono relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-neon-purple/10 pt-4">
          <p className="text-center text-xs text-light/40 font-cyber">
            <span className="text-neon-purple">&lt;</span> Designed &amp; Built with <span className="text-neon-magenta animate-pulse">♥</span> by Yong Wern Jie <span className="text-neon-purple">/&gt;</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 