import React from 'react';
import { cn } from './utils';

interface ShimmerProps extends React.HTMLAttributes<HTMLSpanElement> {
  duration?: number;
}

export const Shimmer = ({
  className,
  duration = 1,
  children,
  style,
  ...props
}: ShimmerProps) => {
  return (
    <span
      className={cn(
        'bg-[linear-gradient(90deg,rgba(204,214,246,0.45)_0%,rgba(230,241,255,0.96)_40%,rgba(204,214,246,0.45)_80%)] bg-[length:220%_100%] bg-clip-text text-transparent',
        'animate-[shimmer_1.2s_linear_infinite]',
        className,
      )}
      style={{
        animationDuration: `${duration}s`,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
