"use client";
import { motion } from 'framer-motion';
import { Mail, FileText, Globe, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/config/site';

const links = [
  {
    title: 'Portfolio',
    href: siteConfig.url,
    icon: Globe,
  },
  {
    title: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    title: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    title: 'Resume',
    href: siteConfig.resume.url,
    icon: FileText,
  },
  {
    title: 'Email',
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Profile */}
        <motion.div
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={siteConfig.author.avatar}
            alt={siteConfig.author.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {siteConfig.title}
            </p>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {links.map(({ title, href, icon: Icon }, index) => (
            <motion.a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
            >
              <Icon className="h-5 w-5" />
              {title}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
