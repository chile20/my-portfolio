'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Search } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import projectsData from '@/content/data/projects.json';
import { Project } from '@/types';

const projects = projectsData as Project[];

type TypeFilter = 'all' | 'WEB_APP' | 'MOBILE_APP' | 'API' | 'LIBRARY' | 'TOOL';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<TypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.type === filter;
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filters: Array<{ value: TypeFilter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'WEB_APP', label: 'Web Apps' },
    { value: 'MOBILE_APP', label: 'Mobile Apps' },
    { value: 'API', label: 'APIs' },
    { value: 'LIBRARY', label: 'Libraries' },
    { value: 'TOOL', label: 'Tools' },
  ];

  return (
    <div className="py-20">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A showcase of my development work and side projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(({ value, label }) => (
              <Button
                key={value}
                variant={filter === value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    {project.featured && <Badge variant="warning">Featured</Badge>}
                    <Badge variant="primary">{project.type.replace('_', ' ')}</Badge>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" size="sm">
                        +{project.technologies.length - 5}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex w-full gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                        className="flex-1"
                      >
                        <Button variant="primary" size="sm" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
