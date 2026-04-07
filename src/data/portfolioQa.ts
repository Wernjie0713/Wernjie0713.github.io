import { RESUME_URL } from '../constants';
import {
  PortfolioQaEntry,
  PortfolioQaSource,
} from '../types/portfolioQa';

const sourceCatalog: Record<string, PortfolioQaSource> = {
  about: {
    id: 'about',
    title: 'About Me',
    url: '#about',
    description:
      'Overview of Yong Wern Jie, his focus areas, and the mix of analytics, AI, and full-stack work highlighted in the About section.',
    quote:
      'Computer Science (Data Engineering) student at UTM with hands-on experience building production-grade analytics platforms, AI-powered applications, and full-stack systems.',
  },
  experience: {
    id: 'experience',
    title: 'Experience',
    url: '#experience',
    description:
      'Current production work at Marrybrown and Nexscholar, including ETL, reporting, recommendation workflows, and AI system delivery.',
    quote:
      'Built a Sales & Payment Analytics Platform... and led full-stack and AI system development for Nexscholar.',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    url: '#projects',
    description:
      'Selected portfolio projects spanning Nexscholar, UTM DuitNow AI, EQ-View, AIcademy, and other product work.',
    quote:
      'A selection of projects showcasing work across data engineering, AI systems, analytics platforms, and scalable product development.',
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    url: '#achievements',
    description:
      'Awards and competition results including InnovHack, Cisco AI Hackathon, INATEX, and PayNet Digital Campus.',
    quote:
      'Champion at InnovHack 2025, Champion at Cisco AI Hackathon 2024, and Gold Award at INATEX 2025.',
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    url: '#contact',
    description:
      'Direct contact paths including email, LinkedIn, GitHub, WhatsApp, and location details.',
    quote:
      'Johor Bahru, Malaysia, with direct links for LinkedIn, GitHub, email, WhatsApp, and resume access.',
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    url: RESUME_URL,
    description:
      'Direct resume link shared from the portfolio constants for external viewing.',
    quote: 'Resume link available through the portfolio navigation and contact section.',
  },
};

const pickSources = (ids: string[]) => ids.map((id) => sourceCatalog[id]);

