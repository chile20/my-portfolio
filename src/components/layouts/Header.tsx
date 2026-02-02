'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggleCompact } from './ThemeToggle';
import Container from '@/components/ui/Container';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/career', label: 'Career' },
  { href: '/design', label: 'Design' },
  { href: '/projects', label: 'Projects' },
];

/**
 * Header Component
 * Main navigation header with mobile menu and theme toggle
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
          >
            Chi Le
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggleCompact />
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-600 hover:decoration-slate-400 dark:text-white dark:decoration-slate-700 dark:hover:text-slate-300 dark:hover:decoration-slate-600"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggleCompact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 py-4 dark:border-slate-800 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-600 hover:decoration-slate-400 dark:text-white dark:decoration-slate-700 dark:hover:text-slate-300"
              >
                Download Resume
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
