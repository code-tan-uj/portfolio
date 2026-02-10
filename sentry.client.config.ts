/**
 * Sentry Client Configuration
 * 
 * This file configures Sentry for the browser/client side.
 * Make sure to install @sentry/nextjs: npm install @sentry/nextjs
 */

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Environment
    environment: process.env.NODE_ENV,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% on errors
    
    // Integrations
    integrations: [
      // Browser tracing for performance monitoring
      Sentry.browserTracingIntegration(),
      // Session replay for debugging
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Filter out known non-issues
    beforeSend(event) {
      // Don't send errors in development
      if (process.env.NODE_ENV === "development") {
        console.log("[Sentry] Would send event:", event);
        return null;
      }
      return event;
    },
    
    // Ignore common errors that aren't actionable
    ignoreErrors: [
      // Network errors
      "Failed to fetch",
      "NetworkError",
      "Network request failed",
      // Browser extensions
      "chrome-extension://",
      "moz-extension://",
      // Third-party scripts
      "Script error",
      // Cancelled requests
      "AbortError",
    ],
  });
}
