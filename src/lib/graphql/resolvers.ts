/**
 * GraphQL Resolvers
 * Implements query logic for fetching content data
 */

import profileData from '@/content/data/profile.json';
import experiencesData from '@/content/data/experiences.json';
import skillsData from '@/content/data/skills.json';
import projectsData from '@/content/data/projects.json';

export const resolvers = {
  Query: {
    profile: () => profileData,

    experiences: (_: unknown, args: { type?: string }) => {
      if (args.type) {
        return experiencesData.filter((exp) => exp.type === args.type);
      }
      return experiencesData;
    },

    experience: (_: unknown, args: { id: string }) => {
      return experiencesData.find((exp) => exp.id === args.id);
    },

    skills: (_: unknown, args: { category?: string }) => {
      if (args.category) {
        return skillsData.filter((skill) => skill.category === args.category);
      }
      return skillsData;
    },

    skill: (_: unknown, args: { id: string }) => {
      return skillsData.find((skill) => skill.id === args.id);
    },

    projects: (_: unknown, args: { type?: string; featured?: boolean }) => {
      let filtered = projectsData;

      if (args.type) {
        filtered = filtered.filter((project) => project.type === args.type);
      }

      if (args.featured !== undefined) {
        filtered = filtered.filter((project) => project.featured === args.featured);
      }

      return filtered.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },

    project: (_: unknown, args: { slug: string }) => {
      return projectsData.find((project) => project.slug === args.slug);
    },

    caseStudies: () => {
      // Placeholder - will be implemented with actual case study data
      return [];
    },

    caseStudy: () => {
      return null;
    },

    tags: () => {
      // Extract unique tags from all content
      const allTags = new Set<string>();

      projectsData.forEach((project) => {
        project.tags.forEach((tag) => allTags.add(tag));
      });

      return Array.from(allTags).map((tag, index) => ({
        id: String(index + 1),
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
        count: projectsData.filter((p) => p.tags.includes(tag)).length,
      }));
    },
  },
};
