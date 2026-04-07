import { RefObject } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const parseNumber = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const collectScopedElements = (
  scopeElement: HTMLElement,
  selector: string,
) => {
  const matchesRoot = scopeElement.matches(selector) ? [scopeElement] : [];
  return [
    ...matchesRoot,
    ...gsap.utils.toArray<HTMLElement>(selector, scopeElement),
  ];
};

export const useGsapParallax = (
  scopeRef: RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) => {
  useGSAP(
    () => {
      const scopeElement = scopeRef.current;
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
          if (context.conditions?.reduceMotion) {
            return undefined;
          }

          const parallaxTargets = collectScopedElements(scopeElement, '[data-gsap-parallax]');

          parallaxTargets.forEach((element) => {
            const y = parseNumber(element.dataset.gsapParallax, 80);
            const x = parseNumber(element.dataset.gsapParallaxX, 0);
            const rotation = parseNumber(element.dataset.gsapParallaxRotate, 0);
            const scale = parseNumber(element.dataset.gsapParallaxScale, 1);
            const scrub = parseNumber(element.dataset.gsapParallaxScrub, 1.2);
            const start = element.dataset.gsapParallaxStart || 'top bottom';
            const end = element.dataset.gsapParallaxEnd || 'bottom top';
            const triggerSelector = element.dataset.gsapParallaxTrigger;
            const trigger =
              (triggerSelector
                ? scopeElement.querySelector(triggerSelector)
                : null) ?? element;

            gsap.fromTo(
              element,
              {
                y: y ? -y / 2 : 0,
                x: x ? -x / 2 : 0,
                rotation: rotation ? -rotation / 2 : 0,
                scale: scale === 1 ? 1 : Math.max(0.85, scale - 0.08),
                transformOrigin: '50% 50%',
              },
              {
                y: y ? y / 2 : 0,
                x: x ? x / 2 : 0,
                rotation: rotation ? rotation / 2 : 0,
                scale,
                ease: 'none',
                scrollTrigger: {
                  trigger,
                  start,
                  end,
                  scrub,
                },
              },
            );
          });

          return undefined;
        },
        scopeRef,
      );

      return () => mm.revert();
    },
    { scope: scopeRef, dependencies },
  );
};
