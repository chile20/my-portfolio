'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Experience } from '@/types';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

/**
 * Timeline Item Component
 * Individual experience entry in the career timeline
 */
export function TimelineItem({ experience, index }: TimelineItemProps) {
  const startDate = format(parseISO(experience.startDate), 'MMM yyyy');
  const endDate = experience.endDate ? format(parseISO(experience.endDate), 'MMM yyyy') : 'Present';
  const duration = `${startDate} - ${endDate}`;

  const typeColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning'> = {
    WORK: 'primary',
    COMMUNITY: 'secondary',
    EDUCATION: 'warning',
    RESEARCH: 'success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-slate-200 dark:bg-slate-700 md:block md:left-1/2 md:-translate-x-1/2" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-8 hidden h-4 w-4 rounded-full border-4 border-blue-600 bg-white dark:border-blue-400 dark:bg-slate-900 md:block md:left-1/2 md:-translate-x-1/2" />

      <div className={`mb-8 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <Card hover>
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant={typeColors[experience.type]}>
                {experience.type.replace('_', ' ')}
              </Badge>
              {experience.current && <Badge variant="success">Current</Badge>}
            </div>

            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              {experience.role}
            </CardTitle>

            <div className="mt-2 space-y-1">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {experience.company}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {experience.location}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-slate-600 dark:text-slate-400">{experience.description}</p>

            {/* Responsibilities */}
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Key Responsibilities:
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  {experience.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Achievements:
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  {experience.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
