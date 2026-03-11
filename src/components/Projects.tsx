import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

import utmDuitNowImg from '../assets/images/utmduitnow.png';
import aicademyImg from '../assets/images/aicademy.png';
import ghostfriendImg from '../assets/images/ghostfriend.png';
import nexscholarImg from '../assets/images/nexscholar.png';
import eqviewImg from '../assets/images/eqview.png';
import nexuscomplyImg from '../assets/images/nexuscomply.png';
import utmDuitNowAiImg from '../assets/images/utmduitnow-ai.png';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  url?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Nexscholar',
    description: 'Led development of Nexscholar, a production educational platform supporting academic collaboration, research workflows, and multi-role user experiences. Built core full-stack features using Laravel, React, Tailwind CSS, and MySQL, and developed AI-powered semantic matching and recommendation features using OpenAI, RAG architecture, and Qdrant.',
    technologies: ['Laravel', 'React.js', 'Tailwind CSS', 'MySQL', 'OpenAI API', 'RAG', 'Qdrant'],
    image: nexscholarImg,
    url: 'https://nexscholar.com'
  },
  {
    id: 2,
    title: 'UTM DuitNow AI (PayNet Digital Campus 4.0)',
    description: 'An AI-enhanced evolution of UTM DuitNow developed for PayNet Digital Campus 4.0, where the initiative secured 2nd Place in both the University and Student categories among 44 universities nationwide. Built to support smarter digital payment workflows, campus integration, onboarding, and large-scale transaction simulation for cashless transformation.',
    technologies: ['Laravel', 'React.js', 'MySQL', 'AI Integration', 'Tailwind CSS'],
    image: utmDuitNowAiImg,
    url: 'https://utmduitnow.com'
  },
  {
    id: 3,
    title: 'EQ-View',
    description: 'Champion-winning project at InnovHack 2025, built to help students improve interview performance through multimodal AI, real-time analysis, and privacy-first design. EQ-View addresses a real employability gap by turning intelligent feedback into a more practical and confident interview experience.',
    technologies: ['Artificial Intelligence', 'Multimodal AI', 'Real-Time Analysis'],
    image: eqviewImg,
  },
  {
    id: 4,
    title: 'UTM DuitNow (PayNet Digital Campus 3.0)',
    description: 'A transaction recording and verification platform developed for PayNet Digital Campus 3.0, where the project earned 2nd Place and a Special Award. Built with Laravel, React, MySQL, and OCR integration to automate receipt data extraction, secure transaction logging, and reporting for campus cashless payment adoption.',
    technologies: ['Laravel', 'React.js', 'MySQL', 'OCR', 'Tailwind CSS'],
    image: utmDuitNowImg
  },
  {
    id: 5,
    title: 'NexusComply',
    description: 'A full-stack compliance management system designed to streamline audit workflows for multi-outlet businesses. Built with Laravel, React, Inertia.js, React Native, and Supabase, featuring a no-code form builder and an AI-powered Excel import tool that converts spreadsheet checklists into structured digital forms.',
    technologies: ['Laravel', 'React', 'Inertia.js', 'React Native', 'Supabase', 'Artificial Intelligence'],
    image: nexuscomplyImg,
  },
  {
    id: 6,
    title: 'FYP-Link',
    description: 'A full-stack web application built to centralize the university Final Year Project lifecycle across five user roles: students, supervisors, committees, evaluators, and admins. Developed with .NET 9, ASP.NET Core Web API, React, Tailwind CSS, and Supabase to streamline workflows from registration to final evaluation.',
    technologies: ['.NET 9', 'ASP.NET Core Web API', 'React.js', 'Tailwind CSS', 'Supabase']
  },
  {
    id: 7,
    title: 'AIcademy',
    description: 'Champion-winning project from Cisco AI Hackathon 2024. An AI-powered learning platform designed to improve academic engagement and reduce procrastination through intelligent chatbot support, gamified learning, and real-time educational assistance.',
    technologies: ['Cisco AI', 'Hugging Face LLM', 'SecureX', 'Google Cloud', 'AWS'],
    image: aicademyImg,
    url: 'https://aicademy-platform.web.app/'
  },
  {
    id: 8,
    title: 'Ghostfriend.my',
    description: 'An online book purchasing platform developed as part of a freelance collaboration. Contributed to frontend and backend development using Astro and Vue.js, with a focus on performance, usability, and responsive design.',
    technologies: ['Astro', 'Vue.js', 'Tailwind CSS', 'Stripe API'],
    image: ghostfriendImg,
    url: 'https://ghostfriend.my'
  }
];

