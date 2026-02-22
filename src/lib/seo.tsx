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
  name: 'Tanuj Sansare',
  title: 'Tanuj Sansare | AI Engineer & Full-Stack Developer',
  description: 'AI Engineer specializing in Generative AI, Machine Learning, and scalable full-stack systems. Explore research, production systems, and engineering projects.',
  url: 'https://tanujsansare.cv',
  ogImage: '/og-image.png',
  creator: 'Tanuj Sansare',
  keywords: [
    'Tanuj Sansare',
    'AI Engineer',
    'Machine Learning Engineer',
    'Generative AI Developer',
    'LLM Engineer',
    'Full Stack Developer',
    'Next.js Developer',
    'Python Developer',
    'AI Portfolio',
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
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

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

    // Canonical — uses resolved pageUrl, never undefined
    alternates: {
      canonical: pageUrl,
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
    name: 'Tanuj Sansare',
    url: 'https://tanujsansare.cv',
    jobTitle: 'AI Engineer',
    description: 'AI Engineer specializing in Large Language Models, Generative AI, and scalable ML systems.',
    image: 'https://tanujsansare.cv/profile.jpg',
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    knowsAbout: [
      'Large Language Models',
      'Machine Learning',
      'Generative AI',
      'Next.js',
      'Cloud Architecture',
      'Distributed Systems',
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tanuj Sansare',
    url: 'https://tanujsansare.cv',
    description: 'AI Engineer portfolio featuring scalable AI systems and production ML infrastructure.',
    author: {
      '@type': 'Person',
      name: siteConfig.creator,
    },
  };
}

export function generateFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Tanuj Sansare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tanuj Sansare is an AI Engineer specializing in generative AI, machine learning, and scalable web systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does Tanuj specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'He works with LLMs, Python, Next.js, distributed systems, and cloud-native AI deployments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find Tanuj Sansare online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tanuj Sansare can be found at tanujsansare.cv, on GitHub at github.com/code-tan-uj, and on LinkedIn at linkedin.com/in/tps2000.',
        },
      },
    ],
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
