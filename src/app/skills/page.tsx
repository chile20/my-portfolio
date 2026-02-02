'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SkillCard } from '@/components/sections/SkillCard';
import skillsData from '@/content/data/skills.json';
import { Skill } from '@/types';

const skills = skillsData as Skill[];

type CategoryFilter = 'all' | 'FRONTEND' | 'BACKEND' | 'TOOLS' | 'DESIGN' | 'SOFT_SKILLS';

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'All Skills',
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  TOOLS: 'Tools',
  DESIGN: 'Design',
  SOFT_SKILLS: 'Soft Skills',
};

export default function SkillsPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredSkills =
    filter === 'all' ? skills : skills.filter((skill) => skill.category === filter);

  const filters: CategoryFilter[] = ['all', 'FRONTEND', 'BACKEND', 'TOOLS', 'DESIGN', 'SOFT_SKILLS'];

  // Group skills by category for display
  const groupedSkills = filteredSkills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

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
            Skills & Expertise
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filters.map((value) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(value)}
            >
              {categoryLabels[value]}
            </Button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        {filter === 'all' ? (
          // Display skills grouped by category
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {categoryLabels[category as CategoryFilter]}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Display filtered skills
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        )}

        {/* No results message */}
        {filteredSkills.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No skills found for this category.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid gap-8 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-8 dark:from-blue-950/20 dark:to-violet-950/20 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {skills.length}+
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Technical Skills
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">
              {Math.max(...skills.map((s) => s.yearsOfExperience))}+
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Years of Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
              {skills.reduce((sum, s) => sum + (s.projectCount || 0), 0)}+
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Projects Completed
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
