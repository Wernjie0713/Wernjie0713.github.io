import React, { ComponentProps, useCallback } from 'react';
import { cn } from './utils';

export type SuggestionsProps = ComponentProps<'div'>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <div className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn('flex w-max flex-nowrap items-center gap-2', className)}>
      {children}
    </div>
  </div>
);

export type SuggestionProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  return (
    <button
      className={cn(
        'cursor-pointer rounded-full border border-neon-blue/20 bg-white/[0.03] px-4 py-2 text-sm text-light/75 transition-colors hover:border-neon-blue/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-45',
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children || suggestion}
    </button>
  );
};
