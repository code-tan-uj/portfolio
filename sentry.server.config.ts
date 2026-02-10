/**
 * Sentry Server Configuration
 * 
 * This file configures Sentry for the Node.js server side.
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
    
    // Filter out known non-issues
    beforeSend(event) {
      // Don't send errors in development
      if (process.env.NODE_ENV === "development") {
        console.log("[Sentry Server] Would send event:", event);
        return null;
      }
      return event;
    },
  });
}
