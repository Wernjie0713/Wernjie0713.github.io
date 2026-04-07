import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { initGA, logPageView } from './utils/analytics';
import { gsap, useGSAP } from './lib/gsap';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    logPageView();

    // Simulate loading
    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useGSAP(
    () => {
      if (!loading || !loaderRef.current) {
        return;
      }

      gsap.fromTo(
        loaderRef.current,
        { autoAlpha: 0, scale: 0.9 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
      );
    },
    { scope: loaderRef, dependencies: [loading], revertOnUpdate: true },
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-primary">
        <div
          ref={loaderRef}
          className="text-4xl font-cyber font-bold text-neon-purple neon-text"
        >
          <span className="text-neon-blue">{'<'}</span>WJ<span className="text-neon-blue">{'/>'}</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-primary relative overflow-hidden">
        {/* Global cyberpunk background elements */}
        <div className="fixed inset-0 cyber-grid opacity-10 z-0 pointer-events-none"></div>
        <div className="fixed inset-0 hexagon-mesh opacity-[0.03] z-0 pointer-events-none"></div>
        <div className="fixed inset-0 bg-noise opacity-[0.02] mix-blend-overlay z-0 pointer-events-none"></div>
        
        {/* Ambient global glow effects */}
        <div className="fixed -top-40 -left-40 w-80 h-80 bg-neon-purple/10 rounded-full filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>
        <div className="fixed -bottom-40 -right-40 w-80 h-80 bg-neon-blue/10 rounded-full filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>

        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Achievements />
                <Contact />
              </>
            } />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
