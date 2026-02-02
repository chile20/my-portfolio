'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CaseStudy } from '@/types';
import { CheckCircle2 } from 'lucide-react';

interface SolutionSectionProps {
  caseStudy: CaseStudy;
}

export function SolutionSection({ caseStudy }: SolutionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Solution & Implementation
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            How we brought the vision to life
          </p>
        </motion.div>

        {/* Solution description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 mx-auto max-w-3xl"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {caseStudy.solutions}
            </p>
          </div>
        </motion.div>

        {/* Key deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 lg:p-12"
        >
          <h3 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
            Key Deliverables
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <p className="text-base text-slate-700 dark:text-slate-300">{result}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
