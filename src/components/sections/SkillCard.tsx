'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Toolbox, Users, Layers } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const categoryIcons = {
  FRONTEND: Code,
  BACKEND: Layers,
  TOOLS: Toolbox,
  DESIGN: Palette,
  SOFT_SKILLS: Users,
};

/**
 * Skill Card Component
 * Displays individual skill with proficiency indicator
 */
export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = categoryIcons[skill.category as keyof typeof categoryIcons] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Badge variant="primary" size="sm">
              {skill.yearsOfExperience}y
            </Badge>
          </div>
          <CardTitle className="text-xl">{skill.name}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Proficiency Bar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Proficiency</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {skill.proficiency}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
              />
            </div>
          </div>

          {/* Project Count */}
          {skill.projectCount !== undefined && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Used in <span className="font-semibold">{skill.projectCount}</span> project
              {skill.projectCount !== 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
