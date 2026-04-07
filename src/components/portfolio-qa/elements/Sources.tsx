import React, { ComponentProps, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Book, ChevronDown } from 'lucide-react';
import { cn } from './utils';

interface SourcesContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SourcesContext = createContext<SourcesContextValue | null>(null);

const useSources = () => {
  const context = useContext(SourcesContext);

  if (!context) {
    throw new Error('Sources components must be used within Sources');
  }

  return context;
};

export type SourcesProps = ComponentProps<'div'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Sources = ({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: SourcesProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const setIsOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, open],
  );

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <SourcesContext.Provider value={value}>
      <div
        className={cn('not-prose mb-4 text-xs text-light/70', className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      />
    </SourcesContext.Provider>
  );
};

export type SourcesTriggerProps = ComponentProps<'button'> & {
  count: number;
};

export const SourcesTrigger = ({
  className,
  count,
  children,
  onClick,
  ...props
}: SourcesTriggerProps) => {
  const { isOpen, setIsOpen } = useSources();

  return (
    <button
      className={cn('flex items-center gap-2', className)}
      onClick={(event) => {
        setIsOpen(!isOpen);
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      {children ?? (
        <>
          <p className="font-medium">Used {count} sources</p>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : '')}
          />
        </>
      )}
    </button>
  );
};

export type SourcesContentProps = ComponentProps<'div'>;

export const SourcesContent = ({
  className,
  ...props
}: SourcesContentProps) => {
  const { isOpen } = useSources();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-3 flex w-fit flex-col gap-2 transition-all duration-200 ease-out',
        className,
      )}
      {...props}
    />
  );
};

export type SourceProps = ComponentProps<'a'>;

export const Source = ({ href, title, children, className, ...props }: SourceProps) => (
  <a
    className={cn('flex items-center gap-2 text-left transition-colors hover:text-white', className)}
    href={href}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children ?? (
      <>
        <Book className="h-4 w-4" />
        <span className="block font-medium">{title}</span>
      </>
    )}
  </a>
);
