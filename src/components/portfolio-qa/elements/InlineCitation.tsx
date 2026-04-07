import React, {
  Children,
  ComponentProps,
  ReactElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from './utils';

interface InlineCitationCardContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const InlineCitationCardContext = createContext<InlineCitationCardContextValue | null>(null);

const useInlineCitationCard = () => {
  const context = useContext(InlineCitationCardContext);

  if (!context) {
    throw new Error('Inline citation components must be used within InlineCitationCard');
  }

  return context;
};

const getSourceLabel = (url: string) => {
  if (url.startsWith('#')) {
    return url.replace('#', '');
  }

  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export type InlineCitationProps = ComponentProps<'span'>;

export const InlineCitation = ({ className, ...props }: InlineCitationProps) => (
  <span
    className={cn('group inline items-center gap-1', className)}
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<'span'>;

export const InlineCitationText = ({ className, ...props }: InlineCitationTextProps) => (
  <span
    className={cn('transition-colors group-hover:bg-neon-blue/8', className)}
    {...props}
  />
);

export type InlineCitationCardProps = ComponentProps<'span'>;

export const InlineCitationCard = ({
  className,
  children,
  ...props
}: InlineCitationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <InlineCitationCardContext.Provider value={value}>
      <span
        className={cn('relative inline-flex', className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </span>
    </InlineCitationCardContext.Provider>
  );
};

export type InlineCitationCardTriggerProps = ComponentProps<'button'> & {
  sources: string[];
};

export const InlineCitationCardTrigger = ({
  sources,
  className,
  onClick,
  children,
  ...props
}: InlineCitationCardTriggerProps) => {
  const { isOpen, setIsOpen } = useInlineCitationCard();

  return (
    <button
      className={cn(
        'ml-1 rounded-full border border-neon-blue/20 bg-neon-blue/10 px-2 py-0.5 text-[11px] text-neon-blue transition-colors hover:text-white',
        className,
      )}
      onClick={(event) => {
        setIsOpen(!isOpen);
        onClick?.(event);
      }}
      onFocus={() => setIsOpen(true)}
      type="button"
      {...props}
    >
      {children ?? (
        <>
          {sources[0] ? `${getSourceLabel(sources[0])}${sources.length > 1 ? ` +${sources.length - 1}` : ''}` : 'unknown'}
        </>
      )}
    </button>
  );
};

export type InlineCitationCardBodyProps = ComponentProps<'div'>;

export const InlineCitationCardBody = ({
  className,
  ...props
}: InlineCitationCardBodyProps) => {
  const { isOpen } = useInlineCitationCard();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute bottom-[calc(100%+0.5rem)] left-0 z-30 w-80 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(4,8,12,0.98),rgba(8,12,20,0.98))] p-0 shadow-[0_18px_50px_rgba(0,0,0,0.38)]',
        className,
      )}
      {...props}
    />
  );
};

interface InlineCitationCarouselContextValue {
  current: number;
  count: number;
  setCount: (count: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
}

const InlineCitationCarouselContext = createContext<InlineCitationCarouselContextValue | null>(null);

const useInlineCitationCarousel = () => {
  const context = useContext(InlineCitationCarouselContext);

  if (!context) {
    throw new Error('Inline citation carousel components must be used within InlineCitationCarousel');
  }

  return context;
};

export type InlineCitationCarouselProps = ComponentProps<'div'>;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const scrollPrev = useCallback(() => {
    setCurrent((value) => (count <= 1 ? value : (value - 1 + count) % count));
  }, [count]);

  const scrollNext = useCallback(() => {
    setCurrent((value) => (count <= 1 ? value : (value + 1) % count));
  }, [count]);

  const value = useMemo(
    () => ({ current, count, setCount, scrollPrev, scrollNext }),
    [count, current, scrollNext, scrollPrev],
  );

  return (
    <InlineCitationCarouselContext.Provider value={value}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </InlineCitationCarouselContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<'div'>;

export const InlineCitationCarouselContent = ({
  children,
  ...props
}: InlineCitationCarouselContentProps) => {
  const { current, setCount } = useInlineCitationCarousel();
  const items = Children.toArray(children);

  useEffect(() => {
    setCount(items.length);
  }, [items.length, setCount]);

  return (
    <div {...props}>
      {items.map((item, index) => {
        if (!isValidElement(item)) {
          return item;
        }

        return React.cloneElement(item as ReactElement, {
          className: cn(
            (item as ReactElement<{ className?: string }>).props.className,
            index === current ? 'block' : 'hidden',
          ),
        });
      })}
    </div>
  );
};

export type InlineCitationCarouselItemProps = ComponentProps<'div'>;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => (
  <div
    className={cn('w-full space-y-2 p-4 pl-8', className)}
    {...props}
  />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<'div'>;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn(
      'flex items-center justify-between gap-2 rounded-t-2xl border-b border-white/10 bg-white/[0.04] p-2',
      className,
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<'div'>;

export const InlineCitationCarouselIndex = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const { current, count } = useInlineCitationCarousel();

  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-end px-3 py-1 text-xs text-light/55',
        className,
      )}
      {...props}
    >
      {children ?? `${count === 0 ? 0 : current + 1}/${count}`}
    </div>
  );
};

export type InlineCitationCarouselPrevProps = ComponentProps<'button'>;

export const InlineCitationCarouselPrev = ({
  className,
  onClick,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const { scrollPrev } = useInlineCitationCarousel();

  return (
    <button
      aria-label="Previous"
      className={cn('shrink-0 text-light/55 transition-colors hover:text-white', className)}
      onClick={(event) => {
        scrollPrev();
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      <ArrowLeft className="size-4" />
    </button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<'button'>;

export const InlineCitationCarouselNext = ({
  className,
  onClick,
  ...props
}: InlineCitationCarouselNextProps) => {
  const { scrollNext } = useInlineCitationCarousel();

  return (
    <button
      aria-label="Next"
      className={cn('shrink-0 text-light/55 transition-colors hover:text-white', className)}
      onClick={(event) => {
        scrollNext();
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      <ArrowRight className="size-4" />
    </button>
  );
};

export type InlineCitationSourceProps = ComponentProps<'div'> & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <div className={cn('space-y-1', className)} {...props}>
    {title ? (
      <h4 className="truncate font-medium text-sm leading-tight text-lightest">{title}</h4>
    ) : null}
    {url ? (
      <p className="truncate break-all text-xs text-light/45">{url}</p>
    ) : null}
    {description ? (
      <p className="line-clamp-3 text-sm leading-relaxed text-light/70">{description}</p>
    ) : null}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<'blockquote'>;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <blockquote
    className={cn(
      'border-l-2 border-white/15 pl-3 text-sm italic text-light/55',
      className,
    )}
    {...props}
  >
    {children}
  </blockquote>
);
