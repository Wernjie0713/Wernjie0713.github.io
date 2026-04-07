import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Cpu, Sparkles, X } from 'lucide-react';
import {
  getPortfolioQaEntry,
  getPortfolioQaEntryById,
  portfolioQaEntries,
} from 'data/portfolioQa';
import { gsap, useGSAP } from 'lib/gsap';
import {
  logPortfolioQaOpen,
  logPortfolioQaQuestion,
  logPortfolioQaSourceClick,
} from 'utils/analytics';
import {
  PortfolioQaAnswerSegment,
  PortfolioQaEntry,
  PortfolioQaMessage,
  PortfolioQaSource,
} from 'types/portfolioQa';
import { InlineCitation, InlineCitationText } from './elements/InlineCitation';
import { Message, MessageContent, MessageResponse } from './elements/Message';
import { Reasoning, ReasoningContent, ReasoningTrigger } from './elements/Reasoning';
import { Source, Sources, SourcesContent, SourcesTrigger } from './elements/Sources';
import { Suggestion, Suggestions } from './elements/Suggestion';

const INITIAL_MESSAGE: PortfolioQaMessage = {
  id: 'portfolio-qa-intro',
  role: 'assistant',
  text: "Hi. Ask about Yong Wern Jie's work, current roles, standout projects, achievements, or how to get in touch.",
  status: 'ready',
};

const INITIAL_SUGGESTION_IDS = [
  'who-is-yong-wern-jie',
  'what-kind-of-systems-do-you-build',
  'which-projects-should-i-look-at-first',
];

const VISIBLE_SUGGESTIONS = 5;

const getMessageId = (() => {
  let counter = 0;

  return (prefix: string) => `${prefix}-${Date.now()}-${counter++}`;
})();

const getRandomDelay = (minMs: number, maxMs: number) => {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
};

const getResponseDelay = (entry: PortfolioQaEntry) => {
  if (entry.thinkingComplexity === 'complex') {
    return getRandomDelay(10000, 15000);
  }

  return getRandomDelay(5000, 10000);
};

const getCitationLabel = (sources: PortfolioQaSource[], override?: string) => {
  if (override) {
    return override;
  }

  if (sources.length === 0) {
    return 'Source';
  }

  if (sources.length === 1) {
    return sources[0].title;
  }

  return `${sources[0].title} +${sources.length - 1}`;
};

const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: offsetTop - 96,
    behavior: 'smooth',
  });
};

const getReasoningSteps = (entry: PortfolioQaEntry) => {
  const sourceCount = entry.sources.length;
  const sourceLine =
    sourceCount > 1
      ? 'I am cross-checking multiple portfolio sections so the answer is not based on a single signal.'
      : 'I am reviewing the most relevant portfolio section first.';

  if (entry.id === 'which-projects-should-i-look-at-first') {
    return [
      'Let me think about that step by step.',
      'First, I need to identify the projects with the strongest portfolio signal.',
      sourceLine,
      'Now I can narrow this into a concise recommendation.',
    ];
  }

  if (entry.id === 'what-awards-or-achievements-stand-out') {
    return [
      'Let me think about that step by step.',
      'First, I need to compare the strongest achievement signals across the portfolio.',
      sourceLine,
      'Now I can highlight the awards that matter most without overloading the answer.',
    ];
  }

  if (entry.id === 'how-can-i-contact-you' || entry.id === 'where-can-i-view-your-resume') {
    return [
      'Let me think about that step by step.',
      'First, I need to locate the strongest contact and resume references.',
      sourceLine,
      'I have enough context now to point to the fastest route clearly.',
    ];
  }

  return [
    'Let me think about that step by step.',
    'First, I need to understand exactly what part of the portfolio this question is targeting.',
    sourceLine,
    'I have enough context now to answer with the most relevant details.',
  ];
};

const PortfolioQaWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<PortfolioQaMessage[]>([INITIAL_MESSAGE]);
  const panelRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLButtonElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const pendingTimeoutsRef = useRef<number[]>([]);

  const hasPendingResponse = useMemo(
    () => messages.some((message) => message.role === 'assistant' && message.status === 'thinking'),
    [messages],
  );

  const lastResolvedQuestionId = useMemo(() => {
    const resolvedAssistantMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === 'assistant' &&
          message.status === 'ready' &&
          message.questionId &&
          message.answerSegments,
      );

    return resolvedAssistantMessage?.questionId ?? null;
  }, [messages]);

  const suggestionPool = useMemo(() => {
    const prioritizedIds = lastResolvedQuestionId
      ? getPortfolioQaEntryById(lastResolvedQuestionId)?.followUpIds ?? INITIAL_SUGGESTION_IDS
      : INITIAL_SUGGESTION_IDS;

    const orderedIds = Array.from(
      new Set([
        ...prioritizedIds,
        ...portfolioQaEntries.map((entry) => entry.id),
      ]),
    ).filter((id) => id !== lastResolvedQuestionId);

    return orderedIds
      .map((id) => getPortfolioQaEntryById(id))
      .filter((entry): entry is PortfolioQaEntry => Boolean(entry));
  }, [lastResolvedQuestionId]);

  const displayedSuggestions = useMemo(
    () => suggestionPool.slice(0, VISIBLE_SUGGESTIONS),
    [suggestionPool],
  );

  useEffect(() => {
    return () => {
      pendingTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      pendingTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (conversationRef.current) {
        conversationRef.current.scrollTo({
          top: conversationRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!orbRef.current) {
        return;
      }

      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const ring = orbRef.current?.querySelector<HTMLElement>('[data-qa-orb-ring]');
        const core = orbRef.current?.querySelector<HTMLElement>('[data-qa-orb-core]');

        if (ring) {
          gsap.to(ring, {
            rotate: 360,
            duration: 14,
            repeat: -1,
            ease: 'none',
          });
        }

        if (core) {
          gsap.to(core, {
            scale: 1.05,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      });

      return () => media.revert();
    },
    { scope: orbRef },
  );

  useGSAP(
    () => {
      if (!isOpen || !panelRef.current) {
        return;
      }

      const staged = gsap.utils.toArray<HTMLElement>('[data-qa-stagger]', panelRef.current);

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 24, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.36,
          ease: 'power3.out',
        },
      );

      if (staged.length > 0) {
        gsap.fromTo(
          staged,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.06,
          },
        );
      }
    },
    { scope: panelRef, dependencies: [isOpen] },
  );

  useGSAP(
    () => {
      if (!isOpen || !panelRef.current) {
        return;
      }

      const messageNodes = gsap.utils.toArray<HTMLElement>('[data-qa-message]', panelRef.current);
      const lastMessage = messageNodes[messageNodes.length - 1];

      if (!lastMessage) {
        return;
      }

      gsap.fromTo(
        lastMessage,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        },
      );
    },
    { scope: panelRef, dependencies: [isOpen, messages] },
  );

  const openWidget = () => {
    setIsOpen(true);
    logPortfolioQaOpen();
  };

  const handleSourceClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    source: PortfolioQaSource,
  ) => {
    logPortfolioQaSourceClick(source.title);

    if (source.url.startsWith('#')) {
      event.preventDefault();
      scrollToSection(source.url);
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (hasPendingResponse) {
      return;
    }

    const entry = getPortfolioQaEntry(question);

    if (!entry) {
      return;
    }

    const userMessage: PortfolioQaMessage = {
      id: getMessageId('user'),
      role: 'user',
      text: entry.question,
      questionId: entry.id,
      status: 'ready',
    };

    const assistantMessageId = getMessageId('assistant');
    const reasoningSteps = getReasoningSteps(entry);
    const responseDelay = getResponseDelay(entry);
    const stepDuration = Math.max(1200, Math.floor(responseDelay / reasoningSteps.length));

    const thinkingMessage: PortfolioQaMessage = {
      id: assistantMessageId,
      role: 'assistant',
      questionId: entry.id,
      reasoning: reasoningSteps[0],
      reasoningSteps,
      visibleReasoningSteps: 1,
      status: 'thinking',
    };

    logPortfolioQaQuestion(entry.analyticsLabel);

    setMessages((currentMessages) => [...currentMessages, userMessage, thinkingMessage]);

    reasoningSteps.slice(1).forEach((_, index) => {
      const stepTimeoutId = window.setTimeout(() => {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  visibleReasoningSteps: index + 2,
                  reasoning: reasoningSteps.slice(0, index + 2).join('\n\n'),
                }
              : message,
          ),
        );

        pendingTimeoutsRef.current = pendingTimeoutsRef.current.filter((id) => id !== stepTimeoutId);
      }, stepDuration * (index + 1));

      pendingTimeoutsRef.current.push(stepTimeoutId);
    });

    const timeoutId = window.setTimeout(() => {
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                reasoning: reasoningSteps.join('\n\n'),
                visibleReasoningSteps: reasoningSteps.length,
                status: 'ready',
                answerSegments: entry.answerSegments,
                sources: entry.sources,
              }
            : message,
        ),
      );

      pendingTimeoutsRef.current = pendingTimeoutsRef.current.filter((id) => id !== timeoutId);
    }, responseDelay);

    pendingTimeoutsRef.current.push(timeoutId);
  };

  const renderCitationSegment = (
    segment: Extract<PortfolioQaAnswerSegment, { type: 'citation' }>,
    messageSources: PortfolioQaSource[],
    key: string,
  ) => {
    const citationSources = segment.sourceIds
      .map((sourceId) => messageSources.find((source) => source.id === sourceId))
      .filter((source): source is PortfolioQaSource => Boolean(source));

    if (citationSources.length === 0) {
      return null;
    }

    return (
      <InlineCitation key={key} className="align-middle">
        <span className="ml-1 inline text-[11px] font-medium text-neon-blue underline decoration-neon-blue/55 underline-offset-2">
          {getCitationLabel(citationSources, segment.label)}
        </span>
      </InlineCitation>
    );
  };

  const renderAssistantMessage = (message: PortfolioQaMessage) => {
    const messageSources = message.sources ?? [];
    const reasoningSteps = message.reasoningSteps ?? [];
    const visibleReasoningSteps = message.visibleReasoningSteps ?? 0;
    const visibleReasoning =
      message.status === 'thinking'
        ? reasoningSteps.slice(0, visibleReasoningSteps).join('\n\n')
        : message.reasoning;

    return (
      <>
        {visibleReasoning ? (
          <Reasoning
            className="mb-3"
            defaultOpen={message.status === 'thinking'}
            isStreaming={message.status === 'thinking'}
          >
            <ReasoningTrigger />
            <ReasoningContent>{visibleReasoning}</ReasoningContent>
          </Reasoning>
        ) : null}

        {message.answerSegments ? (
          <MessageResponse className="space-y-3">
            <p className="whitespace-pre-wrap">
              {message.answerSegments.map((segment, index) => {
                if (segment.type === 'text') {
                  return (
                    <InlineCitationText key={`${message.id}-text-${index}`}>
                      {segment.text}
                    </InlineCitationText>
                  );
                }

                return renderCitationSegment(
                  segment,
                  messageSources,
                  `${message.id}-citation-${index}`,
                );
              })}
            </p>
          </MessageResponse>
        ) : null}

        {!message.answerSegments && message.text ? (
          <MessageResponse>{message.text}</MessageResponse>
        ) : null}

        {message.status === 'ready' && messageSources.length > 0 ? (
          <Sources className="mt-4">
            <SourcesTrigger count={messageSources.length} />
            <SourcesContent>
              {messageSources.map((source) => (
                <Source
                  key={source.id}
                  href={source.url}
                  target={source.url.startsWith('#') ? undefined : '_blank'}
                  rel={source.url.startsWith('#') ? undefined : 'noreferrer noopener'}
                  onClick={(event) => handleSourceClick(event, source)}
                >
                  <span className="block">
                    <span className="block text-sm font-semibold text-lightest">{source.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-light/70">
                      {source.description}
                    </span>
                    {source.quote ? (
                      <span className="mt-3 block rounded-xl border-l-2 border-neon-purple/40 bg-white/[0.02] px-3 py-2 text-xs leading-5 text-light/65">
                        {source.quote}
                      </span>
                    ) : null}
                  </span>
                </Source>
              ))}
            </SourcesContent>
          </Sources>
        ) : null}
      </>
    );
  };

  return (
    <div className="pointer-events-none fixed inset-x-2 bottom-2 z-[70] sm:inset-x-auto sm:bottom-4 sm:right-4">
      {isOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Portfolio AI conversation panel"
          aria-modal="false"
          className="pointer-events-auto ml-auto w-full text-left sm:w-[420px]"
        >
          <div className="relative flex h-[min(82vh,46rem)] max-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-[30px] border border-neon-blue/25 bg-[linear-gradient(180deg,rgba(3,6,9,0.96),rgba(8,10,18,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(228,33,252,0.16),transparent_38%)]"></div>
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent"></div>

            <div
              data-qa-stagger
              className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 pb-4 pt-5"
            >
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"></span>
                  <span>Online</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-neon-purple/30 bg-black/50">
                    <div className="absolute inset-1 rounded-xl bg-[linear-gradient(145deg,rgba(0,240,255,0.2),rgba(228,33,252,0.12))]"></div>
                    <Bot className="relative h-5 w-5 text-lightest" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-cyber text-lg text-lightest">Portfolio AI</h2>
                    <p className="text-xs leading-5 text-light/65">
                      Ask about work, projects, achievements, or contact details.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-light/70 transition-colors duration-200 hover:border-neon-blue/30 hover:text-white"
                aria-label="Close portfolio AI panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={conversationRef}
              data-qa-stagger
              className="relative min-h-0 flex-1 overflow-y-auto px-5 py-5"
              aria-live="polite"
              aria-relevant="additions text"
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    from={message.role}
                    data-qa-message
                  >
                    <MessageContent
                      className={
                        message.role === 'assistant' && message.status === 'thinking'
                          ? 'rounded-none border-none bg-transparent px-0 py-0 shadow-none'
                          : ''
                      }
                    >
                      {message.role === 'assistant'
                        ? renderAssistantMessage(message)
                        : <MessageResponse>{message.text}</MessageResponse>}
                    </MessageContent>
                  </Message>
                ))}
              </div>
            </div>

            <div
              data-qa-stagger
              className="relative flex-shrink-0 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.03))] px-5 pb-5 pt-4"
            >
              <div className="mb-3 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.32em] text-neon-blue/80">
                  {lastResolvedQuestionId ? 'Suggested next' : 'Try asking'}
                </div>
              </div>

              <Suggestions className="pb-1">
                {displayedSuggestions.map((suggestion: PortfolioQaEntry) => (
                  <Suggestion
                    key={suggestion.id}
                    suggestion={suggestion.question}
                    onClick={handleSuggestionClick}
                    disabled={hasPendingResponse}
                    className="border-neon-purple/20 bg-black/30"
                  >
                    {suggestion.suggestionLabel}
                  </Suggestion>
                ))}
              </Suggestions>
            </div>
          </div>
        </div>
      ) : (
        <button
          ref={orbRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={openWidget}
          className="pointer-events-auto ml-auto flex items-center gap-3 rounded-full border border-neon-blue/30 bg-[linear-gradient(135deg,rgba(2,6,10,0.92),rgba(17,8,25,0.94))] px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.42)] transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-neon-blue/35 bg-black/75">
            <span
              data-qa-orb-ring
              className="absolute inset-0 rounded-full border border-dashed border-neon-purple/35"
            ></span>
            <span className="absolute inset-1 rounded-full border border-neon-blue/20 animate-pulse-slow"></span>
            <span
              data-qa-orb-core
              className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.22),rgba(228,33,252,0.2),rgba(0,0,0,0.9))]"
            ></span>
            <Cpu className="relative h-5 w-5 text-lightest" />
          </span>

          <span className="hidden min-w-0 text-left sm:block">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-neon-blue/85">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </span>
            <span className="mt-1 block font-cyber text-sm text-white">Portfolio Assistant</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default PortfolioQaWidget;
