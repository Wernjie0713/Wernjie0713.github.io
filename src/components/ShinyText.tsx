import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const element = textRef.current;
      if (!element) {
        return undefined;
      }

      const startPosition = direction === 'left' ? '150% center' : '-50% center';
      const endPosition = direction === 'left' ? '-50% center' : '150% center';

      gsap.set(element, { backgroundPosition: startPosition });

      tweenRef.current?.kill();
      tweenRef.current = null;

      if (disabled) {
        return undefined;
      }

      tweenRef.current = gsap.to(element, {
        backgroundPosition: endPosition,
        duration: speed,
        ease: 'none',
        repeat: -1,
        repeatDelay: delay,
        yoyo,
      });

      return () => {
        tweenRef.current?.kill();
        tweenRef.current = null;
      };
    },
    {
      scope: textRef,
      dependencies: [color, delay, direction, disabled, shineColor, speed, spread, yoyo],
      revertOnUpdate: true,
    },
  );

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={gradientStyle}
      onMouseEnter={() => {
        if (pauseOnHover) {
          tweenRef.current?.pause();
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          tweenRef.current?.resume();
        }
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
