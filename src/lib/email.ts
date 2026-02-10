/**
 * Email Service
 * 
 * Provides email functionality for contact form notifications.
 * Supports both Resend (recommended) and Gmail SMTP.
 */

import { config } from "@/config";

// =========================================
// Types
// =========================================

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// =========================================
// Resend Email Provider
// =========================================

async function sendWithResend(data: ContactEmailData): Promise<EmailResult> {
  if (!config.email.resend.apiKey) {
    return { success: false, error: "Resend API key not configured" };
  }

  try {
    // Dynamic import to avoid issues if resend is not installed
    const { Resend } = await import("resend");
    const resend = new Resend(config.email.resend.apiKey);

    // Send notification to site owner
    await resend.emails.send({
      from: config.email.fromAddress,
      to: config.email.notificationEmail,
      subject: `New Contact: ${data.subject}`,
      html: generateNotificationHtml(data),
    });

    // Send auto-reply to sender
    await resend.emails.send({
      from: config.email.fromAddress,
      to: data.email,
      replyTo: config.email.notificationEmail,
      subject: "Thanks for reaching out!",
      html: generateAutoReplyHtml(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Resend email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// =========================================
// Gmail SMTP Provider
// =========================================

async function sendWithGmail(data: ContactEmailData): Promise<EmailResult> {
  if (!config.email.gmail.user || !config.email.gmail.appPassword) {
    return { success: false, error: "Gmail credentials not configured" };
  }

  try {
    // Dynamic import to avoid issues if nodemailer is not installed
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: config.email.gmail.user,
        pass: config.email.gmail.appPassword,
      },
    });

    // Send notification to site owner
    await transporter.sendMail({
      from: config.email.gmail.user,
      to: config.email.notificationEmail || config.email.gmail.user,
      subject: `Portfolio Contact: ${data.subject}`,
      html: generateNotificationHtml(data),
    });

    // Send auto-reply to sender
    await transporter.sendMail({
      from: config.email.gmail.user,
      to: data.email,
      subject: "Thanks for reaching out!",
      html: generateAutoReplyHtml(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Gmail email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// =========================================
// Email Templates
// =========================================

function generateNotificationHtml(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px;"><strong style="color: #6366F1;">From:</strong></p>
            <p style="margin: 0 0 5px; font-size: 16px;">${escapeHtml(data.name)}</p>
            <p style="margin: 0; color: #6b7280;">${escapeHtml(data.email)}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px;"><strong style="color: #6366F1;">Subject:</strong></p>
            <p style="margin: 0; font-size: 16px;">${escapeHtml(data.subject)}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px;"><strong style="color: #6366F1;">Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Reply to ${escapeHtml(data.name)}
            </a>
          </div>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          This email was sent from your portfolio contact form.
        </p>
      </body>
    </html>
  `;
}

function generateAutoReplyHtml(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thanks for reaching out!</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out! 👋</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px;">Hi ${escapeHtml(data.name)},</p>
          
          <p>Thank you for getting in touch! I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366F1;">
            <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">Your message:</p>
            <p style="margin: 0; font-style: italic;">"${escapeHtml(data.subject)}"</p>
          </div>
          
          <p>In the meantime, feel free to check out my latest projects and blog posts on my portfolio.</p>
          
          <p>Best regards,<br><strong style="color: #6366F1;">${config.site.author.name}</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${config.site.url}" style="display: inline-block; background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Visit My Portfolio
          </a>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          This is an automated response. Please do not reply directly to this email.
        </p>
      </body>
    </html>
  `;
}

// =========================================
// Utility Functions
// =========================================

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// =========================================
// Main Export
// =========================================

/**
 * Send contact form notification and auto-reply emails.
 * Automatically selects the best available email provider.
 */
export async function sendContactEmail(
  data: ContactEmailData
): Promise<EmailResult> {
  // Try Resend first (preferred)
  if (config.email.resend.enabled) {
    return sendWithResend(data);
  }

  // Fall back to Gmail
  if (config.email.gmail.enabled) {
    return sendWithGmail(data);
  }

  // No email provider configured
  console.warn("No email provider configured. Contact form submission logged only.");
  console.log("Contact form submission:", data);

  return {
    success: true, // Still return success so the form works
    error: "Email notifications not configured",
  };
}
