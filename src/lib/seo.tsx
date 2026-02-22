/**
 * SEO Utilities
 * 
 * Provides SEO helpers including:
 * - Structured data (JSON-LD)
 * - Meta tag generation
 * - Open Graph & Twitter cards
 */

import type { Metadata } from 'next';

// ============================================
// Configuration
// ============================================

export const siteConfig = {
  name: 'Portfolio',
  title: 'Full-Stack AI Engineer Portfolio',
  description: 'A modern portfolio showcasing web development projects and skills.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
  ogImage: '/og-image.png',
  creator: 'Tanuj Sansare',
  keywords: [
    'web developer',
    'full-stack developer',
    'react developer',
    'next.js developer',
    'portfolio',
    'frontend developer',
    'backend developer',
    'AI Engineer',
    'ML engineer',
    'Generative AI Specialist',
    'Machine Learning Engineer',
    'Python Developer',
    'Data Scientist',
  ],
  links: {
    github: "https://github.com/code-tan-uj",
    linkedin: "https://www.linkedin.com/in/tps2000",
    twitter: "https://x.com/Tanuj0181",
  },
};


// ============================================
// Metadata Generator
// ============================================

interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageUrl = canonical || siteConfig.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    
    // Robots
    robots: noIndex 
      ? { index: false, follow: false } 
      : { index: true, follow: true },
    
    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@Tanuj0181',
    },
    
    // Canonical
    alternates: {
      canonical: canonical,
    },
    
    // Icons
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    
    // Verification (add your codes)
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// ============================================
// JSON-LD Structured Data
// ============================================

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.creator,
    url: siteConfig.url,
    jobTitle: 'Full-Stack Developer',
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'JavaScript',
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.creator,
    },
  };
}

interface ProjectJsonLdOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  technologies?: string[];
}

export function generateProjectJsonLd({
  title,
  description,
  url,
  image,
  technologies = [],
}: ProjectJsonLdOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    url: url,
    image: image,
    applicationCategory: 'WebApplication',
    author: {
      '@type': 'Person',
      name: siteConfig.creator,
    },
    keywords: technologies.join(', '),
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// JSON-LD Script Component
// ============================================

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
