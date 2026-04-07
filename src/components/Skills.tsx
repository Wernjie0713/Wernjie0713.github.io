import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useGsapHover } from '../hooks/useGsapHover';
import { useGsapReveal } from '../hooks/useGsapReveal';

const skills = [
  { name: 'Python', icon: 'logos:python', category: 'Data Engineering' },
  { name: 'SQL', icon: 'vscode-icons:file-type-sql', category: 'Data Engineering' },
  { name: 'ETL', icon: 'carbon:data-format', category: 'Data Engineering' },
  { name: 'Data Warehousing', icon: 'carbon:data-base', category: 'Data Engineering' },
  { name: 'FastAPI', icon: 'simple-icons:fastapi', category: 'Data Engineering' },
  { name: 'Reporting Automation', icon: 'carbon:report', category: 'Data Engineering' },
  { name: 'Data Validation', icon: 'carbon:data-check', category: 'Data Engineering' },
  { name: 'Reconciliation', icon: 'carbon:compare', category: 'Data Engineering' },
  { name: 'Laravel', icon: 'logos:laravel', category: 'Backend & Full-Stack' },
  { name: 'React', icon: 'vscode-icons:file-type-reactjs', category: 'Backend & Full-Stack' },
  { name: 'Vue.js', icon: 'vscode-icons:file-type-vue', category: 'Backend & Full-Stack' },
  { name: 'TypeScript', icon: 'vscode-icons:file-type-typescript-official', category: 'Backend & Full-Stack' },
  { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official', category: 'Backend & Full-Stack' },
  { name: 'PHP', icon: 'vscode-icons:file-type-php', category: 'Backend & Full-Stack' },
  { name: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind', category: 'Backend & Full-Stack' },
  { name: '.NET', icon: 'logos:dotnet', category: 'Backend & Full-Stack' },
  { name: 'OpenAI API', icon: 'simple-icons:openai', category: 'AI & Intelligent Systems' },
  { name: 'Retrieval-Augmented Generation (RAG)', icon: 'carbon:machine-learning', category: 'AI & Intelligent Systems' },
  { name: 'Qdrant', icon: 'logos:qdrant', category: 'AI & Intelligent Systems' },
  { name: 'Semantic Matching', icon: 'carbon:machine-learning-model', category: 'AI & Intelligent Systems' },
  { name: 'Azure OCR', icon: 'mdi:microsoft-azure', category: 'AI & Intelligent Systems' },
  { name: 'MySQL', icon: 'vscode-icons:file-type-mysql', category: 'Databases & Analytics' },
  { name: 'SQL Server', icon: 'devicon:microsoftsqlserver', category: 'Databases & Analytics' },
  { name: 'Supabase', icon: 'logos:supabase-icon', category: 'Databases & Analytics' },
  { name: 'Power BI', icon: 'logos:microsoft-power-bi', category: 'Databases & Analytics' },
  { name: 'Tableau', icon: 'logos:tableau', category: 'Databases & Analytics' },
];

const categories = [
  'Data Engineering',
  'Backend & Full-Stack',
  'AI & Intelligent Systems',
  'Databases & Analytics',
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapHover(sectionRef);

  const renderSkillIcon = (skill: typeof skills[number]) => {
    return (
      <Icon
        icon={skill.icon}
        className="text-3xl text-light group-hover:text-neon-blue transition-colors duration-300"
      />
    );
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
      <div className="absolute -left-24 top-1/4 w-48 h-48 bg-neon-purple/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -right-24 bottom-1/4 w-48 h-48 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-gradient-radial from-neon-purple/5 to-transparent opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-gsap-reveal="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white relative inline-block">
            <span className="relative z-10">Tech Stack</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></span>
          </h2>
          <div className="w-16 h-1 bg-neon-purple mx-auto rounded-full my-4 glow-sm"></div>
          <p className="text-light/60 max-w-2xl mx-auto mt-4 font-mono text-sm">
            <span className="text-neon-blue font-cyber">&lt;skills&gt;</span> My technical arsenal for building the future <span className="text-neon-purple font-cyber">&lt;/skills&gt;</span>
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              data-gsap-reveal="up"
              data-gsap-delay={String(categoryIndex * 0.08)}
            >
              <h3 className="text-xl font-cyber mb-6 text-neon-purple relative inline-flex items-center">
                <span className="mr-2 w-4 h-4 inline-block bg-neon-purple/20 border border-neon-purple"></span>
                {category}
                <span className="ml-2 text-xs font-mono text-neon-blue opacity-80">.stack</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <div
                      key={skill.name}
                      data-gsap-reveal="scale"
                      data-gsap-delay={String(index * 0.03)}
                      data-gsap-hover="1.03"
                      data-gsap-hover-y="-5"
                      data-gsap-hover-shadow="0 0 15px rgba(142, 81, 234, 0.5)"
                      className="cyber-card group p-4 border border-neon-purple/30 bg-primary/40 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-purple opacity-80"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neon-purple opacity-80"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neon-purple opacity-80"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-purple opacity-80"></div>

                      <div className="flex flex-col items-center space-y-2">
                        {renderSkillIcon(skill)}
                        <span className="text-light/80 text-sm font-mono group-hover:text-neon-purple transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>

                      <div className="absolute -bottom-6 left-0 w-full text-center text-[8px] font-mono text-neon-purple/30 opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-300">
                        system.load("{skill.name.toLowerCase()}")
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
