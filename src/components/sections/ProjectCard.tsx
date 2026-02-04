'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Project Card Component
 * Editorial-style card with minimal borders and typography focus
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      {/* Content */}
      <div className="space-y-4">
        {/* Category */}
        <div className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {project.type.replace('-', ' ')}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {/* Technologies - Clean text list */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="pt-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {project.technologies.slice(0, 5).join(' • ')}
              {project.technologies.length > 5 && ` • +${project.technologies.length - 5} more`}
            </p>
          </div>
        )}

        {/* Project Links */}
        <nav className="flex items-center gap-6 pt-2" aria-label={`Links for ${project.title}`}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-600 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-white dark:hover:text-slate-300 dark:active:text-slate-100"
            >
              <span>View Demo</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-600 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-white dark:hover:text-slate-300 dark:active:text-slate-100"
            >
              <span>GitHub</span>
              <Github className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
            </a>
          )}
        </nav>
      </div>

      {/* Bottom divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
    </motion.article>
  );
}