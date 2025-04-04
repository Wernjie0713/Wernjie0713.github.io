import ReactGA from 'react-ga4';

// Your Google Analytics measurement ID
const MEASUREMENT_ID = 'G-5PGKTBRMV9';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = () => {
  // Use both ReactGA and gtag for better compatibility
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

export const logEvent = (category: string, action: string, label?: string) => {
  // Use both ReactGA and gtag for better compatibility
  ReactGA.event({
    category,
    action,
    label
  });
  window.gtag('event', action, {
    event_category: category,
    event_label: label
  });
};

export const logButtonClick = (buttonName: string) => {
  logEvent('Button', 'Click', buttonName);
};

export const logSectionView = (sectionName: string) => {
  logEvent('Section', 'View', sectionName);
};

export const logExternalLink = (url: string) => {
  logEvent('External Link', 'Click', url);
}; 