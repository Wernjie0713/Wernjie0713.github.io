import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const skills = [
  { name: 'React', icon: 'vscode-icons:file-type-reactjs', category: 'Frontend' },
  { name: 'Vue.js', icon: 'vscode-icons:file-type-vue', category: 'Frontend' },
  { name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind', category: 'Frontend' },
  { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official', category: 'Frontend' },
  { name: 'TypeScript', icon: 'vscode-icons:file-type-typescript-official', category: 'Frontend' },
  { name: 'HTML', icon: 'vscode-icons:file-type-html', category: 'Frontend' },
  { name: 'CSS', icon: 'vscode-icons:file-type-css', category: 'Frontend' },
  { name: 'Node.js', icon: 'vscode-icons:file-type-node', category: 'Backend' },
  { name: 'PHP', icon: 'vscode-icons:file-type-php', category: 'Backend' },
  { name: 'Laravel', icon: 'logos:laravel', category: 'Backend' },
  { name: 'MySQL', icon: 'vscode-icons:file-type-mysql', category: 'Database' },
  { name: 'Git', icon: 'vscode-icons:file-type-git', category: 'Tools' },
  { name: 'GitHub', icon: 'akar-icons:github-fill', category: 'Tools' },
  { name: 'VS Code', icon: 'vscode-icons:file-type-vscode', category: 'Tools' },
  { name: 'Cursor', icon: 'cursor-icon.svg', category: 'Tools', isImage: true },
  { name: 'ChatGPT', icon: 'simple-icons:openai', category: 'Tools' },
  { name: 'Claude', icon: 'simple-icons:anthropic', category: 'Tools' },
  { name: 'OCR', icon: 'mdi:text-recognition', category: 'Tools' },
];

const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

const Skills: React.FC = () => {
  const renderSkillIcon = (skill: typeof skills[0]) => {
    if (skill.isImage) {
      return (
        <img 
          src={`${process.env.PUBLIC_URL}/images/${skill.icon}`}
          alt={skill.name} 
          className="w-8 h-8 object-contain filter brightness-200" 
        />
      );
    }
    return (
      <Icon 
        icon={skill.icon} 
        className="text-3xl text-light group-hover:text-neon-blue transition-colors duration-300" 
      />
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
      
      {/* Decorative tech elements */}
      <div className="absolute -left-24 top-1/4 w-48 h-48 bg-neon-purple/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -right-24 bottom-1/4 w-48 h-48 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-gradient-radial from-neon-purple/5 to-transparent opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white relative inline-block">
            <span className="relative z-10">Tech Stack</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></span>
          </h2>
          <div className="w-16 h-1 bg-neon-purple mx-auto rounded-full my-4 glow-sm"></div>
          <p className="text-light/60 max-w-2xl mx-auto mt-4 font-mono text-sm">
            <span className="text-neon-blue font-cyber">&lt;skills&gt;</span> My technical arsenal for building the future <span className="text-neon-purple font-cyber">&lt;/skills&gt;</span>
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
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
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, boxShadow: '0 0 15px rgba(142, 81, 234, 0.5)' }}
                      className="cyber-card group p-4 border border-neon-purple/30 bg-primary/40 relative overflow-hidden"
                    >
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      
                      {/* Corner accents */}
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
                      
                      {/* Hidden tech data */}
                      <div className="absolute -bottom-6 left-0 w-full text-center text-[8px] font-mono text-neon-purple/30 opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-300">
                        system.load("{skill.name.toLowerCase()}")
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 