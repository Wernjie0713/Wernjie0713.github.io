import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Threads from '../blocks/Backgrounds/Threads/Threads';
import CircularText from './CircularText';
import ShinyText from './ShinyText';
import LogoLoop from './LogoLoop';
import { logButtonClick } from '../utils/analytics';

const Hero: React.FC = () => {
  const glitchRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Only render threads when hero section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Detect low performance devices to further reduce quality
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  useEffect(() => {
    // Simple performance detection
    const isLowEnd = 
      window.navigator.hardwareConcurrency <= 4 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    setIsLowPerformance(isLowEnd);
  }, []);

  const handleViewWorkClick = () => {
    logButtonClick('View My Work');
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    logButtonClick('Contact Me');
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = () => {
    logButtonClick('Scroll to About');
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const techLogos = [
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:python" className="text-3xl" /> <span className="text-xl font-bold font-mono">Python</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="devicon:microsoftsqlserver" className="text-3xl" /> <span className="text-xl font-bold font-mono">SQL Server</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="vscode-icons:file-type-mysql" className="text-3xl" /> <span className="text-xl font-bold font-mono">MySQL</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="carbon:data-format" className="text-3xl text-neon-blue" /> <span className="text-xl font-bold font-mono">ETL/ELT</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="carbon:data-base" className="text-3xl text-neon-purple" /> <span className="text-xl font-bold font-mono">Data Warehousing</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="simple-icons:fastapi" className="text-3xl text-[#009688]" /> <span className="text-xl font-bold font-mono">FastAPI</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:supabase-icon" className="text-3xl" /> <span className="text-xl font-bold font-mono">Supabase</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:microsoft-power-bi" className="text-3xl" /> <span className="text-xl font-bold font-mono">Power BI</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:tableau-icon" className="text-3xl" /> <span className="text-xl font-bold font-mono">Tableau</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="vscode-icons:file-type-reactjs" className="text-3xl" /> <span className="text-xl font-bold font-mono">React</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:laravel" className="text-3xl" /> <span className="text-xl font-bold font-mono">Laravel</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="mdi:robot-outline" className="text-3xl text-neon-pink" /> <span className="text-xl font-bold font-mono">AI Integration</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="carbon:machine-learning-model" className="text-3xl text-neon-blue" /> <span className="text-xl font-bold font-mono">RAG</span></div> },
    { node: <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"><Icon icon="logos:qdrant" className="text-3xl" /> <span className="text-xl font-bold font-mono">Qdrant</span></div> },
  ];

  return (
    <>
      <section 
        id="home" 
        ref={sectionRef}
        className="flex items-center justify-center min-h-screen pt-16 relative overflow-hidden"
      >
        {/* ReactBits Threads Background */}
        {isVisible && (
        <div className="absolute inset-0 z-0 md:hidden">
          <Threads 
            color={[0.89, 0.13, 0.98] as any} // #e421fc (neon-purple)
            amplitude={isLowPerformance ? 0.8 : 1.2}
            distance={0.5}
            enableMouseInteraction={!isLowPerformance}
          />
        </div>
      )}
      
      {/* Ambient glow for better contrast with the threads */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-neon-purple rounded-full filter blur-[80px] opacity-30"></div>
        <div className="absolute bottom-[30%] left-[15%] w-40 h-40 bg-neon-blue rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-[10%] right-[30%] w-28 h-28 bg-neon-purple rounded-full filter blur-[90px] opacity-30"></div>
      </div>
      
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-primary opacity-60 z-[1]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
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
            <span className="text-neon-purple neon-text"> &#123;Data & AI Systems Builder&#125;</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-light/70 mb-6"
          >
            I build <span className="relative">
              <span className="absolute inset-0 -z-10 h-full w-[125%] -mx-[12.5%] top-[10%] left-0 bg-neon-magenta/10 blur-lg"></span>
              production-grade
            </span> data, analytics, and AI systems.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-light/70 max-w-xl mx-auto md:mx-0 mb-8 text-lg"
          >
            I’m a final-year Computer Science (Data Engineering) student at UTM, currently building production-grade analytics and reporting systems at Marrybrown while leading full-stack and AI system development at Nexscholar.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              onClick={handleViewWorkClick}
              className="relative px-6 py-3 overflow-hidden font-medium text-white bg-primary shadow-inner group w-full sm:w-auto text-center backdrop-blur-sm bg-primary/40 border border-neon-purple/30"
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
              onClick={handleContactClick}
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-neon-purple transition duration-300 ease-out border border-neon-purple rounded-md shadow-md group w-full sm:w-auto backdrop-blur-sm bg-primary/40"
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

      {/* Futuristic UI elements to complement the threads background */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center z-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={handleScrollToAbout}
          className="animate-bounce backdrop-blur-sm bg-primary/30 p-2 rounded-full border border-neon-purple/30 hover:bg-primary/50 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.button>
      </div>
      
      {/* Cyberpunk UI accent elements */}
      <div className="absolute top-20 md:top-28 left-4 md:left-10 w-20 md:w-32 h-px bg-neon-purple opacity-50 z-[1]"></div>
      <div className="absolute top-20 md:top-28 left-4 md:left-10 w-px h-20 md:h-32 bg-neon-blue opacity-50 z-[1]"></div>
      <div className="absolute bottom-24 right-4 md:right-10 w-20 md:w-32 h-px bg-neon-purple opacity-50 z-[1]"></div>
      <div className="absolute bottom-24 right-4 md:right-10 w-px h-20 md:h-32 bg-neon-blue opacity-50 z-[1]"></div>

      {/* Circular Text in bottom right corner */}
      <div className="absolute bottom-28 right-6 md:bottom-32 md:right-16 z-20 hidden md:flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        <CircularText 
          text="DATA*AI*FULL-STACK*" 
          onHover="speedUp" 
          spinDuration={20} 
          className="transform scale-75 md:scale-[0.85] [&_span]:text-white [&_span]:[text-shadow:2px_0px_0_#00f2fe,-2px_0px_0_#ff0050]"
        />
      </div>

      </section>

      {/* Infinte Logo Loop Section (Appears after scrolling down slightly) */}
      <div className="w-full bg-dark/80 backdrop-blur-md border-y border-neon-purple/20 relative z-20 py-4">
        <LogoLoop 
          logos={techLogos}
          speed={30}
          direction="left"
          logoHeight={40}
          gap={80}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#0b0b0b"
          className="py-2"
        />
      </div>
    </>
  );
};

export default Hero; 