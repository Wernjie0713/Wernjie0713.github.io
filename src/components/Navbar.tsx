import React, { useEffect, useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { RESUME_URL } from '../constants';
import { gsap, useGSAP } from '../lib/gsap';

const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Experience', path: '#experience' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
  { name: 'Achievements', path: '#achievements' },
  { name: 'Contact', path: '#contact' },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useGSAP(
    () => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { autoAlpha: 0, y: -20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
        );
      }

      const menu = mobileMenuRef.current;
      if (!menu) {
        return undefined;
      }

      const menuItems = gsap.utils.toArray<HTMLElement>('[data-mobile-menu-item]', menu);

      gsap.set(menu, { autoAlpha: 0, height: 0, pointerEvents: 'none' });
      gsap.set(menuItems, { autoAlpha: 0, x: -20 });

      const timeline = gsap.timeline({ paused: true });
      timeline
        .set(menu, { pointerEvents: 'auto' })
        .to(
          menu,
          {
            autoAlpha: 1,
            height: '100vh',
            duration: 0.3,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          menuItems,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.05,
        );

      timeline.eventCallback('onReverseComplete', () => {
        if (mobileMenuRef.current) {
          gsap.set(mobileMenuRef.current, { pointerEvents: 'none' });
        }
      });

      menuTimelineRef.current = timeline;

      return () => {
        timeline.kill();
        menuTimelineRef.current = null;
      };
    },
    { scope: navRef },
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.path.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeline = menuTimelineRef.current;
    if (!timeline) {
      return;
    }

    if (isOpen) {
      timeline.play(0);
      return;
    }

    timeline.reverse();
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/90 backdrop-blur-sm py-3 nav-shadow' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-cyber text-2xl font-bold text-neon-purple neon-text relative z-50"
        >
          <span className="text-neon-blue">{'<'}</span>WJ<span className="text-neon-blue">{'/>'}</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`text-light hover:text-neon-purple transition-colors duration-300 text-sm font-medium relative group ${
                activeSection === link.path.substring(1) ? 'text-neon-purple' : ''
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300 ${
                  activeSection === link.path.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2.5 font-medium text-white group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-neon-purple group-hover:bg-transparent group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-neon-blue group-hover:bg-neon-purple group-hover:-skew-x-12"></span>
            <span className="relative">Resume</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden text-light focus:outline-none relative z-50"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="text-neon-purple">
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </div>
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-primary/95 backdrop-blur-lg md:hidden cyber-grid"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          {navLinks.map((link) => (
            <div key={link.name} data-mobile-menu-item>
              <a
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-2xl font-cyber font-medium relative group ${
                  activeSection === link.path.substring(1) ? 'text-neon-purple' : 'text-light'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300 ${
                    activeSection === link.path.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            </div>
          ))}
          <div data-mobile-menu-item>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-3 font-medium text-white group inline-block"
              onClick={() => setIsOpen(false)}
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-neon-purple group-hover:bg-transparent group-hover:skew-x-12"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-neon-blue group-hover:bg-neon-purple group-hover:-skew-x-12"></span>
              <span className="relative text-xl">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
