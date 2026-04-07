import React, { useRef } from 'react';
import { useGsapHover } from '../hooks/useGsapHover';
import { useGsapParallax } from '../hooks/useGsapParallax';
import { useGsapReveal } from '../hooks/useGsapReveal';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapHover(sectionRef);
  useGsapParallax(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-primary/90"
    >
      {/* Enhanced Cyberpunk background elements */}
      <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>

      {/* Digital circuit lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-0 top-0 w-1/3 h-px bg-gradient-to-r from-neon-blue to-transparent opacity-30"></div>
        <div className="absolute right-0 top-1/4 w-1/2 h-px bg-gradient-to-l from-neon-purple to-transparent opacity-30"></div>
        <div className="absolute left-10 top-1/3 w-1/4 h-px bg-gradient-to-r from-neon-pink to-transparent opacity-20"></div>
        <div className="absolute right-20 bottom-1/4 w-1/3 h-px bg-gradient-to-l from-neon-blue to-transparent opacity-30"></div>
      </div>

      {/* Vertical data streams */}
      <div className="absolute top-0 right-1/5 w-px h-1/3 bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-15"></div>
      <div className="absolute bottom-0 right-1/3 w-px h-1/3 bg-gradient-to-t from-transparent via-neon-pink to-transparent opacity-20"></div>

      {/* Ambient glow elements */}
      <div data-gsap-parallax="90" data-gsap-parallax-x="-20" className="absolute top-10 -left-20 w-40 h-40 bg-neon-purple/30 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div data-gsap-parallax="-70" data-gsap-parallax-x="25" className="absolute bottom-10 -right-20 w-60 h-60 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div data-gsap-parallax="55" data-gsap-parallax-scale="1.08" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-6xl bg-gradient-radial from-neon-purple/5 to-transparent opacity-20"></div>

      {/* Hexagon mesh pattern - subtle */}
      <div className="absolute inset-0 hexagon-mesh opacity-5"></div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/3 h-px w-1/4 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
      <div className="absolute right-0 bottom-1/3 h-px w-1/4 bg-gradient-to-l from-transparent via-neon-blue to-transparent opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-gsap-reveal="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-cyber text-white relative inline-block">
            <span className="relative z-10">About Me</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink"></span>
          </h2>
          <div className="w-16 h-1 bg-neon-purple mx-auto rounded-full my-4 glow-sm"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div
            data-gsap-reveal="left"
            data-gsap-delay="0.1"
            className="col-span-1 flex justify-center md:justify-end"
          >
            <div data-gsap-parallax="48" data-gsap-parallax-rotate="-6" className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-lg border-2 border-neon-purple glow-sm"></div>
              <div className="w-full h-full rounded-lg overflow-hidden transform rotate-3 border-2 border-neon-blue relative z-10">
                <img
                  src={require('../assets/images/profile_image.jpeg')}
                  alt="Yong Wern Jie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent opacity-30 animate-scan"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-purple/20 opacity-40"></div>
              </div>
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-neon-purple"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon-purple"></div>
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon-purple"></div>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-neon-purple"></div>
            </div>
          </div>

          <div
            data-gsap-reveal="up"
            data-gsap-delay="0.2"
            className="col-span-2 text-light/80 cyber-card p-6 border border-neon-purple/30 backdrop-blur-sm bg-primary/70"
          >
            <div className="space-y-4 font-mono text-sm leading-relaxed text-left">
              <p>
                <span className="text-neon-purple font-cyber">$&gt;</span> Computer Science (Data Engineering) student at UTM with hands-on experience building production-grade analytics platforms, AI-powered applications, and full-stack systems. Currently serving as Data Engineering Intern at Marrybrown and Senior System Developer at Nexscholar, focused on solving real business problems through scalable architecture, data validation, and intelligent automation.
              </p>

              <p>
                <span className="text-neon-purple font-cyber">&lt;tech_stack&gt;</span>
                <br />- <span className="text-neon-pink">Data Engineering:</span> ETL Design, Data Warehousing, SQL, Data Validation, Reporting Systems
                <br />- <span className="text-neon-pink">Backend &amp; Full-Stack:</span> Laravel, FastAPI, React.js, Inertia.js, MySQL, Supabase
                <br />- <span className="text-neon-pink">AI Systems:</span> OpenAI API, RAG Architecture, Qdrant, Semantic Matching, Azure OCR
                <br />- <span className="text-neon-pink">Analytics &amp; BI:</span> Power BI, Tableau, Reporting Automation, Reconciliation Workflows
              </p>

              <p>
                <span className="text-neon-purple font-cyber">&lt;key_achievements&gt;</span>
                <br />- <span className="text-neon-blue">Champion</span> - InnovHack 2025
                <br />- <span className="text-neon-blue">Champion</span> - Cisco AI Hackathon 2024
                <br />- <span className="text-neon-blue">Gold Award</span> - INATEX 2025
                <br />- <span className="text-neon-blue">2nd Place</span> - SEA-CICSIS 2025
                <br />- <span className="text-neon-blue">2nd Place</span> - UTM-UMK Datathon 2025
                <br />- <span className="text-neon-blue">2nd Place</span> - PayNet Digital Campus 4.0 (University &amp; Student Categories)
                <br />- <span className="text-neon-blue">2nd Place &amp; Special Award</span> - PayNet Digital Campus 3.0
              </p>

              <p>
                <span className="text-neon-purple font-cyber">$&gt; </span>Passionate about building reliable systems that connect data, software, and decision-making, especially across analytics engineering, AI integration, and production-scale internal platforms.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                data-gsap-hover="1.05"
                data-gsap-hover-duration="0.22"
                data-gsap-press="0.96"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: offsetTop - 80,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-primary border border-neon-purple rounded-md hover:bg-gray-900 transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-neon-purple rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  Get in Touch
                  <svg className="w-4 h-4 ml-2 -mr-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
