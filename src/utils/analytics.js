/**
 * Google Analytics (GA4) Utility
 * Measurement ID: G-8FLSR46Z09
 */

export const GA_MEASUREMENT_ID = 'G-8FLSR46Z09';

/**
 * Dispatch an event to Google Analytics via gtag
 * @param {string} eventName - Name of the event (e.g. 'generate_lead', 'click', etc.)
 * @param {Record<string, any>} [params={}] - Additional parameters for the event
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};
