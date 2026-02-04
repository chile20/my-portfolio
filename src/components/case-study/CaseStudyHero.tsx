'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
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
    <section className="border-b border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column - Span 7 for more text room */}
          <motion.div {...fadeIn} className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <div className="flex gap-3">
                {caseStudy.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                {caseStudy.title}
              </h1>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3">
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
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-200">{caseStudy.role}</dd>
              </div>
            </div>

            {/* Tools */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-900">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Tools</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm italic text-slate-600 dark:text-slate-400">
                {caseStudy.tools.map((tool, i) => (
                  <span key={tool}>{tool}{i !== caseStudy.tools.length - 1 && ","}</span>
                ))}
              </div>
            </div>

            {/* Download Links & Live Site */}
            {(caseStudy.appStoreUrl || caseStudy.googlePlayUrl || caseStudy.liveSiteUrl) && (
              <div className="border-t border-slate-100 pt-4 dark:border-slate-900">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Available On</p>
                <div className="flex flex-wrap gap-4">
                  {caseStudy.appStoreUrl && (
                    <a
                      href={caseStudy.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-900 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 dark:text-slate-100 dark:hover:text-slate-300"
                      aria-label="Download on the App Store"
                    >
                      <Smartphone className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">App Store</span>
                    </a>
                  )}
                  {caseStudy.googlePlayUrl && (
                    <a
                      href={caseStudy.googlePlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-900 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 dark:text-slate-100 dark:hover:text-slate-300"
                      aria-label="Get it on Google Play"
                    >
                      <Smartphone className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">Google Play</span>
                    </a>
                  )}
                  {caseStudy.liveSiteUrl && (
                    <a
                      href={caseStudy.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-900 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 dark:text-slate-100 dark:hover:text-slate-300"
                      aria-label="Visit live site"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">Visit Site</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Span 5 - Image */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-xl bg-slate-50 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
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