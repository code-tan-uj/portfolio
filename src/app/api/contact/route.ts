/**
 * Contact Form API Route
 * 
 * Handles contact form submissions:
 * - Validates form data
 * - Checks honeypot field
 * - Rate limiting with Supabase
 * - Sends email notifications via Resend
 * - Stores in Supabase database
 */

import { NextRequest, NextResponse } from "next/server";
import {
  validateContactForm,
  type ContactFormData,
} from "@/lib/formValidation";
import { sendContactEmail } from "@/lib/email";
import { config } from "@/config";
import { 
  saveContactSubmission, 
  checkRateLimit 
} from "@/lib/supabase";

// =========================================
// Rate Limiting (Uses Supabase or fallback in-memory)
// =========================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function isRateLimited(ip: string): Promise<boolean> {
  // Try Supabase rate limiting first
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const result = await checkRateLimit(ip, 'contact_form', 5, 15);
      return !result.allowed;
    } catch {
      // Fall back to in-memory if Supabase fails
    }
  }

  // In-memory fallback
  const now = Date.now();
  const limit = config.rateLimit.contactForm;
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + limit.windowMs,
    });
    return false;
  }

  if (record.count >= limit.maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

// =========================================
// POST Handler
// =========================================

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const formData: ContactFormData = {
      name: body.name || "",
      email: body.email || "",
      subject: body.subject || "",
      message: body.message || "",
      website: body.website || "", // Honeypot field
    };

    // Validate form data
    const errors = validateContactForm(formData);
    if (errors.length > 0) {
      // Check if it's a bot (honeypot filled)
      const botError = errors.find((e) => e.field === "website");
      if (botError) {
        // Silently reject bots with a fake success response
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Send email notification
    const emailResult = await sendContactEmail({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (!emailResult.success && config.features.enableEmailNotifications) {
      console.error("Email send failed:", emailResult.error);
      // Don't fail the request if email fails, just log it
    }

    // Save to Supabase database
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const userAgent = request.headers.get('user-agent') || undefined;
      const dbResult = await saveContactSubmission({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        ip_address: ip,
        user_agent: userAgent,
      });
      
      if (!dbResult.success) {
        console.error("Database save failed:", dbResult.error);
      }
    }

    // Log submission for debugging
    console.log("Contact form submission:", {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      emailSent: emailResult.success,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// =========================================
// GET Handler (Health Check)
// =========================================

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    features: {
      emailEnabled: config.features.enableEmailNotifications,
      databaseEnabled: config.features.enableContactDb,
    },
  });
}
