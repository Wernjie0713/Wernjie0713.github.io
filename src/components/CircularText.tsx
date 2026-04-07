import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const letters = Array.from(text);

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element) {
        return undefined;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          all: 'all',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const reduceMotion = Boolean(context.conditions?.reduceMotion);
          prefersReducedMotionRef.current = reduceMotion;

          gsap.set(element, {
            rotation: 0,
            scale: 1,
            transformOrigin: '50% 50%',
          });

          if (reduceMotion) {
            spinTweenRef.current = null;
            return undefined;
          }

          spinTweenRef.current = gsap.to(element, {
            rotation: 360,
            duration: spinDuration,
            ease: 'none',
            repeat: -1,
          });

          return () => {
            spinTweenRef.current?.kill();
            spinTweenRef.current = null;
          };
        },
        containerRef,
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [spinDuration, text], revertOnUpdate: true },
  );

  const handleHoverStart = () => {
    if (prefersReducedMotionRef.current || !onHover || !containerRef.current) {
      return;
    }

    const spinTween = spinTweenRef.current;
    if (!spinTween) {
      return;
    }

    let timeScale = 1;
    let scale = 1;

    switch (onHover) {
      case 'slowDown':
        timeScale = 0.5;
        break;
      case 'speedUp':
        timeScale = 4;
        break;
      case 'pause':
        timeScale = 0;
        break;
      case 'goBonkers':
        timeScale = 20;
        scale = 0.8;
        break;
      default:
        timeScale = 1;
    }

    gsap.to(spinTween, {
      timeScale,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(containerRef.current, {
      scale,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleHoverEnd = () => {
    if (!containerRef.current) {
      return;
    }

    const spinTween = spinTweenRef.current;
    if (spinTween) {
      gsap.to(spinTween, {
        timeScale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-center cursor-pointer origin-center ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, index) => {
        const rotationDeg = (360 / letters.length) * index;
        const factor = Math.PI / letters.length;
        const x = factor * index;
        const y = factor * index;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={`${letter}-${index}`}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
