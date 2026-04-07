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

export const useGsapHover = (
  scopeRef: RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) => {
  useGSAP(
    (_context, contextSafe) => {
      const scopeElement = scopeRef.current;
      if (!scopeElement) {
        return undefined;
      }

      const hoverTargets = collectScopedElements(scopeElement, '[data-gsap-hover]');
      const cleanups: Array<() => void> = [];
      const safe =
        contextSafe ??
        (<T extends EventListener>(callback: T) => callback);

      hoverTargets.forEach((element) => {
        const hoverScale = parseNumber(element.dataset.gsapHover, 1.04);
        const hoverY = parseNumber(element.dataset.gsapHoverY, 0);
        const pressScale = parseNumber(element.dataset.gsapPress, 0.97);
        const duration = parseNumber(element.dataset.gsapHoverDuration, 0.24);
        const hoverShadow = element.dataset.gsapHoverShadow;
        const baseBoxShadow = getComputedStyle(element).boxShadow;
        let hovered = false;

        const animate = (
          vars: gsap.TweenVars,
          animationDuration = duration,
        ) => {
          gsap.to(element, {
            duration: animationDuration,
            ease: 'power2.out',
            overwrite: 'auto',
            ...vars,
          });
        };

        const onEnter = safe(() => {
          hovered = true;
          animate({
            scale: hoverScale,
            y: hoverY,
            boxShadow: hoverShadow ?? baseBoxShadow,
          });
        });

        const onLeave = safe(() => {
          hovered = false;
          animate({
            scale: 1,
            y: 0,
            boxShadow: baseBoxShadow,
          });
        });

        const onDown = safe(() => {
          animate(
            {
              scale: pressScale,
              y: hoverY,
              boxShadow: hoverShadow ?? baseBoxShadow,
            },
            0.14,
          );
        });

        const onUp = safe(() => {
          animate({
            scale: hovered ? hoverScale : 1,
            y: hovered ? hoverY : 0,
            boxShadow: hovered ? hoverShadow ?? baseBoxShadow : baseBoxShadow,
          });
        });

        element.addEventListener('pointerenter', onEnter);
        element.addEventListener('pointerleave', onLeave);
        element.addEventListener('pointerdown', onDown);
        element.addEventListener('pointerup', onUp);
        element.addEventListener('pointercancel', onUp);

        cleanups.push(() => {
          element.removeEventListener('pointerenter', onEnter);
          element.removeEventListener('pointerleave', onLeave);
          element.removeEventListener('pointerdown', onDown);
          element.removeEventListener('pointerup', onUp);
          element.removeEventListener('pointercancel', onUp);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: scopeRef, dependencies },
  );
};
