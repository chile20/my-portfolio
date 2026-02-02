'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

/**
 * Case Study Card Component
 * Displays design case study preview with image, description, and metrics
 */
export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const publishDate = format(parseISO(caseStudy.publishedAt), 'MMM dd, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">Image placeholder</p>
            </div>
          </div>
        </div>

        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            {caseStudy.featured && <Badge variant="warning">Featured</Badge>}
            <Badge variant="primary">{caseStudy.type.replace('_', '/')}</Badge>
          </div>
          <CardTitle>{caseStudy.title}</CardTitle>
          <CardDescription>
            <span className="font-medium">{caseStudy.client}</span> • {caseStudy.duration}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
            {caseStudy.problemStatement}
          </p>

          {/* Tools Used */}
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Tools Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tools.slice(0, 4).map((tool) => (
                <Badge key={tool} variant="outline" size="sm">
                  {tool}
                </Badge>
              ))}
              {caseStudy.tools.length > 4 && (
                <Badge variant="outline" size="sm">
                  +{caseStudy.tools.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {caseStudy.metrics.slice(0, 2).map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20"
                >
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Publish Date */}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            {publishDate}
          </div>
        </CardContent>

        <CardFooter>
          <Link href={`/design/${caseStudy.slug}`} className="w-full">
            <Button variant="outline" size="sm" className="group w-full">
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
