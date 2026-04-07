import React, { useEffect, useRef } from 'react';
import { useGsapParallax } from '../hooks/useGsapParallax';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

interface ExperienceEntry {
  id: number;
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

const experience: ExperienceEntry[] = [
  {
    id: 1,
    role: 'Data Engineering Intern',
    organization: 'Marrybrown',
    period: 'Current',
    summary:
      'Built a Sales & Payment Analytics Platform by reverse-engineering vendor POS systems, designing ETL and warehouse replication pipelines, and validating report outputs against real business logic.',
    highlights: [
      'Reverse-engineered fragmented vendor POS exports into structured analytics workflows.',
      'Designed ETL and warehouse replication pipelines for reliable reporting delivery.',
      'Validated report outputs against operational business rules before release.',
    ],
    stack: ['ETL', 'SQL', 'Data Validation', 'Reporting Systems', 'Analytics Platform'],
  },
  {
    id: 2,
    role: 'Senior System Developer',
    organization: 'Nexscholar',
    period: 'Current',
    summary:
      'Led full-stack and AI system development for Nexscholar, including semantic matching, recommendation workflows, and multi-role platform features using Laravel, React, OpenAI, RAG, and Qdrant.',
    highlights: [
      'Owned platform features across multi-role academic workflows and collaboration flows.',
      'Built semantic matching and recommendation pipelines on top of OpenAI, RAG, and Qdrant.',
      'Shipped production full-stack features with Laravel, React, Tailwind CSS, and MySQL.',
    ],
    stack: ['Laravel', 'React.js', 'OpenAI API', 'RAG', 'Qdrant', 'MySQL'],
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            return undefined;
          }

          const featureCard = scopeElement.querySelector<HTMLElement>('[data-experience-feature]');
          const cards = gsap.utils.toArray<HTMLElement>('[data-experience-card]', scopeElement);

          if (featureCard && context.conditions?.desktop) {
            gsap.to(featureCard, {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: scopeElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
              },
            });
          }

          cards.forEach((card, index) => {
            const tags = gsap.utils.toArray<HTMLElement>('[data-experience-tag]', card);

            gsap.to(card, {
              yPercent: index % 2 === 0 ? -5 : 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.05,
              },
            });

            if (tags.length) {
              ScrollTrigger.create({
                trigger: card,
                start: 'top 72%',
                once: true,
                onEnter: () => {
                  gsap.fromTo(
                    tags,
                    { autoAlpha: 0, y: 14 },
                    {
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.36,
                      stagger: 0.04,
                      ease: 'power3.out',
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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return undefined;
    }

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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-primary/80"
    >
      <div className="absolute inset-0 cyber-grid opacity-15"></div>
      <div data-gsap-parallax="120" data-gsap-parallax-x="-18" className="absolute top-12 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-[120px]"></div>
      <div data-gsap-parallax="-100" data-gsap-parallax-x="22" className="absolute bottom-12 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full filter blur-[120px]"></div>
      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-neon-blue/40 to-transparent"></div>
      <div className="absolute inset-y-0 right-[10%] w-px bg-gradient-to-b from-transparent via-neon-purple/40 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-gsap-reveal="up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-neon-blue"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-lightest font-cyber">
              Experience<span className="text-neon-purple">_</span>
            </h2>
            <div className="h-px w-10 bg-neon-blue"></div>
          </div>
          <div className="w-28 h-1 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto"></div>
        </div>

        <div ref={gridRef} className="grid lg:grid-cols-[0.9fr,1.1fr] gap-8 items-start relative group">
          <div
            data-experience-feature
            data-gsap-reveal="left"
            className="cyber-card p-6 md:p-8 border border-neon-purple/30 bg-cyber-dark/40 backdrop-blur-sm relative overflow-hidden bento-card rounded-xl"
          >
            <div
              className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: 'var(--glow-opacity, 0)',
                background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 0.15), transparent 40%)',
              }}
            />
            <div
              className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
              style={{
                opacity: 'var(--glow-opacity, 0)',
                padding: '2px',
                background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 1), transparent 40%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />

            <div className="relative z-20 text-left">
              <p className="font-cyber text-neon-blue text-sm tracking-[0.3em] uppercase mb-4">
                Current Roles
              </p>
              <h3 className="text-2xl md:text-3xl font-cyber text-lightest leading-tight mb-4">
                Building internal platforms, analytics systems, and AI product workflows in production environments.
              </h3>
              <p className="text-light/70 leading-relaxed mb-6">
                The current focus is split between business-facing analytics engineering at Marrybrown and
                production full-stack plus AI system delivery at Nexscholar.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-neon-blue/20 bg-cyber-dark/70 rounded-lg p-4">
                  <div className="text-3xl font-cyber text-neon-blue mb-1">02</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-light/50">Active Roles</div>
                </div>
                <div className="border border-neon-purple/20 bg-cyber-dark/70 rounded-lg p-4">
                  <div className="text-3xl font-cyber text-neon-purple mb-1">Data + AI</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-light/50">Delivery Focus</div>
                </div>
              </div>

              <div className="space-y-3 text-sm font-mono text-light/70">
                <p className="border-l-2 border-neon-blue/40 pl-4">
                  Sales and payment analytics, ETL design, validation, and reporting automation.
                </p>
                <p className="border-l-2 border-neon-purple/40 pl-4">
                  Full-stack product delivery, semantic matching, recommendation workflows, and RAG-backed AI features.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((entry, index) => (
              <article
                key={entry.id}
                data-experience-card
                data-gsap-reveal="up"
                data-gsap-delay={String(index * 0.08)}
                className="cyber-card border border-neon-purple/30 bg-cyber-dark/40 backdrop-blur-sm relative overflow-hidden bento-card rounded-xl"
              >
                <div
                  className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: 'var(--glow-opacity, 0)',
                    background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 0.15), transparent 40%)',
                  }}
                />
                <div
                  className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
                  style={{
                    opacity: 'var(--glow-opacity, 0)',
                    padding: '2px',
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 81, 234, 1), transparent 40%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                <div className="p-6 md:p-8 relative z-20 text-left">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                      <p className="text-neon-blue font-cyber text-xs tracking-[0.28em] uppercase mb-2">
                        {entry.organization}
                      </p>
                      <h3 className="text-2xl font-cyber text-lightest mb-1">{entry.role}</h3>
                      <p className="text-light/50 text-sm font-mono">{entry.period}</p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono">
                      Production Delivery
                    </div>
                  </div>

                  <p className="text-light/75 leading-relaxed mb-6">{entry.summary}</p>

                  <div className="space-y-3 mb-6">
                    {entry.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3 text-sm text-light/70">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-neon-blue flex-shrink-0"></span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {entry.stack.map((item) => (
                      <span
                        key={item}
                        data-experience-tag
                        className="px-3 py-1.5 rounded text-xs font-mono border border-neon-blue/30 bg-primary/50 text-neon-blue"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
