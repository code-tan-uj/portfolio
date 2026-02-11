# 🚀 Complete Setup Walkthrough

Follow these steps in order to get your portfolio fully set up.

---

## ✅ Step 1: GitHub - COMPLETE
Your code is at: https://github.com/code-tan-uj/portfolio

---

## Step 2: Deploy to Vercel (5 minutes)

### Option A: Via Vercel Dashboard (Recommended)
1. Go to **https://vercel.com**
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose **code-tan-uj/portfolio**
5. Click **"Deploy"** (leave settings as default)
6. Wait for deployment (~2 minutes)
7. You'll get a URL like: `portfolio-xxx.vercel.app`

### Option B: Via CLI
```bash
cd /Users/tanujsansare/BYTE_24_Complete/Content_AI_POD/github-repos/gemini_cli_test/portfolio
npx vercel
# Follow prompts, select defaults
```

---

## Step 3: Set Up Supabase Database (10 minutes)

### 3.1 Create Account & Project
1. Go to **https://supabase.com**
2. Click **"Start your project"** → Sign up with GitHub
3. Click **"New Project"**
4. Enter:
   - **Name:** portfolio-db
   - **Database Password:** (save this!)
   - **Region:** Choose closest to you
5. Click **"Create new project"** (wait ~2 minutes)

### 3.2 Create Tables
1. Go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Paste this SQL and click **"Run"**:

```sql
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

-- Service role policies
CREATE POLICY "Service role full access to contacts" ON contact_submissions
  FOR ALL USING (true);

CREATE POLICY "Service role full access to rate_limits" ON rate_limits
  FOR ALL USING (true);
```

### 3.3 Get API Keys
1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** (browser-safe) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Secret key** (backend-only, click to reveal) → `SUPABASE_SERVICE_ROLE_KEY`

**Note:** If you see "anon" and "service_role" keys, those are legacy names that still work. The mapping is:
- `anon` key → `Publishable` key (same key, new name)
- `service_role` key → `Secret` key (same key, new name)

---

## Step 4: Set Up Hygraph CMS (15 minutes)

### 4.1 Create Account & Project
1. Go to **https://hygraph.com**
2. Click **"Start Building"** → Sign up with GitHub
3. Click **"Create New Project"**
4. Select **"Blank"** template
5. Enter:
   - **Name:** Portfolio CMS
   - **Region:** Choose closest
6. Click **"Create Project"**

### 4.2 Create Enumerations First

Before creating models, you need to create Enumerations:

1. Go to **Schema** → **Enumerations** (left sidebar)
2. Click **"Add Enumeration"**
3. Create these three enumerations:

**ProjectCategory:**
- Name: `ProjectCategory`, API ID: `ProjectCategory`
- Values: `web`, `mobile`, `design`, `opensource`

**SkillCategory:**
- Name: `SkillCategory`, API ID: `SkillCategory`
- Values: `frontend`, `backend`, `database`, `tools`, `design`

**ExperienceType:**
- Name: `ExperienceType`, API ID: `ExperienceType`
- Values: `work`, `education`

### 4.3 Create Content Models

#### Model 1: Portfolio (Profile)
1. Go to **Schema** → **Models** (left sidebar)
2. Click **"Add"** → **"Model"**
3. Enter:
   - **Display Name:** Portfolio
   - **API ID:** Portfolio
4. Add these fields (click "Add Field"):

| Field | Type | API ID | Required |
|-------|------|--------|----------|
| Name | Single line text | name | ✅ |
| Title | Single line text | title | ✅ |
| Tagline | Single line text | tagline | ✅ |
| Bio | Multi line text | bio | ✅ |
| Email | Single line text | email | ✅ |
| GitHub | Single line text | github | |
| LinkedIn | Single line text | linkedin | |
| Twitter | Single line text | twitter | |
| Avatar | Asset picker | avatar | |

#### Model 2: Project
1. Click **"Add"** → **"Model"**
2. Enter:
   - **Display Name:** Project
   - **API ID:** Project
3. Click "Add field" and add these fields:

| Field | Hygraph Field Type | API ID | Configuration |
|-------|-------------------|--------|---------------|
| Slug | **Slug** | slug | ✅ Required, ✅ Unique |
| Title | **Single line text** | title | ✅ Required |
| Description | **Multi line text** | description | ✅ Required |
| Long Description | **Multi line text** | longDescription | (Optional) |
| Image | **Asset picker** | image | (Optional) |
| Technologies | **Single line text** | technologies | ✅ Allow multiple values |
| Category | **Enumeration** | category | Select "ProjectCategory", ✅ Required |
| Featured | **Boolean** | featured | Default: false |
| Live URL | **Single line text** | liveUrl | (Optional) |
| GitHub URL | **Single line text** | githubUrl | (Optional) |
| Highlights | **Multi line text** | highlights | ✅ Allow multiple values |
| Year | **Integer** | year | ✅ Required |

**Note:** When adding "Category" field, select **Enumeration** type, then choose "ProjectCategory" from dropdown.

#### Model 3: Skill
1. Click **"Add"** → **"Model"**
2. Enter: **Skill** / **Skill**
3. Add fields:

