import { RefObject } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

type RevealPreset = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const revealPresets: Record<RevealPreset, gsap.TweenVars> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -36 },
  right: { x: 36 },
  scale: { scale: 0.92 },
  fade: {},
};

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

export const useGsapReveal = (
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
          const reduceMotion = Boolean(context.conditions?.reduceMotion);
          const revealElements = collectScopedElements(scopeElement, '[data-gsap-reveal]');

          revealElements.forEach((element) => {
            const presetName =
              (element.dataset.gsapReveal as RevealPreset | undefined) ?? 'up';
            const preset = revealPresets[presetName] ?? revealPresets.up;
            const duration = parseNumber(element.dataset.gsapDuration, 0.6);
            const delay = parseNumber(element.dataset.gsapDelay, 0);
            const stagger = parseNumber(element.dataset.gsapStagger, 0.12);
            const ease = element.dataset.gsapEase || 'power3.out';
            const start = element.dataset.gsapStart || 'top 82%';
            const once = element.dataset.gsapOnce !== 'false';
            const triggerSelector = element.dataset.gsapTrigger;
            const childrenSelector = element.dataset.gsapChildren;
            const trigger =
              (triggerSelector
                ? scopeElement.querySelector(triggerSelector)
                : null) ?? element;

            if (childrenSelector) {
              const children = gsap.utils.toArray<HTMLElement>(
                childrenSelector,
                element,
              );

              if (!children.length) {
                return;
              }

              gsap.fromTo(
                children,
                reduceMotion ? { autoAlpha: 0 } : { autoAlpha: 0, ...preset },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: reduceMotion ? 0.01 : duration,
                  delay,
                  stagger: reduceMotion ? 0 : stagger,
                  ease,
                  scrollTrigger: {
                    trigger,
                    start,
                    once,
                    toggleActions: once
                      ? 'play none none none'
                      : 'play none none reverse',
                  },
                },
              );

              return;
            }

            gsap.fromTo(
              element,
              reduceMotion ? { autoAlpha: 0 } : { autoAlpha: 0, ...preset },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: reduceMotion ? 0.01 : duration,
                delay,
                ease,
                scrollTrigger: {
                  trigger,
                  start,
                  once,
                  toggleActions: once
                    ? 'play none none none'
                    : 'play none none reverse',
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
