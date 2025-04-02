import React from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  description: string;
  year: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: '2nd Place (Student Councils Category)',
    organization: 'PayNet Digital Campus 3.0',
    description: 'Created UTMDuitNow, a cashless transaction system featuring OCR and secure logging capabilities.',
    year: 2025
  },
  {
    id: 2,
    title: 'Special Award (University Category)',
    organization: 'PayNet Digital Campus 3.0',
    description: 'Recognized for innovative technology implementation that enhanced campus digital services.',
    year: 2025
  },
  {
    id: 3,
    title: 'Champion',
    organization: 'Cisco AI Hackathon 2024',
    description: 'Developed AIcademy, an AI-powered learning platform with chatbot and gamification features.',
    year: 2024
  },
  {
    id: 4,
    title: '2nd Place',
    organization: 'Youth Venture Asia System Development Project',
    description: 'Developed YV Track, a student development tracking platform focusing on skills and growth metrics.',
    year: 2024
  }
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 md:py-32 bg-primary/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neon-purple/5 transform skew-x-12"></div>
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-neon-magenta/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-blue/10 rounded-full filter blur-[80px]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4 gap-2">
            <div className="h-px w-8 bg-neon-blue"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-lightest font-cyber">
              Achievements<span className="text-neon-purple">_</span>
            </h2>
            <div className="h-px w-8 bg-neon-blue"></div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-blue to-neon-purple"></div>

          {/* Achievement items */}
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-24 ${
                index % 2 === 0 ? 'md:text-right md:pr-12 ml-8 md:ml-0' : 'md:text-left md:pl-12 ml-8 md:ml-0 md:transform md:translate-y-16'
              }`}
            >
              {/* Timeline dot with pulse effect */}
              <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-neon-purple border-2 border-primary z-10">
                <div className="absolute inset-0 rounded-full bg-neon-purple animate-ping opacity-30"></div>
              </div>
              
              {/* Timeline connecting line */}
              <div className="absolute top-2.5 left-2.5 md:left-1/2 h-0.5 w-5 md:w-16 bg-neon-purple md:transform md:translate-y-0 md:-translate-x-1/2">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-neon-purple md:hidden"></div>
              </div>

              <div className={`cyber-card relative ${
                index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
              }`}>
                {/* Card top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue"></div>
                
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <span className="font-cyber text-neon-purple text-3xl">{achievement.year}</span>
                    <div className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded text-neon-purple text-sm font-mono text-center sm:text-left w-full sm:w-auto">
                      {achievement.title}
                    </div>
                  </div>
                  
                  <h4 className="text-light text-xl font-bold font-cyber mb-3 relative inline-block">
                    {achievement.organization}
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
                  </h4>
                  
                  <p className="text-light/70">{achievement.description}</p>
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-blue"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-blue"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements; 