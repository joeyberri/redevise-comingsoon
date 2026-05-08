/**
 * Detects if the current environment is the church subdomain.
 * Supports both production (church.redevise.com) and local development testing.
 */
export const isChurchSubdomain = () => {
  if (typeof window === "undefined") return false;
  
  const hostname = window.location.hostname;
  
  // Check for production subdomain
  if (hostname.includes("church.redevise.com")) return true;
  
  // Support for local testing (e.g., ?site=church)
  const params = new URLSearchParams(window.location.search);
  if (params.get("site") === "church") return true;
  
  return false;
};
