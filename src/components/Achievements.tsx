import React, { useRef } from 'react';
import { useGsapParallax } from '../hooks/useGsapParallax';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

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
    title: 'Champion',
    organization: 'InnovHack 2025',
    description:
      'Won 1st Place at InnovHack 2025 for developing EQ-View, an AI-powered platform designed to help students improve interview performance through multimodal AI, real-time analysis, and privacy-first design.',
    year: 2025,
  },
  {
    id: 2,
    title: '2nd Place - University Category',
    organization: 'PayNet Digital Campus 4.0',
    description:
      'Secured 2nd Place in the University Category at PayNet Digital Campus 4.0, competing against 44 universities nationwide through the UTM DuitNow initiative.',
    year: 2025,
  },
  {
    id: 3,
    title: '2nd Place - Student Category',
    organization: 'PayNet Digital Campus 4.0',
    description:
      'Secured 2nd Place in the Student Category at PayNet Digital Campus 4.0 through the UTM DuitNow initiative, contributing to campus-level digital payment transformation.',
    year: 2025,
  },
  {
    id: 4,
    title: 'Gold Award',
    organization: 'INATEX 2025',
    description:
      'Awarded to Nexscholar at INATEX 2025 for innovation in AI-driven academic collaboration, data analytics, and research ecosystem development.',
    year: 2025,
  },
  {
    id: 5,
    title: '2nd Place',
    organization: 'SEA-CICSIS 2025',
    description:
      'Secured 2nd Place at SEA-CICSIS 2025 for presenting Nexscholar as an innovation-driven academic platform focused on collaboration and research ecosystem development.',
    year: 2025,
  },
  {
    id: 6,
    title: '2nd Place',
    organization: 'UTM-UMK Datathon 2025',
    description:
      'Secured 2nd Place in UTM-UMK Datathon 2025 through strong data analysis, visualization, and insight communication.',
    year: 2025,
  },
  {
    id: 7,
    title: 'Champion',
    organization: 'Cisco AI Hackathon 2024',
    description:
      'Won 1st Place for developing AIcademy, an AI-powered learning platform designed to improve academic engagement and reduce procrastination.',
    year: 2024,
  },
  {
    id: 8,
    title: '2nd Place & Special Award',
    organization: 'PayNet Digital Campus 3.0',
    description:
      'Recognized for contributing to UTM DuitNow, a transaction platform built to support campus-wide digital payment adoption through OCR-assisted transaction recording and reporting.',
    year: 2025,
  },
];

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapParallax(sectionRef);

  useGSAP(
    () => {
      const scopeElement = sectionRef.current;
      if (!scopeElement) {
        return undefined;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          all: 'all',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const cards = gsap.utils.toArray<HTMLElement>('[data-achievement-card]', scopeElement);
          const line = scopeElement.querySelector<HTMLElement>('[data-achievement-line]');

          if (context.conditions?.reduceMotion) {
            gsap.set(cards, { autoAlpha: 1, clearProps: 'all' });
            gsap.set(line, { clearProps: 'all' });
            return undefined;
          }

          if (line) {
            gsap.fromTo(
              line,
              {
                scaleY: 0,
                transformOrigin: '50% 0%',
              },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: scopeElement,
                  start: 'top 70%',
                  end: 'bottom 78%',
                  scrub: 1,
                },
              },
            );
          }

          cards.forEach((card, index) => {
            const dot = card.querySelector<HTMLElement>('[data-achievement-dot]');

            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                x: index % 2 === 0 ? 72 : -72,
                y: 28,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.78,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  once: true,
                },
              },
            );

            gsap.to(card, {
              yPercent: index % 2 === 0 ? -5 : 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.15,
              },
            });

            if (dot) {
              ScrollTrigger.create({
                trigger: card,
                start: 'top 78%',
                once: true,
                onEnter: () => {
                  gsap.fromTo(
                    dot,
                    {
                      scale: 0.55,
                      boxShadow: '0 0 0 0 rgba(142, 81, 234, 0.45)',
                    },
                    {
                      scale: 1,
                      boxShadow: '0 0 0 14px rgba(142, 81, 234, 0)',
                      duration: 0.7,
                      ease: 'back.out(2)',
                      overwrite: true,
                    },
                  );
                },
              });
            }
          });

          return undefined;
        },
        sectionRef,
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 md:py-32 bg-primary/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div data-gsap-parallax="105" data-gsap-parallax-x="18" className="absolute top-0 right-0 w-1/3 h-full bg-neon-purple/5 transform skew-x-12"></div>
      <div data-gsap-parallax="95" data-gsap-parallax-x="-20" className="absolute top-1/3 left-0 w-64 h-64 bg-neon-magenta/10 rounded-full filter blur-[100px]"></div>
      <div data-gsap-parallax="-85" data-gsap-parallax-x="16" className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-blue/10 rounded-full filter blur-[80px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-gsap-reveal="up" className="text-center mb-16">
          <div className="flex items-center justify-center mb-4 gap-2">
            <div className="h-px w-8 bg-neon-blue"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-lightest font-cyber">
              Achievements<span className="text-neon-purple">_</span>
            </h2>
            <div className="h-px w-8 bg-neon-blue"></div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto"></div>
        </div>

        <div className="relative">
          <div data-achievement-line className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-blue to-neon-purple"></div>

          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              data-achievement-card
              className={`relative mb-12 md:mb-24 ${
                index % 2 === 0
                  ? 'md:text-right md:pr-12 ml-8 md:ml-0'
                  : 'md:text-left md:pl-12 ml-8 md:ml-0 md:transform md:translate-y-16'
              }`}
            >
              <div data-achievement-dot className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-neon-purple border-2 border-primary z-10">
                <div className="absolute inset-0 rounded-full bg-neon-purple animate-ping opacity-30"></div>
              </div>

              <div className="absolute top-2.5 left-2.5 md:left-1/2 h-0.5 w-5 md:w-16 bg-neon-purple md:transform md:translate-y-0 md:-translate-x-1/2">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-neon-purple md:hidden"></div>
              </div>

              <div
                className={`cyber-card relative ${
                  index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
                }`}
              >
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

                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-blue"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-blue"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
