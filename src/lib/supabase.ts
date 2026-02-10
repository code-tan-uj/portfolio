/**
 * Supabase Client
 * 
 * Setup Instructions:
 * 1. Go to https://supabase.com and create a free account
 * 2. Create a new project (select closest region)
 * 3. Go to Settings > API to get your URL and anon key
 * 4. Add to .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL=your-project-url
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for server-side)
 * 
 * Run the SQL below in Supabase SQL Editor to create tables:
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Database Types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  created_at?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface PageView {
  id?: string;
  path: string;
  referrer?: string;
  user_agent?: string;
  country?: string;
  created_at?: string;
}

export interface RateLimitEntry {
  id?: string;
  ip_address: string;
  action: string;
  count: number;
  window_start: string;
}

// Client-side Supabase client (limited permissions)
let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (clientInstance) return clientInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  return clientInstance;
}

// Server-side Supabase client (full permissions)
export function getSupabaseAdmin(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// ============================================
// Contact Submissions
// ============================================

export async function saveContactSubmission(
  submission: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseAdmin();
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        ...submission,
        status: 'pending',
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    return [];
  }
}

// ============================================
// Page Views / Analytics
// ============================================

export async function trackPageView(
  path: string,
  referrer?: string,
  userAgent?: string
): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    
    await supabase.from('page_views').insert({
      path,
      referrer,
      user_agent: userAgent,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function getAnalytics(days: number = 30) {
  try {
    const supabase = getSupabaseAdmin();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total views
    const { count: totalViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    // Views by page
    const { data: viewsByPage } = await supabase
      .from('page_views')
      .select('path')
      .gte('created_at', startDate.toISOString());

    const pageViewCounts = viewsByPage?.reduce((acc: Record<string, number>, view: { path: string }) => {
      acc[view.path] = (acc[view.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Daily views
    const { data: dailyViews } = await supabase
      .from('page_views')
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    const dailyViewCounts = dailyViews?.reduce((acc: Record<string, number>, view: { created_at: string }) => {
      const date = new Date(view.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      totalViews: totalViews || 0,
      viewsByPage: pageViewCounts,
      dailyViews: dailyViewCounts,
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return { totalViews: 0, viewsByPage: {}, dailyViews: {} };
  }
}

// ============================================
// Rate Limiting
// ============================================

export async function checkRateLimit(
  ipAddress: string,
  action: string,
  maxRequests: number = 5,
  windowMinutes: number = 15
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const supabase = getSupabaseAdmin();
    const windowStart = new Date();
    windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);

    // Get current count
    const { data } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('ip_address', ipAddress)
      .eq('action', action)
      .gte('window_start', windowStart.toISOString())
      .single();

    const currentCount = data?.count || 0;
    const allowed = currentCount < maxRequests;
    const remaining = Math.max(0, maxRequests - currentCount - 1);

    if (allowed) {
      // Increment or insert rate limit entry
      if (data) {
        await supabase
          .from('rate_limits')
          .update({ count: currentCount + 1 })
          .eq('ip_address', ipAddress)
          .eq('action', action);
      } else {
        await supabase.from('rate_limits').insert({
          ip_address: ipAddress,
          action,
          count: 1,
          window_start: new Date().toISOString(),
        });
      }
    }

    return { allowed, remaining };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true, remaining: 999 }; // Fail open
  }
}

// ============================================
// SQL Schema (Run in Supabase SQL Editor)
// ============================================
/*

-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Page Views Table (Analytics)
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Rate Limits Table
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_rate_limits_lookup ON rate_limits(ip_address, action, window_start);

-- Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to page_views (for analytics)
CREATE POLICY "Allow anonymous page view inserts" ON page_views
  FOR INSERT WITH CHECK (true);

-- Only service role can access contact submissions
CREATE POLICY "Service role full access to contacts" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Only service role can access rate limits
CREATE POLICY "Service role full access to rate_limits" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role');

*/
