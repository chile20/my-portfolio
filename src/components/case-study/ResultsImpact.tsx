'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CaseStudy } from '@/types';

interface ResultsImpactProps {
  caseStudy: CaseStudy;
}

/**
 * Editorial Results & Impact Section
 * Design Style: Typography-first, minimal dividers, large-scale data points.
 */
export function ResultsImpact({ caseStudy }: ResultsImpactProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeIn = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
  };

  return (
    <section 
      ref={ref} 
      className="py-16"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Header */}
        <motion.header
          {...fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 id="results-heading" className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Impact & Results
          </h2>
        </motion.header>

        {/* Big Metrics Grid: Clean Typography */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="mb-32">
            
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudy.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  {...fadeIn}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  className="group"
                >
                  <div className="mb-3 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {metric.label}
                  </div>
                  <div className="mb-4 text-5xl font-bold tracking-tighter text-slate-900 dark:text-white lg:text-6xl">
                    {metric.value}
                  </div>
                  {metric.description && (
                    <p className="max-w-xs text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {metric.description}
                    </p>
                  )}
                  {/* Subtle bottom line */}
                  <div className="mt-6 h-px w-16 bg-gradient-to-r from-slate-900 to-transparent dark:from-slate-100" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements: Clean List */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div 
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Key Achievements
            </h3>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Outcomes and improvements delivered through strategic execution
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <ul className="space-y-8" role="list">
              {caseStudy.results.map((result, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-6 group"
                >
                  <span 
                    className="mt-2 text-xs font-mono text-slate-300 dark:text-slate-700"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="flex-1 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {result.trim()}
                  </p>
                </li>
              ))}
            </ul>

            {/* Subtle divider at bottom */}
            <div className="mt-12 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}