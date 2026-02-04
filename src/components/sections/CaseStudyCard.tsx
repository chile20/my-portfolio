'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

/**
 * Case Study Card Component
 * Editorial-style card with minimal borders and typography focus
 */
export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm"
        aria-label={`View case study: ${caseStudy.title}`}
      >
        {/* Hero Image */}
        <div className="relative mb-6 aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-slate-900">
          {caseStudy.heroImage ? (
            <>
              <Image
                src={caseStudy.heroImage}
                alt={`${caseStudy.title} project preview`}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={85}
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" aria-hidden="true" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm">No image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Category */}
          <div className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {caseStudy.type.replace('_', ' / ')}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-slate-600 dark:text-white dark:group-hover:text-slate-300">
            {caseStudy.title}
          </h3>

          {/* Client & Duration */}
          {/* <p className="text-base text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-900 dark:text-slate-300">{caseStudy.client}</span>
            {' • '}
            {caseStudy.duration}
          </p> */}

          {/* Problem Statement */}
          {/* <p className="line-clamp-2 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {caseStudy.problemStatement}
          </p> */}

          {/* Tools - Clean text list */}
          {caseStudy.tools && caseStudy.tools.length > 0 && (
            <div className="pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {caseStudy.tools.slice(0, 4).join(' • ')}
                {caseStudy.tools.length > 4 && ` • +${caseStudy.tools.length - 4} more`}
              </p>
            </div>
          )}

          {/* Read More Link */}
          <div className="flex items-center gap-2 pt-2 text-sm font-medium text-slate-900 dark:text-white">
            <span className="transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
              View Case Study
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Link>

      {/* Bottom divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
    </motion.article>
  );
}