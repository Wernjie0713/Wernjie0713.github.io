export interface PortfolioQaSource {
  id: string;
  title: string;
  url: string;
  description: string;
  quote?: string;
}

export type PortfolioQaAnswerSegment =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'citation';
      sourceIds: string[];
      label?: string;
    };

export interface PortfolioQaEntry {
  id: string;
  question: string;
  suggestionLabel: string;
  reasoning: string;
  answerSegments: PortfolioQaAnswerSegment[];
  sources: PortfolioQaSource[];
  analyticsLabel: string;
  followUpIds: string[];
  thinkingComplexity: 'simple' | 'complex';
}

export interface PortfolioQaMessage {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  questionId?: string;
  reasoning?: string;
  answerSegments?: PortfolioQaAnswerSegment[];
  sources?: PortfolioQaSource[];
  reasoningSteps?: string[];
  visibleReasoningSteps?: number;
  status?: 'thinking' | 'ready';
}
