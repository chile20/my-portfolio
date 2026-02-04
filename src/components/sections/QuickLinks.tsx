'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  FolderKanban,
  Code2,
  Palette,
  FileText,
  ArrowRight,
  HandHeart,
  Hand
} from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

interface QuickLink {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const quickLinks: QuickLink[] = [
  {
    title: 'Work History',
    description: 'Professional experience & roles',
    href: '/experience#work',
    icon: Briefcase,
  },
  {
    title: 'Education',
    description: 'Academic background & research',
    href: '/experience#education',
    icon: GraduationCap,
  },
    {
    title: 'Volunteer',
    description: 'Community involvement & contributions',
    href: '/experience#volunteer',
    icon: HandHeart,
  },
  {
    title: 'Case Studies',
    description: 'Featured project deep-dives',
    href: '/projects#featured',
    icon: FolderKanban,
  },
  {
    title: 'Code Projects',
    description: 'Development work & experiments',
    href: '/projects#snippets',
    icon: Code2,
  },
  {
    title: 'Design Work',
    description: 'UI/UX design portfolio',
    href: '/projects#gallery',
    icon: Palette,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  },
};

/**
 * Quick Links Section Component
 * Displays navigation links to key portfolio sections
 */
export function QuickLinks() {
  return (
    <section className="relative py-8">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Explore My Work
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Quick navigation to key sections
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.article key={link.href} variants={itemVariants} className="group">
                <Link
                  href={link.href}
                  className="block focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm"
                  aria-label={`${link.title}: ${link.description}`}
                >
                  <div className="space-y-3">
                    {/* Icon */}
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-white"
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-600 dark:text-white dark:group-hover:text-slate-300">
                        {link.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {link.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                      <span className="transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
                        View
                      </span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>

                {/* Divider */}
                <div className="mt-6 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}