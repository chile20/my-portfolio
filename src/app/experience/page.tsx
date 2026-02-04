'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ExperienceCard } from '@/components/sections/ExperienceCard';
import experiencesData from '@/content/data/experiences.json';
import { Experience } from '@/types';

const experiences = experiencesData as Experience[];

export default function CareerPage() {
  const [activeSection, setActiveSection] = useState<string>('');

  // Group experiences by type
  const workExperiences = experiences.filter((exp) => exp.type === 'WORK');
  const educationExperiences = experiences.filter((exp) => exp.type === 'EDUCATION');
  const researchExperiences = experiences.filter((exp) => exp.type === 'RESEARCH');
  const volunteerExperiences = experiences.filter((exp) => exp.type === 'VOLUNTEER');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Build navigation items based on available sections
  const navItems = [
    workExperiences.length > 0 && { id: 'work', label: 'Work', color: 'blue' },
    (educationExperiences.length > 0 || researchExperiences.length > 0) && {
      id: 'education',
      label: 'Education',
      color: 'purple'
    },
    volunteerExperiences.length > 0 && { id: 'volunteer', label: 'Volunteer', color: 'green' },
  ].filter(Boolean) as Array<{ id: string; label: string; color: string }>;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Career
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              Finance degree in Vietnam. Migrated to the US in 2019. Started in UI/UX design. Went back to school for CS while working full-time. Now building full-stack applications.
            </p>
            <p>
              Below: my professional work, education and research background, plus the tech conferences I've volunteered at.
            </p>
          </div>
        </motion.div>

        {/* Sticky Navigation */}
        {navItems.length > 1 && (
          <nav className="sticky top-20 z-10 mb-16 border-b border-slate-200 bg-white/80 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex gap-6 text-sm font-medium uppercase tracking-widest">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative transition-colors ${activeSection === item.id
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {String(index + 1).padStart(2, '0')}. {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-4 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </nav>
        )}

        <div className="space-y-32">
          {/* Work Experience Section */}
          {workExperiences.length > 0 && (
            <section id="work">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Work Experience
                </h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Professional roles and responsibilities
                </p>
              </div>
              <div className="space-y-12">
                {workExperiences.map((experience, index) => (
                  <ExperienceCard key={experience.id} experience={experience} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Education & Research Section */}
          {(educationExperiences.length > 0 || researchExperiences.length > 0) && (
            <section id="education">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Education & Research
                </h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Academic background and research contributions
                </p>
              </div>
              <div className="space-y-12">
                {[...educationExperiences, ...researchExperiences].map((experience, index) => (
                  <ExperienceCard key={experience.id} experience={experience} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Volunteer Experience Section */}
          {volunteerExperiences.length > 0 && (
            <section id="volunteer">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Volunteer Experience
                </h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Community involvement and contributions
                </p>
              </div>
              <div className="space-y-12">
                {volunteerExperiences.map((experience, index) => (
                  <ExperienceCard key={experience.id} experience={experience} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </div>
  );
}