'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Search, Palette, Code, TestTube, Rocket } from 'lucide-react';

interface ProcessTimelineProps {
  tools: string[];
}

const processSteps = [
  {
    icon: Search,
    title: 'Research & Discovery',
    description: 'User interviews, competitive analysis, and stakeholder workshops to understand needs',
    color: 'blue',
  },
  {
    icon: Lightbulb,
    title: 'Ideation & Strategy',
    description: 'Brainstorming sessions, user personas, and information architecture planning',
    color: 'violet',
  },
  {
    icon: Palette,
    title: 'Design & Prototyping',
    description: 'Wireframes, high-fidelity mockups, and interactive prototypes for validation',
    color: 'pink',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Building the solution with clean, maintainable code and modern frameworks',
    color: 'emerald',
  },
  {
    icon: TestTube,
    title: 'Testing & Iteration',
    description: 'User testing, QA, accessibility audits, and performance optimization',
    color: 'amber',
  },
  {
    icon: Rocket,
    title: 'Launch & Monitor',
    description: 'Deployment, analytics setup, and continuous monitoring for improvements',
    color: 'cyan',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    icon: 'text-blue-600 dark:text-blue-400',
    line: 'bg-blue-500',
  },
  violet: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    icon: 'text-violet-600 dark:text-violet-400',
    line: 'bg-violet-500',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    icon: 'text-pink-600 dark:text-pink-400',
    line: 'bg-pink-500',
  },
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    line: 'bg-emerald-500',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    icon: 'text-amber-600 dark:text-amber-400',
    line: 'bg-amber-500',
  },
  cyan: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    icon: 'text-cyan-600 dark:text-cyan-400',
    line: 'bg-cyan-500',
  },
};

export function ProcessTimeline({ tools }: ProcessTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            My Process
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A systematic approach to delivering exceptional results
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500 md:block" />

          <div className="space-y-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const colors = colorClasses[step.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl ${colors.bg} shadow-lg`}
                    >
                      <Icon className={`h-8 w-8 ${colors.icon}`} />
                    </div>

                    {/* Connecting line - only show if not last item */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-1/2 top-16 h-12 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-800 md:hidden" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Step {index + 1}
                        </span>
                        <div className={`h-1.5 w-1.5 rounded-full ${colors.line}`} />
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>

                      {/* Hover gradient */}
                      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 transition-opacity group-hover:opacity-100 dark:from-slate-800 dark:to-slate-900" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
