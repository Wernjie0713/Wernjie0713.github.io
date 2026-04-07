import React, {
  ComponentProps,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Brain, ChevronDown } from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsap';
import { Shimmer } from './Shimmer';
import { cn } from './utils';

interface ReasoningContextValue {
  isStreaming: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  duration: number | undefined;
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

const useReasoning = () => {
  const context = useContext(ReasoningContext);

  if (!context) {
    throw new Error('Reasoning components must be used within Reasoning');
  }

  return context;
};

const useControllableState = <T,>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp: T;
  onChange?: (state: T) => void;
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
};

export type ReasoningProps = ComponentProps<'div'> & {
  isStreaming?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
};

const AUTO_CLOSE_DELAY = 1000;
const MS_IN_S = 1000;

export const Reasoning = memo(
  ({
    className,
    isStreaming = false,
    open,
    defaultOpen,
    onOpenChange,
    duration: durationProp,
    children,
    ...props
  }: ReasoningProps) => {
    const resolvedDefaultOpen = defaultOpen ?? isStreaming;
    const isExplicitlyClosed = defaultOpen === false;

    const [isOpen, setIsOpen] = useControllableState<boolean>({
      defaultProp: resolvedDefaultOpen,
      onChange: onOpenChange,
      prop: open,
    });
    const [duration, setDuration] = useControllableState<number | undefined>({
      defaultProp: undefined,
      prop: durationProp,
    });

    const hasEverStreamedRef = useRef(isStreaming);
    const [hasAutoClosed, setHasAutoClosed] = useState(false);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      if (isStreaming) {
        hasEverStreamedRef.current = true;
        if (startTimeRef.current === null) {
          startTimeRef.current = Date.now();
        }
      } else if (startTimeRef.current !== null) {
        setDuration(Math.ceil((Date.now() - startTimeRef.current) / MS_IN_S));
        startTimeRef.current = null;
      }
    }, [isStreaming, setDuration]);

    useEffect(() => {
      if (isStreaming && !isOpen && !isExplicitlyClosed) {
        setIsOpen(true);
      }
    }, [isExplicitlyClosed, isOpen, isStreaming, setIsOpen]);

    useEffect(() => {
      if (hasEverStreamedRef.current && !isStreaming && isOpen && !hasAutoClosed) {
        const timer = window.setTimeout(() => {
          setIsOpen(false);
          setHasAutoClosed(true);
        }, AUTO_CLOSE_DELAY);

        return () => window.clearTimeout(timer);
      }
      return undefined;
    }, [hasAutoClosed, isOpen, isStreaming, setIsOpen]);

    const contextValue = useMemo(
      () => ({ duration, isOpen, isStreaming, setIsOpen }),
      [duration, isOpen, isStreaming, setIsOpen],
    );

    return (
      <ReasoningContext.Provider value={contextValue}>
        <div
          className={cn('not-prose mb-4', className)}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </ReasoningContext.Provider>
    );
  },
);

export type ReasoningTriggerProps = ComponentProps<'button'> & {
  getThinkingMessage?: (isStreaming: boolean, duration?: number) => ReactNode;
};

const defaultGetThinkingMessage = (isStreaming: boolean, duration?: number) => {
  if (isStreaming || duration === 0) {
    return <Shimmer duration={1}>Thinking...</Shimmer>;
  }
  if (duration === undefined) {
    return <p>Thought for a few seconds</p>;
  }
  return <p>Thought for {duration} seconds</p>;
};

export const ReasoningTrigger = memo(
  ({
    className,
    children,
    getThinkingMessage = defaultGetThinkingMessage,
    onClick,
    ...props
  }: ReasoningTriggerProps) => {
    const { isStreaming, isOpen, duration, setIsOpen } = useReasoning();

    return (
      <button
        className={cn(
          'flex w-full items-center gap-2 text-left text-sm text-light/60 transition-colors hover:text-lightest',
          className,
        )}
        onClick={(event) => {
          setIsOpen(!isOpen);
          onClick?.(event);
        }}
        type="button"
        {...props}
      >
        {children ?? (
          <>
            <Brain className="size-4" />
            {getThinkingMessage(isStreaming, duration)}
            <ChevronDown
              className={cn(
                'ml-auto size-4 shrink-0 transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </>
        )}
      </button>
    );
  },
);

export type ReasoningContentProps = ComponentProps<'div'> & {
  children: string;
};

export const ReasoningContent = memo(
  ({ className, children, ...props }: ReasoningContentProps) => {
    const { isOpen } = useReasoning();
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const previousHeightRef = useRef(0);
    const [isRendered, setIsRendered] = useState(isOpen);

    useEffect(() => {
      if (isOpen) {
        setIsRendered(true);
      }
    }, [isOpen]);

    useGSAP(
      () => {
        const container = containerRef.current;
        const inner = innerRef.current;

        if (!container || !inner || !isRendered) {
          return undefined;
        }

        gsap.killTweensOf(container);

        const targetHeight = inner.offsetHeight;

        if (isOpen) {
          const fromHeight = previousHeightRef.current;

          gsap.set(container, {
            height: fromHeight,
            opacity: fromHeight === 0 ? 0 : 1,
            overflow: 'hidden',
            y: fromHeight === 0 ? -8 : 0,
          });

          gsap.to(container, {
            duration: fromHeight === 0 ? 0.34 : 0.26,
            ease: 'power2.out',
            height: targetHeight,
            opacity: 1,
            y: 0,
            onComplete: () => {
              previousHeightRef.current = inner.offsetHeight;
              gsap.set(container, {
                clearProps: 'height,opacity,overflow,transform',
              });
            },
          });

          return undefined;
        }

        const fromHeight = previousHeightRef.current || inner.offsetHeight;

        gsap.set(container, {
          height: fromHeight,
          opacity: 1,
          overflow: 'hidden',
          y: 0,
        });

        gsap.to(container, {
          duration: 0.3,
          ease: 'power2.inOut',
          height: 0,
          opacity: 0,
          y: -8,
          onComplete: () => {
            previousHeightRef.current = 0;
            setIsRendered(false);
          },
        });

        return undefined;
      },
      {
        dependencies: [children, isOpen, isRendered],
        scope: containerRef,
      },
    );

    if (!isRendered) {
      return null;
    }

    const paragraphs = children
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return (
      <div
        ref={containerRef}
        className={cn(
          'mt-4 overflow-hidden',
          className,
        )}
        {...props}
      >
        <div ref={innerRef} className="space-y-3 text-sm leading-6 text-light/68">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  },
);

Reasoning.displayName = 'Reasoning';
ReasoningTrigger.displayName = 'ReasoningTrigger';
ReasoningContent.displayName = 'ReasoningContent';
