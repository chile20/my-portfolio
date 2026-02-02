'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CaseStudy } from '@/types';

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Span 7 for more text room */}
          <motion.div {...fadeIn} className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                {caseStudy.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {caseStudy.title}
              </h1>
            </div>

            {/* Metadata Grid - Low profile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Client</dt>
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-200">{caseStudy.client}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Timeline</dt>
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-200">{caseStudy.duration}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Role</dt>
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-200">Lead Designer</dd>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-900">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Tools</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400 italic">
                {caseStudy.tools.map((tool, i) => (
                  <span key={tool}>{tool}{i !== caseStudy.tools.length - 1 && ","}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Span 5 - Image Protection */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
          <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}