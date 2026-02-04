'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

/**
 * Experience Card Component
 * Editorial-style card with minimal borders and typography focus
 */
export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const startDate = parseISO(experience.startDate);
  const endDate = experience.endDate ? parseISO(experience.endDate) : null;
  
  const formattedStart = format(startDate, 'MMM yyyy');
  const formattedEnd = endDate ? format(endDate, 'MMM yyyy') : 'Present';
  
  // Check if start and end are in the same month/year
  const isSameMonth = endDate && 
    startDate.getMonth() === endDate.getMonth() && 
    startDate.getFullYear() === endDate.getFullYear();
  
  const duration = isSameMonth ? formattedStart : `${formattedStart} - ${formattedEnd}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      {/* Content */}
      <div className="space-y-4">
        {/* Role & Company */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {experience.role}
          </h3>
          <p className="mt-1 text-lg font-medium text-slate-700 dark:text-slate-300">
            {experience.company}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {experience.location}
          </span>
          {experience.current && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Current
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {experience.description}
        </p>

        {/* Responsibilities */}
        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Key Responsibilities
            </h4>
            <ul className="space-y-2 text-base text-slate-600 dark:text-slate-400">
              {experience.responsibilities.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Achievements
            </h4>
            <ul className="space-y-2 text-base text-slate-600 dark:text-slate-400">
              {experience.achievements.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="pt-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {experience.technologies.join(' • ')}
            </p>
          </div>
        )}
      </div>

      {/* Bottom divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
    </motion.article>
  );
}