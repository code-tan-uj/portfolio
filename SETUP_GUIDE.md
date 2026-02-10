# 🛠 Advanced Features Setup Guide

This guide walks you through enabling each advanced feature step by step.

---

## Table of Contents

1. [Sentry Error Monitoring](#1-sentry-error-monitoring)
2. [Email Notifications](#2-email-notifications)
3. [Sanity CMS](#3-sanity-cms-optional)
4. [GitHub Deployment](#4-github-deployment)
5. [Vercel Deployment](#5-vercel-deployment)
6. [Update Your Profile](#6-update-your-profile)

---

## 1. Sentry Error Monitoring

Sentry provides real-time error tracking and performance monitoring with a generous free tier.

### Step 1: Create Sentry Account
1. Go to [sentry.io](https://sentry.io) and sign up (free)
2. Create a new project → Select "Next.js"
3. Copy your DSN (looks like: `https://xxx@xxx.ingest.sentry.io/xxx`)

### Step 2: Install Sentry
```bash
npm install @sentry/nextjs
```

### Step 3: Configure Environment
Add to your `.env.local`:
```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

### Step 4: Verify Setup
The Sentry config files are already created:
- `sentry.client.config.ts` - Browser errors
- `sentry.server.config.ts` - Server errors
- `sentry.edge.config.ts` - Edge runtime errors

### Step 5: Test Error Tracking
Add this to a page temporarily to test:
```tsx
<button onClick={() => { throw new Error("Test Sentry error"); }}>
  Test Error
</button>
```

Check your Sentry dashboard to see the error appear!

---

## 2. Email Notifications

Choose one of these free options for contact form emails.

### Option A: Resend (Recommended)

**Free tier: 3,000 emails/month**

#### Step 1: Create Account
1. Go to [resend.com](https://resend.com) and sign up
2. Add and verify your domain (or use their test domain)
3. Create an API key

#### Step 2: Install Package
```bash
npm install resend
```

#### Step 3: Configure Environment
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=your@email.com
```

---

### Option B: Gmail SMTP

**Free with any Gmail account**

#### Step 1: Create App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication (required)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create a new app password for "Mail"

#### Step 2: Install Package
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

#### Step 3: Configure Environment
```env
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
NOTIFICATION_EMAIL=your.email@gmail.com
```

---

### Test Email Configuration
After setup, submit your contact form. You should receive:
1. A notification email to yourself
2. An auto-reply sent to the sender

---

## 3. Sanity CMS (Optional)

Sanity provides a free tier with generous limits for content management.

### Step 1: Create Sanity Project
```bash
npm create sanity@latest
```

Follow the prompts:
- Create a new project
- Use the default dataset configuration
- Use TypeScript
- Choose a project template (Blog is fine)

### Step 2: Create Content Schemas

Create `sanity/schemas/portfolio.ts`:
```typescript
export default {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "roles", title: "Roles", type: "array", of: [{ type: "string" }] },
    { name: "bio", title: "Bio", type: "text" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "availability", title: "Available for Work", type: "boolean" },
    {
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
      ],
    },
    {
      name: "resume",
      title: "Resume PDF",
      type: "file",
    },
  ],
};
```

Create `sanity/schemas/project.ts`:
```typescript
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    { name: "description", title: "Description", type: "text" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["web", "mobile", "design", "opensource"],
      },
    },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "thumbnail", title: "Thumbnail", type: "image" },
    { name: "liveUrl", title: "Live URL", type: "url" },
    { name: "githubUrl", title: "GitHub URL", type: "url" },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "order", title: "Order", type: "number" },
    { name: "role", title: "Your Role", type: "string" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "team", title: "Team Size", type: "number" },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
```

### Step 3: Configure Environment
Get your project ID from [sanity.io/manage](https://sanity.io/manage)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 4: Start Sanity Studio
```bash
cd sanity  # or wherever your studio is
npm run dev
```

Access the studio at `http://localhost:3333`

---

## 4. GitHub Deployment

### Step 1: Prepare Repository
```bash
# Make sure you're in the project directory
cd /path/to/portfolio

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Modern animated portfolio"
```

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (don't initialize with README)
3. Copy the remote URL

### Step 3: Push to GitHub
```bash
# Add your remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 4: Protect Your Secrets
Make sure `.env.local` is in `.gitignore` (it should be by default)

Never commit:
- API keys
- Passwords
- Secret tokens

---

## 5. Vercel Deployment

Vercel is the recommended deployment platform for Next.js.

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "Import Project"
4. Select your portfolio repository

### Step 2: Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SENTRY_DSN` | Your Sentry DSN |
| `RESEND_API_KEY` | Your Resend API key |
| `NOTIFICATION_EMAIL` | Your email |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (if using) |

### Step 3: Deploy
Click "Deploy" and wait for the build to complete!

### Step 4: Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## 6. Update Your Profile

### Update Personal Information

Edit `content/portfolio.md`:
```yaml
---
name: "Your Full Name"
title: "Your Title"
roles:
  - "Full Stack Developer"
  - "UI/UX Designer"
  - "Your Role"
bio: |
  Write your bio here. This will appear in the About section.
  
  You can have multiple paragraphs.
email: "your.real@email.com"
phone: "+1234567890"
location: "Your City, Country"
social:
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  twitter: "https://twitter.com/yourusername"
availability: true
resumeUrl: "/resume.pdf"
---
```

### Add Your Profile Photo
1. Replace `public/profile-placeholder.svg` with your photo
2. Name it `profile.jpg` or `profile.png`
3. Update the reference in `src/components/sections/About.tsx`

### Update Projects
Edit or create files in `content/projects/`:
```yaml
---
title: "Your Project Name"
slug: "your-project-slug"
description: "A brief description of your project"
category: "web"
tags: ["React", "TypeScript", "Your Tech"]
featured: true
thumbnail: "/projects/your-project.jpg"
liveUrl: "https://your-project.com"
githubUrl: "https://github.com/you/project"
order: 1
role: "Full Stack Developer"
duration: "3 months"
team: 2
---

## Project Overview
Write detailed project description in markdown...

## Key Features
- Feature 1
- Feature 2

## Technical Highlights
Describe the technical aspects...
```

### Update Social Links
Update the social links in these files:
- `src/components/sections/Hero.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Contact.tsx`

### Update Resume
1. Add your resume PDF to `public/resume.pdf`
2. Update the download link in `Hero.tsx` and `About.tsx`

---

## Quick Checklist

Before going live, make sure you've:

- [ ] Updated personal information in `content/portfolio.md`
- [ ] Added your profile photo
- [ ] Updated all project content
- [ ] Added your real social media links
- [ ] Set up email notifications
- [ ] Configured Sentry (optional)
- [ ] Deployed to Vercel
- [ ] Tested the contact form
- [ ] Checked mobile responsiveness
- [ ] Added your custom domain (optional)

---

## Need Help?

If you run into issues:

1. Check the browser console for errors
2. Check the Vercel deployment logs
3. Verify environment variables are set correctly
4. Make sure all required packages are installed

Good luck with your portfolio! 🚀
