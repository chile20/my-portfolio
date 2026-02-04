'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
];

/**
 * Hero Section Component
 * Clean, editorial-style hero with typography focus
 */
export function Hero() {
  return (
    <section className="relative py-8">
      <Container>
        <div className="max-w-5xl">
          {/* Main Heading with Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6"
          >
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {siteConfig.name}
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p
            className="mt-6 text-2xl font-medium text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {siteConfig.title}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {siteConfig.description}
          </motion.p>

          {/* Social Links & Resume */}
          <motion.nav
            className="mt-10 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            aria-label="Social media and contact links"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" aria-hidden="true">
              Connect
            </span>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${label}`}
                  className="text-slate-600 transition-colors hover:text-slate-900 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-slate-100 dark:active:text-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" role="separator" aria-hidden="true" />
              <a
                href="/resume.pdf"
                download
                aria-label="Download resume as PDF"
                className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-slate-100 dark:active:text-white"
              >
                <FileDown className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Resume</span>
              </a>
            </div>
          </motion.nav>

          {/* Subtle Bottom Accent */}
          <motion.div
            className="mt-16 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </Container>
    </section>
  );
}