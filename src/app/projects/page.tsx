'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { CaseStudyCard } from '@/components/sections/CaseStudyCard';
import { DesignCard } from '@/components/sections/DesignCard';
import { DesignModal } from '@/components/ui/DesignModal';
import projectsData from '@/content/data/projects.json';
import caseStudiesData from '@/content/data/case-studies.json';
import designsData from '@/content/data/designs.json';
import { Project, CaseStudy, Design } from '@/types';

const snippets = projectsData as Project[];
const caseStudies = caseStudiesData as unknown as CaseStudy[];
const designs = designsData as Design[];

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDesignClick = (design: Design, index: number) => {
    setSelectedDesign(design);
    setSelectedDesignIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDesign(null), 300); // Clear after animation
  };

  const handleNextDesign = () => {
    const nextIndex = (selectedDesignIndex + 1) % designs.length;
    setSelectedDesignIndex(nextIndex);
    setSelectedDesign(designs[nextIndex]);
  };

  const handlePreviousDesign = () => {
    const prevIndex = selectedDesignIndex === 0 ? designs.length - 1 : selectedDesignIndex - 1;
    setSelectedDesignIndex(prevIndex);
    setSelectedDesign(designs[prevIndex]);
  };

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
    caseStudies.length > 0 && { id: 'featured', label: 'Featured Work' },
    snippets.length > 0 && { id: 'snippets', label: 'Code Lab' },
    caseStudies.length > 0 && { id: 'gallery', label: 'Design Gallery' },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200; // Offset for better UX

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
        {/* --- SECTION 1: HEADER --- */}
        <motion.div
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            What I've Built
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              Design experience makes me write better code. Development experience makes me design smarter systems. They're not separate skills. They feed each other.
            </p>
            <p>
              You'll find three things here: real projects people actually use, code experiments where I mess around with new tech, and design work from when I was focused on UI/UX.
            </p>
          </div>
        </motion.div>

        {/* --- STICKY NAV LINKS --- */}
        <nav
          className="sticky top-20 z-10 py-4 mb-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
          aria-label="Page sections navigation"
        >
          <div className="flex gap-6 text-sm font-medium uppercase tracking-widest">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm ${
                  activeSection === item.id
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 active:text-slate-950 dark:hover:text-white dark:active:text-slate-100'
                }`}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? 'true' : 'false'}
                type="button"
              >
                {String(index + 1).padStart(2, '0')}. {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </nav>


        {/* --- SECTION 2: FEATURED CASE STUDIES --- */}
        <section id="featured" className="mb-32">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Featured Work</h2>
            <p className="text-slate-500 mt-1">Impactful projects combining strategy, UI/UX, and development.</p>
          </div>

          <div className="grid gap-20 md:grid-cols-2">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        </section>

        {/* --- SECTION 3: THE CODE LAB (GitHub Snippets) --- */}
        <section id="snippets" className="mb-32">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Code Snippets & Lab</h2>
            <p className="text-slate-500 mt-1">Technical experiments and open-source contributions.</p>
          </div>

          <div className="grid gap-6">
            {snippets.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* --- SECTION 4: DESIGN GALLERY --- */}
        <section id="gallery" className="mb-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Design Gallery</h2>
            <p className="text-slate-500 mt-1">Focusing on visual craft, motion, and interaction details.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {designs.map((design, index) => (
              <DesignCard
                key={design.id}
                design={design}
                index={index}
                onClick={() => handleDesignClick(design, index)}
              />
            ))}
          </div>
        </section>

      </Container>

      {/* Design Modal */}
      <DesignModal
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextDesign}
        onPrevious={handlePreviousDesign}
        hasNext={true}
        hasPrevious={true}
        currentIndex={selectedDesignIndex}
        totalCount={designs.length}
      />
    </div>
  );
}