/**
 * Analytics Hook
 * 
 * Tracks page views using Supabase.
 * Privacy-focused: no cookies, no personal data.
 */

'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV !== 'production') return;
    
    // Only track if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const trackPageView = async () => {
      try {
        const { trackPageView: track } = await import('@/lib/supabase');
        await track(
          pathname,
          document.referrer || undefined,
          navigator.userAgent
        );
      } catch (error) {
        // Silently fail - analytics should never break the app
        console.debug('Analytics tracking failed:', error);
      }
    };

    trackPageView();
  }, [pathname]);
}

/**
 * Analytics Provider Component
 * 
 * Add this to your root layout to enable analytics
 */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}
