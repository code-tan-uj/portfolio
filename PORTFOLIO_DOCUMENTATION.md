# 🚀 Portfolio Website - Complete Documentation

> A modern, highly animated portfolio website built with Next.js 16, featuring glassmorphism design, advanced animations, and file-based CMS.

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Feature Inventory](#feature-inventory)
4. [Architecture Overview](#architecture-overview)
5. [Development Journey - Prompt-by-Prompt](#development-journey)
6. [Advanced Features Implementation Guide](#advanced-features-implementation-guide)
7. [Deployment & GitHub Setup](#deployment--github-setup)

---

## 🎯 Project Overview

This portfolio website was built using a structured 5-phase approach with 14 detailed prompts. It showcases a modern developer/designer portfolio with:

- **Glassmorphism Design**: Frosted glass effects with backdrop blur
- **Rich Animations**: Framer Motion powered interactions
- **Dark/Light Theme**: System-aware with localStorage persistence
- **File-based CMS**: Markdown content management
- **Dynamic Routing**: Individual project detail pages
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Next.js 16 with React 19

---

## 🛠 Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |

### Animation & Effects
| Library | Purpose |
|---------|---------|
| Framer Motion | 12.30.1 - Advanced animations |
| Lucide React | Icon library |
| Custom Canvas Particles | Background effects |

### Content Management
| Library | Purpose |
|---------|---------|
| gray-matter | YAML frontmatter parsing |
| remark | Markdown processing |
| remark-html | Markdown to HTML conversion |

### Utilities
| Library | Purpose |
|---------|---------|
| clsx | Conditional class names |
| tailwind-merge | Tailwind class merging |

---

## ✨ Feature Inventory

### Phase 1: Foundation & Architecture

#### 1. Design System (`/src/styles/design-system.css`)
- **Color Tokens**: Light/Dark theme palettes
  - Primary: Indigo (#6366F1 / #818CF8)
  - Secondary: Purple (#8B5CF6 / #A78BFA)
  - Accent: Pink (#EC4899 / #F472B6)
  - Surface, text, border colors for both themes
- **Typography**: Inter, Space Grotesk, JetBrains Mono
- **Spacing Scale**: 4px base unit system
- **Glass Effect Tokens**: Blur, opacity, shadows
- **Animation Tokens**: Durations, easing functions
- **Gradient Definitions**: Primary, accent, hero, mesh

#### 2. Theme System (`/src/lib/theme-context.tsx`)
- React Context-based theme management
- localStorage persistence
- System preference detection
- Smooth theme transitions
- SSR-safe implementation

#### 3. Custom Hooks
- `useTheme`: Theme access and toggle
- `useScrollAnimation`: Intersection Observer wrapper
- `useTypewriter`: Typewriter text effect
- `useCountUp`: Animated number counter

---

### Phase 2: Core UI Components

#### Layout Components
| Component | Features |
|-----------|----------|
| `GlassNavbar` | Glassmorphism effect, scroll shadow, mobile menu, active section detection, smooth scroll |
| `Footer` | Social links, glassmorphism, staggered animations |
| `MainLayout` | Theme wrapper, custom cursor, mesh background |

#### UI Components (`/src/components/ui/`)
| Component | Features |
|-----------|----------|
| `Button` | 4 variants (primary, secondary, ghost, danger), 4 sizes, loading state, icons, ripple effect |
| `Card` | 3 variants (default, elevated, flat), hover animations, header/footer slots |
| `Badge` | 5 color variants, pill/rounded shapes, dot indicator, icon support |
| `Input` | Floating labels, error states, icons, character count |
| `Modal` | Backdrop blur, close on escape/outside click, focus trap |
| `Tooltip` | 4 positions, fade animation, arrow pointer |
| `Breadcrumbs` | Navigation trail for project pages |

---

### Phase 3: Sections

#### Hero Section
- Full viewport height
- Animated gradient mesh background
- Particle system overlay
- Typewriter effect for roles
- Staggered entrance animations
- Social links with hover effects
- CTA buttons with magnetic effect

#### About Section
- Two-column responsive layout
- Profile image with gradient border glow
- Animated stat cards with count-up effect
- Skills badges with stagger animation
- Parallax background

#### Projects Section
- Filter tabs (All, Web, Mobile, Design, Open Source)
- Project cards with:
  - Image hover zoom
  - Glass card effect
  - Technology badges
  - Live/GitHub links
- Load more functionality (UI ready)
- Scroll reveal animations

#### Skills Section
- Category filter tabs
- Skill cards with:
  - Icon mapping (Lucide)
  - Proficiency indicators
  - Hover glow effects
- Animated entrance

#### Experience Section
- Timeline layout (alternating on desktop)
- Animated timeline line
- Type-based icons (work/education/certification)
- Filter tabs
- Highlight lists with badges

#### Contact Section
- Two-column layout
- Contact info cards (email, location)
- Social media buttons
- Contact form with:
  - Real-time validation
  - Honeypot spam protection
  - Loading/success/error states
  - Character count
- Particle background

---

### Phase 4: Animations & Effects

#### Animation Components (`/src/components/animations/`)
| Component | Features |
|-----------|----------|
| `ScrollReveal` | 7 animation variants (fadeIn, slideUp/Down/Left/Right, scale, rotate) |
| `StaggerContainer` | Orchestrates child animations with configurable delay |
| `ParallaxSection` | GPU-accelerated parallax scrolling |
| `PageTransition` | Route change animations |

#### Effect Components (`/src/components/effects/`)
| Component | Features |
|-----------|----------|
| `Particles` | Canvas-based particle system, mouse interaction, theme-aware colors |
| `MagneticButton` | Cursor-following magnetic pull effect |
| `Cursor` | Custom animated cursor with dot + ring, state changes on hover |
| `GlowEffect` | Mouse-following radial glow overlay |
| `TextGradient` | Animated gradient text with speed presets |
| `FloatingShapes` | Decorative animated geometric shapes |

---

### Phase 5: CMS & Content Management

#### File-based CMS Structure
```
content/
├── portfolio.md          # Personal info (name, bio, social links)
└── projects/
    ├── cloudsync-dashboard.md
    ├── artistry-design-platform.md
    ├── devflow-cli.md
    ├── foodiemap.md
    ├── notevault.md
    └── pixelmotion.md
```

#### Content Utilities (`/src/lib/content.ts`)
- `getPortfolioData()`: Parse portfolio.md
- `getAllProjects()`: Get all project data
- `getProjectBySlug()`: Get single project
- `getProjectSlugs()`: For static generation

#### Markdown Processing (`/src/lib/markdown.ts`)
- `markdownToHtml()`: Remark-based conversion

---

### Dynamic Project Pages

#### Route: `/app/projects/[slug]/`
- Static generation with `generateStaticParams`
- Dynamic metadata (title, description, OG tags)
- Related projects (same category)

#### ProjectDetail Component
- Hero with gradient overlay
- Breadcrumbs navigation
- Project metadata (role, duration, team)
- Markdown content rendering
- Technology stack display
- Related projects grid

---

## 🏗 Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts, ThemeProvider
│   ├── page.tsx           # Home page with all sections
│   ├── globals.css        # Global styles, imports design-system
│   └── projects/[slug]/   # Dynamic project pages
│
├── components/
│   ├── animations/        # ScrollReveal, StaggerContainer, etc.
│   ├── effects/           # Particles, Cursor, GlowEffect, etc.
│   ├── layout/            # GlassNavbar, Footer, MainLayout
│   ├── projects/          # ProjectDetail
│   ├── sections/          # Hero, About, Projects, Skills, etc.
│   └── ui/                # Button, Card, Badge, Input, etc.
│
├── data/                   # Static data (skills, experience)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities (theme, content, validation)
└── styles/                 # Design system CSS
```

---

## 📝 Development Journey

### Phase 1: Foundation & Architecture (Prompts 1-3)

#### Prompt 1: Project Setup & Design System
**Created:**
- `/styles/design-system.css` - Comprehensive CSS custom properties
- `/lib/theme-context.tsx` - ThemeProvider with React Context
- `/hooks/useTheme.ts` - Theme access hook

**Key Features:**
- Light/dark color palettes
- Typography scale (Inter, Space Grotesk, JetBrains Mono)
- Glass effect tokens
- Animation tokens

#### Prompt 2: Core Layout Structure
**Created:**
- `/components/layout/GlassNavbar.tsx` - Fixed glassmorphism navigation
- `/components/layout/Footer.tsx` - Social links footer
- `/components/layout/MainLayout.tsx` - Layout wrapper

**Key Features:**
- Scroll-aware navbar styling
- Mobile hamburger menu
- Theme toggle with animation
- Intersection Observer for active section

#### Prompt 3: Hero Section Foundation
**Created:**
- `/components/sections/Hero.tsx` - Full-viewport hero

**Key Features:**
- Animated mesh background
- Typewriter role display
- Staggered entrance animations
- Social links

---

### Phase 2: Core UI Components (Prompts 4-6)

#### Prompt 4: Reusable UI Components
**Created:**
- `/components/ui/Button.tsx` - Multi-variant button
- `/components/ui/Card.tsx` - Glass card
- `/components/ui/Badge.tsx` - Label/tag
- `/components/ui/Input.tsx` - Styled input
- `/components/ui/Modal.tsx` - Overlay modal
- `/components/ui/Tooltip.tsx` - Hover tooltip

**Key Features:**
- TypeScript typed with variants
- Framer Motion animations
- Accessibility support
- Ripple effects

#### Prompt 5: About Section
**Created:**
- `/components/sections/About.tsx`
- `/hooks/useCountUp.ts`

**Key Features:**
- Profile image with gradient border
- Animated stat counters
- Skills badges
- Responsive two-column layout

#### Prompt 6: Projects Section
**Created:**
- `/components/sections/Projects.tsx`

**Key Features:**
- Category filter tabs
- Project cards with hover effects
- Technology tags
- Load more UI

---

### Phase 3: Animations & Interactions (Prompts 7-9)

#### Prompt 7: Advanced Scroll Animations
**Created:**
- `/hooks/useScrollAnimation.ts`
- `/components/animations/ScrollReveal.tsx`
- `/components/animations/StaggerContainer.tsx`
- `/components/animations/ParallaxSection.tsx`

**Key Features:**
- Intersection Observer integration
- 7 animation variants
- Configurable stagger delay
- GPU-accelerated parallax

#### Prompt 8: Interactive Background Effects
**Created:**
- `/components/effects/Particles.tsx`
- `/components/effects/FloatingShapes.tsx`

**Key Features:**
- Canvas particle system
- Mouse interaction
- Theme-aware colors
- Seeded random for SSR

#### Prompt 9: Micro-interactions & Hover Effects
**Created:**
- `/components/effects/MagneticButton.tsx`
- `/components/effects/Cursor.tsx`
- `/components/effects/TextGradient.tsx`
- `/components/effects/GlowEffect.tsx`

**Key Features:**
- Magnetic cursor pull
- Custom animated cursor
- Animated gradient text
- Mouse-following glow

---

### Phase 4: CMS & Data Management (Prompts 10-12)

#### Prompt 10: Skills Section with Data Structure
**Created:**
- `/data/skills.ts`
- `/components/sections/Skills.tsx`

**Key Features:**
- Category-based organization
- Proficiency indicators
- Icon mapping

#### Prompt 11: Experience/Timeline Section
**Created:**
- `/data/experience.ts`
- `/components/sections/Experience.tsx`

**Key Features:**
- Alternating timeline layout
- Type-based filtering
- Animated timeline line

#### Prompt 12: Contact Section with Form
**Created:**
- `/components/sections/Contact.tsx`
- `/lib/formValidation.ts`

**Key Features:**
- Contact form with validation
- Honeypot spam protection
- Copy email functionality
- Success/error states

---

### Phase 5: Advanced Features (Prompts 13-14)

#### Prompt 13: Content Management Setup
**Created:**
- `/content/portfolio.md`
- `/content/projects/*.md`
- `/lib/content.ts`

**Key Features:**
- Gray-matter frontmatter parsing
- Remark markdown processing
- Type-safe data fetching

#### Prompt 14: Project Detail Pages
**Created:**
- `/app/projects/[slug]/page.tsx`
- `/app/projects/[slug]/layout.tsx`
- `/components/projects/ProjectDetail.tsx`
- `/components/ui/Breadcrumbs.tsx`
- `/lib/markdown.ts`
- `/components/animations/PageTransition.tsx`

**Key Features:**
- Static generation
- Dynamic metadata
- Related projects
- Markdown content rendering

---

## 🔧 Advanced Features Implementation Guide

The following sections detail how to implement additional advanced features to enhance your portfolio.

---

### Feature 1: Error Monitoring with Sentry (Free Tier)

Sentry provides real-time error tracking and performance monitoring.

#### Installation
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Configuration Files to Create

**`sentry.client.config.ts`**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
});
```

**`sentry.server.config.ts`**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

**`sentry.edge.config.ts`**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

### Feature 2: Database Integration with Cloudflare D1 (Free)

Cloudflare D1 is a serverless SQL database with a generous free tier.

#### Setup
```bash
npm install @cloudflare/d1
```

#### Database Schema (`/schema.sql`)
```sql
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### API Route (`/src/app/api/contact/route.ts`)
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // TODO: Connect to Cloudflare D1
    // const result = await env.DB.prepare(
    //   "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)"
    // ).bind(name, email, subject, message).run();

    // For now, log to console
    console.log("Contact submission:", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

---

### Feature 3: Email Notifications with Gmail/Resend (Free)

#### Option A: Resend (Free tier: 3000 emails/month)

```bash
npm install resend
```

**`/src/lib/email.ts`**
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Email to yourself
  await resend.emails.send({
    from: "Portfolio <noreply@yourdomain.com>",
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `New Contact: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  // Auto-reply to sender
  await resend.emails.send({
    from: "Tanuj Sansare <noreply@yourdomain.com>",
    to: data.email,
    subject: "Thanks for reaching out!",
    html: `
      <h2>Hi ${data.name}!</h2>
      <p>Thank you for getting in touch. I've received your message and will get back to you within 24-48 hours.</p>
      <p>Best regards,<br>Tanuj Sansare</p>
    `,
  });
}
```

#### Option B: Gmail SMTP (Free)

```bash
npm install nodemailer
```

**`/src/lib/email-gmail.ts`**
```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
```

---

### Feature 4: Headless CMS Integration (Sanity - Free)

The project already has `@sanity/client` installed. Here's how to use it:

#### Sanity Studio Setup
```bash
npm create sanity@latest -- --project-id YOUR_PROJECT_ID --dataset production
```

#### Content Schemas (`/sanity/schemas/`)

**`project.ts`**
```typescript
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "category", title: "Category", type: "string", options: {
      list: ["web", "mobile", "design", "opensource"]
    }},
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "thumbnail", title: "Thumbnail", type: "image" },
    { name: "liveUrl", title: "Live URL", type: "url" },
    { name: "githubUrl", title: "GitHub URL", type: "url" },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "order", title: "Order", type: "number" },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
  ],
};
```

#### Sanity Client (`/src/lib/sanity.ts`)
```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export async function getProjects() {
  return sanityClient.fetch(`*[_type == "project"] | order(order asc)`);
}

export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  );
}
```

---

### Feature 5: Environment Variables & Config

#### `.env.local` (Create this file - DO NOT COMMIT)
```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Email
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=your@email.com

# Gmail (Alternative)
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# Cloudflare D1
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_API_TOKEN=your_api_token

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### `.env.example` (Commit this file)
```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Email
RESEND_API_KEY=
NOTIFICATION_EMAIL=

# Gmail (Alternative)
GMAIL_USER=
GMAIL_APP_PASSWORD=

# Cloudflare D1
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_API_TOKEN=
```

#### Config File (`/src/config/index.ts`)
```typescript
export const config = {
  // Site
  siteName: "Tanuj Sansare",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Sentry
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Sanity
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  
  // Email
  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL,
  },
  
  // Feature flags
  features: {
    useSanityCms: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    enableAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
  },
} as const;
```

---

## 🚀 Deployment & GitHub Setup

### Step 1: Initialize Git Repository
```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: Modern animated portfolio"
```

### Step 2: Add MIT License

Create `LICENSE` file:
```
MIT License

Copyright (c) 2026 Tanuj Sansare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 3: Update .gitignore
Ensure these are in `.gitignore`:
```
# Environment
.env
.env.local
.env.*.local

# Sentry
.sentryclirc

# IDE
.idea/
.vscode/

# Build
.next/
out/
build/

# Dependencies
node_modules/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
```

### Step 4: Push to GitHub
```bash
# Add your remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 5: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Step 6: Configure GitHub Pages (Alternative)
```bash
# Add to package.json scripts
"export": "next build && next export"

# Build static export
npm run export

# Push to gh-pages branch
git add out -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

---

## 📊 Performance Optimizations Applied

1. **Image Optimization**: Next.js Image component with priority loading
2. **Font Optimization**: Google Fonts with `display: swap`
3. **Code Splitting**: Dynamic imports for heavy components
4. **Animation Performance**: 
   - `will-change` hints for animations
   - GPU-accelerated transforms
   - Pause animations when not visible
5. **Bundle Size**: Tree-shaking with modern bundler
6. **Caching**: Static generation where possible

---

## 🎨 Customization Guide

### Update Personal Information
1. Edit `/content/portfolio.md` for bio, contact info
2. Update social links in components
3. Replace `/public/profile-placeholder.svg` with your photo

### Add New Projects
1. Create new markdown file in `/content/projects/`
2. Add project image to `/public/projects/`
3. Follow existing frontmatter structure

### Modify Theme Colors
1. Edit `/src/styles/design-system.css`
2. Update CSS custom properties for both light/dark themes

### Change Typography
1. Edit font imports in `/src/app/layout.tsx`
2. Update font family references in design-system.css

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Sentry for Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sanity.io](https://www.sanity.io/)
- [Resend Email](https://resend.com/)

---

*Documentation generated for Portfolio v0.1.0*
*Last updated: February 2026*
