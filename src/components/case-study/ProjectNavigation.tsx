'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react';
import { CaseStudy } from '@/types';

interface ProjectNavigationProps {
  previous: CaseStudy | null;
  next: CaseStudy | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950/50"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Back to all case studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Link
            href="/design"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
          >
            <Grid3x3 className="h-5 w-5" />
            View All Case Studies
          </Link>
        </motion.div>

        {/* Previous / Next Navigation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Previous Project */}
          {previous ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href={`/case-studies/${previous.slug}`}
                className="group relative block h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-full flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={previous.heroImage}
                      alt={previous.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-slate-900/0" />

                    {/* Arrow badge */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm dark:bg-slate-900/90">
                      <ArrowLeft className="h-5 w-5 text-slate-900 dark:text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Previous Project
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {previous.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {previous.problemStatement}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : (
            <div className="hidden lg:block" />
          )}

          {/* Next Project */}
          {next ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={`/case-studies/${next.slug}`}
                className="group relative block h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-full flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={next.heroImage}
                      alt={next.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-slate-900/0" />

                    {/* Arrow badge */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm dark:bg-slate-900/90">
                      <ArrowRight className="h-5 w-5 text-slate-900 dark:text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Next Project
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {next.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {next.problemStatement}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>
      </div>
    </section>
  );
}
