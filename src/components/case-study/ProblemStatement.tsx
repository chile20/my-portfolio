'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CaseStudy } from '@/types';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ProblemStatementProps {
  caseStudy: CaseStudy;
}

export function ProblemStatement({ caseStudy }: ProblemStatementProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-18">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            The Challenge & Solution
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Key Issues (Problem Statement) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Key Issues
              </h3>
            </div>

            {/* Issues List */}
            <ul className="space-y-6" role="list">
              {caseStudy.problemStatement.map((issue, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-base leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <span 
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500 dark:bg-red-400"
                    aria-hidden="true"
                  />
                  <span>{issue.trim()}</span>
                </li>
              ))}
            </ul>

            {/* Subtle bottom border */}
            <div className="mt-8 h-px bg-gradient-to-r from-red-200 via-red-100 to-transparent dark:from-red-900/50 dark:via-red-900/20 dark:to-transparent" />
          </motion.div>

          {/* Strategic Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Solutions
              </h3>
            </div>

            {/* Solutions List */}
            <ul className="space-y-6" role="list">
              {caseStudy.solutions.map((solution, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-base leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <span 
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{solution.trim()}</span>
                </li>
              ))}
            </ul>

            {/* Subtle bottom border */}
            <div className="mt-8 h-px bg-gradient-to-r from-emerald-200 via-emerald-100 to-transparent dark:from-emerald-900/50 dark:via-emerald-900/20 dark:to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}