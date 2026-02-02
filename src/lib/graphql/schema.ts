/**
 * GraphQL Schema Definition
 * Defines all types, queries, and mutations for the portfolio API
 */

export const typeDefs = /* GraphQL */ `
  type Query {
    profile: Profile!
    experiences(type: ExperienceType): [Experience!]!
    experience(id: ID!): Experience
    skills(category: SkillCategory): [Skill!]!
    skill(id: ID!): Skill
    caseStudies(type: CaseStudyType, featured: Boolean): [CaseStudy!]!
    caseStudy(slug: String!): CaseStudy
    projects(type: ProjectType, featured: Boolean): [Project!]!
    project(slug: String!): Project
    tags: [Tag!]!
  }

  type Profile {
    id: ID!
    name: String!
    title: String!
    bio: String!
    avatar: String!
    location: String!
    email: String!
    phone: String
    website: String!
    socialLinks: [SocialLink!]!
  }

  type SocialLink {
    platform: String!
    url: String!
    icon: String!
  }

  type Experience {
    id: ID!
    company: String!
    role: String!
    type: ExperienceType!
    startDate: String!
    endDate: String
    current: Boolean!
    description: String!
    responsibilities: [String!]!
    achievements: [String!]!
    technologies: [String!]!
    logo: String
    location: String!
  }

  enum ExperienceType {
    WORK
    VOLUNTEER
    
  }

  type Skill {
    id: ID!
    name: String!
    category: SkillCategory!
    proficiency: Int!
    yearsOfExperience: Int!
    icon: String
    projectCount: Int
  }

  enum SkillCategory {
    FRONTEND
    BACKEND
    TOOLS
    SOFT_SKILLS
    DESIGN
  }

  type CaseStudy {
    id: ID!
    slug: String!
    title: String!
    client: String!
    duration: String!
    type: CaseStudyType!
    heroImage: String!
    images: [String!]!
    problemStatement: String!
    solution: String!
    tools: [String!]!
    results: [String!]!
    metrics: [Metric!]
    content: String!
    tags: [String!]!
    featured: Boolean!
    publishedAt: String!
  }

  enum CaseStudyType {
    UI_UX
    BRANDING
    RESEARCH
    WEB_DESIGN
  }

  type Project {
    id: ID!
    slug: String!
    title: String!
    description: String!
    longDescription: String!
    type: ProjectType!
    image: String!
    images: [String!]!
    demoUrl: String
    githubUrl: String
    technologies: [String!]!
    features: [String!]!
    challenges: [String!]!
    solutions: [String!]!
    metrics: [Metric!]
    tags: [String!]!
    featured: Boolean!
    publishedAt: String!
  }

  enum ProjectType {
    WEB_APP
    MOBILE_APP
    API
    LIBRARY
    TOOL
  }

  type Author {
    name: String!
    avatar: String!
  }

  type Tag {
    id: ID!
    name: String!
    slug: String!
    count: Int!
  }

  type Metric {
    label: String!
    value: String!
    description: String
  }
`;
