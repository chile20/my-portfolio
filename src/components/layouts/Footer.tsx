import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
];

const footerLinks = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Career', href: '/career' },
      { label: 'Projects', href: '/projects' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Design', href: '/design' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resume', href: '/resume.pdf' },
    ],
  },
];

/**
 * Footer Component
 * Site footer with navigation links and social media
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="text-xl font-bold text-slate-900 dark:text-slate-100"
              >
                {siteConfig.name}
              </Link>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {siteConfig.description}
              </p>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
