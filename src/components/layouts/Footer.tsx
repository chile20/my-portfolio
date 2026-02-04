import Link from 'next/link';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
];

/**
 * Footer Component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {currentYear} {siteConfig.name}
          </p>

          {/* Social Links & Resume */}
          <nav className="flex items-center gap-6" aria-label="Social media links">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${label} profile`}
                className="text-slate-600 transition-colors hover:text-slate-900 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-slate-100 dark:active:text-white"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" role="separator" aria-hidden="true" />
            <a
              href={siteConfig.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume"
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 active:text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm dark:text-slate-400 dark:hover:text-slate-100 dark:active:text-white"
            >
              <FileDown className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">Resume</span>
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}