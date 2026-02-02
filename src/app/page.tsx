import { Hero } from '@/components/sections/Hero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import projectsData from '@/content/data/projects.json';

export default function HomePage() {
  const featuredProjects = projectsData.filter((project) => project.featured);

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
    </>
  );
}
