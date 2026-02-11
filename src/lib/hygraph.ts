/**
 * Hygraph (GraphCMS) Client
 * 
 * Setup Instructions:
 * 1. Go to https://hygraph.com and create a free account
 * 2. Create a new project (select closest region)
 * 3. Get your Content API endpoint from Settings > API Access
 * 4. Create a Permanent Auth Token for public content
 * 5. Add to .env.local:
 *    HYGRAPH_ENDPOINT=your-endpoint
 *    HYGRAPH_TOKEN=your-token (optional for public content)
 */

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || '';
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || '';

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchHygraph<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error('HYGRAPH_ENDPOINT is not configured');
  }

  // Debug: Log the endpoint being used (remove in production)
  console.log('[Hygraph] Using endpoint:', HYGRAPH_ENDPOINT.substring(0, 50) + '...');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (HYGRAPH_TOKEN) {
    headers['Authorization'] = `Bearer ${HYGRAPH_TOKEN}`;
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    // Get more details about the error
    const errorText = await response.text();
    console.error('[Hygraph] Request failed:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText.substring(0, 500),
    });
    throw new Error(`Hygraph request failed: ${response.status} ${response.statusText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }

  return json.data;
}

// ============================================
// Content Types & Queries
// ============================================

export interface HygraphPortfolio {
  name: string;
  title: string;
  tagline?: string;
  bio?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: { url: string };
}

export interface HygraphProject {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: { url: string };
  technologies: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  year: number;
}

export interface HygraphSkill {
  name: string;
  category: string;
  level: number; // 0-100
  icon: string;
}

export interface HygraphExperience {
  role: string;
  company: string;
  location?: string;
  period: string;
  type: 'work' | 'education';
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

// ============================================
// Data Fetching Functions
// ============================================

/**
 * Fetches portfolio data from Hygraph.
 * 
 * IMPORTANT: Update this query to match your actual Hygraph schema!
 * Only include fields that you have created in your Portfolio model.
 * 
 * To see your schema, go to Hygraph > Schema > Portfolio model
 */
export async function getPortfolio(): Promise<HygraphPortfolio | null> {
  try {
    // Query matches your actual Hygraph Portfolio model fields
    // Note: Hygraph field names are case-sensitive!
    const data = await fetchHygraph<{ portfolios: Array<{
      name: string;
      title: string;
      tagline?: string;
      bio?: string;
      email?: string;
      gitHub?: string;     // Note: capital H
      linkedIn?: string;   // Note: capital I  
      twitter?: string;
      avatar?: { url: string };
    }> }>(`
      query GetPortfolio {
        portfolios(first: 1, stage: PUBLISHED) {
          name
          title
          tagline
          bio
          email
          gitHub
          linkedIn
          twitter
          avatar {
            url
          }
        }
      }
    `);
    
    const portfolio = data.portfolios[0];
    if (!portfolio) return null;
    
    // Map to our interface (normalize field names)
    return {
      name: portfolio.name,
      title: portfolio.title,
      tagline: portfolio.tagline,
      bio: portfolio.bio,
      email: portfolio.email,
      github: portfolio.gitHub || '',
      linkedin: portfolio.linkedIn || '',
      twitter: portfolio.twitter || '',
      avatar: portfolio.avatar,
    };
  } catch (error) {
    console.error('Failed to fetch portfolio from Hygraph:', error);
    return null;
  }
}

export async function getAllProjects(): Promise<HygraphProject[]> {
  try {
    const data = await fetchHygraph<{ projects: HygraphProject[] }>(`
      query GetAllProjects {
        projects(orderBy: year_DESC) {
          slug
          title
          description
          longDescription
          image {
            url
          }
          technologies
          category
          featured
          liveUrl
          githubUrl
          highlights
          year
        }
      }
    `);
    return data.projects;
  } catch (error) {
    console.error('Failed to fetch projects from Hygraph:', error);
    return [];
  }
}

export async function getProject(slug: string): Promise<HygraphProject | null> {
  try {
    const data = await fetchHygraph<{ project: HygraphProject | null }>(`
      query GetProject($slug: String!) {
        project(where: { slug: $slug }) {
          slug
          title
          description
          longDescription
          image {
            url
          }
          technologies
          category
          featured
          liveUrl
          githubUrl
          highlights
          year
        }
      }
    `, { slug });
    return data.project;
  } catch (error) {
    console.error('Failed to fetch project from Hygraph:', error);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<HygraphProject[]> {
  try {
    const data = await fetchHygraph<{ projects: HygraphProject[] }>(`
      query GetFeaturedProjects {
        projects(where: { featured: true }, orderBy: year_DESC, first: 6) {
          slug
          title
          description
          image {
            url
          }
          technologies
          category
          liveUrl
          githubUrl
          year
        }
      }
    `);
    return data.projects;
  } catch (error) {
    console.error('Failed to fetch featured projects from Hygraph:', error);
    return [];
  }
}

export async function getSkills(): Promise<HygraphSkill[]> {
  try {
    const data = await fetchHygraph<{ skills: HygraphSkill[] }>(`
      query GetSkills {
        skills(orderBy: level_DESC) {
          name
          category
          level
          icon
        }
      }
    `);
    return data.skills;
  } catch (error) {
    console.error('Failed to fetch skills from Hygraph:', error);
    return [];
  }
}

export async function getExperiences(): Promise<HygraphExperience[]> {
  try {
    const data = await fetchHygraph<{ experiences: HygraphExperience[] }>(`
      query GetExperiences {
        experiences(orderBy: createdAt_DESC) {
          role
          company
          location
          period
          type
          description
          achievements
          technologies
        }
      }
    `);
    return data.experiences;
  } catch (error) {
    console.error('Failed to fetch experiences from Hygraph:', error);
    return [];
  }
}
