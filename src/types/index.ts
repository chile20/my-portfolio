/**
 * Core TypeScript types and interfaces for the portfolio
 */

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  phone?: string;
  website: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'work' | 'research' | 'education' | 'volunteer';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo?: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft-skills' | 'design';
  proficiency: number; // 1-100
  yearsOfExperience: number;
  icon?: string;
  projectCount?: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  duration: string;
  role: string;
  type: 'UI_UX' | 'WEB_DESIGN' | 'BRANDING' | 'RESEARCH';
  heroImage: string;
  images: string[];
  problemStatement: string;
  solutions: string;
  tools: string[];
  results: string[];
  metrics?: Metric[];
  content: string; // MDX content
  tags: string[];
  featured: boolean;
  publishedAt: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  liveSiteUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'web-app' | 'mobile-app' | 'api' | 'library' | 'tool';
  image: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  metrics?: Metric[];
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating?: number;
  date: string;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  featured?: boolean;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  liveSiteUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// GraphQL query and mutation types
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GraphQLContext {
  // Add context types as needed for GraphQL resolvers
}

export interface PaginationArgs {
  limit?: number;
  offset?: number;
}

export interface FilterArgs {
  tags?: string[];
  type?: string;
  featured?: boolean;
}
