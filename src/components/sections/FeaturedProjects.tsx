'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Project } from '@/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

/**
 * Featured Projects Section
 * Displays a grid of featured projects with animations
 */
export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 md:py-32">
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A selection of my recent work and side projects
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card hover className="h-full">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="primary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" size="sm">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex w-full gap-2">
                    <Link href={`/projects/${project.slug}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                      >
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="ghost" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
