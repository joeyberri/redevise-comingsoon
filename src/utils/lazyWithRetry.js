import { lazy } from "react";

/**
 * lazyWithRetry — A robust wrapper around React.lazy.
 * Catches dynamic import failures (e.g. ChunkLoadErrors from new deployments)
 * and attempts a single force reload to fetch the latest assets from Cloudflare.
 */
export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const hasBeenRefreshed = window.sessionStorage.getItem("chunk-load-refreshed") === "true";

    try {
      const component = await componentImport();
      // On success, reset the refreshed flag (could be a recovery load)
      window.sessionStorage.setItem("chunk-load-refreshed", "false");
      return component;
    } catch (error) {
      // Check if it's a dynamic import / chunk load failure
      // Common names: "Failed to fetch dynamically imported module", "ChunkLoadError"
      const isChunkError = 
        error.message?.includes("dynamically") || 
        error.message?.includes("chunk") || 
        error.name === "ChunkLoadError" ||
        error.message?.includes("Failed to fetch");

      if (isChunkError && !hasBeenRefreshed) {
        window.sessionStorage.setItem("chunk-load-refreshed", "true");
        window.location.reload();
        // Return a promise that never resolves to prevent rendering broken components before reload
        return new Promise(() => {});
      }

      // If already refreshed or not a chunk error, let the ErrorBoundary handle it
      throw error;
    }
  });