export const portfolioQaEntries: PortfolioQaEntry[] = [
  {
    id: 'who-is-yong-wern-jie',
    question: 'Who is Yong Wern Jie?',
    suggestionLabel: 'Who is he?',
    reasoning: 'Matched your question to the About and Experience sections to summarize identity, training, and current work.',
    answerSegments: [
      {
        type: 'text',
        text: 'Yong Wern Jie is a final-year Computer Science (Data Engineering) student at UTM who focuses on production-grade analytics, AI applications, and full-stack systems ',
      },
      {
        type: 'citation',
        sourceIds: ['about'],
      },
      {
        type: 'text',
        text: '. He is currently working across business-facing analytics engineering at Marrybrown and AI/product delivery at Nexscholar ',
      },
      {
        type: 'citation',
        sourceIds: ['experience'],
      },
      {
        type: 'text',
        text: '.',
      },
    ],
    sources: pickSources(['about', 'experience']),
    analyticsLabel: 'Who is Yong Wern Jie',
    thinkingComplexity: 'simple',
    followUpIds: [
      'what-kind-of-systems-do-you-build',
      'which-projects-should-i-look-at-first',
      'how-can-i-contact-you',
    ],
  },
  {
    id: 'what-kind-of-systems-do-you-build',
    question: 'What kind of systems do you build?',
    suggestionLabel: 'What does he build?',
    reasoning: 'Matched your question to the About, Experience, and Projects sections to summarize the main system categories.',
    answerSegments: [
      {
        type: 'text',
        text: 'The portfolio is centered on production-grade data pipelines, analytics and reporting platforms, AI-powered recommendation or matching features, and supporting full-stack applications ',
      },
      {
        type: 'citation',
        sourceIds: ['about', 'experience'],
      },
      {
        type: 'text',
        text: '. Representative work ranges from internal analytics systems to educational platforms and multimodal AI products ',
      },
      {
        type: 'citation',
        sourceIds: ['projects'],
      },
      {
        type: 'text',
        text: '.',
      },
    ],
    sources: pickSources(['about', 'experience', 'projects']),
    analyticsLabel: 'What kind of systems do you build',
    thinkingComplexity: 'complex',
    followUpIds: [
      'what-are-you-building-at-nexscholar',
      'what-are-you-working-on-at-marrybrown',
      'which-projects-should-i-look-at-first',
    ],
  },
  {
    id: 'what-are-you-working-on-at-marrybrown',
    question: 'What are you working on at Marrybrown?',
    suggestionLabel: 'Marrybrown work',
    reasoning: 'Matched your question to the Marrybrown experience card in the Experience section.',
    answerSegments: [
      {
        type: 'text',
        text: 'At Marrybrown, the focus is on a Sales & Payment Analytics Platform built by reverse-engineering fragmented POS exports, designing ETL and warehouse replication flows, and validating outputs against business rules ',
      },
      {
        type: 'citation',
        sourceIds: ['experience'],
      },
      {
        type: 'text',
        text: '. In short, it is analytics engineering work aimed at reliable reporting delivery in a production environment.',
      },
    ],
    sources: pickSources(['experience']),
    analyticsLabel: 'Marrybrown work',
    thinkingComplexity: 'simple',
    followUpIds: [
      'what-kind-of-systems-do-you-build',
      'what-are-you-building-at-nexscholar',
      'which-projects-should-i-look-at-first',
    ],
  },
  {
    id: 'what-are-you-building-at-nexscholar',
    question: 'What are you building at Nexscholar?',
    suggestionLabel: 'Nexscholar work',
    reasoning: 'Matched your question to the Nexscholar experience summary and the highlighted project entry.',
    answerSegments: [
      {
        type: 'text',
        text: 'At Nexscholar, the work spans full-stack product delivery plus AI features such as semantic matching, recommendation workflows, and research collaboration tooling ',
      },
      {
        type: 'citation',
        sourceIds: ['experience'],
      },
      {
        type: 'text',
        text: '. The projects section reinforces that this includes Laravel, React, MySQL, OpenAI, RAG, and Qdrant in a production educational platform ',
      },
      {
        type: 'citation',
        sourceIds: ['projects'],
      },
      {
        type: 'text',
        text: '.',
      },
    ],
    sources: pickSources(['experience', 'projects']),
    analyticsLabel: 'Nexscholar work',
    thinkingComplexity: 'complex',
    followUpIds: [
      'which-projects-should-i-look-at-first',
      'what-kind-of-systems-do-you-build',
      'what-awards-or-achievements-stand-out',
    ],
  },
  {
    id: 'which-projects-should-i-look-at-first',
    question: 'Which projects should I look at first?',
    suggestionLabel: 'Best projects',
    reasoning: 'Matched your question to the highlighted Projects section and prioritized the strongest signal projects for first review.',
    answerSegments: [
      {
        type: 'text',
        text: 'Start with Nexscholar for the clearest production platform story, then UTM DuitNow AI for a scaled digital workflow case, and EQ-View or AIcademy if you want to see the AI competition work first ',
      },
      {
        type: 'citation',
        sourceIds: ['projects'],
      },
      {
        type: 'text',
        text: '. Those projects show the broadest range across product engineering, analytics, and applied AI.',
      },
    ],
    sources: pickSources(['projects']),
    analyticsLabel: 'Project recommendations',
    thinkingComplexity: 'complex',
    followUpIds: [
      'what-are-you-building-at-nexscholar',
      'what-awards-or-achievements-stand-out',
      'how-can-i-contact-you',
    ],
  },
  {
    id: 'what-awards-or-achievements-stand-out',
    question: 'What awards or achievements stand out?',
    suggestionLabel: 'Top achievements',
    reasoning: 'Matched your question to the Achievements timeline and highlighted the most distinctive awards.',
    answerSegments: [
      {
        type: 'text',
        text: 'The strongest highlights are Champion at InnovHack 2025, Champion at Cisco AI Hackathon 2024, Gold Award at INATEX 2025, and multiple podium finishes across SEA-CICSIS, UTM-UMK Datathon, and PayNet Digital Campus ',
      },
      {
        type: 'citation',
        sourceIds: ['achievements'],
      },
      {
        type: 'text',
        text: '. Together they show repeat performance across both AI and product-oriented competitions.',
      },
    ],
    sources: pickSources(['achievements']),
    analyticsLabel: 'Achievements',
    thinkingComplexity: 'complex',
    followUpIds: [
      'which-projects-should-i-look-at-first',
      'who-is-yong-wern-jie',
      'how-can-i-contact-you',
    ],
  },
  {
    id: 'how-can-i-contact-you',
    question: 'How can I contact you?',
    suggestionLabel: 'Contact',
    reasoning: 'Matched your question to the Contact section where the portfolio lists direct communication channels.',
    answerSegments: [
      {
        type: 'text',
        text: 'The portfolio provides direct contact routes through email, LinkedIn, GitHub, WhatsApp, and a resume link, with Johor Bahru, Malaysia listed as the current location ',
      },
      {
        type: 'citation',
        sourceIds: ['contact'],
      },
      {
        type: 'text',
        text: '. If you want the fastest portfolio-native route, the contact section is the best place to start.',
      },
    ],
    sources: pickSources(['contact']),
    analyticsLabel: 'Contact',
    thinkingComplexity: 'simple',
    followUpIds: [
      'where-can-i-view-your-resume',
      'which-projects-should-i-look-at-first',
      'who-is-yong-wern-jie',
    ],
  },
  {
    id: 'where-can-i-view-your-resume',
    question: 'Where can I view your resume?',
    suggestionLabel: 'Resume',
    reasoning: 'Matched your question to the shared resume link used in the navigation and contact section.',
    answerSegments: [
      {
        type: 'text',
        text: "The resume is available through the portfolio's shared resume link ",
      },
      {
        type: 'citation',
        sourceIds: ['resume'],
      },
      {
        type: 'text',
        text: '. You can also reach it from the Contact section or the main navigation ',
      },
      {
        type: 'citation',
        sourceIds: ['contact'],
      },
      {
        type: 'text',
        text: '.',
      },
    ],
    sources: pickSources(['resume', 'contact']),
    analyticsLabel: 'Resume',
    thinkingComplexity: 'simple',
    followUpIds: [
      'how-can-i-contact-you',
      'who-is-yong-wern-jie',
      'which-projects-should-i-look-at-first',
    ],
  },
];

export const portfolioQaSuggestions = portfolioQaEntries.map((entry) => entry.question);

export const getPortfolioQaEntry = (question: string) =>
  portfolioQaEntries.find((entry) => entry.question === question);

export const getPortfolioQaEntryById = (id: string) =>
  portfolioQaEntries.find((entry) => entry.id === id);