const ProjectCard: React.FC<{ project: Project; isHighlighted?: boolean }> = ({ project, isHighlighted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`cyber-card bento-card group h-full relative rounded-xl overflow-hidden border border-neon-purple/20 bg-cyber-dark/40`}
    >
      {/* Bento Glow Effects (Mouse Tracking) */}
      <div
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: 'var(--glow-opacity, 0)',
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 0.15), transparent 40%)`,
        }}
      />
      <div
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: 'var(--glow-opacity, 0)',
          padding: '2px',
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 1), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      <div className="relative h-48 overflow-hidden bg-cyber-dark z-20">
        {/* Project Image */}
        {project.image ? (
          <img 
            src={project.image} 
            alt={`${project.title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.opacity = '0.5';
              target.style.backgroundColor = '#1a1a1a';
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
            <span className="font-cyber text-4xl text-light/20 font-bold">&lt;/&gt;</span>
          </div>
        )}
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-cyber-grid bg-neon-purple/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        
        {/* Title Container */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-6 z-20">
          <div className="w-12 h-1 bg-gradient-to-r from-neon-purple to-neon-blue"></div>
          <h3 className={`font-cyber text-white mt-2 text-center group-hover:text-neon-purple transition-colors duration-300 ${isHighlighted ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
            {isHighlighted && <span className="text-neon-purple ml-2">★</span>}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mt-2"></div>
        </div>
      </div>
      <div className="p-6 bg-dark flex flex-col h-[280px] relative z-20">
        <p className="text-light/70 text-sm line-clamp-4  ">
          {project.description}
        </p>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1.5 rounded text-xs bg-primary border border-neon-purple/40 text-neon-purple hover:border-neon-blue/40 hover:text-neon-blue transition-all duration-300 font-mono whitespace-nowrap`}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neon-blue hover:text-neon-purple transition-colors group-hover:animate-pulse"
              >
                Visit Project →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neon-blue hover:text-neon-purple transition-colors group-hover:animate-pulse"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll('.bento-card');
      const gridRect = grid.getBoundingClientRect();
      const mouseInside =
        e.clientX >= gridRect.left &&
        e.clientX <= gridRect.right &&
        e.clientY >= gridRect.top &&
        e.clientY <= gridRect.bottom;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        if (!mouseInside) {
          cardElement.style.setProperty('--glow-opacity', '0');
          return;
        }

        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardElement.style.setProperty('--mouse-x', `${x}px`);
        cardElement.style.setProperty('--mouse-y', `${y}px`);
        cardElement.style.setProperty('--glow-opacity', '1');
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Find Nexscholar project
  const nexscholarIndex = projects.findIndex(p => p.title === 'Nexscholar');
  const nexscholar = projects[nexscholarIndex];
  const otherProjects = projects.filter((_, index) => index !== nexscholarIndex);

  return (
    <section id="projects" className="py-20 md:py-32 cyber-grid relative">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-purple/20 rounded-full filter blur-[120px] opacity-30"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-neon-blue/20 rounded-full filter blur-[100px] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-cyber font-bold text-lightest mb-4 relative inline-block">
            <span className="text-neon-purple neon-text">&lt;</span>
            Projects
            <span className="text-neon-purple neon-text">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto"></div>
          <p className="text-light/70 mt-6 max-w-2xl mx-auto">
            A selection of projects showcasing my work across data engineering, AI systems, analytics platforms, and scalable product development.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative group">
          {/* Render Nexscholar first with width of 2 columns */}
          {nexscholar && (
            <div className="col-span-1 md:col-span-2">
              <ProjectCard project={nexscholar} isHighlighted={true} />
            </div>
          )}
          
          {/* Render other projects */}
          {otherProjects.map(project => (
            <ProjectCard key={project.id} project={project} isHighlighted={false} />
          ))}
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 relative z-10">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/yong-wern-jie-0a5b90261/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-primary border border-neon-blue rounded-md hover:bg-neon-blue/10 transition-all duration-300 min-w-48"
          >
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-neon-blue rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Icon icon="mdi:linkedin" className="text-xl group-hover:text-neon-blue transition-colors" />
              View more in LinkedIn
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/wernjie0713"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-primary border border-neon-purple rounded-md hover:bg-neon-purple/10 transition-all duration-300 min-w-48"
          >
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-neon-purple rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Icon icon="mdi:github" className="text-xl group-hover:text-neon-purple transition-colors" />
              View more in GitHub
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 