| Field | Hygraph Field Type | API ID | Configuration |
|-------|-------------------|--------|---------------|
| Name | **Single line text** | name | ✅ Required |
| Category | **Enumeration** | category | Select "SkillCategory", ✅ Required |
| Level | **Integer** | level | ✅ Required (0-100) |
| Icon | **Single line text** | icon | ✅ Required |

#### Model 4: Experience
1. Click **"Add"** → **"Model"**
2. Enter: **Experience** / **Experience**
3. Add fields:

| Field | Hygraph Field Type | API ID | Configuration |
|-------|-------------------|--------|---------------|
| Role | **Single line text** | role | ✅ Required |
| Company | **Single line text** | company | ✅ Required |
| Location | **Single line text** | location | (Optional) |
| Period | **Single line text** | period | ✅ Required |
| Type | **Enumeration** | type | Select "ExperienceType", ✅ Required |
| Description | **Multi line text** | description | ✅ Required |
| Achievements | **Multi line text** | achievements | ✅ Allow multiple values |
| Technologies | **Single line text** | technologies | ✅ Allow multiple values |

### 4.4 Get API Endpoint
1. Go to **Settings** → **API Access**
2. Under **Content API**, copy the endpoint → `HYGRAPH_ENDPOINT`
3. Under **Permanent Auth Tokens**, click **"Create token"**
   - Name: Portfolio Read
   - Permissions: Content: Read (expand each model and check Read)
4. Copy the token → `HYGRAPH_TOKEN`

### 4.5 Add Your Content
1. Go to **Content** (left sidebar)
2. Click on **Portfolio** → **Create entry**
3. Fill in your profile information
4. Click **"Save and Publish"**
5. Repeat for Projects, Skills, Experience

---

## Step 5: Set Up Resend Email (5 minutes)

### 5.1 Create Account
1. Go to **https://resend.com**
2. Click **"Get Started"** → Sign up with GitHub

### 5.2 Get API Key
1. Go to **API Keys** (left sidebar)
2. Click **"Create API Key"**
3. Name: Portfolio Contact
4. Permission: Sending access
5. Copy the key → `RESEND_API_KEY`

### 5.3 (Optional) Add Domain
For production, add your domain:
1. Go to **Domains** → **Add Domain**
2. Add your domain and verify DNS

For testing, use: `onboarding@resend.dev` as from address

---

## Step 6: Set Up Sentry Monitoring (5 minutes)

### 6.1 Create Account
1. Go to **https://sentry.io**
2. Click **"Get Started Free"** → Sign up with GitHub

### 6.2 Create Project
1. Click **"Create Project"**
2. Platform: **Next.js**
3. Name: portfolio
4. Click **"Create Project"**

### 6.3 Get DSN
1. Go to **Settings** → **Projects** → **portfolio**
2. Go to **Client Keys (DSN)**
3. Copy the DSN → `NEXT_PUBLIC_SENTRY_DSN`

---

## Step 7: Add Environment Variables to Vercel

1. Go to **https://vercel.com/dashboard**
2. Click on your **portfolio** project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | (from Supabase) | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase) | All |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase) | All |
| `HYGRAPH_ENDPOINT` | (from Hygraph) | All |
| `HYGRAPH_TOKEN` | (from Hygraph) | All |
| `RESEND_API_KEY` | (from Resend) | All |
| `NOTIFICATION_EMAIL` | your@email.com | All |
| `NEXT_PUBLIC_SENTRY_DSN` | (from Sentry) | All |
| `NEXT_PUBLIC_SITE_URL` | https://your-site.vercel.app | All |

5. Click **"Save"** for each
6. Go to **Deployments** → Click **"..."** on latest → **"Redeploy"**

---

## Step 8: Update Local .env.local

After setting up all services, update your local `.env.local` with the same values for development.

---

## Step 9: Test Everything

1. **Website**: Visit your Vercel URL
2. **Contact Form**: Submit a test message
3. **Supabase**: Check `contact_submissions` table for the message
4. **Email**: Check if you received the notification
5. **Sentry**: Check for any errors in dashboard
6. **Analytics**: Check `page_views` table in Supabase

---

## 🎉 You're Done!

Your portfolio is now:
- ✅ Hosted on Vercel (free)
- ✅ Content managed via Hygraph CMS (free)
- ✅ Contact form with Supabase database (free)
- ✅ Email notifications via Resend (free)
- ✅ Error monitoring via Sentry (free)
- ✅ Custom analytics via Supabase (free)

**Total monthly cost: $0**

---

## Updating Content via CMS

To update your portfolio content:

1. Go to **https://app.hygraph.com**
2. Select your project
3. Go to **Content**
4. Edit any entry (Portfolio, Projects, Skills, Experience)
5. Click **"Save and Publish"**
6. Changes appear on your site within 1 hour (ISR cache)

To see changes immediately:
- Go to Vercel → Deployments → Redeploy

---

## Need Help?

- **Hygraph Docs**: https://hygraph.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Sentry Docs**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Vercel Docs**: https://vercel.com/docs
