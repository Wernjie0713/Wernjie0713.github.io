import React from 'react';
import { motion } from 'framer-motion';

// Import images
import utmDuitNowImg from '../assets/images/utmduitnow.png';
import aicademyImg from '../assets/images/aicademy.png';
import ghostfriendImg from '../assets/images/ghostfriend.png';
import nexscholarImg from '../assets/images/nexscholar.png';
import yvTrackImg from '../assets/images/yv-track.png';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  url?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'UTMDuitNow',
    description: 'A cashless transaction system featuring OCR and secure logging capabilities. This project won 2nd Place & Special Award at PayNet Digital Campus 3.0.',
    technologies: ['Laravel', 'React.ts', 'MySQL', 'OCR', 'Tailwind CSS'],
    image: utmDuitNowImg,
    url: 'https://utmduitnow.com'
  },
  {
    id: 2,
    title: 'AIcademy',
    description: 'AI-powered learning platform with chatbot and gamification features. Champion project at Cisco AI Hackathon 2024.',
    technologies: ['Cisco AI', 'Hugging Face LLM', 'SecureX', 'Google Cloud', 'AWS'],
    image: aicademyImg,
    url: 'https://aicademy-platform.web.app/'
  },
  {
    id: 3,
    title: 'Ghostfriend.my',
    description: 'Book purchase system built with modern web technologies for seamless user experience.',
    technologies: ['Astro', 'Vue.js', 'Tailwind CSS', 'Stripe API'],
    image: ghostfriendImg,
    url: 'https://ghostfriend.my'
  },
  {
    id: 4,
    title: 'Nexscholar',
    description: 'An educational web platform developed as Lead Programmer in collaboration with the company founder. Built with Laravel, React.js, and MySQL, featuring AI-powered academic profile and CV generation based on user activities and achievements. Implemented full-stack solutions for managing academic content, user access, and interactive learning features.',
    technologies: ['Laravel', 'React.js', 'AI APIs', 'MySQL', 'Tailwind CSS'],
    image: nexscholarImg,
    url: 'https://nexscholar.com'
  },
  {
    id: 5,
    title: 'YV Track',
    description: 'Student development tracking platform that won 2nd Place at Youth Venture Asia.',
    technologies: ['HTML5', 'Bootstrap CSS', 'MySQL', 'JavaScript'],
    image: yvTrackImg,
    url: 'https://drive.google.com/file/d/1Vf3kOyiij_jl70w6Ei8EfyHODjzduRBe/view?usp=drive_link'
  }
];

const ProjectCard: React.FC<{ project: Project; isHighlighted?: boolean }> = ({ project, isHighlighted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`cyber-card group h-full`}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Project Image */}
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
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-cyber-grid bg-neon-purple/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/80 to-transparent"></div>
        
        {/* Title Container */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-6 z-20">
          <div className="w-12 h-1 bg-gradient-to-r from-neon-purple to-neon-blue"></div>
          <h3 className={`font-cyber text-white mt-2 text-center group-hover:text-neon-purple transition-colors duration-300 ${isHighlighted ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
            {isHighlighted && <span className="text-neon-purple ml-2">★</span>}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mt-2"></div>
        </div>

        {/* Animated border on hover */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple origin-left animate-[cyberpulse_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-blue origin-top animate-[cyberpulse_3s_ease-in-out_infinite_0.75s]"></div>
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-neon-purple via-neon-blue to-neon-purple origin-right animate-[cyberpulse_3s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-neon-blue via-neon-purple to-neon-blue origin-bottom animate-[cyberpulse_3s_ease-in-out_infinite_2.25s]"></div>
        </div>
      </div>
      <div className="p-6 bg-cyber-dark flex flex-col h-[280px]">
        <p className="text-light/70 text-sm line-clamp-4">
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
            A collection of my recent work, showcasing my skills in web development, AI integration, and system design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default Projects; 