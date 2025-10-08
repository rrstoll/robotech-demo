/**
 * Accessibility utilities for the RoboTech demo
 */

// Focus management utilities
export const focusElement = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

// Announce changes to screen readers
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Skip to content functionality
export const skipToContent = () => {
  const mainContent = document.querySelector('main') as HTMLElement;
  if (mainContent) {
    mainContent.focus();
    mainContent.scrollIntoView();
  }
};

// Keyboard navigation helpers
export const isKeyboardEvent = (event: React.KeyboardEvent): boolean => {
  return event.key === 'Enter' || event.key === ' ';
};

export const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  callback: () => void
) => {
  if (isKeyboardEvent(event)) {
    event.preventDefault();
    callback();
  }
};

// ARIA live region for dynamic content
export const createLiveRegion = (id: string = 'live-region') => {
  let region = document.getElementById(id);
  if (!region) {
    region = document.createElement('div');
    region.id = id;
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
  }
  return region;
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want to use a proper color library
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate relative luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// WCAG compliance checkers
export const isWCAGCompliant = (contrastRatio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
  return level === 'AA' ? contrastRatio >= 4.5 : contrastRatio >= 7;
};

