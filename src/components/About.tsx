import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-primary/90">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-10 -left-20 w-40 h-40 bg-neon-purple/30 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 -right-20 w-60 h-60 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20"></div>

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/3 h-px w-1/4 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
      <div className="absolute right-0 bottom-1/3 h-px w-1/4 bg-gradient-to-l from-transparent via-neon-blue to-transparent opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-cyber text-white relative inline-block">
            <span className="relative z-10">About Me</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink"></span>
          </h2>
          <div className="w-16 h-1 bg-neon-purple mx-auto rounded-full my-4 glow-sm"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-lg border-2 border-neon-purple glow-sm"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden transform rotate-3 border-2 border-neon-blue relative z-10">
                <img 
                  src={require("../assets/images/profile-image.jpg")}
                  alt="Yong Wern Jie" 
                  className="w-full h-full object-cover"
                />
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent opacity-30 animate-scan"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-purple/20 opacity-40"></div>
              </div>
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-neon-purple"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-neon-purple"></div>
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-neon-purple"></div>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-neon-purple"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-2 text-light/80 cyber-card p-6 border border-neon-purple/30"
          >
            <div className="space-y-4 font-mono text-sm text-justify">
              <p className="leading-relaxed">
                <span className="text-neon-purple font-cyber">$&gt;</span> <span className="text-neon-blue">Hello</span>! I'm Yong Wern Jie, a Computer Science (Data Engineering) student at Universiti Teknologi Malaysia (UTM) with a deep interest in full-stack development, AI integration, and building real-world, impactful web systems.
              </p>
              <p className="leading-relaxed">
                <span className="text-neon-purple font-cyber">&lt;experience&gt;</span> Over the past year, I've gained hands-on experience through industry collaborations and technical projects. As the <span className="text-neon-blue">Lead Programmer</span> at Nexscholar Sdn. Bhd., I've been involved in building web platforms from the ground up, integrating AI features, and working directly with founders and stakeholders to solve real business problems.
              </p>
              <p className="leading-relaxed">
                <span className="text-neon-purple font-cyber">&lt;expertise&gt;</span> My core strengths include:
                <br />• Full-Stack Web Development using <span className="text-neon-pink">Laravel, React.js, Vue.js, Astro & MySQL</span>
                <br />• AI & Data Integration – from chatbots to OCR, enabling smart, responsive systems
                <br />• Industry Collaboration through UTM's 2U2I Work-Based Learning Program
                <br />• Team Leadership – currently serving as President of the Flying Dance Studio Club at UTM
              </p>
              <p className="leading-relaxed text-left">
                <span className="text-neon-purple font-cyber">&lt;achievements&gt;</span> Recent highlights include:
                <br />• <span className="text-neon-blue">Champion</span> – Cisco AI Hackathon 2024
                <br />• <span className="text-neon-blue">2nd Place</span> – PayNet Digital Campus 3.0 (Student Councils Category) & Youth Venture Asia Industry Project
                <br />• <span className="text-neon-blue">Special Award</span> – PayNet Digital Campus 3.0 (University Category) - UTM's Digital Campus transformation (2M+ transactions logged)
              </p>
              <p className="leading-relaxed">
                <span className="text-neon-purple font-cyber">$&gt; </span>I'm always exploring new tools and ideas in web development, AI, data engineering and digital innovation—and looking forward to opportunities that allow me to build, learn, and grow. Let's connect and create something amazing together!
              </p>
            </div>
            
            <div className="mt-6 flex justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-primary border border-neon-purple rounded-md hover:bg-gray-900 transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-neon-purple rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  Get in Touch
                  <svg className="w-4 h-4 ml-2 -mr-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 