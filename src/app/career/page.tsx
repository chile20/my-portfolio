'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { TimelineItem } from '@/components/sections/TimelineItem';
import experiencesData from '@/content/data/experiences.json';
import { Experience } from '@/types';

const experiences = experiencesData as Experience[];

type FilterType = 'all' | 'WORK' | 'VOLUNTEER' | 'EDUCATION' | 'RESEARCH';

export default function CareerPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredExperiences =
    filter === 'all' ? experiences : experiences.filter((exp) => exp.type === filter);

  const filters: Array<{ value: FilterType; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'WORK', label: 'Work' },
    { value: 'VOLUNTEER', label: 'Volunteer' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'RESEARCH', label: 'Research' },
  ];

  return (
    <div className="py-20">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Career Timeline
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            My professional journey and work experience
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filters.map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(value)}
            >
              {label}
            </Button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {filteredExperiences.map((experience, index) => (
            <TimelineItem key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {/* No results message */}
        {filteredExperiences.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No experiences found for this filter.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
