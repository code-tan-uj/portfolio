/**
 * Application Configuration
 * 
 * Central configuration file that reads from environment variables
 * and provides type-safe access to configuration values.
 */

export const config = {
  // =========================================
  // Site Configuration
  // =========================================
  site: {
    name: "Tanuj Sansare",
    title: "Portfolio — Tanuj Sansare | AI Engineer",
    description: "AI Engineer specializing in LLMs, Vision Transformers, RAG pipelines, and enterprise-scale ML systems. Building AI that ships to millions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    author: {
      name: "Tanuj Sansare",
      email: "info@tanujsansare.cv",
      twitter: "@Tanuj0181",
    },
  },


  // =========================================
  // Sentry Error Monitoring
  // =========================================
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  },

  // =========================================
  // Hygraph CMS (GraphQL Headless CMS)
  // =========================================
  hygraph: {
    endpoint: process.env.HYGRAPH_ENDPOINT || "",
    token: process.env.HYGRAPH_TOKEN || "",
    enabled: !!process.env.HYGRAPH_ENDPOINT,
  },

  // =========================================
  // Supabase Database
  // =========================================
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    enabled: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  },

  // =========================================
  // Email Configuration
  // =========================================
  email: {
    // Resend
    resend: {
      apiKey: process.env.RESEND_API_KEY || "",
      enabled: !!process.env.RESEND_API_KEY,
    },
    // Gmail
    gmail: {
      user: process.env.GMAIL_USER || "",
      appPassword: process.env.GMAIL_APP_PASSWORD || "",
      enabled: !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD,
    },
    // Where to send notifications
    notificationEmail: process.env.NOTIFICATION_EMAIL || "",
    // From address for emails
    fromAddress: process.env.EMAIL_FROM || "Portfolio <noreply@yourdomain.com>",
  },

  // =========================================
  // Analytics (built-in Supabase or external)
  // =========================================
  analytics: {
    // Custom analytics using Supabase
    supabase: {
      enabled: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    },
    // Google Analytics (optional)
    googleAnalytics: {
      id: process.env.NEXT_PUBLIC_GA_ID || "",
      enabled: !!process.env.NEXT_PUBLIC_GA_ID,
    },
  },

  // =========================================
  // Feature Flags
  // =========================================
  features: {
    /** Use Hygraph CMS instead of file-based content */
    useHygraphCms: !!process.env.HYGRAPH_ENDPOINT,
    /** Enable error monitoring with Sentry */
    enableSentry: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    /** Enable analytics tracking with Supabase */
    enableAnalytics: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    /** Enable contact form database storage */
    enableContactDb: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    /** Enable email notifications */
    enableEmailNotifications: !!process.env.RESEND_API_KEY || !!process.env.GMAIL_APP_PASSWORD,
  },

  // =========================================
  // API Rate Limiting
  // =========================================
  rateLimit: {
    contactForm: {
      maxRequests: 5,
      windowMs: 60 * 1000, // 1 minute
    },
  },
} as const;

// Type exports for better DX
export type Config = typeof config;
export type SiteConfig = typeof config.site;
export type SentryConfig = typeof config.sentry;
export type HygraphConfig = typeof config.hygraph;
export type SupabaseConfig = typeof config.supabase;
export type EmailConfig = typeof config.email;
export type AnalyticsConfig = typeof config.analytics;
export type FeatureFlags = typeof config.features;
