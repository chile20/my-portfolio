'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
];

/**
 * Hero Section Component
 * Left-aligned minimalist hero with clean typography
 */
export function Hero() {
  return (
    <section className="relative min-h-[85vh] py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-medium text-slate-600 dark:text-slate-400">
              {"👋 Hi, I'm"}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="mt-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {siteConfig.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            className="mt-3 text-2xl font-medium text-slate-700 dark:text-slate-300 md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {siteConfig.title}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/projects">
              <Button size="lg" className="group">
                View Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={siteConfig.resume.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mt-12 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}