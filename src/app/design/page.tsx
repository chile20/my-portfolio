'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { CaseStudyCard } from '@/components/sections/CaseStudyCard';
import caseStudiesData from '@/content/data/case-studies.json';
import { CaseStudy } from '@/types';

const caseStudies = caseStudiesData as CaseStudy[];

type TypeFilter = 'all' | 'UI_UX' | 'BRANDING' | 'RESEARCH' | 'WEB_DESIGN';

const typeLabels: Record<TypeFilter, string> = {
  all: 'All Work',
  UI_UX: 'UI/UX Design',
  BRANDING: 'Branding',
  RESEARCH: 'UX Research',
  WEB_DESIGN: 'Web Design',
};

export default function DesignPage() {
  const [filter, setFilter] = useState<TypeFilter>('all');

  const filteredCaseStudies =
    filter === 'all'
      ? caseStudies
      : caseStudies.filter((study) => study.type === filter);

  const filters: TypeFilter[] = ['all', 'UI_UX', 'WEB_DESIGN', 'BRANDING', 'RESEARCH'];

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
            Design Case Studies
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Exploring design challenges and crafting user-centered solutions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filters.map((value) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(value)}
            >
              {typeLabels[value]}
            </Button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {/* No results message */}
        {filteredCaseStudies.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No case studies found for this category.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid gap-8 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-8 dark:from-blue-950/20 dark:to-violet-950/20 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {caseStudies.length}+
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Design Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">
              {caseStudies.filter((cs) => cs.featured).length}
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Featured Work
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
              {new Set(caseStudies.flatMap((cs) => cs.tools)).size}+
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Design Tools
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
