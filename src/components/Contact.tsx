import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-blue/10 rounded-full filter blur-[80px]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-lightest mb-4 font-cyber inline-flex items-center gap-2">
            <span className="text-neon-magenta">[</span>
            Connect<span className="text-neon-purple neon-text">::</span>Now
            <span className="text-neon-magenta">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-neon-purple/5 transform -skew-y-3"></div>
            <div className="p-1 relative">
              <div className="absolute top-0 left-0 w-20 h-1 bg-neon-purple"></div>
              <div className="absolute top-0 left-0 w-1 h-20 bg-neon-purple"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-neon-purple mb-4 font-cyber">
                  Let's Build Something Together
                </h3>
                <p className="text-light/70 mb-8">
                  I'm currently looking for new opportunities to collaborate on projects 
                  that challenge me and help me grow. Whether you have a question or just want 
                  to say hi, I'll do my best to get back to you!
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-dark flex items-center justify-center mr-4 border border-neon-purple/30 relative">
                      <div className="absolute inset-0 bg-neon-purple/5"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a href="mailto:yongwernjie.2003@gmail.com" className="text-light hover:text-neon-purple transition-colors font-mono">
                      yongwernjie.2003@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-dark flex items-center justify-center mr-4 border border-neon-purple/30 relative">
                      <div className="absolute inset-0 bg-neon-purple/5"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-light font-mono">Johor Bahru, Malaysia</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-1 bg-neon-purple"></div>
              <div className="absolute bottom-0 right-0 w-1 h-20 bg-neon-purple"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="cyber-card before:bg-gradient-to-r before:from-neon-magenta before:to-neon-blue"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-lightest mb-6 font-cyber">
                {"<"} Connect<span className="text-neon-purple">_</span>With<span className="text-neon-purple">_</span>Me {"/>"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://www.linkedin.com/in/yong-wern-jie-0a5b90261/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden p-4 border border-neon-purple/30 rounded-md bg-cyber-dark hover:bg-neon-purple/10 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-neon-purple group-hover:animate-pulse mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="font-mono text-light group-hover:text-neon-purple transition-colors">LinkedIn</span>
                  </div>
                </a>
                <a
                  href="https://github.com/wernjie0713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden p-4 border border-neon-purple/30 rounded-md bg-cyber-dark hover:bg-neon-purple/10 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-neon-purple group-hover:animate-pulse mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span className="font-mono text-light group-hover:text-neon-purple transition-colors">GitHub</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/60123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden p-4 border border-neon-purple/30 rounded-md bg-cyber-dark hover:bg-neon-purple/10 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-neon-purple group-hover:animate-pulse mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="font-mono text-light group-hover:text-neon-purple transition-colors">WhatsApp</span>
                  </div>
                </a>
                <a
                  href="mailto:yongwernjie.2003@gmail.com"
                  className="group relative overflow-hidden p-4 border border-neon-purple/30 rounded-md bg-cyber-dark hover:bg-neon-purple/10 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-neon-purple group-hover:animate-pulse mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                    <span className="font-mono text-light group-hover:text-neon-purple transition-colors">Email</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 