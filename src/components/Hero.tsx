import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (glitchRef.current) {
        glitchRef.current.classList.add('glitch-text');
        setTimeout(() => {
          if (glitchRef.current) {
            glitchRef.current.classList.remove('glitch-text');
          }
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="flex items-center justify-center min-h-screen pt-16 cyber-grid">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-neon-purple rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-[30%] left-[15%] w-40 h-40 bg-neon-blue rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[30%] w-28 h-28 bg-neon-purple rounded-full filter blur-[90px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center md:text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span className="font-cyber text-md sm:text-lg text-neon-blue">
              <span className="inline-block w-5 h-px bg-neon-blue mr-2 align-middle"></span>
              System.init()</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-lightest mb-4 font-cyber"
            ref={glitchRef}
          >
            <span className="block">Yong Wern Jie<span className="text-neon-purple">.</span></span>
            <span className="text-neon-purple neon-text"> &#123;Developer&#125;</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-light/70 mb-6"
          >
            I build <span className="relative">
              <span className="absolute inset-0 -z-10 h-full w-[125%] -mx-[12.5%] top-[10%] left-0 bg-neon-magenta/10 blur-lg"></span>
              modern web
            </span> experiences.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-light/70 max-w-xl mx-auto md:mx-0 mb-8 text-lg"
          >
            I'm a Computer Science student specializing in Data Engineering at UTM. 
            Currently, I'm leading development at Nexscholar and working on freelance web projects 
            that merge technology with seamless user experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative px-6 py-3 overflow-hidden font-medium text-white bg-primary shadow-inner group w-full sm:w-auto text-center"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-purple to-neon-blue opacity-20 group-hover:opacity-40 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-0 h-full bg-neon-purple group-hover:w-full transition-all duration-300 ease-out"></span>
              <span className="relative group-hover:text-white flex items-center justify-center">
                View My Work
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-neon-purple transition duration-300 ease-out border border-neon-purple rounded-md shadow-md group w-full sm:w-auto"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-neon-purple group-hover:translate-x-0 ease">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-neon-purple transition-all duration-300 transform group-hover:translate-x-full ease">Contact Me</span>
              <span className="relative invisible">Contact Me</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button
          onClick={() => {
            const element = document.getElementById('about');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="animate-bounce"
        >
          <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero; 