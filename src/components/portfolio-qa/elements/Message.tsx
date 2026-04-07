import React, {
  ComponentProps,
  HTMLAttributes,
  ReactElement,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './utils';

type MessageRole = 'user' | 'assistant' | 'system';

type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: MessageRole;
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full max-w-[95%] flex-col gap-2',
      from === 'user' ? 'is-user ml-auto justify-end' : 'is-assistant',
      className,
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      'flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-visible text-sm',
      'group-[.is-user]:ml-auto group-[.is-user]:rounded-3xl group-[.is-user]:border group-[.is-user]:border-neon-blue/30 group-[.is-user]:bg-[linear-gradient(145deg,rgba(0,240,255,0.16),rgba(0,0,0,0.9))] group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-lightest',
      'group-[.is-assistant]:rounded-3xl group-[.is-assistant]:border group-[.is-assistant]:border-neon-purple/20 group-[.is-assistant]:bg-[linear-gradient(160deg,rgba(228,33,252,0.10),rgba(8,8,12,0.96))] group-[.is-assistant]:px-4 group-[.is-assistant]:py-3 group-[.is-assistant]:text-lightest',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type MessageActionsProps = ComponentProps<'div'>;

export const MessageActions = ({
  className,
  children,
  ...props
}: MessageActionsProps) => (
  <div className={cn('flex items-center gap-1', className)} {...props}>
    {children}
  </div>
);

export type MessageActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip?: string;
  label?: string;
};

export const MessageAction = ({
  tooltip,
  children,
  label,
  className,
  type = 'button',
  ...props
}: MessageActionProps) => (
  <button
    className={cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-light/65 transition-colors hover:border-neon-blue/25 hover:text-white',
      className,
    )}
    title={tooltip}
    type={type}
    {...props}
  >
    {children}
    <span className="sr-only">{label || tooltip}</span>
  </button>
);

interface MessageBranchContextType {
  currentBranch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
  branches: ReactElement[];
  setBranches: (branches: ReactElement[]) => void;
}

const MessageBranchContext = createContext<MessageBranchContextType | null>(null);

const useMessageBranch = () => {
  const context = useContext(MessageBranchContext);

  if (!context) {
    throw new Error('MessageBranch components must be used within MessageBranch');
  }

  return context;
};

export type MessageBranchProps = HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
};

export const MessageBranch = ({
  defaultBranch = 0,
  onBranchChange,
  className,
  ...props
}: MessageBranchProps) => {
  const [currentBranch, setCurrentBranch] = useState(defaultBranch);
  const [branches, setBranches] = useState<ReactElement[]>([]);

  const handleBranchChange = useCallback(
    (newBranch: number) => {
      setCurrentBranch(newBranch);
      onBranchChange?.(newBranch);
    },
    [onBranchChange],
  );

  const goToPrevious = useCallback(() => {
    const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  }, [branches.length, currentBranch, handleBranchChange]);

  const goToNext = useCallback(() => {
    const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
    handleBranchChange(newBranch);
  }, [branches.length, currentBranch, handleBranchChange]);

  const contextValue = useMemo<MessageBranchContextType>(
    () => ({
      branches,
      currentBranch,
      goToNext,
      goToPrevious,
      setBranches,
      totalBranches: branches.length,
    }),
    [branches, currentBranch, goToNext, goToPrevious],
  );

  return (
    <MessageBranchContext.Provider value={contextValue}>
      <div className={cn('grid w-full gap-2 [&>div]:pb-0', className)} {...props} />
    </MessageBranchContext.Provider>
  );
};

export type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageBranchContent = ({
  children,
  ...props
}: MessageBranchContentProps) => {
  const { currentBranch, setBranches, branches } = useMessageBranch();
  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]).filter(Boolean) as ReactElement[],
    [children],
  );

  useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray);
    }
  }, [branches.length, childrenArray, setBranches]);

  return (
    <>
      {childrenArray.map((branch, index) => (
        <div
          className={cn(
            'grid gap-2 overflow-hidden [&>div]:pb-0',
            index === currentBranch ? 'block' : 'hidden',
          )}
          key={branch.key ?? index}
          {...props}
        >
          {branch}
        </div>
      ))}
    </>
  );
};

export type MessageBranchSelectorProps = ComponentProps<'div'>;

export const MessageBranchSelector = ({
  className,
  ...props
}: MessageBranchSelectorProps) => {
  const { totalBranches } = useMessageBranch();

  if (totalBranches <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-black/20 p-1',
        className,
      )}
      {...props}
    />
  );
};

export type MessageBranchPreviousProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MessageBranchPrevious = ({
  children,
  className,
  type = 'button',
  ...props
}: MessageBranchPreviousProps) => {
  const { goToPrevious, totalBranches } = useMessageBranch();

  return (
    <button
      aria-label="Previous branch"
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full text-light/65 transition-colors hover:text-white disabled:opacity-40',
        className,
      )}
      disabled={totalBranches <= 1}
      onClick={goToPrevious}
      type={type}
      {...props}
    >
      {children ?? <ChevronLeft size={14} />}
    </button>
  );
};

export type MessageBranchNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MessageBranchNext = ({
  children,
  className,
  type = 'button',
  ...props
}: MessageBranchNextProps) => {
  const { goToNext, totalBranches } = useMessageBranch();

  return (
    <button
      aria-label="Next branch"
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full text-light/65 transition-colors hover:text-white disabled:opacity-40',
        className,
      )}
      disabled={totalBranches <= 1}
      onClick={goToNext}
      type={type}
      {...props}
    >
      {children ?? <ChevronRight size={14} />}
    </button>
  );
};

export type MessageBranchPageProps = HTMLAttributes<HTMLSpanElement>;

export const MessageBranchPage = ({
  className,
  ...props
}: MessageBranchPageProps) => {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <span
      className={cn('px-2 text-xs text-light/55', className)}
      {...props}
    >
      {currentBranch + 1} of {totalBranches}
    </span>
  );
};

export type MessageResponseProps = HTMLAttributes<HTMLDivElement> & {
  isAnimating?: boolean;
};

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <div
      className={cn(
        'size-full text-sm leading-7 text-light/85 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className,
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    nextProps.isAnimating === prevProps.isAnimating,
);

MessageResponse.displayName = 'MessageResponse';

export type MessageToolbarProps = ComponentProps<'div'>;

export const MessageToolbar = ({
  className,
  children,
  ...props
}: MessageToolbarProps) => (
  <div
    className={cn('mt-4 flex w-full items-center justify-between gap-4', className)}
    {...props}
  >
    {children}
  </div>
);
